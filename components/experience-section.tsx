import { Section } from "./section";
import { experiences } from "@/data/portfolio";

export function ExperienceSection() {
  return (
    <Section
      id="experience"
      eyebrow="Experience"
      title="A timeline of building, shipping, and learning."
    >
      <div className="relative grid gap-6 border-l border-[var(--border)] pl-6">
        {experiences.map((item) => (
          <article
            key={`${item.company}-${item.duration}`}
            className="relative rounded-lg border border-[var(--border)] bg-[var(--surface)] p-6"
          >
            <span className="absolute -left-[31px] top-7 h-3 w-3 rounded-full border-2 border-[var(--background)] bg-[var(--accent)]" />
            <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h3 className="text-xl font-semibold">{item.position}</h3>
                <p className="text-sm text-[var(--muted)]">
                  {item.company}
                </p>
              </div>
              <p className="font-mono text-sm text-[var(--muted)]">
                {item.duration}
              </p>
            </div>
            <p className="mt-4 leading-7 text-[var(--muted)]">
              {item.description}
            </p>
            <ul className="mt-4 grid gap-2 text-sm text-[var(--muted)]">
              {item.achievements.map((achievement) => (
                <li key={achievement} className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" />
                  <span>{achievement}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </Section>
  );
}
