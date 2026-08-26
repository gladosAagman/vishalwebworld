"use client";

import { Search, Sparkles } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { StarButton } from "./StarButton";



const scopes = [
  { id: "gov", label: "Govt sites", suffix: "site:gov.in OR site:nic.in" },
  { id: "scheme", label: "Schemes", suffix: "sarkari yojana eligibility apply site:gov.in" },
  { id: "form", label: "Online forms", suffix: "online form apply site:gov.in" },
  { id: "all", label: "Whole web", suffix: "" },
];

export function GovSearch() {
  const [query, setQuery] = useState("");
  const [scope, setScope] = useState(scopes[0]?.id ?? "gov");

  function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    const active = scopes.find((item) => item.id === scope) ?? scopes[0];
    if (!active) return;

    const searchQuery = `${query} ${active.suffix}`.trim();
    if (!searchQuery) return;

    const url = `https://www.google.com/search?q=${encodeURIComponent(searchQuery)}`;
    const opened = window.open(url, "_blank", "noopener,noreferrer");
    if (!opened) {
      const link = document.createElement("a");
      link.href = url;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      document.body.appendChild(link);
      link.click();
      link.remove();
    }
  }

  return (
    <form
      id="search"
      onSubmit={onSubmit}
      className="glass-panel animate-glow p-4 text-card-foreground sm:p-5"
    >
      <h3 className="flex items-center gap-2 text-base font-bold text-foreground sm:text-lg">
        <Sparkles aria-hidden="true" className="h-4 w-4 text-highlight" />
        Search any scheme or service
      </h3>
      <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
        Scheme ka naam likhiye — hum seedha official government sites mein search karenge.
      </p>
      <div className="mt-3 flex flex-col gap-2 sm:flex-row">
        <label className="sr-only" htmlFor="gov-search-input">
          Search term
        </label>
        <div className="relative flex-1">
          <Search aria-hidden="true" className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            id="gov-search-input"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="e.g. Ladli Behna status, Ayushman card download"
            className="w-full rounded-full border border-input bg-background py-2.5 pl-10 pr-4 text-sm outline-none transition-shadow focus:ring-2 focus:ring-ring"
          />
        </div>
        <StarButton type="submit" variant="primary">
          Search
        </StarButton>

      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {scopes.map((item) => (
          <Button
            key={item.id}
            type="button"
            variant={scope === item.id ? "default" : "secondary"}
            size="sm"
            onClick={() => setScope(item.id)}
            aria-pressed={scope === item.id}
            className="rounded-full transition-all duration-300 hover:-translate-y-0.5"
          >
            {item.label}
          </Button>
        ))}
      </div>
    </form>
  );
}
