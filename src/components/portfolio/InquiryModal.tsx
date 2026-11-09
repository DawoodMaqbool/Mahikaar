"use client";

import {
  createContext,
  useCallback,
  useContext,
  useId,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
import { enquiryFields, submitEnquiry } from "@/lib/enquiries/client";
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
  "w-full p-3 border border-outline bg-surface-container-low text-on-surface placeholder:text-on-surface-variant placeholder:opacity-100 type-body-sm focus:outline-none focus:bg-surface-container focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-ink transition-colors";

export function InquiryModalProvider({ children, source }: {
  children: ReactNode;
  source: "Portfolio" | "Private Label";
  /** Retained for compatibility; all enquiry dialogs now use the editorial presentation. */
  editorial?: boolean;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [target, setTarget] = useState<InquiryTarget>({
    title: "Enquiry",
    subtitle: "Style Reference",
  });
  const [submitted, setSubmitted] = useState(false);
  const id = useId();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const busy = useRef(false);
  const attempt = useRef({ body: "", id: "" });

  const open = useCallback<OpenInquiry>((next) => {
    if (busy.current) return;
    setError("");
    setTarget(next);
    setSubmitted(false);
    // showModal() gives us a backdrop, focus trapping and Escape-to-close for free.
    dialogRef.current?.showModal();
  }, []);

  const close = () => dialogRef.current?.close();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy.current) return;
    const fields = { ...enquiryFields(event.currentTarget), source };
    const body = JSON.stringify(fields);
    if (attempt.current.body !== body) attempt.current = { body, id: crypto.randomUUID() };
    busy.current = true;
    setPending(true);
    setError("");
    try {
      await submitEnquiry({ ...fields, submissionId: attempt.current.id });
      setSubmitted(true);
      attempt.current = { body: "", id: "" };
    } catch (error) {
      setError(error instanceof Error && error.name !== "TimeoutError" ? error.message : "We could not confirm submission. Please retry; your details have been kept.");
    } finally { busy.current = false; setPending(false); }
  }

  return (
    <InquiryContext.Provider value={open}>
      {children}

      <dialog
        ref={dialogRef}
        aria-labelledby={`${id}-title`}
        className="m-auto w-[calc(100%-2rem)] max-w-2xl max-h-[92dvh] overflow-y-auto overscroll-contain bg-surface text-on-surface backdrop:bg-ink/70"
      >
        <div className="p-5 pt-20 sm:p-10 sm:pt-20 space-y-6 relative">
          <button
            type="button"
            onClick={close}
            aria-label="Close"
            className="absolute top-3 right-3 min-h-12 min-w-12 flex items-center justify-center text-on-surface focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary"
          >
            <Icon name="close" className="text-[24px]" />
          </button>

          <div className="space-y-2 min-w-0 break-words">
            <span className="type-label-sm uppercase tracking-[0.22em] text-secondary font-semibold">
              Mahikaar • Enquiry
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
              <h3 className="type-headline-sm text-on-surface">Enquiry Submitted</h3>
              <p className="type-body-sm text-on-surface-variant">
                Thank you. Your enquiry has been accepted for sending, and we will be in touch to confirm
                feasibility, materials, pricing, and timelines.
              </p>
            </div>
          ) : (
            <form className="space-y-5 pt-2" onSubmit={handleSubmit} aria-busy={pending}>
              <div hidden aria-hidden="true"><label>Leave blank<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
              <div className="space-y-1">
                <label htmlFor={`${id}-style`} className={fieldLabel}>
                  Style of Interest
                </label>
                <input
                  id={`${id}-style`}
                  name="style"
                  type="text"
                  readOnly
                  value={`${target.title} • ${target.subtitle}`}
                  className={`${fieldInput} text-on-surface-variant`}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label htmlFor={`${id}-name`} className={fieldLabel}>
                    Representative Name
                  </label>
                  <input name="fullName" id={`${id}-name`} type="text" required placeholder="e.g. Alistair Wright" className={fieldInput} />
                </div>
                <div className="space-y-1">
                  <label htmlFor={`${id}-company`} className={fieldLabel}>
                    Label / Corporate Entity
                  </label>
                  <input name="companyName" id={`${id}-company`} type="text" required placeholder="e.g. Wright & Sons Bespoke" className={fieldInput} />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label htmlFor={`${id}-email`} className={fieldLabel}>
                    Business Email
                  </label>
                  <input name="businessEmail" id={`${id}-email`} type="email" required placeholder="client@atelier.com" className={fieldInput} />
                </div>
                <div className="space-y-1">
                  <label htmlFor={`${id}-volume`} className={fieldLabel}>
                    Projected Volume (Pairs)
                  </label>
                  <select name="volume" id={`${id}-volume`} className={fieldInput}>
                    <option>12–24 Pairs (Trial Order)</option>
                    <option>25–50 Pairs (Seasonal Capsule)</option>
                    <option>50+ Pairs (Private Label Volume)</option>
                    <option>Sample or Prototype Request</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label htmlFor={`${id}-requirements`} className={fieldLabel}>
                  Leather, Colour &amp; Branding Requirements
                </label>
                <textarea
                  name="requirements" id={`${id}-requirements`}
                  rows={3}
                  placeholder="Outline leather type, colour, sole, branding, or finishing requirements..."
                  className={fieldInput}
                />
              </div>

              <div className="p-4 bg-surface-container-low space-y-1">
                <span className="type-label-sm uppercase tracking-wider text-on-surface block font-semibold">
                  What Happens Next
                </span>
                <p className="type-body-sm text-on-surface-variant">
                  We will review your requirements and confirm feasibility, material availability,
                  pricing, and estimated timelines before an order is finalised.
                </p>
              </div>

              {error && <p role="alert" className="type-body-sm text-on-surface">{error}</p>}
              <p role="status" className="sr-only">{pending ? "Submitting enquiry…" : ""}</p>
              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={close}
                  className="action-secondary"
                >
                  Dismiss
                </button>
                <button
                  type="submit"
                  disabled={pending}
                  className="action-primary"
                >
                  {pending ? "Submitting…" : "Send Enquiry"}
                </button>
              </div>
            </form>
          )}
        </div>
      </dialog>
    </InquiryContext.Provider>
  );
}
