import Image from "next/image";
import { Container } from "@/components/ui/Container";

const highlights = [
  { label: "Minimum Order", value: "12 Pairs", note: "Per design & colour" },
  { label: "Standard", value: "Goodyear", note: "Welted, made by hand" },
  { label: "Production", value: "Our Workshop", note: "Overseen by our team throughout", wide: true },
];

export function QuoteHero() {
  return (
    <section className="w-full bg-surface-container-low section-standard">
      <Container className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        <div className="lg:col-span-7 min-w-0 space-y-6">
          <h1 className="type-headline-xl text-on-surface measure-headline">
            Tell Us About Your Footwear Project
          </h1>
          <p className="type-body-lg text-on-surface-variant measure-intro">
            Share your footwear requirements, custom design or private-label production brief.
            You do not need a complete technical specification or technical pack to get started;
            our team can discuss your design, quantity and production needs with you.
          </p>
          <dl className="pt-6 grid grid-cols-1 md:grid-cols-3 gap-6 text-on-surface">
            {highlights.map((item) => (
              <div
                key={item.label}
                className="min-w-0 border-t border-outline-variant pt-4"
              >
                <dt className="type-eyebrow uppercase text-secondary mb-2">{item.label}</dt>
                <dd>
                  <span className="type-headline-sm">{item.value}</span>
                  <span className="type-body-sm text-on-surface-variant block mt-0.5">{item.note}</span>
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <figure className="lg:col-span-5 min-w-0 space-y-4">
          <div className="relative aspect-[4/3] w-full overflow-hidden bg-surface-container-low">
            <Image
              src="/images/atelier/bench-oxford.jpg"
              alt="Hand-burnished brown leather oxford on a walnut workbench beside brass calipers, waxed linen thread and rolled calf hide"
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-contain"
            />
          </div>
          <figcaption className="flex items-center justify-between gap-4">
            <span>
              <span className="type-eyebrow uppercase text-secondary block">Illustration</span>
              <span className="type-body-sm text-on-surface font-medium">
                Oxford • Constructed by Hand
              </span>
            </span>
          </figcaption>
        </figure>
      </Container>
    </section>
  );
}
