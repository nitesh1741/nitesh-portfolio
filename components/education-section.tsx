import { Section } from "./section";
import { education } from "@/data/portfolio";

export function EducationSection() {
  return (
    <Section
      id="education"
      eyebrow="Education"
      title="Academic foundation for software work."
    >
      <div className="grid gap-5">
        {education.map((item) => (
          <article
            key={item.degree}
            className="group rounded-lg border border-[var(--border)] bg-[var(--surface)] p-6 transition-all duration-300 premium-card"
          >
            <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h3 className="text-xl font-bold tracking-tight text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors duration-300">{item.degree}</h3>
                <p className="mt-1 text-sm font-semibold text-[var(--accent)]">
                  {item.institution}
                </p>
              </div>
              {item.duration && (
                <p className="font-mono text-xs font-semibold uppercase tracking-wider text-[var(--muted)] bg-[var(--surface-strong)] px-2.5 py-1 rounded border border-[color-mix(in_srgb,var(--border)_45%,transparent)] self-start sm:self-auto">
                  {item.duration}
                </p>
              )}
            </div>
            {item.coursework ? (
              <div className="mt-5 flex flex-wrap gap-2">
                {item.coursework.map((course) => (
                  <span
                    key={course}
                    className="rounded-full bg-[var(--surface-strong)] border border-[color-mix(in_srgb,var(--border)_45%,transparent)] px-3 py-1 text-xs font-bold text-[var(--muted)] transition-colors duration-200 hover:text-[var(--accent)] hover:border-[var(--accent)]"
                  >
                    {course}
                  </span>
                ))}
              </div>
            ) : null}
          </article>
        ))}
      </div>
    </Section>
  );
}
