import { Container } from "@/components/ui/Container";
import { CustomDevelopmentButton } from "./CustomDevelopmentButton";

const stages = [
  { title: "Stage 1: Last Carving", text: "3D scan translation & precision beechwood test carving." },
  { title: "Stage 2: Trial Pull-Over", text: "Rough fitting specimen dispatched within 18 days." },
  { title: "Stage 3: Vault Archival", text: "Permanent last indexing under your label code." },
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
                Custom Last &amp; Graded Patternmaking
              </p>
            </div>
            <h2 className="type-headline-xl text-surface tracking-tight leading-[1.12]">
              Have a Design of Your Own?
            </h2>
            <p className="type-body-lg text-outline-variant max-w-3xl leading-relaxed">
              Share your technical packs, reference sketches, or physical samples. Our patternmakers
              in Lahore engineer custom lasts and graded patterns tailored to your brand&apos;s fit
              profile. From single prototypes to recurring seasonal runs.
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
                <h3 className="type-headline-sm text-surface">Confidential Specimen Protocol</h3>
                <p className="type-body-sm text-outline-variant leading-relaxed">
                  Full non-disclosure protection. Complete white-label exclusivity across Europe,
                  North America, and the Gulf.
                </p>
              </div>
              <CustomDevelopmentButton />
              <p className="text-center type-label-sm uppercase tracking-widest text-outline-variant/60">
                Avg. Master Pattern Turnaround: 14 Business Days
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
