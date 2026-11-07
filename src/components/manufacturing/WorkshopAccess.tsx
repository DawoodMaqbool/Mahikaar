import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { routes } from "@/lib/site";

export function WorkshopAccess() {
  return (
    <section id="workshop-visits" className="w-full bg-surface-container-low py-16 scroll-mt-24">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-5 space-y-3">
            <Eyebrow>Visits &amp; Direct Interaction</Eyebrow>
            <h2 className="type-headline-lg text-on-surface">See the Work First-Hand</h2>
          </div>
          <div className="lg:col-span-7 space-y-4 type-body-md text-on-surface-variant leading-relaxed">
            <p>
              Prospective buyers interested in our manufacturing process may be able to visit our
              workshop, subject to prior arrangement and availability.
            </p>
            <p>
              You can also discuss your requirements by video call, and review actual footwear
              through photographs, videos and physical samples.
            </p>
            <Link
              href={routes.contact}
              className="inline-block type-label-md uppercase tracking-[0.2em] text-secondary hover:text-on-surface transition-colors"
            >
              Arrange a Conversation
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
