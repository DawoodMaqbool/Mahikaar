import type { Metadata } from "next";
import { MaterialsSection } from "@/components/manufacturing/MaterialsSection";
import { PrivateLabelPrecision } from "@/components/manufacturing/PrivateLabelPrecision";
import { PrototypeCta } from "@/components/manufacturing/PrototypeCta";
import { CustomDevelopmentBanner } from "@/components/portfolio/CustomDevelopmentBanner";
import { InquiryModalProvider } from "@/components/portfolio/InquiryModal";
import { OrderingJourney } from "@/components/private-label/OrderingJourney";

export const metadata: Metadata = {
  title: "Private Label",
  description:
    "Client branding, agreed customisation and material selection for made-to-order Goodyear welted footwear. The complete ordering journey from enquiry to dispatch, with leather and material selection, made in our Lahore workshop.",
};

export default function PrivateLabelPage() {
  return (
    // The custom development banner opens the shared enquiry dialog, so it needs the provider.
    <InquiryModalProvider>
      <OrderingJourney />
      <MaterialsSection />
      <PrivateLabelPrecision />
      <CustomDevelopmentBanner />
      <PrototypeCta />
    </InquiryModalProvider>
  );
}
