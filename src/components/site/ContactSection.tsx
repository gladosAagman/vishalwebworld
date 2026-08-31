"use client";

import { Mail, MapPin, Phone } from "lucide-react";
import { useState } from "react";

import { ShinyText } from "@/components/reactbits/ShinyText";
import { addressLines, business } from "@/data/business";
import { services } from "@/data/services";
import { WHATSAPP_DISPLAY, waLink } from "./whatsapp";
import { WhatsAppButton } from "./WhatsAppButton";

export function ContactSection() {
  const defaultService = services[0]?.name ?? "Online Service";
  const [form, setForm] = useState({
    name: "",
    mobile: "",
    place: "",
    service: defaultService,
    note: "",
  });

  /**
   * Turns the filled form into a ready-to-send WhatsApp message.
   *
   * Empty optional fields are left out rather than sent as "-", so the message
   * that lands in the chat reads like something a person typed.
   *
   * Opening it: a new tab is nicer on a desktop, but mobile browsers block
   * `window.open` often enough that the button would silently do nothing there
   * — so a blocked popup falls back to navigating this tab, which always
   * reaches the app.
   */
  function submit(event: React.FormEvent) {
    event.preventDefault();

    const lines = [
      "Namaste Vishal Web World!",
      "Mujhe ye service chahiye.",
      `Service: ${form.service}`,
      `Name: ${form.name}`,
      `Mobile: ${form.mobile}`,
      form.place.trim() && `City/Village: ${form.place.trim()}`,
      form.note.trim() && `Details: ${form.note.trim()}`,
    ].filter(Boolean);

    const url = waLink(lines.join("\n"));
    const opened = window.open(url, "_blank", "noopener,noreferrer");
    if (!opened) window.location.href = url;
  }

  const field =
    "mt-1 w-full rounded-lg border border-input bg-background px-3.5 py-2.5 text-sm outline-none transition-shadow focus:ring-2 focus:ring-ring";

  return (
    <section id="contact" className="bg-secondary py-16">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 lg:grid-cols-2">
        <div className="animate-fade-up">
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            <ShinyText text="Get in touch" color="currentColor" shineColor="var(--highlight)" speed={3} delay={1.5} />
          </span>
          <h2 className="mt-2 text-2xl font-bold sm:text-4xl">
            Request a service in 30 seconds
          </h2>
          <p className="mt-3 text-sm text-secondary-foreground sm:text-base">
            Form bhariye — send karte hi aapki details seedha hamare WhatsApp par
            pahunch jaayengi aur hum turant reply karenge.
          </p>
          <dl className="mt-6 space-y-3 text-sm">
            <div className="card-soft card-soft-hover animate-fade-up p-4 [animation-delay:80ms]">
              <dt className="flex items-center gap-2 font-semibold text-foreground">
                <Phone aria-hidden="true" className="h-4 w-4 text-primary" />
                WhatsApp / Call
              </dt>
              <dd className="mt-1 text-muted-foreground">{WHATSAPP_DISPLAY}</dd>
            </div>
            <div className="card-soft card-soft-hover animate-fade-up p-4 [animation-delay:110ms]">
              <dt className="flex items-center gap-2 font-semibold text-foreground">
                <Mail aria-hidden="true" className="h-4 w-4 text-primary" />
                Email
              </dt>
              <dd className="mt-1">
                <a
                  href={`mailto:${business.email}`}
                  className="text-muted-foreground underline-offset-4 transition-colors hover:text-primary hover:underline"
                >
                  {business.email}
                </a>
              </dd>
            </div>
            <div className="card-soft card-soft-hover animate-fade-up p-4 [animation-delay:140ms]">
              <dt className="font-semibold text-foreground">Working hours</dt>
              <dd className="text-muted-foreground">{business.hours}</dd>
            </div>
            <div className="card-soft card-soft-hover animate-fade-up p-4 [animation-delay:200ms]">
              <dt className="flex items-center gap-2 font-semibold text-foreground">
                <MapPin aria-hidden="true" className="h-4 w-4 text-primary" />
                Centre
              </dt>
              <dd className="mt-1 text-muted-foreground">
                {addressLines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </dd>
            </div>
          </dl>
        </div>

        <form onSubmit={submit} className="card-soft animate-fade-up p-5 sm:p-6 [animation-delay:120ms]">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label htmlFor="c-service" className="text-sm font-medium">
                Which service do you need?
              </label>
              <select
                id="c-service"
                value={form.service}
                onChange={(event) => setForm({ ...form, service: event.target.value })}
                className={field}
              >
                {services.map((service) => (
                  <option key={service.id} value={service.name}>
                    {service.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="c-name" className="text-sm font-medium">
                Your name
              </label>
              <input
                id="c-name"
                required
                value={form.name}
                onChange={(event) => setForm({ ...form, name: event.target.value })}
                className={field}
              />
            </div>
            <div>
              <label htmlFor="c-mobile" className="text-sm font-medium">
                Mobile number
              </label>
              <input
                id="c-mobile"
                required
                inputMode="numeric"
                pattern="[0-9]{10}"
                value={form.mobile}
                onChange={(event) => setForm({ ...form, mobile: event.target.value })}
                className={field}
              />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="c-place" className="text-sm font-medium">
                City / Village
              </label>
              <input
                id="c-place"
                value={form.place}
                onChange={(event) => setForm({ ...form, place: event.target.value })}
                className={field}
              />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="c-note" className="text-sm font-medium">
                Extra details
              </label>
              <textarea
                id="c-note"
                rows={3}
                value={form.note}
                onChange={(event) => setForm({ ...form, note: event.target.value })}
                className={field}
              />
            </div>
          </div>
          <WhatsAppButton type="submit" size="lg" className="mt-6 w-full">
            Send on WhatsApp
          </WhatsAppButton>

          <p className="mt-2 text-center text-xs text-muted-foreground">
            Aapki details sirf WhatsApp message ke roop mein hamein bheji jaati hain.
          </p>
        </form>
      </div>
    </section>
  );
}
