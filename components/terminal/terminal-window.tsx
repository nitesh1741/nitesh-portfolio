"use client";

import { useEffect, useRef } from "react";
import { useTerminalChat } from "@/hooks/use-terminal-chat";
import { TerminalMessageItem } from "./terminal-message";
import { TerminalInput } from "./terminal-input";

const SUGGESTIONS = [
  "> skills",
  "> projects",
  "> experience",
  "> about me",
  "> contact",
];

export function TerminalWindow() {
  const { messages, input, setInput, isLoading, sendMessage } =
    useTerminalChat();
  const bottomRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to latest message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [messages]);

  function handleSuggestion(chip: string) {
    // Strip the "> " prefix before sending
    sendMessage(chip.replace(/^>\s*/, ""));
  }

  return (
    <div
      className="relative flex flex-col overflow-hidden rounded-lg border border-[var(--border-2)]"
      style={{
        width: "min(720px, 92vw)",
        height: "clamp(420px, 60vh, 600px)",
        background: "var(--terminal-bg)",
        boxShadow: "var(--glow-accent)",
      }}
      role="region"
      aria-label="Interactive terminal chatbot"
    >
      {/* ── Title bar ─────────────────────────────────────────── */}
      <div className="flex items-center gap-2 shrink-0 border-b border-[var(--border)] bg-[var(--terminal-bar)] px-4 py-3">
        {/* Traffic lights — decorative only, no onClick */}
        <span
          className="h-3 w-3 rounded-full bg-[#ff5f57] shrink-0"
          aria-hidden="true"
        />
        <span
          className="h-3 w-3 rounded-full bg-[#febc2e] shrink-0"
          aria-hidden="true"
        />
        <span
          className="h-3 w-3 rounded-full bg-[#28c840] shrink-0"
          aria-hidden="true"
        />
        <span className="ml-auto font-mono text-xs text-[var(--fg-2)] tracking-wide select-none">
          nitesh@portfolio:~$
        </span>
      </div>

      {/* ── Message history ───────────────────────────────────── */}
      <div
        className="flex-1 overflow-y-auto p-5 space-y-4 min-h-0 scrollbar-terminal"
        role="log"
        aria-live="polite"
        aria-label="Chat history"
      >
        {messages.map((msg) => (
          <TerminalMessageItem
            key={msg.id}
            role={msg.role}
            text={msg.text}
            typing={msg.typing}
          />
        ))}

        {isLoading && messages.length === 0 && (
          <div className="font-mono text-sm text-[var(--muted)] pl-4">
            <span className="animate-pulse">initialising...</span>
          </div>
        )}

        {/* Sentinel element for auto-scroll */}
        <div ref={bottomRef} />
      </div>

      {/* ── Suggestion chips ──────────────────────────────────── */}
      {!isLoading && (
        <div className="shrink-0 border-t border-[var(--border)] bg-[var(--terminal-bg)] px-4 py-2.5 flex flex-wrap gap-2">
          {SUGGESTIONS.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => handleSuggestion(s)}
              className="font-mono text-[0.65rem] tracking-wide border border-[var(--border)] text-[var(--accent)] px-2.5 py-1 rounded-sm bg-[var(--accent-bg)] hover:border-[var(--accent)] hover:text-[var(--fg)] transition-all duration-150 cursor-pointer"
            >
              {s}
            </button>
          ))}
        </div>
      )}

      {/* ── Input bar ─────────────────────────────────────────── */}
      <TerminalInput
        value={input}
        onChange={setInput}
        onSubmit={() => sendMessage()}
        disabled={isLoading}
      />
    </div>
  );
}
