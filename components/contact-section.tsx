import { profile } from "@/data/portfolio";
import { Section } from "@/components/section";
import { ContactLink } from "@/components/contact-link";

export function ContactSection() {
  return (
    <Section
      id="contact"
      number="07"
      label="contact"
      heading="Let's build something."
      className="bg-[var(--bg-alt)]"
    >
      <p className="reveal font-display text-lg italic text-[var(--fg-2)] mb-10">
        Open to backend, AI/ML, and full-stack opportunities.
      </p>

      <div className="reveal grid grid-cols-1 sm:grid-cols-2 gap-4">
        <ContactLink href={profile.github} label="GitHub" external />
        <ContactLink href={profile.linkedin} label="LinkedIn" external />
        <ContactLink href={`mailto:${profile.email}`} label={profile.email} />
        <ContactLink href={profile.resume} label="Resume / CV" external />
      </div>
    </Section>
  );
}
