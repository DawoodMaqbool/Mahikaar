import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";

const capacity = [
  { label: "Minimum Order", value: "12 Pairs", note: "Per design & colour" },
  { label: "Bulk Production", value: "2–4 Weeks", note: "After sample approval" },
];

const blueprint = [
  {
    icon: "architecture",
    title: "Sizing & Fit",
    text: "Standard UK 6 to 12 size curves, or tailored to your custom sizing and fit requirements.",
  },
  {
    icon: "verified",
    title: "Hand-Sewn Welt",
    text: "Goodyear welted construction, carried out by hand throughout.",
  },
  {
    icon: "history_edu",
    title: "Our Workshop",
    text: "Our shoemaking team makes your footwear in our workshop, overseen throughout.",
  },
  {
    icon: "diamond",
    title: "Material Selection",
    text: "A range of leathers and finishes through our sourcing network, discussed per project.",
  },
];

export function ManufacturingIntro() {
  return (
    <section className="w-full bg-surface py-16 lg:py-24">
      <Container>
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-12">
          <div className="max-w-3xl space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <span className="type-label-sm uppercase tracking-[0.25em] text-secondary">
                Manufacturing &amp; Craft
              </span>
            </div>
            <h1 className="type-headline-xl text-on-surface tracking-tight leading-[1.05]">
              The Anatomy of Hand-Welted Footwear
            </h1>
            <p className="type-body-lg text-on-surface-variant max-w-2xl pt-2">
              In our workshop, our craftsmen cut, last, and weld footwear by hand to your
              agreed specifications, with our team involved at every stage.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 lg:self-end">
            {capacity.map((item) => (
              <div
                key={item.label}
                className="p-4 bg-surface-container-low shadow-xs flex flex-col gap-1 min-w-[200px]"
              >
                <span className="type-label-sm uppercase text-secondary tracking-widest">{item.label}</span>
                <span className="type-headline-sm text-on-surface">{item.value}</span>
                <span className="type-body-sm text-on-surface-variant">{item.note}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pt-10">
          {blueprint.map((item) => (
            <div key={item.title} className="bg-surface-container-lowest p-6 shadow-xs space-y-3">
              <Icon name={item.icon} className="text-secondary text-2xl" />
              <h2 className="type-headline-sm text-on-surface">{item.title}</h2>
              <p className="type-body-sm text-on-surface-variant">{item.text}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
