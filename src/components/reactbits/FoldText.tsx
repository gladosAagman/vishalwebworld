"use client";

import { useEffect, useMemo, useRef, type CSSProperties, type ReactNode } from "react";

import { loadGsap } from "@/lib/gsap";
import { isLiteMode } from "@/lib/perf";
import "./FoldText.css";

type Hinge = "top" | "bottom" | "left" | "right";
type SplitBy = "char" | "word" | "line";
type Trigger = "mount" | "hover" | "scroll" | "loop";

const HINGE_CONFIG: Record<Hinge, { origin: string; rotateX: number; rotateY: number }> = {
  top: { origin: "50% 0%", rotateX: -92, rotateY: 0 },
  bottom: { origin: "50% 100%", rotateX: 92, rotateY: 0 },
  left: { origin: "0% 50%", rotateX: 0, rotateY: 92 },
  right: { origin: "100% 50%", rotateX: 0, rotateY: -92 },
};

const NBSP = "\u00A0";

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

const renderWhitespace = (value: string, key: string): ReactNode[] =>
  value.split(/(\n)/).map((part, index) => {
    if (part === "\n") return <br key={`${key}-br-${index}`} />;
    if (!part) return null;

    return (
      <span className="fold-text-whitespace" key={`${key}-space-${index}`}>
        {part.replace(/ /g, NBSP)}
      </span>
    );
  });

export type FoldTextProps = {
  text?: string;
  splitBy?: SplitBy;
  hinge?: Hinge;
  duration?: number;
  stagger?: number;
  ease?: string;
  perspective?: number;
  creaseShading?: number;
  trigger?: Trigger;
  fontSize?: string | number;
  fontWeight?: string | number;
  color?: string;
  className?: string;
  style?: CSSProperties;
};

/**
 * React Bits `FoldText`, adapted for this project:
 *  - GSAP + ScrollTrigger come from the shared `loadGsap()` loader, so the
 *    plugin is registered once for the whole session instead of once per
 *    component, and GSAP stays out of the initial bundle.
 *  - Font size/weight/colour default to `inherit`, so a headline keeps the
 *    site's display type unless a call site overrides it.
 */
export function FoldText({
  text = "Design unfolds",
  splitBy = "char",
  hinge = "top",
  duration = 0.65,
  stagger = 0.045,
  ease = "power3.out",
  perspective = 700,
  creaseShading = 0.55,
  trigger = "mount",
  fontSize,
  fontWeight,
  color,
  className = "",
  style = {},
}: FoldTextProps) {
  const rootRef = useRef<HTMLSpanElement>(null);
  const hingeConfig = HINGE_CONFIG[hinge] ?? HINGE_CONFIG.top;
  const safeCrease = clamp(creaseShading, 0, 1);
  const safePerspective = Math.max(120, perspective);

  const segments = useMemo(() => {
    let segmentIndex = 0;

    const renderSegment = (content: string, key: string, split: SplitBy = splitBy) => {
      segmentIndex += 1;
      return (
        <span
          className="fold-text-segment"
          data-fold-split={split}
          key={key}
          style={{ "--fold-perspective": `${safePerspective}px` } as CSSProperties}
        >
          <span
            className="fold-text-piece"
            data-fold-hinge={hinge}
            style={{ transformOrigin: hingeConfig.origin, "--fold-crease": 0 } as CSSProperties}
          >
            {content || NBSP}
          </span>
        </span>
      );
    };

    if (splitBy === "line") {
      return text.split("\n").map((line, index) => (
        <span className="fold-text-line" key={`line-${index}`}>
          {renderSegment(line || NBSP, `segment-line-${index}`, "line")}
        </span>
      ));
    }

    if (splitBy === "word") {
      return text.split(/(\s+)/).flatMap((part, index): ReactNode[] => {
        if (!part) return [];
        if (/^\s+$/.test(part)) return renderWhitespace(part, `ws-${index}`);
        return [renderSegment(part, `segment-word-${segmentIndex}`)];
      });
    }

    return Array.from(text).map((char, index) => {
      if (char === "\n") return <br key={`br-${index}`} />;
      return renderSegment(char === " " ? NBSP : char, `segment-char-${index}`);
    });
  }, [text, splitBy, hinge, hingeConfig.origin, safePerspective]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const pieces = Array.from(root.querySelectorAll<HTMLElement>(".fold-text-piece"));
    if (!pieces.length) return;
    // Lite devices get the headline as plain text: a per-character 3D timeline
    // is the most expensive way to show a word.
    if (isLiteMode()) return;

    let cancelled = false;
    let cleanup: (() => void) | undefined;

    void loadGsap().then(({ gsap, ScrollTrigger }) => {
      if (cancelled) return;

      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const activeDuration = reduceMotion ? Math.min(duration, 0.22) : duration;
      const activeStagger = reduceMotion ? Math.min(stagger, 0.02) : stagger;

      const fromVars = {
        opacity: 0,
        rotateX: reduceMotion ? 0 : hingeConfig.rotateX,
        rotateY: reduceMotion ? 0 : hingeConfig.rotateY,
        "--fold-crease": reduceMotion ? 0 : safeCrease,
        transformOrigin: hingeConfig.origin,
        force3D: true,
      };
      const toVars = {
        opacity: 1,
        rotateX: 0,
        rotateY: 0,
        "--fold-crease": 0,
        duration: activeDuration,
        ease: reduceMotion ? "power1.out" : ease,
        stagger: activeStagger,
        clearProps: "willChange",
      };

      let timeline: ReturnType<typeof gsap.timeline> | null = null;

      const killTimeline = () => {
        timeline?.kill();
        timeline = null;
        gsap.killTweensOf(pieces);
      };

      const play = (repeat: boolean) => {
        killTimeline();
        timeline = gsap.timeline({ repeat: repeat ? -1 : 0, repeatDelay: repeat ? 0.75 : 0 });
        timeline.fromTo(pieces, fromVars, toVars);
      };

      let scrollTrigger: ReturnType<typeof ScrollTrigger.create> | undefined;
      let hoverHandler: (() => void) | undefined;

      if (trigger === "hover") {
        gsap.set(pieces, {
          opacity: 1,
          rotateX: 0,
          rotateY: 0,
          "--fold-crease": 0,
          transformOrigin: hingeConfig.origin,
        });
        hoverHandler = () => play(false);
        root.addEventListener("mouseenter", hoverHandler);
      } else if (trigger === "scroll") {
        gsap.set(pieces, fromVars);
        scrollTrigger = ScrollTrigger.create({
          trigger: root,
          start: "top 88%",
          once: true,
          onEnter: () => play(false),
        });
      } else if (trigger === "loop") {
        play(true);
      } else {
        play(false);
      }

      cleanup = () => {
        if (hoverHandler) root.removeEventListener("mouseenter", hoverHandler);
        scrollTrigger?.kill();
        killTimeline();
        // A failed/aborted animation must never leave the headline invisible.
        gsap.set(pieces, { clearProps: "all" });
      };
    });

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, [
    text,
    splitBy,
    hinge,
    duration,
    stagger,
    ease,
    safeCrease,
    trigger,
    hingeConfig.origin,
    hingeConfig.rotateX,
    hingeConfig.rotateY,
  ]);

  const rootStyle = {
    ...(fontSize !== undefined && {
      "--fold-text-font-size": typeof fontSize === "number" ? `${fontSize}px` : fontSize,
    }),
    ...(fontWeight !== undefined && { "--fold-text-font-weight": fontWeight }),
    ...(color !== undefined && { "--fold-text-color": color }),
    ...style,
  } as CSSProperties;

  return (
    <span ref={rootRef} className={`fold-text ${className}`.trim()} style={rootStyle}>
      <span className="fold-text-sr-only">{text}</span>
      <span className="fold-text-visual" aria-hidden="true">
        {segments}
      </span>
    </span>
  );
}

export default FoldText;
