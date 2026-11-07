import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Icon } from "@/components/ui/Icon";

const activities = [
  {
    icon: "visibility",
    title: "Workshop Checks During Production",
    text: "The workshop checks each pair as production progresses, so issues can be addressed while the shoe is still being made.",
  },
  {
    icon: "fact_check",
    title: "Joint Final Review",
    text: "Both the workshop and Mahikaar review the completed order against the approved sample and agreed specifications before dispatch.",
  },
];

const reviewAreas = [
  "Design and pattern consistency",
  "Left and right pair matching",
  "Visible stitching and workmanship",
  "Welt, sole and heel attachment and finishing",
  "Leather surface and finishing",
  "Branding, sizing and agreed specifications",
];

export function QualityReview() {
  return (
    <section id="quality-review" className="w-full bg-surface py-20 scroll-mt-24">
      <Container className="space-y-12">
        <div className="max-w-2xl space-y-3">
          <Eyebrow>Quality Review</Eyebrow>
          <h2 className="type-headline-lg text-on-surface">Quality Reviewed at Every Stage.</h2>
          <p className="type-body-md text-on-surface-variant">
            Two distinct activities keep each order in line with the sample you approved.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {activities.map((item) => (
            <div key={item.title} className="bg-surface-container-low p-8 shadow-xs space-y-3">
              <Icon name={item.icon} className="text-secondary text-2xl" />
              <h3 className="type-headline-sm text-on-surface">{item.title}</h3>
              <p className="type-body-sm text-on-surface-variant leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-5 space-y-3">
            <h3 className="type-headline-md text-on-surface">What the Review Covers</h3>
            <p className="type-body-sm text-on-surface-variant leading-relaxed">
              Identified production defects are raised with the workshop for correction or
              replacement before dispatch.
            </p>
          </div>
          <ul className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {reviewAreas.map((area) => (
              <li
                key={area}
                className="flex items-start gap-3 bg-surface-container-lowest p-4 shadow-xs type-body-sm text-on-surface"
              >
                <Icon name="check_circle" className="text-secondary text-lg mt-0.5" />
                <span>{area}</span>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
