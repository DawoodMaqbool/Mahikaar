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
            <Eyebrow>Workshop Access</Eyebrow>
            <h2 className="type-headline-lg text-on-surface">Seeing the Work First-Hand</h2>
          </div>
          <div className="lg:col-span-7 space-y-4 type-body-md text-on-surface-variant leading-relaxed">
            <p>
              Workshop visits may be considered by prior arrangement, subject to availability and
              the permission of the workshop owner. Access cannot be guaranteed.
            </p>
            <p>
              Where a visit is not practical, video calls and physical samples are alternative
              ways to review the footwear before you commit to an order.
            </p>
            <Link
              href={routes.contact}
              className="inline-block type-label-md uppercase tracking-[0.2em] text-secondary hover:text-on-surface transition-colors"
            >
              Ask About a Visit
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
