import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Icon } from "@/components/ui/Icon";
import { routes } from "@/lib/site";

type InquiryCtaProps = {
  headingLevel?: "h1" | "h2";
  /** Target of "Discuss Your Project"; the Contact page points it at its own visit details. */
  consultationHref?: string;
};

export function InquiryCta({
  headingLevel: Heading = "h2",
  consultationHref = routes.contact,
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
            <Eyebrow tone="dark">Enquiries &amp; Consultations</Eyebrow>
            <Heading className="type-headline-lg tracking-tight text-surface">
              Commission Your First Order or Request a Quote.
            </Heading>
            <p className="type-body-md text-outline-variant max-w-2xl leading-relaxed">
              We work with independent brands, boutiques, and footwear retailers seeking
              premium made-to-order Goodyear welted footwear. Get in touch to discuss styles,
              materials, customisation, and quantities for your range.
            </p>
          </div>
          <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-4">
            <Link
              href={routes.quote}
              className="w-full text-center px-8 py-4 bg-surface text-primary type-label-md uppercase tracking-[0.2em] hover:bg-secondary-fixed hover:text-primary transition-all duration-200 shadow-xl"
            >
              Request a Quote
            </Link>
            <Link
              href={consultationHref}
              className="w-full text-center px-8 py-4 bg-transparent text-surface border border-outline-variant/40 hover:border-surface type-label-md uppercase tracking-[0.2em] transition-colors"
            >
              Discuss Your Project
            </Link>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-surface/10 flex flex-wrap items-center justify-between gap-6 text-outline-variant type-body-sm">
          <div className="flex items-center gap-2">
            <Icon name="verified_user" className="text-secondary-fixed text-[18px]" />
            <span>Goodyear welted construction, made to order</span>
          </div>
          <div className="flex items-center gap-6 type-label-sm uppercase tracking-widest text-outline-variant/80">
            <span>Confidentiality Respected</span>
            <span aria-hidden="true">•</span>
            <span>Shipping Arranged per Order</span>
          </div>
        </div>
      </Container>
    </section>
  );
}
