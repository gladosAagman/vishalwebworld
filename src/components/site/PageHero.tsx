import type { ReactNode } from "react";

type PageHeroProps = {
  eyebrow: string;
  title: ReactNode;
  description: string;
  children?: ReactNode;
};

export function PageHero({ eyebrow, title, description, children }: PageHeroProps) {
  return (
    <section className="page-hero relative overflow-hidden text-primary-foreground">
      <div className="relative mx-auto max-w-6xl px-4 py-14 sm:py-16">
        <div className="max-w-3xl animate-fade-up">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/25 bg-primary-foreground/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide">
            <span className="h-2 w-2 rounded-full bg-highlight" />
            {eyebrow}
          </span>
          <h1 className="mt-5 text-3xl font-bold leading-tight sm:text-5xl">{title}</h1>
          <p className="mt-4 max-w-2xl text-base text-primary-foreground/85 sm:text-lg">
            {description}
          </p>
        </div>
        {children && <div className="mt-8 animate-fade-up [animation-delay:120ms]">{children}</div>}
      </div>
    </section>
  );
}
