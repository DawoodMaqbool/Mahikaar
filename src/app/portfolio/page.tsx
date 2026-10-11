import type { Metadata } from "next";
import { BenchmarksSection } from "@/components/portfolio/BenchmarksSection";
import { CustomDevelopmentBanner } from "@/components/portfolio/CustomDevelopmentBanner";
import { InquiryModalProvider } from "@/components/portfolio/InquiryModal";
import { PortfolioCatalog } from "@/components/portfolio/PortfolioCatalog";
import { PortfolioIntro } from "@/components/portfolio/PortfolioIntro";

export const metadata: Metadata = {
  title: "Footwear Portfolio",
  description:
    "Reference styles in made-to-order Goodyear welted footwear (oxfords, loafers, brogues and boots) for private-label commissioning. Materials and customisation confirmed per project.",
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
