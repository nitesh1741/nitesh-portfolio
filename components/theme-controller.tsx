"use client";

import { useEffect, useSyncExternalStore } from "react";

type Theme = "light" | "dark";

const themeKey = "theme";

function readTheme(): Theme {
  if (typeof window === "undefined") {
    return "dark";
  }

  const stored = window.localStorage.getItem(themeKey);
  if (stored === "light" || stored === "dark") {
    return stored;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function subscribe(onStoreChange: () => void) {
  const media = window.matchMedia("(prefers-color-scheme: dark)");

  window.addEventListener("storage", onStoreChange);
  media.addEventListener("change", onStoreChange);

  return () => {
    window.removeEventListener("storage", onStoreChange);
    media.removeEventListener("change", onStoreChange);
  };
}

function getServerSnapshot(): Theme {
  return "dark";
}

export function ThemeController() {
  const theme = useSyncExternalStore(subscribe, readTheme, getServerSnapshot);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  function toggleTheme() {
    const nextTheme = theme === "dark" ? "light" : "dark";
    window.localStorage.setItem(themeKey, nextTheme);
    window.dispatchEvent(new StorageEvent("storage", { key: themeKey }));
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface)] text-[var(--foreground)] shadow-sm transition-all duration-300 hover:scale-105 hover:border-[var(--accent)] hover:shadow-[var(--shadow)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] cursor-pointer"
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
      title={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
      suppressHydrationWarning
    >
      {theme === "dark" ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-[18px] w-[18px] transition-transform duration-500 hover:rotate-90 text-[var(--accent)]"
        >
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2" />
          <path d="M12 20v2" />
          <path d="M4.93 4.93l1.41 1.41" />
          <path d="M17.66 17.66l1.41 1.41" />
          <path d="M2 12h2" />
          <path d="M20 12h2" />
          <path d="M6.34 17.66l-1.41 1.41" />
          <path d="M19.07 4.93l-1.41 1.41" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-[18px] w-[18px] transition-transform duration-500 hover:-rotate-12 text-[var(--foreground)]"
        >
          <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
        </svg>
      )}
    </button>
  );
}
