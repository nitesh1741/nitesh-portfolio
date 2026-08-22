import { projects } from "@/data/portfolio";
import { Section } from "@/components/section";

export function ProjectsSection() {
  return (
    <Section
      id="projects"
      number="03"
      label="projects"
      heading="Things I've built."
      className="bg-[var(--bg-alt)]"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div
            key={project.slug}
            className="group flex flex-col border border-[var(--border)] bg-[var(--surface)] p-6 rounded-sm hover:border-[var(--border-2)] transition-all duration-200 reveal"
            style={{ boxShadow: "none" }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.boxShadow = "var(--shadow-md)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.boxShadow = "none")
            }
          >
            {/* Project name */}
            <h3 className="font-display text-xl text-[var(--fg)] mb-2">
              {project.name}
            </h3>

            {/* Description */}
            <p className="font-sans text-sm text-[var(--fg-2)] leading-relaxed mb-4 flex-1">
              {project.description}
            </p>

            {/* Tech chips */}
            <div className="mb-4 flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="font-mono text-[0.62rem] px-2 py-0.5 border border-[var(--accent)] text-[var(--accent)] bg-[var(--accent-bg)]"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Links */}
            <div className="flex gap-4">
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-xs text-[var(--accent)] hover:text-[var(--accent-dim)] transition-colors"
                >
                  → Live
                </a>
              )}
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-xs text-[var(--muted)] hover:text-[var(--fg)] transition-colors"
                >
                  → GitHub
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* View all projects link */}
      <div className="mt-10 text-center">
        <a
          href="/projects"
          className="font-mono text-sm text-[var(--muted)] hover:text-[var(--accent)] transition-colors"
        >
          View all projects →
        </a>
      </div>
    </Section>
  );
}
