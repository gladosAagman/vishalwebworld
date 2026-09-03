"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Hero slideshow. One service per slide, advancing on its own every ~2.8s and
 * wrapping back to the first — the hero keeps selling the full catalogue while
 * the visitor reads the headline, without needing a scroll or a click.
 *
 * Images live at /assets/slide-*.jpg. They are stacked and cross-faded with
 * opacity only (no layout, no transform), so the loop stays cheap enough to run
 * alongside the stage animations, and on lite devices too.
 */
type Slide = {
  image: string;
  alt: string;
  title: string;
  text: string;
  /** Extra services shown as pills — used by the combined ID/scheme slide. */
  tags?: string[];
};

const SLIDES: Slide[] = [
  {
    image: "/assets/slide-gst.jpg",
    alt: "GST registration ke liye dukaandaar ka online form bharte hue",
    title: "GST Registration",
    text: "Naya GSTIN, amendment aur monthly return filing — business ka tax kaam poora.",
  },
  {
    image: "/assets/slide-gumasta.jpg",
    alt: "Gumasta shop licence ke documents counter par",
    title: "Gumasta Licence",
    text: "Shop & Establishment licence naya banwaayein ya purana renew karayein.",
  },
  {
    image: "/assets/slide-railway-flight.jpg",
    alt: "Railway ticket aur flight booking screen",
    title: "Railway & Flight Booking",
    text: "Train reservation, tatkal aur domestic flight ticket — confirm booking ek jagah.",
  },
  {
    image: "/assets/slide-hotel.jpg",
    alt: "Hotel booking confirmation dikhata hua counter",
    title: "Hotel Booking",
    text: "Yatra, darshan ya business trip — budget se luxury tak hotel room book.",
  },
  {
    image: "/assets/slide-itr.jpg",
    alt: "Income tax return filing ke documents aur calculator",
    title: "ITR — Income Tax Return",
    text: "Salary, business ya freelance income ka ITR file aur refund tracking.",
  },
  {
    image: "/assets/slide-insurance.jpg",
    alt: "Car aur bike insurance policy papers",
    title: "Car & Bike Insurance",
    text: "Naya insurance, renewal aur claim guidance — gaadi hamesha covered.",
  },
  {
    image: "/assets/slide-rto.jpg",
    alt: "RTO office ka vehicle registration kaam",
    title: "RTO Work",
    text: "RC transfer, fitness, permit, NOC aur duplicate RC — poora RTO kaam.",
  },
  {
    image: "/assets/slide-driving-licence.jpg",
    alt: "Driving licence apply karte hue applicant",
    title: "Driving Licence",
    text: "Learning licence, permanent DL, renewal aur address change.",
  },
  {
    image: "/assets/slide-id-cards.jpg",
    alt: "Ayushman card, Samagra ID aur ABHA card jaise government documents",
    title: "ID Cards & Yojana",
    text: "Sabhi government ID aur scheme registration ek hi counter par.",
    tags: [
      "Ayushman",
      "e-Shram",
      "Sambal",
      "Samagra ID",
      "ABHA Card",
      "RDVV",
      "RGPV",
    ],
  },
];

const INTERVAL = 2800;

export function HeroSlideshow() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval>>(undefined);

  const go = useCallback((next: number) => {
    setIndex(((next % SLIDES.length) + SLIDES.length) % SLIDES.length);
  }, []);

  useEffect(() => {
    if (paused) return;
    timer.current = setInterval(() => {
      setIndex((current) => (current + 1) % SLIDES.length);
    }, INTERVAL);
    return () => clearInterval(timer.current);
  }, [paused]);

  // Pausing while the tab is hidden stops the deck from racing through every
  // slide in the background and landing on an arbitrary one when the visitor
  // comes back.
  useEffect(() => {
    const onVisibility = () => setPaused(document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  const active = SLIDES[index]!;

  return (
    <div
      className="act-card tilt-3d overflow-hidden p-2"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div className="hero-slides">
        {SLIDES.map((slide, i) => (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            key={slide.image + slide.title}
            src={slide.image}
            alt={slide.alt}
            width={1200}
            height={800}
            loading={i === 0 ? "eager" : "lazy"}
            fetchPriority={i === 0 ? "high" : "auto"}
            decoding="async"
            aria-hidden={i === index ? undefined : true}
            className="hero-slide-img"
            data-active={i === index ? "true" : undefined}
          />
        ))}

        <div className="hero-slide-caption">
          <p className="font-display text-base font-bold sm:text-lg">{active.title}</p>
          <p className="mt-1 text-xs leading-snug text-white/85 sm:text-sm">
            {active.text}
          </p>
          {active.tags ? (
            <ul className="mt-2 flex flex-wrap gap-1.5">
              {active.tags.map((tag) => (
                <li key={tag} className="hero-slide-tag">
                  {tag}
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>

      <div className="mt-2 flex items-center justify-center gap-1.5">
        {SLIDES.map((slide, i) => (
          <button
            key={slide.title}
            type="button"
            onClick={() => go(i)}
            aria-label={`${slide.title} slide dikhayein`}
            aria-current={i === index ? "true" : undefined}
            className="hero-slide-dot"
            data-active={i === index ? "true" : undefined}
          />
        ))}
      </div>
    </div>
  );
}
