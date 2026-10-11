import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { routes } from "@/lib/site";

const steps = [
  {
    icon: "draw",
    title: "Design & Fit Development",
    text: "Share your design reference, sizing, and customisation requirements. We develop the pattern and fit details with you so the finished pair reflects your brand.",
    footnote: "Made to Your Specification",
  },
  {
    icon: "palette",
    title: "Curated Material Sourcing",
    text: "Access to local leather suppliers, with calf, suede, patent, embossed, and specialty finishes discussed around your project. Availability is confirmed before an order is finalised.",
    footnote: "Availability Confirmed per Order",
  },
  {
    icon: "verified",
    title: "Sample Approval",
    text: "Before production, a sample is prepared so your team can approve fit, leather, and finishing. Selected styles can be sampled in as little as 2 days; fully custom prototypes typically take 2–4 weeks.",
    footnote: "2 Days to 4 Weeks",
  },
  {
    icon: "local_shipping",
    title: "Scaled Made-to-Order",
    text: "Production begins once the sample, specifications, and commercial terms are agreed. Bulk orders usually take 4–8 weeks depending on order size, with agreed branding and packaging.",
    footnote: "Typically 4–8 Weeks",
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
            work with you on your specification in our Lahore atelier for menswear labels and
            boutique brands.
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
              Explore Private Label
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
