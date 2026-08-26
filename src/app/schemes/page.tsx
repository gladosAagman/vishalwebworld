import type { Metadata } from "next";

import { PageHero } from "@/components/site/PageHero";
import { PageShell } from "@/components/site/PageShell";
import { RevealText } from "@/components/site/RevealText";
import { SchemesSection } from "@/components/site/SchemesSection";

const title = "Government Schemes Help | Vishal Web World";
const description =
  "Get help with Ayushman Bharat, PM Kisan, Ladli Behna, PM Awas, Mudra Loan and other ongoing government schemes.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description, type: "website" },
  twitter: { card: "summary_large_image" },
};

export default function SchemesPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Schemes"
        title={<>Yojana eligibility aur apply help</>}
        description="Popular schemes ke benefit, eligibility aur official portal links ek clean page par. Apply karne ke liye direct WhatsApp karein."
      />
      <RevealText>Har yojana ka fayda tabhi milta hai jab sahi documents ke saath sahi time par apply ho. Hum eligibility check karte hain, form bharte hain aur status tak follow-up karte hain.</RevealText>
      <SchemesSection />
    </PageShell>
  );
}
