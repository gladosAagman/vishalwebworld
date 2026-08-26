import type { ReactNode } from "react";

import "@/components/story/story.css";

type PageHeroProps = {
  eyebrow: string;
  title: ReactNode;
  description: string;
  children?: ReactNode;
};

/**
 * Inner-page hero. Uses the same stage treatment as the homepage story (aurora
 * light sources over a receding grid) rather than a flat gradient band, so the
 * rest of the site does not read as a different product from the front page.
 * Static — the scroll-driven depth is reserved for the homepage.
 */
export function PageHero({ eyebrow, title, description, children }: PageHeroProps) {
  return (
    <section className="stage relative">
      <div aria-hidden="true" className="stage-aurora">
        <span />
        <span />
        <span />
      </div>
      <div aria-hidden="true" className="stage-floor" />

      <div className="stage-content mx-auto max-w-6xl px-4 py-16 sm:py-20">
        <div className="max-w-3xl animate-fade-up">
          <span className="inline-flex items-center gap-2 rounded-full border border-[var(--stage-card-border)] bg-[var(--stage-card)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] backdrop-blur">
            <span className="h-2 w-2 rounded-full bg-highlight" />
            {eyebrow}
          </span>
          <h1 className="mt-5 font-display text-[clamp(2rem,5.5vw,3.4rem)] font-bold leading-[1.05] tracking-[-0.03em]">
            {title}
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            {description}
          </p>
        </div>
        {children && <div className="mt-8 animate-fade-up [animation-delay:120ms]">{children}</div>}
      </div>
    </section>
  );
}
