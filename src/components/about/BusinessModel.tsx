import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { routes } from "@/lib/site";

const roles = [
  {
    title: "Mahikaar",
    text: "Your point of contact from first enquiry to dispatch. We handle requirements, material and specification discussions, sample coordination, and the final review of your completed order.",
  },
  {
    title: "The Workshop",
    text: "Mahikaar works through an established local shoemaking workshop in Lahore, which makes each pair using Goodyear welted construction carried out by hand. Mahikaar does not own the workshop.",
  },
  {
    title: "Shared Accountability",
    text: "The workshop checks each pair during production, and accepts responsibility for qualifying production defects, arranging replacements where needed.",
  },
];

export function BusinessModel() {
  return (
    <section className="w-full bg-surface-container-low py-20 border-b border-outline-variant/30">
      <Container className="space-y-12">
        <div className="max-w-2xl space-y-3">
          <Eyebrow>Our Business Model</Eyebrow>
          <h2 className="type-headline-lg text-on-surface">A Pakistan-Based Partnership</h2>
          <p className="type-body-md text-on-surface-variant leading-relaxed">
            Mahikaar is based in Lahore, Pakistan, and pairs a client-facing service with the
            skill of an established local workshop.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {roles.map((role) => (
            <div key={role.title} className="bg-surface-container-lowest p-8 shadow-xs space-y-3">
              <h3 className="type-headline-sm text-on-surface">{role.title}</h3>
              <p className="type-body-sm text-on-surface-variant leading-relaxed">{role.text}</p>
            </div>
          ))}
        </div>

        <p className="type-body-sm text-on-surface-variant">
          See{" "}
          <Link href={routes.manufacturing} className="text-secondary hover:text-on-surface underline underline-offset-4">
            how each pair is made and reviewed
          </Link>{" "}
          or{" "}
          <Link href={routes.privateLabel} className="text-secondary hover:text-on-surface underline underline-offset-4">
            the full ordering journey
          </Link>
          .
        </p>
      </Container>
    </section>
  );
}
