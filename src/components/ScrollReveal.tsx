"use client";

import { useEffect, useMemo, useRef } from "react";

import { loadGsap, refreshScrollTriggers } from "@/lib/gsap";
import "./ScrollReveal.css";

type ScrollRevealProps = {
  children: string;
  enableBlur?: boolean;
  baseOpacity?: number;
  baseRotation?: number;
  blurStrength?: number;
  containerClassName?: string;
  textClassName?: string;
  rotationEnd?: string;
  wordAnimationEnd?: string;
};

export function ScrollReveal({
  children,
  enableBlur = true,
  baseOpacity = 0.1,
  baseRotation = 3,
  blurStrength = 4,
  containerClassName = "",
  textClassName = "",
  rotationEnd = "bottom bottom",
  wordAnimationEnd = "bottom bottom",
}: ScrollRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const splitText = useMemo(() => {
    const text = typeof children === "string" ? children : "";
    return text.split(/(\s+)/).map((word, index) => {
      if (word.match(/^\s+$/)) return word;
      return (
        <span className="word" key={`${word}-${index}`}>
          {word}
        </span>
      );
    });
  }, [children]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let cancelled = false;
    let cleanup: (() => void) | undefined;

    void (async () => {
      const { gsap } = await loadGsap();
      if (cancelled) return;

      const tweens = [
        gsap.fromTo(
          el,
          { transformOrigin: "0% 50%", rotate: baseRotation },
          {
            ease: "none",
            rotate: 0,
            scrollTrigger: { trigger: el, start: "top bottom", end: rotationEnd, scrub: true },
          },
        ),
      ];

      const wordElements = el.querySelectorAll<HTMLElement>(".word");
      tweens.push(
        gsap.fromTo(
          wordElements,
          { opacity: baseOpacity },
          {
            ease: "none",
            opacity: 1,
            stagger: 0.05,
            scrollTrigger: {
              trigger: el,
              start: "top bottom-=20%",
              end: wordAnimationEnd,
              scrub: true,
            },
          },
        ),
      );

      if (enableBlur) {
        tweens.push(
          gsap.fromTo(
            wordElements,
            { filter: `blur(${blurStrength}px)` },
            {
              ease: "none",
              filter: "blur(0px)",
              stagger: 0.05,
              scrollTrigger: {
                trigger: el,
                start: "top bottom-=20%",
                end: wordAnimationEnd,
                scrub: true,
              },
            },
          ),
        );
      }

      // Built against whatever the page measured as at mount; re-measure once the
      // route has actually settled so the reveal is not stuck at baseOpacity.
      refreshScrollTriggers();

      cleanup = () => {
        for (const t of tweens) {
          t.scrollTrigger?.kill();
          t.kill();
        }
        // Killing triggers leaves the remaining ones with stale positions.
        refreshScrollTriggers();
      };
    })();

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, [enableBlur, baseRotation, baseOpacity, rotationEnd, wordAnimationEnd, blurStrength]);

  return (
    <div ref={containerRef} data-no-split className={`scroll-reveal ${containerClassName}`}>
      <p className={`scroll-reveal-text ${textClassName}`}>{splitText}</p>
    </div>
  );
}

export default ScrollReveal;
