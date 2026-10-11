"use client";

import { useEffect, useRef, useState, type DragEvent, type FormEvent, type ReactNode } from "react";
import { Icon } from "@/components/ui/Icon";

const inputClass =
  "w-full px-4 py-3 bg-surface-container-low text-on-surface type-body-md focus:bg-surface focus:outline-none focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-ink transition-colors";
const labelClass = "block type-label-sm uppercase tracking-widest text-on-surface-variant";

function SectionHeading({ number, tag, title }: { number: string; tag: string; title: string }) {
  return (
    <>
      <div className="flex items-baseline justify-between">
        <span className="type-label-sm uppercase tracking-[0.2em] text-secondary">Section {number}</span>
        <span className="type-label-sm text-outline uppercase tracking-widest">{tag}</span>
      </div>
      <h2 className="type-headline-md text-on-surface">{title}</h2>
    </>
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
        {required && " *"}
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
};

function SelectField({ id, label, placeholder, icon, options }: SelectFieldProps) {
  return (
    <div className="space-y-2 pt-2">
      <label className={labelClass} htmlFor={id}>
        {label} *
      </label>
      <div className="relative">
        <select
          id={id}
          name={id}
          required
          defaultValue=""
          className={`${inputClass} py-3.5 appearance-none cursor-pointer`}
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
    <label className="relative flex items-start gap-3 p-4 bg-surface-container-low cursor-pointer transition-colors hover:bg-surface-container has-focus-visible:ring-1 has-focus-visible:ring-ink">
      <input
        type="checkbox"
        name={name}
        value={value}
        defaultChecked={defaultChecked}
        className="mt-1 accent-primary w-4 h-4 focus:outline-none"
      />
      <span>
        <span className="type-label-md text-on-surface block uppercase tracking-wider">{title}</span>
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
  { value: "oxfords", title: "Oxfords", description: "Balmoral, Adelaide, Plain-Toe", defaultChecked: true },
  { value: "brogues", title: "Full & Semi Brogues", description: "Wingtip, Medallion, Gimping", defaultChecked: true },
  { value: "chelsea", title: "Chelsea Boots", description: "Wholecut hand-blocked shaft" },
  { value: "loafers", title: "Penny Loafers", description: "Unlined / Lined Hand-Stitched Apron" },
  { value: "monkstraps", title: "Monkstraps", description: "Single & Double solid brass buckled" },
  { value: "bespoke_silhouette", title: "Your Own Design", description: "Reference, sample or tech pack" },
];

const brandingOptions = [
  {
    value: "insole_emboss",
    title: "Custom Insole Debossing",
    description: "Hot-foil stamping or blind deboss, subject to feasibility",
    defaultChecked: true,
  },
  {
    value: "packaging",
    title: "Branded Packaging",
    description: "Shoe boxes and dust bags carrying your branding",
    defaultChecked: true,
  },
  {
    value: "hardware",
    title: "Branded Hardware",
    description: "Buckles, eyelets or heel plates, subject to feasibility",
  },
  {
    value: "bespoke_lasts",
    title: "Custom Sizing & Fit",
    description: "Standard UK 6–12 size curves or tailored to your sizing",
  },
];

function describeFiles(files: FileList) {
  if (files.length === 1) {
    return `Attached: ${files[0].name} (${Math.round(files[0].size / 1024)} KB)`;
  }
  return `Attached: ${files.length} design files ready for ingestion`;
}

export function QuoteForm() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const confirmationRef = useRef<HTMLDivElement>(null);
  const [fileStatus, setFileStatus] = useState("No documents attached yet");
  const [dragging, setDragging] = useState(false);
  // null until submitted; then holds the generated reference number.
  const [reference, setReference] = useState<string | null>(null);

  useEffect(() => {
    if (reference) confirmationRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [reference]);

  function handleDrop(event: DragEvent<HTMLLabelElement>) {
    event.preventDefault();
    setDragging(false);
    const files = event.dataTransfer.files;
    if (files.length > 0 && fileInputRef.current) {
      fileInputRef.current.files = files;
      setFileStatus(describeFiles(files));
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // There is no backend yet: like the original, this only shows a confirmation.
    setReference(`MK-${Math.floor(1000 + Math.random() * 9000)}`);
  }

  return (
    <>
      <form
        className={`space-y-12 ${reference ? "opacity-40 pointer-events-none" : ""}`}
        inert={reference !== null}
        onSubmit={handleSubmit}
      >
        <div className="space-y-6">
          <SectionHeading number="01" tag="Client Credentials" title="Brand & Principal Contact" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <TextField id="fullName" label="Full Name" placeholder="e.g. Julian Montgomery" required />
            <TextField id="companyName" label="Company / Brand Entity" placeholder="e.g. Montgomery & Sons Bespoke Ltd" required />
            <TextField id="businessEmail" label="Corporate Email Address" type="email" placeholder="julian@montgomerybespoke.com" required />
            <TextField id="territory" label="Country / Jurisdiction" placeholder="United Kingdom / European Union / US" required />
            <TextField
              id="brandUrl"
              label="Brand Website or Curated Portfolio / Social Reference"
              type="url"
              placeholder="https://www.yourbranddomain.com"
              className="md:col-span-2"
            />
          </div>
        </div>

        <div className="space-y-6 pt-6">
          <SectionHeading number="02" tag="Silhouettes" title="Footwear Styles" />
          <p className="type-body-sm text-on-surface-variant">
            Select all styles you are interested in:
          </p>
          <OptionGroup legend="Footwear typologies" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-2">
            {typologies.map((option) => (
              <OptionCard key={option.value} name="footwearType" {...option} />
            ))}
          </OptionGroup>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6">
          <div className="space-y-4">
            <SectionHeading number="03" tag="Order Scale" title="Batch Volume" />
            <p className="type-body-sm text-on-surface-variant">
              Minimum order is 12 pairs per style. Pricing is confirmed after we review your brief:
            </p>
            <SelectField
              id="quantityScale"
              label="Select Initial Batch Requirement"
              placeholder="Select anticipated volume..."
              icon="expand_more"
              options={[
                { value: "samples", label: "Prototyping & Fitting Samples (1 – 5 pairs)" },
                { value: "trial", label: "Trial Order (12 – 24 pairs)" },
                { value: "boutique", label: "Boutique Capsule (25 – 50 pairs)" },
                { value: "commercial", label: "Commercial Production Run (50 – 200 pairs)" },
                { value: "scaled", label: "Scaled Private Label Deployment (200+ pairs)" },
              ]}
            />
          </div>
          <div className="space-y-4">
            <SectionHeading number="04" tag="Milestones" title="Target Delivery Window" />
            <p className="type-body-sm text-on-surface-variant">
              Share your preferred window. Timelines are confirmed once specifications are agreed:
            </p>
            <SelectField
              id="timeline"
              label="Target Handover Season"
              placeholder="Select production window..."
              icon="schedule"
              options={[
                { value: "ss27", label: "Spring / Summer 2027 Delivery" },
                { value: "aw27", label: "Autumn / Winter 2027 Delivery" },
                { value: "sample_first", label: "Sample or Prototype First" },
                { value: "ongoing", label: "Ongoing / Repeat Orders" },
                { value: "discuss", label: "To Be Discussed" },
              ]}
            />
          </div>
        </div>

        <div className="space-y-6 pt-6">
          <SectionHeading number="05" tag="Customization" title="Branding & Customisation" />
          <p className="type-body-sm text-on-surface-variant">
            Branding and customisation options. Availability and any additional costs are confirmed before an order is finalised:
          </p>
          <OptionGroup legend="Private label options" className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            {brandingOptions.map((option) => (
              <OptionCard key={option.value} name="brandingOption" {...option} />
            ))}
          </OptionGroup>
        </div>

        <div className="space-y-6 pt-6">
          <SectionHeading number="06" tag="Documentation" title="Technical Pack & Specification Directives" />
          <div className="space-y-2">
            <label className={labelClass} htmlFor="specNotes">
              Materials, Sizing, Branding &amp; Target Costings
            </label>
            <textarea
              id="specNotes"
              name="specNotes"
              rows={5}
              placeholder="Include your preferred leather type and finish (e.g. smooth calf, suede, patent, embossed), colours, sole type, sizing, branding requirements, and any target price..."
              className={inputClass}
            />
          </div>
          <div className="space-y-2">
            <span className={labelClass} id="attachments-label">
              Attach Tech Packs, Last Dimensions or Visual References
            </span>
            {/* A <label> wrapping the input makes the whole zone clickable and keyboard-accessible. */}
            <label
              htmlFor="fileInput"
              onDragOver={(event) => {
                event.preventDefault();
                setDragging(true);
              }}
              onDragLeave={() => setDragging(false)}
              onDrop={handleDrop}
              className={`p-8 text-center cursor-pointer transition-all hover:bg-surface-container flex flex-col items-center justify-center space-y-3 has-focus-visible:ring-1 has-focus-visible:ring-ink ${
                dragging ? "bg-surface-container-high" : "bg-surface-container-low"
              }`}
            >
              <span className="w-12 h-12 rounded-full bg-surface flex items-center justify-center text-secondary shadow-xs">
                <Icon name="folder_zip" className="text-[24px]" />
              </span>
              <span className="space-y-1 block">
                <span className="type-headline-sm text-on-surface block">Click to upload or drag files here</span>
                <span className="type-body-sm text-on-surface-variant block">
                  Tech packs, design files, reference images or moodboards (PDF, ZIP, AI,
                  DXF, PNG up to 25MB)
                </span>
              </span>
              <input
                ref={fileInputRef}
                id="fileInput"
                name="attachments"
                type="file"
                multiple
                aria-labelledby="attachments-label"
                aria-describedby="fileStatus"
                className="sr-only"
                onChange={(event) => {
                  const files = event.currentTarget.files;
                  if (files && files.length > 0) setFileStatus(describeFiles(files));
                }}
              />
              <span id="fileStatus" aria-live="polite" className="type-label-sm text-secondary uppercase tracking-widest">
                {fileStatus}
              </span>
            </label>
          </div>
        </div>

        <div className="pt-6 space-y-6">
          <button
            type="submit"
            className="w-full py-5 bg-primary text-on-primary hover:bg-secondary transition-colors duration-200 uppercase type-label-md tracking-[0.25em] flex items-center justify-center gap-3 shadow-md"
          >
            <span>Submit Production Inquiry &amp; Request Quotation</span>
            <Icon name="arrow_forward" className="text-[18px]" />
          </button>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left text-outline">
            <div className="flex items-center gap-2">
              <Icon name="lock" className="text-[18px] text-secondary" />
              <span className="type-body-sm">Your brief is treated as confidential.</span>
            </div>
            <span className="type-label-sm uppercase tracking-widest">Shipping Agreed per Order</span>
          </div>
        </div>
      </form>

      {reference && (
        <div ref={confirmationRef} role="status" className="mt-8 p-8 bg-surface-container text-on-surface space-y-4">
          <div className="flex items-center gap-3 text-secondary">
            <Icon name="task_alt" className="text-[28px]" />
            <span className="type-headline-sm">Enquiry Received</span>
          </div>
          <p className="type-body-md text-on-surface-variant leading-relaxed">
            Thank you. Your enquiry has been received by the Mahikaar team. We will review your
            brief and reply by email to confirm feasibility, material availability, pricing, and
            estimated timelines.
          </p>
          <div className="pt-2 type-label-sm uppercase tracking-widest text-secondary">
            Enquiry Reference: <span>{reference}</span>
          </div>
        </div>
      )}
    </>
  );
}
