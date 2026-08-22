import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);

  if (
    !body ||
    typeof body.message !== "string" ||
    body.message.trim().length === 0 ||
    body.message.length > 500
  ) {
    return Response.json(
      { error: "message must be 1-500 characters" },
      { status: 422 },
    );
  }

  const apiUrl = process.env.CHAT_API_URL;
  if (!apiUrl) {
    return Response.json(
      { error: "chat service unavailable" },
      { status: 503 },
    );
  }

  let upstream: Response;
  try {
    upstream = await fetch(`${apiUrl}/api/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Signal streaming support to the upstream
        Accept: "text/event-stream, application/json",
      },
      body: JSON.stringify({ message: body.message }),
      signal: AbortSignal.timeout(30_000),
    });
  } catch (err) {
    if (err instanceof Error && err.name === "TimeoutError") {
      return Response.json({ error: "upstream timeout" }, { status: 504 });
    }
    return Response.json(
      { error: "could not reach chat service" },
      { status: 502 },
    );
  }

  if (upstream.status === 422) {
    return Response.json(
      { error: "message rejected by upstream" },
      { status: 422 },
    );
  }
  if (upstream.status >= 500) {
    return Response.json({ error: "upstream error" }, { status: 502 });
  }

  const contentType = upstream.headers.get("content-type") ?? "";

  // ── Case 1: upstream already streams → pipe body straight through ─────────
  if (
    upstream.body &&
    (contentType.includes("text/event-stream") ||
      contentType.includes("text/plain"))
  ) {
    return new Response(upstream.body, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "no-cache, no-store",
        "X-Accel-Buffering": "no",
      },
    });
  }

  // ── Case 2: upstream returns JSON → convert to word-by-word SSE stream ────
  //
  // We split the response text into word-level tokens (each word keeps its
  // trailing whitespace) and emit one `data:` event per token.  The client's
  // SSE reader introduces the inter-word animation delay, so the server pushes
  // all events immediately with no artificial sleep.
  const data = (await upstream.json().catch(() => ({}))) as {
    response?: string;
    error?: string;
  };

  const responseText =
    typeof data.response === "string" && data.response.trim()
      ? data.response
      : "";

  if (!responseText) {
    // Propagate empty / error responses as plain JSON
    return Response.json(data, { status: upstream.status });
  }

  // Split on word boundaries, preserving trailing whitespace so the client
  // can concatenate tokens directly without inserting extra spaces.
  // e.g. "Hello world\nfoo" → ["Hello ", "world\n", "foo"]
  const tokens = responseText.match(/\S+\s*/g) ?? [responseText];

  const encoder = new TextEncoder();
  const stream = new ReadableStream<Uint8Array>({
    start(controller) {
      for (const token of tokens) {
        controller.enqueue(
          encoder.encode(`data: ${JSON.stringify({ token })}\n\n`),
        );
      }
      controller.enqueue(encoder.encode("data: [DONE]\n\n"));
      controller.close();
    },
  });

  return new Response(stream, {
    status: 200,
    headers: {
      "Content-Type": "text/event-stream; charset=utf-8",
      "Cache-Control": "no-cache, no-store",
      "X-Accel-Buffering": "no",
    },
  });
}
