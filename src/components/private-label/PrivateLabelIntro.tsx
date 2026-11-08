import { Container } from "@/components/ui/Container";

export function PrivateLabelIntro() {
  return (
    <section className="w-full bg-surface section-standard">
      <Container>
        <div className="measure-body space-y-6">
          <p className="type-eyebrow uppercase text-secondary">
            Private Label
          </p>
          <h1 className="type-headline-xl text-on-surface measure-headline">
            Footwear for Your Brand
          </h1>
          <p className="type-body-lg text-on-surface-variant measure-intro">
            We make Goodyear welted footwear to order for international menswear labels and
            boutique brands. Our shoemaking team constructs each pair by hand, to your design,
            materials and branding.
          </p>
        </div>
      </Container>
    </section>
  );
}
