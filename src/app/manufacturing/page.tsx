import { pageMetadata } from "@/lib/seo";
import { BenchProtocol } from "@/components/manufacturing/BenchProtocol";
import { ManufacturingIntro } from "@/components/manufacturing/ManufacturingIntro";
import { PrototypeCta } from "@/components/manufacturing/PrototypeCta";
import { QualityReview } from "@/components/manufacturing/QualityReview";
import { WorkshopAccess } from "@/components/manufacturing/WorkshopAccess";

export const metadata = pageMetadata("manufacturing");

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
