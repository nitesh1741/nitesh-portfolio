import { skillGroups } from "@/data/portfolio";
import { Section } from "@/components/section";
import { ChipGroup } from "@/components/chip-group";

export function SkillsSection() {
  return (
    <Section
      id="skills"
      number="04"
      label="skills"
      heading="What I work with."
      className="bg-[var(--bg)]"
    >
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {skillGroups.map((group, i) => (
          <div
            key={group.category}
            className="reveal"
            style={{ transitionDelay: `${i * 70}ms` }}
          >
            <ChipGroup title={group.category} items={group.skills} />
          </div>
        ))}
      </div>
    </Section>
  );
}
