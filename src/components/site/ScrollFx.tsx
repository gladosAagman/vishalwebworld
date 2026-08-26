"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const REVEAL_SELECTOR =
  "[data-reveal], .animate-fade-up, .animate-pop, section > h2, section article, section > div > h2";

/**
 * Global scroll effects:
 *  - converts existing entrance animations into scroll-triggered reveals
 *  - renders a top scroll-progress bar
 * Works on every page because it lives inside PageShell and re-scans on navigation.
 */
export function ScrollFx() {
  const pathname = usePathname();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // Smooth scrolling (Lenis)
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let lenis: { raf: (t: number) => void; destroy: () => void } | null = null;
    let frame = 0;
    let cancelled = false;

    import("lenis").then(({ default: Lenis }) => {
      if (cancelled) return;
      lenis = new Lenis({ duration: 1.1, smoothWheel: true }) as never;
      (window as unknown as { __lenis?: unknown }).__lenis = lenis;
      const raf = (time: number) => {
        lenis?.raf(time);
        frame = requestAnimationFrame(raf);
      };
      frame = requestAnimationFrame(raf);
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
      lenis?.destroy();
    };
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const el = entry.target as HTMLElement;
          el.dataset['revealState'] = "in";
          observer.unobserve(el);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.06 },
    );

    // splits text nodes of a heading into per-word spans for staggered reveal
    const splitWords = (root: HTMLElement) => {
      if (root.dataset['textSplit']) return;
      root.dataset['textSplit'] = "1";
      let index = 0;
      const walk = (node: Node) => {
        for (const child of Array.from(node.childNodes)) {
          if (child.nodeType === Node.TEXT_NODE) {
            const text = child.textContent ?? "";
            if (!text.trim()) continue;
            const frag = document.createDocumentFragment();
            for (const part of text.split(/(\s+)/)) {
              if (!part) continue;
              if (!part.trim()) {
                frag.appendChild(document.createTextNode(part));
                continue;
              }
              const span = document.createElement("span");
              span.className = "word-reveal";
              span.style.setProperty("--wi", String(index++));
              span.textContent = part;
              frag.appendChild(span);
            }
            child.replaceWith(frag);
          } else if (child.nodeType === Node.ELEMENT_NODE) {
            const el = child as HTMLElement;
            if (el.classList.contains("word-reveal")) continue;
            walk(el);
          }
        }
      };
      walk(root);
      root.classList.add("text-reveal");
    };

    const prepare = () => {
      document.querySelectorAll<HTMLElement>("h1, h2, h3").forEach((el) => {
        if (el.closest("[data-no-split]")) return;
        splitWords(el);
        if (!el.dataset['revealState']) {
          el.dataset['revealState'] = "out";
          observer.observe(el);
        }
      });

      document.querySelectorAll<HTMLElement>(REVEAL_SELECTOR).forEach((el) => {
        if (el.dataset['revealState']) return;
        el.classList.remove("animate-fade-up", "animate-pop");
        el.classList.add("reveal");
        el.dataset['revealState'] = "out";
        observer.observe(el);
      });
    };

    // let the route content paint first
    const id = window.setTimeout(prepare, 30);
    const mutation = new MutationObserver(() => prepare());
    mutation.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.clearTimeout(id);
      mutation.disconnect();
      observer.disconnect();
    };
  }, [pathname]);


  return (
    <div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-50 h-0.5 origin-left accent-bar transition-transform duration-150"
      style={{ transform: `scaleX(${progress})` }}
    />
  );
}
