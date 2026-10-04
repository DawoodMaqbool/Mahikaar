import type { Metadata } from "next";
import { BenchProtocol } from "@/components/manufacturing/BenchProtocol";
import { ManufacturingIntro } from "@/components/manufacturing/ManufacturingIntro";
import { MaterialsSection } from "@/components/manufacturing/MaterialsSection";
import { PrivateLabelPrecision } from "@/components/manufacturing/PrivateLabelPrecision";
import { PrototypeCta } from "@/components/manufacturing/PrototypeCta";

export const metadata: Metadata = {
  title: "Manufacturing & Craft",
  description:
    "The 8-stage bench protocol behind every Māhikar pair: carved lasts, hand clicking, Goodyear hand-welting, European tannages and private-label tooling.",
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
