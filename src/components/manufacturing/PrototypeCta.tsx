import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { routes } from "@/lib/site";

const phases = [
  { label: "Phase 1: Last Profile & Spec Approval", days: "Days 01–05" },
  { label: "Phase 2: Hand Pattern & Clicking", days: "Days 06–10" },
  { label: "Phase 3: Goodyear Hand-Welting", days: "Days 11–16" },
  { label: "Phase 4: Finishing, Glacé & Courier", days: "Days 17–21" },
];

export function PrototypeCta() {
  return (
    <section className="w-full bg-surface py-20">
      <Container>
        <div className="bg-primary text-on-primary p-8 lg:p-16 shadow-xl relative overflow-hidden">
          <div aria-hidden="true" className="absolute -right-20 -top-20 w-96 h-96 bg-secondary/20 rounded-full blur-3xl pointer-events-none" />
          <div aria-hidden="true" className="absolute -left-20 -bottom-20 w-96 h-96 bg-secondary/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-3">
                <p className="type-label-sm uppercase tracking-[0.25em] text-secondary-fixed">
                  Rapid Bench Prototyping
                </p>
                <span aria-hidden="true" className="w-8 h-px bg-secondary-fixed/40" />
              </div>
              <h2 className="type-headline-lg lg:type-headline-xl text-on-primary leading-tight">
                From CAD pattern to physical sample pair in 3 weeks.
              </h2>
              <p className="type-body-lg text-inverse-primary max-w-xl">
                Our dedicated sample cell allows designers, creative directors, and private labels to
                test last fits, leather hand-feel, and edge finishing with rapid turnaround before
                commissioning production batches.
              </p>
              <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <Link
                  href={routes.quote}
                  className="inline-flex items-center justify-center px-8 py-4 bg-secondary text-on-secondary hover:bg-secondary-fixed hover:text-on-secondary-fixed transition-colors shadow-md group"
                >
                  <span className="type-label-md uppercase tracking-[0.18em]">
                    Request Manufacturing Specs &amp; Sourcing Dossier
                  </span>
                  <Icon name="arrow_forward" className="ml-2 text-lg transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  href={routes.contact}
                  className="inline-flex items-center justify-center px-6 py-4 bg-transparent text-on-primary hover:bg-surface-container-highest/10 transition-colors"
                >
                  <span className="type-label-md uppercase tracking-[0.18em]">
                    Book Atelier Inquest in Lahore
                  </span>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5 bg-surface-container-highest/10 backdrop-blur-md p-6 lg:p-8 space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="type-label-sm uppercase tracking-widest text-secondary-fixed">
                  Development SLA
                </h3>
                <span className="type-label-sm text-inverse-primary">FY 2025 Protocol</span>
              </div>
              <dl className="space-y-4 type-body-sm">
                {phases.map((phase) => (
                  <div key={phase.label} className="flex justify-between gap-4 py-2">
                    <dt className="text-inverse-primary">{phase.label}</dt>
                    <dd className="text-on-primary font-medium whitespace-nowrap">{phase.days}</dd>
                  </div>
                ))}
              </dl>
              <p className="pt-2 text-inverse-primary type-body-sm">
                <span className="text-secondary-fixed font-semibold uppercase type-label-sm">
                  Export Clearance:
                </span>{" "}
                Air freight transit to UK, EU, UAE, &amp; US within 72 hours via DHL Express Airway
                from Allama Iqbal International (LHE).
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
