import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { routes } from "@/lib/site";

export function PrivateLabelCta() {
  return (
    <section className="w-full bg-surface section-standard">
      <Container>
        <div className="measure-body space-y-6">
          <p className="type-eyebrow uppercase text-secondary">
            Start a Project
          </p>
          <h2 className="type-headline-lg text-on-surface">
            Request a quotation or discuss your project.
          </h2>
          <p className="type-body-lg text-on-surface-variant measure-intro">
            Tell us about your designs, materials and quantities, and our team will come back to
            you with the next steps.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <Link
              href={routes.quote}
              className="action-primary"
            >
              <span>Request a Quote</span>

            </Link>
            <Link
              href={routes.contact}
              className="action-secondary"
            >
              <span>Contact Us</span>
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
