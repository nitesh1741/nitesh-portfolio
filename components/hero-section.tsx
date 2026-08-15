import Image from "next/image";
import { metrics, profile } from "@/data/portfolio";
import { MetricsCounter } from "./metrics-counter";

export function HeroSection() {
  // Split "Nitesh Kumar Mehta" → firstName="Nitesh Kumar", lastName="Mehta"
  const nameParts = profile.name.split(" ");
  const lastName = nameParts[nameParts.length - 1];
  const firstName = nameParts.slice(0, -1).join(" ");

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-end pb-20 pt-32 overflow-hidden scroll-mt-0"
    >
      {/* Subtle radial bg texture */}
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        aria-hidden="true"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_55%_at_50%_-5%,color-mix(in_srgb,var(--accent)_5%,transparent),transparent)]" />
      </div>

      <div className="mx-auto w-full max-w-6xl px-5 lg:px-8">
        <div className="grid lg:grid-cols-[1fr_auto] gap-12 lg:gap-20 items-end">

          {/* ── Left: Text content ── */}
          <div>
            {/* Status badges */}
            <div className="animate-fade-in-up mb-8 flex flex-wrap gap-3">
              <span className="inline-flex items-center gap-2 border border-[var(--border)] bg-[var(--surface)] px-3 py-1.5 font-mono text-[0.62rem] tracking-[0.16em] uppercase text-[var(--muted)] rounded-full">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)] animate-pulse" />
                {profile.location}
              </span>
              <span className="inline-flex items-center gap-2 border border-[var(--border)] bg-[var(--surface)] px-3 py-1.5 font-mono text-[0.62rem] tracking-[0.16em] uppercase text-[var(--muted)] rounded-full">
                {profile.currentCompany}
              </span>
            </div>

            {/* Name — Instrument Serif, editorial scale */}
            <h1
              className="animate-fade-in-up font-display leading-[0.95] tracking-tight text-[var(--fg)]"
              style={{
                fontSize: "clamp(3rem, 8.5vw, 7rem)",
                animationDelay: "80ms",
              }}
            >
              <span className="block">{firstName}</span>
              <span className="block">{lastName}</span>
            </h1>

            {/* Role */}
            <p
              className="animate-fade-in-up mt-6 font-mono text-xs tracking-[0.22em] uppercase text-[var(--accent)]"
              style={{ animationDelay: "180ms" }}
            >
              — {profile.role}
            </p>

            {/* Intro paragraph */}
            <p
              className="animate-fade-in-up mt-5 max-w-xl text-base sm:text-lg leading-relaxed text-[var(--muted)]"
              style={{ animationDelay: "280ms" }}
            >
              {profile.intro}
            </p>

            {/* Metrics count-up strip */}
            <div
              className="animate-fade-in-up mt-10"
              style={{ animationDelay: "380ms" }}
            >
              <MetricsCounter metrics={metrics} />
            </div>

            {/* CTA buttons — square corners, editorial feel */}
            <div
              className="animate-fade-in-up mt-10 flex flex-wrap gap-4"
              style={{ animationDelay: "480ms" }}
            >
              <a
                href="#projects"
                className="inline-flex items-center gap-2 border border-[var(--fg)] bg-[var(--fg)] px-7 py-3.5 font-mono text-[0.7rem] tracking-[0.2em] uppercase text-[var(--bg)] transition-all duration-300 hover:bg-transparent hover:text-[var(--fg)] cursor-pointer"
              >
                View Work
              </a>
              <a
                href={profile.resume}
                className="inline-flex items-center gap-2 border border-[var(--border)] px-7 py-3.5 font-mono text-[0.7rem] tracking-[0.2em] uppercase text-[var(--muted)] transition-all duration-300 hover:border-[var(--fg)] hover:text-[var(--fg)] cursor-pointer"
              >
                Resume →
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 font-mono text-[0.7rem] tracking-[0.2em] uppercase text-[var(--muted)] transition-all duration-300 hover:text-[var(--accent)] cursor-pointer"
              >
                Contact ↗
              </a>
            </div>
          </div>

          {/* ── Right: Profile photo — editorial framing ── */}
          <div
            className="animate-fade-in-up hidden lg:block"
            style={{ animationDelay: "180ms" }}
          >
            <div className="relative w-[260px] h-[340px] overflow-hidden border border-[var(--border)]">
              {/* Corner accent marks */}
              <div
                className="absolute top-0 right-0 w-7 h-7 z-10 pointer-events-none"
                aria-hidden="true"
                style={{
                  borderTop: "2px solid var(--accent)",
                  borderRight: "2px solid var(--accent)",
                }}
              />
              <div
                className="absolute bottom-0 left-0 w-7 h-7 z-10 pointer-events-none"
                aria-hidden="true"
                style={{
                  borderBottom: "2px solid var(--accent)",
                  borderLeft: "2px solid var(--accent)",
                }}
              />
              <Image
                src="/profile.png"
                alt={`${profile.name}, ${profile.role}`}
                fill
                priority
                sizes="260px"
                className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
              />
            </div>
          </div>
        </div>

        {/* Scroll nudge */}
        <div className="hidden lg:flex mt-14 items-center gap-4 text-[var(--muted)]">
          <div className="h-px w-10 bg-[var(--border)]" />
          <span className="font-mono text-[0.58rem] tracking-[0.32em] uppercase">
            Scroll
          </span>
        </div>
      </div>
    </section>
  );
}
