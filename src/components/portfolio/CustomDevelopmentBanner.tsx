import { Container } from "@/components/ui/Container";
import { CustomDevelopmentButton } from "./CustomDevelopmentButton";

const stages = [
  { title: "Stage 1: Design Review", text: "We review your references, sizing, and material requirements." },
  { title: "Stage 2: Sample", text: "Selected styles in as little as 2 days; fully custom prototypes in 2–4 weeks." },
  { title: "Stage 3: Approval & Production", text: "Bulk production, typically 4–8 weeks, begins once the sample and terms are agreed." },
];

export function CustomDevelopmentBanner() {
  return (
    <section className="w-full bg-primary-container text-surface py-20">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-8 space-y-6">
            <div className="flex items-center gap-3">
              <span aria-hidden="true" className="inline-block w-2.5 h-2.5 bg-secondary-fixed" />
              <p className="type-label-sm uppercase tracking-[0.24em] text-secondary-container font-semibold">
                Custom Design &amp; Development
              </p>
            </div>
            <h2 className="type-headline-xl text-surface tracking-tight leading-[1.12]">
              Have a Design of Your Own?
            </h2>
            <p className="type-body-lg text-outline-variant max-w-3xl leading-relaxed">
              Share your technical packs, reference sketches, or physical samples. We develop
              your design in our Lahore atelier around your brand&apos;s fit profile,
              from single prototypes to recurring seasonal orders.
            </p>
            <ol className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2">
              {stages.map((stage) => (
                <li key={stage.title} className="space-y-1">
                  <h3 className="type-label-md text-secondary-container uppercase tracking-wider">
                    {stage.title}
                  </h3>
                  <p className="type-body-sm text-outline-variant/80">{stage.text}</p>
                </li>
              ))}
            </ol>
          </div>

          <div className="lg:col-span-4 flex flex-col gap-4">
            <div className="p-8 bg-[#252422] shadow-md space-y-6">
              <div className="space-y-2">
                <p className="type-label-sm uppercase tracking-widest text-secondary-fixed">
                  Direct B2B Channel
                </p>
                <h3 className="type-headline-sm text-surface">Confidential Development</h3>
                <p className="type-body-sm text-outline-variant leading-relaxed">
                  Your designs and branding are treated as confidential, and non-disclosure
                  agreements can be arranged on request.
                </p>
              </div>
              <CustomDevelopmentButton />
              <p className="text-center type-label-sm uppercase tracking-widest text-outline-variant/60">
                Custom prototypes typically take 2–4 weeks
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
