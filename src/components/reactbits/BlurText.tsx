"use client";

import { useEffect, useRef, useState, type CSSProperties, type ElementType } from "react";

import { isLiteMode } from "@/lib/perf";
import "./BlurText.css";

export type BlurTextProps = {
  text?: string;
  /** Stagger between words/letters, in milliseconds. */
  delay?: number;
  className?: string;
  animateBy?: "words" | "letters";
  direction?: "top" | "bottom";
  threshold?: number;
  rootMargin?: string;
  onAnimationComplete?: () => void;
  /** Seconds each word/letter takes to arrive. */
  stepDuration?: number;
  /** Element the text renders as — `h1`/`h2` etc. keep the document outline. */
  as?: ElementType;
};

/**
 * React Bits `BlurText`, rewritten as CSS keyframes.
 *
 * Upstream animates every word with `motion`, which meant shipping the whole
 * animation library to render six headlines and running a JS-driven blur per
 * word. The same reveal is two keyframes and a per-word `animation-delay`, so
 * this now costs no runtime library at all — only a single IntersectionObserver
 * to decide when it starts.
 *
 * The words are plain, visible text until this has mounted (`data-state`), so a
 * failure to hydrate leaves a readable headline rather than a blank block. On
 * lite devices there is no reveal: the headline is simply there.
 */
export function BlurText({
  text = "",
  delay = 200,
  className = "",
  animateBy = "words",
  direction = "top",
  threshold = 0.1,
  rootMargin = "0px",
  onAnimationComplete,
  stepDuration = 0.35,
  as,
}: BlurTextProps) {
  const segments = animateBy === "words" ? text.split(" ") : text.split("");
  const ref = useRef<HTMLElement>(null);
  const [state, setState] = useState<"idle" | "armed" | "in">("idle");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (isLiteMode()) return;

    setState("armed");

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        setState("in");
        observer.disconnect();
      },
      { threshold, rootMargin },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  const Wrapper = (as ?? "p") as ElementType;

  return (
    <Wrapper
      ref={ref}
      className={`blur-text ${className}`.trim()}
      data-state={state}
      data-direction={direction}
      style={
        {
          "--blur-text-step": `${stepDuration * 2}s`,
          "--blur-text-stagger": `${delay}ms`,
        } as CSSProperties
      }
    >
      {segments.map((segment, index) => (
        <span
          className="blur-text-part"
          key={index}
          style={{ "--blur-text-index": index } as CSSProperties}
          {...(onAnimationComplete && index === segments.length - 1
            ? { onAnimationEnd: onAnimationComplete }
            : {})}
        >
          {segment === " " ? " " : segment}
          {animateBy === "words" && index < segments.length - 1 && " "}
        </span>
      ))}
    </Wrapper>
  );
}

export default BlurText;
