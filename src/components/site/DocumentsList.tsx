"use client";

import { CheckCircle2, ExternalLink, FileText } from "lucide-react";
import { useMemo, useState } from "react";

import { services } from "@/data/services";
import { RevealText } from "./RevealText";
import { StarButton } from "./StarButton";
import { waLink } from "./whatsapp";
import { WhatsAppButton } from "./WhatsAppButton";

export function DocumentsList() {
  const [q, setQ] = useState("");

  const list = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return services;
    return services.filter(
      (s) =>
        s.name.toLowerCase().includes(term) ||
        s.category.toLowerCase().includes(term) ||
        s.docs.some((d) => d.toLowerCase().includes(term)),
    );
  }, [q]);

  return (
    <section className="mx-auto max-w-6xl px-4 pb-16">
      <div className="animate-fade-up">
        <label className="sr-only" htmlFor="doc-search">
          Search documents
        </label>
        <input
          id="doc-search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search… e.g. GST, PAN, rent agreement"
          className="w-full rounded-full border border-input bg-card px-5 py-3 text-sm outline-none transition-shadow focus:ring-2 focus:ring-ring sm:max-w-md"
        />
      </div>

      <RevealText className="!px-0 !py-10">Documents pehle se ready ho to kaam ek visit mein ho jata hai. Neeche har service ki exact checklist hai — photo, PAN, Aadhaar se lekar rent agreement aur Gumasta tak.</RevealText>
      <div className="mt-8 grid gap-5 md:grid-cols-2">
        {list.map((service, index) => (
          <article
            key={service.id}
            className="card-soft card-soft-hover animate-fade-up flex flex-col p-6"
            style={{ animationDelay: `${Math.min(index, 10) * 45}ms` }}
          >
            <div className="flex items-start gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand">
                <FileText aria-hidden="true" className="h-4 w-4" />
              </span>
              <div>
                <h2 className="text-base font-bold leading-snug sm:text-lg">
                  {service.name}
                </h2>
                <span className="text-xs font-semibold text-brand">
                  {service.category}
                </span>
              </div>
            </div>

            <ul className="mt-4 flex-1 space-y-2">
              {service.docs.map((doc) => (
                <li key={doc} className="flex items-start gap-2 text-sm">
                  <CheckCircle2
                    aria-hidden="true"
                    className="mt-0.5 h-4 w-4 shrink-0 text-brand"
                  />
                  <span className="text-muted-foreground">{doc}</span>
                </li>
              ))}
            </ul>

            <div className="mt-5 flex flex-wrap gap-2">
              <WhatsAppButton
                href={waLink(
                  `Namaste! "${service.name}" ke liye documents confirm karna hai. Kripya guide kijiye.`,
                )}
                size="sm"
              >
                Poochhein
              </WhatsAppButton>
              {service.link.startsWith("http") && (
                <StarButton href={service.link} variant="outline" size="sm">
                  Official portal
                  <ExternalLink aria-hidden="true" />
                </StarButton>
              )}
            </div>

          </article>
        ))}
      </div>

      {list.length === 0 && (
        <p className="card-soft mt-8 p-8 text-center text-sm text-muted-foreground">
          Kuch nahi mila. WhatsApp par apna kaam likh dijiye, hum list bhej denge.
        </p>
      )}

      <p className="mt-8 text-center text-xs text-muted-foreground">
        Note: Documents ki requirement department ke rules ke hisaab se badal
        sakti hai. Final list ke liye official portal ya humse confirm karein.
      </p>
    </section>
  );
}
