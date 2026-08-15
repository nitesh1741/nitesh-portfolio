"use client";

import { useEffect, useState } from "react";
import type { NavItem } from "@/types/portfolio";
import { ThemeController } from "./theme-controller";

type SiteNavProps = {
  items: NavItem[];
};

export function SiteNav({ items }: Readonly<SiteNavProps>) {
  const [active, setActive] = useState(items[0]?.href ?? "");
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 40);

      const isAtBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 80;

      if (isAtBottom && items.length > 0) {
        setActive(items[items.length - 1].href);
        return;
      }
      if (window.scrollY < 80 && items.length > 0) {
        setActive(items[0].href);
        return;
      }

      const scrollPos = window.scrollY + window.innerHeight / 3;
      let current = items[0]?.href ?? "";
      for (const item of items) {
        const el = document.querySelector(item.href);
        if (el) {
          const top = el.getBoundingClientRect().top + window.scrollY;
          if (scrollPos >= top) current = item.href;
        }
      }
      setActive(current);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [items]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[color-mix(in_srgb,var(--bg)_88%,transparent)] backdrop-blur-xl border-b border-[var(--border)]"
          : "bg-transparent"
      }`}
    >
      <nav
        className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 lg:px-8"
        aria-label="Primary"
      >
        {/* Logo */}
        <a
          href="#home"
          className="flex items-center gap-2.5 font-mono text-sm font-bold tracking-[0.18em] uppercase text-[var(--fg)] hover:text-[var(--accent)] transition-colors duration-300"
        >
          <span className="inline-block h-2 w-2 rounded-full bg-[var(--accent)] animate-pulse" />
          NK.
        </a>

        {/* Desktop navigation */}
        <div className="hidden items-center gap-7 md:flex">
          {items.map((item, idx) => (
            <a
              key={item.href}
              href={item.href}
              className={`group relative font-mono text-[0.7rem] tracking-[0.14em] uppercase transition-colors duration-200 ${
                active === item.href
                  ? "text-[var(--fg)]"
                  : "text-[var(--muted)] hover:text-[var(--fg)]"
              }`}
            >
              {/* Number revealed on hover */}
              <span className="mr-1 text-[0.55rem] text-[var(--accent)] opacity-0 group-hover:opacity-100 transition-opacity duration-200 align-middle">
                {String(idx + 1).padStart(2, "0")}
              </span>
              {item.label}
              {/* Active / hover underline */}
              <span
                className={`absolute -bottom-1 left-0 h-px bg-[var(--accent)] transition-all duration-300 ${
                  active === item.href
                    ? "w-full"
                    : "w-0 group-hover:w-full"
                }`}
              />
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <ThemeController />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={open}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface)] text-[var(--fg)] transition-all hover:border-[var(--accent)] md:hidden cursor-pointer"
          >
            <span className="text-lg font-light leading-none">
              {open ? "×" : "≡"}
            </span>
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      {open && (
        <div className="border-t border-[var(--border)] bg-[var(--bg)] px-5 py-6 md:hidden animate-fade-in">
          <div className="mx-auto grid max-w-6xl gap-1">
            {items.map((item, idx) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-4 rounded-md px-4 py-3 font-mono text-xs tracking-wide uppercase transition-all duration-200 ${
                  active === item.href
                    ? "bg-[var(--accent-light)] text-[var(--accent)]"
                    : "text-[var(--muted)] hover:bg-[var(--surface)] hover:text-[var(--fg)]"
                }`}
              >
                <span className="text-[0.55rem] text-[var(--accent)] opacity-60">
                  {String(idx + 1).padStart(2, "0")}
                </span>
                {item.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
