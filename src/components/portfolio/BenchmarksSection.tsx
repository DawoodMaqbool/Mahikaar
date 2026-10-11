import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";

const benchmarks = [
  {
    icon: "architecture",
    title: "Hand Lasting",
    text: "Uppers are lasted by hand and left to rest on the last so the shape settles before the sole is attached, helping each pair hold its form.",
  },
  {
    icon: "handyman",
    title: "Hand Welting",
    text: "A feather is carved directly from the leather insole and the welt is stitched by hand, creating the structure that allows the shoe to be resoled.",
  },
  {
    icon: "layers",
    title: "Sole Options",
    text: "Leather soles for classic styling, with other sole options discussed for each design.",
  },
  {
    icon: "palette",
    title: "Hand Finishing",
    text: "Colour is built up in layers by hand and sealed with wax, then burnished for depth and a refined finish.",
  },
];

export function BenchmarksSection() {
  return (
    <section className="w-full bg-surface-container-low py-20">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-4 space-y-4">
            <span className="type-label-sm uppercase tracking-[0.22em] text-secondary font-semibold">
              Craft Details
            </span>
            <h2 className="type-headline-lg text-on-surface tracking-tight leading-tight">
              Crafted by Hand, Made to Order
            </h2>
            <p className="type-body-md text-on-surface-variant leading-relaxed">
              Each order is made to your agreed specification, with construction carried out by
              hand throughout.
            </p>
            <div className="pt-4">
              <div className="p-6 bg-surface-container-lowest shadow-xs space-y-3">
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
