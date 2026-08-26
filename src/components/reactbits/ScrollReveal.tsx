"use client";

import { useEffect, useMemo, useRef, type RefObject } from "react";

import { loadGsap } from "@/lib/gsap";
import "./ScrollReveal.css";

export type ScrollRevealProps = {
  children: string;
  scrollContainerRef?: RefObject<HTMLElement | null>;
  enableBlur?: boolean;
  baseOpacity?: number;
  baseRotation?: number;
  blurStrength?: number;
  containerClassName?: string;
  textClassName?: string;
  rotationEnd?: string;
  wordAnimationEnd?: string;
};

/**
 * React Bits `ScrollReveal`, adapted for this project:
 *  - GSAP comes from the shared `loadGsap()` loader.
 *  - Cleanup uses a `gsap.context()` scoped to this element. Upstream's cleanup
 *    calls `ScrollTrigger.getAll().forEach(kill)`, which would also destroy the
 *    story sections' triggers and freeze the homepage animations.
 */
export function ScrollReveal({
  children,
  scrollContainerRef,
  enableBlur = true,
  baseOpacity = 0.1,
  baseRotation = 3,
  blurStrength = 4,
  containerClassName = "",
  textClassName = "",
  rotationEnd = "bottom bottom",
  wordAnimationEnd = "bottom bottom",
}: ScrollRevealProps) {
  const containerRef = useRef<HTMLHeadingElement>(null);

  const splitText = useMemo(
    () =>
      children.split(/(\s+)/).map((word, index) => {
        if (/^\s+$/.test(word)) return word;
        return (
          <span className="word" key={index}>
            {word}
          </span>
        );
      }),
    [children],
  );

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let cancelled = false;
    let cleanup: (() => void) | undefined;

    void loadGsap().then(({ gsap }) => {
      if (cancelled) return;

      const scroller = scrollContainerRef?.current ?? window;

      const context = gsap.context(() => {
        gsap.fromTo(
          el,
          { transformOrigin: "0% 50%", rotate: baseRotation },
          {
            ease: "none",
            rotate: 0,
            scrollTrigger: { trigger: el, scroller, start: "top bottom", end: rotationEnd, scrub: true },
          },
        );

        const wordElements = el.querySelectorAll<HTMLElement>(".word");

        gsap.fromTo(
          wordElements,
          { opacity: baseOpacity, willChange: "opacity" },
          {
            ease: "none",
            opacity: 1,
            stagger: 0.05,
            scrollTrigger: {
              trigger: el,
              scroller,
              start: "top bottom-=20%",
              end: wordAnimationEnd,
              scrub: true,
            },
          },
        );

        if (enableBlur) {
          gsap.fromTo(
            wordElements,
            { filter: `blur(${blurStrength}px)` },
            {
              ease: "none",
              filter: "blur(0px)",
              stagger: 0.05,
              scrollTrigger: {
                trigger: el,
                scroller,
                start: "top bottom-=20%",
                end: wordAnimationEnd,
                scrub: true,
              },
            },
          );
        }
      }, el);

      cleanup = () => context.revert();
    });

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, [scrollContainerRef, enableBlur, baseRotation, baseOpacity, rotationEnd, wordAnimationEnd, blurStrength]);

  return (
    <h2 ref={containerRef} className={`scroll-reveal ${containerClassName}`.trim()}>
      <p className={`scroll-reveal-text ${textClassName}`.trim()}>{splitText}</p>
    </h2>
  );
}

export default ScrollReveal;
