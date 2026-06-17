import { Section } from "./section";
import { ChipGroup } from "./chip-group";
import { skillGroups } from "@/data/portfolio";

export function SkillsSection() {
  return (
    <Section
      id="skills"
      eyebrow="Skills"
      title="Backend, cloud, AI, and full-stack engineering skills."
    >
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((group) => (
          <ChipGroup
            key={group.category}
            title={group.category}
            items={group.skills}
          />
        ))}
      </div>
    </Section>
  );
}
