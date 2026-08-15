<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Repository Guidelines

## Project Overview

Personal portfolio site for Nitesh Kumar Mehta — a .NET Backend & Agentic AI Engineer. Built with **Next.js 16.2.7**, **React 19**, **TypeScript 5** (strict), and **Tailwind CSS 4**.

> ⚠️ **All three major dependencies carry breaking changes** versus training-data versions. Read changelogs and local `node_modules/next/dist/docs/` before touching routing, metadata, or styling APIs. Tailwind v4 no longer uses a `tailwind.config.js` — configuration is in CSS via `@import "tailwindcss"`.

## Project Structure & Module Organization

```
app/                  Next.js App Router pages
  layout.tsx          Root layout — metadata, fonts (Geist), html/body shell
  page.tsx            Home page — assembles all section components
  blog/               Blog listing + dynamic [slug] detail page
  projects/           Projects listing + dynamic [slug] detail page
  sitemap.ts          Generated sitemap (reads from data/)
  robots.ts           robots.txt config

components/           One file per section or shared UI primitive
  *-section.tsx       Page sections (hero, about, experience, skills, …)
  section.tsx         Generic section wrapper used by all section components

data/
  portfolio.ts        Single source of truth — all personal content, experience,
                      projects, skills, education, nav items, and siteUrl
  blog.ts             All blog post content and metadata

types/portfolio.ts    TypeScript types for all data shapes (NavItem, Experience,
                      Project, BlogPost, …)
```

Content lives **only** in `data/`. Components and pages import from there — never hard-code personal info inline.

## Build, Test, and Development Commands

```bash
npm run dev       # Start dev server on http://localhost:3000 (Turbopack)
npm run build     # Production build
npm run start     # Start production server (requires build first)
npm run lint      # Run ESLint (eslint-config-next core-web-vitals + TypeScript)
```

No test framework is configured. There is no `npm test` script.

## Coding Style & Naming Conventions

- **TypeScript strict mode** — `"strict": true` in `tsconfig.json`. No `any` without justification.
- **Path alias** — import with `@/` to resolve from the repo root (e.g. `import { portfolio } from "@/data/portfolio"`).
- **File naming** — kebab-case for all files and folders (`hero-section.tsx`, not `HeroSection.tsx`).
- **ESLint** — `eslint-config-next/core-web-vitals` + `eslint-config-next/typescript`. Run `npm run lint` before committing.
- **Tailwind v4** — utility classes only; no `tailwind.config.js`. Configuration via PostCSS (`@tailwindcss/postcss`).
- **No external component libraries** — all UI is custom Tailwind + React.

## Commit Guidelines

Mix of bare imperatives and `feat:` prefix observed in history. Prefer the conventional commits style already present:

```
feat: add experience timeline animation
fix: correct sitemap canonical URL
```

Short, imperative subject line. No ticket references needed for this single-dev repo.
