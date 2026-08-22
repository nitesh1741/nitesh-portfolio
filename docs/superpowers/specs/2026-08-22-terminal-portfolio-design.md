# Terminal-Native Dark Portfolio — Design Spec
**Date:** 2026-08-22  
**Author:** Nitesh Kumar Mehta  
**Status:** Approved for implementation

---

## 1. Overview

A complete visual redesign of nitesh-mehta.com.np as a **terminal-native dark portfolio**. The chatbot is the hero — visitors land on a live terminal window they can interact with immediately. The rest of the page flows beneath it with precision-engineered dark sections.

The medium matches the message: a .NET backend + Agentic AI engineer whose portfolio *behaves* like a system they built.

---

## 2. Design Tokens

All tokens defined in `app/globals.css` as CSS custom properties:

```css
/* Dark-only palette */
--bg:         #0a0a0a   /* near-black page background */
--bg-alt:     #111111   /* alternate/section background */
--surface:    #161616   /* elevated cards and surfaces */
--surface-2:  #1c1c1c   /* deeper elevated surface */
--fg:         #f0f0ef   /* primary text */
--fg-2:       #a8a8a6   /* secondary text */
--muted:      #666664   /* tertiary / placeholder */
--accent:     #4ade80   /* terminal green (primary brand) */
--accent-dim: #22c55e   /* dimmer green for subtle accents */
--accent-bg:  #0f1f0f   /* very dark green tint */
--border:     #222220   /* default border */
--border-2:   #2a2a28   /* stronger border */
--terminal-bg:#0d0d0d   /* terminal window body */
--terminal-bar:#1a1a1a  /* terminal title bar */
```

**Shadows:**
```css
--shadow-sm: 0 1px 4px rgb(0 0 0 / 0.4);
--shadow-md: 0 4px 24px rgb(0 0 0 / 0.6);
--shadow-lg: 0 16px 64px rgb(0 0 0 / 0.8);
--glow-accent: 0 0 20px rgb(74 222 128 / 0.15);
```

---

## 3. Typography

| Role | Font | Usage |
|------|------|-------|
| Display | Instrument Serif 400 | Section headlines (editorial contrast) |
| Mono | Geist Mono | Terminal UI, nav, labels, section markers, badges, code |
| Sans | Geist Sans | Body text, descriptions, card content |

Section markers use the pattern: `// 01. about` — `var(--accent)` color, Geist Mono, `text-xs tracking-[0.2em] uppercase`.

---

## 4. Page Architecture

```
<SiteNav />          — fixed, minimal, transparent → blur on scroll
<main>
  <HeroSection />    — full viewport, terminal chatbot centerpiece
  <AboutSection />   — 2-col: editorial text + metrics strip
  <ExperienceSection />  — vertical timeline with expandable cards
  <ProjectsSection />    — 3-col card grid
  <SkillsSection />      — category grid with chip groups
  <CPSection />          — competitive programming stats
  <EducationSection />   — institution cards
  <ContactSection />     — social links + email, terminal-style
</main>
<SiteFooter />       — terminal prompt + copyright
```

All existing data files (`data/portfolio.ts`, `data/blog.ts`) are **unchanged**. Only UI layer is rewritten.

---

## 5. Component Architecture

```
components/
  terminal/
    terminal-window.tsx     — outer shell (title bar + body + input)
    terminal-message.tsx    — single chat message (user | assistant)
    terminal-input.tsx      — input bar with > prompt and blinking cursor
    use-terminal-chat.ts    — hook: state, send message, typewriter render
  sections/
    hero-section.tsx        — terminal window as hero
    about-section.tsx
    experience-section.tsx
    projects-section.tsx
    skills-section.tsx
    cp-section.tsx
    education-section.tsx
    contact-section.tsx
  ui/
    site-nav.tsx            — fixed nav, scroll-aware blur
    site-footer.tsx         — terminal-prompt footer
    section-header.tsx      — // 01. label component
    chip-group.tsx          — tech tag chips
    metrics-counter.tsx     — animated count-up numbers
    scroll-reveal.tsx       — intersection observer wrapper
```

---

## 6. Hero Section — Terminal Chatbot

### Layout
Full-viewport (`min-h-screen`) dark section. Background: `--bg` (`#0a0a0a`) with a very faint dot-grid texture (SVG background, opacity ~3%).

Terminal window centered horizontally, vertically centered with slight upward bias:
- **Width:** `min(720px, 92vw)`
- **Height:** `clamp(420px, 60vh, 600px)`
- **Border:** `1px solid var(--border-2)` with `box-shadow: var(--glow-accent)`

Above the terminal (mobile only): name + role in small mono text for SEO and context.

Profile photo (`public/profile.png`) does **not** appear in the hero — the terminal owns that space. It appears in the **About section** (right column, editorial framing with green corner accents, matching current design pattern).

### Terminal Window Anatomy

```
╭─ Title Bar ────────────────────────────────────╮
│  ● ● ●   nitesh@portfolio:~$                  │  ← --terminal-bar bg
├───────────────────────────────────────────────┤
│                                               │
│  [Message history — scrollable]               │  ← --terminal-bg bg
│                                               │
├───────────────────────────────────────────────┤
│  Suggested: [> skills] [> projects] [> exp]  │  ← suggestion chips
├───────────────────────────────────────────────┤
│  > [input field]_                             │  ← --terminal-bar bg
╰───────────────────────────────────────────────╯
```

**Traffic light dots:** decorative only (red `#ff5f57`, yellow `#febc2e`, green `#28c840`), no click handlers.

### Auto-Boot Sequence (on mount)
1. 400ms delay after mount
2. Typewriter types `whoami` into the visible message area (30ms/char)
3. 300ms pause
4. Response renders:
   ```
   Nitesh Kumar Mehta
   .NET Backend & Agentic AI Engineer
   CHUBB India · Hyderabad, India
   ```
   (each line appears 120ms apart)
5. Cursor `█` blinks in input bar — ready for user input

### Chatbot API Integration
- **External API:** FastAPI backend (OpenAPI 3.1.0 confirmed)
- **Next.js proxy:** `app/api/chat/route.ts` forwards to `process.env.CHAT_API_URL` — URL never exposed client-side
- **Proxy Request:** `POST {CHAT_API_URL}/api/chat` with `Content-Type: application/json`
- **Request body:** `{ "message": string }` (1–500 chars, required)
- **Response body:** `{ "response": string }` (field is `response`, not `reply`)
- **Error handling:**
  - 422 (validation): render `[error: message too long or empty]` in muted red
  - Network/5xx: render `[system error: could not connect. try again.]` in muted red
  - Timeout (10s): render `[timeout: no response received]` in muted red
- **Loading state:** Show `▋ thinking...` with cycling dots animation while awaiting
- **Typewriter rendering:** Response text renders at 18ms/char (simulated streaming for UX feel)
- **Max messages shown:** Last 20 messages kept in state; older ones scroll off (no pagination)

### Suggestion Chips
Clickable chips that pre-fill and auto-submit the input:
- `> skills`
- `> projects`  
- `> experience`
- `> about me`
- `> contact`

Chips hidden while assistant is responding. After response, chips reappear.

### Accessibility
- `role="log"` on message area, `aria-live="polite"`
- Input has `aria-label="Chat with Nitesh's AI assistant"`
- Terminal window has `aria-label="Interactive terminal chatbot"`
- Keyboard: Enter submits, Escape clears input

---

## 7. Site Nav

Fixed, transparent on load → blurs and gets a `border-b` on scroll:

```
NK. ●             [about] [experience] [projects] [skills] [contact]
```

- Logo: `NK.` in Geist Mono, pulse dot in `--accent`
- Links: `text-[0.7rem] tracking-[0.14em] uppercase` in Geist Mono
- Hover: number prefix appears (`01` etc.) in accent color
- Active link: accent underline
- Mobile: hamburger → full-screen drawer

No theme toggle (dark-only design).

---

## 8. About Section

Section marker: `// 01. about`

**Two-column layout** (stack on mobile):
- **Left (60%):** Instrument Serif headline (~3xl) + 2–3 paragraph body in Geist Sans. Uses existing `profile.summary` and `profile.originSentence` from data.
- **Right (40%):** Metrics strip — 4 animated count-up numbers from existing `metrics` data (e.g. "5,000+ claims/hr", "60% DB load reduction"). Each metric has a label in mono below the number.

Background: `--bg` (continues dark).

---

## 9. Experience Section

Section marker: `// 02. experience`

**Vertical timeline:**
- Left rail: vertical green line with circle nodes at each role
- Each entry: company name (bold), role + dates (mono), then bullet achievements
- On desktop: alternating left/right layout considered but rejected for readability — single column left-aligned
- Existing `experience` data from `data/portfolio.ts`

Cards are not expandable (keep it scannable). Achievement bullets are full-visible.

---

## 10. Projects Section

Section marker: `// 03. projects`

**Card grid:** 3 columns on desktop, 2 on tablet, 1 on mobile.

Each card (`--surface` bg, `1px solid --border`, hover: `--border-2` + subtle glow):
- Project name (serif, ~lg)
- Description (sans, muted, 2–3 lines)
- Tech tags (chips, mono, `--accent-bg` bg + `--accent` text)
- Links: `→ Live` and `→ GitHub` in mono

Uses existing `projects` data.

"View all projects →" link below grid routes to `/projects` page.

---

## 11. Skills Section

Section marker: `// 04. skills`

Category grid (2–3 columns):
- Each category: mono header + chip group
- Categories match `skillGroups` data exactly: Technical Domains · Languages · Frameworks & Libraries · Tools, Cloud & DBs · Certifications

Uses existing `skillGroups` data.

---

## 12. CP Section

Section marker: `// 05. competitive programming`

Terminal-output style display of CP stats from existing `cpProfile` data: `totalSolved` (3,000+), per-platform breakdown (LeetCode · GeeksforGeeks · CodeChef with handles and counts), and notable contests (Google Kick Start 2022 — Rank 1,532 / 22,000+).

---

## 13. Education Section

Section marker: `// 06. education`

Clean institution cards: institution name, degree, dates, CGPA if applicable. Uses existing `education` data.

---

## 14. Contact Section

Section marker: `// 07. contact`

Large Instrument Serif headline: *"Let's build something."*

Terminal-style links row: GitHub · LinkedIn · Email · Resume (PDF)

No contact form (keeps it clean, links are enough).

---

## 15. Footer

```
nitesh@portfolio:~$ ●    © 2026 Nitesh Kumar Mehta · Hyderabad, India
```

Social icons row. Mono text throughout.

---

## 16. Motion & Animation

| Element | Animation |
|---------|-----------|
| Hero terminal | Fade-in on mount (0.4s), then boot sequence |
| Section entries | `reveal` scroll class (existing pattern, keep) |
| Metric counters | Count-up on first viewport entry |
| Terminal messages | Typewriter at 18ms/char |
| Cursor | CSS blink animation, 1s cycle |
| Nav underline | Width transition 300ms |
| Card hover | Border + glow transition 200ms |

`prefers-reduced-motion`: terminal skips typewriter (renders instantly), all transitions set to 0ms.

---

## 17. API Route (Proxy)

`app/api/chat/route.ts` — **new file** acting as a server-side proxy to the external FastAPI.

```ts
// Environment variable required:
// CHAT_API_URL=https://your-api-host.com   (no trailing slash)

export async function POST(req: Request) {
  const { message } = await req.json();
  const res = await fetch(`${process.env.CHAT_API_URL}/api/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message }),
    signal: AbortSignal.timeout(10_000),
  });
  const data = await res.json();
  // External API returns { response: string }
  // We forward it as-is; client reads data.response
  return Response.json(data, { status: res.status });
}
```

`.env.local` entry needed:
```
CHAT_API_URL=https://your-api-host.com
```

---

## 18. Files Changed vs. Unchanged

| File | Action |
|------|--------|
| `data/portfolio.ts` | **Unchanged** |
| `data/blog.ts` | **Unchanged** |
| `types/portfolio.ts` | **Unchanged** |
| `app/page.tsx` | Rewritten (new section order, terminal hero) |
| `app/layout.tsx` | Minor update (remove theme toggle logic) |
| `app/globals.css` | Rewritten (new dark tokens, keep animations) |
| `app/api/chat/route.ts` | **New** |
| `components/*` | All rewritten with dark terminal aesthetic |
| `public/*` | Unchanged |

---

## 19. Out of Scope

- Blog section redesign (blog pages get matching dark styles but no layout overhaul)
- CMS integration
- Analytics
- Mobile app
- Theme toggle (dark-only — the design depends on darkness)
