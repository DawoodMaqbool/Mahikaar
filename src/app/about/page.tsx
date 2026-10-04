import type { Metadata } from "next";
import { CraftSpotlight } from "@/components/home/CraftSpotlight";
import { InquiryCta } from "@/components/home/InquiryCta";
import { ProvenanceSection } from "@/components/home/ProvenanceSection";
import { MaterialsSection } from "@/components/manufacturing/MaterialsSection";

export const metadata: Metadata = {
  title: "About Atelier",
  description:
    "Māhikar Atelier unites historic Punjabi cordwaining with British and Continental bespoke shoemaking, serving clothiers, boutiques and independent labels worldwide from Lahore.",
};

// Built entirely from existing sections: the page is a new arrangement, not new content.
export default function AboutPage() {
  return (
    <>
      <ProvenanceSection headingLevel="h1" />
      <CraftSpotlight />
      <MaterialsSection />
      <InquiryCta />
    </>
  );
}
