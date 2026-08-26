"use client";

import {
  ArrowRight,
  BadgeCheck,
  Banknote,
  FileText,
  HeartPulse,
  IdCard,
  Landmark,
  ScrollText,
  Sparkles,
} from "lucide-react";
import { useEffect, useRef } from "react";

import { GovSearch } from "@/components/site/GovSearch";
import { StarButton } from "@/components/site/StarButton";
import { waLink } from "@/components/site/whatsapp";
import { WhatsAppButton } from "@/components/site/WhatsAppButton";
import { loadGsap } from "@/lib/gsap";
import "./story.css";
import { useStagePointer } from "./useStagePointer";

/*
 * Chips drifting along the floor behind the copy. They are kept to the band
 * below the content so they never collide with the headline or the media card —
 * the stage reads as atmosphere there, and as clutter anywhere else.
 *
 * `z` is their depth in px and is kept negative:
 * a perspective projection pushes positive-Z elements *outward* from the vanishing
 * point, which walks anything near an edge straight off the screen. Sitting them
 * behind the front plane keeps them inside the frame and lets the copy read as
 * the nearest layer.
 */
const chips = [
  { label: "Ayushman Card", icon: HeartPulse, z: -180, top: "88%", left: "7%" },
  { label: "Samagra ID", icon: IdCard, z: -300, top: "96%", left: "26%" },
  { label: "Cash Withdrawal", icon: Banknote, z: -420, top: "90%", left: "46%" },
  { label: "PAN Card", icon: FileText, z: -240, top: "97%", left: "66%" },
  { label: "Khasra / Khatauni", icon: Landmark, z: -360, top: "86%", left: "80%" },
  { label: "Exam Form", icon: ScrollText, z: -140, top: "94%", left: "3%" },
] as const;

/**
 * Depth of field: the further back a chip sits, the dimmer and softer it gets.
 * Without this the chips all read as equally present and the stage looks like
 * flat stickers rather than a scene with air in it.
 */
function depthCue(z: number) {
  const depth = Math.min(1, Math.abs(z) / 480);
  return {
    ["--chip-opacity" as string]: (0.9 - depth * 0.35).toFixed(2),
    ["--chip-blur" as string]: `${(depth * 2.2).toFixed(1)}px`,
  };
}

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
  const depthRef = useRef<HTMLDivElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const floorRef = useRef<HTMLDivElement>(null);

  useStagePointer(stageRef);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let cancelled = false;
    let cleanup: (() => void) | undefined;

    void loadGsap().then(({ gsap }) => {
      if (cancelled) return;

      const context = gsap.context(() => {
        const scrollTrigger = {
          trigger: stage,
          start: "top top",
          end: "bottom top",
          scrub: 0.6,
        } as const;

        // Camera push: the depth layer travels toward the viewer and the copy
        // recedes, which reads as flying past the chips rather than sliding them.
        gsap.to(depthRef.current, {
          z: 620,
          opacity: 0,
          ease: "none",
          scrollTrigger,
        });

        gsap.to(copyRef.current, {
          y: -70,
          scale: 0.94,
          opacity: 0.15,
          ease: "none",
          scrollTrigger,
        });

        // The floor is a repeating background, so shifting it is a texture
        // offset rather than a transform — no layer to composite.
        gsap.to(floorRef.current, {
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
      <div aria-hidden="true" className="stage-aurora">
        <span />
        <span />
        <span />
      </div>
      <div ref={floorRef} aria-hidden="true" className="stage-floor" />

      <div ref={depthRef} aria-hidden="true" className="stage-depth hidden md:block">
        {chips.map(({ label, icon: Icon, z, top, left }) => (
          <span
            key={label}
            className="chip-3d"
            style={{ top, left, ["--z" as string]: z, ...depthCue(z) }}
          >
            <Icon aria-hidden="true" />
            {label}
          </span>
        ))}
      </div>

      <div className="stage-content mx-auto grid w-full max-w-6xl gap-10 px-4 py-20 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div ref={copyRef}>
          <span className="inline-flex items-center gap-2 rounded-full border border-[var(--stage-card-border)] bg-[var(--stage-card)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] backdrop-blur">
            <Sparkles aria-hidden="true" className="h-3.5 w-3.5 text-highlight" />
            CSC 2.0 · Digital India
          </span>

          <h1 className="mt-6 font-display text-[clamp(2.4rem,7vw,4.25rem)] font-bold leading-[1.03] tracking-[-0.03em]">
            Sarkari kaam,
            <br />
            <span className="text-gradient">simple &amp; online</span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Samagra ID, Ayushman card, PAN, Aadhaar, land records, exam forms,
            banking cash withdrawal aur company registration — sab kuch ek trusted
            digital seva centre se, official portals par.
          </p>

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
          <div className="act-card tilt-3d overflow-hidden p-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/hero-csc-new.jpg"
              alt="Vishal Web World centre par ek customer ko online form fill karne mein help mil rahi hai"
              width={1200}
              height={800}
              loading="eager"
              fetchPriority="high"
              decoding="async"
              className="w-full rounded-[0.9rem] object-cover"
            />
          </div>
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
