const facts = [
  ["2.50 lakh", "Gram Panchayats targeted for a CSC"],
  ["Aug 2015", "CSC 2.0 project launched"],
  ["VLE model", "Run by Village Level Entrepreneurs"],
  ["Digital India", "Government of India initiative"],
];

export function CscSection() {
  return (
    <section id="csc" className="relative overflow-hidden bg-secondary py-16">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 lg:grid-cols-[1.4fr_1fr]">
        <div className="animate-fade-up">
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            About the programme
          </span>
          <h2 className="mt-2 text-2xl font-bold sm:text-4xl">CSC 2.0 — A way forward</h2>
          <div className="accent-bar mt-4 h-1 w-24 rounded-full" />
          <div className="mt-5 space-y-4 text-sm leading-relaxed text-secondary-foreground sm:text-base">
            <p>
              Based on the assessment of the erstwhile Common Services Centre (CSC)
              Scheme, the Government of India initiated the CSC 2.0 Project in August
              2015 under Digital India. The objective is to set up at least one CSC in
              2.50 lakh Gram Panchayats across the country to deliver citizen-centric
              services.
            </p>
            <p>
              The project is implemented by CSC e-Governance Services India Limited
              (CSC SPV). It is a self-sustainable entrepreneurship model run by
              Village Level Entrepreneurs (VLEs).
            </p>
            <p className="card-soft animate-glow border-l-4 border-highlight p-4 text-card-foreground">
              <strong>Vishal Web World</strong> isi CSC 2.0 initiative ka hissa hai — ek
              local digital services centre jahan aapko government schemes, documents,
              banking aur online forms ki help bharose ke saath milti hai.
            </p>
          </div>
        </div>
        <ul className="grid gap-3 self-start sm:grid-cols-2 lg:grid-cols-1">
          {facts.map(([value, label], index) => (
            <li
              key={label}
              className="card-soft card-soft-hover animate-fade-up p-5"
              style={{ animationDelay: `${index * 70}ms` }}
            >
              <p className="text-lg font-bold text-primary">{value}</p>
              <p className="text-sm text-muted-foreground">{label}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
