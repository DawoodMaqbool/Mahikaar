import type { Metadata } from "next";
import { MaterialsSection } from "@/components/manufacturing/MaterialsSection";
import { InquiryModalProvider } from "@/components/portfolio/InquiryModal";
import { CommercialTerms } from "@/components/private-label/CommercialTerms";
import { Customisation } from "@/components/private-label/Customisation";
import { DesignDevelopment } from "@/components/private-label/DesignDevelopment";
import { OrderingJourney } from "@/components/private-label/OrderingJourney";
import { PrivateLabelCta } from "@/components/private-label/PrivateLabelCta";
import { PrivateLabelIntro } from "@/components/private-label/PrivateLabelIntro";

export const metadata: Metadata = {
  title: "Private Label",
  description:
    "Premium made-to-order Goodyear welted footwear for international brands: the seven-stage journey from enquiry to dispatch, leather options, branding and customisation, minimum orders and timelines.",
};

export default function PrivateLabelPage() {
  return (
    // The design-reference button opens the shared enquiry dialog, so it needs the provider.
    <InquiryModalProvider>
      <PrivateLabelIntro />
      <OrderingJourney />
      <MaterialsSection />
      <Customisation />
      <DesignDevelopment />
      <CommercialTerms />
      <PrivateLabelCta />
    </InquiryModalProvider>
  );
}
