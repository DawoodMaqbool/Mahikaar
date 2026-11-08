import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { routes } from "@/lib/site";

type InquiryCtaProps = {
  headingLevel?: "h1" | "h2";
  /** Target of the Contact Us button. */
  consultationHref?: string;
  /** The Contact page already shows its details directly below, so it hides the Contact Us button. */
  showContactLink?: boolean;
};

export function InquiryCta({
  headingLevel: Heading = "h2",
  consultationHref = routes.contact,
  showContactLink = true,
}: InquiryCtaProps) {
  return (
    <section className="w-full bg-ink text-surface py-24 relative overflow-hidden border-t border-outline-variant/20">
      <div
        aria-hidden="true"
        className="absolute -right-20 -bottom-20 w-96 h-96 rounded-full bg-secondary/10 blur-3xl pointer-events-none"
      />
      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-8 space-y-6">
            <Eyebrow tone="dark">B2B Enquiries</Eyebrow>
            <Heading className="type-headline-lg tracking-tight text-surface">
              Start Your Enquiry.
            </Heading>
            <p className="type-body-md text-outline-variant max-w-2xl leading-relaxed">
              Tell us about your range. We will discuss styles, materials, customisation and
              quantities with you.
            </p>
          </div>
          <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-4">
            <Link
              href={routes.quote}
              className="w-full text-center px-8 py-4 bg-surface text-primary type-label-md uppercase tracking-[0.2em] hover:bg-secondary-fixed hover:text-primary transition-all duration-200 shadow-xl"
            >
              Request a Quote
            </Link>
            {showContactLink && (
              <Link
                href={consultationHref}
                className="w-full text-center px-8 py-4 bg-transparent text-surface border border-outline-variant/40 hover:border-surface type-label-md uppercase tracking-[0.2em] transition-colors"
              >
                Contact Us
              </Link>
            )}
            <p className="type-body-sm text-outline-variant leading-relaxed">
              Not ready with a technical pack? Start with a design reference or a short description.
            </p>
          </div>
        </div>

        <p className="mt-16 pt-8 border-t border-surface/10 text-outline-variant type-body-sm">
          Shipping is arranged per order.
        </p>
      </Container>
    </section>
  );
}
