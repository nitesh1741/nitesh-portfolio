import { profile, metrics } from "@/data/portfolio";

export function HeroSection() {
  return (
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
  );
}
