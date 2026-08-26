import type { Metadata } from "next";

import { ContactSection } from "@/components/site/ContactSection";
import { CscSection } from "@/components/site/CscSection";
import { HeroSection } from "@/components/site/HeroSection";
import { OwnerSection } from "@/components/site/OwnerSection";
import { PageShell } from "@/components/site/PageShell";
import { RevealText } from "@/components/site/RevealText";
import { SchemesSection } from "@/components/site/SchemesSection";
import { ServicesSection } from "@/components/site/ServicesSection";
import { TestimonialsSection } from "@/components/site/TestimonialsSection";

const title = "Vishal Web World | Online Services & Banking";
const description =
  "Samagra ID, Ayushman card, PAN, Aadhaar, banking cash withdrawal, forms and scheme applications at Vishal Web World.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description, type: "website" },
  twitter: { card: "summary_large_image" },
};

export default function Index() {
  return (
    <PageShell>
      <HeroSection />
      <ServicesSection compact />
      <RevealText>Sarkari kaam ka matlab lambi lines aur confusion nahi hona chahiye. Vishal Web World par aapka document, form aur banking kaam ek jagah, official portals par, simple Hinglish guidance ke saath complete hota hai.</RevealText>
      <OwnerSection />
      <CscSection />
      <SchemesSection />
      <TestimonialsSection />
      <ContactSection />
    </PageShell>
  );
}
