"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useRef } from "react";

import { ShinyText } from "@/components/reactbits/ShinyText";
import { services } from "@/data/services";
import { loadGsap } from "@/lib/gsap";
import { StageBackdrop } from "./StageBackdrop";
import "./story.css";
import { useStagePointer } from "./useStagePointer";

/**
 * 12 faces — 30° apart. The deck radius in story.css is sized off this count,
 * so changing it means re-checking that the chord still clears a card.
 */
const FACES = 12;

/** Ordered so neighbouring faces never repeat a category. */
const featured = [
  "Samagra ID",
  "GST Registration",
  "PAN Card",
  "ITR Filing",
  "Ayushman Card",
  "Bank Account Opening",
  "Aadhaar Card",
  "EPF / PF Work",
  "Khasra / Khatauni / Naksha",
  "Banking / Cash Withdrawal",
  "e-Shram Card",
  "All Exam Forms",
]
  .map((name) => services.find((service) => service.name === name))
  .filter((service): service is NonNullable<typeof service> => Boolean(service))
  .slice(0, FACES);

/**
 * Act III — the service catalogue as a carousel standing in 3D space. Scrolling
 * turns the cylinder; the cards are laid out on it by rotating each face and
 * pushing it out along Z, so the perspective does the foreshortening for free.
 */
export function StoryDeck() {
  const shellRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLElement>(null);
  const deckRef = useRef<HTMLDivElement>(null);

  useStagePointer(frameRef);

  useEffect(() => {
    const shell = shellRef.current;
    const deck = deckRef.current;
    if (!shell || !deck) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let cancelled = false;
    let cleanup: (() => void) | undefined;

    void loadGsap().then(({ gsap }) => {
      if (cancelled) return;

      const context = gsap.context(() => {
        gsap.fromTo(
          deck,
          { rotateY: 0 },
          {
            // Just under a full turn, so the deck never snaps back through the
            // card it started on at the end of the section.
            rotateY: -320,
            ease: "none",
            scrollTrigger: {
              trigger: shell,
              start: "top top",
              end: "bottom bottom",
              scrub: 0.5,
            },
          },
        );
      }, shell);

      cleanup = () => context.revert();
    });

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, []);

  return (
    <div ref={shellRef} className="pin-shell" style={{ ["--pin-length" as string]: "300vh" }}>
      <section ref={frameRef} id="services" data-no-split className="pin-frame stage">
        <StageBackdrop />

        <div className="stage-content mx-auto w-full max-w-6xl px-4">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              <ShinyText text="Our services" color="currentColor" shineColor="var(--highlight)" speed={3} delay={1.5} />
            </span>
            <h2 className="mt-2 font-display text-[clamp(1.8rem,4.4vw,3rem)] font-bold leading-[1.05] tracking-[-0.025em]">
              Har kaam ke liye <span className="text-gradient">ek hi jagah</span>
            </h2>
            <p className="mt-3 text-sm text-muted-foreground sm:text-base">
              {services.length}+ services, har ek 1 din mein. Scroll kijiye — ya
              seedha poori list kholiye.
            </p>
          </div>

          <div className="act-viewport mt-12 h-[23rem] sm:h-[25rem]">
            <div ref={deckRef} className="deck mx-auto h-full">
              {featured.map((service, index) => (
                <article
                  key={service.id}
                  className="deck-card act-card p-5 text-left"
                  style={{ ["--face" as string]: `${index * (360 / FACES)}deg` }}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-primary">
                      {service.category}
                    </span>
                    {service.oneDay && (
                      <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-bold text-primary">
                        1 din
                      </span>
                    )}
                  </div>
                  <h3 className="mt-2 font-display text-base font-bold leading-snug">
                    {service.name}
                  </h3>
                  <p className="mt-2 line-clamp-3 text-xs leading-relaxed text-muted-foreground">
                    {service.desc}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-primary">
                    Details
                    <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" />
                  </span>
                </article>
              ))}
            </div>
          </div>

          <div className="mt-10 flex justify-center">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 rounded-full border border-[var(--stage-card-border)] bg-[var(--stage-card)] px-5 py-2.5 text-sm font-semibold backdrop-blur transition-transform duration-300 hover:-translate-y-0.5"
            >
              Saari {services.length} services dekhein
              <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
