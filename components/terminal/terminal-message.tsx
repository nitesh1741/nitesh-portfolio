"use client";

import { useEffect, useState } from "react";
import type { TerminalMessage } from "@/hooks/use-terminal-chat";

type Props = Omit<TerminalMessage, "id">;

// ─── Thinking Phrases ────────────────────────────────────────

const THINKING_PHRASES = [
  "Collecting information",
  "Consulting Nitesh",
  "Parsing your query",
  "Cross-referencing experience",
  "Reviewing portfolio data",
  "Synthesising response",
  "Searching the codebase",
];

function ThinkingMessage() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Fade out → swap phrase → fade in every 1.8 s
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIndex((i) => (i + 1) % THINKING_PHRASES.length);
        setVisible(true);
      }, 250);
    }, 1800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="pl-4 border-l border-[var(--border-2)]">
      <p className="font-mono text-sm text-[var(--muted)] leading-relaxed flex items-center gap-2">
        <span className="animate-blink text-[var(--accent)]" aria-hidden="true">
          █
        </span>
        <span
          style={{
            opacity: visible ? 1 : 0,
            transition: "opacity 0.22s ease",
          }}
        >
          {THINKING_PHRASES[index]}
          <span className="text-[var(--accent)]">...</span>
        </span>
      </p>
    </div>
  );
}

// ─── Main Export ─────────────────────────────────────────────

export function TerminalMessageItem({ role, text, typing }: Props) {
  if (role === "thinking") {
    return <ThinkingMessage />;
  }

  if (role === "user") {
    return (
      <div className="font-mono text-sm leading-relaxed">
        <span className="text-[var(--accent)] select-none">{">"}&nbsp;</span>
        <span className="text-[var(--fg)]">{text}</span>
        {typing && (
          <span className="animate-blink text-[var(--accent)] ml-0.5" aria-hidden="true">
            █
          </span>
        )}
      </div>
    );
  }

  if (role === "error") {
    return (
      <div className="font-mono text-sm text-red-400 pl-4 leading-relaxed whitespace-pre-wrap">
        {text}
      </div>
    );
  }

  // assistant
  return (
    <div className="pl-4 border-l border-[var(--border-2)]">
      <p className="font-mono text-sm text-[var(--fg-2)] whitespace-pre-wrap leading-relaxed">
        {text}
        {typing && (
          <span className="animate-blink text-[var(--accent)] ml-0.5" aria-hidden="true">
            █
          </span>
        )}
      </p>
    </div>
  );
}
