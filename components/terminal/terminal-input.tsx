"use client";

import type { KeyboardEvent } from "react";

type TerminalInputProps = {
  value: string;
  onChange: (v: string) => void;
  onSubmit: () => void;
  disabled?: boolean;
};

export function TerminalInput({
  value,
  onChange,
  onSubmit,
  disabled = false,
}: TerminalInputProps) {
  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && !disabled) {
      e.preventDefault();
      onSubmit();
    }
    if (e.key === "Escape") {
      onChange("");
    }
  }

  return (
    <div className="flex items-center gap-2 shrink-0 border-t border-[var(--border)] bg-[var(--terminal-bar)] px-4 py-3">
      <span
        className="font-mono text-sm text-[var(--accent)] select-none shrink-0"
        aria-hidden="true"
      >
        &gt;
      </span>
      <div className="relative flex-1 flex items-center">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          maxLength={500}
          placeholder={disabled ? "" : "ask me anything..."}
          aria-label="Chat with Nitesh's AI assistant"
          autoComplete="off"
          spellCheck={false}
          className="w-full bg-transparent font-mono text-sm text-[var(--fg)] outline-none placeholder:text-[var(--muted)] disabled:opacity-40 caret-transparent"
        />
        {/* Blinking block cursor shown when input is empty and not disabled */}
        {!value && !disabled && (
          <span
            className="animate-blink font-mono text-sm text-[var(--accent)] pointer-events-none select-none"
            aria-hidden="true"
          >
            █
          </span>
        )}
      </div>
      {/* Thinking cursor shown while loading */}
      {disabled && (
        <span
          className="animate-blink font-mono text-sm text-[var(--accent)] shrink-0"
          aria-hidden="true"
        >
          █
        </span>
      )}
    </div>
  );
}
