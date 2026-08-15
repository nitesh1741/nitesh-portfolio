# Portfolio Redesign — Design Spec

**Date:** 2026-08-15  
**Status:** Approved

---

## Goal

Complete re-engineering of the Nitesh Kumar Mehta portfolio site. Every component, the CSS design system, and the navigation architecture is replaced. All content in `data/` and all SEO schemas in `app/page.tsx` are preserved unchanged. One new standalone section (Competitive Programming) is added.

---

## Visual Design

### Personality
Bold editorial — oversized section numbers, large typographic hierarchy, asymmetric layouts, deliberate restraint on motion. Premium through structure, not spectacle.

### Color Palette

| Token | Light | Dark |
|---|---|---|
| `--bg` | `#f5f3ee` warm off-white | `#0e100a` olive-tinted black |
| `--bg-alt` | `#efede7` slightly darker off-white | `#141710` |
| `--surface` | `#ffffff` | `#171a10` |
| `--fg` | `#1c1c1a` deep charcoal | `#f0ede6` |
| `--fg-2` | `#3a3a37` secondary text | `#cac7be` |
| `--muted` | `#7a756e` stone | `#9e9b92` |
| `--accent` | `#4d7a3e` olive/sage | `#7db868` |
| `--accent-light` | `#e6f0e2` | `#1b2614` |
| `--border` | `#e0ddd5` | `#2a2e1f` |
| `--shadow-sm` | `0 1px 4px rgb(0 0 0 / 0.05)` | `0 1px 4px rgb(0 0 0 / 0.25)` |
| `--shadow-md` | `0 4px 24px rgb(0 0 0 / 0.07)` | `0 4px 24px rgb(0 0 0 / 0.35)` |
| `--shadow-lg` | `0 16px 48px rgb(0 0 0 / 0.09)` | `0 16px 48px rgb(0 0 0 / 0.45)` |

Default theme: **light** (`data-theme="light"` in html element).

### Typography
- **Display (headings):** `Instrument Serif` from `next/font/google`, weight 400. Applied via `--font-instrument-serif` CSS variable, exposed as `font-display` Tailwind utility through `@theme inline`.
- **Body/UI:** Geist Sans (already in project)
- **Labels/badges/eyebrows:** Geist Mono (already in project)

Decorative section numbers (e.g. `01`, `02`) use Geist Sans `font-black` at `clamp(5rem,14vw,9rem)` in `text-[var(--border)]` — they are background texture, not foreground text.

Section headings use Instrument Serif at `text-3xl sm:text-4xl lg:text-5xl` — normal weight, large, elegant.

---

## Section Architecture

| # | ID | Label | Section Component |
|---|---|---|---|
| — | `#home` | — | `HeroSection` |
| 01 | `#about` | About | `AboutSection` |
| 02 | `#experience` | Experience | `ExperienceSection` |
| 03 | `#projects` | Work | `ProjectsSection` |
| 04 | `#skills` | Skills | `SkillsSection` |
| 05 | `#compete` | Competitive Programming | `CPSection` (new) |
| 06 | `#education` | Education | `EducationSection` |
| 07 | `#contact` | Contact | `ContactSection` |

---

## Navigation

- **Logo:** `NK.` in mono, links to `#home`
- **Items:** About / Experience / Work / Skills / Compete / Education / Contact (7 items, no "Home")
- **Active state:** thin olive underline on active link
- **Hover:** number (`01`, `02`…) appears left of label text on hover
- **Scroll behavior:** fully transparent → blur glassmorphism after 40px scroll
- **Mobile:** hamburger drawer with numbered links

---

## Hero Section

Full-viewport-height section. Layout: left-side text content, right-side profile photo (desktop only).

- **Name:** split into `firstName` (all words except last) + `lastName` (last word), each on its own line in Instrument Serif at `clamp(3rem,8vw,7rem)`
- **Role:** mono uppercase with `—` prefix, accent color
- **Intro:** `profile.intro`, muted, single paragraph
- **Metrics:** `MetricsCounter` component — 4 stats in a bordered strip with count-up animation on IntersectionObserver trigger
- **CTAs:** "View Work" (filled, square corners) + "Resume →" (outlined, square corners)
- **Photo:** 260×340 fixed-aspect container with olive corner accent lines (top-right + bottom-left), grayscale default, color on hover

---

## Section Wrapper (`section.tsx`)

Props: `id`, `number` ("01"…"07"), `label` (eyebrow text), `heading` (display text), `children`, optional `className`.

Header layout:
1. Big decorative number — `position: absolute`, `top: -2`, `left: 0`, `clamp(5rem,14vw,9rem)`, `text-[var(--border)]`, `font-black` (sans-serif)
2. Mono eyebrow label — positioned relatively, `pt-12` to clear the big number, accent color, `tracking-[0.3em] uppercase`
3. Display heading — Instrument Serif
4. Thin accent line — `h-px w-16 bg-[var(--accent)]` below heading

IntersectionObserver is set up on mount — applies `transitionDelay: ${i * 70}ms` to each `.reveal` child, then triggers `.revealed` class when element enters viewport.

---

## MetricsCounter Component (`metrics-counter.tsx`)

Client component. Takes `{ value: string; label: string }[]`. Parses each value:
- Remove commas, match `^([\d.]+)(.*)$` → `{ raw: number, suffix: string }`
- `"2+"` → `{ raw: 2, suffix: "+" }`
- `"5,000+"` → `{ raw: 5000, suffix: "+" }`
- `"60%"` → `{ raw: 60, suffix: "%" }`

Each counter uses its own `IntersectionObserver` (threshold 0.5). On first intersection, runs `requestAnimationFrame` loop with ease-out-cubic easing for 1600ms, animating count from 0 to `raw`. Displays number with `.toLocaleString()` for comma formatting.

Layout: border-top + border-bottom strip, `grid grid-cols-2 sm:grid-cols-4`. Each cell: big number in Instrument Serif, mono label below.

---

## Competitive Programming Section

Data shape (`CPProfile` in `types/portfolio.ts`):
```ts
type CPPlatform = { name: string; handle: string; solvedCount: number; url: string; };
type CPContest  = { name: string; rank: number; totalParticipants: number; year: number; };
type CPProfile  = { totalSolved: number; platforms: CPPlatform[]; contests: CPContest[]; };
```

Layout:
- **Hero number:** `totalSolved` at huge display scale with "Problems Solved" label
- **Left column:** platform cards (LeetCode, GeeksforGeeks, CodeChef) — each shows name, handle, solved count
- **Right column:** contest highlight card (Google Kick Start rank, total participants, top-% computed inline) + a "Discipline" callout card

---

## Scroll Reveal

All section child cards/blocks receive `.reveal` class. Section wrapper sets stagger delays via JS (`i * 70ms`). CSS handles the actual transition (opacity 0→1, translateY 20px→0).

Hero entry animations use `animate-fade-in-up` with explicit inline `animationDelay` values (CSS animation, not IntersectionObserver — hero is above the fold).

---

## Files Changed / Created

| File | Action |
|---|---|
| `app/globals.css` | Full rewrite — new tokens, new utilities |
| `app/layout.tsx` | Add Instrument Serif font, set default theme to light |
| `app/page.tsx` | Add `CPSection` import + render |
| `data/portfolio.ts` | Add `cpProfile` export, update `navItems` |
| `types/portfolio.ts` | Add `CPPlatform`, `CPContest`, `CPProfile` types |
| `components/section.tsx` | Full rewrite — editorial number+label+heading wrapper |
| `components/site-nav.tsx` | Full rewrite — numbered hover, underline active, blur on scroll |
| `components/hero-section.tsx` | Full rewrite — editorial hero with MetricsCounter |
| `components/metrics-counter.tsx` | **New** — count-up animation component |
| `components/about-section.tsx` | Full rewrite — two-column bio + expertise grid |
| `components/experience-section.tsx` | Full rewrite — flat cards with decorative index |
| `components/projects-section.tsx` | Full rewrite — case-study cards |
| `components/skills-section.tsx` | Full rewrite — category grid with chips |
| `components/cp-section.tsx` | **New** — competitive programming section |
| `components/education-section.tsx` | Full rewrite — row cards with index |
| `components/contact-section.tsx` | Full rewrite — two-column layout |
| `components/site-footer.tsx` | Full rewrite — minimal one-liner |
| `components/contact-link.tsx` | Update CSS variable references |

---

## Constraints

- TypeScript strict mode — no `any`
- No external UI libraries (fonts via `next/font/google` are allowed)
- Tailwind v4 — config in CSS, no `tailwind.config.js`
- Path alias `@/` from repo root
- kebab-case filenames
- All personal content read from `data/` only — no inline hardcoding
- SEO JSON-LD schemas in `app/page.tsx` remain completely unchanged
- `npm run lint` must pass after every task
- `npm run build` must succeed after final task
