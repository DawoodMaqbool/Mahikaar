import { pageMetadata } from "@/lib/seo";
import { Container } from "@/components/ui/Container";
import { AfterEnquiry } from "@/components/quote/AfterEnquiry";
import { QuoteForm } from "@/components/quote/QuoteForm";
import { QuoteHero } from "@/components/quote/QuoteHero";
import { QuoteSidebar } from "@/components/quote/QuoteSidebar";

export const metadata = pageMetadata("quote");

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
