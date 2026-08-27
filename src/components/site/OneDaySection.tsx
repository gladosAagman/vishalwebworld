import { BadgeCheck, Clock3, Phone, Zap } from "lucide-react";

import { business } from "@/data/business";
import { services } from "@/data/services";
import { waLink } from "./whatsapp";
import { WhatsAppButton } from "./WhatsAppButton";

const proofs = [
  { icon: BadgeCheck, label: "Expert review", text: "Form check karke hi submit" },
  { icon: Zap, label: "Fast submission", text: "Usi din official portal par" },
  { icon: Clock3, label: "Same-day receipt", text: "Acknowledgement haath mein" },
];

/** Marquee ka track do baar chalta hai taaki loop seamless rahe. */
const ticker = services.map((service) => service.name);

/**
 * The poster's loudest promise — "1-DAY SERVICE!" — gets its own gradient band
 * on the home page. Everything around it is white cards, so this one panel is
 * dark, lit and moving: it should read as a banner, not another section.
 */
export function OneDaySection() {
  return (
    <section id="one-day" className="mx-auto max-w-6xl px-4 py-14 sm:py-20">
      <div className="hero-surface animate-fade-up relative isolate overflow-hidden rounded-[28px] text-white shadow-[var(--shadow-lift)]">
        {/* Aurora: two soft brand lights so the flat gradient gets depth. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-[var(--highlight)] opacity-40 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-32 right-0 h-80 w-80 rounded-full bg-[var(--brand)] opacity-35 blur-3xl"
        />

        <div className="relative grid gap-10 p-6 sm:p-10 lg:grid-cols-5 lg:items-center lg:gap-8">
          <div className="lg:col-span-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] backdrop-blur">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white/70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
              </span>
              Quick service
            </span>

            <h2 className="mt-4 font-display text-3xl font-extrabold leading-[1.08] tracking-[-0.02em] sm:text-5xl">
              Har kaam sirf
              <span className="relative ml-3 inline-block">
                <span className="relative z-10">1 din</span>
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 -bottom-1 z-0 h-1.5 rounded-full bg-white/60 sm:h-2"
                />
              </span>{" "}
              mein
            </h2>

            <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/80 sm:text-base">
              PAN, GST, ITR, EWS, EPF, bank account, insurance, admission form ya
              travel booking — <strong className="font-semibold text-white">saari {services.length} services</strong>{" "}
              hum usi din complete karke dete hain. Urgent requirement? We have
              you covered.
            </p>

            <ul className="mt-7 grid gap-3 sm:grid-cols-3">
              {proofs.map((proof) => (
                <li
                  key={proof.label}
                  className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur transition-colors duration-300 hover:bg-white/15"
                >
                  <proof.icon aria-hidden="true" className="h-4 w-4 text-white" />
                  <p className="mt-2.5 text-sm font-bold leading-snug">{proof.label}</p>
                  <p className="mt-1 text-xs leading-relaxed text-white/70">{proof.text}</p>
                </li>
              ))}
            </ul>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <WhatsAppButton
                href={waLink("Namaste! Mujhe 1-day service chahiye. Kaam urgent hai — kripya batayein kaunse documents laane hain.")}
                size="lg"
              >
                Aaj hi karwaayein
              </WhatsAppButton>
              <a
                href={business.phoneHref}
                className="inline-flex h-12 items-center gap-2.5 rounded-full border border-white/30 bg-white/10 px-5 text-base font-semibold backdrop-blur transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/20"
              >
                <Phone aria-hidden="true" className="h-4 w-4" />
                {business.phoneDisplay}
              </a>
            </div>
          </div>

          {/* The claim as an object: a badge you could stamp on a poster. */}
          <div className="lg:col-span-2">
            <div className="animate-float mx-auto flex max-w-xs flex-col items-center rounded-[26px] border border-white/25 bg-white/10 px-8 py-9 text-center backdrop-blur-md">
              <Zap aria-hidden="true" className="h-6 w-6" />
              <p className="mt-3 font-display text-[5.5rem] font-extrabold leading-[0.8] tracking-[-0.05em] sm:text-[7rem]">
                1
              </p>
              <p className="mt-2 text-xl font-extrabold uppercase tracking-[0.3em]">Day</p>
              <p className="mt-1 text-[11px] font-bold uppercase tracking-[0.3em] text-white/70">
                Service
              </p>
              <p className="mt-5 border-t border-white/20 pt-4 text-xs leading-relaxed text-white/75">
                Documents subah — kaam shaam tak. {business.hours.split(",")[1]?.trim()}.
              </p>
            </div>
          </div>
        </div>

        {/* Every service scrolling past — proof that "sab kuch" is literal. */}
        <div className="marquee-mask relative overflow-hidden border-t border-white/15 bg-black/10 py-3">
          <div className="marquee-track [--marquee-duration:60s]">
            {[0, 1].map((copy) => (
              <ul key={copy} aria-hidden={copy === 1} className="flex shrink-0 items-center gap-5 pr-5">
                {ticker.map((name) => (
                  <li key={name} className="flex items-center gap-2 whitespace-nowrap text-xs font-semibold text-white/80">
                    <Zap aria-hidden="true" className="h-3 w-3 text-white/50" />
                    {name}
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
