import type { ReactNode } from "react";

import { ScrollFx } from "./ScrollFx";
import { ScrollSync } from "./ScrollSync";
import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";
import { WhatsAppFab } from "./WhatsAppFab";

/**
 * Persistent site chrome. Lives in the root layout, NOT inside a page, so the
 * header (and its glass surface, which measures itself once), the scroll
 * progress bar and the FAB survive client-side navigation instead of
 * unmounting and remounting on every route change.
 */
export function SiteChrome({ children }: { children: ReactNode }) {
  return (
    <div className="relative flex min-h-screen flex-col bg-background">
      <ScrollFx />
      <ScrollSync />
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
      <WhatsAppFab />
    </div>
  );
}
