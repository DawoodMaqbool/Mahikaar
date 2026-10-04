import { Container } from "@/components/ui/Container";

const faqs = [
  {
    topic: "Minimum Order Quantity",
    question: "What are your MOQ tolerances?",
    answer:
      "Our minimum production run begins at 25 pairs per style across standard European or UK size curves (UK 6 to 12). Single bespoke prototyping batches (1-5 pairs) are billed separately under preliminary R&D contracts.",
  },
  {
    topic: "Lead Times",
    question: "What is the delivery turnaround?",
    answer:
      "Initial master prototyping takes 3–4 weeks. Once sample fit and leather selection are certified by your team, bulk serial production typically takes 8 to 12 weeks depending on batch size and tannery lead times.",
  },
  {
    topic: "Leather Sourcing",
    question: "Can we specify proprietary hides?",
    answer:
      "Yes. We directly import audited European, American, and Japanese crusts, calfskins, and suedes, or we can cut from client-supplied hides delivered to our bonded export warehouse in Lahore.",
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
            <h2 className="type-headline-lg text-on-surface mt-1">Frequently Addressed Inquiries</h2>
          </div>
          <p className="type-body-sm text-on-surface-variant max-w-md">
            Commercial policies, batch minimums, and sampling terms for global footwear labels.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
          {faqs.map((faq, index) => (
            <article key={faq.question} className="bg-surface p-6 shadow-xs space-y-3">
              <span className="type-label-sm uppercase tracking-widest text-secondary">
                {String(index + 1).padStart(2, "0")} • {faq.topic}
              </span>
              <h3 className="type-headline-sm text-on-surface">{faq.question}</h3>
              <p className="type-body-sm text-on-surface-variant leading-relaxed">{faq.answer}</p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
