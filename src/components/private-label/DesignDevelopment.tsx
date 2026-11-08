import { Container } from "@/components/ui/Container";
import { CustomDevelopmentButton } from "@/components/portfolio/CustomDevelopmentButton";

export function DesignDevelopment() {
  return (
    <section id="your-own-design" className="w-full bg-surface-container-low py-16 lg:py-20 scroll-mt-20">
      <Container>
        <div className="max-w-3xl mx-auto text-center space-y-5">
          <h2 className="type-headline-lg text-on-surface tracking-tight">
            Develop Your Own Footwear Design
          </h2>
          <p className="type-body-md text-on-surface-variant leading-relaxed">
            Have an existing shoe, technical pack, reference photograph or original concept? Share
            it with our team. We will review the design, materials, fit requirements and production
            feasibility before moving to sample development.
          </p>
          <div className="pt-2 max-w-md mx-auto">
            <CustomDevelopmentButton />
          </div>
        </div>
      </Container>
    </section>
  );
}
