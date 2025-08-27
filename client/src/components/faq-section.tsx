import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function FAQSection() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const faqs = [
    {
      question: "Do I need to pass IELTS or other English tests?",
      answer: "Yes, English proficiency is required. We provide guidance on the specific requirements and can recommend preparation courses if needed.",
      testId: "faq-english"
    },
    {
      question: "How long does the entire process take?",
      answer: "The complete process typically takes 3-6 months from application to starting work in the UK, depending on your profession and documentation.",
      testId: "faq-timeline"
    },
    {
      question: "Are there any upfront costs I need to pay?",
      answer: "Our services are completely free for successful applicants. We only charge fees after you've secured employment and arrived in the UK.",
      testId: "faq-costs"
    },
    {
      question: "What support do you provide after I arrive in the UK?",
      answer: "We provide comprehensive settling-in support including airport pickup, accommodation assistance, bank account setup, and ongoing career guidance for the first year.",
      testId: "faq-support"
    },
    {
      question: "Can I bring my family with me?",
      answer: "Yes, most healthcare visas allow you to bring your spouse and dependent children. We can provide guidance on the family visa application process.",
      testId: "faq-family"
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <section className="py-20 bg-card">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-6" data-testid="faq-title">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-muted-foreground" data-testid="faq-description">
              Everything you need to know about working in UK healthcare
            </p>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                className="border border-border rounded-lg p-6 hover:shadow-md transition-shadow"
                data-testid={faq.testId}
              >
                <div 
                  className="flex items-center justify-between cursor-pointer"
                  onClick={() => toggleFAQ(index)}
                  data-testid={`${faq.testId}-toggle`}
                >
                  <h3 className="text-lg font-semibold text-foreground">
                    {faq.question}
                  </h3>
                  {openFAQ === index ? (
                    <ChevronUp className="text-muted-foreground h-5 w-5" />
                  ) : (
                    <ChevronDown className="text-muted-foreground h-5 w-5" />
                  )}
                </div>
                {openFAQ === index && (
                  <div className="mt-4 text-muted-foreground" data-testid={`${faq.testId}-answer`}>
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
