"use client";

import { useEffect, useRef, useState } from "react";

import { LOGO_SRC } from "@/lib/logo";

type SiteLogoProps = {
  className?: string;
  /** Wordmark styling used when the logo file is missing. */
  fallbackClassName?: string;
  priority?: boolean;
};

/**
 * Site logo with a text wordmark fallback, so a missing public/vww-logo-full.png
 * never renders as a broken image.
 */
export function SiteLogo({
  className = "",
  fallbackClassName = "",
  priority = false,
}: SiteLogoProps) {
  const imgRef = useRef<HTMLImageElement>(null);
  const [failed, setFailed] = useState(false);

  // The image is requested while the server HTML is parsed, so a failure can
  // land before React attaches onError — re-check once on mount.
  useEffect(() => {
    const img = imgRef.current;
    if (img && img.complete && img.naturalWidth === 0) setFailed(true);
  }, []);

  if (failed) {
    return (
      <span
        className={`font-display whitespace-nowrap font-bold leading-none ${fallbackClassName}`}
      >
        Vishal <span className="text-gradient">Web World</span>
      </span>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      ref={imgRef}
      src={LOGO_SRC}
      alt="Vishal Web World logo"
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      onError={() => setFailed(true)}
      className={className}
    />
  );
}
