"use client";

import { useEffect, type RefObject } from "react";

/**
 * Writes the pointer position over `ref` as CSS custom properties (--mx / --my,
 * each normalised to -1..1). The 3D layers read those directly in their
 * transforms, so parallax costs one custom-property write per frame instead of
 * a React render per mousemove.
 *
 * Skipped for coarse pointers (there is nothing to track on touch) and for
 * reduced-motion users.
 */
export function useStagePointer(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    let frame = 0;
    let x = 0;
    let y = 0;

    const paint = () => {
      frame = 0;
      el.style.setProperty("--mx", x.toFixed(3));
      el.style.setProperty("--my", y.toFixed(3));
    };

    const onMove = (event: PointerEvent) => {
      // getBoundingClientRect per move would force layout on every event; the
      // stage is full-bleed, so the viewport is a good enough frame of reference.
      x = (event.clientX / window.innerWidth) * 2 - 1;
      y = (event.clientY / window.innerHeight) * 2 - 1;
      if (!frame) frame = requestAnimationFrame(paint);
    };

    const onLeave = () => {
      x = 0;
      y = 0;
      if (!frame) frame = requestAnimationFrame(paint);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerleave", onLeave);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
    };
  }, [ref]);
}
