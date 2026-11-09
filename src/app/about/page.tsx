import { pageMetadata } from "@/lib/seo";
import { BusinessModel } from "@/components/about/BusinessModel";
import { InquiryCta } from "@/components/home/InquiryCta";
import { ProvenanceSection } from "@/components/home/ProvenanceSection";

export const metadata = pageMetadata("about");

export default function AboutPage() {
  return (
    <>
      <ProvenanceSection headingLevel="h1" />
      <BusinessModel />
      <InquiryCta />
    </>
  );
}
