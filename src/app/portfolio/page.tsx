import type { Metadata } from "next";
import { BenchmarksSection } from "@/components/portfolio/BenchmarksSection";
import { CustomDevelopmentBanner } from "@/components/portfolio/CustomDevelopmentBanner";
import { InquiryModalProvider } from "@/components/portfolio/InquiryModal";
import { PortfolioCatalog } from "@/components/portfolio/PortfolioCatalog";
import { PortfolioIntro } from "@/components/portfolio/PortfolioIntro";

export const metadata: Metadata = {
  title: "Footwear Portfolio",
  description:
    "Made-to-order Goodyear welted specimens (oxfords, loafers, brogues and boots) available for private-label commissioning.",
};

export default function PortfolioPage() {
  return (
    // The provider is a client component, but the server components passed
    // in as children are still rendered on the server.
    <InquiryModalProvider>
      <PortfolioIntro />
      <PortfolioCatalog />
      <BenchmarksSection />
      <CustomDevelopmentBanner />
    </InquiryModalProvider>
  );
}
