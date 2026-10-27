"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import {
  portfolioSpecimens,
  specimensForCategory,
  styleCategories,
  type PortfolioSpecimen,
  type StyleCategoryId,
} from "@/data/portfolio";
import { useInquiryModal } from "./InquiryModal";
import { ProductDetailDialog, specimenSubtitle } from "./ProductDetailDialog";

function SpecimenCard({
  specimen,
  onDetails,
}: {
  specimen: PortfolioSpecimen;
  onDetails: (specimen: PortfolioSpecimen) => void;
}) {
  const openInquiry = useInquiryModal();

  return (
    <article className="group flex flex-col bg-surface-container-lowest shadow-xs hover:shadow-md transition-shadow duration-300">
      <div className="relative bg-surface-container-low aspect-[4/3] overflow-hidden p-6">
        <div className="relative w-full h-full">
          <Image
            src={specimen.image}
            alt={specimen.alt}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
            className={`object-contain transition-transform duration-500 group-hover:scale-[1.03] ${
              specimen.whiteBackdrop ? "mix-blend-multiply" : ""
            }`}
          />
        </div>
        <span className="absolute top-4 left-4 z-10 px-2.5 py-1 bg-surface type-label-sm uppercase tracking-wider text-secondary">
          Specimen {specimen.number}
        </span>
        {specimen.last && (
          <span className="absolute top-4 right-4 z-10 px-2.5 py-1 bg-surface type-label-sm uppercase tracking-wider text-on-surface">
            {specimen.last}
          </span>
        )}
        <span className="absolute bottom-4 left-4 px-2 py-0.5 bg-primary text-on-primary type-label-sm uppercase tracking-widest">
          {specimen.construction}
        </span>
        {specimen.colourways?.[0]?.images[0]?.kind === "ai-concept" && (
          <span className="absolute top-14 left-4 z-10 px-2 py-0.5 bg-surface type-label-sm uppercase tracking-wider text-on-surface-variant">
            Digital preview
          </span>
        )}
        {specimen.colourways && specimen.colourways.length > 1 && (
          <span className="absolute bottom-4 right-4 z-10 px-2 py-0.5 bg-surface type-label-sm uppercase tracking-widest text-on-surface">
            {specimen.colourways.length} Colourways
          </span>
        )}
      </div>

      <div className="p-7 flex flex-col flex-1 justify-between bg-surface-container-lowest">
        <div className="space-y-4">
          <div>
            <p className="type-label-sm uppercase tracking-[0.2em] text-secondary mb-1">
              {specimen.materials}
            </p>
            <h2 className="type-headline-md text-on-surface tracking-tight">{specimen.name}</h2>
          </div>
          <p className="type-body-md text-on-surface-variant leading-relaxed">{specimen.description}</p>

          <dl className="p-4 bg-surface-container-low space-y-2">
            {specimen.specs.map((spec) => (
              <div key={spec.label} className="flex items-center justify-between gap-4 text-on-surface">
                <dt className="type-label-sm uppercase text-on-surface-variant tracking-wider">
                  {spec.label}
                </dt>
                <dd className="type-label-md text-on-surface text-right">{spec.value}</dd>
              </div>
            ))}
          </dl>

        </div>

        <div className="pt-6 mt-6 flex flex-col gap-3">
          {specimen.colourways && (
            <button
              type="button"
              onClick={() => onDetails(specimen)}
              className="w-full py-3 px-4 bg-surface-container text-on-surface hover:bg-surface-container-high transition-colors duration-200 text-center type-label-md uppercase tracking-[0.18em] flex items-center justify-center gap-2"
            >
              <span>View Details</span>
              <span className="sr-only">: {specimen.name}</span>
              <Icon name="tune" className="text-[16px]" />
            </button>
          )}
          <button
            type="button"
            onClick={() => openInquiry({ title: specimen.name, subtitle: specimenSubtitle(specimen) })}
            className="w-full py-3.5 px-4 bg-primary text-on-primary hover:bg-secondary transition-colors duration-200 text-center type-label-md uppercase tracking-[0.18em] flex items-center justify-center gap-2"
          >
            <span>Enquire About This Design</span>
            <span className="sr-only">: {specimen.name}</span>
            <Icon name="arrow_forward" className="text-[16px]" />
          </button>
          <div className="flex items-center justify-between type-label-sm text-on-surface-variant uppercase tracking-wider px-1">
            <span>{specimen.reference ? `Ref: ${specimen.reference}` : "Made to Order"}</span>
            <span>Lead Time: {specimen.leadTime}</span>
          </div>
        </div>
      </div>
    </article>
  );
}

type View = StyleCategoryId | "all" | null;

function CategoryTile({
  title,
  blurb,
  count,
  image,
  alt,
  whiteBackdrop,
  onOpen,
}: {
  title: string;
  blurb: string;
  count: number;
  image: string;
  alt: string;
  whiteBackdrop?: boolean;
  onOpen: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="group flex flex-col text-left bg-surface-container-lowest shadow-xs hover:shadow-md transition-shadow duration-300"
    >
      <div className="relative bg-surface-container-low aspect-[4/3] overflow-hidden p-6">
        <div className="relative w-full h-full">
          <Image
            src={image}
            alt={alt}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
            className={`object-contain transition-transform duration-500 group-hover:scale-[1.03] ${
              whiteBackdrop ? "mix-blend-multiply" : ""
            }`}
          />
        </div>
      </div>
      <div className="p-7 space-y-2">
        <h2 className="type-headline-md text-on-surface tracking-tight">{title}</h2>
        <p className="type-body-md text-on-surface-variant leading-relaxed">{blurb}</p>
        <p className="type-label-md uppercase tracking-[0.18em] text-secondary flex items-center gap-2 pt-2">
          <span>
            {count} {count === 1 ? "Style" : "Styles"}
          </span>
          <Icon name="arrow_forward" className="text-[16px]" />
        </p>
      </div>
    </button>
  );
}

/** Category-first landing, then the specimen grid for the chosen category. */
export function PortfolioCatalog() {
  const [view, setView] = useState<View>(null);
  const [detail, setDetail] = useState<PortfolioSpecimen | null>(null);
  const detailRef = useRef<HTMLDialogElement>(null);

  function showDetails(specimen: PortfolioSpecimen) {
    setDetail(specimen);
    detailRef.current?.showModal();
  }

  const category = styleCategories.find((entry) => entry.id === view);
  const visible =
    view === "all" ? portfolioSpecimens : view ? specimensForCategory(view) : [];
  const heading = view === "all" ? "All Articles" : category?.label;

  // Only categories that have an approved specimen are offered.
  const tiles = styleCategories
    .map((entry) => ({ entry, cards: specimensForCategory(entry.id) }))
    .filter(({ cards }) => cards.length > 0);

  return (
    <>
      {view === null ? (
        <section
          aria-label="Footwear categories"
          className="w-full max-w-[1440px] mx-auto px-6 lg:px-12 pt-4 pb-24"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tiles.map(({ entry, cards }) => (
              <CategoryTile
                key={entry.id}
                title={entry.label}
                blurb={entry.blurb}
                count={cards.length}
                image={cards[0].image}
                alt={cards[0].alt}
                whiteBackdrop={cards[0].whiteBackdrop}
                onOpen={() => setView(entry.id)}
              />
            ))}
            <CategoryTile
              title="All Articles"
              blurb="Every reference style in the portfolio, in specimen order."
              count={portfolioSpecimens.length}
              image={portfolioSpecimens[0].image}
              alt={portfolioSpecimens[0].alt}
              onOpen={() => setView("all")}
            />
          </div>
        </section>
      ) : (
        <>
          <Container className="pb-8">
            <div className="flex flex-wrap items-center justify-between gap-3 mt-4">
              <button
                type="button"
                onClick={() => setView(null)}
                className="px-4 py-2 bg-surface-container-low text-on-surface hover:bg-surface-container type-label-md uppercase tracking-[0.16em] flex items-center gap-2"
              >
                <Icon name="arrow_back" className="text-[16px]" />
                <span>All Categories</span>
              </button>
              <h2 className="type-headline-md text-on-surface tracking-tight">{heading}</h2>
            </div>
          </Container>

          <section aria-label={`${heading} specimens`} className="w-full max-w-[1440px] mx-auto px-6 lg:px-12 pb-24">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" aria-live="polite">
              {visible.map((specimen) => (
                <SpecimenCard key={`${specimen.number}-${specimen.name}`} specimen={specimen} onDetails={showDetails} />
              ))}
            </div>
          </section>
        </>
      )}

      <ProductDetailDialog specimen={detail} dialogRef={detailRef} onClosed={() => setDetail(null)} />
    </>
  );
}
