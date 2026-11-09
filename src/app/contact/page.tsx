import { pageMetadata } from "@/lib/seo";
import {
  ContactDetails,
  InstitutionalCommitments,
} from "@/components/contact/ContactBlocks";
import { ContactHero } from "@/components/contact/ContactHero";
import { ContactFaq } from "@/components/contact/ContactFaq";
import { Container } from "@/components/ui/Container";

export const metadata = pageMetadata("contact");

export default function ContactPage() {
  return (
    <>
      <ContactHero />

      <section className="w-full bg-surface section-standard">
        <Container className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Scope panel overrides to Contact; QuoteSidebar keeps the shared presentation. */}
          <div className="lg:col-span-5 min-w-0 [&>div]:bg-transparent [&>div]:p-0 [&>div]:shadow-none [&>div>span:first-child]:hidden [&>div>div>h2]:type-headline-md [&>div>div>div]:shadow-none [&_#visits]:bg-transparent [&_#visits]:p-0 [&_#visits]:pt-6 [&_#visits]:border-t [&_#visits]:border-outline-variant [&_#visits]:shadow-none [&_#visits>h3]:type-headline-sm [&_#visits>h3]:normal-case [&_#visits>h3]:tracking-normal [&_a]:inline-flex [&_a]:min-h-12 [&_a]:max-w-full [&_a]:items-center [&_a]:break-all [&_a]:underline [&_a]:underline-offset-4 [&_a:focus-visible]:outline-2 [&_a:focus-visible]:outline-offset-4 [&_a:focus-visible]:outline-secondary">
            <ContactDetails showLocation />
          </div>
          <div className="lg:col-span-7 min-w-0 border-t border-outline-variant pt-6 [&>div]:bg-transparent [&>div]:p-0 [&>div]:shadow-none [&_.icon]:hidden [&_h2]:type-headline-md [&_h2]:normal-case [&_h2]:tracking-normal [&>div>div:last-child]:grid [&>div>div:last-child]:gap-8 [&>div>div:last-child]:space-y-0">
            <InstitutionalCommitments />
          </div>
        </Container>
      </section>

      <ContactFaq />
    </>
  );
}
