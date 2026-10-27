import { Container } from "@/components/ui/Container";
import { customizationNote } from "@/data/portfolio";

const counters = [
  { value: "12 Pairs", label: "Minimum per Style" },
  { value: "UK 6–12", label: "Standard Size Run" },
  { value: "4–8 Wks", label: "Bulk Production" },
];

export function PortfolioIntro() {
  return (
    <Container className="pt-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-8">
        <div className="max-w-3xl space-y-4">
          <div className="flex items-center gap-3">
            <span aria-hidden="true" className="inline-block w-2 h-2 bg-secondary" />
            <p className="type-label-sm uppercase tracking-[0.22em] text-secondary font-semibold">
              Made in Lahore • Footwear Portfolio
            </p>
          </div>
          <h1 className="type-headline-xl text-on-surface tracking-tight leading-[1.08]">
            Curated Footwear Portfolio — Made-to-Order Specimens
          </h1>
          <p className="type-body-lg text-on-surface-variant max-w-2xl leading-relaxed pt-1">
            A selection of reference styles, made to order in Lahore. Available for private-label
            commissioning and custom development, with materials and customisation confirmed for
            each project.
          </p>
          <div className="border-l-2 border-secondary pl-4 mt-2">
            <h2 className="type-label-md uppercase tracking-[0.18em] text-on-surface font-semibold mb-1">
              Made to Order. Made for Your Brand.
            </h2>
            <p className="type-body-sm text-on-surface-variant leading-normal">{customizationNote}</p>
          </div>
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
