import type { Metadata } from "next";
import { BenchProtocol } from "@/components/manufacturing/BenchProtocol";
import { ManufacturingIntro } from "@/components/manufacturing/ManufacturingIntro";
import { PrototypeCta } from "@/components/manufacturing/PrototypeCta";
import { QualityReview } from "@/components/manufacturing/QualityReview";
import { WorkshopAccess } from "@/components/manufacturing/WorkshopAccess";

export const metadata: Metadata = {
  title: "Manufacturing & Craft",
  description:
    "How Mahikaar footwear is made: Goodyear welted construction carried out by hand, our manufacturing stages, production supervision and quality inspection.",
};

export default function ManufacturingPage() {
  return (
    <>
      <ManufacturingIntro />
      <BenchProtocol />
      <QualityReview />
      <WorkshopAccess />
      <PrototypeCta />
    </>
  );
}
