import { CraftSpotlight } from "@/components/home/CraftSpotlight";
import { HomeHero } from "@/components/home/HomeHero";
import { InquiryCta } from "@/components/home/InquiryCta";
import { PrivateLabelTeaser } from "@/components/home/PrivateLabelTeaser";
import { ProvenanceSection } from "@/components/home/ProvenanceSection";
import { SpecimensSection } from "@/components/home/SpecimensSection";

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <ProvenanceSection />
      <SpecimensSection />
      <CraftSpotlight />
      <PrivateLabelTeaser />
      <InquiryCta />
    </>
  );
}
