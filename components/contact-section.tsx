import { Section } from "./section";
import { ContactLink } from "./contact-link";
import { profile } from "@/data/portfolio";

export function ContactSection() {
  return (
    <Section
      id="contact"
      number="07"
      label="Contact"
      heading="Let's build something together."
    >
      <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr]">

        {/* Left: Invite */}
        <div className="reveal flex flex-col gap-6">
          <p className="text-lg leading-8 text-[var(--muted)]">
            Open to backend, cloud, and AI engineering opportunities involving
            .NET microservices, Azure, Kafka, Redis, RAG systems, and
            production-grade automation.
          </p>
          <div className="flex flex-col gap-1.5">
            <p className="font-mono text-[0.62rem] tracking-[0.22em] uppercase text-[var(--accent)]">
              Currently at
            </p>
            <p className="font-display text-xl text-[var(--fg)]">
              {profile.currentCompany}
            </p>
            <p className="font-mono text-xs text-[var(--muted)]">
              {profile.location}
            </p>
          </div>
          <div className="h-px w-full bg-[var(--border)]" />
          <p className="font-mono text-[0.62rem] tracking-[0.16em] text-[var(--muted)]">
            {profile.originSentence}
          </p>
        </div>

        {/* Right: Contact link grid */}
        <div className="reveal grid gap-3 sm:grid-cols-2 content-start">
          <ContactLink
            label="Email"
            value={profile.email}
            href={`mailto:${profile.email}`}
          />
          <ContactLink label="LinkedIn" value="Connect" href={profile.linkedin} />
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
          <ContactLink label="Hometown" value={profile.origin} href="#home" />
        </div>
      </div>
    </Section>
  );
}
