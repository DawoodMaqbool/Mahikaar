import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { routes } from "@/lib/site";

export function PrivateLabelCta() {
  return (
    <section className="w-full bg-surface py-20">
      <Container>
        <div className="bg-primary text-on-primary p-8 lg:p-16 shadow-xl text-center space-y-6">
          <p className="type-label-sm uppercase tracking-[0.25em] text-secondary-fixed">
            Start a Project
          </p>
          <h2 className="type-headline-lg lg:type-headline-xl text-on-primary leading-tight">
            Request a quotation or discuss your project.
          </h2>
          <p className="type-body-lg text-inverse-primary max-w-2xl mx-auto">
            Tell us about your designs, materials and quantities, and our team will come back to
            you with the next steps.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4">
            <Link
              href={routes.quote}
              className="inline-flex items-center justify-center px-8 py-4 bg-secondary text-on-secondary hover:bg-secondary-fixed hover:text-on-secondary-fixed transition-colors shadow-md group"
            >
              <span className="type-label-md uppercase tracking-[0.18em]">Request a Quote</span>
              <Icon
                name="arrow_forward"
                className="ml-2 text-lg transition-transform group-hover:translate-x-1"
              />
            </Link>
            <Link
              href={routes.contact}
              className="inline-flex items-center justify-center px-6 py-4 bg-transparent text-on-primary hover:bg-surface-container-highest/10 transition-colors"
            >
              <span className="type-label-md uppercase tracking-[0.18em]">Discuss a Project</span>
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
