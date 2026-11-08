import Image from "next/image";
import { Container } from "@/components/ui/Container";
import {
  benchStages,
  type BenchStage,
  type StageMedia,
} from "@/data/manufacturing";

function MediaFrame({
  item,
  className,
}: {
  item: StageMedia;
  className: string;
}) {
  const isIllustration = item.kind === "illustration";
  return (
    <figure className="space-y-2">
      <div
        className={`relative w-full overflow-hidden bg-surface-container-lowest ${className}`}
      >
        {item.type === "image" ? (
          <Image
            src={item.src}
            alt={isIllustration ? `Illustration: ${item.alt}` : item.alt}
            fill
            sizes="(min-width: 1024px) 55vw, 100vw"
            className="object-contain"
          />
        ) : (
          // Short, muted workshop clips: the viewer starts playback, nothing autoplays.
          <video
            controls
            muted
            playsInline
            preload="metadata"
            poster={item.poster}
            aria-label={isIllustration ? `Illustration: ${item.alt}` : item.alt}
            className="absolute inset-0 w-full h-full object-contain"
          >
            <source src={item.src} />
          </video>
        )}
      </div>
      {(item.caption || isIllustration) && (
        <figcaption className="type-body-sm text-on-surface-variant flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <span className="type-eyebrow uppercase text-secondary">
            {isIllustration ? "Illustration" : "Workshop"}
          </span>
          {item.caption && <span>{item.caption}</span>}
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
      className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center border-t border-outline-variant pt-10 lg:pt-12"
    >
      {/* Text always comes first on mobile; on desktop the media alternates sides. */}
      <div
        className={`min-w-0 space-y-5 ${lead ? "lg:col-span-5" : "lg:col-span-12 measure-body"} ${
          lead && imageFirst ? "lg:order-2" : ""
        }`}
      >
        <div className="flex items-center gap-3">
          <span className="type-headline-md text-secondary">
            {stage.number}
          </span>
          <span className="type-eyebrow uppercase text-on-surface-variant">
            {featured ? "Key Stage" : stage.phase}
          </span>
        </div>
        <h3
          className={
            featured
              ? "type-headline-lg text-on-surface"
              : "type-headline-md text-on-surface"
          }
        >
          {stage.title}
        </h3>
        <p className="type-body-sm text-secondary">
          {stage.subtitle}
        </p>
        <p className="type-body-md text-on-surface-variant leading-relaxed">
          {stage.text}
        </p>
        <ul className="pt-2 flex flex-wrap gap-x-5 gap-y-2">
          {stage.tags.map((tag) => (
            <li
              key={tag}
              className="type-body-sm text-on-surface-variant"
            >
              {tag}
            </li>
          ))}
        </ul>
      </div>

      {lead && (
        <div
          className={`lg:col-span-7 min-w-0 space-y-4 ${imageFirst ? "lg:order-1" : ""}`}
        >
          <MediaFrame
            item={lead}
            className="aspect-[4/3]"
          />
          {more.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {more.map((item) => (
                <MediaFrame
                  key={item.src}
                  item={item}
                  className="aspect-[4/3]"
                />
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
    <section className="w-full bg-surface-container-low section-standard">
      <Container className="space-y-16">
        <div className="measure-body space-y-4">
          <span className="type-eyebrow uppercase text-secondary">
            Our Manufacturing Process
          </span>
          <h2 className="type-headline-lg text-on-surface">
            From Pattern to Finished Shoe
          </h2>
          <p className="type-body-md text-on-surface-variant">
            Our shoemaking team works through seven stages in our workshop, with
            Goodyear welted construction carried out by hand and each stage
            overseen by our team.
          </p>
          <p className="type-body-sm text-on-surface-variant">
            The images below are illustrations of each stage. Photographs and
            videos from our workshop, including your own order in progress, can be provided on
            request.
          </p>
        </div>

        <ol className="space-y-12 lg:space-y-20">
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
