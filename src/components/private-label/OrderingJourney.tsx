import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { routes } from "@/lib/site";

const stages = [
  {
    icon: "draw",
    title: "Share Your Requirements",
    text: "Send your design references, tech pack or physical sample, together with quantities, sizes, colours and branding needs. We review feasibility, material availability and pricing with you.",
    footnote: "Your Brief",
  },
  {
    icon: "palette",
    title: "Design & Material Selection",
    text: "Last, pattern details, leather, colours, finishes and branding are confirmed with you. Specifications are agreed before sampling begins.",
    footnote: "Agreed Before Sampling",
  },
  {
    icon: "content_cut",
    title: "Sample Development",
    text: "A sample is made by hand to the agreed specification so that your team can assess the design in person. Sample development typically takes approximately 2–3 weeks.",
    footnote: "Approx. 2–3 Weeks",
  },
  {
    icon: "verified",
    title: "Sample Review & Approval",
    text: "Your team reviews fit, leather, finishing and detailing, and any adjustments are discussed. Bulk production does not begin until you approve the sample and specifications.",
    footnote: "Your Approval",
  },
  {
    icon: "inventory_2",
    title: "Made-to-Order Production",
    text: "Production proceeds once the sample and specifications are approved and commercial arrangements have been agreed. Orders start at 12 pairs per design and colour, with mixed sizes allowed. Bulk production takes approximately 2–4 weeks, depending on seasonal demand.",
    footnote: "Approx. 2–4 Weeks",
  },
  {
    icon: "fact_check",
    title: "Production Checks & Final Review",
    text: "The workshop checks each pair as production progresses. Before dispatch, the workshop and Mahikaar review the completed order against your approved sample and agreed specifications.",
    footnote: "Workshop & Mahikaar",
    href: `${routes.manufacturing}#quality-review`,
  },
  {
    icon: "local_shipping",
    title: "Dispatch",
    text: "Once the final review is complete, the order is prepared for dispatch. Shipping arrangements and timings are discussed and agreed for each order.",
    footnote: "Arranged per Order",
  },
];

export function OrderingJourney() {
  return (
    <section className="w-full bg-surface py-20 lg:py-32">
      <Container>
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <p className="type-label-md uppercase tracking-[0.25em] text-secondary">
            Private Label Services
          </p>
          <h1 className="type-headline-lg text-on-surface tracking-tight">
            From Enquiry to Dispatch
          </h1>
          <p className="type-body-md text-on-surface-variant leading-relaxed">
            Client branding, agreed customisation and made-to-order production, in seven clear
            stages for menswear labels and boutique brands.
          </p>
        </div>

        <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stages.map((stage, index) => (
            <li
              key={stage.title}
              className="bg-surface-container-low p-8 border border-outline-variant/30 hover:border-secondary transition-colors flex flex-col justify-between h-full"
            >
              <div>
                <div className="flex items-center justify-between mb-8">
                  <span className="type-headline-md text-secondary">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <Icon name={stage.icon} className="text-outline text-2xl" />
                </div>
                <h2 className="type-headline-sm text-on-surface mb-3">{stage.title}</h2>
                <p className="type-body-sm text-on-surface-variant leading-relaxed">{stage.text}</p>
                {stage.href && (
                  <Link
                    href={stage.href}
                    className="mt-4 inline-flex items-center gap-1 type-label-sm uppercase tracking-widest text-secondary hover:text-on-surface transition-colors"
                  >
                    How we review
                    <Icon name="arrow_forward" className="text-[14px]" />
                  </Link>
                )}
              </div>
              <div className="pt-6 mt-6 border-t border-outline-variant/20 type-label-sm uppercase tracking-widest text-outline">
                {stage.footnote}
              </div>
            </li>
          ))}
        </ol>

        <p className="mt-10 text-center type-body-sm text-outline max-w-3xl mx-auto leading-relaxed">
          Timelines are indicative and are confirmed for each order. They depend on the style,
          material availability and seasonal demand, and are not guaranteed delivery dates.
        </p>
      </Container>
    </section>
  );
}
