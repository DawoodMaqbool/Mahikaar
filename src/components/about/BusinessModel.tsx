import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { routes } from "@/lib/site";

const points = [
  {
    title: "What We Do",
    text: "We develop made-to-order Goodyear welted leather footwear for brands, boutiques, retailers and private-label businesses, working from reference styles or a buyer’s own design brief.",
  },
  {
    title: "How We Work",
    text: "Our team discusses your requirements and agrees the materials, fit, finishing and branding with you. Our craftsmen make each pair by hand in our workshop, with our team involved from pattern cutting through to the completed shoe.",
  },
  {
    title: "What You Can Expect",
    text: "Clear communication about specifications, material availability and timelines. Completed footwear is reviewed against the approved sample and agreed specifications before dispatch.",
  },
];

export function BusinessModel() {
  return (
    <section className="w-full bg-surface-container-low section-standard">
      <Container className="space-y-12">
        <div className="measure-body space-y-4">
          <Eyebrow>Working With Mahikaar</Eyebrow>
          <h2 className="type-headline-lg text-on-surface">From Your Brief to the Finished Shoe</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-10 gap-y-10">
          {points.map((point) => (
            <div key={point.title} className="min-w-0 border-t border-outline-variant pt-6 space-y-4">
              <h3 className="type-headline-sm text-on-surface">{point.title}</h3>
              <p className="type-body-md text-on-surface-variant">{point.text}</p>
            </div>
          ))}
        </div>

        <p className="type-body-sm text-on-surface-variant">
          Explore{" "}
          <Link href={routes.manufacturing} className="editorial-link">
            our manufacturing process
          </Link>{" "}
          or{" "}
          <Link href={routes.privateLabel} className="editorial-link">
            how ordering works
          </Link>
          .
        </p>
      </Container>
    </section>
  );
}
