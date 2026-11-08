import { Container } from "@/components/ui/Container";
import { CustomDevelopmentButton } from "./CustomDevelopmentButton";

export function CustomDevelopmentBanner() {
  return (
    <section className="w-full bg-ink text-surface section-standard">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-8 min-w-0 space-y-6">
            <div className="flex items-center gap-3">
              <p className="type-eyebrow uppercase text-outline-variant">
                Custom Design &amp; Development
              </p>
            </div>
            <h2 className="type-headline-lg text-surface">
              Have a Design of Your Own?
            </h2>
            <p className="type-body-lg text-outline-variant max-w-3xl leading-relaxed">
              Share your technical packs, reference sketches, or physical samples. We develop
              your design around your brand&apos;s fit profile, from a single sample to
              recurring seasonal orders.
              Samples typically take approximately 2–3 weeks.
            </p>
          </div>

          <div className="lg:col-span-4 min-w-0 flex flex-col gap-4">
            <div className="space-y-6">
              <div className="space-y-2">
                <p className="type-eyebrow uppercase text-outline-variant">
                  Private Label Enquiries
                </p>
                <h3 className="type-headline-sm text-surface">Starting Your Design</h3>
                <p className="type-body-sm text-outline-variant leading-relaxed">
                  Share a physical sample, reference photograph, technical pack or design idea,
                  and we will talk it through with you.
                </p>
              </div>
              <CustomDevelopmentButton editorial />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
