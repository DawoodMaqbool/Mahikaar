import { Container } from "@/components/ui/Container";

const capacity = [
  { label: "Minimum Order", value: "12 Pairs", note: "Per design & colour" },
  { label: "Bulk Production", value: "2–4 Weeks", note: "After sample approval" },
];

const blueprint = [
  {
    icon: "architecture",
    title: "Sizing & Fit",
    text: "Standard UK size references from 6–12. Other sizing and fit requirements can be discussed for individual projects.",
  },
  {
    icon: "verified",
    title: "Hand-Stitched Welt",
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
    text: "A range of leathers and finishes, discussed per project.",
  },
];

export function ManufacturingIntro() {
  return (
    <section className="w-full bg-surface section-standard">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 pb-12">
          <div className="lg:col-span-8 min-w-0 space-y-6">
            <div className="flex flex-wrap items-center gap-3">
              <span className="type-eyebrow uppercase text-secondary">
                Manufacturing &amp; Craft
              </span>
            </div>
            <h1 className="type-headline-xl text-on-surface measure-headline">
              How We Make Goodyear Welted Footwear
            </h1>
            <p className="type-body-lg text-on-surface-variant measure-intro">
              In our Lahore workshop, our craftsmen cut, prepare, last and construct footwear by hand.
              Our team remains involved throughout the process, from the initial pattern to final
              inspection.
            </p>
          </div>

          <div className="lg:col-span-4 min-w-0 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6 lg:self-end">
            {capacity.map((item) => (
              <div
                key={item.label}
                className="border-t border-outline-variant pt-5 min-w-0 flex flex-col gap-2"
              >
                <span className="type-eyebrow uppercase text-secondary">{item.label}</span>
                <span className="type-headline-sm text-on-surface">{item.value}</span>
                <span className="type-body-sm text-on-surface-variant">{item.note}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-x-8 gap-y-10 pt-6">
          {blueprint.map((item) => (
            <div key={item.title} className="min-w-0 border-t border-outline-variant pt-6 space-y-3">
              <h2 className="type-headline-sm text-on-surface">{item.title}</h2>
              <p className="type-body-sm text-on-surface-variant">{item.text}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
