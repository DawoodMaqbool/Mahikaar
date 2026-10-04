import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { routes } from "@/lib/site";

const credo = [
  { label: "Standard", value: "360° Hand-Welted & Goodyear" },
  { label: "Provenance", value: "Tuscan & French Box Calf" },
  { label: "B2B Volume", value: "Boutique Small Batch & Scale" },
  { label: "Manufacture", value: "Lahore Guild Quarter" },
];

const badgeBase = "px-3.5 py-1.5 type-label-sm uppercase tracking-[0.2em]";

export function HomeHero() {
  return (
    // -mt-20 pulls the hero up behind the fixed header.
    <section className="relative w-full -mt-20 overflow-hidden bg-primary-container text-surface">
      <div aria-hidden="true" className="absolute inset-0">
        <Image
          src="/images/atelier/workshop-cap-toe-oxford.png"
          alt=""
          fill
          preload
          sizes="100vw"
          className="object-cover object-center opacity-45 scale-105"
        />
        <div className="absolute inset-0 bg-linear-to-t from-[#141312] via-[#1c1b1a]/70 to-[#1c1b1a]/85" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_40%,rgba(121,87,71,0.22),transparent_70%)]" />
      </div>

      <div className="relative w-full max-w-[1440px] mx-auto px-6 lg:px-12 pt-36 pb-24 lg:pt-44 lg:pb-32 flex flex-col justify-between min-h-[90vh]">
        <div className="flex flex-wrap items-center gap-3 mb-10">
          <span className={`${badgeBase} bg-surface/10 backdrop-blur-md text-surface border border-surface/20`}>
            Lahore Historic Craft Guild
          </span>
          <span className={`${badgeBase} bg-surface/10 backdrop-blur-md text-secondary-container border border-secondary-container/30`}>
            Institutional B2B Shoemaker
          </span>
          <span className={`${badgeBase} hidden sm:inline-flex bg-surface/5 backdrop-blur-xs text-surface-variant`}>
            Archival Last Vault AT-01 / AT-94
          </span>
        </div>

        <div className="max-w-4xl space-y-6">
          <h1 className="type-headline-xl text-surface leading-[1.08] tracking-tight drop-shadow-xs">
            Goodyear Welted Footwear, <br className="hidden md:inline" />
            <span className="italic font-normal text-secondary-fixed">Made for Your Brand.</span>
          </h1>
          <p className="type-body-lg text-surface-container max-w-2xl leading-relaxed font-light">
            Handcrafted, made-to-order leather footwear for international brands, heritage
            boutiques, and discerning private labels. Synthesized with master artisans in Lahore,
            Pakistan under British &amp; Continental bespoke tolerances.
          </p>
        </div>

        <div className="mt-14 pt-10 border-t border-surface/15 flex flex-col lg:flex-row lg:items-end justify-between gap-10">
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <Link
              href={routes.quote}
              className="px-8 py-4 bg-surface text-primary type-label-md uppercase tracking-[0.2em] hover:bg-secondary-fixed hover:text-primary transition-all duration-200 shadow-xl inline-flex items-center gap-3 group"
            >
              <span>Request a Quotation Dossier</span>
              <Icon name="arrow_forward" className="text-[16px] group-hover:translate-x-1 transition-transform" />
            </Link>
            <a
              href="#specimens"
              className="px-7 py-4 bg-transparent text-surface hover:text-secondary-fixed type-label-md uppercase tracking-[0.2em] border border-surface/30 hover:border-secondary-fixed transition-all duration-200 backdrop-blur-xs"
            >
              Explore Footwear Specimens
            </a>
          </div>

          <dl className="grid grid-cols-2 sm:grid-cols-4 gap-6 lg:gap-8 max-w-2xl text-surface-variant">
            {credo.map((item) => (
              <div key={item.label} className="space-y-1">
                <dt className="block type-label-sm uppercase tracking-widest text-secondary-container">
                  {item.label}
                </dt>
                <dd className="type-body-sm text-surface font-medium block">{item.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
