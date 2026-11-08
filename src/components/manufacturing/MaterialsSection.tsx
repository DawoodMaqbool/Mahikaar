import { Container } from "@/components/ui/Container";
import { materialGroups } from "@/data/manufacturing";

export function MaterialsSection() {
  return (
    <section
      id="materials"
      className="w-full bg-surface-container-low section-standard scroll-mt-20"
    >
      <Container className="space-y-12">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6">
          <div className="space-y-4 measure-body">
            <span className="type-eyebrow uppercase text-secondary">
              Materials & Leather Selection
            </span>
            <h2 className="type-headline-lg text-on-surface">
              Leather &amp; Material Options
            </h2>
            <p className="type-body-md text-on-surface-variant">
              Leather types, textures, colours and finishes are discussed for
              each design and its intended use. Availability depends on the
              material and order quantity, and is confirmed for each order.
            </p>
          </div>
          <div className="type-body-sm text-on-surface-variant">
            <span>Availability Confirmed per Order</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-10 gap-y-12">
          {materialGroups.map((group) => (
            <article
              key={group.title}
              className="border-t border-outline-variant pt-6 space-y-6 min-w-0"
            >
              <div className="space-y-3">
                <span className="type-eyebrow uppercase text-secondary block">
                  {group.category}
                </span>
                <h3 className="type-headline-sm text-on-surface">
                  {group.title}
                </h3>
                <p className="type-body-sm text-on-surface-variant leading-relaxed">
                  {group.text}
                </p>
              </div>
              <dl className="space-y-5">
                {group.options.map((option) => (
                  <div key={option.name}>
                    <dt className="type-body-sm font-medium text-on-surface">
                      {option.name}
                    </dt>
                    {option.note && (
                      <dd className="type-body-sm text-on-surface-variant mt-0.5">
                        {option.note}
                      </dd>
                    )}
                  </div>
                ))}
              </dl>
            </article>
          ))}
        </div>

        <p className="measure-body type-body-sm text-on-surface-variant leading-relaxed">
          These are examples of what can be discussed, not a fixed stock list.
          Some materials, including selected crust leather and patina options,
          may require a certain quantity to be sourced or processed, and not
          every material is available for every design. Additional leather
          options can be discussed, subject to confirming the exact material,
          sourcing and specifications.
        </p>
      </Container>
    </section>
  );
}
