import { Icon } from "@/components/ui/Icon";

/*
 * Contact-related panels shared by the Request a Quote sidebar and the Contact page.
 * Each takes an optional className so the parent controls layout (spacing, grid span).
 */

const commitments = [
  {
    title: "Strict Design NDA",
    text: "All pattern silhouettes, brass die prints, and lasts developed for private labels are governed by binding non-disclosure. We never disclose client portfolios or repurpose proprietary lasts.",
  },
  {
    title: "Sample Prototyping Approval",
    text: "Zero serial production commences prior to physical sample sign-off. We provide wear-testable prototypes with cross-sectional welt verification in 3 to 4 weeks.",
  },
  {
    title: "Lahore Master Patternmakers",
    text: "Direct communication with our technical team. Technical packs are interpreted by artisans boasting over three decades of British and Continental shoemaking lineage.",
  },
  {
    title: "Door-to-Door Freight",
    text: "Turnkey customs brokerage and bonded logistics across the UK, Continental Europe, North America, the UAE, and East Asia via LHE Air Freight and FOB Karachi maritime links.",
  },
];

const tanneries = [
  "Tanneries du Puy",
  "Charles F. Stead",
  "J&FJ Baker Oak Bark",
  "Horween Chicago",
  "Weinheimer Box Calf",
  "Dainite England",
];

export function InstitutionalCommitments({ className = "" }: { className?: string }) {
  return (
    <div className={`bg-surface-container p-8 space-y-6 shadow-xs ${className}`}>
      <div className="flex items-center gap-3">
        <Icon name="verified_user" className="text-secondary text-[24px]" />
        <h2 className="type-label-md uppercase tracking-wider text-on-surface">
          Institutional Commitments
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

export function ContactDetails({ className = "" }: { className?: string }) {
  return (
    <div className={`bg-surface-container-high p-8 space-y-6 shadow-xs ${className}`}>
      <span className="type-label-sm uppercase tracking-[0.2em] text-secondary block">
        Atelier Physical Presence
      </span>
      <div className="space-y-3">
        <h2 className="type-headline-sm text-on-surface">Lahore Manufacture &amp; Works</h2>
        <address className="not-italic type-body-sm text-on-surface-variant leading-relaxed">
          Plot 48-A, Gulberg Industrial Quarter
          <br />
          Old City Craft Guild Enclave
          <br />
          Lahore 54000, Pakistan
        </address>
      </div>
      <div className="space-y-2 pt-2">
        <span className="type-label-sm uppercase tracking-widest text-outline block">
          Direct Private Label Desk
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
        <h3 className="type-label-md uppercase tracking-wider text-secondary">In-Person Atelier Visits</h3>
        <p className="type-body-sm text-on-surface-variant">
          Visiting the Lahore works is open exclusively to brand principals and creative directors
          by prior diplomatic schedule.
        </p>
      </div>
    </div>
  );
}

export function TanneryLineage({ className = "" }: { className?: string }) {
  return (
    <div className={`bg-surface-container-low p-6 space-y-4 ${className}`}>
      <h2 className="type-label-sm uppercase tracking-widest text-secondary">Tannery Lineage</h2>
      <ul className="flex flex-wrap gap-2">
        {tanneries.map((name) => (
          <li key={name} className="px-2.5 py-1 bg-surface type-label-sm uppercase text-on-surface-variant">
            {name}
          </li>
        ))}
      </ul>
    </div>
  );
}
