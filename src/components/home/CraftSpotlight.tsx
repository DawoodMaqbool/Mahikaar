import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Icon } from "@/components/ui/Icon";
import { routes } from "@/lib/site";

const pillars = [
  {
    title: "Hand-Stitched Welt",
    text: "The leather welt is stitched by hand, forming the structure of the shoe.",
  },
  {
    title: "Hand Lasting",
    text: "Each upper is shaped over the last by hand to establish its form and proportions.",
  },
  {
    title: "Hand Finishing",
    text: "Soles, heels, and uppers are finished by hand before every pair is inspected.",
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
              alt="Illustration of a craftsman hand-stitching the leather welt on a shoe with an awl and waxed thread"
              width={1200}
              height={896}
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="w-full h-auto object-cover"
            />
            <figcaption className="absolute bottom-6 right-6 bg-ink/90 text-surface p-4 max-w-xs backdrop-blur-xs border border-surface/20">
              <span className="type-label-sm uppercase tracking-widest text-secondary-container block mb-1">
                Hand Welting • Illustration
              </span>
              <span className="type-body-sm text-surface-container font-light block">
                Hand-stitching the leather welt as part of Goodyear welted construction.
              </span>
            </figcaption>
          </figure>

          <div className="lg:col-span-6 space-y-8">
            <div>
              <Eyebrow className="mb-3">Goodyear Welted Construction</Eyebrow>
              <h2 className="type-headline-lg text-on-surface tracking-tight leading-[1.15]">
                The Goodyear Welt, Made by Hand.
              </h2>
            </div>
            <p className="type-body-md text-on-surface-variant leading-relaxed">
              In Goodyear welted construction, the upper is stitched to a leather welt, and the
              welt is then stitched to the sole. Our craftsmen carry out each of these stages by
              hand.
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
                <span>View Manufacturing Process</span>
                <Icon name="arrow_forward" className="text-[16px] group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
