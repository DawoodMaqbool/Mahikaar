import { Container } from "@/components/ui/Container";

const benchmarks = [
  {
    icon: "architecture",
    title: "Hand Lasting",
    text: "Uppers are lasted by hand so that the shoe's form and proportions are established before the sole is attached.",
  },
  {
    icon: "handyman",
    title: "Hand Welting",
    text: "The welt is stitched by hand as part of our Goodyear welted construction.",
  },
  {
    icon: "layers",
    title: "Sole Options",
    text: "Leather soles for classic styling, with other sole options discussed for each design.",
  },
  {
    icon: "palette",
    title: "Hand Finishing",
    text: "Each pair is finished by hand before dispatch.",
  },
];

export function BenchmarksSection() {
  return (
    <section className="w-full bg-surface-container-low section-standard">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-4 min-w-0 space-y-4">
            <span className="type-eyebrow uppercase text-secondary">
              Craft Details
            </span>
            <h2 className="type-headline-lg text-on-surface">
              Construction Details
            </h2>
            <p className="type-body-md text-on-surface-variant leading-relaxed">
              Each order is made to your agreed specification, with construction carried out by
              hand throughout.
            </p>
            <div className="pt-4">
              <div className="space-y-3">
                <h3 className="type-label-sm uppercase tracking-widest text-secondary">
                  Made to Order
                </h3>
                <p className="type-body-sm text-on-surface-variant">
                  Materials, sizing, and branding are agreed with you before production begins, so
                  every pair reflects your brief.
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-8 min-w-0 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10">
            {benchmarks.map((item) => (
              <div key={item.title} className="min-w-0 border-t border-outline-variant pt-6 space-y-3">
                <h3 className="type-headline-sm text-on-surface">{item.title}</h3>
                <p className="type-body-sm text-on-surface-variant leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
