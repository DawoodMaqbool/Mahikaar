import Image from "next/image";
import { Fragment } from "react";
import { Container } from "@/components/ui/Container";
import { benchStages, type BenchStage } from "@/data/manufacturing";

function StageRow({ stage, imageFirst }: { stage: BenchStage; imageFirst: boolean }) {
  return (
    <li className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-surface-container-lowest p-8 lg:p-12 shadow-xs">
      {/* Text always comes first on mobile; on desktop the image alternates sides. */}
      <div className={`lg:col-span-5 space-y-4 ${imageFirst ? "lg:order-2" : ""}`}>
        <div className="flex items-center gap-3">
          <span className="type-headline-md text-secondary">{stage.number}</span>
          <span aria-hidden="true" className="w-6 h-px bg-secondary-container" />
          <span className="type-label-sm uppercase tracking-widest text-on-surface-variant">
            {stage.phase}
          </span>
        </div>
        <h3 className="type-headline-md text-on-surface">{stage.title}</h3>
        <p className="type-body-md text-on-surface-variant">{stage.text}</p>
        <ul className="pt-2 flex flex-wrap gap-2">
          {stage.tags.map((tag) => (
            <li
              key={tag}
              className="px-3 py-1 bg-surface-container text-on-surface type-label-sm uppercase tracking-wider"
            >
              {tag}
            </li>
          ))}
        </ul>
      </div>

      <figure className={`lg:col-span-7 ${imageFirst ? "lg:order-1" : ""}`}>
        <div className="relative w-full h-[360px] bg-surface-container overflow-hidden shadow-inner">
          <Image
            src={stage.image}
            alt={stage.alt}
            fill
            sizes="(min-width: 1024px) 55vw, 100vw"
            className="object-cover"
          />
          <figcaption className="absolute bottom-4 left-4 bg-surface/90 backdrop-blur-md px-3 py-1.5 shadow-xs type-label-sm uppercase tracking-widest text-on-surface">
            {stage.caption}
          </figcaption>
        </div>
      </figure>
    </li>
  );
}

const weltCallouts = [
  { label: "Thread Material", value: "Waxed Linen", text: "Braided flax soaked in pine rosin and beeswax." },
  { label: "Insole Anchor", value: "Carved Feather", text: "Hand-channeled solid leather insole holdfast." },
  { label: "Stitch Density", value: "10 SPI Density", text: "Evenly spaced with hand awl guide pricks." },
  { label: "Welt Profile", value: "270° / 360° Options", text: "Flat welt, reverse storm welt, or Norwegian." },
];

/** Stage 05 gets a larger feature treatment: the welt is the centrepiece of the process. */
function WeltFeatureStage() {
  return (
    <li className="bg-surface-container-highest p-8 lg:p-14 shadow-md">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-5 space-y-5">
          <div className="flex items-center gap-3">
            <span className="type-headline-md text-secondary">05 • ARCHIVAL FOCUS</span>
            <span aria-hidden="true" className="w-8 h-px bg-secondary" />
          </div>
          <h3 className="type-headline-lg lg:type-headline-xl text-on-surface leading-tight">
            The Goodyear Welt &amp; Hand Stitching
          </h3>
          <p className="type-body-md text-on-surface-variant leading-relaxed">
            The defining signature of benchmade longevity. A 3.5mm thick vegetable-tanned leather
            welt strip is hand-stitched directly through the insole&apos;s carved holdfast feather
            using pitch-impregnated braided linen thread, creating an impenetrable water barrier
            while ensuring lifetime resolability.
          </p>
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            {weltCallouts.map((item) => (
              <div key={item.label} className="bg-surface-container-lowest p-4 shadow-xs">
                <dt className="type-label-sm text-secondary uppercase tracking-wider">{item.label}</dt>
                <dd>
                  <span className="type-headline-sm text-on-surface">{item.value}</span>
                  <p className="type-body-sm text-on-surface-variant pt-1">{item.text}</p>
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="lg:col-span-7">
          <div className="relative w-full h-[460px] bg-surface-container-low overflow-hidden shadow-lg">
            <Image
              src="/images/process/welt-hand-stitching.png"
              alt="Artisan shoemaker hands sewing the leather welt onto a dress shoe using a hand awl and waxed thread, workshop tools around on timber table"
              fill
              sizes="(min-width: 1024px) 55vw, 100vw"
              className="object-cover"
            />
            <span className="absolute top-4 right-4 bg-primary text-on-primary px-3 py-1.5 shadow-xs type-label-sm uppercase tracking-widest">
              Master Cobbler • Bench Station 02
            </span>
            <div className="absolute bottom-4 left-4 right-4 sm:right-auto bg-surface/95 backdrop-blur-md p-4 max-w-md shadow-xs">
              <span className="type-label-sm uppercase tracking-widest text-secondary block">
                Macro Specification
              </span>
              <p className="type-body-sm text-on-surface">
                Hand-curved curved awl puncture passing through insole rib, upper edge, and
                exterior welt strip in a single continuous strike.
              </p>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
}

export function BenchProtocol() {
  return (
    <section className="w-full bg-surface-container-low py-20">
      <Container className="space-y-16">
        <div className="max-w-2xl space-y-3">
          <span className="type-label-sm uppercase tracking-[0.2em] text-secondary">
            The Chronology of Craft
          </span>
          <h2 className="type-headline-lg text-on-surface">The 8-Stage Bench Protocol</h2>
          <p className="type-body-md text-on-surface-variant">
            Every commission follows an uncompromising eight-tier sequence taking upwards of 36
            bench hours. No pre-formed plastic components or synthetic fillers ever enter the
            manufacture floor.
          </p>
        </div>

        <ol className="space-y-12">
          {benchStages.map((stage, index) => (
            <Fragment key={stage.number}>
              <StageRow stage={stage} imageFirst={index % 2 === 1} />
              {stage.number === "04" && <WeltFeatureStage />}
            </Fragment>
          ))}
        </ol>
      </Container>
    </section>
  );
}
