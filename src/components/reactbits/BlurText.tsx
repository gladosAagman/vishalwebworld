"use client";

import { motion, type Transition } from "motion/react";
import { useEffect, useMemo, useRef, useState, type ElementType } from "react";

type Snapshot = Record<string, string | number>;

const buildKeyframes = (from: Snapshot, steps: Snapshot[]) => {
  const keys = new Set<string>([...Object.keys(from), ...steps.flatMap((step) => Object.keys(step))]);

  const keyframes: Record<string, (string | number)[]> = {};
  keys.forEach((key) => {
    // A key missing from one step would produce `undefined` in the keyframe
    // array, which motion rejects — carry the previous value forward instead.
    let previous = from[key] ?? 0;
    keyframes[key] = [previous, ...steps.map((step) => (previous = step[key] ?? previous))];
  });
  return keyframes;
};

export type BlurTextProps = {
  text?: string;
  delay?: number;
  className?: string;
  animateBy?: "words" | "letters";
  direction?: "top" | "bottom";
  threshold?: number;
  rootMargin?: string;
  animationFrom?: Snapshot;
  animationTo?: Snapshot[];
  easing?: (t: number) => number;
  onAnimationComplete?: () => void;
  stepDuration?: number;
  /** Element the text renders as — `h1`/`h2` etc. keep the document outline. */
  as?: ElementType;
};

/**
 * React Bits `BlurText`, adapted for this project: it can render as any element
 * (`as`), so a headline stays a heading instead of becoming a `<p>`.
 */
export function BlurText({
  text = "",
  delay = 200,
  className = "",
  animateBy = "words",
  direction = "top",
  threshold = 0.1,
  rootMargin = "0px",
  animationFrom,
  animationTo,
  easing = (t) => t,
  onAnimationComplete,
  stepDuration = 0.35,
  as,
}: BlurTextProps) {
  const elements = animateBy === "words" ? text.split(" ") : text.split("");
  const [inView, setInView] = useState(false);
  // The server-rendered markup carries no hidden state: `initial` is only
  // applied once this has mounted. Otherwise a headline would ship as
  // opacity-0 HTML and any failure to hydrate would leave the page blank
  // exactly where its most important line should be.
  const [armed, setArmed] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => setArmed(true), []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Anything already on screen (a hero, above the fold) must animate even if
    // the observer's first callback lands late during hydration.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setInView(true);
          observer.unobserve(el);
        }
      },
      { threshold, rootMargin },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  const defaultFrom = useMemo<Snapshot>(
    () =>
      direction === "top"
        ? { filter: "blur(10px)", opacity: 0, y: -50 }
        : { filter: "blur(10px)", opacity: 0, y: 50 },
    [direction],
  );

  const defaultTo = useMemo<Snapshot[]>(
    () => [
      { filter: "blur(5px)", opacity: 0.5, y: direction === "top" ? 5 : -5 },
      { filter: "blur(0px)", opacity: 1, y: 0 },
    ],
    [direction],
  );

  const fromSnapshot = animationFrom ?? defaultFrom;
  const toSnapshots = animationTo ?? defaultTo;

  const stepCount = toSnapshots.length + 1;
  const totalDuration = stepDuration * (stepCount - 1);
  const times = Array.from({ length: stepCount }, (_, i) => (stepCount === 1 ? 0 : i / (stepCount - 1)));

  const Wrapper = (as ?? "p") as ElementType;

  return (
    <Wrapper ref={ref} className={className} style={{ display: "flex", flexWrap: "wrap" }}>
      {elements.map((segment, index) => {
        const animateKeyframes = buildKeyframes(fromSnapshot, toSnapshots);

        const spanTransition: Transition = {
          duration: totalDuration,
          times,
          delay: (index * delay) / 1000,
          ease: easing,
        };

        return (
          <motion.span
            className="inline-block will-change-[transform,filter,opacity]"
            key={index}
            initial={armed ? fromSnapshot : false}
            animate={inView ? animateKeyframes : armed ? fromSnapshot : false}
            transition={spanTransition}
            {...(onAnimationComplete && index === elements.length - 1
              ? { onAnimationComplete }
              : {})}
          >
            {segment === " " ? " " : segment}
            {animateBy === "words" && index < elements.length - 1 && " "}
          </motion.span>
        );
      })}
    </Wrapper>
  );
}

export default BlurText;
