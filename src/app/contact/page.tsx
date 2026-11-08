import type { Metadata } from "next";
import {
  ContactDetails,
  InstitutionalCommitments,
} from "@/components/contact/ContactBlocks";
import { ContactHero } from "@/components/contact/ContactHero";
import { ContactFaq } from "@/components/contact/ContactFaq";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Mahikaar to discuss made-to-order Goodyear welted footwear, materials, customisation and private-label requirements.",
};

export default function ContactPage() {
  return (
    <>
      <ContactHero />

      <section className="w-full bg-surface py-16 lg:py-24">
        <Container className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          <div className="lg:col-span-5 space-y-8">
            <ContactDetails showLocation />
          </div>
          <InstitutionalCommitments className="lg:col-span-7" />
        </Container>
      </section>

      <ContactFaq />
    </>
  );
}
