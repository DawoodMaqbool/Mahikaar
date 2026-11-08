import { Container } from "@/components/ui/Container";
import { CustomDevelopmentButton } from "@/components/portfolio/CustomDevelopmentButton";

export function DesignDevelopment() {
  return (
    <section id="your-own-design" className="w-full bg-ink text-surface section-standard scroll-mt-20">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          <h2 className="lg:col-span-5 type-headline-lg text-surface">
            Develop Your Own Footwear Design
          </h2>
          <div className="lg:col-span-7 min-w-0 space-y-6">
            <p className="type-body-md text-outline-variant measure-body">
              Have an existing shoe, technical pack, reference photograph or original concept? Share
              it with our team. We will review the design, materials, fit requirements and production
              feasibility before moving to sample development.
            </p>
            <div className="pt-2 max-w-md">
              <CustomDevelopmentButton editorial />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
