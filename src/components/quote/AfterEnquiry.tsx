import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { routes } from "@/lib/site";

export function AfterEnquiry() {
  return (
    <section className="w-full bg-surface-container py-16">
      <Container>
        <div className="max-w-3xl space-y-4">
          <h2 className="type-headline-lg text-on-surface">
            What Happens After Your Enquiry?
          </h2>
          <p className="type-body-lg text-on-surface-variant leading-relaxed">
            Our team reviews your requirements and gets in touch to discuss
            feasibility, material availability, pricing and estimated timelines.
            Production proceeds after sample approval and agreement on the
            specifications and commercial terms.
          </p>
          <p className="type-body-sm text-on-surface-variant">
            Questions about minimum quantities, lead times or materials?{" "}
            <Link
              href={routes.contact}
              className="text-secondary underline underline-offset-4"
            >
              See our FAQ on the Contact page
            </Link>
            .
          </p>
        </div>
      </Container>
    </section>
  );
}
