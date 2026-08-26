"use client";

import { MessageSquareText, FileCheck2, PartyPopper } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { ShinyText } from "@/components/reactbits/ShinyText";
import { loadGsap } from "@/lib/gsap";
import { StageBackdrop } from "./StageBackdrop";
import "./story.css";
import { useStagePointer } from "./useStagePointer";

const steps = [
  {
    icon: MessageSquareText,
    kicker: "Step 01",
    title: "Aap WhatsApp par bataiye",
    body: "Kaunsa kaam hai — Samagra, Ayushman, PAN ya banking. Naam, gaon aur documents ki photo bhej dijiye. Bas itna.",
  },
  {
    icon: FileCheck2,
    kicker: "Step 02",
    title: "Hum official portal par form bharte hain",
    body: "Sahi category, sahi documents, sahi fees. Har application government ke apne portal par jaati hai — aur aapko status update milta rehta hai.",
  },
  {
    icon: PartyPopper,
    kicker: "Step 03",
    title: "Card, receipt ya cash — ready",
    body: "Print, PDF ya cash withdrawal. Koi line nahi, koi chakkar nahi, koi 'kal aana' nahi.",
  },
] as const;

/**
 * Act II — the three-step journey, played as a flight down the Z axis: each
 * card arrives from the distance, holds at the front plane, then passes the
 * camera. Sticky pinning holds the frame; GSAP only scrubs the transforms.
 */
export function StoryJourney() {
  const shellRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useStagePointer(frameRef);

  useEffect(() => {
    const shell = shellRef.current;
    const track = trackRef.current;
    if (!shell || !track) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let cancelled = false;
    let cleanup: (() => void) | undefined;

    void loadGsap().then(({ gsap }) => {
      if (cancelled) return;

      const context = gsap.context(() => {
        const cards = gsap.utils.toArray<HTMLElement>(".journey-card", track);

        const timeline = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: shell,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.5,
            // Drives the rail; ScrollTrigger reports progress even while the
            // sticky frame is what is actually holding the section in place.
            onUpdate: (self) => {
              const index = Math.min(
                cards.length - 1,
                Math.floor(self.progress * cards.length),
              );
              setActive(index);
            },
          },
        });

        cards.forEach((card, index) => {
          gsap.set(card, { z: -1500, opacity: 0, rotateX: 12 });
          // Each card owns one slot of the timeline and overlaps the next
          // slightly, so there is never an empty frame between two cards.
          timeline.to(
            card,
            { z: 0, opacity: 1, rotateX: 0, duration: 0.6 },
            index * 0.85,
          );
          // The last card stays: letting it fly past the camera too would leave
          // the pinned frame empty for the rest of the section's scroll.
          if (index < cards.length - 1) {
            timeline.to(
              card,
              { z: 700, opacity: 0, rotateX: -10, duration: 0.55 },
              index * 0.85 + 0.7,
            );
          }
        });
      }, shell);

      cleanup = () => context.revert();
    });

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, []);

  return (
    <div ref={shellRef} className="pin-shell" style={{ ["--pin-length" as string]: "340vh" }}>
      <section ref={frameRef} data-no-split className="pin-frame stage">
        <StageBackdrop floor={false} />

        <div className="stage-content mx-auto w-full max-w-6xl px-4">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              <ShinyText text="Kaise kaam hota hai" color="currentColor" shineColor="var(--highlight)" speed={3} delay={1.5} />
            </span>
            <h2 className="mt-2 font-display text-[clamp(1.8rem,4.4vw,3rem)] font-bold leading-[1.05] tracking-[-0.025em]">
              Teen step, <span className="text-gradient">aur kaam khatam</span>
            </h2>
          </div>

          <div
            ref={trackRef}
            className="journey-track act-viewport relative mt-10 min-h-[19rem] sm:min-h-[17rem]"
          >
            {steps.map(({ icon: Icon, kicker, title, body }) => (
              <article key={kicker} className="journey-card act-card p-7 sm:p-9">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary/12 text-primary">
                  <Icon aria-hidden="true" className="h-5 w-5" />
                </span>
                <p className="mt-5 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                  {kicker}
                </p>
                <h3 className="mt-2 font-display text-xl font-bold sm:text-2xl">{title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
                  {body}
                </p>
              </article>
            ))}
          </div>

          <ol className="rail rail-horizontal mt-10">
            {steps.map((step, index) => (
              <li key={step.kicker} className="rail-step" data-active={index === active}>
                <span className="rail-dot" />
                <span className="rail-label">{step.kicker}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </div>
  );
}
