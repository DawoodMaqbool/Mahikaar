"use client";

import Image from "next/image";
import { useId, useState, type RefObject } from "react";
import { Icon } from "@/components/ui/Icon";
import {
  portfolioFilters,
  type Colourway,
  type PortfolioSpecimen,
  type ProductImage,
} from "@/data/portfolio";
import { useInquiryModal } from "./InquiryModal";

/** Second line of the enquiry dialog: the last when verified, otherwise the category. */
export function specimenSubtitle(specimen: PortfolioSpecimen): string {
  return (
    specimen.last ??
    portfolioFilters.find((filter) => filter.value === specimen.category)?.label ??
    "Style Reference"
  );
}

/** Fades the photograph in once it has loaded, so switching views doesn't flash. */
function GalleryImage({ image, blend }: { image: ProductImage; blend?: boolean }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <Image
      // A cached image can finish loading before React attaches onLoad.
      ref={(element) => {
        if (element?.complete) setLoaded(true);
      }}
      src={image.src}
      alt={image.alt}
      fill
      sizes="(min-width: 1024px) 600px, 100vw"
      onLoad={() => setLoaded(true)}
      className={`object-contain transition-opacity duration-300 motion-reduce:transition-none ${
        loaded ? "opacity-100" : "opacity-0"
      } ${blend ? "mix-blend-multiply" : ""}`}
    />
  );
}

type DetailBodyProps = {
  titleId: string;
  specimen: PortfolioSpecimen;
  colourways: Colourway[];
  onEnquire: (colourway: string | null) => void;
};

function DetailBody({ titleId, specimen, colourways, onEnquire }: DetailBodyProps) {
  const [colourIndex, setColourIndex] = useState(0);
  const [imageIndex, setImageIndex] = useState(0);
  const colourway = colourways[colourIndex];
  const image = colourway.images[imageIndex];
  const hasChoice = colourways.length > 1;
  const blend = specimen.whiteBackdrop;

  function chooseColourway(index: number) {
    setColourIndex(index);
    setImageIndex(0);
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
      <div className="lg:col-span-7 space-y-4">
        <div className="relative aspect-[4/3] bg-surface-container-low overflow-hidden p-4">
          <div className="relative w-full h-full">
            {/* key remounts the image so each new view fades in from transparent. */}
            <GalleryImage key={image.src} image={image} blend={blend} />
          </div>
        </div>

        <p aria-live="polite" className="type-label-sm uppercase tracking-wider text-on-surface-variant">
          {hasChoice && <span className="text-secondary">{colourway.name}</span>}
          {hasChoice && " • "}
          {image.label}
          {image.kind === "ai-concept" && (
            <span className="block normal-case tracking-normal mt-1">
              Digital preview, not a photographed sample. Styling and details may differ.
            </span>
          )}
        </p>

        {colourway.images.length > 1 && (
        <ul aria-label="Views" className="grid grid-cols-3 sm:grid-cols-4 gap-3">
          {colourway.images.map((view, index) => {
            const active = index === imageIndex;
            return (
              <li key={view.src}>
                <button
                  type="button"
                  aria-pressed={active}
                  aria-label={`Show view: ${view.label}`}
                  onClick={() => setImageIndex(index)}
                  className={`relative block w-full aspect-[4/3] bg-surface-container-low overflow-hidden ring-1 transition-shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-ink ${
                    active ? "ring-secondary ring-2" : "ring-transparent hover:ring-outline-variant"
                  }`}
                >
                  <Image
                    src={view.src}
                    alt=""
                    fill
                    sizes="160px"
                    className={`object-contain p-1.5 ${blend ? "mix-blend-multiply" : ""}`}
                  />
                </button>
              </li>
            );
          })}
        </ul>
        )}
      </div>

      <div className="lg:col-span-5 space-y-6">
        <div className="space-y-2 pr-10">
          <span className="type-label-sm uppercase tracking-[0.22em] text-secondary font-semibold">
            Mahikaar • Design Detail
          </span>
          <h2 id={titleId} className="type-headline-lg text-on-surface tracking-tight leading-tight">
            {specimen.name}
          </h2>
          <p className="type-label-md text-on-surface-variant uppercase tracking-wider">
            {specimen.materials}
          </p>
        </div>

        {hasChoice && (
          <div role="group" aria-label="Colourway" className="space-y-2">
            <span className="type-label-sm uppercase tracking-wider text-on-surface font-semibold block">
              Colourway: {colourway.name}
            </span>
            <div className="flex flex-wrap gap-2">
              {colourways.map((option, index) => (
                <button
                  key={option.name}
                  type="button"
                  aria-pressed={index === colourIndex}
                  onClick={() => chooseColourway(index)}
                  className={`px-4 py-2 type-label-md uppercase tracking-[0.14em] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ink ${
                    index === colourIndex
                      ? "bg-primary text-on-primary"
                      : "bg-surface-container text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface"
                  }`}
                >
                  {option.name}
                </button>
              ))}
            </div>
            <p className="type-body-sm text-on-surface-variant">
              Photographs of physical examples. The last and construction details can differ
              between colourways and are confirmed per project.
            </p>
          </div>
        )}

        <p className="type-body-md text-on-surface-variant leading-relaxed">{specimen.description}</p>

        <dl className="p-4 bg-surface-container-low space-y-2">
          {specimen.specs.map((spec) => (
            <div key={spec.label} className="flex items-center justify-between gap-4 text-on-surface">
              <dt className="type-label-sm uppercase text-on-surface-variant tracking-wider">{spec.label}</dt>
              <dd className="type-label-md text-on-surface text-right">{spec.value}</dd>
            </div>
          ))}
        </dl>

        <div className="space-y-3 pt-2">
          <button
            type="button"
            onClick={() => onEnquire(hasChoice ? colourway.name : null)}
            className="w-full py-3.5 px-4 bg-primary text-on-primary hover:bg-secondary transition-colors duration-200 text-center type-label-md uppercase tracking-[0.18em] flex items-center justify-center gap-2"
          >
            <span>Enquire About This Design</span>
            <span className="sr-only">: {specimen.name}</span>
            <Icon name="arrow_forward" className="text-[16px]" />
          </button>
          <p className="type-label-sm text-on-surface-variant uppercase tracking-wider">
            Lead Time: {specimen.leadTime}
          </p>
        </div>
      </div>
    </div>
  );
}

type ProductDetailDialogProps = {
  specimen: PortfolioSpecimen | null;
  dialogRef: RefObject<HTMLDialogElement | null>;
  /** Called whenever the dialog closes, however it was dismissed. */
  onClosed: () => void;
};

/**
 * One shared dialog for products that have photographs to inspect. Enquiring
 * closes it before the enquiry dialog opens, so two modals never stack.
 */
export function ProductDetailDialog({ specimen, dialogRef, onClosed }: ProductDetailDialogProps) {
  const openInquiry = useInquiryModal();
  const id = useId();
  const close = () => dialogRef.current?.close();

  function handleEnquire(colourway: string | null) {
    if (!specimen) return;
    close();
    openInquiry({
      title: specimen.name,
      subtitle: colourway ? `Colourway of interest: ${colourway}` : specimenSubtitle(specimen),
    });
  }

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={`${id}-title`}
      onClose={onClosed}
      // Only the backdrop (outside the padded content) is the dialog element itself.
      onClick={(event) => {
        if (event.target === event.currentTarget) close();
      }}
      className="m-auto w-[calc(100%-2rem)] max-w-6xl max-h-[92vh] overflow-y-auto bg-surface text-on-surface shadow-xl backdrop:bg-black/70 backdrop:backdrop-blur-[4px]"
    >
      <div className="p-6 sm:p-8 lg:p-10 relative">
        <button
          type="button"
          onClick={close}
          aria-label="Close"
          className="absolute top-4 right-4 sm:top-6 sm:right-6 z-10 text-on-surface-variant hover:text-on-surface transition-colors p-2"
        >
          <Icon name="close" className="text-[24px]" />
        </button>

        {specimen?.colourways && (
          // Keyed so reopening starts from the first colourway and view.
          <DetailBody
            key={specimen.number}
            titleId={`${id}-title`}
            specimen={specimen}
            colourways={specimen.colourways}
            onEnquire={handleEnquire}
          />
        )}
      </div>
    </dialog>
  );
}
