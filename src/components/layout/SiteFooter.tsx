import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { routes } from "@/lib/site";

const capabilities = [
  "Hand-Sewn Goodyear Welted (270° & 360°)",
  "Artisanal Hand-Lasting & Hand-Welting",
  "Private Label & Custom White-Label Runs",
  "Bespoke Last Sculpting & Archival MTO",
  "European Box Calf & Horween Sourcing",
];

const specimenLinks = [
  "Full & Semi Brogues",
  "Museum Calf Oxfords",
  "Hand-Blocked Chelsea Boots",
  "Unlined Penny Loafers",
  "Double & Single Monkstraps",
];

const inquiryLinks = [
  { label: "Schedule Lahore Atelier Inquest", href: routes.contact },
  { label: "Tannery Traceability & Sourcing Dossier", href: routes.manufacturing },
  { label: "Minimum Order Tolerances & B2B Terms", href: routes.privateLabel },
];

const columnHeading =
  "type-label-sm uppercase tracking-[0.2em] text-secondary-container block";

export function SiteFooter() {
  return (
    <footer className="w-full bg-ink text-surface border-t border-outline-variant/20 pt-16 pb-12">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-14 border-b border-[#2d2c2a]">
          <div className="lg:col-span-4 space-y-4">
            <p className="type-headline-md tracking-normal text-surface">Māhikar Atelier</p>
            <p className="type-body-sm text-outline-variant leading-relaxed max-w-sm">
              Handcrafted institutional shoemaking synthesizing historical Punjabi leathercraft
              with English bespoke proportions. Commissioned by Savile Row houses, Continental
              luxury purveyors, and independent sartorial labels.
            </p>
            <address className="not-italic pt-2 type-body-sm text-outline-variant/80 space-y-1">
              <p className="font-medium text-surface">Manufacture &amp; Archival Last Vault:</p>
              <p>Plot 48-A, Gulberg Industrial Quarter</p>
              <p>Old City Craft Guild Enclave, Lahore 54000, Pakistan</p>
            </address>
          </div>

          <div className="lg:col-span-3 space-y-4">
            <h2 className={columnHeading}>B2B Capabilities</h2>
            <ul className="space-y-2.5 type-body-sm text-outline-variant">
              {capabilities.map((item) => (
                <li key={item} className="hover:text-surface transition-colors">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <nav aria-label="Specimens" className="lg:col-span-2 space-y-4">
            <h2 className={columnHeading}>Specimens</h2>
            <ul className="space-y-2.5 type-body-sm text-outline-variant">
              {specimenLinks.map((label) => (
                <li key={label}>
                  <Link href={routes.portfolio} className="hover:text-surface transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Commission and inquiries" className="lg:col-span-3 space-y-4">
            <h2 className={columnHeading}>Commission &amp; Inquiries</h2>
            <ul className="space-y-2.5 type-body-sm text-outline-variant">
              <li>
                <Link
                  href={routes.quote}
                  className="text-surface font-medium hover:text-secondary-container transition-colors"
                >
                  Request Commercial Dossier &amp; Quote →
                </Link>
              </li>
              {inquiryLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="hover:text-surface transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="pt-3">
              <div className="inline-block px-3 py-1.5 border border-outline-variant/30 text-outline-variant type-label-sm uppercase tracking-widest">
                Export Protocol: FOB Karachi / LHE Air
              </div>
            </div>
          </nav>
        </div>

        <div className="pt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 type-body-sm text-outline-variant/70">
          <p>
            © 2025 Māhikar Atelier &amp; Manufacture. Handcrafted in Lahore, Pakistan. Serving
            Savile Row, European Boutiques &amp; Global Private Labels.
          </p>
          <div className="flex items-center gap-6 type-label-sm uppercase tracking-widest">
            <span>ISO 9001 Certified Lasting</span>
            <span>BSCI Ethical Atelier</span>
          </div>
        </div>
      </Container>
    </footer>
  );
}
