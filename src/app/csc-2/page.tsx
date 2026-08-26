import type { Metadata } from "next";

import { CscSection } from "@/components/site/CscSection";
import { PageHero } from "@/components/site/PageHero";
import { PageShell } from "@/components/site/PageShell";
import { RevealText } from "@/components/site/RevealText";

const title = "CSC 2.0 Info | Vishal Web World";
const description =
  "Know about CSC 2.0, launched in August 2015 under Digital India to support citizen services through VLE-run centres.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description, type: "website" },
  twitter: { card: "summary_large_image" },
};

export default function CscPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="CSC 2.0"
        title={<>Digital India ka local service network</>}
        description="CSC 2.0 ka simple overview: kab launch hua, kaise kaam karta hai, aur Vishal Web World local support kaise deta hai."
      />
      <RevealText>CSC 2.0 Digital India ka wo network hai jo 2.50 lakh Gram Panchayat tak sarkari sewaayein pahunchata hai — aur Vishal Web World aapke shehar mein wahi bharosa deta hai.</RevealText>
      <CscSection />
    </PageShell>
  );
}
