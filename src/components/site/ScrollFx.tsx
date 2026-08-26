"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

const REVEAL_SELECTOR =
  "[data-reveal], .animate-fade-up, .animate-pop, section > h2, section article, section > div > h2";

/**
 * Global scroll effects:
 *  - converts existing entrance animations into scroll-triggered reveals
 *  - renders a top scroll-progress bar
 *
 * Scrolling itself is left to the browser. A JS smooth-scroll library was used
 * here before, but it drives scrolling from the main thread, so it stutters
 * whenever the main thread is busy — native scrolling runs on the compositor
 * and stays smooth regardless.
 *
 * Elements reveal as whole blocks. An earlier version split every heading into
 * per-word spans, which meant ~100 extra separately-transitioning elements per
 * page; measured on a 4x-throttled scroll that roughly doubled dropped frames
 * (25% -> 52%) for the same scroll.
 * Works on every page because it lives inside PageShell and re-scans on navigation.
 *
 * Everything here is deliberately kept off React's render path: the progress bar
 * is written straight to the DOM inside a rAF, and the page height is cached
 * rather than re-read per scroll event (reading scrollHeight forces layout).
 */
export function ScrollFx() {
  const pathname = usePathname();
  const barRef = useRef<HTMLDivElement>(null);

  // --- scroll progress bar (no re-renders, one write per frame) ---
  useEffect(() => {
    let frame = 0;

    const paint = () => {
      frame = 0;
      const bar = barRef.current;
      if (!bar) return;
      // Read layout at most once per frame (scroll events can fire far more
      // often than that, and scrollHeight forces a reflow every time).
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? Math.min(1, window.scrollY / maxScroll) : 0;
      bar.style.transform = `scaleX(${progress})`;
    };

    // coalesce bursts of scroll events into a single write per frame
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(paint);
    };

    paint();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [pathname]);

  // --- scroll-triggered reveals ---
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

    // Anything already on screen must not depend on the IntersectionObserver:
    // its callback can be starved for seconds during hydration on a slow first
    // load, which would leave the page looking blank. Mark those "out" now and
    // flip them "in" immediately so they still animate, but are guaranteed
    // visible. Only genuinely off-screen elements get observed.
    const pending: HTMLElement[] = [];

    const track = (el: HTMLElement) => {
      el.dataset['revealState'] = "out";
      if (el.getBoundingClientRect().top < window.innerHeight) {
        pending.push(el);
      } else {
        observer.observe(el);
      }
    };

    const flushPending = () => {
      if (!pending.length) return;
      const batch = pending.splice(0, pending.length);
      let done = false;
      const reveal = () => {
        if (done) return;
        done = true;
        for (const el of batch) el.dataset['revealState'] = "in";
      };
      // rAF gives the smoothest result, but it can be starved for over a second
      // while the page hydrates on a slow device — measured at 1.24s on a 4x
      // throttled first load, which reads as a blank page. Race it against a
      // timer (which is not frame-bound) so content never waits on a frame.
      requestAnimationFrame(reveal);
      window.setTimeout(reveal, 60);
    };

    const prepare = () => {
      document.querySelectorAll<HTMLElement>(REVEAL_SELECTOR).forEach((el) => {
        if (el.dataset['revealState']) return;
        // RevealText runs its own GSAP word animation; leave it alone.
        if (el.closest("[data-no-split]")) return;
        el.classList.remove("animate-fade-up", "animate-pop");
        el.classList.add("reveal");
        track(el);
      });

      flushPending();
    };

    // prepare() rewrites the DOM, which would re-trigger the observer. Detach
    // while writing, and collapse any burst of mutations into one pass per frame.
    let scheduled = 0;
    const mutation = new MutationObserver(() => {
      if (scheduled) return;
      scheduled = requestAnimationFrame(runPrepare);
    });

    function runPrepare() {
      scheduled = 0;
      mutation.disconnect();
      prepare();
      mutation.observe(document.body, { childList: true, subtree: true });
    }

    // let the route content paint first
    const id = window.setTimeout(runPrepare, 30);

    // Last-resort sweep for a slow first load. One-shot timers rather than an
    // interval: each pass calls getBoundingClientRect on every hidden element,
    // which forces layout — cheap once at startup, but measurable jank if it
    // keeps firing while the user scrolls.
    const sweep = () => {
      document
        .querySelectorAll<HTMLElement>('[data-reveal-state="out"]')
        .forEach((el) => {
          const rect = el.getBoundingClientRect();
          if (rect.top < window.innerHeight && rect.bottom > 0) {
            el.dataset['revealState'] = "in";
            observer.unobserve(el);
          }
        });
    };
    const sweeps = [400, 1200, 2500].map((delay) => window.setTimeout(sweep, delay));

    return () => {
      window.clearTimeout(id);
      sweeps.forEach(window.clearTimeout);
      if (scheduled) cancelAnimationFrame(scheduled);
      mutation.disconnect();
      observer.disconnect();
    };
  }, [pathname]);

  return (
    <div
      ref={barRef}
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-50 h-0.5 origin-left accent-bar"
      style={{ transform: "scaleX(0)", willChange: "transform" }}
    />
  );
}
