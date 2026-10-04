import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";

const benchmarks = [
  {
    icon: "architecture",
    title: "Precision Hand Lasting",
    text: "Upper patterns undergo 72 hours of prolonged rest upon bespoke beechwood lasts to eradicate leather memory tension, guaranteeing permanent shape retention over decades of wear.",
  },
  {
    icon: "handyman",
    title: "Awl-Pierced Hand Welting",
    text: "We carve a feather directly from the 5mm thick vegetable-tanned insole, stitching the leather welt entirely by hand using waxed flax thread treated with pine pitch.",
  },
  {
    icon: "layers",
    title: "Oak Bark Ground Soles",
    text: "Tanned naturally for up to 14 months in underground pits using crushed oak, spruce, and mimosa bark, yielding unmatched abrasion resistance and flexibility.",
  },
  {
    icon: "palette",
    title: "Lahori Museum Finish",
    text: "Multi-tint alcohol dye layering creates deep photographic marbling, sealed with unadulterated beeswax and hand-rubbed with deer bone to close outer pores.",
  },
];

export function BenchmarksSection() {
  return (
    <section className="w-full bg-surface-container-low py-20">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-4 space-y-4">
            <span className="type-label-sm uppercase tracking-[0.22em] text-secondary font-semibold">
              Institutional Benchmarks
            </span>
            <h2 className="type-headline-lg text-on-surface tracking-tight leading-tight">
              An Uncompromising Manufacturing Cadence
            </h2>
            <p className="type-body-md text-on-surface-variant leading-relaxed">
              Every specimen leaving our Lahore manufacture undergoes an 8-stage verification
              protocol before packaging into client private-label archives.
            </p>
            <div className="pt-4">
              <div className="p-6 bg-surface-container-lowest shadow-xs space-y-3">
                <h3 className="type-label-sm uppercase tracking-widest text-secondary">
                  Compliance Certifications
                </h3>
                <p className="type-body-sm text-on-surface-variant">
                  BSCI Social Audit Compliant • ISO 9001:2015 Last Grading Consistency • REACH
                  Compliant Tannery Provenance.
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {benchmarks.map((item) => (
              <div key={item.title} className="p-8 bg-surface shadow-xs space-y-3">
                <div className="w-10 h-10 bg-secondary-container/40 flex items-center justify-center text-secondary mb-2">
                  <Icon name={item.icon} className="text-[22px]" />
                </div>
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
