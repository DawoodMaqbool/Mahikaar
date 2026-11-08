import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { customizationNote } from "@/data/portfolio";

const counters = [
  { value: "12 Pairs", label: "Minimum per Design & Colour" },
  { value: "UK 6–12", label: "Standard UK Sizes" },
  { value: "2–4 Wks", label: "Bulk Production" },
];

export function PortfolioIntro() {
  return (
    <section className="section-standard bg-surface">
      <Container className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
        <div className="lg:col-span-7 min-w-0 space-y-6">
          <Eyebrow>Footwear Portfolio</Eyebrow>
          <h1 className="type-headline-xl text-on-surface measure-headline">Reference Styles, Made to Order</h1>
          <p className="type-body-lg text-on-surface-variant measure-intro">
            Customisable footwear references for brands, boutiques and private-label businesses.
            Colours shown are examples, and digital previews are labelled as such. Materials and
            customisation are confirmed for each project.
          </p>
        </div>
        <div className="lg:col-span-5 min-w-0 space-y-8 lg:pt-10">
          <div className="space-y-3">
            <h2 className="type-headline-sm text-on-surface">Branding &amp; Customisation</h2>
            <p className="type-body-sm text-on-surface-variant">{customizationNote}</p>
          </div>
          <dl className="grid grid-cols-1 sm:grid-cols-3 gap-5 border-t border-outline-variant pt-6">
            {counters.map((counter) => (
              <div key={counter.label} className="min-w-0 space-y-2">
                <dt className="type-body-sm text-on-surface-variant">{counter.label}</dt>
                <dd className="type-headline-sm text-on-surface">{counter.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Container>
    </section>
  );
}
