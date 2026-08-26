import type { Metadata } from "next";

import { ContactSection } from "@/components/site/ContactSection";
import { MapSection } from "@/components/site/MapSection";
import { PageHero } from "@/components/site/PageHero";
import { PageShell } from "@/components/site/PageShell";
import { RevealText } from "@/components/site/RevealText";
import { WHATSAPP_DISPLAY } from "@/components/site/whatsapp";

const title = "Contact Vishal Web World";
const description =
  "Contact Vishal Web World on WhatsApp for online services, government forms, banking cash withdrawal and registration help.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description, type: "website" },
  twitter: { card: "summary_large_image" },
};

export default function ContactPage() {
  return (
    <PageShell>
      <PageHero
        motif="contact"
        caption="7 days open · WhatsApp par reply"
        eyebrow="Contact"
        title="WhatsApp par details bhejiye"
        description={`Direct message ke liye number ${WHATSAPP_DISPLAY}. Form submit karte hi pre-filled WhatsApp message open hoga.`}
      />
      <RevealText>Ek WhatsApp message, aur kaam shuru. Naam, service aur zaroori documents bhejiye — hum turant batayenge kya lagega aur kitna time.</RevealText>
      <ContactSection />
      <MapSection />
    </PageShell>
  );
}
