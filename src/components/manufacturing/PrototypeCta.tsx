import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { routes } from "@/lib/site";

const phases = [
  {
    label: "Sample: selected styles (e.g. Oxfords, brogues)",
    days: "2-7 Days",
  },
  { label: "Sample: fully custom prototype", days: "2–4 weeks" },
  { label: "Sample, fit & leather approval", days: "By your team" },
  { label: "Bulk production after approval", days: "4–8 weeks" },
];

export function PrototypeCta() {
  return (
    <section className="w-full bg-surface py-20">
      <Container>
        <div className="bg-primary text-on-primary p-8 lg:p-16 shadow-xl relative overflow-hidden">
          <div
            aria-hidden="true"
            className="absolute -right-20 -top-20 w-96 h-96 bg-secondary/20 rounded-full blur-3xl pointer-events-none"
          />
          <div
            aria-hidden="true"
            className="absolute -left-20 -bottom-20 w-96 h-96 bg-secondary/10 rounded-full blur-3xl pointer-events-none"
          />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-3">
                <p className="type-label-sm uppercase tracking-[0.25em] text-secondary-fixed">
                  Sampling &amp; Prototyping
                </p>
                <span
                  aria-hidden="true"
                  className="w-8 h-px bg-secondary-fixed/40"
                />
              </div>
              <h2 className="type-headline-lg lg:type-headline-xl text-on-primary leading-tight">
                From design reference to physical sample.
              </h2>
              <p className="type-body-lg text-inverse-primary max-w-xl">
                Sampling allows designers, creative directors, and private
                labels to test fit, leather, and finishing before commissioning
                production. Timelines depend on the style and on material
                availability.
              </p>
              <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <Link
                  href={routes.quote}
                  className="inline-flex items-center justify-center px-8 py-4 bg-secondary text-on-secondary hover:bg-secondary-fixed hover:text-on-secondary-fixed transition-colors shadow-md group"
                >
                  <span className="type-label-md uppercase tracking-[0.18em]">
                    Request a Quote
                  </span>
                  <Icon
                    name="arrow_forward"
                    className="ml-2 text-lg transition-transform group-hover:translate-x-1"
                  />
                </Link>
                <Link
                  href={routes.contact}
                  className="inline-flex items-center justify-center px-6 py-4 bg-transparent text-on-primary hover:bg-surface-container-highest/10 transition-colors"
                >
                  <span className="type-label-md uppercase tracking-[0.18em]">
                    Contact Mahikaar
                  </span>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5 bg-surface-container-highest/10 backdrop-blur-md p-6 lg:p-8 space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="type-label-sm uppercase tracking-widest text-secondary-fixed">
                  Typical Timelines
                </h3>
                <span className="type-label-sm text-inverse-primary">
                  Subject to Materials
                </span>
              </div>
              <dl className="space-y-4 type-body-sm">
                {phases.map((phase) => (
                  <div
                    key={phase.label}
                    className="flex justify-between gap-4 py-2"
                  >
                    <dt className="text-inverse-primary">{phase.label}</dt>
                    <dd className="text-on-primary font-medium whitespace-nowrap">
                      {phase.days}
                    </dd>
                  </div>
                ))}
              </dl>
              <p className="pt-2 text-inverse-primary type-body-sm">
                <span className="text-secondary-fixed font-semibold uppercase type-label-sm">
                  Shipping &amp; Delivery:
                </span>{" "}
                Arrangements and timings are discussed and agreed for each
                order.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
