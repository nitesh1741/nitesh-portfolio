import { Section } from "./section";
import { ChipGroup } from "./chip-group";
import { profile } from "@/data/portfolio";

export function AboutSection() {
  return (
    <Section
      id="about"
      eyebrow="About"
      title="Practical engineering with a product mindset."
    >
      <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr]">
        <p className="text-lg leading-8 text-[var(--muted)]">
          {profile.summary}
        </p>
        <div className="grid gap-6 sm:grid-cols-2">
          <ChipGroup title="Interests" items={profile.interests} />
          <ChipGroup title="Expertise" items={profile.expertise} />
        </div>
      </div>
    </Section>
  );
}
