import Image from "next/image";
import { profile, metrics } from "@/data/portfolio";
import { Section } from "@/components/section";
import { MetricsCounter } from "@/components/metrics-counter";

export function AboutSection() {
  return (
    <Section
      id="about"
      number="01"
      label="about"
      heading="Building systems that don't break."
      className="bg-[var(--bg-alt)]"
    >
      <div className="grid lg:grid-cols-[1fr_auto] gap-14 items-start">
        {/* ── Left: Text + Metrics ── */}
        <div>
          <p className="reveal text-base sm:text-lg leading-relaxed text-[var(--fg-2)] max-w-xl">
            {profile.summary}
          </p>
          <p className="reveal mt-4 font-mono text-sm text-[var(--muted)]">
            {profile.originSentence}
          </p>
          <div className="reveal mt-10">
            <MetricsCounter metrics={metrics} />
          </div>

          {/* CTA links */}
          <div className="reveal mt-10 flex flex-wrap gap-5">
            <a
              href="#projects"
              className="font-mono text-[0.7rem] tracking-[0.18em] uppercase border border-[var(--fg)] bg-[var(--fg)] text-[var(--bg)] px-6 py-3 transition-all duration-300 hover:bg-transparent hover:text-[var(--fg)]"
            >
              View Work
            </a>
            <a
              href={profile.resume}
              className="font-mono text-[0.7rem] tracking-[0.18em] uppercase border border-[var(--border)] text-[var(--muted)] px-6 py-3 transition-all duration-300 hover:border-[var(--fg)] hover:text-[var(--fg)]"
            >
              Resume →
            </a>
          </div>
        </div>

        {/* ── Right: Profile photo ── */}
        <div className="reveal hidden lg:block">
          <div className="relative w-[240px] h-[310px] overflow-hidden border border-[var(--border)]">
            {/* Corner accents */}
            <div
              className="absolute top-0 right-0 w-6 h-6 z-10 pointer-events-none"
              style={{ borderTop: "1.5px solid var(--accent)", borderRight: "1.5px solid var(--accent)" }}
              aria-hidden="true"
            />
            <div
              className="absolute bottom-0 left-0 w-6 h-6 z-10 pointer-events-none"
              style={{ borderBottom: "1.5px solid var(--accent)", borderLeft: "1.5px solid var(--accent)" }}
              aria-hidden="true"
            />
            <Image
              src="/profile.jpeg"
              alt={`${profile.name}, ${profile.role}`}
              fill
              sizes="240px"
              className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
            />
          </div>
        </div>
      </div>
    </Section>
  );
}
