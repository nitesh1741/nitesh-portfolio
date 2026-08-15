import { Section } from "./section";
import { education } from "@/data/portfolio";

export function EducationSection() {
  return (
    <Section
      id="education"
      number="06"
      label="Education"
      heading="Academic foundation and early years."
      className="bg-[var(--bg-alt)]"
    >
      <div className="grid gap-5">
        {education.map((item, idx) => (
          <div
            key={`${item.degree}-${item.institution}`}
            className="reveal group flex gap-6 border border-[var(--border)] bg-[var(--surface)] p-6 transition-all duration-300 hover:border-[var(--accent)]"
          >
            {/* Index number */}
            <span
              aria-hidden="true"
              className="hidden sm:block font-black text-4xl leading-none shrink-0 select-none text-[var(--border)] group-hover:text-[color-mix(in_srgb,var(--accent)_22%,var(--border))] transition-colors duration-300"
            >
              {String(idx + 1).padStart(2, "0")}
            </span>

            <div className="flex-1 min-w-0">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                <div>
                  <h3 className="font-display text-xl text-[var(--fg)] leading-tight">
                    {item.degree}
                  </h3>
                  <p className="mt-1 font-mono text-[0.62rem] tracking-[0.16em] uppercase text-[var(--accent)]">
                    {item.institution}
                  </p>
                </div>
                {item.duration && (
                  <span className="shrink-0 self-start font-mono text-xs text-[var(--muted)] border border-[var(--border)] px-3 py-1">
                    {item.duration}
                  </span>
                )}
              </div>

              {item.coursework && item.coursework.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {item.coursework.map((note) => (
                    <span
                      key={note}
                      className="border border-[var(--border)] px-3 py-1 font-mono text-xs text-[var(--muted)]"
                    >
                      {note}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
