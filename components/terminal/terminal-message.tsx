import type { TerminalMessage } from "@/hooks/use-terminal-chat";

type Props = Omit<TerminalMessage, "id">;

export function TerminalMessageItem({ role, text, typing }: Props) {
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
