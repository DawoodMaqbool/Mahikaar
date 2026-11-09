import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { catalogueHref, portfolioSpecimens, styleCategories } from "@/data/portfolio";
import { routes } from "@/lib/site";

const featured = [
  { portfolioNumber: "07", name: "Spectator Brogue", colour: "White & Black" },
  { portfolioNumber: "03", name: "Full Brogue Wingtip", colour: "Dark Brown" },
  { portfolioNumber: "09", name: "Woven Loafer", colour: "Burgundy" },
  { portfolioNumber: "04", name: "Chelsea Boot", colour: "Dark Chocolate Suede" },
];

/** Keep catalogue photographs and alt text as the source of truth. */
const specimens = featured.flatMap((item) => {
  const source = portfolioSpecimens.find((entry) => entry.number === item.portfolioNumber);
  const category = styleCategories.find((entry) => entry.numbers.includes(item.portfolioNumber));
  return source ? [{ ...item, href: catalogueHref(category?.id, source.slug, source.colourways?.[0]?.id), image: source.image, alt: source.alt, leadTime: source.leadTime }] : [];
});

export function SpecimensSection() {
  return (
    <section id="specimens" className="w-full bg-surface section-standard scroll-mt-20">
      <Container>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 lg:mb-12">
          <div className="space-y-4 min-w-0">
            <Eyebrow>Reference Styles</Eyebrow>
            <h2 className="type-headline-lg text-on-surface">Footwear Portfolio</h2>
            <p className="type-body-md text-on-surface-variant measure-body">
              A starting point for your range. Materials, colours and customisation are
              confirmed with you before an order is finalised.
            </p>
          </div>
          <Link href={routes.portfolio} className="editorial-link type-body-sm inline-flex min-h-12 items-center shrink-0">
            View Full Portfolio
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-x-6 gap-y-10">
          {specimens.map((specimen) => (
            <article key={specimen.portfolioNumber} className="min-w-0">
              <Link href={specimen.href} aria-label={`View ${specimen.name}`} className="block relative aspect-[4/3] bg-surface-container-low overflow-hidden focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-secondary">
                <Image
                  src={specimen.image}
                  alt={specimen.alt}
                  fill
                  sizes="(min-width: 1440px) 318px, (min-width: 1280px) 25vw, (min-width: 768px) 50vw, calc(100vw - 48px)"
                  className="object-contain"
                />
              </Link>
              <div className="pt-5 space-y-2">
                <h3 className="type-headline-sm text-on-surface">{specimen.name}</h3>
                <p className="type-body-sm text-on-surface-variant">{specimen.colour}</p>
                <p className="type-body-sm text-on-surface-variant">Bulk lead time: {specimen.leadTime}</p>
                <Link href={specimen.href} className="editorial-link type-body-sm inline-flex min-h-12 items-center">
                  View Style<span className="sr-only">: {specimen.name} in the portfolio</span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
