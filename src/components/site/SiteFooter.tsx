import Link from "next/link";

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
    <footer className="relative overflow-hidden bg-primary-dark text-primary-foreground">
      <div className="accent-bar h-1 w-full" />
      <div className="relative z-10 mx-auto grid max-w-6xl gap-8 px-4 pb-6 pt-12 sm:grid-cols-3">
        <div className="animate-fade-up">
          <SiteLogo
            className="h-16 w-auto rounded-xl bg-white px-3 py-2 object-contain"
            fallbackClassName="inline-block rounded-xl bg-white px-3 py-2 text-lg text-slate-900"
          />
          <p className="mt-3 text-sm text-primary-foreground/80">
            Your trusted digital services centre. Sarkari kaam, forms aur banking,
            sab ek jagah.
          </p>
        </div>
        <nav aria-label="Footer" className="animate-fade-up [animation-delay:80ms]">
          <h3 className="text-sm font-bold uppercase tracking-wide">Links</h3>
          <ul className="mt-3 space-y-2 text-sm text-primary-foreground/80">
            {links.map(([label, to]) => (
              <li key={to}>
                <Link href={to} className="transition-colors hover:text-highlight">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="animate-fade-up [animation-delay:160ms]">
          <h3 className="text-sm font-bold uppercase tracking-wide">Contact</h3>
          <p className="mt-3 text-sm text-primary-foreground/80">
            WhatsApp / Call: {WHATSAPP_DISPLAY}
          </p>
          <p className="mt-2 text-sm text-primary-foreground/80">
            Hours: 9:00 AM – 8:00 PM (all days)
          </p>
          <WhatsAppButton
            href={waLink("Namaste Vishal Web World! Mujhe online service help chahiye.")}
            size="sm"
            className="mt-4"
          >
            WhatsApp
          </WhatsAppButton>

        </div>
      </div>

      {/*
        Oversized wordmark, painted with the site's accent gradient. Sized in vw
        so it scales with the viewport — ~8.9vw lands the 16-character string at
        ~91% of the width, so it never clips or forces horizontal scroll. Sits in
        its own band above the copyright line.
      */}
      <span
        aria-hidden="true"
        className="text-gradient pointer-events-none relative z-0 block select-none whitespace-nowrap px-4 text-center font-display text-[clamp(2rem,8.9vw,10.5rem)] font-extrabold leading-[0.95] tracking-tight opacity-40"
      >
        VISHAL WEB WORLD
      </span>

      <div className="relative z-10 px-4 pb-5 pt-2 text-center text-xs text-primary-foreground/70">
        © {new Date().getFullYear()} Vishal Web World. This is a private service
        centre, not a government department. Check official portals for final scheme
        details.
      </div>
    </footer>
  );
}
