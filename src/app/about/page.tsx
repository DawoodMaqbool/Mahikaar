import type { Metadata } from "next";
import { BusinessModel } from "@/components/about/BusinessModel";
import { InquiryCta } from "@/components/home/InquiryCta";
import { ProvenanceSection } from "@/components/home/ProvenanceSection";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Mahikaar is a Lahore-based business offering premium, made-to-order Goodyear welted footwear to B2B buyers, by our own shoemaking team in our Lahore workshop.",
};

export default function AboutPage() {
  return (
    <>
      <ProvenanceSection headingLevel="h1" />
      <BusinessModel />
      <InquiryCta />
    </>
  );
}
