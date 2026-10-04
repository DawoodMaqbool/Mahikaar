import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Icon } from "@/components/ui/Icon";
import { routes } from "@/lib/site";

type Specimen = {
  number: string;
  last: string;
  image: string;
  alt: string;
  tags: [string, string];
  name: string;
  description: string;
  leadTime: string;
};

const specimens: Specimen[] = [
  {
    number: "01",
    last: "AT-084 (Almond)",
    image: "/images/atelier/workshop-cap-toe-oxford.png",
    alt: "The Belgrave Cap-Toe Oxford in Antique Cognac Museum Calf",
    tags: ["Goodyear Welted 270°", "Hand-Stitched Cap"],
    name: "The Belgrave Oxford",
    description:
      "Antique cognac museum calf, hand-bevelled waist, closed-channel oak bark sole with recessed brass toe plate.",
    leadTime: "5 Wks",
  },
  {
    number: "02",
    last: "AT-062 (Round)",
    image: "/images/products/penny-loafer.png",
    alt: "The Montgomery Penny Loafer in Espresso French Box Calf on stone pedestal",
    tags: ["Hand-Sewn Apron", "Brass Toe Tap"],
    name: "The Montgomery Penny Loafer",
    description:
      "Espresso French box calfskin, flush brass architectural toe reinforcement, vegetable-tanned stacked leather heel.",
    leadTime: "4 Wks",
  },
  {
    number: "03",
    last: "AT-091 (Soft Chisel)",
    image: "/images/products/full-brogue-wingtip.png",
    alt: "The Anarkali Full Brogue Wingtip in Burgundy Cordovan",
    tags: ["Norwegian Storm Welt", "Hand Medallion"],
    name: "The Anarkali Full Brogue",
    description:
      "Hand-patinated burgundy cordovan, traditional gimping and intricate toe punching, triple leather water-resistant sole.",
    leadTime: "6 Wks",
  },
  {
    number: "04",
    last: "AT-075 (Boot Chisel)",
    image: "/images/products/chelsea-boot.png",
    alt: "The Ravi Wholecut Chelsea Boot in Dark Chocolate Reverse Suede",
    tags: ["Hand-Blocked Single Cut", "Fiddleback Waist"],
    name: "The Ravi Chelsea Boot",
    description:
      "Dark chocolate reverse waxed suede, seamless one-piece blocked upper, woven pull loops, hand-sculpted waist profile.",
    leadTime: "5 Wks",
  },
];

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
          <span className="absolute top-4 right-4 type-label-sm tracking-widest text-secondary uppercase font-semibold">
            Last: {specimen.last}
          </span>
        </div>

        <div className="p-6 space-y-3">
          <div className="flex items-center justify-between text-outline">
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
          Lead Time: {specimen.leadTime}
        </span>
        <Link
          href={routes.quote}
          className="type-label-sm uppercase tracking-widest text-secondary hover:text-on-surface font-semibold inline-flex items-center gap-1"
        >
          Spec Inquest →<span className="sr-only"> for {specimen.name}</span>
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
            <Eyebrow className="mb-3">Atelier Catalog</Eyebrow>
            <h2 className="type-headline-lg text-on-surface tracking-tight">
              Curated Manufacturing Specimens
            </h2>
            <p className="type-body-md text-on-surface-variant max-w-xl mt-2">
              Archetypal lasts, constructions, and silhouette profiles available for custom
              private-label production. All articles are produced made-to-order to your brand
              specifications.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href={routes.portfolio}
              className="px-5 py-2.5 bg-surface-container text-on-surface type-label-md uppercase tracking-[0.16em] hover:bg-primary hover:text-surface transition-colors border border-outline-variant/40"
            >
              View Complete Archival Matrix →
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {specimens.map((specimen) => (
            <SpecimenCard key={specimen.number} specimen={specimen} />
          ))}
        </div>

        <aside className="mt-12 p-6 bg-surface-container-high border-l-2 border-secondary flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <Icon name="info" className="text-secondary text-xl" />
            <p className="type-body-sm text-on-surface-variant">
              <strong className="text-on-surface font-medium">B2B Customization Protocol:</strong>{" "}
              All articles shown above represent reference archetypes. We engineer custom bespoke
              lasts, proprietary pattern alterations, private blind-embossed sockliners, and
              distinctive sole stampings for every commissioning partner.
            </p>
          </div>
          <Link
            href={routes.privateLabel}
            className="whitespace-nowrap type-label-sm uppercase tracking-[0.16em] text-primary hover:text-secondary font-semibold"
          >
            Review Tolerances →
          </Link>
        </aside>
      </Container>
    </section>
  );
}
