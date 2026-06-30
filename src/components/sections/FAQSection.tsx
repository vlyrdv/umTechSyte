import { faqItems } from "../../data/faq";
import { FAQItem } from "../ui/FAQItem";
import { Reveal } from "../ui/Reveal";
import { SectionTitle } from "../ui/SectionTitle";

export function FAQSection() {
  return (
    <section className="section" id="faq">
      <div className="container faq-section">
        <Reveal>
          <SectionTitle
            eyebrow="FAQ"
            title="Коротко о внедрении"
            description="Ответы на вопросы, которые обычно появляются перед первым обсуждением проекта."
          />
        </Reveal>
        <div className="faq-list">
          {faqItems.map((item, index) => (
            <Reveal key={item.question} delay={index * 45}>
              <FAQItem item={item} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
