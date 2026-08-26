import { MapPin, Navigation } from "lucide-react";

import { StarButton } from "./StarButton";

const GOOGLE_MAPS_LINK = "https://maps.app.goo.gl/Unt5CueHyR4E5uLZ6";
const LAT = 23.2478425;
const LNG = 79.9753726;


export function MapSection() {
  return (
    <section className="bg-background py-16">
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid gap-10 lg:grid-cols-5">
          <div className="animate-fade-up lg:col-span-2">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              Location
            </span>
            <h2 className="mt-2 text-2xl font-bold sm:text-4xl">
              Humein aasanai se paayein
            </h2>
            <p className="mt-3 text-sm text-muted-foreground sm:text-base">
              Neeche map par centre ki location dekhiye. Google Maps par seedha
              directions lekar aaiye.
            </p>

            <div className="card-soft mt-6 p-4 animate-fade-up [animation-delay:80ms]">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand/10 text-brand">
                  <MapPin aria-hidden="true" className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Vishal Web World</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Digital Services Centre
                    <br />
                    Madhya Pradesh, India
                  </p>
                </div>
              </div>
            </div>

            <StarButton
              href={GOOGLE_MAPS_LINK}
              className="mt-4 w-full animate-fade-up [animation-delay:140ms] sm:w-auto"
            >
              <Navigation aria-hidden="true" className="h-4 w-4" />
              Google Maps par directions lein
            </StarButton>

          </div>

          <div className="animate-fade-up lg:col-span-3 [animation-delay:120ms]">
            <div className="card-soft overflow-hidden">
              <iframe
                title="Vishal Web World location map"
                src={`https://www.openstreetmap.org/export/embed.html?bbox=${LNG - 0.01}%2C${LAT - 0.01}%2C${LNG + 0.01}%2C${LAT + 0.01}&layer=mapnik&marker=${LAT}%2C${LNG}`}
                width="100%"
                height="420"
                loading="lazy"
                className="block w-full border-0"
                style={{ minHeight: "420px" }}
              />
            </div>
            <p className="mt-2 text-center text-xs text-muted-foreground">
              Map par pin dekhiye — exact location yahin hai.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
