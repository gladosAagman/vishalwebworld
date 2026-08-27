import type { Metadata } from "next";

import { PageHero } from "@/components/site/PageHero";
import { PageShell } from "@/components/site/PageShell";
import { RevealText } from "@/components/site/RevealText";
import { OneDaySection } from "@/components/site/OneDaySection";
import { ServicesSection } from "@/components/site/ServicesSection";

const title = "Services | Vishal Web World";
const description =
  "36+ online services — PAN, Aadhaar, Samagra ID, Ayushman Card, ITR filing, EWS certificate, GST, EPF, insurance, travel booking aur admission forms. Har service 1 din mein.";

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
        caption="36 services · sab 1 din mein"
        eyebrow="Services"
        title="Documents, banking, forms — sab ready"
        description="Search, filter aur direct WhatsApp karein. Har service 1 din mein complete — official portals par accurate form filling ke saath."
      />
      <RevealText>Ek hi chhat ke neeche 36+ services — PAN, Aadhaar update, Samagra ID, Ayushman card, ITR filing, EWS certificate, GST, EPF, insurance, travel booking aur admission forms. Aap document laayein, baaki sab hum sambhal lenge.</RevealText>
      <OneDaySection />
      <ServicesSection />
    </PageShell>
  );
}
