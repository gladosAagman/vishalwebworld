/**
 * "Lite" mode — the switch that decides whether this device gets the scenery.
 *
 * The stage (drifting light, sweeping sheen, pinned 3D chapters, per-character
 * headline folds) is decorative. Measured on a 6x-throttled CPU, which is what
 * a mid-range Android feels like, the homepage idled at 6fps with all of it
 * running and 60fps with the decorative animation switched off — the page was
 * spending every frame on ambience nobody asked for.
 *
 * So anything that is not obviously a fast machine gets the static version:
 * same layout, same colours, no animation loops. Touch devices are included
 * wholesale — they also have no cursor, so the parallax and the pointer torch
 * have nothing to track there anyway.
 *
 * The flag is written to <html data-perf="lite"> before first paint (see
 * layout.tsx), so CSS can branch on it without a flash of the heavy version,
 * and JS can skip building animations that would only be torn down.
 */

/** Runs in <head>, before paint, as a plain string. Keep it ES5 and tiny. */
export const LITE_MODE_SCRIPT = `(function(){try{var n=navigator,c=n.hardwareConcurrency||8,m=n.deviceMemory||8,d=n.connection&&n.connection.saveData,r=matchMedia("(prefers-reduced-motion: reduce)").matches,t=matchMedia("(pointer: coarse)").matches;if(r||d||t||c<=4||m<=4){document.documentElement.dataset.perf="lite";}}catch(e){}})();`;

/**
 * Client-side read of the same flag. Components call this before wiring up
 * GSAP, observers or per-character timelines.
 */
export function isLiteMode(): boolean {
  if (typeof document === "undefined") return true;
  return document.documentElement.dataset["perf"] === "lite";
}
