import { profile } from "@/data/portfolio";

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--bg)]">
      <div className="mx-auto max-w-6xl px-5 py-8 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
          <span className="font-mono text-[0.62rem] tracking-[0.16em] uppercase text-[var(--muted)]">
            {profile.name} — {profile.role}
          </span>
        </div>
        <div className="flex items-center gap-3 font-mono text-[0.6rem] tracking-[0.14em] uppercase text-[var(--muted)]">
          <span>{year}</span>
          <span className="text-[var(--border)]">·</span>
          <span>{profile.homeLocation.city}, {profile.homeLocation.country}</span>
          <span className="text-[var(--border)]">·</span>
          <span>Originally from {profile.birthPlace.district}, {profile.birthPlace.country}</span>
        </div>
      </div>
    </footer>
  );
}
