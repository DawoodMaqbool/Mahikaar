import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { portfolioSpecimens } from "@/data/portfolio";
import { routes } from "@/lib/site";

const heroStyle = portfolioSpecimens.find((specimen) => specimen.number === "03")!;

export function HomeHero() {
  return (
    <section className="w-full bg-surface section-standard">
      <Container className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
        <div className="lg:col-span-5 min-w-0 space-y-6">
          <p className="type-eyebrow uppercase text-secondary">Made-to-order · B2B footwear</p>
          <h1 className="type-headline-xl text-on-surface">
            Goodyear Welted.<br />
            <span className="italic">Made for Your Brand.</span>
          </h1>
          <p className="type-body-md text-on-surface-variant measure-intro">
            Hand-executed leather footwear for international brands, boutiques and retailers.
            Develop your own design or begin with our reference styles, with materials and
            client branding agreed for your order.
          </p>
          <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-3 items-stretch sm:items-start lg:items-stretch xl:items-start pt-2">
            <Link href={routes.quote} className="action-primary">Request a Quote</Link>
            <a href="#specimens" className="action-secondary">Explore Footwear</a>
          </div>
          <p className="type-body-sm text-on-surface-variant">
            From 12 pairs per design and colour.
          </p>
        </div>
        <figure className="lg:col-span-7 min-w-0 space-y-4">
          <div className="relative aspect-[4/3] bg-surface-container-lowest">
            <Image
              src={heroStyle.image}
              alt={heroStyle.alt}
              fill
              preload
              sizes="(min-width: 1440px) 760px, (min-width: 1024px) 55vw, (min-width: 768px) calc(100vw - 64px), calc(100vw - 48px)"
              className="object-contain"
            />
          </div>
          <figcaption className="flex flex-wrap justify-between gap-2 type-body-sm text-on-surface-variant">
            <span>Full Brogue Wingtip</span>
            <span>Dark Brown · Reference style</span>
          </figcaption>
        </figure>
      </Container>
    </section>
  );
}
