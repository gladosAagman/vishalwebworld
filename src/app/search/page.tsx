import type { Metadata } from "next";

import { GovSearch } from "@/components/site/GovSearch";
import { PageHero } from "@/components/site/PageHero";
import { PageShell } from "@/components/site/PageShell";
import { RevealText } from "@/components/site/RevealText";

const title = "Search Government Services | Vishal Web World";
const description =
  "Search Google, official government websites, schemes and online forms from Vishal Web World's service search page.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description, type: "website" },
  twitter: { card: "summary_large_image" },
};

export default function SearchPage() {
  return (
    <PageShell>
      <PageHero
        motif="search"
        caption="Sirf official portals · koi fake link nahi"
        eyebrow="Smart search"
        title="Scheme ya service dhoondhna ab easy"
        description="Google search ko government sites, schemes ya online forms tak focus karke accurate official results nikaliye."
      >
        <div className="max-w-3xl">
          <GovSearch />
        </div>
      </PageHero>
      <RevealText>Sahi keyword, sahi portal. Hum search ko sirf official government websites tak seemit karte hain, taaki aapko fake links ke bajaye asli information mile.</RevealText>
      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="grid gap-4 sm:grid-cols-3">
          {["Govt sites", "Online forms", "Scheme status"].map((item, index) => (
            <div
              key={item}
              className="card-soft card-soft-hover animate-fade-up p-5"
              style={{ animationDelay: `${index * 80}ms` }}
            >
              <h2 className="text-lg font-bold">{item}</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Search box mein naam likhiye, option select kijiye aur official results open ho jayenge.
              </p>
            </div>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
