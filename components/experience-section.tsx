import { Section } from "./section";
import { experiences } from "@/data/portfolio";

export function ExperienceSection() {
  return (
    <Section
      id="experience"
      eyebrow="Experience"
      title="A timeline of building, shipping, and learning."
    >
      <div className="relative grid gap-8 border-l border-[var(--border)] pl-6 ml-2 sm:ml-4">
        {experiences.map((item) => (
          <article
            key={`${item.company}-${item.duration}`}
            className="group relative rounded-lg border border-[var(--border)] bg-[var(--surface)] p-6 shadow-sm transition-all duration-300 premium-card"
          >
            {/* Connected glowing timeline dot */}
            <span className="absolute -left-[33px] top-7.5 h-3.5 w-3.5 rounded-full border-2 border-[var(--background)] bg-[var(--border)] transition-all duration-300 group-hover:bg-[var(--accent)] group-hover:scale-125 group-hover:shadow-[0_0_8px_var(--accent)]" />
            
            <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h3 className="text-xl font-bold tracking-tight text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors duration-300">
                  {item.position}
                </h3>
                <p className="text-sm font-semibold text-[var(--accent)] mt-0.5">
                  {item.company}
                </p>
              </div>
              <p className="font-mono text-xs font-semibold uppercase tracking-wider text-[var(--muted)] bg-[var(--surface-strong)] px-2.5 py-1 rounded border border-[color-mix(in_srgb,var(--border)_45%,transparent)] self-start sm:self-auto">
                {item.duration}
              </p>
            </div>
            
            <p className="mt-4 leading-relaxed text-[var(--muted)] text-sm font-medium">
              {item.description}
            </p>
            
            <ul className="mt-5 grid gap-3 text-sm text-[var(--muted)]">
              {item.achievements.map((achievement) => (
                <li key={achievement} className="flex gap-2.5 items-start">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)] opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300" />
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
