import { Container } from "@/components/ui/Container";

const faqs = [
  {
    topic: "Minimum Order Quantity",
    question: "What is your minimum order quantity?",
    answer:
      "Our minimum production run begins at 12 pairs per design/article and colour, with mixed sizes permitted, across standard European or UK size curves (UK 6 to 12) or tailored to your custom sizing.",
  },
  {
    topic: "Lead Times",
    question: "What is the delivery turnaround?",
    answer:
      "Sample development typically takes approximately 2–3 weeks. Once your team has approved the sample and specifications and commercial arrangements are agreed, bulk production takes approximately 2–4 weeks, depending on seasonal demand. Production timelines begin once the required advance and agreed production specifications are in place. Timelines are approximate and depend on the design and material availability.",
  },
  {
    topic: "Leather Sourcing",
    question: "Which leathers can you work with?",
    answer:
      "A range of leather types, textures, colours and finishes can be discussed according to your design and its intended use. Availability, specifications and pricing are confirmed against order quantity and sourcing requirements. See the Private Label page for the material options.",
  },
  {
    topic: "Branding & Customisation",
    question: "Can you produce footwear under our brand?",
    answer:
      "Yes. Client branding and agreed customisation, such as insole branding, hardware, packaging, and material or colour choices, can be discussed for each project. Availability and any additional costs are confirmed before an order is finalised.",
  },
  {
    topic: "Enquiry Process",
    question: "What happens after I send an enquiry?",
    answer:
      "Share your design reference and your requirements for quantities, sizes, colours, materials, and branding. We then confirm feasibility, material availability, pricing, and estimated timelines. Once the specifications and commercial terms are agreed, we proceed with your sample and order.",
  },
];

export function QuoteFaq() {
  return (
    <section className="w-full bg-surface-container py-16">
      <Container className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="type-label-sm uppercase tracking-[0.25em] text-secondary">
              Manufacturing Inquiry FAQ
            </span>
            <h2 className="type-headline-lg text-on-surface mt-1">
              Frequently Addressed Inquiries
            </h2>
          </div>
          <p className="type-body-sm text-on-surface-variant max-w-md">
            Commercial policies, batch minimums, and sampling terms for global
            footwear labels.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
          {faqs.map((faq, index) => (
            <article
              key={faq.question}
              className="bg-surface p-6 shadow-xs space-y-3"
            >
              <span className="type-label-sm uppercase tracking-widest text-secondary">
                {String(index + 1).padStart(2, "0")} • {faq.topic}
              </span>
              <h3 className="type-headline-sm text-on-surface">
                {faq.question}
              </h3>
              <p className="type-body-sm text-on-surface-variant leading-relaxed">
                {faq.answer}
              </p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
