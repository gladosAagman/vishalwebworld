"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

import { refreshScrollTriggers } from "@/lib/gsap";

/**
 * Keeps scroll-linked animations honest without a manual page reload.
 *
 * ScrollTrigger caches each trigger's start/end pixel positions when it is
 * created. On a client-side navigation the new route mounts while the document
 * is still the old height and the browser has not restored scroll yet, so every
 * trigger is built against the wrong geometry — the reason scroll animations
 * only worked after refreshing the page. Late-arriving images, webfonts and
 * theme changes shift the same geometry.
 *
 * This mounts once in the persistent chrome and re-measures on all of those.
 */
export function ScrollSync() {
  const pathname = usePathname();

  useEffect(() => {
    // Two passes: one after the new route paints, one after layout has settled
    // (lazy images below the fold resolve their boxes in the meantime).
    const timers = [80, 600].map((delay) =>
      window.setTimeout(refreshScrollTriggers, delay),
    );

    const onResize = () => refreshScrollTriggers();
    window.addEventListener("resize", onResize);
    window.addEventListener("orientationchange", onResize);
    window.addEventListener("vww:theme-change", onResize);
    // Capture phase: `load` from an <img> does not bubble.
    window.addEventListener("load", onResize, true);

    void document.fonts?.ready.then(refreshScrollTriggers);

    return () => {
      timers.forEach(window.clearTimeout);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("orientationchange", onResize);
      window.removeEventListener("vww:theme-change", onResize);
      window.removeEventListener("load", onResize, true);
    };
  }, [pathname]);

  return null;
}
