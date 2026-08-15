import { Section } from "./section";
import { profile } from "@/data/portfolio";

export function AboutSection() {
  return (
    <Section
      id="about"
      number="01"
      label="About"
      heading="Backend engineer focused on reliable distributed systems."
    >
      <div className="grid gap-12 lg:grid-cols-[1fr_0.85fr]">

        {/* Left: Bio + origin */}
        <div className="reveal flex flex-col gap-6">
          <p className="text-lg leading-8 text-[var(--muted)]">
            {profile.summary}
          </p>
          <p className="text-sm leading-7 text-[var(--muted)] border-l-2 border-[var(--accent)] pl-5 opacity-80">
            {profile.originSentence}
          </p>
          {/* Interest chips */}
          <div className="flex flex-wrap gap-2 pt-1">
            {profile.interests.map((interest) => (
              <span
                key={interest}
                className="rounded-full border border-[var(--border)] px-4 py-1.5 font-mono text-xs tracking-wide text-[var(--muted)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all duration-200 cursor-default"
              >
                {interest}
              </span>
            ))}
          </div>
        </div>

        {/* Right: Core expertise grid */}
        <div className="reveal flex flex-col gap-5">
          <p className="font-mono text-[0.62rem] tracking-[0.22em] uppercase text-[var(--accent)]">
            Core Expertise
          </p>
          <div className="grid grid-cols-2 gap-2">
            {profile.expertise.map((tech) => (
              <div
                key={tech}
                className="flex items-center gap-2.5 border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-sm text-[var(--fg-2)] hover:border-[var(--accent)] hover:bg-[var(--accent-light)] transition-all duration-200"
              >
                <span className="h-1 w-1 rounded-full bg-[var(--accent)] shrink-0" />
                <span className="leading-snug">{tech}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
