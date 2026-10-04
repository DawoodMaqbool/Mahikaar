import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";

const capacity = [
  { label: "Bench Capacity", value: "320 Pairs / Month", note: "Guild Standard Tolerance" },
  { label: "Last Turnaround", value: "21 Business Days", note: "Proto-Sample to Fit Approval" },
];

const blueprint = [
  {
    icon: "architecture",
    title: "Sculpted Lasts",
    text: "European hornbeam and seasoned beech blanks sculpted to bespoke foot profiles, graded with 1.2mm precision.",
  },
  {
    icon: "verified",
    title: "Hand-Sewn Welt",
    text: "Artisanal 270° and 360° Goodyear storm and flat welting pitched with natural braided Irish flax.",
  },
  {
    icon: "history_edu",
    title: "Lahori Guild Lineage",
    text: "Fourth-generation master clickers and bottom-makers blending historical Punjabi saddlery precision with British lasts.",
  },
  {
    icon: "diamond",
    title: "European Tannages",
    text: "100% full-traceability grain leather sourced directly from Annonay, Haas, Charles F. Stead, and J&FJ Baker.",
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
                Manufacturing Protocol • Folio 04
              </span>
              <span aria-hidden="true" className="w-8 h-px bg-secondary-container" />
              <span className="type-label-sm text-on-surface-variant uppercase tracking-widest">
                Lahore Manufacture
              </span>
            </div>
            <h1 className="type-headline-xl text-on-surface tracking-tight leading-[1.05]">
              The Anatomy of Bespoke Manufacture
            </h1>
            <p className="type-body-lg text-on-surface-variant max-w-2xl pt-2">
              Inside our Lahore atelier, where multi-generational leather artisans cut, last, and
              welt footwear according to traditional European benchcraft standards.
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
