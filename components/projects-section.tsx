import { Section } from "./section";
import { projects } from "@/data/portfolio";

export function ProjectsSection() {
  return (
    <Section
      id="projects"
      eyebrow="Projects"
      title="Featured work with clear product outcomes."
    >
      <div className="grid gap-5 md:grid-cols-2">
        {projects.map((project) => (
          <article
            key={project.name}
            className="group rounded-lg border border-[var(--border)] bg-[var(--surface)] p-5 transition hover:-translate-y-1 hover:shadow-[var(--shadow)]"
          >
            <div
              className={`mb-5 h-32 rounded-md bg-gradient-to-br ${project.accent} p-4`}
            >
              <div className="h-full rounded border border-white/30 bg-black/20" />
            </div>
            <h3 className="text-xl font-semibold">{project.name}</h3>
            <p className="mt-3 leading-7 text-[var(--muted)]">
              {project.description}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full bg-[var(--surface-strong)] px-3 py-1 text-xs text-[var(--muted)]"
                >
                  {tech}
                </span>
              ))}
            </div>
            <ul className="mt-4 grid gap-2 text-sm text-[var(--muted)]">
              {project.highlights.map((highlight) => (
                <li key={highlight}>- {highlight}</li>
              ))}
            </ul>
            <div className="mt-5 flex gap-4 text-sm font-semibold">
              {project.github ? (
                <a
                  href={project.github}
                  className="text-[var(--foreground)] hover:text-[var(--accent)]"
                  target="_blank"
                  rel="noreferrer"
                >
                  GitHub
                </a>
              ) : null}
              {project.demo ? (
                <a
                  href={project.demo}
                  className="text-[var(--foreground)] hover:text-[var(--accent)]"
                  target="_blank"
                  rel="noreferrer"
                >
                  Live Demo
                </a>
              ) : null}
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}
