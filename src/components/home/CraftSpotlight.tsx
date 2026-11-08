import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
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
    <section className="w-full bg-surface section-major">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <figure className="lg:col-span-6 min-w-0 space-y-4">
            <Image
              src="/images/process/welt-hand-stitching.png"
              alt="Illustration of a craftsman hand-stitching the leather welt on a shoe with an awl and waxed thread"
              width={1200}
              height={896}
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="w-full h-auto"
            />
            <figcaption className="space-y-1">
              <span className="type-eyebrow uppercase text-secondary block">
                Hand Welting • Illustration
              </span>
              <span className="type-body-sm text-on-surface-variant block">
                Hand-stitching the leather welt as part of Goodyear welted construction.
              </span>
            </figcaption>
          </figure>

          <div className="lg:col-span-6 min-w-0 space-y-8">
            <div>
              <Eyebrow className="mb-3">Goodyear Welted Construction</Eyebrow>
              <h2 className="type-headline-lg text-on-surface">
                The Goodyear Welt, Made by Hand.
              </h2>
            </div>
            <p className="type-body-md text-on-surface-variant leading-relaxed">
              In Goodyear welted construction, the upper is stitched to a leather welt, and the
              welt is then stitched to the sole. Our craftsmen carry out each of these stages by
              hand.
            </p>

            <ol className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3 gap-6 pt-4 border-t border-outline-variant/30">
              {pillars.map((pillar, index) => (
                <li key={pillar.title} className="space-y-2">
                  <span className="type-headline-sm text-on-surface block">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="type-label-md uppercase tracking-wider text-on-surface">
                    {pillar.title}
                  </h3>
                  <p className="type-body-sm text-on-surface-variant">{pillar.text}</p>
                </li>
              ))}
            </ol>

            <div className="pt-4 flex items-center gap-6">
              <Link
                href={routes.manufacturing}
                className="editorial-link type-body-sm inline-flex min-h-12 items-center"
              >
                <span>View Manufacturing Process</span>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
