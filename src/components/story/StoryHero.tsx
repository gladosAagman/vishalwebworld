"use client";

import { ArrowRight, BadgeCheck, Sparkles } from "lucide-react";
import { useEffect, useRef } from "react";

import { FoldText } from "@/components/reactbits/FoldText";
import { ShinyText } from "@/components/reactbits/ShinyText";
import { GovSearch } from "@/components/site/GovSearch";
import { StarButton } from "@/components/site/StarButton";
import { waLink } from "@/components/site/whatsapp";
import { WhatsAppButton } from "@/components/site/WhatsAppButton";
import { loadGsap } from "@/lib/gsap";
import { HeroSlideshow } from "./HeroSlideshow";
import { StageBackdrop } from "./StageBackdrop";
import { chipsFrom, StageChips } from "./StageChips";
import "./story.css";
import { useStagePointer } from "./useStagePointer";
import { isLiteMode } from "@/lib/perf";

/** Six services, dropped into the shared floor slots. */
const chips = chipsFrom([
  { label: "Ayushman Card", icon: "HeartPulse" },
  { label: "Samagra ID", icon: "IdCard" },
  { label: "Cash Withdrawal", icon: "Banknote" },
  { label: "PAN Card", icon: "FileText" },
  { label: "Khasra / Khatauni", icon: "Landmark" },
  { label: "Exam Form", icon: "ScrollText" },
]);

/** The newer, high-demand services — named up front, above the fold. */
const highlights = [
  "GST",
  "Gumasta",
  "ITR Filing",
  "RTO Work",
  "Driving Licence",
  "Car & Bike Insurance",
  "Railway & Flight",
  "Hotel Booking",
];

const stats = [
  ["24+", "Services"],
  ["10,000+", "Happy customers"],
  ["7 days", "Open every week"],
] as const;

/**
 * Act I. A perspective stage: aurora light sources at the back, a receding grid
 * floor, service chips scattered across the Z axis, and the copy on the front
 * plane. Scrolling flies the camera forward through the chips.
 */
export function StoryHero() {
  const stageRef = useRef<HTMLElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);

  useStagePointer(stageRef);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    if (isLiteMode()) return;

    let cancelled = false;
    let cleanup: (() => void) | undefined;

    void loadGsap().then(({ gsap }) => {
      if (cancelled) return;

      const context = gsap.context(() => {
        // Cinematic entry. The chips arrive from far behind the front plane and
        // the copy settles out of a slight push-in, so the first thing the page
        // does is establish that this is a stage with depth — before any
        // scrolling has happened. It runs once, off the scroll timeline, so a
        // visitor who never scrolls still sees the scene assemble.
        const intro = gsap.timeline({ defaults: { ease: "power3.out" } });

        intro.from(stage.querySelectorAll(".chip-3d"), {
          z: -900,
          opacity: 0,
          duration: 1.1,
          stagger: { each: 0.08, from: "random" },
        });

        intro.from(
          copyRef.current,
          { y: 26, scale: 1.03, opacity: 0, duration: 0.9 },
          0,
        );

        intro.from(stage.querySelector(".stage-torch"), { opacity: 0, duration: 1.4 }, 0.2);

        const scrollTrigger = {
          trigger: stage,
          start: "top top",
          end: "bottom top",
          scrub: 0.6,
        } as const;

        // Camera push: the depth layer travels toward the viewer and the copy
        // recedes, which reads as flying past the chips rather than sliding them.
        gsap.to(stage.querySelector(".stage-depth"), {
          z: 620,
          opacity: 0,
          ease: "none",
          immediateRender: false,
          scrollTrigger,
        });

        // immediateRender: false matters here. The intro above starts the copy
        // from opacity 0; a scrubbed tween created straight after would capture
        // that hidden state as its own start value and the copy would never
        // come back. Deferring the capture until the tween first renders means
        // it starts from wherever the intro left the copy.
        gsap.to(copyRef.current, {
          y: -70,
          scale: 0.94,
          opacity: 0.15,
          ease: "none",
          immediateRender: false,
          scrollTrigger,
        });

        // The floor is a repeating background, so shifting it is a texture
        // offset rather than a transform — no layer to composite.
        gsap.to(stage.querySelector(".stage-floor"), {
          "--floor-shift": 6,
          ease: "none",
          scrollTrigger,
        });
      }, stage);

      cleanup = () => context.revert();
    });

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, []);

  return (
    <section
      ref={stageRef}
      id="top"
      data-no-split
      className="stage flex min-h-[92svh] items-center"
    >
      <StageBackdrop showcase />
      <StageChips chips={chips} />

      <div className="stage-content mx-auto grid w-full max-w-6xl gap-10 px-4 py-20 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div ref={copyRef}>
          <span className="inline-flex items-center gap-2 rounded-full border border-[var(--stage-card-border)] bg-[var(--stage-card)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] backdrop-blur">
            <Sparkles aria-hidden="true" className="h-3.5 w-3.5 text-highlight" />
            <ShinyText
              text="CSC 2.0 · Digital India"
              color="currentColor"
              shineColor="var(--highlight)"
              speed={3}
              delay={1.2}
            />
          </span>

          <h1 className="mt-6 font-display text-[clamp(2.4rem,7vw,4.25rem)] font-bold leading-[1.03] tracking-[-0.03em]">
            <FoldText text="Sarkari kaam," splitBy="char" hinge="top" stagger={0.035} />
            <br />
            <span className="text-gradient">simple &amp; online</span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Samagra ID, Ayushman card, PAN, Aadhaar, land records, exam forms,
            banking cash withdrawal aur company registration — sab kuch ek trusted
            digital seva centre se, official portals par.
          </p>

          <ul className="mt-5 flex flex-wrap gap-2">
            {highlights.map((item) => (
              <li
                key={item}
                className="rounded-full border border-[var(--stage-card-border)] bg-[var(--stage-card)] px-2.5 py-1 text-[11px] font-semibold text-muted-foreground backdrop-blur sm:text-xs"
              >
                {item}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <WhatsAppButton
              href={waLink(
                "Namaste Vishal Web World! Mujhe ye service chahiye:\nService: \nName: \nCity/Village: ",
              )}
              size="lg"
            >
              WhatsApp Now
            </WhatsAppButton>
            <StarButton to="/services" variant="outline">
              Explore services
              <ArrowRight aria-hidden="true" />
            </StarButton>
          </div>

          <dl className="mt-10 grid max-w-lg grid-cols-3 gap-3">
            {stats.map(([value, label]) => (
              <div key={label} className="act-card px-3 py-3 text-center">
                <dt className="font-display text-lg font-bold sm:text-2xl">{value}</dt>
                <dd className="mt-0.5 text-[11px] text-muted-foreground sm:text-xs">
                  {label}
                </dd>
              </div>
            ))}
          </dl>

          <p className="mt-6 inline-flex items-center gap-2 text-xs text-muted-foreground">
            <BadgeCheck aria-hidden="true" className="h-4 w-4 text-brand" />
            Official government portals par hi application — koi shortcut nahi.
          </p>
        </div>

        <div className="space-y-4">
          <HeroSlideshow />
          <GovSearch />
        </div>
      </div>

      <div
        aria-hidden="true"
        className="stage-content absolute inset-x-0 bottom-6 hidden justify-center md:flex"
      >
        <span className="scroll-cue" />
      </div>
    </section>
  );
}
