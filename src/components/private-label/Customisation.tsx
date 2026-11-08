import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";

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
      className="w-full bg-surface py-20 scroll-mt-20"
    >
      <Container className="space-y-12">
        <div className="max-w-3xl space-y-3">
          <span className="type-label-sm uppercase tracking-[0.2em] text-secondary">
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

        <div className="bg-surface-container-low p-6 lg:p-8 border-l-2 border-secondary flex items-start gap-4">
          <Icon name="branding_watermark" className="text-secondary text-2xl" />
          <div className="space-y-1">
            <span className="type-label-sm uppercase tracking-widest text-secondary block">
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
          <h3 className="type-label-md uppercase tracking-[0.2em] text-on-surface">
            Additional Options, Confirmed per Project
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {additionalOptions.map((item) => (
              <div
                key={item.title}
                className="bg-surface-container-lowest p-6 shadow-xs space-y-3"
              >
                <div className="w-9 h-9 rounded-full bg-surface-container flex items-center justify-center">
                  <Icon name={item.icon} className="text-secondary text-lg" />
                </div>
                <h3 className="type-headline-sm text-on-surface">
                  {item.title}
                </h3>
                <p className="type-body-sm text-on-surface-variant leading-relaxed">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>

        <p className="max-w-3xl type-body-sm text-on-surface-variant leading-relaxed">
          Not every option is available for every design. Special materials and
          extraordinary requirements may involve additional costs, which are
          agreed with you before production.
        </p>
      </Container>
    </section>
  );
}
