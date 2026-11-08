import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Icon } from "@/components/ui/Icon";

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
}: ProvenanceSectionProps) {
  return (
    <section className="w-full bg-surface py-20 lg:py-32 border-b border-outline-variant/30">
      <Container>
        <Eyebrow rule="long" className="mb-8">
          About Mahikaar
        </Eyebrow>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div
            className={`${compact ? "lg:col-span-8" : "lg:col-span-7"} space-y-6`}
          >
            <Heading className="type-headline-lg text-on-surface tracking-tight leading-[1.15]">
              Made by Our Own Shoemaking Team.
            </Heading>
            <p className="type-body-lg text-on-surface-variant leading-relaxed">
              Mahikaar is a made-to-order footwear workshop in Lahore, Pakistan, serving B2B buyers.
              Our shoemaking team makes each pair by hand in our workshop, with
              clear communication at every step.
            </p>
            <p className="type-body-md text-outline leading-relaxed">
              Our team stays involved from pattern cutting to the finished shoe.
              Each order is made to the agreed specification, with materials,
              finishes and customisation confirmed before production begins.
            </p>
          </div>

          {!compact && (
            <div className="lg:col-span-5 bg-surface-container-low p-8 lg:p-10 border border-outline-variant/40 shadow-xs relative">
              <div className="absolute -top-3 left-8 px-3 py-0.5 bg-secondary text-surface type-label-sm uppercase tracking-widest">
                Craft Details
              </div>
              <h3 className="type-label-md uppercase tracking-[0.2em] text-on-surface mb-6">
                What Defines Our Footwear
              </h3>
              <dl className="space-y-6 divide-y divide-outline-variant/40">
                {qualityMatrix.map((item, index) => (
                  <div key={item.term} className={index === 0 ? "" : "pt-6"}>
                    <dt className="type-headline-sm text-on-surface">
                      <Icon
                        name={item.icon}
                        className="float-right ml-4 text-secondary text-2xl pt-1"
                      />
                      {item.term}
                    </dt>
                    <dd className="type-body-sm text-on-surface-variant">
                      {item.detail}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          )}
        </div>

        {!compact && (
          <dl className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 pt-10 border-t border-outline-variant/30">
            {metrics.map((metric) => (
              <div key={metric.label} className="flex flex-col-reverse">
                <dt className="type-label-sm leading-6 uppercase tracking-widest text-outline">
                  {metric.label}
                </dt>
                <dd className="type-headline-md text-on-surface">
                  {metric.value}
                </dd>
              </div>
            ))}
          </dl>
        )}
      </Container>
    </section>
  );
}
