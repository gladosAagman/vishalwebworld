import type { Metadata } from "next";

import { DocumentsList } from "@/components/site/DocumentsList";
import { PageHero } from "@/components/site/PageHero";
import { PageShell } from "@/components/site/PageShell";

const title = "Required Documents Checklist | Vishal Web World";
const description =
  "GST registration, PAN, Aadhaar, Ayushman, driving licence aur 25+ services ke liye zaroori documents ki poori checklist ek jagah.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description, type: "website" },
  twitter: { card: "summary_large_image" },
};

export default function DocumentsPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Documents checklist"
        title={<>Kaunse documents chahiye — pehle se ready rakhiye</>}
        description="Har service ke liye zaroori papers ki list. Centre aane se pehle checklist dekh lijiye, kaam ek hi visit mein ho jaayega."
      />
      <DocumentsList />
    </PageShell>
  );
}
