import { Container } from "@/components/ui/Container";

const additionalOptions = [
  {
    icon: "layers",
    title: "Sole Type & Colour",
    text: "Sole construction and colour chosen to suit the design.",
  },
  {
    icon: "gesture",
    title: "Thread Colour & Type",
    text: "Stitching thread selected to match or contrast with the leather.",
  },
  {
    icon: "hardware",
    title: "Buckles & Accessories",
    text: "Buckles and other accessories, where they suit the design.",
  },
  {
    icon: "palette",
    title: "Leather & Colour Choices",
    text: "Leather, colour and finish agreed from the material options above.",
  },
  {
    icon: "inventory_2",
    title: "Branded Packaging",
    text: "Branded shoe boxes and dust bags can be discussed separately, with available options and costs confirmed for each project.",
  },
  {
    icon: "tune",
    title: "Other Design Adjustments",
    text: "Further feasible adjustments to a style, discussed against your brief.",
  },
];

export function Customisation() {
  return (
    <section
      id="customisation"
      className="w-full bg-surface section-standard scroll-mt-20"
    >
      <Container className="space-y-12">
        <div className="measure-body space-y-4">
          <span className="type-eyebrow uppercase text-secondary">
            Branding &amp; Design
          </span>
          <h2 className="type-headline-lg text-on-surface">
            Private Label &amp; Customisation
          </h2>
          <p className="type-body-md text-on-surface-variant">
            Client branding and selected customisation options can be arranged
            for each project. Availability, feasibility and any additional costs
            are confirmed before production begins.
          </p>
        </div>

        <div className="border-t border-outline-variant pt-6 measure-body">
          <div className="space-y-1">
            <span className="type-eyebrow uppercase text-secondary block">
              Included in the Usual Price
            </span>
            <h3 className="type-headline-sm text-on-surface">
              Client Logo Application
            </h3>
            <p className="type-body-sm text-on-surface-variant leading-relaxed">
              Applying your logo is included in the usual price. Placement and
              method, such as on the insole, are confirmed for each design.
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="type-body-md font-medium text-on-surface">
            Additional Options, Confirmed per Project
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-10 gap-y-10">
            {additionalOptions.map((item) => (
              <div
                key={item.title}
                className="border-t border-outline-variant pt-6 min-w-0 space-y-3"
              >
                <p className="type-eyebrow uppercase text-secondary">
                  {item.title === "Branded Packaging" ? "Branding" : item.title === "Leather & Colour Choices" ? "Materials" : "Footwear Design"}
                </p>
                <h4 className="type-headline-sm text-on-surface">
                  {item.title}
                </h4>
                <p className="type-body-sm text-on-surface-variant leading-relaxed">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>

        <p className="measure-body type-body-sm text-on-surface-variant leading-relaxed">
          Not every option is available for every design. Special materials and
          extraordinary requirements may involve additional costs, which are
          agreed with you before production.
        </p>
      </Container>
    </section>
  );
}
