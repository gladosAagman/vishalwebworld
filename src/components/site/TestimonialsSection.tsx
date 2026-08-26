import { ExternalLink, MessageSquareQuote, PenLine, Quote, Star } from "lucide-react";

import { ShinyText } from "@/components/reactbits/ShinyText";
import {
  GOOGLE_ADDRESS,
  GOOGLE_RATING,
  GOOGLE_REVIEWS_LINK,
  testimonials,
  type Testimonial,
} from "@/data/testimonials";
import { StarButton } from "./StarButton";

function Stars({ rating }: { rating: number }) {
  return (
    <span className="inline-flex items-center gap-0.5" aria-label={`${rating} out of 5`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={n}
          aria-hidden="true"
          className={
            n <= Math.round(rating)
              ? "h-4 w-4 fill-green-500 text-green-500"
              : "h-4 w-4 text-muted-foreground/40"
          }
        />
      ))}
    </span>
  );
}

function ReviewCard({ t }: { t: Testimonial }) {
  return (
    <article className="card-soft w-[300px] shrink-0 p-5 transition-transform duration-300 hover:-translate-y-1 sm:w-[340px]">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand/10 text-sm font-bold text-brand">
            {t.name.slice(0, 1).toUpperCase()}
          </span>
          <div>
            <p className="text-sm font-semibold">{t.name}</p>
            {t.when ? <p className="text-xs text-muted-foreground">{t.when}</p> : null}
          </div>
        </div>
        <Quote aria-hidden="true" className="h-4 w-4 text-primary/40" />
      </div>
      <Stars rating={t.rating} />
      <p className="mt-2 text-sm text-muted-foreground">{t.text}</p>
      {t.service ? (
        <span className="mt-4 inline-flex rounded-full bg-primary/10 px-3 py-1 text-[11px] font-semibold text-primary">
          {t.service}
        </span>
      ) : null}
    </article>
  );
}

function Row({
  items,
  reverse,
  duration,
}: {
  items: Testimonial[];
  reverse?: boolean;
  duration: string;
}) {
  const loop = [...items, ...items];
  return (
    <div className="marquee-mask group overflow-hidden py-2">
      <div
        className={reverse ? "marquee-track-reverse" : "marquee-track"}
        style={{ ["--marquee-duration" as string]: duration }}
      >
        {loop.map((t, i) => (
          <ReviewCard key={`${t.name}-${i}`} t={t} />
        ))}
      </div>
    </div>
  );
}

export function TestimonialsSection() {
  const half = Math.ceil(testimonials.length / 2);
  const rowOne = testimonials.slice(0, half);
  const rowTwo = testimonials.slice(half);

  return (
    <section id="reviews" className="relative overflow-hidden py-16">
      <div className="pointer-events-none absolute -right-24 top-16 h-64 w-64 rounded-full bg-accent/10 blur-3xl animate-float" />
      <div className="mx-auto max-w-6xl px-4">
        <div className="animate-fade-up text-center">
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            <MessageSquareQuote aria-hidden="true" className="h-3.5 w-3.5" />
            <ShinyText text="Testimonials" color="currentColor" shineColor="var(--highlight)" speed={3} delay={1.5} />
          </span>
          <h2 className="mt-2 text-2xl font-bold sm:text-4xl">
            Customers ka <span className="text-gradient">bharosa</span>
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-muted-foreground sm:text-base">
            Google par humein {GOOGLE_RATING} rating mili hai — {GOOGLE_ADDRESS}.
          </p>
        </div>

        <div className="mt-8 flex flex-col items-center gap-3 animate-fade-up [animation-delay:100ms] sm:flex-row sm:justify-center">
          <div className="glass-panel flex items-center gap-3 rounded-full px-5 py-3">
            <span className="text-2xl font-bold">{GOOGLE_RATING.toFixed(1)}</span>
            <Stars rating={GOOGLE_RATING} />
            <span className="text-xs text-muted-foreground">Google Reviews</span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <StarButton href={GOOGLE_REVIEWS_LINK}>
              <ExternalLink aria-hidden="true" className="h-4 w-4" />
              Google par reviews dekhein
            </StarButton>
            <StarButton href={GOOGLE_REVIEWS_LINK} variant="outline">
              <PenLine aria-hidden="true" className="h-4 w-4" />
              Review likhein
            </StarButton>
          </div>
        </div>
      </div>

      <div className="mt-10 animate-fade-up [animation-delay:160ms] space-y-2">
        <Row items={rowOne} duration="48s" />
        <Row items={rowTwo} duration="58s" reverse />
      </div>
    </section>
  );
}
