"use client";

import { ChevronDown, ExternalLink, FileCheck2, Info, Search, Sparkles, Zap } from "lucide-react";
import { useMemo, useState } from "react";

import { ShinyText } from "@/components/reactbits/ShinyText";
import { Button } from "@/components/ui/button";
import { categoryImage } from "@/data/categoryImages";
import { categories, services } from "@/data/services";
import { StarButton } from "./StarButton";
import { waLink } from "./whatsapp";
import { WhatsAppButton } from "./WhatsAppButton";


type ServicesSectionProps = {
  compact?: boolean;
};

export function ServicesSection({ compact = false }: ServicesSectionProps) {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("All");

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    return services.filter(
      (service) =>
        (cat === "All" || service.category === cat) &&
        (!term ||
          service.name.toLowerCase().includes(term) ||
          service.desc.toLowerCase().includes(term) ||
          service.category.toLowerCase().includes(term) ||
          service.highlights?.some((h) => h.toLowerCase().includes(term))),
    );
  }, [q, cat]);

  const visibleServices = compact ? services.slice(0, 9) : filtered;

  return (
    <section id="services" className="mx-auto max-w-6xl px-4 py-16">
      <div className="max-w-2xl animate-fade-up">
        <span className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
          <ShinyText text="Our services" color="currentColor" shineColor="var(--highlight)" speed={3} delay={1.5} />
        </span>
        <h2 className="mt-2 text-2xl font-bold sm:text-4xl">
          Har kaam ke liye <span className="text-gradient">ek hi jagah</span>
        </h2>
        <p className="mt-2 text-sm text-muted-foreground sm:text-base">
          Kisi bhi service par tap karke official portal kholiye, ya WhatsApp par
          bataiye — hum poora form aapke liye bhar denge.
        </p>
        <p className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-brand/10 px-3 py-1.5 text-xs font-bold text-brand sm:text-sm">
          <Zap aria-hidden="true" className="h-4 w-4" />
          Neeche ki saari services 1 din mein complete
        </p>
      </div>

      {!compact && (
        <div className="mt-8 flex animate-fade-up flex-col gap-3 sm:flex-row sm:items-center [animation-delay:80ms]">
          <label className="sr-only" htmlFor="service-filter">
            Search services
          </label>
          <div className="relative w-full sm:max-w-sm">
            <Search aria-hidden="true" className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              id="service-filter"
              value={q}
              onChange={(event) => setQ(event.target.value)}
              placeholder="Search services… e.g. PAN card"
              className="w-full rounded-full border border-input bg-card py-2.5 pl-10 pr-4 text-sm outline-none transition-shadow focus:ring-2 focus:ring-ring"
            />
          </div>
          <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 sm:flex-wrap sm:overflow-visible">
            {categories.map((category) => (
              <Button
                key={category}
                type="button"
                variant={cat === category ? "default" : "secondary"}
                size="sm"
                onClick={() => setCat(category)}
                aria-pressed={cat === category}
                className="whitespace-nowrap rounded-full transition-all duration-300 hover:-translate-y-0.5"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      )}

      <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {visibleServices.map((service, index) => (
          <li
            key={service.id}
            className="card-soft card-soft-hover animate-fade-up group flex flex-col overflow-hidden p-0"
            style={{ animationDelay: `${Math.min(index, 10) * 45}ms` }}
          >
            <div className="relative aspect-[3/2] w-full overflow-hidden bg-muted">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={categoryImage(service.category)}
                alt={`${service.category} service illustration`}
                loading="lazy"
                decoding="async"
                width={768}
                height={512}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <span className="absolute left-3 top-3 rounded-full bg-background/85 px-2.5 py-1 text-[11px] font-semibold text-brand backdrop-blur">
                {service.category}
              </span>
              {service.oneDay && (
                <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-brand px-2.5 py-1 text-[11px] font-bold text-white shadow-sm">
                  <Zap aria-hidden="true" className="h-3 w-3" />
                  1 Day
                </span>
              )}
            </div>
            <div className="flex flex-1 flex-col p-5">
            <div className="flex items-start gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent text-sm font-bold text-accent-foreground transition-transform duration-300 group-hover:scale-105">
                {service.id}
              </span>
              <div>
                <h3 className="text-base font-bold leading-snug">{service.name}</h3>
                <span className="text-xs font-semibold text-brand">{service.category}</span>
              </div>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">{service.desc}</p>

            {service.highlights && service.highlights.length > 0 && (
              <details className="group/hl mt-3">
                <summary className="flex cursor-pointer list-none items-center gap-1.5 text-xs font-semibold text-primary transition-colors hover:text-primary/80">
                  <Sparkles aria-hidden="true" className="h-3.5 w-3.5" />
                  Kya-kya milta hai ({service.highlights.length})
                  <ChevronDown
                    aria-hidden="true"
                    className="h-3.5 w-3.5 transition-transform duration-300 group-open/hl:rotate-180"
                  />
                </summary>
                <ul className="mt-3 space-y-1.5 border-l-2 border-primary/30 pl-3 animate-fade-up">
                  {service.highlights.map((point) => (
                    <li key={point} className="text-xs leading-relaxed text-muted-foreground">
                      • {point}
                    </li>
                  ))}
                </ul>
              </details>
            )}

            <details className="group mt-3 flex-1">
              <summary className="flex cursor-pointer list-none items-center gap-1.5 text-xs font-semibold text-brand transition-colors hover:text-brand/80">
                <FileCheck2 aria-hidden="true" className="h-3.5 w-3.5" />
                Zaroori documents ({service.docs.length})
                <ChevronDown
                  aria-hidden="true"
                  className="h-3.5 w-3.5 transition-transform duration-300 group-open:rotate-180"
                />
              </summary>
              <ul className="mt-3 space-y-1.5 border-l-2 border-accent/40 pl-3 animate-fade-up">
                {service.docs.map((doc) => (
                  <li key={doc} className="text-xs leading-relaxed text-muted-foreground">
                    • {doc}
                  </li>
                ))}
              </ul>
            </details>

            {service.note && (
              <p className="mt-4 flex items-start gap-2 rounded-lg bg-accent/40 p-3 text-xs leading-relaxed text-muted-foreground">
                <Info aria-hidden="true" className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand" />
                <span>{service.note}</span>
              </p>
            )}

            <div className="mt-5 grid grid-cols-2 gap-2">
              <WhatsAppButton
                href={waLink(`Namaste! Mujhe "${service.name}" service chahiye. Kripya details bhejiye.`)}
                size="sm"
                className="w-full"
              >
                WhatsApp
              </WhatsAppButton>
              {service.link.startsWith("http") && (
                <StarButton href={service.link} variant="outline" size="sm" className="w-full">
                  Portal
                  <ExternalLink aria-hidden="true" />
                </StarButton>
              )}
            </div>
            </div>
          </li>
        ))}
      </ul>
      {compact && (
        <div className="mt-8 text-center">
          <StarButton to="/services" variant="primary">
            View all services
            <ExternalLink aria-hidden="true" />
          </StarButton>
        </div>
      )}

      {!compact && filtered.length === 0 && (
        <p className="card-soft mt-8 p-8 text-center text-sm text-muted-foreground">
          Koi service nahi mili. WhatsApp par apna kaam seedha likh dijiye.
        </p>
      )}
    </section>
  );
}
