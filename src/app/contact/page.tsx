import type { Metadata } from "next";
import {
  ContactDetails,
  InstitutionalCommitments,
  TanneryLineage,
} from "@/components/contact/ContactBlocks";
import { InquiryCta } from "@/components/home/InquiryCta";
import { QuoteFaq } from "@/components/quote/QuoteFaq";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact the Māhikar Atelier private label desk in Lahore, or arrange an atelier visit to review leather swatches, lasts and cost structures.",
};

export default function ContactPage() {
  return (
    <>
      <InquiryCta headingLevel="h1" consultationHref="#visits" />

      <section className="w-full bg-surface py-16 lg:py-24">
        <Container className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          <div className="lg:col-span-5 space-y-8">
            <ContactDetails />
            <TanneryLineage />
          </div>
          <InstitutionalCommitments className="lg:col-span-7" />
        </Container>
      </section>

      <QuoteFaq />
    </>
  );
}
