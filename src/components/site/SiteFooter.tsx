import Link from "next/link";

import { addressLines, business } from "@/data/business";
import { SiteLogo } from "./SiteLogo";
import { WHATSAPP_DISPLAY, waLink } from "./whatsapp";
import { WhatsAppButton } from "./WhatsAppButton";


const links = [
  ["Services", "/services"],
  ["Documents", "/documents"],

  ["CSC 2.0", "/csc-2"],
  ["Schemes", "/schemes"],
  ["Search", "/search"],
  ["Contact", "/contact"],
] as const;

export function SiteFooter() {
  return (
    <footer className="footer-surface relative overflow-hidden">
      <div className="accent-bar h-1 w-full" />

      <div className="relative z-10 mx-auto grid max-w-6xl gap-8 px-4 pb-8 pt-14 sm:grid-cols-3">
        <div className="animate-fade-up">
          <SiteLogo
            className="h-16 w-auto rounded-xl bg-white px-3 py-2 object-contain"
            fallbackClassName="inline-block rounded-xl bg-white px-3 py-2 text-lg text-slate-900"
          />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-[color-mix(in_oklab,var(--footer-ink)_72%,transparent)]">
            {business.tagline}. Sarkari kaam, forms, banking aur travel booking —
            sab ek jagah — har service 1 din mein. {business.promises.join(" · ")}.
          </p>
        </div>

        <nav aria-label="Footer" className="animate-fade-up [animation-delay:80ms]">
          <h3 className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--footer-ink)]">
            Links
          </h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {links.map(([label, to]) => (
              <li key={to}>
                <Link
                  href={to}
                  className="inline-block text-[color-mix(in_oklab,var(--footer-ink)_72%,transparent)] transition-all duration-300 hover:translate-x-0.5 hover:text-[var(--footer-ink)]"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="animate-fade-up [animation-delay:160ms]">
          <h3 className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--footer-ink)]">
            Contact
          </h3>
          <p className="mt-4 text-sm text-[color-mix(in_oklab,var(--footer-ink)_72%,transparent)]">
            WhatsApp / Call: {WHATSAPP_DISPLAY}
          </p>
          <p className="mt-2 text-sm text-[color-mix(in_oklab,var(--footer-ink)_72%,transparent)]">
            Email: {business.email}
          </p>
          <p className="mt-2 text-sm text-[color-mix(in_oklab,var(--footer-ink)_72%,transparent)]">
            Hours: 9:00 AM – 8:00 PM (all days)
          </p>
          <address className="mt-2 text-sm not-italic leading-relaxed text-[color-mix(in_oklab,var(--footer-ink)_72%,transparent)]">
            {addressLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </address>
          <WhatsAppButton
            href={waLink("Namaste Vishal Web World! Mujhe online service help chahiye.")}
            size="sm"
            className="mt-5"
          >
            WhatsApp
          </WhatsAppButton>
        </div>
      </div>

      {/*
        Wordmark as a horizon, not a headline: sized in vw so it scales with the
        viewport, painted with the logo's blue-to-cyan ramp, and masked so its
        lower half dissolves into the glow rising from the bottom edge. It is
        decoration — the real wordmark is the logo above.
      */}
      <span
        aria-hidden="true"
        className="footer-wordmark text-gradient pointer-events-none relative z-0 block select-none whitespace-nowrap px-4 text-center font-display font-extrabold leading-[0.9] tracking-[-0.02em]"
      >
        VISHAL WEB WORLD
      </span>

      <div className="relative z-10 mx-auto max-w-4xl px-4 pb-6 pt-3 text-center text-xs leading-relaxed text-[color-mix(in_oklab,var(--footer-ink)_58%,transparent)]">
        © {new Date().getFullYear()} Vishal Web World. This is a private service
        centre, not a government department. Check official portals for final scheme
        details.
      </div>
    </footer>
  );
}
