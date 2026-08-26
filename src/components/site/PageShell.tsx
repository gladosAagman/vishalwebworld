import type { ReactNode } from "react";

import { ScrollFx } from "./ScrollFx";
import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";
import { WhatsAppFab } from "./WhatsAppFab";

type PageShellProps = {
  children: ReactNode;
};

export function PageShell({ children }: PageShellProps) {
  return (
    <div className="min-h-screen bg-background">
      <ScrollFx />
      <SiteHeader />
      <main>{children}</main>
      <SiteFooter />
      <WhatsAppFab />
    </div>
  );
}
