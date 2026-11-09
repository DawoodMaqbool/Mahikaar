import Link from "next/link";
import { catalogueHref } from "@/data/portfolio";
import { Container } from "@/components/ui/Container";
import { routes } from "@/lib/site";

const capabilities = [
  "Goodyear Welted Construction",
  "Hand-Lasting & Hand-Welting",
  "Private Label & Client Branding",
  "Made-to-Order Leather Footwear",
  "Material Selection & Customisation",
];

const specimenLinks = [
  { label: "Full & Semi Brogues", href: catalogueHref("full-brogue-wingtip") },
  { label: "Calf Leather Oxfords", href: catalogueHref("oxfords-derbies") },
  { label: "Chelsea Boots", href: catalogueHref("boots") },
  { label: "Unlined Penny Loafers", href: catalogueHref("loafers-slip-ons") },
  { label: "Double & Single Monkstraps", href: routes.portfolio },
];

const inquiryLinks = [
  { label: "Minimum Orders & Customisation", href: routes.privateLabel },
  { label: "Leather & Material Options", href: routes.manufacturing },
  { label: "Contact Us", href: routes.contact },
];

const footerLink =
  "inline-flex min-h-11 max-w-full items-center py-2 text-outline-variant hover:text-surface hover:underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-surface";

export function SiteFooter() {
  return (
    <footer className="w-full bg-ink text-surface pt-16 pb-10">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-x-10 gap-y-10 pb-10">
          <div className="md:col-span-6 lg:col-span-3 min-w-0 space-y-4">
            <p className="type-headline-md text-surface">Mahikaar</p>
            <p className="type-body-sm text-outline-variant max-w-sm">
              Premium, made-to-order Goodyear welted leather footwear for B2B buyers.
            </p>
            <p className="type-body-sm text-outline-variant">Lahore, Pakistan</p>
          </div>

          <div className="md:col-span-4 lg:col-span-6 min-w-0 space-y-5">
            <h2 className="type-headline-sm text-surface">Footwear &amp; Capabilities</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
              <nav aria-label="Footwear and capabilities" className="min-w-0">
                <ul className="type-body-sm">
                  {specimenLinks.map(({ label, href }) => (
                    <li key={label}>
                      <Link href={href} className={footerLink}>{label}</Link>
                    </li>
                  ))}
                  {inquiryLinks.filter((link) => link.href !== routes.contact).map((link) => (
                    <li key={link.label}>
                      <Link href={link.href} className={footerLink}>{link.label}</Link>
                    </li>
                  ))}
                </ul>
              </nav>
              <ul aria-label="B2B capabilities" className="min-w-0 space-y-3 type-body-sm text-outline-variant">
                {capabilities.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </div>
          </div>

          <nav aria-label="Enquiries" className="md:col-span-2 lg:col-span-3 min-w-0 space-y-5">
            <h2 className="type-headline-sm text-surface">Enquiries</h2>
            <ul className="type-body-sm">
              <li>
                <Link href={routes.quote} className={`${footerLink} text-surface font-medium underline`}>
                  Request a Quote
                </Link>
              </li>
              {inquiryLinks.filter((link) => link.href === routes.contact).map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className={footerLink}>{link.label}</Link>
                </li>
              ))}
            </ul>
            <p className="type-body-sm text-outline-variant">Shipping Arranged per Order</p>
          </nav>
        </div>

        <div className="border-t border-outline-variant/30 pt-6 flex flex-col md:flex-row md:items-start justify-between gap-4 type-body-sm text-outline-variant">
          <p>© 2026 Mahikaar. Made-to-order leather footwear.</p>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <span>Goodyear Welted</span>
            <span>Made to Order</span>
          </div>
        </div>
      </Container>
    </footer>
  );
}
