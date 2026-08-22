# Portfolio Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Re-engineer the entire portfolio visual design — new design tokens, Instrument Serif display font, editorial section layout with numbered headers, new Competitive Programming section, and all section components fully rewritten.

**Architecture:** All content stays in `data/` unchanged. Components are rewritten in-place (same filenames). Two new files are created: `metrics-counter.tsx` and `cp-section.tsx`. The `Section` wrapper gains a new prop signature (`number`, `label`, `heading` instead of `eyebrow`, `title`).

**Tech Stack:** Next.js 16.2.7, React 19, TypeScript 5 (strict), Tailwind CSS v4, Geist + Instrument Serif (next/font/google)

**Spec:** `docs/superpowers/specs/2026-08-15-portfolio-redesign-design.md`

## Global Constraints

- TypeScript strict — no `any`, no untyped props
- No external UI libraries; fonts via `next/font/google` are allowed
- Tailwind v4: config in CSS only, no `tailwind.config.js`
- `@/` path alias resolves from repo root
- kebab-case filenames throughout
- All personal content imported from `@/data/portfolio` — never hardcoded in components
- `npm run lint` must pass after every task; `npm run build` must succeed after Task 14
- No test framework exists — verification is visual via `npm run dev` + lint

---

### Task 1: CSS Foundation + Font Integration

**Files:**
- Modify: `app/globals.css` (full rewrite)
- Modify: `app/layout.tsx`

**What this does:** Establishes the new design token system (olive/sage palette), adds Instrument Serif as a CSS variable font, changes the default theme to light, and sets up the scroll-reveal and hero animation utilities. All subsequent tasks depend on these tokens.

- [ ] **Step 1: Rewrite `app/globals.css`**

Replace the entire file with:

```css
@import "tailwindcss";

/* ─── Design Tokens ──────────────────────────────────────────────── */
:root {
  --bg: #f5f3ee;
  --bg-alt: #efede7;
  --surface: #ffffff;
  --fg: #1c1c1a;
  --fg-2: #3a3a37;
  --muted: #7a756e;
  --accent: #4d7a3e;
  --accent-light: #e6f0e2;
  --border: #e0ddd5;
  --shadow-sm: 0 1px 4px rgb(0 0 0 / 0.05);
  --shadow-md: 0 4px 24px rgb(0 0 0 / 0.07);
  --shadow-lg: 0 16px 48px rgb(0 0 0 / 0.09);
}

@theme inline {
  --color-background: var(--bg);
  --color-foreground: var(--fg);
  --font-sans: var(--font-geist-sans);
  --font-mono: var(--font-geist-mono);
  --font-display: var(--font-instrument-serif);
}

html[data-theme="dark"] {
  --bg: #0e100a;
  --bg-alt: #141710;
  --surface: #171a10;
  --fg: #f0ede6;
  --fg-2: #cac7be;
  --muted: #9e9b92;
  --accent: #7db868;
  --accent-light: #1b2614;
  --border: #2a2e1f;
  --shadow-sm: 0 1px 4px rgb(0 0 0 / 0.25);
  --shadow-md: 0 4px 24px rgb(0 0 0 / 0.35);
  --shadow-lg: 0 16px 48px rgb(0 0 0 / 0.45);
}

html[data-theme="light"] {
  --bg: #f5f3ee;
  --bg-alt: #efede7;
  --surface: #ffffff;
  --fg: #1c1c1a;
  --fg-2: #3a3a37;
  --muted: #7a756e;
  --accent: #4d7a3e;
  --accent-light: #e6f0e2;
  --border: #e0ddd5;
  --shadow-sm: 0 1px 4px rgb(0 0 0 / 0.05);
  --shadow-md: 0 4px 24px rgb(0 0 0 / 0.07);
  --shadow-lg: 0 16px 48px rgb(0 0 0 / 0.09);
}

body {
  background: var(--bg);
  color: var(--fg);
  font-family: var(--font-sans), Arial, Helvetica, sans-serif;
}

html {
  scrollbar-gutter: stable;
  scrollbar-width: thin;
  scrollbar-color: var(--accent) var(--bg);
}

::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-track {
  background: var(--bg);
}

::-webkit-scrollbar-thumb {
  border-radius: 999px;
  background: color-mix(in srgb, var(--accent) 50%, var(--bg));
}

::-webkit-scrollbar-thumb:hover {
  background: var(--accent);
}

::selection {
  background: var(--accent-light);
  color: var(--fg);
}

section {
  scroll-margin-top: 72px;
}

@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

/* ─── Hero Entry Animations ──────────────────────────────────────── */
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(22px); }
  to   { opacity: 1; transform: translateY(0); }
}

@keyframes fadeIn {
  from { opacity: 0; }
  to   { opacity: 1; }
}

.animate-fade-in-up {
  opacity: 0;
  animation: fadeInUp 0.9s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.animate-fade-in {
  opacity: 0;
  animation: fadeIn 0.9s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

/* ─── Scroll Reveal ──────────────────────────────────────────────── */
.reveal {
  opacity: 0;
  transform: translateY(20px);
  transition:
    opacity 0.75s cubic-bezier(0.16, 1, 0.3, 1),
    transform 0.75s cubic-bezier(0.16, 1, 0.3, 1);
}

.reveal.revealed {
  opacity: 1;
  transform: translateY(0);
}
```

- [ ] **Step 2: Update `app/layout.tsx`** — add Instrument Serif font and change default theme to light

Replace the entire file with:

```tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { profile, siteUrl } from "@/data/portfolio";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-instrument-serif",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Nitesh Kumar Mehta | .NET Backend & Agentic AI Engineer",
    template: "%s | Nitesh Kumar Mehta",
  },
  description:
    "Portfolio of Nitesh Kumar Mehta (Neetesh), a software engineer from Bhokraha, Sunsari, Nepal — now at CHUBB India, Hyderabad — building .NET microservices, Azure/Kafka event pipelines, Redis caching systems, and Agentic AI apps.",
  keywords: profile.seoKeywords,
  authors: [{ name: "Nitesh Kumar Mehta" }],
  creator: "Nitesh Kumar Mehta",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Nitesh Kumar Mehta | .NET Backend & Agentic AI Engineer",
    description:
      "Backend, cloud, and AI engineering portfolio — .NET microservices, Azure, Kafka, Redis, LangChain, RAG, and production systems. Engineer from Sunsari, Nepal at CHUBB India, Hyderabad.",
    url: "/",
    siteName: "Nitesh Kumar Mehta Portfolio",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Nitesh Kumar Mehta — .NET Backend and Agentic AI Engineer from Nepal, based in Hyderabad",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nitesh Kumar Mehta | .NET Backend & Agentic AI Engineer",
    description:
      "Software engineer from Sunsari, Nepal — building .NET microservices, Azure/Kafka pipelines, Redis caching, and Agentic AI apps at CHUBB India, Hyderabad.",
    images: ["/opengraph-image"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-theme="light"
      className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} h-full scroll-smooth antialiased`}
    >
      <head>
        <meta name="geo.region" content="IN-TG" />
        <meta name="geo.placename" content="Hyderabad, Telangana, India" />
        <meta name="geo.position" content="17.3850;78.4867" />
        <meta name="ICBM" content="17.3850, 78.4867" />
      </head>
      <body className="min-h-full flex flex-col bg-[var(--bg)] text-[var(--fg)]">{children}</body>
    </html>
  );
}
```

- [ ] **Step 3: Verify**

Run `npm run lint`. Expected: no errors.

Start `npm run dev`. Open `http://localhost:3000`.

Expected: page background is warm off-white `#f5f3ee`. The existing components will look broken (they reference old CSS variables) — that is expected at this stage; they will be fixed in subsequent tasks.

- [ ] **Step 4: Commit**

```bash
git add app/globals.css app/layout.tsx
git commit -m "feat: new design tokens, Instrument Serif font, light-first theme"
```

---

### Task 2: Type Definitions + CP Data + Nav Items

**Files:**
- Modify: `types/portfolio.ts`
- Modify: `data/portfolio.ts`

**What this does:** Adds the `CPProfile` type hierarchy and the `cpProfile` data export. Updates `navItems` to remove "Home" and add "Compete" — the nav logo handles Home navigation.

- [ ] **Step 1: Add CP types to `types/portfolio.ts`**

Append the following to the end of the file (after the existing `Profile` type):

```ts
export type CPPlatform = {
  name: string;
  handle: string;
  solvedCount: number;
  url: string;
};

export type CPContest = {
  name: string;
  rank: number;
  totalParticipants: number;
  year: number;
};

export type CPProfile = {
  totalSolved: number;
  platforms: CPPlatform[];
  contests: CPContest[];
};
```

- [ ] **Step 2: Update `data/portfolio.ts`** — add the CP import and two exports

At the top of `data/portfolio.ts`, add `CPProfile` to the import:

```ts
import type {
  CPProfile,
  Education,
  Experience,
  FaqItem,
  GeoLocation,
  Metric,
  NavItem,
  Profile,
  Project,
  SkillGroup,
} from "@/types/portfolio";
```

Replace the `navItems` export with (remove Home, add Compete):

```ts
export const navItems: NavItem[] = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Work", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Compete", href: "#compete" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
];
```

Append the following after the `education` export (at the bottom of the file):

```ts
// ── Competitive Programming ──────────────────────────────────────
// NOTE: Verify exact platform-specific counts and profile URLs before deploying.
// The breakdown below sums to totalSolved; adjust per actual platform stats.
export const cpProfile: CPProfile = {
  totalSolved: 3000,
  platforms: [
    {
      name: "LeetCode",
      handle: "nitesh1741",
      solvedCount: 1200,
      url: "https://leetcode.com/u/nitesh1741/",
    },
    {
      name: "GeeksforGeeks",
      handle: "nitesh1741",
      solvedCount: 1000,
      url: "https://www.geeksforgeeks.org/user/nitesh1741/",
    },
    {
      name: "CodeChef",
      handle: "nitesh1741",
      solvedCount: 800,
      url: "https://www.codechef.com/users/nitesh1741",
    },
  ],
  contests: [
    {
      name: "Google Kick Start 2022",
      rank: 1532,
      totalParticipants: 22000,
      year: 2022,
    },
  ],
};
```

- [ ] **Step 3: Verify**

Run `npm run lint`. Expected: no TypeScript errors. The `CPProfile` type is used in the `cpProfile` satisfies check implicitly — if the shape is wrong, TypeScript will surface it.

- [ ] **Step 4: Commit**

```bash
git add types/portfolio.ts data/portfolio.ts
git commit -m "feat: add CPProfile types, cpProfile data, update nav items"
```

---

### Task 3: Editorial Section Wrapper

**Files:**
- Modify: `components/section.tsx` (full rewrite)

**Interfaces:**
- Produces: `Section` component with props `{ id, number, label, heading, children, className? }` — all section components in Tasks 7–13 consume this.

**What this does:** Replaces the old `Section({ id, eyebrow, title, children })` with a new editorial wrapper that renders a large decorative background number, a mono eyebrow label, and an Instrument Serif heading. Sets up `IntersectionObserver` to stagger-reveal `.reveal` children.

- [ ] **Step 1: Rewrite `components/section.tsx`**

Replace the entire file with:

```tsx
"use client";

import { useEffect, useRef } from "react";
import type { ReactNode } from "react";

type SectionProps = {
  id: string;
  number: string;
  label: string;
  heading: string;
  children: ReactNode;
  className?: string;
};

export function Section({
  id,
  number,
  label,
  heading,
  children,
  className = "",
}: Readonly<SectionProps>) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const revealEls = section.querySelectorAll<HTMLElement>(".reveal");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).classList.add("revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -60px 0px" },
    );

    revealEls.forEach((el, i) => {
      el.style.transitionDelay = `${i * 70}ms`;
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id={id}
      className={`relative py-28 scroll-mt-24 ${className}`}
    >
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        {/* Editorial section header */}
        <header className="mb-16 relative overflow-hidden">
          {/* Large decorative background number — Geist Sans, not Instrument Serif */}
          <span
            aria-hidden="true"
            className="absolute -top-2 left-0 select-none pointer-events-none font-black leading-none text-[var(--border)]"
            style={{ fontSize: "clamp(5rem, 14vw, 9rem)" }}
          >
            {number}
          </span>
          {/* Mono eyebrow label */}
          <p className="relative pt-12 font-mono text-[0.65rem] tracking-[0.3em] uppercase text-[var(--accent)] mb-2">
            {label}
          </p>
          {/* Display heading — Instrument Serif */}
          <h2 className="relative font-display text-3xl sm:text-4xl lg:text-5xl leading-[1.1] text-[var(--fg)] max-w-2xl">
            {heading}
          </h2>
          {/* Accent rule */}
          <div className="mt-5 h-px w-14 bg-[var(--accent)] opacity-70" />
        </header>
        {children}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify**

Run `npm run lint`. Expected: no errors.

`npm run dev`: the existing section components will fail to compile because they pass `eyebrow` and `title` props that no longer exist. That is expected — they are all rewritten in subsequent tasks. If lint passes on the section file in isolation, proceed.

- [ ] **Step 3: Commit**

```bash
git add components/section.tsx
git commit -m "feat: editorial section wrapper with numbered header and scroll reveal"
```

---

### Task 4: MetricsCounter Component

**Files:**
- Create: `components/metrics-counter.tsx`

**Interfaces:**
- Consumes: `{ value: string; label: string }[]` — same shape as `Metric[]` in `types/portfolio.ts`
- Produces: `MetricsCounter` component — used by `hero-section.tsx` in Task 6

**What this does:** Client component that animates each metric value from 0 to its target using an ease-out-cubic `requestAnimationFrame` loop, triggered by `IntersectionObserver` when the metrics strip first enters the viewport.

- [ ] **Step 1: Create `components/metrics-counter.tsx`**

```tsx
"use client";

import { useEffect, useRef, useState } from "react";

type ParsedMetric = {
  raw: number;
  suffix: string;
  label: string;
};

function parseMetricValue(value: string): { raw: number; suffix: string } {
  // Remove commas, then match leading number and trailing suffix
  // "5,000+" → "5000+" → raw:5000, suffix:"+"
  // "60%"    → raw:60,   suffix:"%"
  // "2+"     → raw:2,    suffix:"+"
  const cleaned = value.replace(/,/g, "");
  const match = cleaned.match(/^([\d.]+)(.*)$/);
  if (!match) return { raw: 0, suffix: value };
  return { raw: parseFloat(match[1]), suffix: match[2] };
}

function CountUp({ raw, suffix }: { raw: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const spanRef = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = spanRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const DURATION = 1600;
          const startTime = performance.now();

          const tick = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / DURATION, 1);
            // Ease-out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.round(eased * raw));
            if (progress < 1) requestAnimationFrame(tick);
          };

          requestAnimationFrame(tick);
          observer.disconnect();
        }
      },
      { threshold: 0.5 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [raw]);

  const formatted = count >= 1000 ? count.toLocaleString() : String(count);

  return (
    <span ref={spanRef}>
      {formatted}
      {suffix}
    </span>
  );
}

type MetricsCounterProps = {
  metrics: { value: string; label: string }[];
};

export function MetricsCounter({ metrics }: Readonly<MetricsCounterProps>) {
  const parsed: ParsedMetric[] = metrics.map((m) => ({
    ...parseMetricValue(m.value),
    label: m.label,
  }));

  return (
    <div className="border-t border-b border-[var(--border)] py-8 grid grid-cols-2 gap-8 sm:grid-cols-4">
      {parsed.map((m) => (
        <div key={m.label} className="flex flex-col gap-1.5">
          <span className="font-display text-3xl sm:text-4xl text-[var(--fg)]">
            <CountUp raw={m.raw} suffix={m.suffix} />
          </span>
          <span className="font-mono text-[0.6rem] tracking-[0.22em] uppercase text-[var(--muted)] leading-relaxed">
            {m.label}
          </span>
        </div>
      ))}
    </div>
  );
}
```

- [ ] **Step 2: Verify**

Run `npm run lint`. Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add components/metrics-counter.tsx
git commit -m "feat: MetricsCounter with count-up animation on IntersectionObserver"
```

---

### Task 5: Navigation

**Files:**
- Modify: `components/site-nav.tsx` (full rewrite)

**What this does:** Replaces the pill-tab nav with an editorial style — monospace label text, per-item number revealed on hover, thin olive underline for active, transparent → blur glassmorphism after 40px scroll.

- [ ] **Step 1: Rewrite `components/site-nav.tsx`**

Replace the entire file with:

```tsx
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
```

- [ ] **Step 2: Verify**

Run `npm run lint`. `npm run dev`: the nav should render with `NK.` logo on left, 7 items (About through Contact) on desktop.

- [ ] **Step 3: Commit**

```bash
git add components/site-nav.tsx
git commit -m "feat: editorial navigation with numbered hover, underline active, blur on scroll"
```

---

### Task 6: Hero Section

**Files:**
- Modify: `components/hero-section.tsx` (full rewrite)

**Interfaces:**
- Consumes: `MetricsCounter` from Task 4; `profile` and `metrics` from `@/data/portfolio`

**What this does:** Full-viewport editorial hero. Name splits into first/last lines in Instrument Serif at display scale. Metrics strip with count-up. Squared CTA buttons. Profile photo with olive corner accents, grayscale by default.

- [ ] **Step 1: Rewrite `components/hero-section.tsx`**

Replace the entire file with:

```tsx
import Image from "next/image";
import { metrics, profile } from "@/data/portfolio";
import { MetricsCounter } from "./metrics-counter";

export function HeroSection() {
  // Split "Nitesh Kumar Mehta" → firstName="Nitesh Kumar", lastName="Mehta"
  const nameParts = profile.name.split(" ");
  const lastName = nameParts[nameParts.length - 1];
  const firstName = nameParts.slice(0, -1).join(" ");

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-end pb-20 pt-32 overflow-hidden scroll-mt-0"
    >
      {/* Subtle radial bg texture */}
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        aria-hidden="true"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_55%_at_50%_-5%,color-mix(in_srgb,var(--accent)_5%,transparent),transparent)]" />
      </div>

      <div className="mx-auto w-full max-w-6xl px-5 lg:px-8">
        <div className="grid lg:grid-cols-[1fr_auto] gap-12 lg:gap-20 items-end">

          {/* ── Left: Text content ── */}
          <div>
            {/* Status badges */}
            <div className="animate-fade-in-up mb-8 flex flex-wrap gap-3">
              <span className="inline-flex items-center gap-2 border border-[var(--border)] bg-[var(--surface)] px-3 py-1.5 font-mono text-[0.62rem] tracking-[0.16em] uppercase text-[var(--muted)] rounded-full">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)] animate-pulse" />
                {profile.location}
              </span>
              <span className="inline-flex items-center gap-2 border border-[var(--border)] bg-[var(--surface)] px-3 py-1.5 font-mono text-[0.62rem] tracking-[0.16em] uppercase text-[var(--muted)] rounded-full">
                {profile.currentCompany}
              </span>
            </div>

            {/* Name — Instrument Serif, editorial scale */}
            <h1
              className="animate-fade-in-up font-display leading-[0.95] tracking-tight text-[var(--fg)]"
              style={{
                fontSize: "clamp(3rem, 8.5vw, 7rem)",
                animationDelay: "80ms",
              }}
            >
              <span className="block">{firstName}</span>
              <span className="block">{lastName}</span>
            </h1>

            {/* Role */}
            <p
              className="animate-fade-in-up mt-6 font-mono text-xs tracking-[0.22em] uppercase text-[var(--accent)]"
              style={{ animationDelay: "180ms" }}
            >
              — {profile.role}
            </p>

            {/* Intro paragraph */}
            <p
              className="animate-fade-in-up mt-5 max-w-xl text-base sm:text-lg leading-relaxed text-[var(--muted)]"
              style={{ animationDelay: "280ms" }}
            >
              {profile.intro}
            </p>

            {/* Metrics count-up strip */}
            <div
              className="animate-fade-in-up mt-10"
              style={{ animationDelay: "380ms" }}
            >
              <MetricsCounter metrics={metrics} />
            </div>

            {/* CTA buttons — square corners, editorial feel */}
            <div
              className="animate-fade-in-up mt-10 flex flex-wrap gap-4"
              style={{ animationDelay: "480ms" }}
            >
              <a
                href="#projects"
                className="inline-flex items-center gap-2 border border-[var(--fg)] bg-[var(--fg)] px-7 py-3.5 font-mono text-[0.7rem] tracking-[0.2em] uppercase text-[var(--bg)] transition-all duration-300 hover:bg-transparent hover:text-[var(--fg)] cursor-pointer"
              >
                View Work
              </a>
              <a
                href={profile.resume}
                className="inline-flex items-center gap-2 border border-[var(--border)] px-7 py-3.5 font-mono text-[0.7rem] tracking-[0.2em] uppercase text-[var(--muted)] transition-all duration-300 hover:border-[var(--fg)] hover:text-[var(--fg)] cursor-pointer"
              >
                Resume →
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 font-mono text-[0.7rem] tracking-[0.2em] uppercase text-[var(--muted)] transition-all duration-300 hover:text-[var(--accent)] cursor-pointer"
              >
                Contact ↗
              </a>
            </div>
          </div>

          {/* ── Right: Profile photo — editorial framing ── */}
          <div
            className="animate-fade-in-up hidden lg:block"
            style={{ animationDelay: "180ms" }}
          >
            <div className="relative w-[260px] h-[340px] overflow-hidden border border-[var(--border)]">
              {/* Corner accent marks */}
              <div
                className="absolute top-0 right-0 w-7 h-7 z-10 pointer-events-none"
                aria-hidden="true"
                style={{
                  borderTop: "2px solid var(--accent)",
                  borderRight: "2px solid var(--accent)",
                }}
              />
              <div
                className="absolute bottom-0 left-0 w-7 h-7 z-10 pointer-events-none"
                aria-hidden="true"
                style={{
                  borderBottom: "2px solid var(--accent)",
                  borderLeft: "2px solid var(--accent)",
                }}
              />
              <Image
                src="/profile.png"
                alt={`${profile.name}, ${profile.role}`}
                fill
                priority
                sizes="260px"
                className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
              />
            </div>
          </div>
        </div>

        {/* Scroll nudge */}
        <div className="hidden lg:flex mt-14 items-center gap-4 text-[var(--muted)]">
          <div className="h-px w-10 bg-[var(--border)]" />
          <span className="font-mono text-[0.58rem] tracking-[0.32em] uppercase">
            Scroll
          </span>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify**

`npm run lint`. `npm run dev`: hero loads with big Instrument Serif name, count-up metrics, square CTA buttons, profile photo with corner accents.

- [ ] **Step 3: Commit**

```bash
git add components/hero-section.tsx
git commit -m "feat: editorial hero with display-scale name, metrics counter, corner-accent photo"
```

---

### Task 7: About Section

**Files:**
- Modify: `components/about-section.tsx` (full rewrite)

**Interfaces:**
- Consumes: `Section` from Task 3 with props `number="01" label="About" heading="..."`

- [ ] **Step 1: Rewrite `components/about-section.tsx`**

Replace the entire file with:

```tsx
import { Section } from "./section";
import { profile } from "@/data/portfolio";

export function AboutSection() {
  return (
    <Section
      id="about"
      number="01"
      label="About"
      heading="Backend engineer focused on reliable distributed systems."
    >
      <div className="grid gap-12 lg:grid-cols-[1fr_0.85fr]">

        {/* Left: Bio + origin */}
        <div className="reveal flex flex-col gap-6">
          <p className="text-lg leading-8 text-[var(--muted)]">
            {profile.summary}
          </p>
          <p className="text-sm leading-7 text-[var(--muted)] border-l-2 border-[var(--accent)] pl-5 opacity-80">
            {profile.originSentence}
          </p>
          {/* Interest chips */}
          <div className="flex flex-wrap gap-2 pt-1">
            {profile.interests.map((interest) => (
              <span
                key={interest}
                className="rounded-full border border-[var(--border)] px-4 py-1.5 font-mono text-xs tracking-wide text-[var(--muted)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all duration-200 cursor-default"
              >
                {interest}
              </span>
            ))}
          </div>
        </div>

        {/* Right: Core expertise grid */}
        <div className="reveal flex flex-col gap-5">
          <p className="font-mono text-[0.62rem] tracking-[0.22em] uppercase text-[var(--accent)]">
            Core Expertise
          </p>
          <div className="grid grid-cols-2 gap-2">
            {profile.expertise.map((tech) => (
              <div
                key={tech}
                className="flex items-center gap-2.5 border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-sm text-[var(--fg-2)] hover:border-[var(--accent)] hover:bg-[var(--accent-light)] transition-all duration-200"
              >
                <span className="h-1 w-1 rounded-full bg-[var(--accent)] shrink-0" />
                <span className="leading-snug">{tech}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
```

- [ ] **Step 2: Verify**

`npm run lint`. `npm run dev`: About section shows two-column layout — bio with accent left-border quote and interest chips on left; expertise grid on right. Scroll past hero to trigger `.reveal` animation.

- [ ] **Step 3: Commit**

```bash
git add components/about-section.tsx
git commit -m "feat: About section — two-column bio + expertise grid"
```

---

### Task 8: Experience Section

**Files:**
- Modify: `components/experience-section.tsx` (full rewrite)

**Interfaces:**
- Consumes: `Section` from Task 3 with `number="02"`, `className="bg-[var(--bg-alt)]"`

- [ ] **Step 1: Rewrite `components/experience-section.tsx`**

Replace the entire file with:

```tsx
import { Section } from "./section";
import { experiences } from "@/data/portfolio";

export function ExperienceSection() {
  return (
    <Section
      id="experience"
      number="02"
      label="Experience"
      heading="Engineering at scale — distributed systems in production."
      className="bg-[var(--bg-alt)]"
    >
      <div className="grid gap-6">
        {experiences.map((item, idx) => (
          <article
            key={`${item.company}-${item.duration}`}
            className="reveal group relative border border-[var(--border)] bg-[var(--surface)] p-8 transition-all duration-300 hover:border-[var(--accent)] hover:-translate-y-1 hover:shadow-[var(--shadow-md)]"
          >
            {/* Decorative index number */}
            <span
              aria-hidden="true"
              className="absolute top-6 right-8 font-black leading-none select-none pointer-events-none text-[var(--border)] group-hover:text-[color-mix(in_srgb,var(--accent)_18%,var(--border))] transition-colors duration-300"
              style={{ fontSize: "clamp(2.5rem,6vw,4rem)" }}
            >
              {String(idx + 1).padStart(2, "0")}
            </span>

            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div>
                <p className="font-mono text-[0.62rem] tracking-[0.22em] uppercase text-[var(--accent)] mb-1.5">
                  {item.company}
                </p>
                <h3 className="font-display text-2xl text-[var(--fg)] leading-tight">
                  {item.position}
                </h3>
              </div>
              <span className="shrink-0 self-start font-mono text-xs tracking-wider text-[var(--muted)] border border-[var(--border)] px-3 py-1.5">
                {item.duration}
              </span>
            </div>

            {/* Description */}
            <p className="mt-5 text-sm leading-7 text-[var(--muted)]">
              {item.description}
            </p>

            {/* Achievements */}
            <ul className="mt-6 grid gap-3">
              {item.achievements.map((achievement) => (
                <li
                  key={achievement}
                  className="flex gap-3 items-start text-sm text-[var(--muted)]"
                >
                  <span className="mt-[0.6rem] h-px w-4 shrink-0 bg-[var(--accent)] opacity-50 group-hover:opacity-100 group-hover:w-6 transition-all duration-300" />
                  <span className="leading-relaxed">{achievement}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </Section>
  );
}
```

- [ ] **Step 2: Verify**

`npm run lint`. `npm run dev`: Experience section has alternating `bg-[var(--bg-alt)]` background, flat bordered cards with decorative index numbers.

- [ ] **Step 3: Commit**

```bash
git add components/experience-section.tsx
git commit -m "feat: Experience section — flat editorial cards with decorative index numbers"
```

---

### Task 9: Projects Section

**Files:**
- Modify: `components/projects-section.tsx` (full rewrite)

**Interfaces:**
- Consumes: `Section` from Task 3 with `number="03"`; `Link` from `next/link`

- [ ] **Step 1: Rewrite `components/projects-section.tsx`**

Replace the entire file with:

```tsx
import Link from "next/link";
import { Section } from "./section";
import { projects } from "@/data/portfolio";

export function ProjectsSection() {
  return (
    <Section
      id="projects"
      number="03"
      label="Work"
      heading="Projects built with real engineering decisions."
    >
      <div className="grid gap-8">
        {projects.map((project, idx) => (
          <article
            key={project.slug}
            className="reveal group border border-[var(--border)] bg-[var(--surface)] p-8 sm:p-10 transition-all duration-300 hover:border-[var(--accent)] hover:-translate-y-1 hover:shadow-[var(--shadow-md)]"
          >
            {/* Project index + stack row */}
            <div className="flex items-center gap-3 mb-5">
              <span className="font-mono text-[0.58rem] tracking-[0.28em] uppercase text-[var(--muted)]">
                {String(idx + 1).padStart(2, "0")}
              </span>
              <div className="h-px w-10 bg-[var(--border)]" />
              <div className="flex flex-wrap gap-1.5">
                {project.stack.slice(0, 3).map((tech) => (
                  <span
                    key={tech}
                    className="border border-[var(--border)] px-2.5 py-0.5 font-mono text-[0.58rem] tracking-wide text-[var(--muted)]"
                  >
                    {tech}
                  </span>
                ))}
                {project.stack.length > 3 && (
                  <span className="font-mono text-[0.58rem] text-[var(--muted)] self-center">
                    +{project.stack.length - 3}
                  </span>
                )}
              </div>
            </div>

            <div className="grid lg:grid-cols-[1fr_220px] gap-8">
              {/* Left: name, description, C/S/O */}
              <div>
                <h3 className="font-display text-2xl sm:text-3xl text-[var(--fg)] leading-tight mb-3">
                  {project.name}
                </h3>
                <p className="text-sm leading-7 text-[var(--muted)] max-w-2xl">
                  {project.description}
                </p>

                {/* Challenge / Solution / Outcome */}
                <div className="mt-7 grid sm:grid-cols-3 gap-5 border-t border-[var(--border)] pt-6">
                  {(
                    [
                      { label: "Challenge", text: project.challenge },
                      { label: "Solution", text: project.solution },
                      { label: "Outcome", text: project.outcome },
                    ] as const
                  ).map(({ label, text }) => (
                    <div key={label}>
                      <p className="font-mono text-[0.58rem] tracking-[0.22em] uppercase text-[var(--accent)] mb-2">
                        {label}
                      </p>
                      <p className="text-xs leading-5 text-[var(--muted)]">
                        {text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: highlights + links */}
              <div className="flex flex-col gap-5">
                <div className="border-l-2 border-[var(--border)] pl-4 group-hover:border-[var(--accent)] transition-colors duration-300 flex flex-col gap-2">
                  {project.highlights.map((h) => (
                    <p key={h} className="text-xs leading-5 text-[var(--muted)]">
                      ↗ {h}
                    </p>
                  ))}
                </div>

                <div className="flex flex-col gap-2 mt-auto">
                  <Link
                    href={`/projects/${project.slug}`}
                    className="inline-flex items-center gap-1.5 font-mono text-xs tracking-wider uppercase text-[var(--accent)] hover:gap-3 transition-all duration-200"
                  >
                    Case Study →
                  </Link>
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 font-mono text-xs tracking-wider uppercase text-[var(--muted)] hover:text-[var(--fg)] transition-colors duration-200"
                    >
                      GitHub →
                    </a>
                  )}
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}
```

- [ ] **Step 2: Verify**

`npm run lint`. `npm run dev`: Projects section shows case-study cards with challenge/solution/outcome columns.

- [ ] **Step 3: Commit**

```bash
git add components/projects-section.tsx
git commit -m "feat: Projects section — editorial case-study cards with C/S/O layout"
```

---

### Task 10: Skills Section

**Files:**
- Modify: `components/skills-section.tsx` (full rewrite)

**Interfaces:**
- Consumes: `Section` from Task 3 with `number="04"`, `className="bg-[var(--bg-alt)]"`

Note: `chip-group.tsx` is no longer imported; it remains in the codebase but is unused.

- [ ] **Step 1: Rewrite `components/skills-section.tsx`**

Replace the entire file with:

```tsx
import { Section } from "./section";
import { skillGroups } from "@/data/portfolio";

export function SkillsSection() {
  return (
    <Section
      id="skills"
      number="04"
      label="Skills"
      heading="The stack behind the systems I build."
      className="bg-[var(--bg-alt)]"
    >
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((group, idx) => (
          <div
            key={group.category}
            className="reveal group border border-[var(--border)] bg-[var(--surface)] p-6 transition-all duration-300 hover:border-[var(--accent)]"
          >
            <div className="flex items-center justify-between mb-5">
              <p className="font-mono text-[0.62rem] tracking-[0.22em] uppercase text-[var(--accent)]">
                {group.category}
              </p>
              <span
                aria-hidden="true"
                className="font-black text-3xl leading-none text-[var(--border)] select-none"
              >
                {String(idx + 1).padStart(2, "0")}
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {group.skills.map((skill) => (
                <span
                  key={skill}
                  className="border border-[var(--border)] px-3 py-1 font-mono text-xs text-[var(--muted)] hover:border-[var(--accent)] hover:text-[var(--fg)] transition-all duration-200 cursor-default"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
```

- [ ] **Step 2: Verify**

`npm run lint`. `npm run dev`: Skills shows 3-column category grid with square-border tag chips.

- [ ] **Step 3: Commit**

```bash
git add components/skills-section.tsx
git commit -m "feat: Skills section — category grid with tag chips, no chip-group dependency"
```

---

### Task 11: Competitive Programming Section (New)

**Files:**
- Create: `components/cp-section.tsx`

**Interfaces:**
- Consumes: `Section` from Task 3 with `number="05"`; `cpProfile` from `@/data/portfolio`

- [ ] **Step 1: Create `components/cp-section.tsx`**

```tsx
import { Section } from "./section";
import { cpProfile } from "@/data/portfolio";

export function CPSection() {
  return (
    <Section
      id="compete"
      number="05"
      label="Competitive Programming"
      heading="Sharpened at competitive scale."
    >
      {/* Hero number */}
      <div className="reveal mb-12 flex flex-col sm:flex-row sm:items-end gap-4 border-b border-[var(--border)] pb-10">
        <span
          className="font-black leading-none text-[var(--fg)]"
          style={{ fontSize: "clamp(4rem, 12vw, 8rem)" }}
        >
          {cpProfile.totalSolved.toLocaleString()}+
        </span>
        <div className="sm:pb-2 flex flex-col gap-1">
          <p className="font-mono text-[0.62rem] tracking-[0.25em] uppercase text-[var(--accent)]">
            Problems Solved
          </p>
          <p className="text-sm text-[var(--muted)]">
            Across LeetCode, GeeksforGeeks, and CodeChef
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Platform cards column */}
        <div className="reveal grid gap-4 content-start">
          {cpProfile.platforms.map((platform) => (
            <a
              key={platform.name}
              href={platform.url}
              target="_blank"
              rel="noreferrer"
              className="group flex items-center justify-between border border-[var(--border)] bg-[var(--surface)] px-6 py-5 transition-all duration-300 hover:border-[var(--accent)] hover:-translate-y-0.5 hover:shadow-[var(--shadow-sm)]"
            >
              <div className="flex flex-col gap-1">
                <p className="font-mono text-[0.62rem] tracking-[0.22em] uppercase text-[var(--accent)]">
                  {platform.name}
                </p>
                <p className="font-mono text-xs text-[var(--muted)]">
                  @{platform.handle}
                </p>
              </div>
              <div className="text-right">
                <span className="font-black text-3xl text-[var(--fg)] group-hover:text-[var(--accent)] transition-colors duration-300 leading-none">
                  {platform.solvedCount.toLocaleString()}+
                </span>
                <p className="font-mono text-[0.58rem] tracking-wider uppercase text-[var(--muted)]">
                  solved
                </p>
              </div>
            </a>
          ))}
        </div>

        {/* Contest + discipline column */}
        <div className="reveal flex flex-col gap-5">
          {cpProfile.contests.map((contest) => (
            <div
              key={contest.name}
              className="border border-[var(--border)] bg-[var(--surface)] p-8 flex flex-col gap-6"
            >
              <div>
                <p className="font-mono text-[0.62rem] tracking-[0.22em] uppercase text-[var(--accent)] mb-2">
                  Contest Highlight
                </p>
                <h3 className="font-display text-xl text-[var(--fg)]">
                  {contest.name}
                </h3>
              </div>
              <div className="flex items-end gap-6">
                <div>
                  <span className="font-black text-5xl text-[var(--fg)] leading-none">
                    #{contest.rank.toLocaleString()}
                  </span>
                  <p className="font-mono text-[0.58rem] tracking-wider uppercase text-[var(--muted)] mt-1">
                    Global Rank
                  </p>
                </div>
                <div className="pb-0.5 flex flex-col gap-0.5">
                  <p className="font-mono text-sm text-[var(--muted)]">
                    of {contest.totalParticipants.toLocaleString()}+ participants
                  </p>
                  <p className="font-mono text-xs text-[var(--muted)] opacity-60">
                    Top{" "}
                    {Math.round(
                      (contest.rank / contest.totalParticipants) * 100,
                    )}
                    % globally
                  </p>
                </div>
              </div>
            </div>
          ))}

          {/* Discipline callout */}
          <div className="border border-[var(--accent-light)] bg-[var(--accent-light)] p-6">
            <p className="font-mono text-[0.62rem] tracking-[0.22em] uppercase text-[var(--accent)] mb-2">
              Why it matters
            </p>
            <p className="text-sm leading-7 text-[var(--muted)]">
              Consistent problem-solving practice across algorithms, data
              structures, and competitive contests — the discipline translates
              directly into better production engineering decisions.
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
}
```

- [ ] **Step 2: Verify**

`npm run lint`. `npm run dev`: CP section shows giant problem count, 3 platform cards with links, Google Kick Start rank, and discipline callout.

- [ ] **Step 3: Commit**

```bash
git add components/cp-section.tsx
git commit -m "feat: Competitive Programming section — platform cards, contest highlight, discipline callout"
```

---

### Task 12: Education Section

**Files:**
- Modify: `components/education-section.tsx` (full rewrite)

**Interfaces:**
- Consumes: `Section` from Task 3 with `number="06"`

- [ ] **Step 1: Rewrite `components/education-section.tsx`**

Replace the entire file with:

```tsx
import { Section } from "./section";
import { education } from "@/data/portfolio";

export function EducationSection() {
  return (
    <Section
      id="education"
      number="06"
      label="Education"
      heading="Academic foundation and early years."
      className="bg-[var(--bg-alt)]"
    >
      <div className="grid gap-5">
        {education.map((item, idx) => (
          <div
            key={`${item.degree}-${item.institution}`}
            className="reveal group flex gap-6 border border-[var(--border)] bg-[var(--surface)] p-6 transition-all duration-300 hover:border-[var(--accent)]"
          >
            {/* Index number */}
            <span
              aria-hidden="true"
              className="hidden sm:block font-black text-4xl leading-none shrink-0 select-none text-[var(--border)] group-hover:text-[color-mix(in_srgb,var(--accent)_22%,var(--border))] transition-colors duration-300"
            >
              {String(idx + 1).padStart(2, "0")}
            </span>

            <div className="flex-1 min-w-0">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                <div>
                  <h3 className="font-display text-xl text-[var(--fg)] leading-tight">
                    {item.degree}
                  </h3>
                  <p className="mt-1 font-mono text-[0.62rem] tracking-[0.16em] uppercase text-[var(--accent)]">
                    {item.institution}
                  </p>
                </div>
                {item.duration && (
                  <span className="shrink-0 self-start font-mono text-xs text-[var(--muted)] border border-[var(--border)] px-3 py-1">
                    {item.duration}
                  </span>
                )}
              </div>

              {item.coursework && item.coursework.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {item.coursework.map((note) => (
                    <span
                      key={note}
                      className="border border-[var(--border)] px-3 py-1 font-mono text-xs text-[var(--muted)]"
                    >
                      {note}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
```

- [ ] **Step 2: Verify**

`npm run lint`. `npm run dev`: Education shows 4 rows — KIIT with CGPA chip, then 3 school rows.

- [ ] **Step 3: Commit**

```bash
git add components/education-section.tsx
git commit -m "feat: Education section — row cards with index numbers and coursework chips"
```

---

### Task 13: Contact Section + Footer

**Files:**
- Modify: `components/contact-section.tsx` (full rewrite)
- Modify: `components/contact-link.tsx` (update CSS variable references)
- Modify: `components/site-footer.tsx` (full rewrite)

**What this does:** Contact becomes a two-column layout — editorial invite text on left, contact links grid on right. Updates `contact-link.tsx` to use `var(--bg)` instead of the removed `var(--background)`. Footer becomes a minimal one-liner.

- [ ] **Step 1: Update CSS variable in `components/contact-link.tsx`**

Find the one reference to the old variable and update it:

```
Old: className="... bg-[var(--background)] ..."
New: className="... bg-[var(--bg)] ..."
```

Specifically, in the `<a>` element's `className`, change `bg-[var(--background)]` to `bg-[var(--surface)]`.

Full replacement for the `<a>` element className string in `contact-link.tsx`:

```tsx
// Replace this line (around line 106):
className="flex items-center gap-4 rounded-md border border-[var(--border)] bg-[var(--background)] p-4.5 transition-all duration-300 hover:border-[var(--accent)] hover:translate-y-[-2px] hover:shadow-sm group cursor-pointer"

// With:
className="flex items-center gap-4 border border-[var(--border)] bg-[var(--surface)] p-5 transition-all duration-300 hover:border-[var(--accent)] hover:-translate-y-0.5 hover:shadow-[var(--shadow-sm)] group cursor-pointer"
```

- [ ] **Step 2: Rewrite `components/contact-section.tsx`**

Replace the entire file with:

```tsx
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
```

- [ ] **Step 3: Rewrite `components/site-footer.tsx`**

Replace the entire file with:

```tsx
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
```

- [ ] **Step 4: Verify**

`npm run lint`. `npm run dev`: Contact section two-column with invite text left, link grid right. Footer is a minimal one-liner.

- [ ] **Step 5: Commit**

```bash
git add components/contact-section.tsx components/contact-link.tsx components/site-footer.tsx
git commit -m "feat: Contact two-column layout, updated contact-link tokens, minimal footer"
```

---

### Task 14: Page Assembly + Final Verification

**Files:**
- Modify: `app/page.tsx`

**What this does:** Imports `CPSection` and adds it between `SkillsSection` and `EducationSection` in the main page render. Runs final lint + build to confirm everything compiles cleanly.

- [ ] **Step 1: Update `app/page.tsx`** — add CPSection import

Add this import line after the existing section imports:

```tsx
import { CPSection } from "@/components/cp-section";
```

The imports block should look like:

```tsx
import { SiteNav } from "@/components/site-nav";
import { HeroSection } from "@/components/hero-section";
import { AboutSection } from "@/components/about-section";
import { ExperienceSection } from "@/components/experience-section";
import { ProjectsSection } from "@/components/projects-section";
import { SkillsSection } from "@/components/skills-section";
import { CPSection } from "@/components/cp-section";
import { EducationSection } from "@/components/education-section";
import { ContactSection } from "@/components/contact-section";
import { SiteFooter } from "@/components/site-footer";
```

- [ ] **Step 2: Add `CPSection` to the main render**

In the `<main>` element, add `<CPSection />` between `<SkillsSection />` and `<EducationSection />`:

```tsx
<main className="min-h-screen bg-[var(--bg)] text-[var(--fg)]">
  <HeroSection />
  <AboutSection />
  <ExperienceSection />
  <ProjectsSection />
  <SkillsSection />
  <CPSection />
  <EducationSection />
  <ContactSection />
</main>
```

- [ ] **Step 3: Also add `cpProfile` to the page imports from data** (needed only if you want to reference it in JSON-LD — it is not needed in JSON-LD, so skip this unless explicitly required)

No action needed. The existing JSON-LD schemas are unchanged.

- [ ] **Step 4: Run lint**

```bash
npm run lint
```

Expected: zero errors, zero warnings.

- [ ] **Step 5: Run production build**

```bash
npm run build
```

Expected: `✓ Compiled successfully`. Zero type errors.

- [ ] **Step 6: Final visual check via dev server**

```bash
npm run dev
```

Open `http://localhost:3000`. Verify:
- [ ] Warm off-white background, deep charcoal text
- [ ] `NK.` logo on left, 7 nav items (About → Contact), no "Home" item
- [ ] Nav becomes blurred glass after scrolling 40px
- [ ] Hero: "Nitesh Kumar" + "Mehta" on separate lines in Instrument Serif at display scale
- [ ] Metrics strip counts up on scroll (2+, 5,000+, 60%, 3,000+)
- [ ] All 7 numbered sections render with large background numbers
- [ ] CP section appears between Skills and Education with big problem count
- [ ] Dark mode toggle switches to olive-tinted dark backgrounds
- [ ] No broken variable references (no `var(--background)` or `var(--foreground)` in rendered output)

- [ ] **Step 7: Commit**

```bash
git add app/page.tsx
git commit -m "feat: assemble full redesigned portfolio with CPSection, section ordering complete"
```

---

## Done

All 14 tasks complete. The portfolio is fully re-engineered with:
- Olive/sage editorial design system
- Instrument Serif display typography
- Numbered editorial section headers with scroll-reveal stagger
- Count-up metrics in the hero
- 7 sections: About (01) → Contact (07)
- Standalone Competitive Programming section (05)
- Clean, minimal footer with SEO-friendly origin info
