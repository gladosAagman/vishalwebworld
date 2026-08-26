import type { Metadata, Viewport } from "next";
import { Inter, Sora } from "next/font/google";
import type { ReactNode } from "react";

import { SiteChrome } from "@/components/site/SiteChrome";

import "./globals.css";

/** Body/UI face: neutral, highly legible at small sizes, strong numerals. */
const sans = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans-loaded",
});

/** Headline face: geometric and confident, pairs cleanly with Inter. */
const display = Sora({
  subsets: ["latin"],
  display: "swap",
  weight: ["500", "600", "700"],
  variable: "--font-display-loaded",
});

const title = "Vishal Web World – Digital Services Centre";
const description =
  "Vishal Web World — CSC 2.0 digital services centre for government forms, documents, banking and scheme applications.";

export const metadata: Metadata = {
  title,
  description,
  authors: [{ name: "Vishal Web World" }],
  icons: { icon: "/favicon.png" },
  openGraph: {
    title,
    description:
      "All government online services in one place — Vishal Web World digital services centre.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

/**
 * Applies the stored (or OS) theme before first paint, so the page never flashes
 * the wrong palette. Must stay inline and synchronous in <head>.
 */
const noFlashTheme = `(function(){try{var s=localStorage.getItem("theme");var d=s?s==="dark":window.matchMedia("(prefers-color-scheme: dark)").matches;var e=document.documentElement;e.classList.toggle("dark",d);e.style.colorScheme=d?"dark":"light";}catch(e){}})();`;

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    // suppressHydrationWarning: the script above mutates <html> before React hydrates.
    <html
      lang="en"
      className={`${sans.variable} ${display.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: noFlashTheme }} />
      </head>
      <body>
        {/* Header, footer, scroll effects and FAB are mounted once here so they
            persist across client-side navigation. */}
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
