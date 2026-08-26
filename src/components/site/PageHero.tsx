"use client";

import { useRef, type ReactNode } from "react";

import { BlurText } from "@/components/reactbits/BlurText";
import { ShinyText } from "@/components/reactbits/ShinyText";
import { StageBackdrop } from "@/components/story/StageBackdrop";
import { StageMotif, type MotifName } from "@/components/story/StageMotif";
import { useStagePointer } from "@/components/story/useStagePointer";
import "@/components/story/story.css";

type PageHeroProps = {
  eyebrow: string;
  /** Plain string: the headline is split into words for the blur-in reveal. */
  title: string;
  description: string;
  /** Page-specific scenery in the right half of the stage. */
  motif?: MotifName;
  /** Small uppercase line in the corner of the stage. */
  caption?: string;
  children?: ReactNode;
};

/**
 * Inner-page hero. Same stage as the homepage — drifting aurora, sheen, grid
 * floor, pointer parallax — with page-specific copy, so the rest of the site
 * does not read as a different product from the front page. Where the homepage
 * scatters service chips across the floor, an inner page gets the motif drawn
 * for it: one scene per page, never both.
 * The scroll-driven camera push stays exclusive to the homepage, where there is
 * a story to fly through.
 */
export function PageHero({ eyebrow, title, description, motif, caption, children }: PageHeroProps) {
  const stageRef = useRef<HTMLElement>(null);
  useStagePointer(stageRef);

  return (
    <section ref={stageRef} data-no-split className="stage relative flex min-h-[44svh] items-center md:min-h-[62svh]">
      <StageBackdrop />
      {motif && <StageMotif name={motif} />}

      <div className="stage-content mx-auto w-full max-w-6xl px-4 py-14 sm:py-20 md:py-24">
        {/* With a motif on the right the copy has to stop before it, or a long
            headline runs over the scenery on medium screens. */}
        <div className={`animate-fade-up ${motif ? "max-w-3xl lg:max-w-[34rem]" : "max-w-3xl"}`}>
          <span className="inline-flex items-center gap-2 rounded-full border border-[var(--stage-card-border)] bg-[var(--stage-card)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] backdrop-blur">
            <span className="h-2 w-2 rounded-full bg-highlight" />
            <ShinyText text={eyebrow} color="currentColor" shineColor="var(--highlight)" speed={3} delay={1.4} />
          </span>
          <BlurText
            as="h1"
            text={title}
            animateBy="words"
            direction="top"
            delay={70}
            className="mt-6 font-display text-[clamp(2.1rem,5.5vw,3.6rem)] font-bold leading-[1.05] tracking-[-0.03em]"
          />
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            {description}
          </p>
        </div>
        {children && <div className="mt-8 animate-fade-up [animation-delay:120ms]">{children}</div>}
      </div>

      {caption && (
        <p aria-hidden="true" className="stage-caption hidden sm:block">
          {caption}
        </p>
      )}
    </section>
  );
}
