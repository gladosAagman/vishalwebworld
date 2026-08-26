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
 *
 * SAFETY: this effect hides content that the server already rendered, so any
 * failure to un-hide it shows the visitor a blank page. Everything below is
 * built so that cannot happen — see `sweep` and the unmount handler.
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

    /** Everything currently hidden and waiting to be revealed. */
    const waiting = new Set<HTMLElement>();

    const reveal = (el: HTMLElement) => {
      el.dataset["revealState"] = "in";
      waiting.delete(el);
      observer.unobserve(el);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) reveal(entry.target as HTMLElement);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.06 },
    );

    /*
     * The guarantee. IntersectionObserver is the cheap path, but it can be
     * starved during hydration, and it never fires for an element that was
     * laid out only after it was observed. This pass re-checks the waiting set
     * against the viewport directly, so anything the visitor can actually see
     * is revealed no matter what the observer did. It runs at most once per
     * frame and stops scheduling itself once nothing is waiting.
     */
    let sweepFrame = 0;
    const sweep = () => {
      sweepFrame = 0;
      if (!waiting.size) return;
      const limit = window.innerHeight;
      for (const el of [...waiting]) {
        const rect = el.getBoundingClientRect();
        // Zero-sized means the element is not being rendered at all right now
        // (the usual case: it sits inside a collapsed <details>). Hiding it
        // would leave the panel blank when the visitor opens it, so release it.
        if (rect.width === 0 && rect.height === 0) {
          reveal(el);
          continue;
        }
        if (rect.top < limit && rect.bottom > 0) reveal(el);
      }
    };

    const scheduleSweep = () => {
      if (!sweepFrame && waiting.size) sweepFrame = requestAnimationFrame(sweep);
    };

    const track = (el: HTMLElement) => {
      el.dataset["revealState"] = "out";
      waiting.add(el);
      observer.observe(el);
    };

    const prepare = () => {
      document.querySelectorAll<HTMLElement>(REVEAL_SELECTOR).forEach((el) => {
        if (el.dataset["revealState"]) return;
        // RevealText / the 3D story run their own animations; leave them alone.
        if (el.closest("[data-no-split]")) return;
        el.classList.remove("animate-fade-up", "animate-pop");
        el.classList.add("reveal");
        track(el);
      });

      sweep();
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

    window.addEventListener("scroll", scheduleSweep, { passive: true });
    window.addEventListener("resize", scheduleSweep);
    // A closed <details> opening, an image finishing, a filter re-rendering —
    // all change what is on screen without a scroll event.
    window.addEventListener("toggle", scheduleSweep, true);
    window.addEventListener("load", scheduleSweep, true);

    // Last-resort passes for a very slow first load, before the visitor has
    // scrolled at all.
    const timers = [400, 1200, 2500].map((delay) => window.setTimeout(sweep, delay));

    return () => {
      window.clearTimeout(id);
      timers.forEach(window.clearTimeout);
      if (scheduled) cancelAnimationFrame(scheduled);
      if (sweepFrame) cancelAnimationFrame(sweepFrame);
      mutation.disconnect();
      observer.disconnect();
      window.removeEventListener("scroll", scheduleSweep);
      window.removeEventListener("resize", scheduleSweep);
      window.removeEventListener("toggle", scheduleSweep, true);
      window.removeEventListener("load", scheduleSweep, true);
      // Nothing is watching these any more, so leaving one hidden would hide it
      // for good. Anything still waiting becomes visible.
      for (const el of waiting) el.dataset["revealState"] = "in";
      waiting.clear();
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
