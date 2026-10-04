"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
import { Icon } from "@/components/ui/Icon";

export type InquiryTarget = {
  title: string;
  subtitle: string;
};

type OpenInquiry = (target: InquiryTarget) => void;

/**
 * Context lets any button inside the provider open the one shared dialog
 * without passing callbacks down through every component in between.
 */
const InquiryContext = createContext<OpenInquiry | null>(null);

export function useInquiryModal(): OpenInquiry {
  const open = useContext(InquiryContext);
  if (!open) throw new Error("useInquiryModal must be used inside <InquiryModalProvider>");
  return open;
}

const fieldLabel = "type-label-sm uppercase tracking-wider text-secondary block font-semibold";
const fieldInput =
  "w-full p-3 bg-surface-container-low text-on-surface type-body-sm focus:outline-none focus:bg-surface-container focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-ink transition-colors";

export function InquiryModalProvider({ children }: { children: ReactNode }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [target, setTarget] = useState<InquiryTarget>({
    title: "Commission Inquest",
    subtitle: "Last Specification Reference",
  });
  const [submitted, setSubmitted] = useState(false);
  const id = useId();

  const open = useCallback<OpenInquiry>((next) => {
    setTarget(next);
    setSubmitted(false);
    // showModal() gives us a backdrop, focus trapping and Escape-to-close for free.
    dialogRef.current?.showModal();
  }, []);

  const close = () => dialogRef.current?.close();

  // As in the original, the dialog closes itself shortly after a successful submit.
  useEffect(() => {
    if (!submitted) return;
    const timer = setTimeout(() => dialogRef.current?.close(), 2600);
    return () => clearTimeout(timer);
  }, [submitted]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <InquiryContext.Provider value={open}>
      {children}

      <dialog
        ref={dialogRef}
        aria-labelledby={`${id}-title`}
        className="m-auto w-[calc(100%-2rem)] max-w-2xl max-h-[92vh] overflow-y-auto bg-surface text-on-surface shadow-xl backdrop:bg-black/70 backdrop:backdrop-blur-[4px]"
      >
        <div className="p-8 sm:p-10 space-y-6 relative">
          <button
            type="button"
            onClick={close}
            aria-label="Close"
            className="absolute top-6 right-6 text-on-surface-variant hover:text-on-surface transition-colors p-2"
          >
            <Icon name="close" className="text-[24px]" />
          </button>

          <div className="space-y-2">
            <span className="type-label-sm uppercase tracking-[0.22em] text-secondary font-semibold">
              Atelier Inquest • Commercial Dossier
            </span>
            <h2 id={`${id}-title`} className="type-headline-lg text-on-surface tracking-tight leading-tight">
              {target.title}
            </h2>
            <p className="type-label-md text-on-surface-variant uppercase tracking-wider">
              {target.subtitle}
            </p>
          </div>

          {submitted ? (
            <div role="status" className="p-6 bg-surface-container-low text-center space-y-2">
              <Icon name="verified" className="text-[36px] text-secondary" />
              <h3 className="type-headline-sm text-on-surface">Dossier Request Transmitted</h3>
              <p className="type-body-sm text-on-surface-variant">
                Your reference has been logged into the Lahore Manufacture Registry. Our technical
                directorship will be in contact shortly.
              </p>
            </div>
          ) : (
            <form className="space-y-5 pt-2" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label htmlFor={`${id}-name`} className={fieldLabel}>
                    Representative Name
                  </label>
                  <input id={`${id}-name`} type="text" required placeholder="e.g. Alistair Wright" className={fieldInput} />
                </div>
                <div className="space-y-1">
                  <label htmlFor={`${id}-company`} className={fieldLabel}>
                    Label / Corporate Entity
                  </label>
                  <input id={`${id}-company`} type="text" required placeholder="e.g. Wright & Sons Bespoke" className={fieldInput} />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label htmlFor={`${id}-email`} className={fieldLabel}>
                    Institutional Email
                  </label>
                  <input id={`${id}-email`} type="email" required placeholder="client@atelier.com" className={fieldInput} />
                </div>
                <div className="space-y-1">
                  <label htmlFor={`${id}-volume`} className={fieldLabel}>
                    Projected Volume (Pairs)
                  </label>
                  <select id={`${id}-volume`} className={fieldInput}>
                    <option>12–24 Pairs (Trial Batch)</option>
                    <option>25–50 Pairs (Seasonal Capsule)</option>
                    <option>50–150 Pairs (Private Label Volume)</option>
                    <option>Bespoke / Individual Client Commission</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label htmlFor={`${id}-requirements`} className={fieldLabel}>
                  Specific Leather &amp; Welting Requirements
                </label>
                <textarea
                  id={`${id}-requirements`}
                  rows={3}
                  placeholder="Outline specific tannery requests, toe-tap preferences, edge coloring, or custom sock-lining foil stamps..."
                  className={fieldInput}
                />
              </div>

              <div className="p-4 bg-surface-container-low space-y-1">
                <span className="type-label-sm uppercase tracking-wider text-on-surface block font-semibold">
                  Institutional Assurance
                </span>
                <p className="type-body-sm text-on-surface-variant">
                  Technical dossier, leather swatch pack availability, and commercial export pricing
                  will be transmitted within 24 business hours directly by the Head of Lasting.
                </p>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={close}
                  className="py-3 px-6 bg-surface-container text-on-surface hover:bg-surface-container-high transition-colors type-label-md uppercase tracking-wider"
                >
                  Dismiss
                </button>
                <button
                  type="submit"
                  className="py-3 px-8 bg-primary text-on-primary hover:bg-secondary transition-colors type-label-md uppercase tracking-[0.18em] shadow-xs"
                >
                  Transmit Inquest
                </button>
              </div>
            </form>
          )}
        </div>
      </dialog>
    </InquiryContext.Provider>
  );
}
