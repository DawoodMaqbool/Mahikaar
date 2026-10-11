import type { Metadata } from "next";
import { BenchProtocol } from "@/components/manufacturing/BenchProtocol";
import { ManufacturingIntro } from "@/components/manufacturing/ManufacturingIntro";
import { MaterialsSection } from "@/components/manufacturing/MaterialsSection";
import { PrivateLabelPrecision } from "@/components/manufacturing/PrivateLabelPrecision";
import { PrototypeCta } from "@/components/manufacturing/PrototypeCta";

export const metadata: Metadata = {
  title: "Manufacturing & Craft",
  description:
    "How Mahikaar footwear is made: Goodyear welted construction carried out by hand, material selection and customisation for private-label orders.",
};

export default function ManufacturingPage() {
  return (
    <>
      <ManufacturingIntro />
      <BenchProtocol />
      <MaterialsSection />
      <PrivateLabelPrecision />
      <PrototypeCta />
    </>
  );
}
