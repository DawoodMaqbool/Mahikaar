import { Container } from "@/components/ui/Container";

export function PrivateLabelIntro() {
  return (
    <section className="w-full bg-surface pt-20 lg:pt-32 pb-8 lg:pb-12">
      <Container>
        <div className="text-center max-w-3xl mx-auto space-y-5">
          <p className="type-label-md uppercase tracking-[0.25em] text-secondary">
            Private Label
          </p>
          <h1 className="type-headline-lg lg:type-headline-xl text-on-surface tracking-tight">
            Private Label Manufacturing
          </h1>
          <p className="type-body-lg text-on-surface-variant leading-relaxed">
            We make Goodyear welted footwear to order for international menswear labels and
            boutique brands. Our shoemaking team constructs each pair by hand, to your design,
            materials and branding.
          </p>
        </div>
      </Container>
    </section>
  );
}
