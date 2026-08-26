import type { ReactNode } from "react";

/**
 * Kept as the page-level wrapper so route files read the same, but the header,
 * footer, scroll effects and FAB now live in the root layout (see SiteChrome).
 * Re-mounting them per route was what made the header's glass surface and the
 * scroll-linked animations need a manual reload after navigating.
 */
export function PageShell({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
