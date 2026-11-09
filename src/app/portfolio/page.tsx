import { pageMetadata } from "@/lib/seo";
import { Suspense } from "react";
import { BenchmarksSection } from "@/components/portfolio/BenchmarksSection";
import { CustomDevelopmentBanner } from "@/components/portfolio/CustomDevelopmentBanner";
import { InquiryModalProvider } from "@/components/portfolio/InquiryModal";
import { PortfolioCatalog } from "@/components/portfolio/PortfolioCatalog";
import { PortfolioIntro } from "@/components/portfolio/PortfolioIntro";

export const metadata = pageMetadata("portfolio");

export default function PortfolioPage() {
  return (
    // The provider is a client component, but the server components passed
    // in as children are still rendered on the server.
    <InquiryModalProvider source="Portfolio" editorial>
      <PortfolioIntro />
      <Suspense fallback={<div aria-busy="true" aria-label="Loading footwear catalogue" />}><PortfolioCatalog /></Suspense>
      <BenchmarksSection />
      <CustomDevelopmentBanner />
    </InquiryModalProvider>
  );
}
