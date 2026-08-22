import { experiences } from "@/data/portfolio";
import { Section } from "@/components/section";

export function ExperienceSection() {
  return (
    <Section
      id="experience"
      number="02"
      label="experience"
      heading="Where I've shipped."
      className="bg-[var(--bg)]"
    >
      <div className="relative">
        {/* Vertical timeline rail */}
        <div
          className="hidden lg:block absolute left-0 top-0 bottom-0 w-px"
          style={{ background: "var(--border)" }}
          aria-hidden="true"
        />

        <div className="space-y-14">
          {experiences.map((exp, i) => (
            <div key={i} className="reveal lg:pl-9 relative">
              {/* Timeline node */}
              <div
                className="hidden lg:block absolute left-0 top-1 h-2.5 w-2.5 rounded-full"
                style={{
                  background: "var(--accent)",
                  transform: "translateX(-4px)",
                  boxShadow: "0 0 8px var(--accent)",
                }}
                aria-hidden="true"
              />

              <div className="flex flex-wrap items-baseline justify-between gap-3 mb-3">
                <div>
                  <span className="font-mono text-xs text-[var(--accent)] tracking-[0.15em] uppercase">
                    ▸ {exp.company}
                  </span>
                  <h3 className="mt-1 font-display text-2xl text-[var(--fg)]">
                    {exp.position}
                  </h3>
                </div>
                <span className="font-mono text-xs text-[var(--muted)] tracking-wide shrink-0">
                  {exp.duration}
                </span>
              </div>

              <p className="text-sm text-[var(--fg-2)] leading-relaxed mb-4 max-w-2xl">
                {exp.description}
              </p>

              <ul className="space-y-2.5">
                {exp.achievements.map((achievement, j) => (
                  <li key={j} className="flex items-start gap-3 text-sm text-[var(--fg-2)]">
                    <span className="mt-0.5 shrink-0 font-mono text-[var(--accent)] text-xs">
                      →
                    </span>
                    {achievement}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
