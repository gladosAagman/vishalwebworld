"use client";

import { ExternalLink } from "lucide-react";

import { schemeImage } from "@/data/schemeImages";
import { schemeLogo, schemes } from "@/data/services";
import { StarButton } from "./StarButton";
import { waLink } from "./whatsapp";
import { WhatsAppButton } from "./WhatsAppButton";



export function SchemesSection() {
  return (
    <section id="schemes" className="mx-auto max-w-6xl px-4 py-16">
      <div className="max-w-2xl animate-fade-up">
        <span className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">
          Live schemes
        </span>
        <h2 className="mt-2 text-2xl font-bold sm:text-4xl">
          Currently ongoing <span className="text-gradient">govt schemes</span>
        </h2>
        <p className="mt-2 text-sm text-muted-foreground sm:text-base">
          Benefit, eligibility aur apply process — application help ke liye humein
          WhatsApp kijiye.
        </p>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {schemes.map((scheme, index) => (
          <article
            key={scheme.name}
            className="card-soft card-soft-hover animate-fade-up group flex flex-col overflow-hidden p-0"
            style={{ animationDelay: `${Math.min(index, 8) * 50}ms` }}
          >
            <div className="relative aspect-[3/2] w-full overflow-hidden bg-muted">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={schemeImage(scheme.name)}
                alt={`${scheme.name} scheme illustration`}
                loading="lazy"
                decoding="async"
                width={768}
                height={512}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {schemeLogo(scheme.link) ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={schemeLogo(scheme.link)}
                  alt={`${scheme.name} official portal logo`}
                  loading="lazy"
                decoding="async"
                  width={40}
                  height={40}
                  className="absolute left-3 top-3 h-10 w-10 rounded-xl border bg-background/90 object-contain p-1 backdrop-blur transition-transform duration-300 group-hover:scale-105"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              ) : null}
            </div>
            <div className="flex flex-1 flex-col p-5">
            <h3 className="text-base font-bold leading-snug">{scheme.name}</h3>
            <p className="mt-3 rounded-lg bg-accent/60 px-3 py-2 text-sm font-medium text-accent-foreground">
              {scheme.benefit}
            </p>

            <p className="mt-3 flex-1 text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">Eligible: </span>
              {scheme.who}
            </p>
            <div className="mt-5 grid grid-cols-2 gap-2">
              <WhatsAppButton
                href={waLink(`Namaste! Mujhe "${scheme.name}" scheme mein apply karna hai.`)}
                size="sm"
                className="w-full"
              >
                Help
              </WhatsAppButton>
              <StarButton href={scheme.link} variant="outline" size="sm" className="w-full">
                Official
                <ExternalLink aria-hidden="true" />
              </StarButton>
            </div>

            </div>
          </article>

        ))}
      </div>
      <p className="mt-4 text-xs text-muted-foreground">
        Note: Scheme rules aur eligibility time to time change ho sakti hai. Final
        details ke liye official government portal check karein.
      </p>
    </section>
  );
}
