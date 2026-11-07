import { Container } from "@/components/ui/Container";
import { materialGroups } from "@/data/manufacturing";

export function MaterialsSection() {
  return (
    <section className="w-full bg-surface py-20">
      <Container className="space-y-12">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6">
          <div className="space-y-3 max-w-2xl">
            <span className="type-label-sm uppercase tracking-[0.2em] text-secondary">
              Our Material Sourcing
            </span>
            <h2 className="type-headline-lg text-on-surface">A Considered Range of Leathers</h2>
            <p className="type-body-md text-on-surface-variant">
              Explore a range of leather types, textures, colours and finishes. Material
              selection is discussed according to the design and intended use, with availability,
              specification and pricing confirmed against the order quantity and sourcing
              requirements.
            </p>
          </div>
          <div className="flex items-center gap-2 text-on-surface-variant type-label-sm uppercase tracking-wider">
            <span aria-hidden="true" className="w-2 h-2 rounded-full bg-secondary" />
            <span>Availability Confirmed per Order</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {materialGroups.map((group) => (
            <article
              key={group.title}
              className="bg-surface-container-lowest p-6 shadow-xs flex flex-col justify-between space-y-6 min-w-0"
            >
              <div className="space-y-3">
                <span className="type-label-sm uppercase tracking-widest text-secondary block">
                  {group.category}
                </span>
                <h3 className="type-headline-sm text-on-surface">{group.title}</h3>
                <p className="type-body-sm text-on-surface-variant leading-relaxed">{group.text}</p>
              </div>
              <ul className="flex flex-wrap gap-2">
                {group.options.map((option) => (
                  <li
                    key={option}
                    className="px-3 py-1 bg-surface-container-low text-on-surface type-label-sm uppercase tracking-wider"
                  >
                    {option}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className="space-y-2 max-w-3xl type-body-sm text-on-surface-variant leading-relaxed">
          <p>
            Some specific materials, including selected crust leather and patina options, may
            require a certain quantity to be sourced or processed. Not every material is available
            for every design.
          </p>
          <p>
            Additional organic leather options may also be discussed, subject to confirming the
            exact material and its sourcing specifications.
          </p>
        </div>
      </Container>
    </section>
  );
}
