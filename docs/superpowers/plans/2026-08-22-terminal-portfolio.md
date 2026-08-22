# Terminal Portfolio — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign nitesh-portfolio as a terminal-native dark portfolio where a live AI chatbot is the hero, and every section below breathes the same dark aesthetic.

**Architecture:** Rewrite all UI components with a dark design-token system. The hero mounts a full-screen terminal window that auto-boots a `whoami` sequence then proxies user messages to an external FastAPI chatbot via a Next.js server-side route. All data files remain untouched; only the presentation layer changes.

**Tech Stack:** Next.js 16, React 19, Tailwind CSS v4, TypeScript 5, Geist Mono + Geist Sans + Instrument Serif, Jest + @testing-library/react

**Spec:** `docs/superpowers/specs/2026-08-22-terminal-portfolio-design.md`

## Global Constraints

- Node/npm versions: whatever `package.json` already resolves — do not change.
- Next.js version: 16.2.7 — do not upgrade.
- React version: 19.2.4 — do not upgrade.
- Tailwind version: 4 — do not upgrade; use raw `className` utilities, no config file editing unless required.
- All `data/` and `types/` files are **read-only** — never edit them.
- Public API endpoint: `https://nitesh-mehta-chat.onrender.com` — stored only in `.env.local`, never hardcoded in client code.
- API request body: `{ "message": string }`. API response body: `{ "response": string }`.
- `public/profile.png` is Nitesh's photo — used in the About section only.
- All CSS tokens must be defined on `:root` or `html[data-theme="dark"]` — no hardcoded hex values in component `className` strings except for the three terminal traffic-light colours (`#ff5f57`, `#febc2e`, `#28c840`).
- `prefers-reduced-motion`: terminal skips typewriter (renders text instantly), all transitions 0ms.
- Commit messages follow: `feat: <short description>` for new work, `refactor: <description>` for rewrites.

---

## File Map

| File | Action | Responsibility |
|------|--------|---------------|
| `app/globals.css` | Rewrite | Dark design tokens, animation keyframes |
| `app/layout.tsx` | Modify | Set `data-theme="dark"`, remove ThemeController ref |
| `app/page.tsx` | Modify | Section assembly (reorder, no hero profile photo) |
| `app/api/chat/route.ts` | **Create** | Server-side proxy to external FastAPI |
| `.env.local` | **Create** | `CHAT_API_URL` environment variable |
| `jest.config.ts` | **Create** | Jest config for Next.js |
| `__tests__/api/chat.test.ts` | **Create** | API proxy unit tests |
| `__tests__/hooks/use-terminal-chat.test.ts` | **Create** | Hook unit tests |
| `hooks/use-terminal-chat.ts` | **Create** | Chat state, fetch, typewriter, boot sequence |
| `components/terminal/terminal-window.tsx` | **Create** | Title bar + message area + suggestions + input |
| `components/terminal/terminal-message.tsx` | **Create** | Single message (user / assistant / system) |
| `components/terminal/terminal-input.tsx` | **Create** | `>` prompt bar with keyboard handling |
| `components/hero-section.tsx` | Rewrite | Full-viewport terminal host |
| `components/site-nav.tsx` | Rewrite | Remove ThemeController, dark polish |
| `components/section.tsx` | Rewrite | Terminal-style `// 01. label` header, keep reveal logic |
| `components/about-section.tsx` | Rewrite | 2-col: editorial text + metrics + profile photo |
| `components/experience-section.tsx` | Rewrite | Timeline with achievement bullets |
| `components/projects-section.tsx` | Rewrite | 3-col dark card grid |
| `components/skills-section.tsx` | Rewrite | Category grid using updated ChipGroup |
| `components/chip-group.tsx` | Rewrite | Dark chip cards (remove `--surface-strong` token ref) |
| `components/cp-section.tsx` | Rewrite | Terminal-output stats display |
| `components/education-section.tsx` | Rewrite | Dark institution cards |
| `components/contact-section.tsx` | Rewrite | Large serif CTA + link row |
| `components/contact-link.tsx` | Rewrite | Dark styling for contact links |
| `components/site-footer.tsx` | Rewrite | `nitesh@portfolio:~$` prompt footer |
| `components/metrics-counter.tsx` | Rewrite | Dark token styling (keep count-up logic) |
| `components/theme-controller.tsx` | Leave | Not imported anywhere after nav rewrite |

---

## Task 1: Design Tokens + Dark CSS

**Files:**
- Rewrite: `app/globals.css`
- Modify: `app/layout.tsx` (2 lines)

**Interfaces:**
- Produces: CSS custom properties consumed by every component via Tailwind's `[var(--token)]` syntax.

- [ ] **Step 1: Replace globals.css**

Replace the entire file with:

```css
@import "tailwindcss";

/* ─── Design Tokens ──────────────────────────────────────── */
:root {
  --bg:           #0a0a0a;
  --bg-alt:       #111111;
  --surface:      #161616;
  --surface-2:    #1c1c1c;
  --fg:           #f0f0ef;
  --fg-2:         #a8a8a6;
  --muted:        #666664;
  --accent:       #4ade80;
  --accent-dim:   #22c55e;
  --accent-bg:    #0f1f0f;
  --border:       #222220;
  --border-2:     #2a2a28;
  --terminal-bg:  #0d0d0d;
  --terminal-bar: #1a1a1a;
  --shadow-sm:    0 1px 4px rgb(0 0 0 / 0.4);
  --shadow-md:    0 4px 24px rgb(0 0 0 / 0.6);
  --shadow-lg:    0 16px 64px rgb(0 0 0 / 0.8);
  --glow-accent:  0 0 24px rgb(74 222 128 / 0.12);
}

@theme inline {
  --color-background: var(--bg);
  --color-foreground: var(--fg);
  --font-sans:    var(--font-geist-sans);
  --font-mono:    var(--font-geist-mono);
  --font-display: var(--font-instrument-serif);
}

/* Dark theme (default — the only theme) */
html[data-theme="dark"] {
  --bg:           #0a0a0a;
  --bg-alt:       #111111;
  --surface:      #161616;
  --surface-2:    #1c1c1c;
  --fg:           #f0f0ef;
  --fg-2:         #a8a8a6;
  --muted:        #666664;
  --accent:       #4ade80;
  --accent-dim:   #22c55e;
  --accent-bg:    #0f1f0f;
  --border:       #222220;
  --border-2:     #2a2a28;
  --terminal-bg:  #0d0d0d;
  --terminal-bar: #1a1a1a;
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

::-webkit-scrollbar { width: 6px; height: 6px; }
::-webkit-scrollbar-track { background: var(--bg); }
::-webkit-scrollbar-thumb {
  border-radius: 999px;
  background: color-mix(in srgb, var(--accent) 35%, var(--bg));
}
::-webkit-scrollbar-thumb:hover { background: var(--accent); }

::selection {
  background: var(--accent-bg);
  color: var(--accent);
}

section { scroll-margin-top: 72px; }

/* ─── Hero Entry Animations ──────────────────────────────── */
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(22px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes fadeIn {
  from { opacity: 0; }
  to   { opacity: 1; }
}
@keyframes blink {
  0%, 100% { opacity: 1; }
  50%       { opacity: 0; }
}

.animate-fade-in-up {
  opacity: 0;
  animation: fadeInUp 0.9s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
.animate-fade-in {
  opacity: 0;
  animation: fadeIn 0.9s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
.animate-blink {
  animation: blink 1s step-end infinite;
}

/* ─── Scroll Reveal ──────────────────────────────────────── */
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

/* ─── Reduced Motion ─────────────────────────────────────── */
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
```

- [ ] **Step 2: Update layout.tsx — set dark theme permanently**

In `app/layout.tsx`, change line:
```tsx
// BEFORE
<html
  lang="en"
  data-theme="light"
  className={...}
>
```
To:
```tsx
// AFTER
<html
  lang="en"
  data-theme="dark"
  className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} h-full scroll-smooth antialiased`}
>
```

- [ ] **Step 3: Verify CSS works — start dev server**

```bash
cd C:\Users\nites\OneDrive\Desktop\Portfolio\nitesh-portfolio
npm run dev
```

Open `http://localhost:3000`. Background should be near-black `#0a0a0a`. Text should be off-white. If the page is white, verify `data-theme="dark"` is on `<html>` in browser DevTools.

- [ ] **Step 4: Commit**

```bash
git add app/globals.css app/layout.tsx
git commit -m "feat: dark design tokens and terminal CSS foundation"
```

---

## Task 2: Env + API Proxy Route + Jest Setup

**Files:**
- Create: `.env.local`
- Create: `app/api/chat/route.ts`
- Create: `jest.config.ts`
- Create: `__tests__/api/chat.test.ts`

**Interfaces:**
- Produces: `POST /api/chat` — accepts `{ message: string }`, forwards to external API, returns `{ response: string }` or error JSON.
- Client code calls `fetch("/api/chat", { method:"POST", body: JSON.stringify({ message }) })` and reads `data.response`.

- [ ] **Step 1: Create .env.local**

```
CHAT_API_URL=https://nitesh-mehta-chat.onrender.com
```

- [ ] **Step 2: Create API proxy route**

Create `app/api/chat/route.ts`:

```ts
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);

  if (!body || typeof body.message !== "string" || body.message.trim().length === 0) {
    return Response.json({ error: "message is required" }, { status: 422 });
  }
  if (body.message.length > 500) {
    return Response.json({ error: "message too long (max 500 chars)" }, { status: 422 });
  }

  const apiUrl = process.env.CHAT_API_URL;
  if (!apiUrl) {
    return Response.json({ error: "API not configured" }, { status: 503 });
  }

  try {
    const upstream = await fetch(`${apiUrl}/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: body.message.trim() }),
      signal: AbortSignal.timeout(10_000),
    });

    const data = await upstream.json();
    return Response.json(data, { status: upstream.status });
  } catch (err) {
    if (err instanceof Error && err.name === "TimeoutError") {
      return Response.json({ error: "upstream timeout" }, { status: 504 });
    }
    return Response.json({ error: "upstream error" }, { status: 502 });
  }
}
```

- [ ] **Step 3: Install Jest dependencies**

```bash
npm install --save-dev jest jest-environment-jsdom @testing-library/react @testing-library/jest-dom @types/jest
```

- [ ] **Step 4: Create jest.config.ts**

```ts
import type { Config } from "jest";
import nextJest from "next/jest.js";

const createJestConfig = nextJest({ dir: "./" });

const config: Config = {
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
  },
};

export default createJestConfig(config);
```

- [ ] **Step 5: Add test script to package.json**

In `package.json`, add to `"scripts"`:
```json
"test": "jest",
"test:watch": "jest --watch"
```

- [ ] **Step 6: Write failing tests for API route**

Create `__tests__/api/chat.test.ts`:

```ts
import "@testing-library/jest-dom";
import { POST } from "@/app/api/chat/route";

const mockFetch = jest.fn();
global.fetch = mockFetch;

const savedEnv = process.env;

describe("POST /api/chat", () => {
  beforeEach(() => {
    jest.resetAllMocks();
    process.env = { ...savedEnv, CHAT_API_URL: "https://test-api.example.com" };
    mockFetch.mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({ response: "Hello there!" }),
    });
  });

  afterEach(() => {
    process.env = savedEnv;
  });

  it("forwards message to external API and returns its response", async () => {
    const req = new Request("http://localhost/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: "what are your skills?" }),
    });

    const res = await POST(req as unknown as import("next/server").NextRequest);
    const data = await res.json();

    expect(mockFetch).toHaveBeenCalledWith(
      "https://test-api.example.com/api/chat",
      expect.objectContaining({
        method: "POST",
        body: JSON.stringify({ message: "what are your skills?" }),
      }),
    );
    expect(res.status).toBe(200);
    expect(data).toEqual({ response: "Hello there!" });
  });

  it("returns 422 when message is empty", async () => {
    const req = new Request("http://localhost/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: "" }),
    });

    const res = await POST(req as unknown as import("next/server").NextRequest);
    expect(res.status).toBe(422);
    expect(mockFetch).not.toHaveBeenCalled();
  });

  it("returns 422 when message exceeds 500 chars", async () => {
    const req = new Request("http://localhost/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: "x".repeat(501) }),
    });

    const res = await POST(req as unknown as import("next/server").NextRequest);
    expect(res.status).toBe(422);
    expect(mockFetch).not.toHaveBeenCalled();
  });

  it("returns 503 when CHAT_API_URL is not set", async () => {
    delete process.env.CHAT_API_URL;

    const req = new Request("http://localhost/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: "hello" }),
    });

    const res = await POST(req as unknown as import("next/server").NextRequest);
    expect(res.status).toBe(503);
  });

  it("returns 504 on upstream timeout", async () => {
    const timeoutError = Object.assign(new Error("The operation was aborted"), {
      name: "TimeoutError",
    });
    mockFetch.mockRejectedValueOnce(timeoutError);

    const req = new Request("http://localhost/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: "hello" }),
    });

    const res = await POST(req as unknown as import("next/server").NextRequest);
    expect(res.status).toBe(504);
  });

  it("returns 502 on network error", async () => {
    mockFetch.mockRejectedValueOnce(new Error("ECONNREFUSED"));

    const req = new Request("http://localhost/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: "hello" }),
    });

    const res = await POST(req as unknown as import("next/server").NextRequest);
    expect(res.status).toBe(502);
  });
});
```

- [ ] **Step 7: Run tests — expect they pass (route already exists)**

```bash
npm test -- --testPathPattern="api/chat"
```

Expected: all 6 tests PASS. If any fail, fix the route logic before continuing.

- [ ] **Step 8: Commit**

```bash
git add .env.local app/api/chat/route.ts jest.config.ts package.json __tests__/api/chat.test.ts
git commit -m "feat: API proxy route and Jest setup"
```

---

## Task 3: Terminal Chat Hook

**Files:**
- Create: `hooks/use-terminal-chat.ts`
- Create: `__tests__/hooks/use-terminal-chat.test.ts`

**Interfaces:**
- Produces:
  ```ts
  type TerminalMessage = {
    id: string;
    role: "user" | "assistant" | "system";
    text: string;
  };

  type UseTerminalChatReturn = {
    messages: TerminalMessage[];
    input: string;
    setInput: (v: string) => void;
    isLoading: boolean;
    sendMessage: (text?: string) => Promise<void>;
  };

  function useTerminalChat(): UseTerminalChatReturn;
  ```
- `terminal-window.tsx` (Task 4) imports `useTerminalChat` and `TerminalMessage` from this file.

- [ ] **Step 1: Create hooks/use-terminal-chat.ts**

```ts
"use client";

import { useEffect, useRef, useState } from "react";

export type TerminalMessage = {
  id: string;
  role: "user" | "assistant" | "system";
  text: string;
};

export type UseTerminalChatReturn = {
  messages: TerminalMessage[];
  input: string;
  setInput: (v: string) => void;
  isLoading: boolean;
  sendMessage: (text?: string) => Promise<void>;
};

// ─── Boot sequence ────────────────────────────────────────────────────────────

const BOOT_CMD = "whoami";
const BOOT_RESPONSE = [
  "Nitesh Kumar Mehta",
  ".NET Backend & Agentic AI Engineer",
  "CHUBB India · Hyderabad, India",
].join("\n");

function runBootSequence(
  setMessages: React.Dispatch<React.SetStateAction<TerminalMessage[]>>,
): void {
  // 1. Add empty "user" message that will type "whoami"
  setMessages([{ id: "boot-cmd", role: "user", text: "" }]);

  let i = 0;

  function typeCmd() {
    i++;
    const partial = BOOT_CMD.slice(0, i);
    setMessages((prev) =>
      prev.map((m) => (m.id === "boot-cmd" ? { ...m, text: partial } : m)),
    );
    if (i < BOOT_CMD.length) {
      setTimeout(typeCmd, 80);
    } else {
      setTimeout(showResponse, 350);
    }
  }

  function showResponse() {
    const id = "boot-resp";
    setMessages((prev) => [...prev, { id, role: "assistant", text: "" }]);

    let j = 0;
    function typeResp() {
      j++;
      const partial = BOOT_RESPONSE.slice(0, j);
      setMessages((prev) =>
        prev.map((m) => (m.id === id ? { ...m, text: partial } : m)),
      );
      if (j < BOOT_RESPONSE.length) setTimeout(typeResp, 14);
    }
    setTimeout(typeResp, 80);
  }

  setTimeout(typeCmd, 500);
}

// ─── Typewriter helper ────────────────────────────────────────────────────────

function typewriter(
  text: string,
  onUpdate: (partial: string) => void,
): Promise<void> {
  // Respect prefers-reduced-motion: render instantly
  if (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ) {
    onUpdate(text);
    return Promise.resolve();
  }

  return new Promise((resolve) => {
    let i = 0;
    function tick() {
      i++;
      onUpdate(text.slice(0, i));
      if (i < text.length) setTimeout(tick, 18);
      else resolve();
    }
    tick();
  });
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useTerminalChat(): UseTerminalChatReturn {
  const [messages, setMessages] = useState<TerminalMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const bootedRef = useRef(false);

  useEffect(() => {
    if (bootedRef.current) return;
    bootedRef.current = true;
    runBootSequence(setMessages);
  }, []);

  async function sendMessage(text?: string): Promise<void> {
    const msg = (text ?? input).trim();
    if (!msg || isLoading) return;

    setInput("");

    const userMsg: TerminalMessage = {
      id: crypto.randomUUID(),
      role: "user",
      text: msg,
    };

    // Keep last 19 messages + make room for assistant response (cap at 20 total)
    setMessages((prev) => [...prev, userMsg].slice(-19));

    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: msg }),
        signal: AbortSignal.timeout(10_000),
      });

      const data: { response?: string; error?: string } = await res.json();

      let responseText: string;
      if (!res.ok) {
        responseText =
          res.status === 422
            ? "[error: message too long or empty]"
            : "[system error: could not connect. try again.]";
      } else {
        responseText = data.response ?? "[error: empty response from server]";
      }

      const assistantId = crypto.randomUUID();
      const assistantMsg: TerminalMessage = {
        id: assistantId,
        role: "assistant",
        text: "",
      };
      setMessages((prev) => [...prev, assistantMsg].slice(-20));

      await typewriter(responseText, (partial) => {
        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantId ? { ...m, text: partial } : m,
          ),
        );
      });
    } catch (err) {
      const isTimeout =
        err instanceof Error && err.name === "TimeoutError";
      const errorText = isTimeout
        ? "[timeout: no response received. try again.]"
        : "[system error: could not connect. try again.]";

      setMessages((prev) =>
        [...prev, { id: crypto.randomUUID(), role: "system", text: errorText }].slice(-20),
      );
    } finally {
      setIsLoading(false);
    }
  }

  return { messages, input, setInput, isLoading, sendMessage };
}
```

- [ ] **Step 2: Write failing tests**

Create `__tests__/hooks/use-terminal-chat.test.ts`:

```ts
import "@testing-library/jest-dom";
import { renderHook, act, waitFor } from "@testing-library/react";
import { useTerminalChat } from "@/hooks/use-terminal-chat";

const mockFetch = jest.fn();
global.fetch = mockFetch;

// Stub crypto.randomUUID
let uuidCounter = 0;
Object.defineProperty(global, "crypto", {
  value: { randomUUID: () => `uuid-${++uuidCounter}` },
  configurable: true,
});

describe("useTerminalChat", () => {
  beforeEach(() => {
    jest.useFakeTimers();
    uuidCounter = 0;
    mockFetch.mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({ response: "Hello!" }),
    });
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.clearAllMocks();
  });

  it("mounts with empty input, not loading", () => {
    const { result } = renderHook(() => useTerminalChat());
    expect(result.current.input).toBe("");
    expect(result.current.isLoading).toBe(false);
  });

  it("starts boot-cmd message on mount", () => {
    const { result } = renderHook(() => useTerminalChat());
    expect(result.current.messages[0]).toEqual({
      id: "boot-cmd",
      role: "user",
      text: "",
    });
  });

  it("updates input via setInput", () => {
    const { result } = renderHook(() => useTerminalChat());
    act(() => { result.current.setInput("hello"); });
    expect(result.current.input).toBe("hello");
  });

  it("does not call fetch when message is empty", async () => {
    const { result } = renderHook(() => useTerminalChat());
    await act(async () => { await result.current.sendMessage(""); });
    expect(mockFetch).not.toHaveBeenCalled();
  });

  it("calls fetch /api/chat with correct payload", async () => {
    const { result } = renderHook(() => useTerminalChat());

    act(() => { result.current.setInput("skills"); });

    await act(async () => {
      const promise = result.current.sendMessage();
      jest.runAllTimers();
      await promise;
    });

    expect(mockFetch).toHaveBeenCalledWith(
      "/api/chat",
      expect.objectContaining({
        method: "POST",
        body: JSON.stringify({ message: "skills" }),
      }),
    );
  });

  it("clears input after sending", async () => {
    const { result } = renderHook(() => useTerminalChat());
    act(() => { result.current.setInput("hello"); });

    await act(async () => {
      const promise = result.current.sendMessage();
      jest.runAllTimers();
      await promise;
    });

    expect(result.current.input).toBe("");
  });

  it("adds user message immediately to messages", async () => {
    const { result } = renderHook(() => useTerminalChat());

    await act(async () => {
      const promise = result.current.sendMessage("projects");
      jest.runAllTimers();
      await promise;
    });

    expect(result.current.messages.some(
      (m) => m.role === "user" && m.text === "projects"
    )).toBe(true);
  });

  it("adds system error message on 5xx response", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 502,
      json: async () => ({ error: "bad gateway" }),
    });

    const { result } = renderHook(() => useTerminalChat());

    await act(async () => {
      const promise = result.current.sendMessage("hello");
      jest.runAllTimers();
      await promise;
    });

    const lastMsg = result.current.messages.at(-1);
    expect(lastMsg?.text).toContain("[system error:");
  });

  it("does not send while already loading", async () => {
    let resolveFetch!: (v: unknown) => void;
    mockFetch.mockReturnValueOnce(
      new Promise((r) => { resolveFetch = r; })
    );

    const { result } = renderHook(() => useTerminalChat());
    act(() => { result.current.setInput("first"); });

    // Start first send (won't resolve yet)
    act(() => { void result.current.sendMessage(); });
    expect(result.current.isLoading).toBe(true);

    // Try second send while loading
    await act(async () => { await result.current.sendMessage("second"); });
    expect(mockFetch).toHaveBeenCalledTimes(1); // only one call

    // Cleanup: resolve the pending fetch
    resolveFetch({
      ok: true,
      status: 200,
      json: async () => ({ response: "done" }),
    });
  });
});
```

- [ ] **Step 3: Run tests — expect them to pass**

```bash
npm test -- --testPathPattern="use-terminal-chat"
```

Expected: all 9 tests PASS. If timing-related tests are flaky, wrap `sendMessage` calls with `jest.runAllTimers()` inside the `act()` block.

- [ ] **Step 4: Commit**

```bash
git add hooks/use-terminal-chat.ts __tests__/hooks/use-terminal-chat.test.ts
git commit -m "feat: terminal chat hook with boot sequence and typewriter"
```

---

## Task 4: Terminal UI Components

**Files:**
- Create: `components/terminal/terminal-message.tsx`
- Create: `components/terminal/terminal-input.tsx`
- Create: `components/terminal/terminal-window.tsx`

**Interfaces:**
- Consumes: `TerminalMessage`, `UseTerminalChatReturn` from `@/hooks/use-terminal-chat`
- Produces: `<TerminalWindow />` — imported by `hero-section.tsx` in Task 5

- [ ] **Step 1: Create terminal-message.tsx**

Create `components/terminal/terminal-message.tsx`:

```tsx
import type { TerminalMessage } from "@/hooks/use-terminal-chat";

export function TerminalMessageItem({ role, text }: Omit<TerminalMessage, "id">) {
  if (role === "user") {
    return (
      <div className="font-mono text-sm leading-relaxed">
        <span className="text-[var(--accent)] select-none">{">"}&nbsp;</span>
        <span className="text-[var(--fg)]">{text}</span>
      </div>
    );
  }

  if (role === "system") {
    return (
      <div className="font-mono text-sm italic text-[var(--muted)] pl-4">
        {text}
      </div>
    );
  }

  // assistant
  return (
    <div className="pl-4 border-l border-[var(--border-2)]">
      <p className="font-mono text-sm text-[var(--fg-2)] whitespace-pre-wrap leading-relaxed">
        {text}
        {/* Blinking cursor while text is being rendered (text ends mid-word) */}
      </p>
    </div>
  );
}
```

- [ ] **Step 2: Create terminal-input.tsx**

Create `components/terminal/terminal-input.tsx`:

```tsx
"use client";

type TerminalInputProps = {
  value: string;
  onChange: (v: string) => void;
  onSubmit: () => void;
  disabled?: boolean;
};

export function TerminalInput({
  value,
  onChange,
  onSubmit,
  disabled = false,
}: TerminalInputProps) {
  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && !disabled) {
      e.preventDefault();
      onSubmit();
    }
    if (e.key === "Escape") {
      onChange("");
    }
  }

  return (
    <div className="flex items-center gap-2 border-t border-[var(--border)] bg-[var(--terminal-bar)] px-4 py-3">
      <span className="font-mono text-sm text-[var(--accent)] select-none shrink-0">
        &gt;
      </span>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        maxLength={500}
        placeholder={disabled ? "" : "ask me anything..."}
        aria-label="Chat with Nitesh's AI assistant"
        autoComplete="off"
        spellCheck={false}
        className="flex-1 bg-transparent font-mono text-sm text-[var(--fg)] outline-none placeholder:text-[var(--muted)] disabled:opacity-40"
      />
      {disabled && (
        <span
          className="font-mono text-sm text-[var(--accent)] animate-blink"
          aria-hidden="true"
        >
          ▋
        </span>
      )}
    </div>
  );
}
```

- [ ] **Step 3: Create terminal-window.tsx**

Create `components/terminal/terminal-window.tsx`:

```tsx
"use client";

import { useEffect, useRef } from "react";
import { useTerminalChat } from "@/hooks/use-terminal-chat";
import { TerminalMessageItem } from "./terminal-message";
import { TerminalInput } from "./terminal-input";

const SUGGESTIONS = [
  "> skills",
  "> projects",
  "> experience",
  "> about me",
  "> contact",
];

export function TerminalWindow() {
  const { messages, input, setInput, isLoading, sendMessage } =
    useTerminalChat();
  const bottomRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to latest message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  function handleSuggestion(text: string) {
    // Strip the "> " prefix before sending
    sendMessage(text.replace(/^>\s*/, ""));
  }

  return (
    <div
      className="relative flex flex-col overflow-hidden rounded-lg border border-[var(--border-2)]"
      style={{
        boxShadow: "var(--glow-accent), var(--shadow-lg)",
        background: "var(--terminal-bg)",
      }}
      role="region"
      aria-label="Interactive terminal chatbot"
    >
      {/* ── Title bar ────────────────────────────────── */}
      <div className="flex items-center gap-2 shrink-0 border-b border-[var(--border)] bg-[var(--terminal-bar)] px-4 py-3">
        {/* Traffic lights — decorative only */}
        <span className="h-3 w-3 rounded-full bg-[#ff5f57]" aria-hidden="true" />
        <span className="h-3 w-3 rounded-full bg-[#febc2e]" aria-hidden="true" />
        <span className="h-3 w-3 rounded-full bg-[#28c840]" aria-hidden="true" />
        <span className="ml-auto font-mono text-xs text-[var(--muted)] tracking-wide">
          nitesh@portfolio:~$
        </span>
      </div>

      {/* ── Message history ───────────────────────────── */}
      <div
        className="flex-1 overflow-y-auto p-5 space-y-4 min-h-0"
        role="log"
        aria-live="polite"
        aria-label="Chat history"
      >
        {messages.map((msg) => (
          <TerminalMessageItem key={msg.id} role={msg.role} text={msg.text} />
        ))}

        {isLoading && (
          <div className="font-mono text-sm text-[var(--muted)] pl-4">
            <span className="animate-pulse">▋ thinking...</span>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* ── Suggestion chips ──────────────────────────── */}
      {!isLoading && (
        <div className="shrink-0 border-t border-[var(--border)] bg-[var(--terminal-bg)] px-4 py-2.5 flex flex-wrap gap-2">
          {SUGGESTIONS.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => handleSuggestion(s)}
              className="font-mono text-[0.65rem] tracking-wide border border-[var(--border)] text-[var(--accent)] px-2.5 py-1 rounded-sm bg-[var(--accent-bg)] hover:border-[var(--accent)] hover:bg-[color-mix(in_srgb,var(--accent-bg)_80%,var(--accent)_20%)] transition-all duration-150 cursor-pointer"
            >
              {s}
            </button>
          ))}
        </div>
      )}

      {/* ── Input bar ─────────────────────────────────── */}
      <TerminalInput
        value={input}
        onChange={setInput}
        onSubmit={() => sendMessage()}
        disabled={isLoading}
      />
    </div>
  );
}
```

- [ ] **Step 4: Visual verification — hero section will use this in Task 5**

At this point, the terminal components are ready but not yet rendered. Continue to Task 5.

- [ ] **Step 5: Commit**

```bash
git add components/terminal/
git commit -m "feat: terminal window, message, and input components"
```

---

## Task 5: Hero Section

**Files:**
- Rewrite: `components/hero-section.tsx`

**Interfaces:**
- Consumes: `<TerminalWindow />` from `@/components/terminal/terminal-window`
- Produces: `<HeroSection />` — already imported in `app/page.tsx`

- [ ] **Step 1: Rewrite hero-section.tsx**

Replace the entire file:

```tsx
import { TerminalWindow } from "@/components/terminal/terminal-window";
import { profile } from "@/data/portfolio";

export function HeroSection() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center pt-20 pb-16 overflow-hidden scroll-mt-0"
    >
      {/* Faint dot-grid texture */}
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        aria-hidden="true"
        style={{
          backgroundImage:
            "radial-gradient(circle, var(--border) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          opacity: 0.35,
        }}
      />

      {/* Radial glow centre */}
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 50%, color-mix(in srgb, var(--accent) 4%, transparent), transparent)",
        }}
      />

      {/* Mobile-only: name + role above terminal for SEO context */}
      <div className="md:hidden mb-6 text-center animate-fade-in-up">
        <p className="font-mono text-xs tracking-[0.2em] uppercase text-[var(--accent)]">
          {profile.name}
        </p>
        <p className="mt-1 font-mono text-[0.65rem] tracking-[0.15em] uppercase text-[var(--muted)]">
          {profile.role}
        </p>
      </div>

      {/* Terminal window */}
      <div
        className="w-full animate-fade-in"
        style={{
          maxWidth: "min(720px, 92vw)",
          height: "clamp(420px, 62vh, 580px)",
          animationDelay: "120ms",
        }}
      >
        <TerminalWindow />
      </div>

      {/* Scroll nudge */}
      <div
        className="hidden md:flex mt-12 items-center gap-3 text-[var(--muted)] animate-fade-in"
        style={{ animationDelay: "800ms" }}
      >
        <div className="h-px w-8 bg-[var(--border)]" />
        <span className="font-mono text-[0.58rem] tracking-[0.32em] uppercase">
          Scroll
        </span>
      </div>

      {/* Hidden h1 for SEO (terminal handles visual presentation) */}
      <h1 className="sr-only">{`${profile.name} — ${profile.role}`}</h1>
    </section>
  );
}
```

- [ ] **Step 2: Run dev server and visually verify**

```bash
npm run dev
```

Open `http://localhost:3000`. You should see:
- Near-black background with subtle dot grid
- Terminal window centered in viewport with traffic-light dots and `nitesh@portfolio:~$` in title bar
- Auto-type sequence: `whoami` types in → response with name/role/company appears
- Suggestion chips visible below messages
- Input bar with `>` prompt at bottom
- Terminal has a subtle green glow

If the terminal fills the screen but something looks off, check the `height` clamp value and adjust.

- [ ] **Step 3: Test the chatbot live**

In the terminal on the page, type "what are your skills?" and press Enter. The request should reach `https://nitesh-mehta-chat.onrender.com/api/chat` (via the Next.js proxy). If it returns an error, check that `.env.local` is set and the dev server was restarted after adding it.

- [ ] **Step 4: Commit**

```bash
git add components/hero-section.tsx
git commit -m "feat: hero section — terminal chatbot as full-viewport hero"
```

---

## Task 6: Site Nav

**Files:**
- Rewrite: `components/site-nav.tsx`

**Interfaces:**
- Consumes: `NavItem[]` from `@/types/portfolio` (unchanged)
- Produces: `<SiteNav items={navItems} />` — already in `app/page.tsx`

- [ ] **Step 1: Rewrite site-nav.tsx**

Replace the entire file. Key changes: remove `ThemeController` import, keep scroll-aware blur logic intact, update to dark token colours.

```tsx
"use client";

import { useEffect, useState } from "react";
import type { NavItem } from "@/types/portfolio";

type SiteNavProps = { items: NavItem[] };

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
          ? "bg-[color-mix(in_srgb,var(--bg)_90%,transparent)] backdrop-blur-xl border-b border-[var(--border)]"
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

        {/* Desktop nav */}
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
              <span className="mr-1 text-[0.55rem] text-[var(--accent)] opacity-0 group-hover:opacity-100 transition-opacity duration-200 align-middle">
                {String(idx + 1).padStart(2, "0")}
              </span>
              {item.label}
              <span
                className={`absolute -bottom-1 left-0 h-px bg-[var(--accent)] transition-all duration-300 ${
                  active === item.href ? "w-full" : "w-0 group-hover:w-full"
                }`}
              />
            </a>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
          className="inline-flex h-9 w-9 items-center justify-center rounded-sm border border-[var(--border)] bg-[var(--surface)] text-[var(--fg)] transition-all hover:border-[var(--accent)] md:hidden cursor-pointer"
        >
          <span className="text-lg font-light leading-none">
            {open ? "×" : "≡"}
          </span>
        </button>
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
                className={`flex items-center gap-4 rounded-sm px-4 py-3 font-mono text-xs tracking-wide uppercase transition-all duration-200 ${
                  active === item.href
                    ? "bg-[var(--accent-bg)] text-[var(--accent)]"
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

- [ ] **Step 2: Verify nav in browser**

Reload `http://localhost:3000`. Nav should be transparent over the dark hero and blur on scroll. Active link should have a green underline. No console errors about ThemeController.

- [ ] **Step 3: Commit**

```bash
git add components/site-nav.tsx
git commit -m "refactor: site nav — remove ThemeController, dark terminal polish"
```

---

## Task 7: Section Component + ChipGroup + MetricsCounter

**Files:**
- Rewrite: `components/section.tsx`
- Rewrite: `components/chip-group.tsx`
- Rewrite: `components/metrics-counter.tsx`

**Interfaces:**
- `Section` produces: `<Section id="about" number="01" label="about" heading="Building systems that don't break.">…</Section>`
- `ChipGroup` produces: `<ChipGroup title="Languages" items={["Python", "C#"]} />`
- `MetricsCounter` produces: `<MetricsCounter metrics={metrics} />`

- [ ] **Step 1: Rewrite section.tsx — terminal header style**

Replace the entire file:

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
      { threshold: 0.08, rootMargin: "0px 0px -50px 0px" },
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
      className={`relative py-24 lg:py-32 scroll-mt-24 ${className}`}
    >
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        {/* Terminal-style section header */}
        <header className="mb-12 reveal">
          <p className="font-mono text-[0.65rem] tracking-[0.28em] uppercase text-[var(--accent)] mb-3">
            // {number.padStart(2, "0")}. {label}
          </p>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl leading-[1.08] text-[var(--fg)] max-w-2xl">
            {heading}
          </h2>
          <div className="mt-5 h-px w-12 bg-[var(--accent)] opacity-60" />
        </header>

        {children}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Rewrite chip-group.tsx — dark styling, remove --surface-strong**

Replace the entire file (keep SVG icons, update colours):

```tsx
import { ReactNode } from "react";

type ChipGroupProps = { title: string; items: string[] };

function getCategoryIcon(title: string): ReactNode {
  const norm = title.toLowerCase().trim();

  const iconClass = "h-4 w-4 text-[var(--accent)]";
  const svgProps = {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className: iconClass,
  };

  if (norm.includes("domain") || norm.includes("expertise"))
    return <svg {...svgProps}><circle cx="12" cy="5" r="2.5"/><circle cx="5" cy="12" r="2.5"/><circle cx="19" cy="12" r="2.5"/><circle cx="12" cy="19" r="2.5"/><line x1="12" y1="7.5" x2="12" y2="16.5"/><line x1="6.77" y1="10.23" x2="17.23" y2="13.77"/><line x1="17.23" y1="10.23" x2="6.77" y2="13.77"/></svg>;

  if (norm.includes("language"))
    return <svg {...svgProps}><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>;

  if (norm.includes("framework") || norm.includes("librar"))
    return <svg {...svgProps}><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>;

  if (norm.includes("tool") || norm.includes("cloud") || norm.includes("db"))
    return <svg {...svgProps}><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/><path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3"/></svg>;

  if (norm.includes("certif"))
    return <svg {...svgProps}><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>;

  return <svg {...svgProps}><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275Z"/></svg>;
}

export function ChipGroup({ title, items }: Readonly<ChipGroupProps>) {
  return (
    <div className="border border-[var(--border)] bg-[var(--surface)] p-5 transition-all duration-200 hover:border-[color-mix(in_srgb,var(--accent)_30%,var(--border))] group">
      <div className="flex items-center gap-2.5 mb-4">
        {getCategoryIcon(title)}
        <h3 className="font-mono text-xs tracking-[0.15em] uppercase text-[var(--fg-2)] group-hover:text-[var(--accent)] transition-colors duration-200">
          {title}
        </h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {items.map((item) => (
          <span
            key={item}
            className="font-mono text-[0.65rem] px-2.5 py-1 border border-[var(--border)] text-[var(--muted)] bg-[var(--bg)] transition-all duration-150 hover:border-[var(--accent)] hover:text-[var(--accent)] cursor-default"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Rewrite metrics-counter.tsx — dark tokens, keep count-up logic**

Replace the entire file:

```tsx
"use client";

import { useEffect, useRef, useState } from "react";

type ParsedMetric = { raw: number; suffix: string; label: string };

function parseMetricValue(value: string): { raw: number; suffix: string } {
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
  return <span ref={spanRef}>{formatted}{suffix}</span>;
}

type MetricsCounterProps = { metrics: { value: string; label: string }[] };

export function MetricsCounter({ metrics }: Readonly<MetricsCounterProps>) {
  const parsed: ParsedMetric[] = metrics.map((m) => ({
    ...parseMetricValue(m.value),
    label: m.label,
  }));

  return (
    <div className="border-t border-b border-[var(--border)] py-8 grid grid-cols-2 gap-8 sm:grid-cols-4">
      {parsed.map((m) => (
        <div key={m.label} className="flex flex-col gap-1.5 border-l-2 border-[var(--accent)] pl-4">
          <span className="font-mono text-2xl sm:text-3xl font-bold text-[var(--accent)]">
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

- [ ] **Step 4: Commit**

```bash
git add components/section.tsx components/chip-group.tsx components/metrics-counter.tsx
git commit -m "refactor: section, chip-group, metrics-counter — dark terminal styling"
```

---

## Task 8: About Section

**Files:**
- Rewrite: `components/about-section.tsx`

**Interfaces:**
- Consumes: `Section` from `@/components/section`, `MetricsCounter` from `@/components/metrics-counter`, `profile` and `metrics` from `@/data/portfolio`
- Produces: `<AboutSection />` — already in `app/page.tsx`

- [ ] **Step 1: Rewrite about-section.tsx**

Replace the entire file:

```tsx
import Image from "next/image";
import { profile, metrics } from "@/data/portfolio";
import { Section } from "@/components/section";
import { MetricsCounter } from "@/components/metrics-counter";

export function AboutSection() {
  return (
    <Section
      id="about"
      number="01"
      label="about"
      heading="Building systems that don't break."
      className="bg-[var(--bg-alt)]"
    >
      <div className="grid lg:grid-cols-[1fr_auto] gap-14 items-start">
        {/* ── Left: Text + Metrics ── */}
        <div>
          <p className="reveal text-base sm:text-lg leading-relaxed text-[var(--fg-2)] max-w-xl">
            {profile.summary}
          </p>
          <p className="reveal mt-4 font-mono text-sm text-[var(--muted)]">
            {profile.originSentence}
          </p>
          <div className="reveal mt-10">
            <MetricsCounter metrics={metrics} />
          </div>

          {/* CTA links */}
          <div className="reveal mt-10 flex flex-wrap gap-5">
            <a
              href="#projects"
              className="font-mono text-[0.7rem] tracking-[0.18em] uppercase border border-[var(--fg)] bg-[var(--fg)] text-[var(--bg)] px-6 py-3 transition-all duration-300 hover:bg-transparent hover:text-[var(--fg)]"
            >
              View Work
            </a>
            <a
              href={profile.resume}
              className="font-mono text-[0.7rem] tracking-[0.18em] uppercase border border-[var(--border)] text-[var(--muted)] px-6 py-3 transition-all duration-300 hover:border-[var(--fg)] hover:text-[var(--fg)]"
            >
              Resume →
            </a>
          </div>
        </div>

        {/* ── Right: Profile photo ── */}
        <div className="reveal hidden lg:block">
          <div className="relative w-[240px] h-[310px] overflow-hidden border border-[var(--border)]">
            {/* Corner accents */}
            <div
              className="absolute top-0 right-0 w-6 h-6 z-10 pointer-events-none"
              style={{ borderTop: "1.5px solid var(--accent)", borderRight: "1.5px solid var(--accent)" }}
              aria-hidden="true"
            />
            <div
              className="absolute bottom-0 left-0 w-6 h-6 z-10 pointer-events-none"
              style={{ borderBottom: "1.5px solid var(--accent)", borderLeft: "1.5px solid var(--accent)" }}
              aria-hidden="true"
            />
            <Image
              src="/profile.png"
              alt={`${profile.name}, ${profile.role}`}
              fill
              sizes="240px"
              className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
            />
          </div>
        </div>
      </div>
    </Section>
  );
}
```

- [ ] **Step 2: Visual check in browser**

Scroll to About section. Should show: `// 01. about` marker → Instrument Serif heading → summary paragraph → metrics strip with count-up animation → CTA buttons → profile photo on desktop.

- [ ] **Step 3: Commit**

```bash
git add components/about-section.tsx
git commit -m "feat: about section — 2-col layout with profile photo and metrics"
```

---

## Task 9: Experience Section

**Files:**
- Rewrite: `components/experience-section.tsx`

**Interfaces:**
- Consumes: `Section`, `experiences` from `@/data/portfolio`

- [ ] **Step 1: Rewrite experience-section.tsx**

```tsx
import { experiences } from "@/data/portfolio";
import { Section } from "@/components/section";

export function ExperienceSection() {
  return (
    <Section
      id="experience"
      number="02"
      label="experience"
      heading="Where I've shipped."
      className="bg-[var(--bg)]"
    >
      <div className="relative">
        {/* Vertical timeline rail */}
        <div
          className="hidden lg:block absolute left-0 top-0 bottom-0 w-px"
          style={{ background: "var(--border)" }}
          aria-hidden="true"
        />

        <div className="space-y-14">
          {experiences.map((exp, i) => (
            <div key={i} className="reveal lg:pl-9 relative">
              {/* Timeline node */}
              <div
                className="hidden lg:block absolute left-0 top-1 h-2.5 w-2.5 rounded-full"
                style={{
                  background: "var(--accent)",
                  transform: "translateX(-4px)",
                  boxShadow: "0 0 8px var(--accent)",
                }}
                aria-hidden="true"
              />

              <div className="flex flex-wrap items-baseline justify-between gap-3 mb-3">
                <div>
                  <span className="font-mono text-xs text-[var(--accent)] tracking-[0.15em] uppercase">
                    ▸ {exp.company}
                  </span>
                  <h3 className="mt-1 font-display text-2xl text-[var(--fg)]">
                    {exp.position}
                  </h3>
                </div>
                <span className="font-mono text-xs text-[var(--muted)] tracking-wide shrink-0">
                  {exp.duration}
                </span>
              </div>

              <p className="text-sm text-[var(--fg-2)] leading-relaxed mb-4 max-w-2xl">
                {exp.description}
              </p>

              <ul className="space-y-2.5">
                {exp.achievements.map((achievement, j) => (
                  <li key={j} className="flex items-start gap-3 text-sm text-[var(--fg-2)]">
                    <span className="mt-0.5 shrink-0 font-mono text-[var(--accent)] text-xs">
                      →
                    </span>
                    {achievement}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
```

- [ ] **Step 2: Visual check** — scroll to experience. Timeline rail visible on desktop, glowing node on each entry, achievement bullets with `→` prefix.

- [ ] **Step 3: Commit**

```bash
git add components/experience-section.tsx
git commit -m "feat: experience section — timeline with terminal-style achievement bullets"
```

---

## Task 10: Projects Section

**Files:**
- Rewrite: `components/projects-section.tsx`

**Interfaces:**
- Consumes: `Section`, `projects` from `@/data/portfolio`

- [ ] **Step 1: Rewrite projects-section.tsx**

```tsx
import { projects } from "@/data/portfolio";
import { Section } from "@/components/section";

export function ProjectsSection() {
  return (
    <Section
      id="projects"
      number="03"
      label="work"
      heading="Things I've built."
      className="bg-[var(--bg-alt)]"
    >
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((project, i) => (
          <article
            key={project.slug}
            className="reveal flex flex-col border border-[var(--border)] bg-[var(--surface)] p-6 transition-all duration-200 hover:border-[var(--border-2)] group"
            style={{ transitionDelay: `${i * 80}ms` }}
          >
            <h3 className="font-display text-xl text-[var(--fg)] group-hover:text-[var(--accent)] transition-colors duration-200">
              {project.name}
            </h3>
            <p className="mt-3 text-sm text-[var(--fg-2)] leading-relaxed flex-1">
              {project.description}
            </p>

            {/* Highlights */}
            {project.highlights && project.highlights.length > 0 && (
              <ul className="mt-4 space-y-1.5">
                {project.highlights.map((h, j) => (
                  <li key={j} className="flex items-start gap-2 text-xs text-[var(--muted)]">
                    <span className="text-[var(--accent)] shrink-0">▸</span>
                    {h}
                  </li>
                ))}
              </ul>
            )}

            {/* Tech stack */}
            <div className="mt-5 flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="font-mono text-[0.62rem] px-2 py-0.5 border border-[var(--border)] text-[var(--accent)] bg-[var(--accent-bg)]"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Links */}
            <div className="mt-5 flex items-center gap-5 border-t border-[var(--border)] pt-4">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-xs text-[var(--muted)] hover:text-[var(--accent)] transition-colors"
                >
                  → GitHub
                </a>
              )}
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-xs text-[var(--muted)] hover:text-[var(--accent)] transition-colors"
                >
                  → Live Demo
                </a>
              )}
              <a
                href={`/projects/${project.slug}`}
                className="ml-auto font-mono text-xs text-[var(--muted)] hover:text-[var(--accent)] transition-colors"
              >
                Case Study →
              </a>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-8 reveal">
        <a
          href="/projects"
          className="font-mono text-xs tracking-[0.18em] uppercase text-[var(--muted)] hover:text-[var(--accent)] transition-colors inline-flex items-center gap-2"
        >
          View all projects →
        </a>
      </div>
    </Section>
  );
}
```

- [ ] **Step 2: Visual check** — project cards appear in 3-column grid, hover reveals green title and border glow.

- [ ] **Step 3: Commit**

```bash
git add components/projects-section.tsx
git commit -m "feat: projects section — dark card grid with highlights and stack tags"
```

---

## Task 11: Skills Section + CP Section

**Files:**
- Rewrite: `components/skills-section.tsx`
- Rewrite: `components/cp-section.tsx`

**Interfaces:**
- Consumes: `Section`, `ChipGroup`, `skillGroups`, `cpProfile` from data files

- [ ] **Step 1: Rewrite skills-section.tsx**

```tsx
import { skillGroups } from "@/data/portfolio";
import { Section } from "@/components/section";
import { ChipGroup } from "@/components/chip-group";

export function SkillsSection() {
  return (
    <Section
      id="skills"
      number="04"
      label="skills"
      heading="What I work with."
      className="bg-[var(--bg)]"
    >
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {skillGroups.map((group, i) => (
          <div
            key={group.category}
            className="reveal"
            style={{ transitionDelay: `${i * 70}ms` }}
          >
            <ChipGroup title={group.category} items={group.skills} />
          </div>
        ))}
      </div>
    </Section>
  );
}
```

- [ ] **Step 2: Rewrite cp-section.tsx**

```tsx
import { cpProfile } from "@/data/portfolio";
import { Section } from "@/components/section";

export function CPSection() {
  return (
    <Section
      id="compete"
      number="05"
      label="competitive programming"
      heading="DSA, contests, reps."
      className="bg-[var(--bg-alt)]"
    >
      <div className="reveal border border-[var(--border)] bg-[var(--terminal-bg)] p-6 font-mono text-sm max-w-2xl">
        <div className="text-[var(--accent)]">
          $ competitive-stats --handle nitesh1741
        </div>

        <div className="mt-5 space-y-1 text-[var(--fg-2)]">
          <div>
            <span className="text-[var(--muted)]">total_solved: </span>
            <span className="text-[var(--accent)] font-bold">
              {cpProfile.totalSolved.toLocaleString()}+
            </span>
          </div>
        </div>

        <div className="mt-5">
          <div className="text-[var(--muted)] mb-2">platforms:</div>
          {cpProfile.platforms.map((platform) => (
            <a
              key={platform.name}
              href={platform.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 ml-4 py-1 text-[var(--fg-2)] hover:text-[var(--accent)] transition-colors group"
            >
              <span className="text-[var(--border-2)] group-hover:text-[var(--accent)] transition-colors">
                ▸
              </span>
              <span className="text-[var(--fg)]">{platform.name}</span>
              <span className="text-[var(--muted)]">({platform.handle})</span>
              <span className="ml-auto text-[var(--accent)]">
                {platform.solvedCount.toLocaleString()}+ solved
              </span>
            </a>
          ))}
        </div>

        <div className="mt-5">
          <div className="text-[var(--muted)] mb-2">notable contests:</div>
          {cpProfile.contests.map((contest) => (
            <div key={contest.name} className="ml-4 py-1 text-[var(--fg-2)]">
              <span className="text-[var(--fg)]">
                {contest.name} {contest.year}
              </span>
              <span className="text-[var(--accent)]"> #{contest.rank}</span>
              <span className="text-[var(--muted)]">
                {" "}
                of {contest.totalParticipants.toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
```

- [ ] **Step 3: Visual check** — skills grid with category icons + dark chip cards. CP section shows terminal-output style stats.

- [ ] **Step 4: Commit**

```bash
git add components/skills-section.tsx components/cp-section.tsx
git commit -m "feat: skills and CP sections with dark terminal aesthetic"
```

---

## Task 12: Education + Contact Sections

**Files:**
- Rewrite: `components/education-section.tsx`
- Rewrite: `components/contact-section.tsx`
- Rewrite: `components/contact-link.tsx`

**Interfaces:**
- Consumes: `Section`, `education`, `profile` from data

- [ ] **Step 1: Rewrite education-section.tsx**

```tsx
import { education } from "@/data/portfolio";
import { Section } from "@/components/section";

export function EducationSection() {
  return (
    <Section
      id="education"
      number="06"
      label="education"
      heading="Where I learned to learn."
      className="bg-[var(--bg)]"
    >
      <div className="space-y-4">
        {education.map((edu, i) => (
          <div
            key={i}
            className="reveal border border-[var(--border)] bg-[var(--surface)] p-6"
            style={{ transitionDelay: `${i * 80}ms` }}
          >
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h3 className="font-display text-xl text-[var(--fg)]">
                  {edu.degree}
                </h3>
                <p className="mt-1 font-mono text-xs text-[var(--accent)] tracking-[0.12em]">
                  {edu.institution}
                </p>
              </div>
              {edu.duration && (
                <span className="font-mono text-xs text-[var(--muted)] shrink-0">
                  {edu.duration}
                </span>
              )}
            </div>

            {edu.coursework && edu.coursework.length > 0 && (
              <ul className="mt-4 space-y-1.5">
                {edu.coursework.map((item, j) => (
                  <li
                    key={j}
                    className="font-mono text-xs text-[var(--fg-2)] flex items-center gap-2"
                  >
                    <span className="text-[var(--accent)]">▸</span>
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </Section>
  );
}
```

- [ ] **Step 2: Rewrite contact-link.tsx**

```tsx
type ContactLinkProps = {
  href: string;
  label: string;
  external?: boolean;
};

export function ContactLink({ href, label, external = false }: ContactLinkProps) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="inline-flex items-center gap-2 font-mono text-sm text-[var(--fg-2)] hover:text-[var(--accent)] transition-colors duration-200"
    >
      <span className="text-[var(--accent)]">→</span>
      {label}
    </a>
  );
}
```

- [ ] **Step 3: Rewrite contact-section.tsx**

```tsx
import { profile } from "@/data/portfolio";
import { Section } from "@/components/section";
import { ContactLink } from "@/components/contact-link";

export function ContactSection() {
  return (
    <Section
      id="contact"
      number="07"
      label="contact"
      heading="Let's build something."
      className="bg-[var(--bg-alt)]"
    >
      <p className="reveal font-mono text-sm text-[var(--muted)] max-w-md mb-10">
        Open to interesting problems, collaboration, and conversations.
        <br />
        Response time: usually within 24 hours.
      </p>

      <div className="reveal flex flex-col sm:flex-row flex-wrap gap-5">
        <ContactLink href={`mailto:${profile.email}`} label={profile.email} />
        <ContactLink href={profile.linkedin} label="LinkedIn" external />
        <ContactLink href={profile.github} label="GitHub" external />
        {profile.githubSecondary && (
          <ContactLink href={profile.githubSecondary} label="GitHub (alt)" external />
        )}
        <ContactLink href={profile.resume} label="Resume (PDF)" />
      </div>
    </Section>
  );
}
```

- [ ] **Step 4: Visual check** — education cards with institution + coursework bullets. Contact section has large serif heading + link row.

- [ ] **Step 5: Commit**

```bash
git add components/education-section.tsx components/contact-section.tsx components/contact-link.tsx
git commit -m "feat: education and contact sections"
```

---

## Task 13: Footer + Page Assembly

**Files:**
- Rewrite: `components/site-footer.tsx`
- Modify: `app/page.tsx` (section order check, no changes if already correct)

**Interfaces:**
- `SiteFooter` consumes nothing from props; reads current year inline.
- `app/page.tsx` already imports all sections — verify order matches spec.

- [ ] **Step 1: Rewrite site-footer.tsx**

```tsx
export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--border)] bg-[var(--bg)] py-8">
      <div className="mx-auto max-w-6xl px-5 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2.5 font-mono text-xs text-[var(--muted)]">
          <span className="text-[var(--accent)]">nitesh@portfolio:~$</span>
          <span
            className="h-1.5 w-1.5 rounded-full bg-[var(--accent)] animate-pulse"
            aria-hidden="true"
          />
        </div>
        <p className="font-mono text-xs text-[var(--muted)] text-center sm:text-right">
          © {year} Nitesh Kumar Mehta · Hyderabad, India
        </p>
      </div>
    </footer>
  );
}
```

- [ ] **Step 2: Verify app/page.tsx section order**

Open `app/page.tsx`. Confirm sections render in this order:
```tsx
<SiteNav items={navItems} />
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
<SiteFooter />
```

If the order differs, reorder to match. The JSON-LD scripts above the nav are unchanged.

- [ ] **Step 3: Run all tests**

```bash
npm test
```

Expected: all tests in `__tests__/` PASS. Fix any regressions before continuing.

- [ ] **Step 4: Full visual walkthrough on dev server**

```bash
npm run dev
```

Go through each section on `http://localhost:3000`:

| Section | What to check |
|---------|--------------|
| Hero | Terminal boots `whoami`, response types, suggestions clickable, live chat works |
| About | Profile photo visible on desktop, metrics count up, CTA buttons work |
| Experience | Timeline rail + glow nodes, all bullets visible |
| Projects | 3-col grid, hover border/glow effect, stack tags green |
| Skills | Category grid, chip hover highlights |
| CP | Terminal-style stats block, platform links work |
| Education | Cards stack correctly on mobile |
| Contact | Links row, all hrefs correct |
| Footer | `nitesh@portfolio:~$` with pulse dot |
| Nav | Transparent at top, blurs on scroll, active underline |

Fix any visual issues before committing.

- [ ] **Step 5: Production build check**

```bash
npm run build
```

Fix any TypeScript errors or Next.js build warnings. Common issues:
- `Image` component missing `alt` — add it
- `any` types in hook — add explicit types
- Unused imports — remove them

- [ ] **Step 6: Final commit**

```bash
git add components/site-footer.tsx app/page.tsx
git commit -m "feat: footer and final page assembly — terminal portfolio complete"
```

---

## Self-Review Against Spec

**Spec coverage check:**

| Spec requirement | Task |
|---|---|
| Dark tokens `#0a0a0a` base, `#4ade80` accent | Task 1 |
| Instrument Serif + Geist Mono + Geist Sans | Existing fonts, confirmed in Task 1 CSS |
| Full-viewport terminal hero | Task 5 |
| `whoami` auto-boot sequence | Task 3 (hook) |
| 5 suggestion chips | Task 4 (terminal-window) |
| `POST /api/chat` → `{ message }` → `{ response }` | Task 2 |
| CHAT_API_URL env var, never client-side | Task 2 |
| Typewriter 18ms/char | Task 3 (hook) |
| prefers-reduced-motion instant render | Task 3 (hook) |
| Error messages: 422, 5xx, timeout | Tasks 2 + 3 |
| Profile photo in About section | Task 8 |
| `// 01. label` section markers | Task 7 (Section component) |
| Scroll-reveal on all section content | Task 7 (Section component) |
| About: summary + metrics + photo + CTA | Task 8 |
| Experience: timeline + achievements | Task 9 |
| Projects: 3-col grid + stack tags + links | Task 10 |
| Skills: ChipGroup per category | Task 11 |
| CP: terminal-output stats | Task 11 |
| Education: institution cards | Task 12 |
| Contact: serif CTA + link row | Task 12 |
| Footer: `nitesh@portfolio:~$` | Task 13 |
| Jest tests for API route (6 cases) | Task 2 |
| Jest tests for hook (9 cases) | Task 3 |
| data/ files unchanged | All tasks (read-only constraint) |
