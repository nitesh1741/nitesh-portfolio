import { education } from "@/data/portfolio";
import { Section } from "@/components/section";

export function EducationSection() {
  return (
    <Section
      id="education"
      number="06"
      label="education"
      heading="Where I learned."
      className="bg-[var(--bg)]"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {education.map((edu, i) => {
          const cgpa = edu.coursework?.find(
            (c) => c.startsWith("CGPA") || c.startsWith("GPA")
          );

          return (
            <div
              key={i}
              className="border border-[var(--border)] bg-[var(--surface)] p-6 rounded-sm reveal"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <h3 className="font-sans font-semibold text-[var(--fg)]">
                {edu.institution}
              </h3>
              <p className="font-mono text-xs text-[var(--accent)] mt-1">
                {edu.degree}
              </p>
              {edu.duration && (
                <p className="font-mono text-xs text-[var(--muted)] mt-1">
                  {edu.duration}
                </p>
              )}
              {cgpa && (
                <p className="font-mono text-xs text-[var(--fg-2)] mt-1">
                  {cgpa}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </Section>
  );
}
