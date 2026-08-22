"use client";

import { useEffect, useRef, useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

export type TerminalMessage = {
  id: string;
  role: "user" | "assistant" | "error" | "thinking";
  text: string;
  typing?: boolean; // true while typewriter is animating
};

// ─── Constants ────────────────────────────────────────────────────────────────

const BOOT_CMD = "whoami";
const BOOT_LINES = [
  "Nitesh Kumar Mehta",
  ".NET Backend & Agentic AI Engineer",
  "CHUBB India · Hyderabad, India",
];

const MAX_MESSAGES = 20;

// ─── Helpers ──────────────────────────────────────────────────────────────────

/**
 * Strip common markdown syntax so responses read cleanly in a
 * monospace terminal surface that has no markdown renderer.
 *
 * Handles: fenced code blocks, bold/italic, inline code,
 *          headings, strikethrough, and bare [text](url) links.
 * Leaves:  bullet dashes, numbered lists, and plain text as-is.
 */
function stripMarkdown(text: string): string {
  return text
    // Fenced code blocks — keep the code, drop the fences
    .replace(/```[\w]*\n?([\s\S]*?)```/g, (_: string, code: string) => code.trim())
    // Bold + italic combinations (***), bold (**), italic (*)
    .replace(/\*{1,3}([^*\n]+)\*{1,3}/g, "$1")
    // Inline code
    .replace(/`([^`\n]+)`/g, "$1")
    // Headings — drop the leading # markers
    .replace(/^#{1,6}\s+/gm, "")
    // Strikethrough
    .replace(/~~([^~\n]+)~~/g, "$1")
    // Markdown links [label](url) → label
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    // Trailing whitespace per line
    .replace(/[ \t]+$/gm, "")
    .trim();
}

function prefersReducedMotion(): boolean {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/**
 * Typewrite `text` one character at a time at `delayMs` per character.
 * Calls `onTick` with the current partial string on each step.
 * If the user prefers reduced motion, calls `onTick` once with the full text.
 */
function typewriter(
  text: string,
  delayMs: number,
  onTick: (partial: string) => void,
): Promise<void> {
  if (prefersReducedMotion()) {
    onTick(text);
    return Promise.resolve();
  }

  return new Promise<void>((resolve) => {
    let i = 0;
    const tick = () => {
      i++;
      onTick(text.slice(0, i));
      if (i < text.length) {
        setTimeout(tick, delayMs);
      } else {
        resolve();
      }
    };
    tick();
  });
}

/**
 * Read one SSE-formatted token from a `data: ...` line.
 *
 * Handles common streaming formats:
 *   - Raw text:              `data: Hello`
 *   - JSON token:            `data: {"token":"Hello"}`
 *   - OpenAI delta:          `data: {"choices":[{"delta":{"content":"Hi"}}]}`
 *   - Anthropic text delta:  `data: {"delta":{"text":"Hi"}}`
 */
function parseSseLine(payload: string): string {
  try {
    const parsed = JSON.parse(payload) as Record<string, unknown>;
    if (typeof parsed.token === "string") return parsed.token;
    if (typeof parsed.text === "string") return parsed.text;
    if (typeof parsed.content === "string") return parsed.content;

    // Anthropic: {"delta":{"text":"..."}}
    const delta = parsed.delta as Record<string, unknown> | undefined;
    if (delta && typeof delta.text === "string") return delta.text;

    // OpenAI: {"choices":[{"delta":{"content":"..."}}]}
    const choices = parsed.choices as Array<Record<string, unknown>> | undefined;
    if (Array.isArray(choices) && choices.length > 0) {
      const d = choices[0].delta as Record<string, unknown> | undefined;
      if (d && typeof d.content === "string") return d.content;
    }
  } catch {
    // Not JSON — treat the payload itself as the token
  }
  return payload;
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useTerminalChat() {
  const [messages, setMessages] = useState<TerminalMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const bootedRef = useRef(false);

  // Boot sequence — runs once on mount
  useEffect(() => {
    if (bootedRef.current) return;
    bootedRef.current = true;

    const reduced = prefersReducedMotion();
    const bootCmdId = "boot-whoami";
    const bootRespId = "boot-response";

    const runBoot = async () => {
      // Step 1: 400 ms delay before anything appears
      await new Promise<void>((r) => setTimeout(r, 400));

      // Step 2: Push user message and typewrite "whoami" at 30 ms/char
      setMessages([{ id: bootCmdId, role: "user", text: "", typing: true }]);

      if (reduced) {
        setMessages((prev) =>
          prev.map((m) =>
            m.id === bootCmdId ? { ...m, text: BOOT_CMD, typing: false } : m,
          ),
        );
      } else {
        await typewriter(BOOT_CMD, 30, (partial) => {
          setMessages((prev) =>
            prev.map((m) =>
              m.id === bootCmdId ? { ...m, text: partial } : m,
            ),
          );
        });
        setMessages((prev) =>
          prev.map((m) =>
            m.id === bootCmdId ? { ...m, typing: false } : m,
          ),
        );
      }

      // Step 3: 300 ms pause
      await new Promise<void>((r) => setTimeout(r, 300));

      // Step 4: Push assistant message; reveal each line 120 ms apart
      setMessages((prev) => [
        ...prev,
        { id: bootRespId, role: "assistant", text: "", typing: true },
      ]);

      if (reduced) {
        setMessages((prev) =>
          prev.map((m) =>
            m.id === bootRespId
              ? { ...m, text: BOOT_LINES.join("\n"), typing: false }
              : m,
          ),
        );
      } else {
        for (let i = 0; i < BOOT_LINES.length; i++) {
          if (i > 0) {
            await new Promise<void>((r) => setTimeout(r, 120));
          }
          const partial = BOOT_LINES.slice(0, i + 1).join("\n");
          setMessages((prev) =>
            prev.map((m) =>
              m.id === bootRespId ? { ...m, text: partial } : m,
            ),
          );
        }
        setMessages((prev) =>
          prev.map((m) =>
            m.id === bootRespId ? { ...m, typing: false } : m,
          ),
        );
      }
    };

    void runBoot();
  }, []);

  // sendMessage — fire-and-forget async
  const sendMessage = (text?: string): void => {
    const msg = (text ?? input).trim();
    if (!msg || isLoading) return;

    setInput("");

    const userMsg: TerminalMessage = {
      id: crypto.randomUUID(),
      role: "user",
      text: msg,
    };

    // Push user message + thinking placeholder together
    const thinkingId = crypto.randomUUID();
    setMessages((prev) =>
      [
        ...prev,
        userMsg,
        { id: thinkingId, role: "thinking" as const, text: "" },
      ].slice(-MAX_MESSAGES),
    );
    setIsLoading(true);

    const doFetch = async () => {
      // assistantId is set once we replace the thinking placeholder
      let assistantId: string | null = null;

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: msg }),
          signal:
            typeof AbortSignal !== "undefined" && AbortSignal.timeout
              ? AbortSignal.timeout(30_000)
              : undefined,
        });

        // ── Error response ───────────────────────────────
        if (!res.ok) {
          setMessages((prev) =>
            [
              ...prev.filter((m) => m.id !== thinkingId),
              {
                id: crypto.randomUUID(),
                role: "error" as const,
                text: "[system error: could not connect. try again.]",
              },
            ].slice(-MAX_MESSAGES),
          );
          return;
        }

        // Replace thinking placeholder with the assistant message shell
        assistantId = crypto.randomUUID();
        const aid = assistantId;
        setMessages((prev) =>
          [
            ...prev.filter((m) => m.id !== thinkingId),
            { id: aid, role: "assistant" as const, text: "", typing: true },
          ].slice(-MAX_MESSAGES),
        );

        const contentType = res.headers.get("content-type") ?? "";
        const isStream =
          res.body != null &&
          (contentType.includes("text/event-stream") ||
            contentType.includes("text/plain"));

        if (isStream) {
          // ── Streaming path ─────────────────────────────
          // Read chunks as they arrive and display tokens progressively.
          // Markdown is stripped on the accumulated text each tick so
          // partial `**` markers never linger after the closing `**` lands.
          const reader = res.body!.getReader();
          const decoder = new TextDecoder();
          let accumulated = "";
          let sseBuffer = "";
          let streamDone = false;

          while (!streamDone) {
            const { done, value } = await reader.read();
            if (done) streamDone = true;

            if (value) {
              sseBuffer += decoder.decode(value, { stream: !done });
            }

            // Split on newlines; keep the last (possibly incomplete) line
            const lines = sseBuffer.split("\n");
            sseBuffer = streamDone ? "" : (lines.pop() ?? "");

            for (const line of lines) {
              const trimmed = line.trim();
              // Skip blank lines and SSE comments
              if (!trimmed || trimmed.startsWith(":")) continue;
              // Only process data lines
              if (!trimmed.startsWith("data:")) continue;

              const payload = trimmed.slice(5).trim();
              if (payload === "[DONE]") {
                streamDone = true;
                break;
              }

              const token = parseSseLine(payload);
              accumulated += token;

              const displayed = stripMarkdown(accumulated);
              setMessages((prev) =>
                prev.map((m) => (m.id === aid ? { ...m, text: displayed } : m)),
              );

              // 75 ms per word — comfortable reading cadence.
              // The SSE events arrive all at once (upstream is JSON-based),
              // so this pause is purely for smooth word-by-word animation.
              if (token.trim().length > 0) {
                await new Promise<void>((r) => setTimeout(r, 75));
              }
            }
          }

          // Finalize — ensure markdown is fully stripped and cursor hidden
          const finalText = stripMarkdown(accumulated) || "[error: empty response]";
          setMessages((prev) =>
            prev.map((m) =>
              m.id === aid ? { ...m, text: finalText, typing: false } : m,
            ),
          );
        } else {
          // ── JSON + typewriter fallback ─────────────────
          // Upstream didn't stream — animate the response locally.
          const data = (await res.json().catch(() => ({}))) as {
            response?: string;
          };

          const responseText = stripMarkdown(
            data.response ?? "[error: empty response]",
          );

          await typewriter(responseText, 18, (partial) => {
            setMessages((prev) =>
              prev.map((m) => (m.id === aid ? { ...m, text: partial } : m)),
            );
          });

          setMessages((prev) =>
            prev.map((m) =>
              m.id === aid ? { ...m, typing: false } : m,
            ),
          );
        }
      } catch (err) {
        const isTimeout =
          err instanceof Error &&
          (err.name === "TimeoutError" || err.name === "AbortError");

        const errorText = isTimeout
          ? "[timeout: no response received]"
          : "[system error: could not connect. try again.]";

        if (assistantId) {
          // Swap the assistant shell (we already removed thinking) for an error
          const aid = assistantId;
          setMessages((prev) =>
            [
              ...prev.filter((m) => m.id !== aid),
              { id: crypto.randomUUID(), role: "error" as const, text: errorText },
            ].slice(-MAX_MESSAGES),
          );
        } else {
          // Error before we swapped thinking — remove thinking, add error
          setMessages((prev) =>
            [
              ...prev.filter((m) => m.id !== thinkingId),
              { id: crypto.randomUUID(), role: "error" as const, text: errorText },
            ].slice(-MAX_MESSAGES),
          );
        }
      } finally {
        setIsLoading(false);
      }
    };

    void doFetch();
  };

  return {
    messages,
    input,
    setInput,
    isLoading,
    sendMessage,
  };
}
