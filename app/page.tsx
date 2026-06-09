import { SiteNav } from "./components/site-nav";
import {
  education,
  experiences,
  metrics,
  navItems,
  profile,
  projects,
  skillGroups,
  siteUrl,
} from "@/data/portfolio";

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    jobTitle: profile.role,
    url: siteUrl,
    email: profile.email,
    sameAs: [profile.linkedin, profile.github],
    address: {
      "@type": "PostalAddress",
      addressCountry: "IN",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SiteNav items={navItems} />
      <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
        <section
          id="home"
          className="mx-auto grid min-h-screen max-w-6xl content-center gap-12 px-5 pb-24 pt-32 lg:grid-cols-[1.1fr_0.9fr] lg:px-8"
        >
          <div className="max-w-3xl">
            <p className="mb-5 inline-flex rounded-full border border-[var(--border)] bg-[var(--surface)] px-4 py-2 text-sm text-[var(--muted)]">
              {profile.location} / {profile.currentCompany}
            </p>
            <h1 className="text-5xl font-semibold leading-[1.02] tracking-normal sm:text-6xl lg:text-7xl">
              {profile.name}
            </h1>
            <p className="mt-5 max-w-2xl text-2xl font-medium text-[var(--muted)] sm:text-3xl">
              {profile.role}
            </p>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--muted)]">
              {profile.intro}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#projects"
                className="inline-flex items-center justify-center rounded-md bg-[var(--foreground)] px-5 py-3 text-sm font-semibold text-[var(--background)] transition hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
              >
                View Projects
              </a>
              <a
                href="#contact"
                className="inline-flex items-center justify-center rounded-md border border-[var(--border)] bg-[var(--surface)] px-5 py-3 text-sm font-semibold text-[var(--foreground)] transition hover:border-[var(--muted)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
              >
                Contact Me
              </a>
              <a
                href={profile.resume}
                className="inline-flex items-center justify-center rounded-md px-5 py-3 text-sm font-semibold text-[var(--muted)] transition hover:text-[var(--foreground)]"
              >
                Download Resume
              </a>
            </div>
          </div>

          <aside className="grid content-end gap-4 lg:pb-8">
            <div className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-5 shadow-[var(--shadow)]">
              <p className="font-mono text-sm text-[var(--accent)]">
                availability
              </p>
              <p className="mt-3 text-2xl font-semibold">
                Open to impactful software work
              </p>
              <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
                Interested in product engineering, frontend systems, and teams
                that value execution quality.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {metrics.map((metric) => (
                <div
                  key={metric.label}
                  className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-4"
                >
                  <p className="text-2xl font-semibold">{metric.value}</p>
                  <p className="mt-1 text-sm text-[var(--muted)]">
                    {metric.label}
                  </p>
                </div>
              ))}
            </div>
          </aside>
        </section>

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

        <Section
          id="experience"
          eyebrow="Experience"
          title="A timeline of building, shipping, and learning."
        >
          <div className="relative grid gap-6 border-l border-[var(--border)] pl-6">
            {experiences.map((item) => (
              <article
                key={`${item.company}-${item.duration}`}
                className="relative rounded-lg border border-[var(--border)] bg-[var(--surface)] p-6"
              >
                <span className="absolute -left-[31px] top-7 h-3 w-3 rounded-full border-2 border-[var(--background)] bg-[var(--accent)]" />
                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h3 className="text-xl font-semibold">{item.position}</h3>
                    <p className="text-sm text-[var(--muted)]">
                      {item.company}
                    </p>
                  </div>
                  <p className="font-mono text-sm text-[var(--muted)]">
                    {item.duration}
                  </p>
                </div>
                <p className="mt-4 leading-7 text-[var(--muted)]">
                  {item.description}
                </p>
                <ul className="mt-4 grid gap-2 text-sm text-[var(--muted)]">
                  {item.achievements.map((achievement) => (
                    <li key={achievement} className="flex gap-2">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" />
                      <span>{achievement}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </Section>

        <Section
          id="projects"
          eyebrow="Projects"
          title="Featured work with clear product outcomes."
        >
          <div className="grid gap-5 md:grid-cols-2">
            {projects.map((project) => (
              <article
                key={project.name}
                className="group rounded-lg border border-[var(--border)] bg-[var(--surface)] p-5 transition hover:-translate-y-1 hover:shadow-[var(--shadow)]"
              >
                <div
                  className={`mb-5 h-32 rounded-md bg-gradient-to-br ${project.accent} p-4`}
                >
                  <div className="h-full rounded border border-white/30 bg-black/20" />
                </div>
                <h3 className="text-xl font-semibold">{project.name}</h3>
                <p className="mt-3 leading-7 text-[var(--muted)]">
                  {project.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full bg-[var(--surface-strong)] px-3 py-1 text-xs text-[var(--muted)]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <ul className="mt-4 grid gap-2 text-sm text-[var(--muted)]">
                  {project.highlights.map((highlight) => (
                    <li key={highlight}>- {highlight}</li>
                  ))}
                </ul>
                <div className="mt-5 flex gap-4 text-sm font-semibold">
                  <a
                    href={project.github}
                    className="text-[var(--foreground)] hover:text-[var(--accent)]"
                  >
                    GitHub
                  </a>
                  <a
                    href={project.demo}
                    className="text-[var(--foreground)] hover:text-[var(--accent)]"
                  >
                    Live Demo
                  </a>
                </div>
              </article>
            ))}
          </div>
        </Section>

        <Section
          id="skills"
          eyebrow="Skills"
          title="Tools and technologies I use to build."
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

        <Section
          id="education"
          eyebrow="Education"
          title="Academic foundation for software work."
        >
          <div className="grid gap-5">
            {education.map((item) => (
              <article
                key={item.degree}
                className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-6"
              >
                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h3 className="text-xl font-semibold">{item.degree}</h3>
                    <p className="mt-1 text-[var(--muted)]">
                      {item.institution}
                    </p>
                  </div>
                  <p className="font-mono text-sm text-[var(--muted)]">
                    {item.duration}
                  </p>
                </div>
                {item.coursework ? (
                  <div className="mt-5 flex flex-wrap gap-2">
                    {item.coursework.map((course) => (
                      <span
                        key={course}
                        className="rounded-full bg-[var(--surface-strong)] px-3 py-1 text-xs text-[var(--muted)]"
                      >
                        {course}
                      </span>
                    ))}
                  </div>
                ) : null}
              </article>
            ))}
          </div>
        </Section>

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
      </main>
    </>
  );
}

function Section({
  id,
  eyebrow,
  title,
  children,
}: Readonly<{
  id: string;
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}>) {
  return (
    <section id={id} className="mx-auto max-w-6xl px-5 py-20 lg:px-8">
      <div className="mb-10 max-w-3xl">
        <p className="font-mono text-sm text-[var(--accent)]">{eyebrow}</p>
        <h2 className="mt-3 text-3xl font-semibold leading-tight sm:text-4xl">
          {title}
        </h2>
      </div>
      {children}
    </section>
  );
}

function ChipGroup({
  title,
  items,
}: Readonly<{ title: string; items: string[] }>) {
  return (
    <div className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-5">
      <h3 className="font-semibold">{title}</h3>
      <div className="mt-4 flex flex-wrap gap-2">
        {items.map((item) => (
          <span
            key={item}
            className="rounded-full bg-[var(--surface-strong)] px-3 py-1 text-sm text-[var(--muted)]"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

function ContactLink({
  label,
  value,
  href,
}: Readonly<{
  label: string;
  value: string;
  href: string;
}>) {
  const isExternal = href.startsWith("http");

  return (
    <a
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noreferrer" : undefined}
      className="rounded-md border border-[var(--border)] bg-[var(--background)] p-4 transition hover:border-[var(--muted)]"
    >
      <span className="block text-xs uppercase text-[var(--muted)]">
        {label}
      </span>
      <span className="mt-1 block font-semibold">{value}</span>
    </a>
  );
}
