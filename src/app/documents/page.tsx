import type { Metadata } from "next";

import { ScrollReveal } from "@/components/reactbits/ScrollReveal";
import { DocumentsList } from "@/components/site/DocumentsList";
import { PageHero } from "@/components/site/PageHero";
import { PageShell } from "@/components/site/PageShell";

const title = "Required Documents Checklist | Vishal Web World";
const description =
  "GST, ITR filing, EWS certificate, marriage registration, EPF, ITI aur college admission — 36+ services ke liye zaroori documents ki poori checklist ek jagah.";

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
        motif="documents"
        caption="36+ checklists · har kaam 1 din mein"
        eyebrow="Documents checklist"
        title="Kaunse documents chahiye — pehle se ready rakhiye"
        description="Har service ke liye zaroori papers ki list. Centre aane se pehle checklist dekh lijiye, kaam ek hi visit mein ho jaayega."
      />
      <section className="mx-auto max-w-5xl px-4 py-16 sm:py-20">
        <ScrollReveal
          baseOpacity={0.08}
          baseRotation={3}
          blurStrength={8}
          containerClassName="!my-0"
          textClassName="font-display tracking-[-0.02em]"
        >
          Documents adhoore hon toh application ruk jaati hai. Neeche har service ki checklist hai — photo, ID aur proof pehle se ready rakhiye, kaam ek hi visit mein poora.
        </ScrollReveal>
      </section>
      <DocumentsList />
    </PageShell>
  );
}
