import { ArrowRight, Sparkles } from "lucide-react";

import { GovSearch } from "./GovSearch";
import { StarButton } from "./StarButton";
import { waLink } from "./whatsapp";
import { WhatsAppButton } from "./WhatsAppButton";


const stats = [
  ["24+", "Services"],
  ["10,000+", "Happy customers"],
  ["7 days", "Open every week"],
];

export function HeroSection() {
  return (
    <section id="top" className="hero-surface relative overflow-hidden text-primary-foreground">
      <div className="absolute inset-x-0 top-0 h-px bg-primary-foreground/20" />
      <div className="relative z-10 mx-auto grid max-w-6xl gap-10 px-4 py-14 lg:grid-cols-2 lg:items-center lg:py-20">
        <div className="animate-fade-up">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/25 bg-primary-foreground/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide">
            <Sparkles aria-hidden="true" className="h-3.5 w-3.5 text-highlight" />
            CSC 2.0 · Digital India
          </span>
          <h1 className="mt-5 text-3xl font-bold leading-[1.1] sm:text-5xl lg:text-[3.4rem]">
            Sarkari kaam,
            <br />
            <span className="text-highlight">simple &amp; online</span>
          </h1>
          <p className="mt-5 max-w-xl text-base text-primary-foreground/85 sm:text-lg">
            Samagra ID, Ayushman card, PAN, Aadhaar, land records, exam forms, banking
            cash withdrawal, company registration aur counselling — sab kuch ek
            trusted digital seva centre se.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <WhatsAppButton
              href={waLink(
                "Namaste Vishal Web World! Mujhe ye service chahiye:\nService: \nName: \nCity/Village: ",
              )}
              size="lg"
            >
              WhatsApp Now
            </WhatsAppButton>
            <StarButton
              to="/services"
              variant="outline"
              className="[&_.inner-content]:border-primary-foreground/40 [&_.inner-content]:bg-primary-foreground/10 [&_.inner-content]:text-primary-foreground hover:[&_.inner-content]:bg-primary-foreground/15"
            >
              Explore services
              <ArrowRight aria-hidden="true" />
            </StarButton>
          </div>

          <dl className="mt-9 grid grid-cols-3 gap-3 text-center">
            {stats.map(([value, label], index) => (
              <div
                key={label}
                className="animate-pop rounded-lg border border-primary-foreground/15 bg-primary-foreground/10 px-2 py-3 transition-transform duration-300 hover:-translate-y-1"
                style={{ animationDelay: `${index * 90}ms` }}
              >
                <dt className="text-base font-bold sm:text-xl">{value}</dt>
                <dd className="text-[11px] text-primary-foreground/80 sm:text-xs">{label}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="animate-fade-up space-y-4 [animation-delay:120ms]">
          <div className="media-frame tilt-3d overflow-hidden rounded-lg border border-primary-foreground/20 shadow-[var(--shadow-lift)]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/hero-csc-new.jpg"
              alt="Vishal Web World centre par ek customer ko online form fill karne mein help mil rahi hai"
              width={1200}
              height={800}
              loading="eager"
              fetchPriority="high"
              decoding="async"
              className="w-full object-cover transition-transform duration-700 hover:scale-105"
            />

          </div>
          <GovSearch />
        </div>
      </div>
    </section>
  );
}
