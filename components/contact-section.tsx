import { Section } from "./section";
import { ContactLink } from "./contact-link";
import { profile } from "@/data/portfolio";

export function ContactSection() {
  return (
    <Section
      id="contact"
      eyebrow="Contact"
      title="Work with a backend software engineer in Hyderabad."
    >
      <div className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-8">
        <p className="max-w-2xl text-lg leading-8 text-[var(--muted)]">
          Open to backend, cloud, and AI engineering opportunities involving
          .NET microservices, Azure, Kafka, Redis, RAG systems, and
          production-grade automation.
        </p>
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
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
            label="GitHub (nitesh1741)"
            value="Primary Profile"
            href={profile.github}
          />
          <ContactLink
            label="GitHub (nitesh-147)"
            value="Secondary Profile"
            href={profile.githubSecondary}
          />
          <ContactLink 
            label="Location" 
            value={profile.location} 
            href="#home" 
          />
          <ContactLink 
            label="Hometown" 
            value={profile.origin} 
            href="#home" 
          />
        </div>
      </div>
    </Section>
  );
}
