import { Container } from "@/components/ui/Container";

const terms = [
  {
    label: "Minimum Order",
    value: "12 pairs",
    text: "Per design/article and colour.",
  },
  {
    label: "Sizes",
    value: "UK 6–12 standard",
    text: "Mixed and half sizes are permitted within an order. Other sizing can be discussed for individual projects.",
  },
  {
    label: "Sample Development",
    value: "Approx. 2–3 weeks",
    text: "From agreement of the design and materials.",
  },
  {
    label: "Bulk Production",
    value: "Approx. 2–4 weeks",
    text: "Subject to seasonal demand.",
  },
];

export function CommercialTerms() {
  return (
    <section id="minimum-orders" className="w-full bg-surface-container-low section-standard scroll-mt-20">
      <Container className="space-y-12">
        <div className="measure-body space-y-4">
          <span className="type-eyebrow uppercase text-secondary">
            Order Terms
          </span>
          <h2 className="type-headline-lg text-on-surface">
            Minimum Orders &amp; Production Timelines
          </h2>
        </div>

        <dl className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-x-8 gap-y-10">
          {terms.map((term) => (
            <div key={term.label} className="min-w-0 border-t border-outline-variant pt-6 space-y-3">
              <dt className="type-eyebrow uppercase text-secondary">
                {term.label}
              </dt>
              <dd className="space-y-2">
                <span className="block type-headline-sm text-on-surface">{term.value}</span>
                <span className="block type-body-sm text-on-surface-variant leading-relaxed">
                  {term.text}
                </span>
              </dd>
            </div>
          ))}
        </dl>

        <div className="measure-body space-y-3 type-body-sm text-on-surface-variant leading-relaxed">
          <p>
            Bulk production begins after the sample and specifications are approved, the commercial
            arrangements are agreed and the required advance is received.
          </p>
          <p>
            Timelines are indicative and depend on the design, material availability and seasonal
            demand. Shipping and delivery are agreed for each order.
          </p>
        </div>
      </Container>
    </section>
  );
}
