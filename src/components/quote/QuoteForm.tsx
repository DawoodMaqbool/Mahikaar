"use client";

import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { enquiryFields, submitEnquiry } from "@/lib/enquiries/client";
import { useQuoteAttachments } from "./useQuoteAttachments";
import { QuoteAttachments } from "./QuoteAttachments";
import { Icon } from "@/components/ui/Icon";

const inputClass =
  "w-full min-w-0 min-h-12 px-4 py-3 border border-outline bg-surface-container-low text-on-surface placeholder:text-on-surface-variant placeholder:opacity-100 type-body-md focus:bg-surface focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ink";
const labelClass = "block type-body-sm font-medium text-on-surface";

function SectionHeading({ tag, title, description }: { tag: string; title: string; description?: string }) {
  return (
    <div className="space-y-2">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2">
        <h2 className="type-headline-md text-on-surface">{title}</h2>
        <span className="type-eyebrow text-secondary uppercase shrink-0">{tag}</span>
      </div>
      {description && <p className="type-body-sm text-on-surface-variant">{description}</p>}
    </div>
  );
}

type TextFieldProps = {
  id: string;
  label: string;
  type?: "text" | "email" | "url";
  placeholder: string;
  required?: boolean;
  className?: string;
};

function TextField({ id, label, type = "text", placeholder, required, className = "" }: TextFieldProps) {
  return (
    <div className={`space-y-2 ${className}`}>
      <label className={labelClass} htmlFor={id}>
        {label}
        {required ? " *" : " (optional)"}
      </label>
      <input id={id} name={id} type={type} placeholder={placeholder} required={required} className={inputClass} />
    </div>
  );
}

type SelectFieldProps = {
  id: string;
  label: string;
  placeholder: string;
  icon: string;
  options: { value: string; label: string }[];
  required?: boolean;
};

function SelectField({ id, label, placeholder, icon, options, required }: SelectFieldProps) {
  return (
    <div className="space-y-2">
      <label className={labelClass} htmlFor={id}>
        {label}
        {required ? " *" : " (optional)"}
      </label>
      <div className="relative">
        <select
          id={id}
          name={id}
          required={required}
          defaultValue=""
          className={`${inputClass} py-3.5 pr-12 appearance-none cursor-pointer`}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <Icon
          name={icon}
          className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-on-surface-variant text-[20px]"
        />
      </div>
    </div>
  );
}

type OptionCardProps = {
  name: string;
  value: string;
  title: string;
  description: string;
  defaultChecked?: boolean;
};

function OptionCard({ name, value, title, description, defaultChecked }: OptionCardProps) {
  return (
    <label className="relative min-h-12 min-w-0 flex items-start gap-3 p-4 border border-outline bg-surface-container-low cursor-pointer hover:bg-surface-container has-checked:border-secondary has-focus-visible:ring-2 has-focus-visible:ring-ink">
      <input
        type="checkbox"
        name={name}
        value={value}
        defaultChecked={defaultChecked}
        className="mt-1 accent-ink w-4 h-4 shrink-0 focus:outline-none"
      />
      <span>
        <span className="type-body-sm font-medium text-on-surface block">{title}</span>
        <span className="type-body-sm text-on-surface-variant block mt-0.5">{description}</span>
      </span>
    </label>
  );
}

function OptionGroup({ legend, className, children }: { legend: string; className: string; children: ReactNode }) {
  return (
    <fieldset className="min-w-0">
      <legend className="sr-only">{legend}</legend>
      <div className={className}>{children}</div>
    </fieldset>
  );
}

const typologies = [
  { value: "oxfords", title: "Oxfords", description: "Balmoral, Adelaide, Plain-Toe" },
  { value: "brogues", title: "Full & Semi Brogues", description: "Wingtip, Medallion, Gimping" },
  { value: "chelsea", title: "Chelsea Boots", description: "Wholecut and classic Chelsea styles" },
  { value: "loafers", title: "Penny Loafers", description: "Unlined / Lined Hand-Stitched Apron" },
  { value: "monkstraps", title: "Monkstraps", description: "Single & double buckle" },
  { value: "bespoke_silhouette", title: "Your Own Design", description: "From a reference, sample or sketch" },
];

const brandingOptions = [
  {
    value: "insole_emboss",
    title: "Custom Insole Debossing",
    description: "Hot-foil stamping or blind deboss, subject to feasibility",
  },
  {
    value: "packaging",
    title: "Branded Packaging",
    description: "Branded shoe boxes and dust bags, discussed separately",
  },
  {
    value: "hardware",
    title: "Branded Hardware",
    description: "Buckles, eyelets or heel plates, subject to feasibility",
  },
  {
    value: "bespoke_lasts",
    title: "Sizing Requirements",
    description: "Standard UK sizes 6–12. Other sizing can be discussed",
  },
];

export function QuoteForm() {
  const attachments = useQuoteAttachments();
  const showAttachments = attachments.available && !attachments.checkingAvailability;
  const confirmationRef = useRef<HTMLDivElement>(null);
  const [submitted, setSubmitted] = useState(false);

  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const busy = useRef(false);
  const attempt = useRef({ body: "", id: "" });
  const formRef = useRef<HTMLFormElement>(null);

  function startNewEnquiry() {
    if (busy.current) return;
    formRef.current?.reset();
    attachments.clear();
    attempt.current = { body: "", id: "" };
    setError("");
    setSubmitted(false);
    formRef.current?.querySelector<HTMLInputElement>("#fullName")?.focus();
  }

  useEffect(() => {
    if (submitted) {
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      confirmationRef.current?.scrollIntoView({
        behavior: reduceMotion ? "instant" : "smooth",
        block: "center",
      });
    }
  }, [submitted]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // A confirmed submission is final until the visitor starts a new enquiry.
    if (busy.current || submitted) return;
    setError("");
    setSubmitted(false);
    const fields = enquiryFields(event.currentTarget);
    busy.current = true;
    setPending(true);
    try {
      const references = await attachments.prepare(typeof fields.website === "string" ? fields.website : "");
      const payload = { ...fields, ...(references ? { attachments: references } : {}) };
      const body = JSON.stringify(payload);
      if (attempt.current.body !== body) attempt.current = { body, id: crypto.randomUUID() };
      await submitEnquiry({ ...payload, source: "Request a Quote", submissionId: attempt.current.id });
      setSubmitted(true);
    } catch (error) {
      setError(error instanceof Error && error.name !== "TimeoutError" ? error.message : "We could not confirm submission. Please retry; your details have been kept.");
    } finally { busy.current = false; setPending(false); }
  }

  return (
    <>
      <form
        ref={formRef}
        className={`space-y-10 ${submitted ? "opacity-40 pointer-events-none" : ""}`}
        inert={submitted}
        aria-busy={pending}
        onSubmit={handleSubmit}
      >
        <div hidden aria-hidden="true"><label>Leave blank<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
        <div className="space-y-6">
          <SectionHeading tag="Required" title="About You" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <TextField id="fullName" label="Name" placeholder="Your full name" required />
            <TextField id="companyName" label="Brand / Company" placeholder="Your brand or company name" required />
            <TextField id="businessEmail" label="Business Email" type="email" placeholder="you@yourbrand.com" required />
            <TextField id="territory" label="Country" placeholder="e.g. United Kingdom" required />
          </div>
        </div>

        <div className="space-y-6 pt-8 border-t border-outline-variant">
          <SectionHeading
            tag="Optional"
            title="Your Enquiry"
            description="Share whatever you already know. Anything left blank can be discussed with our team."
          />
          <fieldset className="min-w-0 space-y-3">
            <legend className={labelClass}>Styles you are interested in (optional)</legend>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {typologies.map((option) => (
                <OptionCard key={option.value} name="footwearType" {...option} />
              ))}
            </div>
          </fieldset>
          <div className="space-y-2">
            <SelectField
              id="quantityScale"
              label="Estimated Quantity"
              placeholder="Select an approximate quantity..."
              icon="expand_more"
              options={[
                { value: "samples", label: "Samples first (1 – 5 pairs)" },
                { value: "trial", label: "12 – 24 pairs" },
                { value: "boutique", label: "25 – 50 pairs" },
                { value: "commercial", label: "50 – 200 pairs" },
                { value: "scaled", label: "200+ pairs" },
                { value: "unsure", label: "Not sure yet" },
              ]}
            />
            <p className="type-body-sm text-on-surface-variant">
              Production orders start at 12 pairs per design and colour, with mixed sizes allowed.
            </p>
          </div>
          <div className="space-y-2">
            <label className={labelClass} htmlFor="projectDescription">
              Brief Project Description (optional)
            </label>
            <textarea
              id="projectDescription"
              name="projectDescription"
              rows={5}
              placeholder="Tell us about the shoes you have in mind: styles, materials, colours, or anything else that helps us understand your brand."
              className={inputClass}
            />
          </div>
        </div>

        <details className="group border-y border-outline-variant">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-6 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-ink [&::-webkit-details-marker]:hidden">
            <span>
              <span className="type-label-md uppercase tracking-wider text-on-surface block">
                Already have more details?
              </span>
              <span className="type-body-sm text-on-surface-variant block mt-0.5">
                {showAttachments
                  ? "Delivery timing, branding, size notes or design files. All optional."
                  : "Delivery timing, branding or size notes. All optional."}
              </span>
            </span>
            <Icon
              name="expand_more"
              className="text-[22px] text-on-surface-variant shrink-0 group-open:rotate-180"
            />
          </summary>

          <div className="pt-2 pb-8 space-y-10">
            <div className="space-y-6">
              <SectionHeading tag="Optional" title="Timing" />
              <SelectField
                id="timeline"
                label="Preferred Delivery Window"
                placeholder="Select a preferred window..."
                icon="schedule"
                options={[
                  { value: "ss27", label: "Spring / Summer 2027" },
                  { value: "aw27", label: "Autumn / Winter 2027" },
                  { value: "sample_first", label: "Sample or prototype first" },
                  { value: "ongoing", label: "Ongoing / repeat orders" },
                  { value: "discuss", label: "To be discussed" },
                ]}
              />
              <p className="type-body-sm text-on-surface-variant">
                Timelines are confirmed once specifications are agreed.
              </p>
            </div>

            <div className="space-y-6">
              <SectionHeading
                tag="Optional"
                title="Branding & Customisation"
                description="Availability and any additional costs are confirmed before an order is finalised."
              />
              <OptionGroup legend="Branding and customisation options" className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {brandingOptions.map((option) => (
                  <OptionCard key={option.value} name="brandingOption" {...option} />
                ))}
              </OptionGroup>
            </div>

            <div className="space-y-6">
              <SectionHeading tag="Optional" title={showAttachments ? "Design Files & Specifications" : "Project Specifications"} />
              <TextField
                id="brandUrl"
                label="Brand Website or Social Link"
                type="url"
                placeholder="https://www.yourbrand.com"
              />
              <div className="space-y-2">
                <label className={labelClass} htmlFor="specNotes">
                  Materials, Sizing &amp; Other Notes (optional)
                </label>
                <textarea
                  id="specNotes"
                  name="specNotes"
                  rows={4}
                  placeholder="Preferred leather and finish, colours, sole type, sizing, or a target price, if you have them."
                  className={inputClass}
                />
              </div>
              <QuoteAttachments controller={attachments} disabled={pending} />
            </div>
          </div>
        </details>

        {error && !submitted && <p role="alert" className="type-body-sm text-on-surface">{error}</p>}
        <p role="status" className="sr-only">{pending ? "Submitting enquiry…" : ""}</p>
        <div className="pt-2 space-y-4">
          <button
            type="submit"
            disabled={pending || submitted}
            className="action-primary w-full gap-3"
          >
            <span>{pending ? "Submitting…" : "Send Enquiry"}</span>
            <Icon name="arrow_forward" className="text-[18px]" />
          </button>
          <p className="type-body-sm text-on-surface-variant text-center sm:text-left">
            Fields marked * are required. Share as much or as little as you have.
          </p>
        </div>
      </form>

      {submitted && (
        <div ref={confirmationRef} role="status" className="mt-8 p-6 bg-surface-container-low text-on-surface space-y-4">
          <div className="flex items-center gap-3 text-secondary">
            <Icon name="task_alt" className="text-[28px]" />
            <span className="type-headline-sm">Enquiry Submitted</span>
          </div>
          <p className="type-body-md text-on-surface-variant leading-relaxed">
            Thank you for contacting Mahikaar. Your enquiry has been accepted for sending. Our team will review
            your requirements and get back to you regarding feasibility, pricing and estimated
            timelines.
          </p>
          <button type="button" onClick={startNewEnquiry} className="action-secondary">
            Start New Enquiry
          </button>
        </div>
      )}
    </>
  );
}
