"use client";

import { useEffect, useRef, useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

export type TerminalMessage = {
  id: string;
  role: "user" | "assistant" | "error";
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

// ─── Helpers ─────────────────────────────────────────────────────────────────

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

    // Keep last MAX_MESSAGES (the +1 for assistant will be handled on its own slice)
    setMessages((prev) => [...prev, userMsg].slice(-MAX_MESSAGES));
    setIsLoading(true);

    const doFetch = async () => {
      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: msg }),
          signal:
            typeof AbortSignal !== "undefined" && AbortSignal.timeout
              ? AbortSignal.timeout(10_000)
              : undefined,
        });

        const data: { response?: string; error?: string } = await res.json();

        const responseText: string = res.ok
          ? (data.response ?? "[error: empty response]")
          : "[system error: could not connect. try again.]";

        const assistantId = crypto.randomUUID();
        setMessages((prev) =>
          [
            ...prev,
            { id: assistantId, role: "assistant" as const, text: "", typing: true },
          ].slice(-MAX_MESSAGES),
        );

        await typewriter(responseText, 18, (partial) => {
          setMessages((prev) =>
            prev.map((m) =>
              m.id === assistantId ? { ...m, text: partial } : m,
            ),
          );
        });

        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantId ? { ...m, typing: false } : m,
          ),
        );
      } catch (err) {
        const isTimeout =
          err instanceof Error &&
          (err.name === "TimeoutError" || err.name === "AbortError");

        const errorText = isTimeout
          ? "[timeout: no response received]"
          : "[system error: could not connect. try again.]";

        setMessages((prev) =>
          [
            ...prev,
            {
              id: crypto.randomUUID(),
              role: "error" as const,
              text: errorText,
            },
          ].slice(-MAX_MESSAGES),
        );
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
