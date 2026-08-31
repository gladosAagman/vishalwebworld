"use client";

import { Fragment, useEffect, useMemo, useRef } from "react";

import "./statement.css";
import { isLiteMode } from "@/lib/perf";

type StatementRevealProps = {
  children: string;
  className?: string;
  /** Lead-in label above the statement. */
  eyebrow?: string;
};

/**
 * A statement of copy that rises into place one line at a time.
 *
 * Three decisions worth keeping:
 *
 * 1. It is time-based, not scroll-scrubbed. An earlier version tied word
 *    opacity to scroll position, so the text brightened and dimmed with every
 *    flick of the wheel and never settled. Here the scroll only decides *when*
 *    the animation starts; after that it plays at its own pace and finishes.
 *
 * 2. Nothing is restructured. Each word ships as its own little masked box, and
 *    the script only *reads* layout — it groups words by the line the browser
 *    put them on and writes that number back as a CSS variable that drives the
 *    delay. A previous version wrapped whole measured lines in inline-block
 *    spans, which cannot break: at any width the measurement did not predict,
 *    one "line" grew past the viewport and the page scrolled sideways. Leaving
 *    the text flowing normally makes that impossible.
 *
 * 3. Content is visible by default and is only hidden once this component has
 *    mounted, so a JS failure leaves readable text rather than a blank block.
 */
export function StatementReveal({ children, className = "", eyebrow }: StatementRevealProps) {
  const rootRef = useRef<HTMLParagraphElement>(null);

  const words = useMemo(() => children.split(/\s+/).filter(Boolean), [children]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (isLiteMode()) return;

    let frame = 0;

    /** Reads which visual line each word landed on and tags it with that index. */
    const measure = () => {
      frame = 0;
      const wordEls = root.querySelectorAll<HTMLElement>(".statement-word");
      if (!wordEls.length) return;

      let lineIndex = -1;
      let lastTop: number | null = null;
      for (const word of wordEls) {
        const top = word.offsetTop;
        // A new line starts wherever a word sits more than a rounding error
        // below the previous one.
        if (lastTop === null || top - lastTop > 4) {
          lineIndex += 1;
          lastTop = top;
        }
        word.style.setProperty("--line-index", String(lineIndex));
      }

      root.dataset["statement"] ??= "ready";
    };

    const start = () => {
      root.dataset["statement"] = "in";
      observer.disconnect();
    };

    measure();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) start();
      },
      { threshold: 0.15 },
    );
    observer.observe(root);

    // Already on screen when we measured? The observer would still fire, but on
    // its own schedule, which can lag badly during hydration — start now.
    const rect = root.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.9 && rect.bottom > 0) start();

    // Re-measure only while the text is still waiting: once it is animating or
    // done, re-tagging the lines would restart it mid-flight.
    const remeasure = () => {
      if (root.dataset["statement"] === "in") return;
      if (!frame) frame = requestAnimationFrame(measure);
    };

    void document.fonts?.ready.then(remeasure);
    window.addEventListener("resize", remeasure);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("resize", remeasure);
    };
  }, [words]);

  return (
    <section className={`statement mx-auto max-w-5xl px-4 py-20 sm:py-28 ${className}`} data-no-split>
      {eyebrow && <p className="statement-eyebrow">{eyebrow}</p>}
      <p ref={rootRef} className="statement-text">
        {words.map((word, index) => (
          // The gap after each word is a text node *outside* the span. Inside an
          // inline-block it would be collapsed away at the edge and the words
          // would run together.
          <Fragment key={`${word}-${index}`}>
            <span className="statement-word">
              <span className="statement-word-inner">{word}</span>
            </span>{" "}
          </Fragment>
        ))}
      </p>
    </section>
  );
}

export default StatementReveal;
