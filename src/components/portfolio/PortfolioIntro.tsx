import { Container } from "@/components/ui/Container";

const counters = [
  { value: "240+", label: "Artisanal Hours/Pair" },
  { value: "18+", label: "Tannery Stocks" },
  { value: "D–EE", label: "Bespoke Fit Tolerances" },
];

export function PortfolioIntro() {
  return (
    <Container className="pt-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-8">
        <div className="max-w-3xl space-y-4">
          <div className="flex items-center gap-3">
            <span aria-hidden="true" className="inline-block w-2 h-2 bg-secondary" />
            <p className="type-label-sm uppercase tracking-[0.22em] text-secondary font-semibold">
              Lahore Archival Manufacture • Index Vol. IV
            </p>
          </div>
          <h1 className="type-headline-xl text-on-surface tracking-tight leading-[1.08]">
            Curated Footwear Portfolio — Made-to-Order Specimens
          </h1>
          <p className="type-body-lg text-on-surface-variant max-w-2xl leading-relaxed pt-1">
            A selective archive of lasts, patterns, and finishing archetypes developed at our Lahore
            manufacture. Available for private-label commissioning and custom batch development.
          </p>
        </div>

        <div className="flex items-center gap-6 sm:gap-10 p-5 bg-surface-container-low shadow-xs self-start md:self-auto">
          {counters.map((counter, index) => (
            <div key={counter.label} className="contents">
              {index > 0 && <div aria-hidden="true" className="w-px h-10 bg-outline-variant/60" />}
              <div>
                <div className="type-headline-md text-on-surface leading-none">{counter.value}</div>
                <div className="type-label-sm uppercase text-on-surface-variant tracking-widest pt-1.5">
                  {counter.label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
}
