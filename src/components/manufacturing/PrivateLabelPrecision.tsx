import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";

const commitments = [
  {
    title: "No Generic Tooling:",
    text: "Proprietary wooden and CAD lasts are stored in secure climate-controlled vaults under exclusive client NDA agreements.",
  },
  {
    title: "True Goodyear / Hand-Welting:",
    text: "We do not offer cemented or Blake-rapid simulations disguised as welted shoes. All construction is structural.",
  },
  {
    title: "Transparent Supply Chain:",
    text: "All hide batches accompany mill test certificates and import traceability manifests directly to your customs broker.",
  },
];

const capabilities = [
  {
    icon: "branding_watermark",
    title: "Debossed Insoles",
    text: "Custom magnesium heat foil debossing with your house crest, archival typography, and internal serial numbering.",
  },
  {
    icon: "hardware",
    title: "Branded Brass Soles",
    text: "Flush-mounted brass toe plates, sunken logo rivets, and hot-stamped waist branding irons carved to your monogram.",
  },
  {
    icon: "design_services",
    title: "Bespoke Patterns",
    text: "Complete pattern generation from your physical vintage shoes, fashion illustrations, or tech-pack schematics.",
  },
  {
    icon: "package_2",
    title: "Archival Packaging",
    text: "Handmade rigid paperboard drawer boxes, unbleached heavy cotton dust bags, and brass-tipped travel shoe horns.",
  },
  {
    icon: "tune",
    title: "Flexible MOQs",
    text: "Tiered order volumes starting at 12 pairs per silhouette for initial trials, scaling to 300+ pairs per collection drop.",
  },
];

export function PrivateLabelPrecision() {
  return (
    <section className="w-full bg-surface-container-low py-20">
      <Container className="space-y-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-6 space-y-5">
            <span className="type-label-sm uppercase tracking-[0.2em] text-secondary">
              B2B Institutional Solutions
            </span>
            <h2 className="type-headline-lg text-on-surface leading-tight">
              Made to Order &amp; Private-Label Precision
            </h2>
            <p className="type-body-lg text-on-surface-variant">
              Each order is produced according to agreed client specifications, allowing
              international labels to create proprietary footwear lines without prohibitive
              tooling overheads.
            </p>
            <p className="type-body-md text-on-surface-variant">
              We operate as the white-label manufacture engine behind bespoke tailoring houses in
              London, Milan, Tokyo, and Zurich. Our infrastructure accommodates both experimental
              limited-capsule runs and recurring seasonal store drops.
            </p>
          </div>

          <div className="lg:col-span-6 bg-surface-container-lowest p-8 shadow-xs space-y-6">
            <h3 className="type-headline-sm text-on-surface">Institutional Sourcing Commitments</h3>
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
            <h3 className="type-headline-md text-on-surface">Private Label Capabilities Matrix</h3>
            <span className="type-label-sm uppercase tracking-widest text-secondary">
              Specification Tiers
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
