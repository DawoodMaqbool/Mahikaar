import { Icon } from "@/components/ui/Icon";

/*
 * Contact-related panels shared by the Request a Quote sidebar and the Contact page.
 * Each takes an optional className so the parent controls layout (spacing, grid span).
 */

const commitments = [
  {
    title: "Sample Approval",
    text: "Production begins only after your sample and specifications are approved.",
  },
  {
    title: "Specification Review",
    text: "We review your technical packs, references, and specifications with you before work begins, so your requirements are understood clearly and accurately.",
  },
  {
    title: "Shipping & Delivery",
    text: "Shipping and delivery arrangements are discussed and agreed for each order.",
  },
];

export function InstitutionalCommitments({ className = "" }: { className?: string }) {
  return (
    <div className={`bg-surface-container p-8 space-y-6 shadow-xs ${className}`}>
      <div className="flex items-center gap-3">
        <Icon name="verified_user" className="text-secondary text-[24px]" />
        <h2 className="type-label-md uppercase tracking-wider text-on-surface">
          Our Commitments
        </h2>
      </div>
      <div className="space-y-6">
        {commitments.map((item) => (
          <div key={item.title} className="space-y-1.5">
            <h3 className="type-headline-sm text-on-surface">{item.title}</h3>
            <p className="type-body-sm text-on-surface-variant leading-relaxed">{item.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ContactDetails({
  className = "",
  showLocation = false,
}: {
  className?: string;
  /** The Contact page states where the workshop is; the quote sidebar does not repeat it. */
  showLocation?: boolean;
}) {
  return (
    <div className={`bg-surface-container-high p-8 space-y-6 shadow-xs ${className}`}>
      <span className="type-label-sm uppercase tracking-[0.2em] text-secondary block">
        Get in Touch
      </span>
      <div className="space-y-3">
        <h2 className="type-headline-sm text-on-surface">Private Label Enquiries</h2>
        <p className="type-body-sm text-on-surface-variant leading-relaxed">
          Enquiries are handled directly by our private-label desk.{showLocation && " Our workshop is in Lahore, Pakistan."}
        </p>
      </div>
      <div className="space-y-2 pt-2">
        <span className="type-label-sm uppercase tracking-widest text-outline block">
          Email &amp; Phone
        </span>
        <p className="type-body-md text-on-surface font-medium">
          <a href="mailto:b2b@mahikaratelier.com" className="hover:text-secondary transition-colors">
            b2b@mahikaratelier.com
          </a>
        </p>
        <p className="type-body-md text-on-surface font-medium">
          <a href="tel:+924235789840" className="hover:text-secondary transition-colors">
            +92 (42) 3578-9840
          </a>
        </p>
      </div>
      <div id="visits" className="pt-4 bg-surface p-4 shadow-xs space-y-2 scroll-mt-24">
        <h3 className="type-label-md uppercase tracking-wider text-secondary">Workshop Visits</h3>
        <p className="type-body-sm text-on-surface-variant">
          Prospective buyers may be able to visit our workshop, subject to prior arrangement
          and availability. Video calls, photographs, videos and physical samples are also
          available.
        </p>
      </div>
    </div>
  );
}
