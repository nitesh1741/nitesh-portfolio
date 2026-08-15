import { Section } from "./section";
import { experiences } from "@/data/portfolio";

export function ExperienceSection() {
  return (
    <Section
      id="experience"
      number="02"
      label="Experience"
      heading="Engineering at scale — distributed systems in production."
      className="bg-[var(--bg-alt)]"
    >
      <div className="grid gap-6">
        {experiences.map((item, idx) => (
          <article
            key={`${item.company}-${item.duration}`}
            className="reveal group relative border border-[var(--border)] bg-[var(--surface)] p-8 transition-all duration-300 hover:border-[var(--accent)] hover:-translate-y-1 hover:shadow-[var(--shadow-md)]"
          >
            {/* Decorative index number */}
            <span
              aria-hidden="true"
              className="absolute top-6 right-8 font-black leading-none select-none pointer-events-none text-[var(--border)] group-hover:text-[color-mix(in_srgb,var(--accent)_18%,var(--border))] transition-colors duration-300"
              style={{ fontSize: "clamp(2.5rem,6vw,4rem)" }}
            >
              {String(idx + 1).padStart(2, "0")}
            </span>

            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div>
                <p className="font-mono text-[0.62rem] tracking-[0.22em] uppercase text-[var(--accent)] mb-1.5">
                  {item.company}
                </p>
                <h3 className="font-display text-2xl text-[var(--fg)] leading-tight">
                  {item.position}
                </h3>
              </div>
              <span className="shrink-0 self-start font-mono text-xs tracking-wider text-[var(--muted)] border border-[var(--border)] px-3 py-1.5">
                {item.duration}
              </span>
            </div>

            {/* Description */}
            <p className="mt-5 text-sm leading-7 text-[var(--muted)]">
              {item.description}
            </p>

            {/* Achievements */}
            <ul className="mt-6 grid gap-3">
              {item.achievements.map((achievement) => (
                <li
                  key={achievement}
                  className="flex gap-3 items-start text-sm text-[var(--muted)]"
                >
                  <span className="mt-[0.6rem] h-px w-4 shrink-0 bg-[var(--accent)] opacity-50 group-hover:opacity-100 group-hover:w-6 transition-all duration-300" />
                  <span className="leading-relaxed">{achievement}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </Section>
  );
}
