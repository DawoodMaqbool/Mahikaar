import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";

const stages = [
  {
    title: "Pattern & Material Preparation",
    points: [
      "Pattern and design accuracy",
      "Correct leather selection",
      "Cutting accuracy",
      "Component consistency",
    ],
  },
  {
    title: "Upper Preparation & Stitching",
    points: [
      "Leather panel alignment",
      "Stitching quality and consistency",
      "Brogue perforations and decorative patterns",
      "Overall upper workmanship",
    ],
  },
  {
    title: "Lasting & Goodyear Welted Construction",
    points: [
      "Shoe shape and proportions",
      "Construction consistency",
      "Welt stitching and visible workmanship",
      "Alignment with the approved design",
    ],
  },
  {
    title: "Sole & Heel Finishing",
    points: ["Sole attachment", "Heel alignment", "Edge finishing", "Overall finishing quality"],
  },
  {
    title: "Final Inspection",
    points: [
      "Left and right shoe consistency",
      "Overall shape and appearance",
      "Leather surface and finishing",
      "Branding and sizing",
      "Consistency with the approved sample and agreed specifications",
    ],
  },
];

export function QualityReview() {
  return (
    <section id="quality-review" className="w-full bg-surface section-standard scroll-mt-24">
      <Container className="space-y-12">
        <div className="measure-body space-y-4">
          <Eyebrow>Our Quality Inspection</Eyebrow>
          <h2 className="type-headline-lg text-on-surface">Inspected at Every Stage.</h2>
          <p className="type-body-md text-on-surface-variant leading-relaxed">
            Our team remains involved throughout production, reviewing each stage from pattern
            cutting to final finishing. Every completed pair is checked against the approved
            sample and agreed specifications before dispatch.
            Our workshop and our team both review the completed order before it leaves.
          </p>
        </div>

        <ol className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-10 gap-y-12">
          {stages.map((stage, index) => (
            <li
              key={stage.title}
              className="min-w-0 border-t border-outline-variant pt-6 space-y-4"
            >
              <span className="type-headline-md text-secondary">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="type-headline-sm text-on-surface">{stage.title}</h3>
              <ul className="space-y-2 type-body-sm text-on-surface-variant leading-relaxed">
                {stage.points.map((point) => (
                  <li key={point} className="flex items-start gap-2">
                    <span aria-hidden="true" className="mt-2 w-1 h-1 rounded-full bg-secondary shrink-0" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
