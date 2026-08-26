import { BadgeCheck, Sparkles } from "lucide-react";

import { ShinyText } from "@/components/reactbits/ShinyText";
import { waLink } from "./whatsapp";
import { WhatsAppButton } from "./WhatsAppButton";

const WHATSAPP = waLink("Hi Vishal ji! Mujhe ek service ke baare mein poochhna hai.");


const highlights = [
  "Banking: Money Transfer, AEPS, Account Opening",
  "Sarkari forms, Samagra, Ayushman, PAN & Aadhaar",
  "Counselling, company registration aur scheme apply",
];

export function OwnerSection() {
  return (
    <section className="relative overflow-hidden bg-muted/40 py-16">
      <div className="pointer-events-none absolute -left-24 top-10 h-64 w-64 rounded-full bg-brand/10 blur-3xl animate-float" />
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 lg:grid-cols-2">
        <div className="animate-fade-up">
          <div className="relative mx-auto max-w-sm">
            <div className="absolute inset-0 -rotate-3 rounded-[2rem] bg-gradient-to-br from-brand/30 to-accent/30 blur-[2px]" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/owner-portrait.jpg"
              alt="Vishal Yadav — Vishal Web World ke owner, digital services centre par"
              loading="lazy"
                decoding="async"
              className="relative w-full rounded-[2rem] object-cover shadow-[var(--shadow-lift)] transition-transform duration-500 hover:-translate-y-1 hover:rotate-1"
            />
          </div>
        </div>

        <div className="animate-fade-up [animation-delay:120ms]">
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            <Sparkles aria-hidden="true" className="h-3.5 w-3.5" />
            <ShinyText text="Meet the owner" color="currentColor" shineColor="var(--highlight)" speed={3} delay={1.5} />
          </span>
          <h2 className="mt-2 text-2xl font-bold sm:text-4xl">
            Aapka apna <span className="text-gradient">digital saathi</span>
          </h2>
          <p className="mt-2 text-lg font-semibold text-foreground sm:text-xl">
            Vishal Yadav
          </p>
          <p className="mt-3 text-sm text-muted-foreground sm:text-base">
            Vishal Web World ek CSC-style digital seva centre hai. Har kaam
            khud dekhte hain — bharosa, speed aur clear guidance ke saath. Koi
            confusion ho toh seedha WhatsApp par poochh lijiye.
          </p>

          <ul className="mt-6 space-y-3">
            {highlights.map((item, i) => (
              <li
                key={item}
                className="flex items-start gap-3 text-sm animate-fade-up"
                style={{ animationDelay: `${160 + i * 80}ms` }}
              >
                <BadgeCheck aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                <span className="text-foreground/90">{item}</span>
              </li>
            ))}
          </ul>

          <WhatsAppButton href={WHATSAPP} size="lg" className="mt-7">
            WhatsApp par baat karein
          </WhatsAppButton>

        </div>
      </div>
    </section>
  );
}
