import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Icon } from "@/components/ui/Icon";

const qualityMatrix = [
  { term: "180+ Steps", detail: "Individual hand operations per pair", icon: "pan_tool" },
  { term: "10 SPI", detail: "Stitches Per Inch welt seam density", icon: "straighten" },
  { term: "Vegetable-Tanned", detail: "Bespoke oak-bark outsoles & brass heel taps", icon: "layers" },
  { term: "100% Real Cork", detail: "Zero synthetic paste or EVA cavity fillers", icon: "eco" },
];

const metrics = [
  { value: "30–45 Days", label: "Sampling Turnaround" },
  { value: "12 Pairs", label: "Low-Volume Trial MOQ" },
  { value: "Grade-A", label: "European & Local Traceability" },
  { value: "FOB / CIF", label: "Global Express Freight" },
];

type ProvenanceSectionProps = {
  /** "h1" when this section opens a page (About), "h2" when it sits inside one (Home). */
  headingLevel?: "h1" | "h2";
};

export function ProvenanceSection({ headingLevel: Heading = "h2" }: ProvenanceSectionProps) {
  return (
    <section className="w-full bg-surface py-20 lg:py-32 border-b border-outline-variant/30">
      <Container>
        <Eyebrow rule="long" className="mb-8">
          Institutional Provenance
        </Eyebrow>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-7 space-y-6">
            <Heading className="type-headline-lg text-on-surface tracking-tight leading-[1.15]">
              Traditional Shoemaking Reimagined for Discerning Global Houses.
            </Heading>
            <p className="type-body-lg text-on-surface-variant leading-relaxed">
              Māhikar Atelier operates at the quiet axis where historic Punjabi cordwaining
              converges with the architectural precision of British and Continental bespoke
              shoemaking. Founded in Lahore to serve bespoke clothiers, luxury boutiques, and
              independent labels worldwide, our workshop eliminates the friction between heritage
              craft and commercial export reliability.
            </p>
            <p className="type-body-md text-outline leading-relaxed">
              Every specimen leaving our guild enclave undergoes strict orthographic inspection. We
              preserve centuries-old hand-skiving, hand-welting, and glass-burnished sole
              treatments, offering our international brand partners unmatched structural integrity
              and timeless proportion.
            </p>
          </div>

          <div className="lg:col-span-5 bg-surface-container-low p-8 lg:p-10 border border-outline-variant/40 shadow-xs relative">
            <div className="absolute -top-3 left-8 px-3 py-0.5 bg-secondary text-surface type-label-sm uppercase tracking-widest">
              Craft Tolerances
            </div>
            <h3 className="type-label-md uppercase tracking-[0.2em] text-on-surface mb-6">
              Institutional Quality Matrix
            </h3>
            <dl className="space-y-6 divide-y divide-outline-variant/40">
              {qualityMatrix.map((item, index) => (
                <div key={item.term} className={index === 0 ? "" : "pt-6"}>
                  <dt className="type-headline-sm text-on-surface">
                    <Icon name={item.icon} className="float-right ml-4 text-secondary text-2xl pt-1" />
                    {item.term}
                  </dt>
                  <dd className="type-body-sm text-on-surface-variant">{item.detail}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <dl className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 pt-10 border-t border-outline-variant/30">
          {metrics.map((metric) => (
            <div key={metric.label} className="flex flex-col-reverse">
              <dt className="type-label-sm leading-6 uppercase tracking-widest text-outline">{metric.label}</dt>
              <dd className="type-headline-md text-on-surface">{metric.value}</dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
