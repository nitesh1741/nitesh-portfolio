import { TerminalWindow } from "@/components/terminal/terminal-window";
import { profile } from "@/data/portfolio";

export function HeroSection() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center pt-20 pb-16 overflow-hidden scroll-mt-0"
    >
      {/* Faint dot-grid texture */}
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        aria-hidden="true"
        style={{
          backgroundImage:
            "radial-gradient(circle, var(--border) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          opacity: 0.35,
        }}
      />

      {/* Radial glow centre */}
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 50%, color-mix(in srgb, var(--accent) 4%, transparent), transparent)",
        }}
      />

      {/* Mobile-only: name + role above terminal for SEO context */}
      <div className="md:hidden mb-6 text-center animate-fade-in-up">
        <p className="font-mono text-xs tracking-[0.2em] uppercase text-[var(--accent)]">
          {profile.name}
        </p>
        <p className="mt-1 font-mono text-[0.65rem] tracking-[0.15em] uppercase text-[var(--muted)]">
          {profile.role}
        </p>
      </div>

      {/* Terminal window */}
      <div
        className="w-full animate-fade-in"
        style={{
          maxWidth: "min(720px, 92vw)",
          height: "clamp(420px, 62vh, 580px)",
          animationDelay: "120ms",
        }}
      >
        <TerminalWindow />
      </div>

      {/* Scroll nudge */}
      <div
        className="hidden md:flex mt-12 items-center gap-3 text-[var(--muted)] animate-fade-in"
        style={{ animationDelay: "800ms" }}
      >
        <div className="h-px w-8 bg-[var(--border)]" />
        <span className="font-mono text-[0.58rem] tracking-[0.32em] uppercase">
          Scroll
        </span>
      </div>

      {/* Hidden h1 for SEO (terminal handles visual presentation) */}
      <h1 className="sr-only">{`${profile.name} — ${profile.role}`}</h1>
    </section>
  );
}
