import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { CustomDevelopmentButton } from "@/components/portfolio/CustomDevelopmentButton";

const options = [
  {
    icon: "branding_watermark",
    title: "Insole Branding",
    text: "Your logo or mark on the insole, with the method confirmed for each design.",
  },
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
    icon: "tune",
    title: "Other Design Adjustments",
    text: "Further feasible adjustments to a style, discussed against your brief.",
  },
];

export function Customisation() {
  return (
    <section id="customisation" className="w-full bg-surface py-20 scroll-mt-20">
      <Container className="space-y-12">
        <div className="max-w-3xl space-y-3">
          <span className="type-label-sm uppercase tracking-[0.2em] text-secondary">
            Branding &amp; Design
          </span>
          <h2 className="type-headline-lg text-on-surface">Private Label &amp; Customisation</h2>
          <p className="type-body-md text-on-surface-variant">
            Your branding, agreed customisation and material choices are discussed for each
            project, so every order is made to the specification you approve.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {options.map((item) => (
            <div key={item.title} className="bg-surface-container-lowest p-6 shadow-xs space-y-3">
              <div className="w-9 h-9 rounded-full bg-surface-container flex items-center justify-center">
                <Icon name={item.icon} className="text-secondary text-lg" />
              </div>
              <h3 className="type-headline-sm text-on-surface">{item.title}</h3>
              <p className="type-body-sm text-on-surface-variant leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 space-y-2 type-body-sm text-on-surface-variant leading-relaxed">
            <p>
              Branding and packaging options are confirmed for each order, as not every option is
              available for every design. Unusual, expensive or unavailable materials and
              extraordinary requirements may involve additional costs, which are agreed with you
              before production.
            </p>
          </div>
          <div className="lg:col-span-5 bg-surface-container-low p-6 space-y-4">
            <h3 className="type-headline-sm text-on-surface">Have a Design of Your Own?</h3>
            <p className="type-body-sm text-on-surface-variant leading-relaxed">
              Share a physical sample, reference photograph, technical pack or design idea, and we
              will talk it through with you.
            </p>
            <CustomDevelopmentButton />
          </div>
        </div>
      </Container>
    </section>
  );
}
