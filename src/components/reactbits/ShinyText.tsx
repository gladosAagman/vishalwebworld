import type { CSSProperties } from "react";

import "./ShinyText.css";

export type ShinyTextProps = {
  text: string;
  disabled?: boolean;
  speed?: number;
  className?: string;
  color?: string;
  shineColor?: string;
  spread?: number;
  delay?: number;
};

/**
 * React Bits `ShinyText`, rewritten as pure CSS.
 *
 * Upstream drives the highlight from `useAnimationFrame`, one rAF callback per
 * instance. There are eight of these on the homepage, so eight callbacks wrote
 * an inline style every frame for the whole session — measurable even on a
 * desktop, and part of why a mid-range phone never reached a steady frame rate.
 *
 * A keyframe animation on background-position gives the same sweep, needs no
 * JavaScript at all (so this stays a Server Component), and the browser can
 * stop running it when the label scrolls out of view. Lite mode and
 * reduced-motion visitors get the flat text — see ShinyText.css.
 */
export function ShinyText({
  text,
  disabled = false,
  speed = 2,
  className = "",
  color = "#b5b5b5",
  shineColor = "#ffffff",
  spread = 120,
  delay = 0,
}: ShinyTextProps) {
  const style = {
    backgroundImage: `linear-gradient(${spread}deg, ${color} 0%, ${color} 35%, ${shineColor} 50%, ${color} 65%, ${color} 100%)`,
    // One animation covers both the sweep and the pause after it (the split
    // lives in the keyframes), so `speed + delay` is the whole cycle.
    animationDuration: `${speed + delay}s`,
    // Without a per-instance offset every label on the page flashes in unison.
    animationDelay: `-${(text.length % 7) * 0.4}s`,
  } as CSSProperties;

  return (
    <span className={`shiny-text ${className}`.trim()} data-shiny={disabled ? "off" : "on"} style={style}>
      {text}
    </span>
  );
}

export default ShinyText;
