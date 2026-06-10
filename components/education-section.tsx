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
            className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-6"
          >
            <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h3 className="text-xl font-semibold">{item.degree}</h3>
                <p className="mt-1 text-[var(--muted)]">
                  {item.institution}
                </p>
              </div>
              <p className="font-mono text-sm text-[var(--muted)]">
                {item.duration}
              </p>
            </div>
            {item.coursework ? (
              <div className="mt-5 flex flex-wrap gap-2">
                {item.coursework.map((course) => (
                  <span
                    key={course}
                    className="rounded-full bg-[var(--surface-strong)] px-3 py-1 text-xs text-[var(--muted)]"
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
