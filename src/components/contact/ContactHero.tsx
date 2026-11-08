import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { routes } from "@/lib/site";

export function ContactHero() {
  return (
    <section className="w-full bg-surface-container-low py-16 lg:py-24">
      <Container className="max-w-4xl space-y-6">
        <div className="flex items-center gap-3">
          <span aria-hidden="true" className="inline-flex w-2 h-2 rounded-full bg-secondary" />
          <span className="type-label-sm uppercase tracking-[0.25em] text-secondary">Contact</span>
        </div>
        <h1 className="type-headline-xl text-on-surface leading-[1.08] tracking-tight">
          Speak With <br />
          <span className="italic font-normal text-secondary">Our Team</span>
        </h1>
        <p className="type-body-lg text-on-surface-variant max-w-2xl leading-relaxed">
          Questions about styles, materials, quantities or timelines? Email or call us, or
          read the answers below. If you already have a brief, send it through the quote form.
        </p>
        <Link
          href={routes.quote}
          className="inline-flex items-center justify-center px-8 py-4 bg-primary-container text-surface hover:bg-secondary hover:text-on-secondary transition-colors type-label-md uppercase tracking-[0.2em]"
        >
          Request a Quote
        </Link>
      </Container>
    </section>
  );
}
