"use client";

import { projects } from "@/data/portfolio";
import { Section } from "@/components/section";
import Link from "next/link";

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
            {/* Fix 3: Project name with group-hover accent color */}
            <h3 className="font-display text-xl text-[var(--fg)] mb-2 group-hover:text-[var(--accent)] transition-colors duration-200">
              {project.name}
            </h3>

            {/* Description */}
            <p className="font-sans text-sm text-[var(--fg-2)] leading-relaxed mb-4 flex-1">
              {project.description}
            </p>

            {/* Fix 1: Highlights — field exists in Project type */}
            {project.highlights && project.highlights.length > 0 && (
              <ul className="mb-4 space-y-1">
                {project.highlights.map((h, i) => (
                  <li key={i} className="flex gap-2 text-xs text-[var(--fg-2)]">
                    <span className="text-[var(--accent-dim)] mt-0.5">▸</span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            )}

            {/* Fix 4: Tech chips with border-[var(--border)] instead of border-[var(--accent)] */}
            <div className="mb-4 flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="font-mono text-[0.62rem] px-2 py-0.5 border border-[var(--border)] text-[var(--accent)] bg-[var(--accent-bg)]"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Fix 5: Links row with border-t separator; Fix 2: Case Study link added */}
            <div className="mt-5 flex items-center gap-4 border-t border-[var(--border)] pt-4">
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
              <Link
                href={`/projects/${project.slug}`}
                className="font-mono text-xs text-[var(--fg-2)] hover:text-[var(--fg)] transition-colors"
              >
                Case Study →
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Fix 6: View all projects with reveal, inline-flex, text-xs, tracking, uppercase */}
      <div className="mt-10 text-center reveal">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 font-mono text-xs tracking-[0.18em] uppercase text-[var(--muted)] hover:text-[var(--accent)] transition-colors"
        >
          View all projects →
        </Link>
      </div>
    </Section>
  );
}
