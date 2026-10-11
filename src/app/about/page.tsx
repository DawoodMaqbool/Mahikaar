import type { Metadata } from "next";
import { CraftSpotlight } from "@/components/home/CraftSpotlight";
import { InquiryCta } from "@/components/home/InquiryCta";
import { ProvenanceSection } from "@/components/home/ProvenanceSection";
import { MaterialsSection } from "@/components/manufacturing/MaterialsSection";

export const metadata: Metadata = {
  title: "About Atelier",
  description:
    "Mahikaar is a Lahore-based business offering premium, made-to-order Goodyear welted footwear to B2B buyers, from our Lahore atelier, drawing on a local leather sourcing network.",
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
