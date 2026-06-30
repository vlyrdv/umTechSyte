import { industries } from "../../data/industries";
import { IndustryCard } from "../cards/IndustryCard";
import { Reveal } from "../ui/Reveal";
import { SectionTitle } from "../ui/SectionTitle";

export function IndustriesSection() {
  return (
    <section className="section" id="industries">
      <div className="container">
        <Reveal>
          <SectionTitle
            eyebrow="Сферы"
            title="Адаптируем AI/ML под вашу нишу"
            description="Учитываем процессы, документы, данные, CRM, каналы коммуникации и требования конкретного рынка."
          />
        </Reveal>
        <div className="industry-grid">
          {industries.map((industry, index) => (
            <Reveal key={industry.title} delay={index * 35}>
              <IndustryCard industry={industry} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
