import { pageMetadata } from "@/lib/seo";
import { MaterialsSection } from "@/components/manufacturing/MaterialsSection";
import { InquiryModalProvider } from "@/components/portfolio/InquiryModal";
import { CommercialTerms } from "@/components/private-label/CommercialTerms";
import { Customisation } from "@/components/private-label/Customisation";
import { DesignDevelopment } from "@/components/private-label/DesignDevelopment";
import { OrderingJourney } from "@/components/private-label/OrderingJourney";
import { PrivateLabelCta } from "@/components/private-label/PrivateLabelCta";
import { PrivateLabelIntro } from "@/components/private-label/PrivateLabelIntro";

export const metadata = pageMetadata("privateLabel");

export default function PrivateLabelPage() {
  return (
    // The design-reference button opens the shared enquiry dialog, so it needs the provider.
    <InquiryModalProvider source="Private Label">
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
