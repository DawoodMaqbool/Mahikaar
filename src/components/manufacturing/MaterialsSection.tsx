import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { tanneries } from "@/data/manufacturing";

export function MaterialsSection() {
  return (
    <section className="w-full bg-surface py-20">
      <Container className="space-y-12">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6">
          <div className="space-y-3 max-w-2xl">
            <span className="type-label-sm uppercase tracking-[0.2em] text-secondary">
              Material Selection &amp; Customisation
            </span>
            <h2 className="type-headline-lg text-on-surface">
              Materials of Sovereign Caliber
            </h2>
            <p className="type-body-md text-on-surface-variant">
              Leathers are selected with care for each design, drawing on
              local leather suppliers and a sourcing network matched to your
              requirements. Options, finishes, and availability are discussed
              and confirmed for every project.
            </p>
          </div>
          <div className="flex items-center gap-2 text-on-surface-variant type-label-sm uppercase tracking-wider">
            <span
              aria-hidden="true"
              className="w-2 h-2 rounded-full bg-secondary"
            />
            <span>Availability Confirmed per Project</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tanneries.map((tannery) => (
            <article
              key={tannery.name}
              className="bg-surface-container-lowest p-6 shadow-xs flex flex-col justify-between space-y-6 min-w-0"
            >
              <div className="space-y-3">
                {tannery.image && (
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-surface-container">
                    <Image
                      src={tannery.image}
                      alt={tannery.alt ?? ""}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1">
                  <span className="type-label-sm uppercase tracking-widest text-secondary">
                    {tannery.country}
                  </span>
                  <span className="type-label-sm text-on-surface-variant">
                    {tannery.leather}
                  </span>
                </div>
                <h3 className="type-headline-sm text-on-surface">
                  {tannery.name}
                </h3>
                <p className="type-body-sm text-on-surface-variant leading-relaxed">
                  {tannery.text}
                </p>
              </div>
              <dl className="bg-surface-container-low p-3 space-y-1">
                <dt className="type-label-sm text-secondary uppercase">
                  Specification
                </dt>
                <dd className="type-body-sm text-on-surface">
                  {tannery.caliber}
                </dd>
              </dl>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
