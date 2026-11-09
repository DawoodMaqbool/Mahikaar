"use client";

import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, type RefObject } from "react";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import {
  catalogueHref,
  resolveCatalogueSelection,
  specimensForCategory,
  styleCategories,
  variantsForCategory,
  type CatalogueVariant,
  type StyleCategory,
} from "@/data/portfolio";
import { useInquiryModal } from "./InquiryModal";

const enquiryButton = "action-primary";

function CategoryTile({
  category,
  count,
  image,
  alt,
  preview,
  onOpen,
}: {
  category: StyleCategory;
  count: number;
  image: string;
  alt: string;
  /** Whether the category cover is a digital preview. */
  preview?: boolean;
  onOpen: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="flex min-h-12 min-w-0 flex-col text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-secondary"
    >
      <div className="relative w-full bg-surface-container-low aspect-[4/3] overflow-hidden">
        <div className="relative w-full h-full">
          <Image
            src={image}
            alt={alt}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
            className="object-contain"
          />
        </div>
      </div>
      <div className="pt-5 space-y-3">
        <h2 className="type-headline-md text-on-surface tracking-tight">{category.label}</h2>
        <p className="type-body-md text-on-surface-variant leading-relaxed">{category.blurb}</p>
        <p className="type-body-sm text-on-surface-variant">
          <span>
            {count} {count === 1 ? "Reference Style" : "Reference Styles"}
          </span>
        </p>
        {preview && <p className="type-body-sm text-on-surface-variant">Digital preview</p>}
        <span className="editorial-link type-body-sm inline-flex min-h-12 items-center">Explore category</span>
      </div>
    </button>
  );
}

function VariantTile({ variant, onOpen }: { variant: CatalogueVariant; onOpen: () => void }) {
  const lead = variant.images[0];
  const preview = lead.kind === "ai-concept";
  // Colourway cards already carry the colour in their name; avoid saying it twice.
  const showColour =
    variant.colour && !variant.name.toLowerCase().includes(variant.colour.replace(" / ", " & ").toLowerCase());
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={`View ${variant.code}: ${variant.name}`}
      className="block w-full min-w-0 text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-secondary"
    >
      <div
        className="relative w-full aspect-[4/3] bg-surface-container-low overflow-hidden"
      >
        <div className="absolute inset-0">
          <div className="relative w-full h-full">
            <Image
              src={lead.src}
              alt={lead.alt}
              fill
              sizes="(min-width: 1440px) 318px, (min-width: 1280px) 25vw, (min-width: 768px) 50vw, calc(100vw - 48px)"
              className="object-contain"
            />
          </div>
        </div>
      </div>
      <div className="pt-5 space-y-2">
        <p className="type-eyebrow text-secondary">{variant.code}</p>
        <p className="type-headline-sm text-on-surface">{variant.name}</p>
        {showColour && <p className="type-body-sm text-on-surface-variant">{variant.colour}</p>}
        {preview && <p className="type-body-sm text-on-surface-variant">Digital preview</p>}
        <span className="editorial-link type-body-sm inline-flex min-h-12 items-center">View style</span>
      </div>
    </button>
  );
}

/** Remounted per look (keyed) so each one opens on its lead view. */
function VariantBody({ variant, onEnquire }: { variant: CatalogueVariant; onEnquire: () => void }) {
  // One lead photograph per listing; further views stay in the data but are not offered as a gallery.
  const image = variant.images[0];

  return (
    <>
      <div
        className="relative aspect-[4/3] max-h-[60dvh] bg-surface-container-low overflow-hidden"
      >
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(min-width: 1024px) 800px, 100vw"
            className="object-contain"
          />

      </div>

      <div className="space-y-6 min-w-0">
        <div className="space-y-3 min-w-0">
          <p className="type-eyebrow text-secondary">Ref {variant.code}</p>
          <h2 className="type-headline-md text-on-surface">{variant.name}</h2>
          {variant.colour && <p className="type-body-sm text-on-surface-variant">{variant.colour}</p>}
          {image.kind === "ai-concept" ? (
            <p className="type-body-sm text-on-surface-variant">
              Digital preview of a possible colour option, not a photograph of a finished sample. Final leather,
              colour and sole are agreed per project.
            </p>
          ) : (
            <p className="type-body-sm text-on-surface-variant">
              Reference style. Leather, colour and sole are agreed per project.
            </p>
          )}
        </div>
        <button type="button" onClick={onEnquire} className={enquiryButton}>
          <span>Enquire About This Style</span>
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
    openInquiry({ title: variant.name, subtitle: variant.colour ? `${variant.code} • ${variant.colour}` : variant.code });
  }

  return (
    <dialog
      ref={dialogRef}
      aria-label={variant ? `Reference ${variant.code}` : "Reference"}
      onClose={onClosed}
      onClick={(event) => {
        if (event.target === event.currentTarget) close();
      }}
      className="m-auto w-[calc(100%-2rem)] max-w-4xl max-h-[92dvh] overflow-y-auto overscroll-contain bg-surface text-on-surface backdrop:bg-ink/70"
    >
      <div className="p-5 pt-20 sm:p-10 sm:pt-20 relative space-y-8">
        <button
          type="button"
          onClick={close}
          aria-label="Close"
          className="absolute top-3 right-3 z-10 min-h-12 min-w-12 flex items-center justify-center bg-surface text-on-surface focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary"
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
  const searchParams = useSearchParams();
  const { view, selected } = resolveCatalogueSelection(searchParams);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const selectionRef = useRef(selected);

  function navigate(href: string, replace = false) {
    const url = new URL(href, window.location.origin);
    const params = new URLSearchParams(window.location.search);
    for (const key of ["category", "product", "colourway"]) {
      params.delete(key);
      const value = url.searchParams.get(key);
      if (value) params.set(key, value);
    }
    const next = `${url.pathname}${params.size ? `?${params}` : ""}${window.location.hash}`;
    if (replace) window.history.replaceState(null, "", next);
    else window.history.pushState(null, "", next);
  }

  useEffect(() => {
    selectionRef.current = selected;
    const dialog = dialogRef.current;
    if (selected && !dialog?.open) dialog?.showModal();
    else if (!selected && dialog?.open) dialog.close();
  }, [selected]);

  function closeVariant() {
    // Ignore close events caused by Back/Forward rather than a visitor action.
    if (selectionRef.current) navigate(catalogueHref(view?.id), true);
  }

  function showVariant(variant: CatalogueVariant) {
    navigate(catalogueHref(view?.id, variant.product, variant.colourway));
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
          className="w-full max-w-[1440px] mx-auto page-gutters pb-16 md:pb-20 lg:pb-24"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
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
                  count={category.numbers.length}
                  image={useCard ? cards[0].image : cover.src}
                  alt={useCard ? cards[0].alt : cover.alt}
                  preview={cover.kind === "ai-concept"}
                  onOpen={() => navigate(catalogueHref(category.id))}
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
                onClick={() => navigate(catalogueHref())}
                className="action-secondary gap-2"
              >
                <Icon name="arrow_back" className="text-[16px]" />
                <span>All Categories</span>
              </button>
              <h2 className="type-headline-lg text-on-surface">{view.label}</h2>
            </div>
            <p className="type-body-md text-on-surface-variant mt-4 max-w-3xl">
              Reference styles shown in example colours. Photographs show finished samples; images marked
              &ldquo;Digital preview&rdquo; only illustrate possible colour options. Leather, colour, sole and
              finish are confirmed for each project.
            </p>
          </Container>

          <section aria-label={`${view.label} reference styles`} className="w-full max-w-[1440px] mx-auto page-gutters pb-16 md:pb-20 lg:pb-24">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-x-6 gap-y-10">
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
              </button>
            </div>
          </section>
        </>
      )}

      <VariantDialog variant={selected} dialogRef={dialogRef} onClosed={closeVariant} />
    </>
  );
}
