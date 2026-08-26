"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

import GlassSurface from "@/components/GlassSurface";
import { Button } from "@/components/ui/button";
import { SiteLogo } from "./SiteLogo";
import { WHATSAPP_DISPLAY, waLink } from "./whatsapp";
import { WhatsAppButton } from "./WhatsAppButton";

const nav = [
  { label: "Home", to: "/" },
  { label: "Services", to: "/services" },
  { label: "Documents", to: "/documents" },

  { label: "CSC 2.0", to: "/csc-2" },
  { label: "Schemes", to: "/schemes" },
  { label: "Search", to: "/search" },
  { label: "Contact", to: "/contact" },
] as const;

/** Matches TanStack's activeOptions: exact match for "/", prefix match otherwise. */
function isActive(pathname: string, to: string) {
  return to === "/" ? pathname === "/" : pathname.startsWith(to);
}

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="sticky top-0 z-40 pt-2 sm:pt-3">
      <div className="mx-auto max-w-6xl px-3">
      <GlassSurface
        width="100%"
        height={scrolled ? 68 : 76}
        borderRadius={26}
        backgroundOpacity={0.82}
        saturation={1.5}
        blur={12}
        displace={0.6}
        distortionScale={-140}
        className={`w-full border border-white/50 transition-all duration-300 ${scrolled ? "shadow-[var(--shadow-card)]" : ""}`}
      >
      <div className="flex w-full items-center gap-3 px-3 sm:px-4">

        <Link
          href="/"
          className="group flex min-w-0 items-center gap-3"
          aria-label="Vishal Web World — home"
          onClick={() => setOpen(false)}
        >
          <SiteLogo
            priority
            className="h-10 w-auto shrink-0 object-contain transition-transform duration-300 group-hover:scale-[1.03] sm:h-12"
            fallbackClassName="text-lg sm:text-xl"
          />
        </Link>

        <nav aria-label="Main" className="ml-auto hidden lg:block">
          <ul className="flex items-center gap-1 text-sm">
            {nav.map((item) => (
              <li key={item.to}>
                <Link
                  href={item.to}
                  className={`block whitespace-nowrap rounded-full px-3 py-2 font-medium leading-none transition-all duration-300 hover:-translate-y-0.5 ${
                    isActive(pathname, item.to)
                      ? "bg-accent text-accent-foreground"
                      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <WhatsAppButton
          href={waLink("Namaste Vishal Web World! Mujhe ek service ke baare mein help chahiye.")}
          size="sm"
          className="ml-auto hidden sm:inline-flex lg:ml-0"
        >
          WhatsApp Now
        </WhatsAppButton>


        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label="Toggle menu"
          className="ml-auto rounded-lg lg:hidden"
        >
          {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </Button>
      </div>
      </GlassSurface>

      {open && (
        <nav
          aria-label="Mobile"
          className="animate-slide-down mt-2 rounded-2xl border border-border bg-card/95 px-4 pb-4 shadow-[var(--shadow-card)] backdrop-blur-md lg:hidden"
        >
          <ul className="grid gap-1 py-2 text-sm">
            {nav.map((item) => (
              <li key={item.to}>
                <Link
                  href={item.to}
                  onClick={() => setOpen(false)}
                  className={`block rounded-lg px-3 py-2 font-medium transition-colors ${
                    isActive(pathname, item.to)
                      ? "bg-accent text-accent-foreground"
                      : "text-foreground hover:bg-accent"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <p className="px-3 text-xs text-muted-foreground">WhatsApp: {WHATSAPP_DISPLAY}</p>
        </nav>
      )}
      </div>
    </header>

  );
}
