import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { routes } from "@/lib/site";

const stages = [
  {
    icon: "draw",
    title: "Share Your Requirements",
    text: "Share an existing design reference, technical pack, physical sample or custom footwear idea. We discuss the intended collection, order quantity, size assortment and branding requirements.",
    footnote: "Your Brief",
  },
  {
    icon: "palette",
    title: "Design & Material Selection",
    text: "Agree the shoe design, leather, colours, sole, finishing, accessories and branding. Material availability, suitability, specifications and pricing are confirmed before proceeding.",
    footnote: "Agreed Before Production",
  },
  {
    icon: "content_cut",
    title: "Sample Development",
    text: "Our workshop develops a physical sample to the agreed design and specifications for your review.",
    footnote: "Your Sample",
  },
  {
    icon: "verified",
    title: "Sample Review & Approval",
    text: "You review the physical sample and confirm the design, fit, leather, finishing and other agreed specifications. Any required adjustments are discussed before bulk production.",
    footnote: "Your Approval",
  },
  {
    icon: "inventory_2",
    title: "Made-to-Order Production",
    text: "Once the sample and specifications are approved and the commercial arrangements are in place, our craftsmen produce your order by hand, using Goodyear welted construction.",
    footnote: "Made to Order",
  },
  {
    icon: "fact_check",
    title: "Production Supervision & Quality Inspection",
    text: "Our team oversees production throughout, from pattern cutting to final finishing. Both our team and our workshop review the completed order against the approved sample and agreed specifications.",
    footnote: "Throughout Production",
    href: `${routes.manufacturing}#quality-review`,
  },
  {
    icon: "local_shipping",
    title: "Final Review & Dispatch",
    text: "The completed order undergoes its final review, after which shipping and dispatch arrangements are confirmed.",
    footnote: "Arranged per Order",
  },
];

export function OrderingJourney() {
  return (
    <section id="how-it-works" className="w-full bg-surface py-16 lg:py-24 scroll-mt-20">
      <Container>
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <p className="type-label-md uppercase tracking-[0.25em] text-secondary">How It Works</p>
          <h2 className="type-headline-lg text-on-surface tracking-tight">
            From Enquiry to Dispatch
          </h2>
          <p className="type-body-md text-on-surface-variant leading-relaxed">
            One clear process in seven stages. Order quantities, sampling and production
            timelines are set out under Minimum Orders &amp; Production Timelines below.
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
                <h3 className="type-headline-sm text-on-surface mb-3">{stage.title}</h3>
                <p className="type-body-sm text-on-surface-variant leading-relaxed">{stage.text}</p>
                {stage.href && (
                  <Link
                    href={stage.href}
                    className="mt-4 inline-flex items-center gap-1 type-label-sm uppercase tracking-widest text-secondary hover:text-on-surface transition-colors"
                  >
                    Our quality inspection
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
      </Container>
    </section>
  );
}
