import type { Metadata } from "next";
import { PrivateLabelPrecision } from "@/components/manufacturing/PrivateLabelPrecision";
import { PrototypeCta } from "@/components/manufacturing/PrototypeCta";
import { CustomDevelopmentBanner } from "@/components/portfolio/CustomDevelopmentBanner";
import { InquiryModalProvider } from "@/components/portfolio/InquiryModal";
import { OrderingJourney } from "@/components/private-label/OrderingJourney";

export const metadata: Metadata = {
  title: "Private Label",
  description:
    "Client branding, agreed customisation and material selection for made-to-order Goodyear welted footwear. Ordering journey from enquiry to dispatch, with Mahikaar coordinating production in Lahore.",
};

export default function PrivateLabelPage() {
  return (
    // The custom development banner opens the shared enquiry dialog, so it needs the provider.
    <InquiryModalProvider>
      <OrderingJourney />
      <PrivateLabelPrecision />
      <CustomDevelopmentBanner />
      <PrototypeCta />
    </InquiryModalProvider>
  );
}
