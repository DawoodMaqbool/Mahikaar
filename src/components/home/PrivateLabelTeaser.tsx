import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { routes } from "@/lib/site";

const steps = [
  {
    icon: "draw",
    title: "Requirements & Materials",
    text: "Share a sample, reference photograph, technical pack or design idea. Leather, colours, and branding are agreed with you before production.",
    footnote: "Made to Your Specification",
  },
  {
    icon: "verified",
    title: "Sample Approval",
    text: "Our shoemaking team develops a sample by hand so your team can approve fit, leather, and finishing.",
    footnote: "Approx. 2–3 Weeks",
  },
  {
    icon: "inventory_2",
    title: "Made-to-Order Production",
    text: "Production proceeds from your approved sample and agreed specifications, from 12 pairs per design and colour.",
    footnote: "Approx. 2–4 Weeks",
  },
  {
    icon: "fact_check",
    title: "Quality Oversight",
    text: "Our team reviews each stage from pattern cutting to final finishing, and checks every completed pair before dispatch.",
    footnote: "Inspected Throughout",
  },
];

type PrivateLabelTeaserProps = {
  headingLevel?: "h1" | "h2";
  /** The buttons link to the Private Label page, so that page hides them. */
  showActions?: boolean;
};

export function PrivateLabelTeaser({
  headingLevel: Heading = "h2",
  showActions = true,
}: PrivateLabelTeaserProps) {
  return (
    <section className="w-full bg-surface py-20 lg:py-32">
      <Container>
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <p className="type-label-md uppercase tracking-[0.25em] text-secondary">
            Private Label Services
          </p>
          <Heading className="type-headline-lg text-on-surface tracking-tight">
            Build Footwear Around Your Brand
          </Heading>
          <p className="type-body-md text-on-surface-variant leading-relaxed">
            From client branding and agreed customisation to made-to-order production, we
            work with you from first enquiry to dispatch, for menswear labels and boutique
            brands.
          </p>
        </div>

        <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <li
              key={step.title}
              className="bg-surface-container-low p-8 border border-outline-variant/30 hover:border-secondary transition-colors flex flex-col justify-between h-full"
            >
              <div>
                <div className="flex items-center justify-between mb-8">
                  <span className="type-headline-md text-secondary">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <Icon name={step.icon} className="text-outline text-2xl" />
                </div>
                <h3 className="type-headline-sm text-on-surface mb-3">{step.title}</h3>
                <p className="type-body-sm text-on-surface-variant leading-relaxed">{step.text}</p>
              </div>
              <div className="pt-6 mt-6 border-t border-outline-variant/20 type-label-sm uppercase tracking-widest text-outline">
                {step.footnote}
              </div>
            </li>
          ))}
        </ol>

        {showActions && (
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link
              href={routes.privateLabel}
              className="px-8 py-3.5 bg-primary text-surface type-label-md uppercase tracking-[0.2em] hover:bg-secondary transition-colors"
            >
              See the Full Ordering Journey
            </Link>
            <Link
              href={routes.contact}
              className="px-8 py-3.5 bg-transparent text-on-surface type-label-md uppercase tracking-[0.2em] border border-outline-variant hover:border-on-surface transition-colors"
            >
              Discuss Your Project
            </Link>
          </div>
        )}
      </Container>
    </section>
  );
}
