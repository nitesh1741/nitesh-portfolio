"use client";

import { useEffect, useState } from "react";
import type { NavItem } from "@/types/portfolio";
import { ThemeController } from "./theme-controller";

type SiteNavProps = {
  items: NavItem[];
};

export function SiteNav({ items }: SiteNavProps) {
  const [active, setActive] = useState(items[0]?.href ?? "#home");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const observers = items
      .map((item) => document.querySelector(item.href))
      .filter((section): section is Element => Boolean(section));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target.id) {
          setActive(`#${visible.target.id}`);
        }
      },
      { rootMargin: "-25% 0px -60% 0px", threshold: [0.15, 0.35, 0.6] },
    );

    observers.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [items]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-[color-mix(in_srgb,var(--border)_50%,transparent)] bg-[color-mix(in_srgb,var(--background)_85%,transparent)] backdrop-blur-md transition-all duration-300">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5 lg:px-8" aria-label="Primary">
        <a href="#home" className="group font-mono text-sm font-bold tracking-tight text-[var(--foreground)] flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--accent)] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--accent)]"></span>
          </span>
          <span className="transition-colors duration-300 group-hover:text-[var(--accent)]">nitesh.dev</span>
        </a>

        <div className="hidden items-center gap-1 md:flex">
          {items.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                active === item.href
                  ? "bg-[var(--accent-soft)] text-[var(--accent)]"
                  : "text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[color-mix(in_srgb,var(--border)_25%,transparent)]"
              }`}
            >
              {item.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <ThemeController />
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface)] text-[var(--foreground)] transition-all hover:border-[var(--accent)] md:hidden cursor-pointer"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
          >
            <span className="text-xl leading-none font-light">{open ? "×" : "+"}</span>
          </button>
        </div>
      </nav>

      {open ? (
        <div className="border-t border-[var(--border)] bg-[var(--background)] px-5 py-4 md:hidden animate-fade-in">
          <div className="mx-auto grid max-w-6xl gap-2">
            {items.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`rounded-md px-4 py-3 text-sm font-semibold tracking-wide uppercase transition-all duration-200 ${
                  active === item.href
                    ? "bg-[var(--accent-soft)] text-[var(--accent)]"
                    : "text-[var(--muted)] hover:bg-[var(--surface-strong)] hover:text-[var(--foreground)]"
                }`}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      ) : null}
    </header>
  );
}
