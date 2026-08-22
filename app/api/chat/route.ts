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
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: body.message }),
      signal: AbortSignal.timeout(10_000),
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

  const data = await upstream.json();
  return Response.json(data, { status: upstream.status });
}
