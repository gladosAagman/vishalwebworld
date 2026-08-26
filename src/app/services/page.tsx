import type { Metadata } from "next";

import { PageHero } from "@/components/site/PageHero";
import { PageShell } from "@/components/site/PageShell";
import { RevealText } from "@/components/site/RevealText";
import { ServicesSection } from "@/components/site/ServicesSection";

const title = "Services | Vishal Web World";
const description =
  "Explore 24+ online services including PAN, Aadhaar, Samagra ID, Ayushman Card, banking, exam forms and registration help.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description, type: "website" },
  twitter: { card: "summary_large_image" },
};

export default function ServicesPage() {
  return (
    <PageShell>
      <PageHero
        motif="services"
        caption="24 services · 8 categories"
        eyebrow="Services"
        title="Documents, banking, forms — sab ready"
        description="Search, filter aur direct WhatsApp karein. Hum official portals par accurate form filling aur application help dete hain."
      />
      <RevealText>Ek hi chhat ke neeche 24+ services — PAN, Aadhaar update, Samagra ID, Ayushman card, banking withdrawal aur exam forms. Aap document laayein, baaki sab hum sambhal lenge.</RevealText>
      <ServicesSection />
    </PageShell>
  );
}
