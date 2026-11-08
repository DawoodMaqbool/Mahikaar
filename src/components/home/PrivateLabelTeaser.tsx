import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
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
    text: "Every completed pair is checked by our team before dispatch.",
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
    <section className="w-full bg-surface-container-low section-standard">
      <Container>
        <div className="measure-body mb-10 lg:mb-12 space-y-4">
          <Eyebrow>Private Label Services</Eyebrow>
          <Heading className="type-headline-lg text-on-surface tracking-tight">
            How We Work With Your Brand
          </Heading>
          <p className="type-body-md text-on-surface-variant leading-relaxed">
            How buyers work with us, from first enquiry to dispatch.
          </p>
        </div>

        <ol className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-x-8 gap-y-10">
          {steps.map((step, index) => (
            <li
              key={step.title}
              className="min-w-0 border-t border-outline-variant pt-6 flex flex-col justify-between h-full"
            >
              <div>
                <div className="flex items-center justify-between mb-8">
                  <span className="type-headline-md text-secondary">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="type-headline-sm text-on-surface mb-3">{step.title}</h3>
                <p className="type-body-sm text-on-surface-variant leading-relaxed">{step.text}</p>
              </div>
              <div className="pt-4 mt-4 type-body-sm text-secondary">
                {step.footnote}
              </div>
            </li>
          ))}
        </ol>

        {showActions && (
          <div className="mt-12 flex flex-col sm:flex-row items-stretch sm:items-center gap-6">
            <Link
              href={routes.privateLabel}
              className="action-primary"
            >
              See the Full Ordering Journey
            </Link>
            <Link
              href={routes.contact}
              className="editorial-link type-body-sm inline-flex min-h-12 items-center justify-center"
            >
              Contact Us
            </Link>
          </div>
        )}
      </Container>
    </section>
  );
}
