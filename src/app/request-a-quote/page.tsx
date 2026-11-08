import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { AfterEnquiry } from "@/components/quote/AfterEnquiry";
import { QuoteForm } from "@/components/quote/QuoteForm";
import { QuoteHero } from "@/components/quote/QuoteHero";
import { QuoteSidebar } from "@/components/quote/QuoteSidebar";

export const metadata: Metadata = {
  title: "Request a Quote",
  description:
    "Share your brief for made-to-order Goodyear welted footwear. We confirm feasibility, material availability, pricing and estimated timelines before an order is finalised.",
};

export default function RequestQuotePage() {
  return (
    <>
      <QuoteHero />

      <section className="w-full bg-surface section-standard">
        <Container className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-8 min-w-0">
            <QuoteForm />
          </div>

          <QuoteSidebar />
        </Container>
      </section>

      <AfterEnquiry />
    </>
  );
}
