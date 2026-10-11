import Image from "next/image";
import { Container } from "@/components/ui/Container";

const highlights = [
  { label: "Minimum Order", value: "12 Pairs", note: "Per style" },
  { label: "Standard", value: "Goodyear", note: "Welted, made by hand" },
  { label: "Discretion", value: "Confidential", note: "Brand confidentiality respected", wide: true },
];

export function QuoteHero() {
  return (
    <section className="w-full bg-surface-container-low py-16 lg:py-24">
      <Container className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        <div className="lg:col-span-7 space-y-6">
          <div className="flex items-center gap-3">
            <span aria-hidden="true" className="inline-flex w-2 h-2 rounded-full bg-secondary" />
            <span className="type-label-sm uppercase tracking-[0.25em] text-secondary">
              B2B Enquiries • Lahore
            </span>
          </div>
          <h1 className="type-headline-xl text-on-surface leading-[1.08] tracking-tight">
            Commission &amp; <br />
            <span className="italic font-normal text-secondary">Quote Request</span>
          </h1>
          <p className="type-body-lg text-on-surface-variant max-w-2xl leading-relaxed">
            Tell us what you are looking to make. We will review your designs, quantities, sizes,
            materials, and branding requirements, then confirm feasibility, material availability,
            pricing, and estimated timelines before an order is finalised.
          </p>
          <dl className="pt-4 grid grid-cols-2 sm:grid-cols-3 gap-4 text-on-surface">
            {highlights.map((item) => (
              <div
                key={item.label}
                className={`bg-surface p-4 shadow-xs ${item.wide ? "col-span-2 sm:col-span-1" : ""}`}
              >
                <dt className="type-label-sm uppercase tracking-widest text-secondary mb-1">{item.label}</dt>
                <dd>
                  <span className="type-headline-sm">{item.value}</span>
                  <span className="type-body-sm text-on-surface-variant block mt-0.5">{item.note}</span>
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <figure className="lg:col-span-5 bg-surface-container-highest p-3 shadow-md relative">
          <div className="relative aspect-[4/3] w-full overflow-hidden bg-surface-container">
            <Image
              src="/images/atelier/bench-oxford.jpg"
              alt="Hand-burnished brown leather oxford on a walnut workbench beside brass calipers, waxed linen thread and rolled calf hide"
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover transition-transform duration-700 hover:scale-105"
            />
          </div>
          <figcaption className="pt-4 pb-2 px-3 flex items-center justify-between gap-4">
            <span>
              <span className="type-label-sm uppercase tracking-widest text-secondary block">Bench Specimen</span>
              <span className="type-body-sm text-on-surface font-medium">
                Oxford • Constructed by Hand in Lahore
              </span>
            </span>
            <span className="type-label-sm uppercase tracking-widest text-outline">Lahore</span>
          </figcaption>
        </figure>
      </Container>
    </section>
  );
}
