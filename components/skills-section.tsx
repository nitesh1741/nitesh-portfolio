import { Section } from "./section";
import { skillGroups } from "@/data/portfolio";

export function SkillsSection() {
  return (
    <Section
      id="skills"
      number="04"
      label="Skills"
      heading="The stack behind the systems I build."
      className="bg-[var(--bg-alt)]"
    >
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((group, idx) => (
          <div
            key={group.category}
            className="reveal group border border-[var(--border)] bg-[var(--surface)] p-6 transition-all duration-300 hover:border-[var(--accent)]"
          >
            <div className="flex items-center justify-between mb-5">
              <p className="font-mono text-[0.62rem] tracking-[0.22em] uppercase text-[var(--accent)]">
                {group.category}
              </p>
              <span
                aria-hidden="true"
                className="font-black text-3xl leading-none text-[var(--border)] select-none"
              >
                {String(idx + 1).padStart(2, "0")}
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {group.skills.map((skill) => (
                <span
                  key={skill}
                  className="border border-[var(--border)] px-3 py-1 font-mono text-xs text-[var(--muted)] hover:border-[var(--accent)] hover:text-[var(--fg)] transition-all duration-200 cursor-default"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
