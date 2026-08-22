export function SiteFooter() {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--bg)] py-8">
      <div className="mx-auto max-w-6xl px-5 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Terminal prompt logo */}
        <div className="flex items-center gap-2 font-mono text-xs text-[var(--muted)]">
          <span className="text-[var(--accent)]">nitesh@portfolio:~$</span>
          <span className="animate-blink text-[var(--accent)]">█</span>
        </div>
        {/* Copyright */}
        <p className="font-mono text-[0.6rem] tracking-[0.18em] uppercase text-[var(--muted)]">
          © {new Date().getFullYear()} Nitesh Kumar Mehta · Hyderabad, India
        </p>
      </div>
    </footer>
  );
}
