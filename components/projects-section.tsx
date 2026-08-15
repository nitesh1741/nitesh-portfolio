import Link from "next/link";
import { Section } from "./section";
import { projects } from "@/data/portfolio";

export function ProjectsSection() {
  return (
    <Section
      id="projects"
      number="03"
      label="Work"
      heading="Projects built with real engineering decisions."
    >
      <div className="grid gap-8">
        {projects.map((project, idx) => (
          <article
            key={project.slug}
            className="reveal group border border-[var(--border)] bg-[var(--surface)] p-8 sm:p-10 transition-all duration-300 hover:border-[var(--accent)] hover:-translate-y-1 hover:shadow-[var(--shadow-md)]"
          >
            {/* Project index + stack row */}
            <div className="flex items-center gap-3 mb-5">
              <span className="font-mono text-[0.58rem] tracking-[0.28em] uppercase text-[var(--muted)]">
                {String(idx + 1).padStart(2, "0")}
              </span>
              <div className="h-px w-10 bg-[var(--border)]" />
              <div className="flex flex-wrap gap-1.5">
                {project.stack.slice(0, 3).map((tech) => (
                  <span
                    key={tech}
                    className="border border-[var(--border)] px-2.5 py-0.5 font-mono text-[0.58rem] tracking-wide text-[var(--muted)]"
                  >
                    {tech}
                  </span>
                ))}
                {project.stack.length > 3 && (
                  <span className="font-mono text-[0.58rem] text-[var(--muted)] self-center">
                    +{project.stack.length - 3}
                  </span>
                )}
              </div>
            </div>

            <div className="grid lg:grid-cols-[1fr_220px] gap-8">
              {/* Left: name, description, C/S/O */}
              <div>
                <h3 className="font-display text-2xl sm:text-3xl text-[var(--fg)] leading-tight mb-3">
                  {project.name}
                </h3>
                <p className="text-sm leading-7 text-[var(--muted)] max-w-2xl">
                  {project.description}
                </p>

                {/* Challenge / Solution / Outcome */}
                <div className="mt-7 grid sm:grid-cols-3 gap-5 border-t border-[var(--border)] pt-6">
                  {(
                    [
                      { label: "Challenge", text: project.challenge },
                      { label: "Solution", text: project.solution },
                      { label: "Outcome", text: project.outcome },
                    ] as const
                  ).map(({ label, text }) => (
                    <div key={label}>
                      <p className="font-mono text-[0.58rem] tracking-[0.22em] uppercase text-[var(--accent)] mb-2">
                        {label}
                      </p>
                      <p className="text-xs leading-5 text-[var(--muted)]">
                        {text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: highlights + links */}
              <div className="flex flex-col gap-5">
                <div className="border-l-2 border-[var(--border)] pl-4 group-hover:border-[var(--accent)] transition-colors duration-300 flex flex-col gap-2">
                  {project.highlights.map((h) => (
                    <p key={h} className="text-xs leading-5 text-[var(--muted)]">
                      ↗ {h}
                    </p>
                  ))}
                </div>

                <div className="flex flex-col gap-2 mt-auto">
                  <Link
                    href={`/projects/${project.slug}`}
                    className="inline-flex items-center gap-1.5 font-mono text-xs tracking-wider uppercase text-[var(--accent)] hover:gap-3 transition-all duration-200"
                  >
                    Case Study →
                  </Link>
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 font-mono text-xs tracking-wider uppercase text-[var(--muted)] hover:text-[var(--fg)] transition-colors duration-200"
                    >
                      GitHub →
                    </a>
                  )}
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}
