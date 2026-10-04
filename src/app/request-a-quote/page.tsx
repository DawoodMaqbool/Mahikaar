import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { QuoteFaq } from "@/components/quote/QuoteFaq";
import { QuoteForm } from "@/components/quote/QuoteForm";
import { QuoteHero } from "@/components/quote/QuoteHero";
import { QuoteSidebar } from "@/components/quote/QuoteSidebar";

export const metadata: Metadata = {
  title: "Request a Quote",
  description:
    "Submit your private-label production brief. Our Lahore production director returns a manufacturing dossier and batch quotation within two business days.",
};

export default function RequestQuotePage() {
  return (
    <>
      <QuoteHero />

      <section className="w-full bg-surface py-16 lg:py-24">
        <Container className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-8 bg-surface-container-lowest p-8 lg:p-12 shadow-xs">
            <div className="mb-10 pb-6 bg-surface-container-low px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <Icon name="verified" className="text-secondary text-[22px]" />
                <span className="type-label-md uppercase tracking-wider text-on-surface">
                  Confidential Commercial Protocol
                </span>
              </div>
              <span className="type-label-sm uppercase tracking-widest text-outline">Ref: B2B-INQ-2025</span>
            </div>
            <QuoteForm />
          </div>

          <QuoteSidebar />
        </Container>
      </section>

      <QuoteFaq />
    </>
  );
}
