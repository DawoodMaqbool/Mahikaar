import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Icon } from "@/components/ui/Icon";
import { routes } from "@/lib/site";

const pillars = [
  {
    title: "Hand-Stitched Welt",
    text: "A leather welt stitched by hand to the insole rib, forming the structure that makes resoling possible.",
  },
  {
    title: "Cork Filling",
    text: "Natural cork filling between insole and outsole that moulds gradually to the wearer's footprint.",
  },
  {
    title: "Fiddleback Waist",
    text: "A hand-sculpted, bevelled waist available for a refined, elegant silhouette.",
  },
];

export function CraftSpotlight() {
  return (
    <section className="w-full bg-surface-container-low py-20 lg:py-32 border-y border-outline-variant/30">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <figure className="lg:col-span-6 relative bg-surface p-3 border border-outline-variant/40 shadow-lg">
            <Image
              src="/images/process/welt-hand-stitching.png"
              alt="Craftsman hand-stitching the Goodyear welt rib with an awl and waxed thread in a Lahore atelier"
              width={1200}
              height={896}
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="w-full h-auto object-cover"
            />
            <figcaption className="absolute bottom-6 right-6 bg-ink/90 text-surface p-4 max-w-xs backdrop-blur-xs border border-surface/20">
              <span className="type-label-sm uppercase tracking-widest text-secondary-container block mb-1">
                Technique #24
              </span>
              <span className="type-body-sm text-surface-container font-light block">
                Hand-stitching the leather welt through the holdfast rib of the insole.
              </span>
            </figcaption>
          </figure>

          <div className="lg:col-span-6 space-y-8">
            <div>
              <Eyebrow className="mb-3">Goodyear Welted Construction</Eyebrow>
              <h2 className="type-headline-lg text-on-surface tracking-tight leading-[1.15]">
                Built to Be Resoled: The Goodyear Welt.
              </h2>
            </div>
            <p className="type-body-md text-on-surface-variant leading-relaxed">
              Unlike mass-market footwear held together with cement, Mahikaar footwear is built
              with classical Goodyear welted construction, carried out by hand throughout. The
              upper, insole rib, and welt are stitched together, allowing your customers to
              resole and maintain their pairs for years.
            </p>

            <ol className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 border-t border-outline-variant/30">
              {pillars.map((pillar, index) => (
                <li key={pillar.title} className="space-y-2">
                  <span className="type-headline-sm text-on-surface block">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="type-label-md uppercase tracking-wider text-on-surface">
                    {pillar.title}
                  </h3>
                  <p className="type-body-sm text-outline">{pillar.text}</p>
                </li>
              ))}
            </ol>

            <div className="pt-4 flex items-center gap-6">
              <Link
                href={routes.manufacturing}
                className="px-7 py-3.5 bg-primary text-surface type-label-md uppercase tracking-[0.2em] hover:bg-secondary transition-colors inline-flex items-center gap-2 group"
              >
                <span>Explore Our Craft</span>
                <Icon name="arrow_forward" className="text-[16px] group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
