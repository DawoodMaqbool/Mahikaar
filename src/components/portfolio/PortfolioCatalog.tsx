"use client";

import Image from "next/image";
import { useRef, useState, type RefObject } from "react";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import {
  specimensForCategory,
  styleCategories,
  variantsForCategory,
  type CatalogueVariant,
  type StyleCategory,
} from "@/data/portfolio";
import { useInquiryModal } from "./InquiryModal";

const enquiryButton =
  "py-3.5 px-6 bg-primary text-on-primary hover:bg-secondary transition-colors duration-200 text-center type-label-md uppercase tracking-[0.18em] flex items-center justify-center gap-2";

function CategoryTile({
  category,
  count,
  image,
  alt,
  whiteBackdrop,
  fill,
  onOpen,
}: {
  category: StyleCategory;
  count: number;
  image: string;
  alt: string;
  whiteBackdrop?: boolean;
  /** Edge-to-edge picture (digital previews have their own backdrop). */
  fill?: boolean;
  onOpen: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="group flex flex-col text-left bg-surface-container-lowest shadow-xs hover:shadow-md transition-shadow duration-300"
    >
      <div className={`relative bg-surface-container-low aspect-[4/3] overflow-hidden ${fill || whiteBackdrop ? "" : "p-6"}`}>
        <div className="relative w-full h-full">
          <Image
            src={image}
            alt={alt}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
            className={`${fill ? "object-cover" : "object-contain"} transition-transform duration-500 group-hover:scale-[1.03] ${
              whiteBackdrop ? "mix-blend-multiply" : ""
            }`}
          />
        </div>
      </div>
      <div className="p-7 space-y-2">
        <h2 className="type-headline-md text-on-surface tracking-tight">{category.label}</h2>
        <p className="type-body-md text-on-surface-variant leading-relaxed">{category.blurb}</p>
        <p className="type-label-md uppercase tracking-[0.18em] text-secondary flex items-center gap-2 pt-2">
          <span>
            {count} {count === 1 ? "Look" : "Looks"}
          </span>
          <Icon name="arrow_forward" className="text-[16px]" />
        </p>
      </div>
    </button>
  );
}

function VariantTile({ variant, onOpen }: { variant: CatalogueVariant; onOpen: () => void }) {
  const lead = variant.images[0];
  const preview = lead.kind === "ai-concept";
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={`View ${variant.code}: ${variant.name}`}
      className={`group relative block w-full ${
        lead.portrait ? "aspect-[3/4]" : "aspect-[4/3]"
      } bg-surface-container-low overflow-hidden shadow-xs hover:shadow-md transition-shadow duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-ink`}
    >
      <div className={`absolute inset-0 ${preview || variant.whiteBackdrop ? "" : "p-6"}`}>
        <div className="relative w-full h-full">
          <Image
            src={lead.src}
            alt={lead.alt}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            className={`${preview ? "object-cover" : "object-contain"} transition-transform duration-500 group-hover:scale-[1.03] ${
              variant.whiteBackdrop ? "mix-blend-multiply" : ""
            }`}
          />
        </div>
      </div>
      <span className="absolute top-3 left-3 z-10 px-2.5 py-1 bg-surface type-label-sm uppercase tracking-wider text-secondary">
        {variant.code}
      </span>
      {variant.images.length > 1 && (
        <span className="absolute bottom-3 right-3 z-10 px-2 py-0.5 bg-surface type-label-sm uppercase tracking-wider text-on-surface">
          {variant.images.length} views
        </span>
      )}
      {preview && (
        <span className="absolute bottom-3 left-3 z-10 px-2 py-0.5 bg-surface type-label-sm uppercase tracking-wider text-on-surface-variant">
          Digital preview
        </span>
      )}
    </button>
  );
}

/** Remounted per look (keyed) so each one opens on its lead view. */
function VariantBody({ variant, onEnquire }: { variant: CatalogueVariant; onEnquire: () => void }) {
  const [index, setIndex] = useState(0);
  const image = variant.images[index];
  const blend = variant.whiteBackdrop ? "mix-blend-multiply" : "";

  return (
    <>
      <div
        className={`relative bg-surface-container-low overflow-hidden ${
          image.portrait ? "h-[62vh] max-w-full aspect-[3/4] mx-auto" : "aspect-[4/3] p-4"
        }`}
      >
        <div className="relative w-full h-full">
          <Image
            key={image.src}
            src={image.src}
            alt={image.alt}
            fill
            sizes="(min-width: 1024px) 800px, 100vw"
            className={`${image.portrait ? "object-cover" : "object-contain"} ${blend}`}
          />
        </div>
      </div>

      {variant.images.length > 1 && (
        <ul aria-label="Views" className="grid grid-cols-3 sm:grid-cols-4 gap-3">
          {variant.images.map((view, i) => (
            <li key={view.src}>
              <button
                type="button"
                aria-pressed={i === index}
                aria-label={`Show view: ${view.label}`}
                onClick={() => setIndex(i)}
                className={`relative block w-full aspect-[4/3] bg-surface-container-low overflow-hidden ring-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-ink ${
                  i === index ? "ring-secondary ring-2" : "ring-transparent hover:ring-outline-variant"
                }`}
              >
                <Image src={view.src} alt="" fill sizes="160px" className={`object-contain p-1.5 ${blend}`} />
              </button>
            </li>
          ))}
        </ul>
      )}

      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="space-y-1">
          <p className="type-label-sm uppercase tracking-[0.22em] text-secondary font-semibold">Ref {variant.code}</p>
          <p className="type-label-md uppercase tracking-wider text-on-surface-variant">
            {variant.colour ?? variant.name}
            {variant.images.length > 1 && ` • ${image.label}`}
          </p>
          {image.kind === "ai-concept" && (
            <p className="type-body-sm text-on-surface-variant">
              Digital preview, shown to illustrate the look. Final leather, colour and sole are agreed per project.
            </p>
          )}
        </div>
        <button type="button" onClick={onEnquire} className={enquiryButton}>
          <span>Enquire About {variant.code}</span>
          <Icon name="arrow_forward" className="text-[16px]" />
        </button>
      </div>
    </>
  );
}

/** Larger view of one look, with its code and a single enquiry action. */
function VariantDialog({
  variant,
  dialogRef,
  onClosed,
}: {
  variant: CatalogueVariant | null;
  dialogRef: RefObject<HTMLDialogElement | null>;
  onClosed: () => void;
}) {
  const openInquiry = useInquiryModal();
  const close = () => dialogRef.current?.close();

  function enquire() {
    if (!variant) return;
    close();
    openInquiry({ title: variant.code, subtitle: variant.colour ? `${variant.name} • ${variant.colour}` : variant.name });
  }

  return (
    <dialog
      ref={dialogRef}
      aria-label={variant ? `Reference ${variant.code}` : "Reference"}
      onClose={onClosed}
      onClick={(event) => {
        if (event.target === event.currentTarget) close();
      }}
      className="m-auto w-[calc(100%-2rem)] max-w-4xl max-h-[92vh] overflow-y-auto bg-surface text-on-surface shadow-xl backdrop:bg-black/70 backdrop:backdrop-blur-[4px]"
    >
      <div className="p-6 sm:p-8 relative space-y-5">
        <button
          type="button"
          onClick={close}
          aria-label="Close"
          className="absolute top-4 right-4 z-10 text-on-surface-variant hover:text-on-surface transition-colors p-2"
        >
          <Icon name="close" className="text-[24px]" />
        </button>
        {variant && <VariantBody key={variant.code} variant={variant} onEnquire={enquire} />}
      </div>
    </dialog>
  );
}

/** Category-first landing, then a photo grid of the looks in the chosen category. */
export function PortfolioCatalog() {
  const openInquiry = useInquiryModal();
  const [view, setView] = useState<StyleCategory | null>(null);
  const [selected, setSelected] = useState<CatalogueVariant | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  function showVariant(variant: CatalogueVariant) {
    setSelected(variant);
    dialogRef.current?.showModal();
  }

  // Only categories that have an approved specimen are offered.
  const tiles = styleCategories
    .map((category) => ({ category, cards: specimensForCategory(category.id) }))
    .filter(({ cards }) => cards.length > 0);

  const variants = view ? variantsForCategory(view.id) : [];

  return (
    <>
      {view === null ? (
        <section
          aria-label="Footwear categories"
          className="w-full max-w-[1440px] mx-auto px-6 lg:px-12 pt-4 pb-24"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tiles.map(({ category, cards }) => {
              // Landscape tile: use a landscape picture when the lead one is portrait, so the shoes fill it.
              const looks = variantsForCategory(category.id);
              const lead = looks[0].images[0];
              const cover = lead.portrait ? looks.flatMap((look) => look.images).find((img) => !img.portrait) ?? lead : lead;
              const useCard = cover === lead;
              return (
                <CategoryTile
                  key={category.id}
                  category={category}
                  count={looks.length}
                  image={useCard ? cards[0].image : cover.src}
                  alt={useCard ? cards[0].alt : cover.alt}
                  whiteBackdrop={cards[0].whiteBackdrop}
                  fill={cover.kind === "ai-concept"}
                  onOpen={() => setView(category)}
                />
              );
            })}
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
              <h2 className="type-headline-md text-on-surface tracking-tight">{view.label}</h2>
            </div>
            <p className="type-body-md text-on-surface-variant mt-4 max-w-3xl">
              Examples of the looks possible on this silhouette. Perforation pattern, leather, colour and sole
              are tailored to your brief, and some images are digital previews. Goodyear welted, 12 pairs per
              style, 4–8 weeks.
            </p>
          </Container>

          <section aria-label={`${view.label} looks`} className="w-full max-w-[1440px] mx-auto px-6 lg:px-12 pb-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {variants.map((variant) => (
                <VariantTile key={variant.code} variant={variant} onOpen={() => showVariant(variant)} />
              ))}
            </div>
            <div className="mt-10 flex justify-center">
              <button
                type="button"
                onClick={() => openInquiry({ title: view.label, subtitle: "Category enquiry" })}
                className={enquiryButton}
              >
                <span>Enquire About {view.label}</span>
                <Icon name="arrow_forward" className="text-[16px]" />
              </button>
            </div>
          </section>
        </>
      )}

      <VariantDialog variant={selected} dialogRef={dialogRef} onClosed={() => setSelected(null)} />
    </>
  );
}
