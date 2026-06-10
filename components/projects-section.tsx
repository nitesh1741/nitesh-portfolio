import { Section } from "./section";
import { projects } from "@/data/portfolio";

export function ProjectsSection() {
  return (
    <Section
      id="projects"
      eyebrow="Projects"
      title="Featured work with clear product outcomes."
    >
      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((project) => (
          <article
            key={project.name}
            className="group rounded-lg border border-[var(--border)] bg-[var(--surface)] p-6 transition-all duration-300 premium-card"
          >
            <div
              className={`relative mb-5 h-36 rounded-md bg-gradient-to-br ${project.accent} p-5 overflow-hidden flex items-end`}
            >
              {/* Geometric tech grid mesh background */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_at_center,white_60%,transparent_100%)] pointer-events-none" />
              
              {/* Ambient glowing aura inside header */}
              <div className="absolute -top-12 -right-12 w-28 h-28 rounded-full bg-white/15 blur-xl animate-pulse pointer-events-none" />
              
              <div className="relative z-10 flex w-full items-center justify-between">
                <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-white/90 bg-black/30 backdrop-blur-md px-2.5 py-1 rounded border border-white/10">
                  {project.stack[0]}
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4.5 w-4.5 text-white/85 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                >
                  <path d="M7 7h10v10" />
                  <path d="M7 17 17 7" />
                </svg>
              </div>
            </div>
            
            <h3 className="text-xl font-bold tracking-tight text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors duration-300">
              {project.name}
            </h3>
            
            <p className="mt-3.5 leading-relaxed text-[var(--muted)] text-sm">
              {project.description}
            </p>
            
            <div className="mt-4 flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full bg-[var(--surface-strong)] border border-[color-mix(in_srgb,var(--border)_45%,transparent)] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-[var(--muted)] transition-colors duration-200 hover:text-[var(--accent)] hover:border-[var(--accent)]"
                >
                  {tech}
                </span>
              ))}
            </div>
            
            <ul className="mt-5 grid gap-2.5 text-sm text-[var(--muted)]">
              {project.highlights.map((highlight) => (
                <li key={highlight} className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)] opacity-85" />
                  <span className="leading-normal">{highlight}</span>
                </li>
              ))}
            </ul>
            
            <div className="mt-6 pt-5 border-t border-[color-mix(in_srgb,var(--border)_45%,transparent)] flex gap-4 text-xs font-bold uppercase tracking-wider">
              {project.github ? (
                <a
                  href={project.github}
                  className="inline-flex items-center gap-1.5 text-[var(--foreground)] hover:text-[var(--accent)] transition-colors duration-200 cursor-pointer"
                  target="_blank"
                  rel="noreferrer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4"
                  >
                    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                    <path d="M9 18c-4.51 2-5-2-7-2" />
                  </svg>
                  GitHub
                </a>
              ) : null}
              {project.demo ? (
                <a
                  href={project.demo}
                  className="inline-flex items-center gap-1.5 text-[var(--foreground)] hover:text-[var(--accent)] transition-colors duration-200 cursor-pointer"
                  target="_blank"
                  rel="noreferrer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4"
                  >
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
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
