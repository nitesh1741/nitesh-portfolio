import { profile, metrics } from "@/data/portfolio";

export function HeroSection() {
  return (
    <section
      id="home"
      className="relative mx-auto grid min-h-screen max-w-6xl content-center gap-12 px-5 pb-24 pt-32 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 overflow-visible"
    >
      {/* Decorative Premium Backdrops */}
      <div className="absolute inset-0 -z-10 overflow-visible pointer-events-none">
        <div className="absolute inset-0 bg-dot-grid bg-radial-fade opacity-50 dark:opacity-35" />
        <div className="absolute top-[10%] left-[30%] -translate-x-1/2 w-[500px] h-[500px] rounded-full glow-aura opacity-25 dark:opacity-15 animate-pulse-glow" />
      </div>

      <div className="max-w-3xl flex flex-col justify-center">
        <div className="animate-fade-in-up delay-75">
          <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)] px-4 py-1.5 text-xs font-semibold tracking-wide uppercase text-[var(--muted)] shadow-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)] animate-pulse" />
            {profile.location} / {profile.currentCompany}
          </p>
        </div>
        
        <h1 className="animate-fade-in-up delay-100 text-5xl font-black leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl bg-gradient-to-r from-[var(--foreground)] via-[var(--foreground)] to-[var(--accent)] bg-clip-text text-transparent">
          {profile.name}
        </h1>
        
        <p className="animate-fade-in-up delay-150 mt-5 max-w-2xl text-2xl font-bold text-[var(--accent)] sm:text-3xl tracking-tight">
          {profile.role}
        </p>
        
        <p className="animate-fade-in-up delay-200 mt-6 max-w-2xl text-lg leading-relaxed text-[var(--muted)] font-normal">
          {profile.intro}
        </p>
        
        <div className="animate-fade-in-up delay-300 mt-8 flex flex-col gap-3 sm:flex-row">
          <a
            href="#projects"
            className="inline-flex items-center justify-center rounded-md bg-[var(--accent)] px-6 py-3.5 text-sm font-bold text-[var(--background)] transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] shadow-sm hover:shadow-[0_0_20px_var(--accent-soft)] hover:opacity-95 cursor-pointer"
          >
            View Projects
          </a>
          <a
            href="#contact"
            className="inline-flex items-center justify-center rounded-md border border-[var(--border)] bg-[var(--surface)] px-6 py-3.5 text-sm font-bold text-[var(--foreground)] transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] hover:border-[var(--accent)] hover:bg-[var(--surface-strong)] cursor-pointer"
          >
            Contact Me
          </a>
          <a
            href={profile.resume}
            className="inline-flex items-center justify-center rounded-md px-6 py-3.5 text-sm font-bold text-[var(--muted)] transition-all duration-300 hover:text-[var(--foreground)] hover:translate-x-1 cursor-pointer"
          >
            Download Resume &rarr;
          </a>
        </div>
      </div>

      <aside className="grid content-center gap-5 lg:pb-8 animate-fade-in-up delay-400">
        <div className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-6 shadow-[var(--shadow)] transition-all duration-300 hover:border-[color-mix(in_srgb,var(--accent)_40%,var(--border))] group relative overflow-hidden">
          <div className="flex items-center gap-2">
            <span className="pulse-indicator" />
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--accent)]">
              availability
            </span>
          </div>
          <p className="mt-3.5 text-xl font-bold tracking-tight text-[var(--foreground)]">
            Open to impactful software work
          </p>
          <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
            Interested in product engineering, frontend systems, and teams
            that value execution quality.
          </p>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          {metrics.map((metric, idx) => (
            <div
              key={metric.label}
              className="group rounded-lg border border-[var(--border)] bg-[var(--surface)] p-5 transition-all duration-300 hover:border-[var(--accent)] hover:translate-y-[-2px] hover:shadow-md"
            >
              <p className="text-3xl font-black tracking-tight text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors duration-300">
                {metric.value}
              </p>
              <p className="mt-1.5 text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">
                {metric.label}
              </p>
            </div>
          ))}
        </div>
      </aside>

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 opacity-60 hover:opacity-100 transition-opacity animate-float hidden lg:flex">
        <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--muted)]">Scroll</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-4 w-4 text-[var(--accent)] animate-bounce"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </div>
    </section>
  );
}
