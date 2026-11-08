import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { routes } from "@/lib/site";

const phases = [
  { label: "Sample development", days: "Approx. 2–3 weeks" },
  { label: "Sample, fit & leather approval", days: "By your team" },
  { label: "Bulk production after approval", days: "Approx. 2–4 weeks" },
];

export function PrototypeCta() {
  return (
    <section className="w-full bg-ink text-surface section-standard">
      <Container>
        <div className="text-surface">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            <div className="lg:col-span-7 min-w-0 space-y-6">
              <div className="flex items-center gap-3">
                <p className="type-eyebrow uppercase text-outline-variant">
                  Sampling &amp; Prototyping
                </p>

              </div>
              <h2 className="type-headline-lg text-surface">
                From design reference to physical sample.
              </h2>
              <p className="type-body-lg text-outline-variant measure-intro">
                Sampling allows designers, creative directors, and private
                labels to test fit, leather, and finishing before commissioning
                production. Timelines are indicative and depend on the style,
                material availability and seasonal demand.
              </p>
              <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <Link
                  href={routes.quote}
                  className="action-primary action-inverse"
                >
                  <span>
                    Request a Quote
                  </span>

                </Link>
                <Link
                  href={routes.contact}
                  className="action-secondary action-inverse"
                >
                  <span>
                    Contact Us
                  </span>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5 min-w-0 border-t border-outline-variant/40 pt-6 space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="type-eyebrow uppercase text-outline-variant">
                  Typical Timelines
                </h3>
                <span className="type-body-sm text-outline-variant">
                  Indicative
                </span>
              </div>
              <dl className="space-y-4 type-body-sm">
                {phases.map((phase) => (
                  <div
                    key={phase.label}
                    className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 py-2"
                  >
                    <dt className="text-outline-variant">{phase.label}</dt>
                    <dd className="text-surface font-medium sm:text-right">
                      {phase.days}
                    </dd>
                  </div>
                ))}
              </dl>
              <p className="pt-2 text-outline-variant type-body-sm">
                <span className="text-surface font-medium type-body-sm">
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
