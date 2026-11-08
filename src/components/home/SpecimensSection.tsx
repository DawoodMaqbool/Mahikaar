import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { portfolioSpecimens } from "@/data/portfolio";
import { routes } from "@/lib/site";

type Specimen = {
  number: string;
  /** Portfolio specimen whose photograph is reused, so the homepage and portfolio never drift apart. */
  portfolioNumber: string;
  image: string;
  alt: string;
  tags: [string, string];
  name: string;
  description: string;
  leadTime: string;
};

type Featured = Omit<Specimen, "image" | "alt">;

const featured: Featured[] = [
  {
    number: "01",
    portfolioNumber: "07",
    tags: ["Goodyear Welted", "White & Black"],
    name: "Spectator Brogue",
    description:
      "A two-tone wingtip brogue with contrasting panels and decorative perforation, shown in white and black.",
    leadTime: "2–4 Wks",
  },
  {
    number: "02",
    portfolioNumber: "03",
    tags: ["Goodyear Welted", "Dark Brown"],
    name: "Full Brogue Wingtip",
    description:
      "A classic full brogue with a wing-shaped toe cap and decorative perforation, shown in dark brown.",
    leadTime: "2–4 Wks",
  },
  {
    number: "03",
    portfolioNumber: "09",
    tags: ["Goodyear Welted", "Burgundy"],
    name: "Woven Penny Loafer",
    description:
      "A penny loafer with a woven leather vamp and a smooth leather strap, shown in burgundy.",
    leadTime: "2–4 Wks",
  },
  {
    number: "04",
    portfolioNumber: "08",
    tags: ["Goodyear Welted", "Dark Brown"],
    name: "Wingtip Zip Boot",
    description:
      "A side-zip wingtip ankle boot with a chiselled toe and decorative perforation, shown in dark brown grained leather.",
    leadTime: "2–4 Wks",
  },
];

/** Photograph and alt text come straight from the Footwear Portfolio records. */
const specimens: Specimen[] = featured.flatMap((item) => {
  const source = portfolioSpecimens.find((entry) => entry.number === item.portfolioNumber);
  return source ? [{ ...item, image: source.image, alt: source.alt }] : [];
});

function SpecimenCard({ specimen }: { specimen: Specimen }) {
  return (
    <article className="group bg-surface border border-outline-variant/50 flex flex-col justify-between hover:border-secondary transition-all duration-300">
      <div>
        <div className="relative bg-surface-container-low aspect-[4/3] overflow-hidden p-6">
          <div className="relative w-full h-full">
            <Image
              src={specimen.image}
              alt={specimen.alt}
              fill
              sizes="(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw"
              className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
            />
          </div>
          <span className="absolute top-4 left-4 type-label-sm tracking-widest text-outline uppercase bg-surface/90 px-2 py-0.5 border border-outline-variant/40">
            Specimen {specimen.number}
          </span>
        </div>

        <div className="p-6 space-y-3">
          <div className="flex items-center justify-between gap-3 text-outline">
            {specimen.tags.map((tag) => (
              <span key={tag} className="type-label-sm uppercase tracking-wider">
                {tag}
              </span>
            ))}
          </div>
          <h3 className="type-headline-sm text-on-surface group-hover:text-secondary transition-colors">
            {specimen.name}
          </h3>
          <p className="type-body-sm text-on-surface-variant leading-relaxed">
            {specimen.description}
          </p>
        </div>
      </div>

      <div className="px-6 pb-6 pt-2 border-t border-outline-variant/20 flex items-center justify-between">
        <span className="type-label-sm uppercase tracking-wider text-outline">
          Bulk Lead Time: {specimen.leadTime}
        </span>
        <Link
          href={routes.portfolio}
          className="type-label-sm uppercase tracking-widest text-secondary hover:text-on-surface font-semibold inline-flex items-center gap-1"
        >
          View Style →<span className="sr-only">: {specimen.name} in the portfolio</span>
        </Link>
      </div>
    </article>
  );
}

export function SpecimensSection() {
  return (
    <section id="specimens" className="w-full bg-surface-container-lowest py-20 lg:py-32 scroll-mt-20">
      <Container>
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <Eyebrow className="mb-3">Reference Styles</Eyebrow>
            <h2 className="type-headline-lg text-on-surface tracking-tight">
              Footwear Portfolio
            </h2>
            <p className="type-body-md text-on-surface-variant max-w-xl mt-2">
              Reference styles for custom private-label production. Materials, colours and
              customisation are confirmed with you before an order is finalised.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href={routes.portfolio}
              className="px-5 py-2.5 bg-surface-container text-on-surface type-label-md uppercase tracking-[0.16em] hover:bg-primary hover:text-surface transition-colors border border-outline-variant/40"
            >
              View Full Portfolio →
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {specimens.map((specimen) => (
            <SpecimenCard key={specimen.number} specimen={specimen} />
          ))}
        </div>
      </Container>
    </section>
  );
}
