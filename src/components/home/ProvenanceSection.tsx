import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";

const qualityMatrix = [
  {
    term: "Hand-Constructed",
    detail: "Construction carried out by hand throughout",
    icon: "pan_tool",
  },
  {
    term: "Goodyear Welted",
    detail: "Welted construction, with the work carried out by hand",
    icon: "straighten",
  },
  {
    term: "Material Selection",
    detail: "A range of leathers and finishes, discussed per project",
    icon: "layers",
  },
  {
    term: "Client Branding",
    detail: "Agreed branding and customisation options",
    icon: "eco",
  },
];

const metrics = [
  { value: "12 Pairs", label: "Minimum per Design & Colour" },
  { value: "2–3 Weeks", label: "Sample Development" },
  { value: "2–4 Weeks", label: "Bulk Production" },
  { value: "Made to Order", label: "Goodyear Welted by Hand" },
];

type ProvenanceSectionProps = {
  /** "h1" when this section opens a page (About), "h2" when it sits inside one (Home). */
  headingLevel?: "h1" | "h2";
  /** The homepage shows the story only; the About page also shows the details panel and key figures. */
  compact?: boolean;
};

export function ProvenanceSection({
  headingLevel: Heading = "h2",
  compact = false,
}: ProvenanceSectionProps ) {
  if (compact) {
    return (
      <section className="w-full bg-surface-container-low section-standard">
        <Container className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
          <div className="lg:col-span-5 space-y-5 min-w-0">
            <Eyebrow>Our Workshop</Eyebrow>
            <Heading className="type-headline-lg text-on-surface measure-headline">
              Made by Our Own Shoemaking Team.
            </Heading>
          </div>
          <div className="lg:col-span-7 space-y-5 min-w-0">
            <p className="type-body-lg text-on-surface-variant measure-intro">
              Mahikaar is a footwear workshop in Lahore, Pakistan. Our own shoemaking team
              stays involved from pattern cutting to the finished shoe.
            </p>
            <p className="type-body-md text-on-surface-variant measure-body">
              Each pair is made by hand to the agreed specification. We confirm materials,
              finishes and customisation before production begins, with clear communication
              throughout your order.
            </p>
          </div>
        </Container>
      </section>
    );
  }
  return (
    <section className="w-full bg-surface section-standard">
      <Container>
        <div className="measure-body space-y-6">
          <Eyebrow>About Mahikaar</Eyebrow>
          <Heading className="type-headline-xl text-on-surface measure-headline">
            A Workshop Approach to Footwear.
          </Heading>
          <p className="type-body-lg text-on-surface-variant measure-intro">
            Mahikaar is a made-to-order footwear business in Lahore, Pakistan, serving
            international B2B buyers. Our craftsmen make Goodyear welted leather footwear
            by hand in our workshop.
          </p>
          <p className="type-body-md text-on-surface-variant">
            Our team stays involved from pattern cutting to the finished shoe. Materials,
            finishes and customisation are confirmed before production begins, with clear
            communication throughout your order.
          </p>
        </div>

        <div className="mt-12 lg:mt-16 space-y-6">
          <h2 className="type-headline-md text-on-surface">What Defines Our Footwear</h2>
          <dl className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-x-8 gap-y-8">
            {qualityMatrix.map((item) => (
              <div key={item.term} className="min-w-0 border-t border-outline-variant pt-5 space-y-3">
                <dt className="type-headline-sm text-on-surface">{item.term}</dt>
                <dd className="type-body-sm text-on-surface-variant">{item.detail}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="mt-12 lg:mt-16 space-y-6">
          <h2 className="type-headline-md text-on-surface">Planning Your Order</h2>
          <dl className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-x-8 gap-y-8">
            {metrics.map((metric) => (
              <div key={metric.label} className="min-w-0 space-y-2">
                <dt className="type-body-sm text-on-surface-variant">{metric.label}</dt>
                <dd className="type-headline-sm text-on-surface">{metric.value}</dd>
              </div>
            ))}
          </dl>
          <p className="type-body-sm text-on-surface-variant measure-body">
            Timelines are approximate. Sample development follows agreement of the design and
            materials; bulk production follows sample approval and agreed specifications and
            commercial arrangements. Timing depends on the design, material availability and
            seasonal demand.
          </p>
        </div>
      </Container>
    </section>
  );
}
