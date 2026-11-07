import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { benchStages, type BenchStage, type StageMedia } from "@/data/manufacturing";

function MediaFrame({ item, className }: { item: StageMedia; className: string }) {
  return (
    <figure className={`relative w-full overflow-hidden bg-surface-container shadow-inner ${className}`}>
      {item.type === "image" ? (
        <Image
          src={item.src}
          alt={item.alt}
          fill
          sizes="(min-width: 1024px) 55vw, 100vw"
          className="object-cover"
        />
      ) : (
        // Short, muted workshop clips: the viewer starts playback, nothing autoplays.
        <video
          controls
          muted
          playsInline
          preload="metadata"
          poster={item.poster}
          aria-label={item.alt}
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={item.src} />
        </video>
      )}
      {item.caption && (
        <figcaption className="absolute bottom-4 left-4 bg-surface/90 backdrop-blur-md px-3 py-1.5 shadow-xs type-label-sm uppercase tracking-widest text-on-surface pointer-events-none">
          {item.caption}
        </figcaption>
      )}
    </figure>
  );
}

function StageRow({
  stage,
  imageFirst,
  featured,
}: {
  stage: BenchStage;
  imageFirst: boolean;
  featured: boolean;
}) {
  const [lead, ...more] = stage.media ?? [];

  return (
    <li
      className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-center ${
        featured
          ? "bg-surface-container-highest p-8 lg:p-14 shadow-md"
          : "bg-surface-container-lowest p-8 lg:p-12 shadow-xs"
      }`}
    >
      {/* Text always comes first on mobile; on desktop the media alternates sides. */}
      <div
        className={`space-y-4 ${lead ? "lg:col-span-5" : "lg:col-span-12 max-w-3xl"} ${
          lead && imageFirst ? "lg:order-2" : ""
        }`}
      >
        <div className="flex items-center gap-3">
          <span className="type-headline-md text-secondary">{stage.number}</span>
          <span aria-hidden="true" className="w-6 h-px bg-secondary-container" />
          <span className="type-label-sm uppercase tracking-widest text-on-surface-variant">
            {featured ? "Key Stage" : stage.phase}
          </span>
        </div>
        <h3
          className={
            featured
              ? "type-headline-lg text-on-surface leading-tight"
              : "type-headline-md text-on-surface"
          }
        >
          {stage.title}
        </h3>
        <p className="type-label-md uppercase tracking-[0.18em] text-secondary">{stage.subtitle}</p>
        <p className="type-body-md text-on-surface-variant leading-relaxed">{stage.text}</p>
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

      {lead && (
        <div className={`lg:col-span-7 space-y-4 ${imageFirst ? "lg:order-1" : ""}`}>
          <MediaFrame item={lead} className={featured ? "h-[460px]" : "h-[360px]"} />
          {more.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {more.map((item) => (
                <MediaFrame key={item.src} item={item} className="aspect-[4/3]" />
              ))}
            </div>
          )}
        </div>
      )}
    </li>
  );
}

export function BenchProtocol() {
  return (
    <section className="w-full bg-surface-container-low py-20">
      <Container className="space-y-16">
        <div className="max-w-2xl space-y-3">
          <span className="type-label-sm uppercase tracking-[0.2em] text-secondary">
            Our Manufacturing Process
          </span>
          <h2 className="type-headline-lg text-on-surface">From Pattern to Finished Shoe</h2>
          <p className="type-body-md text-on-surface-variant">
            Our shoemaking team works through seven stages in our workshop in Lahore, with
            Goodyear welted construction carried out by hand and each stage overseen by our
            team.
          </p>
        </div>

        <ol className="space-y-12">
          {benchStages.map((stage, index) => (
            <StageRow
              key={stage.number}
              stage={stage}
              imageFirst={index % 2 === 1}
              featured={stage.number === "05"}
            />
          ))}
        </ol>
      </Container>
    </section>
  );
}
