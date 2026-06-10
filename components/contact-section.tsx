import { Section } from "./section";
import { ContactLink } from "./contact-link";
import { profile } from "@/data/portfolio";

export function ContactSection() {
  return (
    <Section
      id="contact"
      eyebrow="Contact"
      title="Let's build something meaningful together."
    >
      <div className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-8">
        <p className="max-w-2xl text-lg leading-8 text-[var(--muted)]">
          Open to collaborating on impactful software products, hackathons,
          and engineering initiatives.
        </p>
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <ContactLink
            label="Email"
            value={profile.email}
            href={`mailto:${profile.email}`}
          />
          <ContactLink
            label="LinkedIn"
            value="Connect"
            href={profile.linkedin}
          />
          <ContactLink
            label="GitHub"
            value="View Code"
            href={profile.github}
          />
          <ContactLink label="Location" value={profile.location} href="#home" />
        </div>
      </div>
    </Section>
  );
}
