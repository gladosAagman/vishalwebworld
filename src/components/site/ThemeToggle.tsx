"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

const STORAGE_KEY = "theme";

/**
 * Applies a theme to <html>. `color-scheme` has to move with the class or the
 * browser keeps painting scrollbars, form controls and the canvas background in
 * the old scheme until the next full page load.
 */
function applyTheme(dark: boolean) {
  const root = document.documentElement;
  root.classList.toggle("dark", dark);
  root.style.colorScheme = dark ? "dark" : "light";
}

/**
 * Light/dark switch. The initial class is applied by the inline script in
 * layout.tsx before first paint; this component only reflects and changes it.
 * With no stored choice the site follows the OS setting, including live changes.
 */
export function ThemeToggle({ className = "" }: { className?: string }) {
  // null until mounted — the server cannot know the viewer's theme.
  const [isDark, setIsDark] = useState<boolean | null>(null);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));

    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const onSystemChange = (event: MediaQueryListEvent) => {
      if (localStorage.getItem(STORAGE_KEY)) return; // explicit choice wins
      applyTheme(event.matches);
      setIsDark(event.matches);
    };
    media.addEventListener("change", onSystemChange);
    return () => media.removeEventListener("change", onSystemChange);
  }, []);

  function toggle() {
    const next = !document.documentElement.classList.contains("dark");
    applyTheme(next);
    setIsDark(next);
    // Scroll-linked animations are sized from laid-out elements; a theme swap can
    // change those sizes, so let anything listening re-measure.
    window.dispatchEvent(new Event("vww:theme-change"));
    try {
      localStorage.setItem(STORAGE_KEY, next ? "dark" : "light");
    } catch {
      // private mode / storage blocked — theme still applies for this page
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      aria-pressed={isDark ?? false}
      title={isDark ? "Light mode" : "Dark mode"}
      className={[
        "inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full",
        "border border-border bg-card text-muted-foreground",
        "transition-all duration-300 hover:-translate-y-0.5 hover:text-foreground",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        className,
      ].join(" ")}
    >
      {/* Both icons render; visibility is CSS-driven so there is no hydration mismatch. */}
      <Sun aria-hidden="true" className="h-4 w-4 dark:hidden" />
      <Moon aria-hidden="true" className="hidden h-4 w-4 dark:block" />
    </button>
  );
}
