import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";

const commitments = [
  {
    title: "Agreed Specification:",
    text: "Each order is made to the specification you approve, with materials and customisation confirmed before production begins.",
  },
  {
    title: "Welted, Not Cemented:",
    text: "Goodyear welted construction, carried out by hand throughout.",
  },
  {
    title: "Clear Communication:",
    text: "Materials, availability, pricing, and timelines are confirmed with you before an order is finalised.",
  },
];

const capabilities = [
  {
    icon: "branding_watermark",
    title: "Debossed Insoles",
    text: "Your logo or crest on the insole through hot-foil or blind debossing, subject to feasibility.",
  },
  {
    icon: "hardware",
    title: "Branded Details",
    text: "Brass toe plates, logo hardware, and sole or waist stamping, discussed for each design.",
  },
  {
    icon: "design_services",
    title: "Custom Design",
    text: "Share a physical sample, reference images, or a tech pack, and we will discuss how to bring your design to life.",
  },
  {
    icon: "package_2",
    title: "Branded Packaging",
    text: "Branded shoe boxes and dust bags, with packaging options confirmed for each project.",
  },
  {
    icon: "tune",
    title: "Minimum Orders",
    text: "Orders start at 12 pairs per style, in standard UK 6 to 12 size curves or tailored to your custom sizing.",
  },
];

export function PrivateLabelPrecision() {
  return (
    <section className="w-full bg-surface-container-low py-20">
      <Container className="space-y-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-6 space-y-5">
            <span className="type-label-sm uppercase tracking-[0.2em] text-secondary">
              B2B Solutions
            </span>
            <h2 className="type-headline-lg text-on-surface leading-tight">
              Made to Order &amp; Private-Label Precision
            </h2>
            <p className="type-body-lg text-on-surface-variant">
              Each order is produced according to agreed client specifications, allowing
              international labels to create their own footwear lines.
            </p>
            <p className="type-body-md text-on-surface-variant">
              Mahikaar works with you on your specifications and orders in our Lahore atelier,
              supporting both small capsule collections and recurring seasonal orders.
            </p>
          </div>

          <div className="lg:col-span-6 bg-surface-container-lowest p-8 shadow-xs space-y-6">
            <h3 className="type-headline-sm text-on-surface">Our Commitments to Buyers</h3>
            <ul className="space-y-4 type-body-sm text-on-surface-variant">
              {commitments.map((item) => (
                <li key={item.title} className="flex items-start gap-3">
                  <Icon name="check_circle" className="text-secondary text-lg mt-0.5" />
                  <p>
                    <strong className="text-on-surface">{item.title}</strong> {item.text}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h3 className="type-headline-md text-on-surface">Private Label & Customisation</h3>
            <span className="type-label-sm uppercase tracking-widest text-secondary">
              Subject to Feasibility
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {capabilities.map((item) => (
              <div key={item.title} className="bg-surface-container-lowest p-5 shadow-xs space-y-3">
                <div className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center">
                  <Icon name={item.icon} className="text-secondary text-lg" />
                </div>
                <h4 className="type-headline-sm text-on-surface">{item.title}</h4>
                <p className="type-body-sm text-on-surface-variant">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
