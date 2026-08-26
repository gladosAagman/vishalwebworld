"use client";

import type { gsap as GsapType } from "gsap";
import type { ScrollTrigger as ScrollTriggerType } from "gsap/ScrollTrigger";

type Gsap = { gsap: typeof GsapType; ScrollTrigger: typeof ScrollTriggerType };

let pending: Promise<Gsap> | null = null;

/**
 * Loads GSAP + ScrollTrigger once per session and registers the plugin.
 *
 * Every animated component used to import both modules itself, which meant the
 * plugin was registered repeatedly and each component raced the others to build
 * its triggers. Sharing one promise means all callers get the same, already
 * registered instance.
 */
export function loadGsap(): Promise<Gsap> {
  pending ??= Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(
    ([{ gsap }, { ScrollTrigger }]) => {
      gsap.registerPlugin(ScrollTrigger);
      // Triggers are created while the route is still painting, so their start/end
      // positions are measured against a half-built page. Anything that changes the
      // page height afterwards has to invalidate them, or the animation sits at its
      // "before" state until a reload re-measures everything.
      ScrollTrigger.config({ ignoreMobileResize: true });
      return { gsap, ScrollTrigger };
    },
  );
  return pending;
}

/**
 * Re-measures every ScrollTrigger, coalescing bursts into one pass per frame.
 * refresh() reads layout for each trigger, so calling it per image `load` event
 * on an image-heavy page would thrash layout.
 */
let refreshFrame = 0;
export function refreshScrollTriggers() {
  if (refreshFrame) return;
  refreshFrame = requestAnimationFrame(() => {
    refreshFrame = 0;
    void loadGsap().then(({ ScrollTrigger }) => ScrollTrigger.refresh());
  });
}
