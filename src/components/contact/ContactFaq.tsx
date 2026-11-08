import { Container } from "@/components/ui/Container";

const faqs = [
  {
    topic: "Minimum Order Quantity",
    question: "What is your minimum order quantity?",
    answer:
      "Our minimum production run begins at 12 pairs per design/article and colour, with mixed sizes permitted. Standard UK size references are available from 6–12, and other sizing and fit requirements can be discussed for individual projects.",
  },
  {
    topic: "Lead Times",
    question: "What is the delivery turnaround?",
    answer:
      "Sample development typically takes approximately 2–3 weeks. Once your team has approved the sample and specifications and commercial arrangements are agreed, bulk production takes approximately 2–4 weeks, depending on seasonal demand. Production timelines begin once the required advance and agreed production specifications are in place. Timelines are approximate and depend on the design and material availability.",
  },
  {
    topic: "Leather Options",
    question: "Which leathers can you work with?",
    answer:
      "A range of leather types, textures, colours and finishes can be discussed according to your design and its intended use. Availability, specifications and pricing are confirmed against order quantity and sourcing requirements. See the Private Label page for the material options.",
  },
  {
    topic: "Branding & Customisation",
    question: "Can you produce footwear under our brand?",
    answer:
      "Yes. Applying your logo is included in the usual price. Selected customisation options, such as hardware, or material and colour choices, can be arranged for each project, and branded shoe boxes and dust bags can be discussed separately. Availability, feasibility and any additional costs are confirmed before production begins.",
  },
  {
    topic: "Enquiry Process",
    question: "What happens after I send an enquiry?",
    answer:
      "Share your design reference and your requirements for quantities, sizes, colours, materials, and branding. We then confirm feasibility, material availability, pricing, and estimated timelines. Once the specifications and commercial terms are agreed, we proceed with your sample and order.",
  },
];

export function ContactFaq() {
  return (
    <section className="w-full bg-surface-container-low section-standard">
      <Container className="space-y-10 lg:space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="type-headline-lg text-on-surface">
              Frequently Asked Questions
            </h2>
          </div>
          <p className="type-body-sm text-on-surface-variant max-w-md">
            Answers on minimum quantities, lead times, materials and branding.
          </p>
        </div>

        <div className="space-y-0">
          {faqs.map((faq, index) => (
            <article
              key={faq.question}
              className="min-w-0 border-t border-outline-variant py-8 md:py-10 grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-10"
            >
              <span className="lg:col-span-3 type-eyebrow uppercase text-secondary">
                {String(index + 1).padStart(2, "0")} • {faq.topic}
              </span>
              <div className="lg:col-span-9 min-w-0 space-y-4 measure-body">
              <h3 className="type-headline-sm text-on-surface">
                {faq.question}
              </h3>
              <p className="type-body-md text-on-surface-variant">
                {faq.answer}
              </p>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
