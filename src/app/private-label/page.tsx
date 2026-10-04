import type { Metadata } from "next";
import { PrivateLabelTeaser } from "@/components/home/PrivateLabelTeaser";
import { PrivateLabelPrecision } from "@/components/manufacturing/PrivateLabelPrecision";
import { PrototypeCta } from "@/components/manufacturing/PrototypeCta";
import { CustomDevelopmentBanner } from "@/components/portfolio/CustomDevelopmentBanner";
import { InquiryModalProvider } from "@/components/portfolio/InquiryModal";

export const metadata: Metadata = {
  title: "Private Label",
  description:
    "Proprietary last sculpting, debossed branded sockliners, custom brass hardware and archival packaging: Māhikar acts as the manufacturing wing for menswear labels.",
};

export default function PrivateLabelPage() {
  return (
    // The custom development banner opens the shared enquiry dialog, so it needs the provider.
    <InquiryModalProvider>
      <PrivateLabelTeaser headingLevel="h1" showActions={false} />
      <PrivateLabelPrecision />
      <CustomDevelopmentBanner />
      <PrototypeCta />
    </InquiryModalProvider>
  );
}
