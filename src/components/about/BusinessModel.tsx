import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { routes } from "@/lib/site";

const points = [
  {
    title: "Our Business",
    text: "Mahikaar makes premium, made-to-order leather footwear for B2B buyers, with our own workshop and shoemaking team.",
  },
  {
    title: "Our Shoemaking Team",
    text: "Our workshop is home to our production team and craftsmen, who make each pair by hand, using Goodyear welted construction.",
  },
  {
    title: "Hands-On Oversight",
    text: "Our team is present at the workshop and involved from pattern cutting through to the completed shoe, so the footwear you approve is the footwear you receive.",
  },
];

export function BusinessModel() {
  return (
    <section className="w-full bg-surface-container-low py-20 border-b border-outline-variant/30">
      <Container className="space-y-12">
        <div className="max-w-2xl space-y-3">
          <Eyebrow>Our Workshop &amp; Our Team</Eyebrow>
          <h2 className="type-headline-lg text-on-surface">Made by Our Own Hands</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {points.map((point) => (
            <div key={point.title} className="bg-surface-container-lowest p-8 shadow-xs space-y-3">
              <h3 className="type-headline-sm text-on-surface">{point.title}</h3>
              <p className="type-body-sm text-on-surface-variant leading-relaxed">{point.text}</p>
            </div>
          ))}
        </div>

        <p className="type-body-sm text-on-surface-variant">
          Explore{" "}
          <Link href={routes.manufacturing} className="text-secondary hover:text-on-surface underline underline-offset-4">
            our manufacturing process
          </Link>{" "}
          or{" "}
          <Link href={routes.privateLabel} className="text-secondary hover:text-on-surface underline underline-offset-4">
            how ordering works
          </Link>
          .
        </p>
      </Container>
    </section>
  );
}
