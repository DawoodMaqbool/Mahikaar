import type { Metadata } from "next";
import { BusinessModel } from "@/components/about/BusinessModel";
import { InquiryCta } from "@/components/home/InquiryCta";
import { ProvenanceSection } from "@/components/home/ProvenanceSection";
import { MaterialsSection } from "@/components/manufacturing/MaterialsSection";

export const metadata: Metadata = {
  title: "About Atelier",
  description:
    "Mahikaar is a Lahore-based business offering premium, made-to-order Goodyear welted footwear to B2B buyers, through an established Lahore workshop, drawing on a local leather sourcing network.",
};

export default function AboutPage() {
  return (
    <>
      <ProvenanceSection headingLevel="h1" />
      <BusinessModel />
      <MaterialsSection />
      <InquiryCta />
    </>
  );
}
