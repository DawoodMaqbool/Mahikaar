import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { routes } from "@/lib/site";

export function ContactHero() {
  return (
    <section className="w-full bg-surface section-standard">
      <Container>
        <div className="measure-body space-y-6">
          <h1 className="type-headline-xl text-on-surface measure-headline">Speak With Our Team</h1>
          <p className="type-body-lg text-on-surface-variant measure-intro">
            Email or call our team with general questions about footwear requirements,
            custom designs and private-label production.
          </p>
          <div className="space-y-4 pt-2">
            <p className="type-body-sm text-on-surface-variant">
              Have a specific footwear project in mind? Share your brief through Request a Quote.
            </p>
            <Link href={routes.quote} className="action-primary">Request a Quote</Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
