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
  const canSubmit = value.trim().length > 0 && !disabled;

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
    <form
      className="flex items-center gap-2 shrink-0 border-t border-[var(--border)] bg-[var(--terminal-bar)] px-4 py-3"
      onSubmit={(e) => {
        e.preventDefault();
        if (canSubmit) {
          onSubmit();
        }
      }}
    >
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
          className="w-full bg-transparent font-mono text-sm text-[var(--fg)] outline-none placeholder:text-[var(--muted)] disabled:opacity-40 caret-[var(--accent)]"
        />
        {/* Blinking block cursor shown when input is empty and not disabled */}
        {!value && !disabled && (
          <span
            className="hidden"
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
      <button
        type="submit"
        disabled={!canSubmit}
        aria-label="Send message"
        className="grid h-8 w-8 shrink-0 place-items-center rounded-sm border border-[var(--border)] font-mono text-xs text-[var(--accent)] transition-colors hover:border-[var(--accent)] hover:text-[var(--fg)] disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:border-[var(--border)] disabled:hover:text-[var(--accent)]"
      >
        ↵
      </button>
    </form>
  );
}
