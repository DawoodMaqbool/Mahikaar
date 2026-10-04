import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { routes } from "@/lib/site";

const steps = [
  {
    icon: "draw",
    title: "Last & Pattern Sculpting",
    text: "We machine-turn or hand-carve dedicated lasts according to your regional anatomical fitting targets, establishing a silhouette signature unique to your house.",
    footnote: "CAD & Hornbeam Models",
  },
  {
    icon: "palette",
    title: "Curated Material Sourcing",
    text: "Direct access to our audited network of French box calf, Italian veg-tanned soling, British Janus calf suede, and local archival vegetable leathers.",
    footnote: "Full Tannery Traceability",
  },
  {
    icon: "verified",
    title: "Prototype Sampling Batch",
    text: "Prior to scaling, we deliver fit-testing trial samples with full cross-sectional reports, wear-testing stress checks, and branded finishing proofs.",
    footnote: "30 to 45 Day Inquest",
  },
  {
    icon: "local_shipping",
    title: "Scaled Made-to-Order",
    text: "Batch production under continuous QA inspection, complete with custom monogrammed cloth bags, archival rigid slide boxes, and worldwide freight handling.",
    footnote: "Air Freight & Maritime FOB",
  },
];

type PrivateLabelTeaserProps = {
  headingLevel?: "h1" | "h2";
  /** The buttons link to the Private Label page, so that page hides them. */
  showActions?: boolean;
};

export function PrivateLabelTeaser({
  headingLevel: Heading = "h2",
  showActions = true,
}: PrivateLabelTeaserProps) {
  return (
    <section className="w-full bg-surface py-20 lg:py-32">
      <Container>
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <p className="type-label-md uppercase tracking-[0.25em] text-secondary">
            Bespoke White-Label Services
          </p>
          <Heading className="type-headline-lg text-on-surface tracking-tight">
            Build Footwear Around Your Brand
          </Heading>
          <p className="type-body-md text-on-surface-variant leading-relaxed">
            From proprietary last sculpting and debossed branded sockliners to custom brass
            packaging hardware, we act as the dedicated manufacturing wing for discerning menswear
            labels and regional luxury brands.
          </p>
        </div>

        <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <li
              key={step.title}
              className="bg-surface-container-low p-8 border border-outline-variant/30 hover:border-secondary transition-colors flex flex-col justify-between h-full"
            >
              <div>
                <div className="flex items-center justify-between mb-8">
                  <span className="type-headline-md text-secondary">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <Icon name={step.icon} className="text-outline text-2xl" />
                </div>
                <h3 className="type-headline-sm text-on-surface mb-3">{step.title}</h3>
                <p className="type-body-sm text-on-surface-variant leading-relaxed">{step.text}</p>
              </div>
              <div className="pt-6 mt-6 border-t border-outline-variant/20 type-label-sm uppercase tracking-widest text-outline">
                {step.footnote}
              </div>
            </li>
          ))}
        </ol>

        {showActions && (
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link
              href={routes.privateLabel}
              className="px-8 py-3.5 bg-primary text-surface type-label-md uppercase tracking-[0.2em] hover:bg-secondary transition-colors"
            >
              Explore Private Label Framework
            </Link>
            <Link
              href={routes.contact}
              className="px-8 py-3.5 bg-transparent text-on-surface type-label-md uppercase tracking-[0.2em] border border-outline-variant hover:border-on-surface transition-colors"
            >
              Inquire About Last Development
            </Link>
          </div>
        )}
      </Container>
    </section>
  );
}
