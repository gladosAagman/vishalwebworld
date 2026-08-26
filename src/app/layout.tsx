import type { Metadata, Viewport } from "next";
import { Inter, Sora } from "next/font/google";
import type { ReactNode } from "react";

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

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${display.variable}`}>
      <body>
        {/* Route content renders here. */}
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}
