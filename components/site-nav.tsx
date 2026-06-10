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
    <header className="fixed inset-x-0 top-0 z-50 border-b border-[var(--border)] bg-[color-mix(in_srgb,var(--background)_88%,transparent)] backdrop-blur-xl">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3 lg:px-8" aria-label="Primary">
        <a href="#home" className="font-mono text-sm font-semibold tracking-normal text-[var(--foreground)]">
          NK
        </a>

        <div className="hidden items-center gap-1 md:flex">
          {items.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`rounded-full px-3 py-2 text-sm transition ${
                active === item.href
                  ? "bg-[var(--foreground)] text-[var(--background)]"
                  : "text-[var(--muted)] hover:text-[var(--foreground)]"
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
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface)] text-[var(--foreground)] md:hidden"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
          >
            <span className="text-lg leading-none">{open ? "x" : "+"}</span>
          </button>
        </div>
      </nav>

      {open ? (
        <div className="border-t border-[var(--border)] bg-[var(--background)] px-5 py-4 md:hidden">
          <div className="mx-auto grid max-w-6xl gap-2">
            {items.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`rounded-md px-3 py-3 text-sm ${
                  active === item.href
                    ? "bg-[var(--foreground)] text-[var(--background)]"
                    : "text-[var(--muted)] hover:bg-[var(--surface)] hover:text-[var(--foreground)]"
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
