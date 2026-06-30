import { features } from "../../data/features";
import { FeatureCard } from "../cards/FeatureCard";
import { Reveal } from "../ui/Reveal";
import { SectionTitle } from "../ui/SectionTitle";
import { UMBotWorkspace } from "./InterfaceMockupSection";

export function FeaturesSection() {
  return (
    <section className="section">
      <div className="container">
        <div className="benefit-layout">
          <Reveal className="benefit-copy">
            <SectionTitle
              eyebrow="Практическая польза"
              title="Сначала бизнес-задача — потом технология"
              description="UMO Tech не внедряет AI ради красивого слова. Мы разбираем реальные проблемы бизнеса и создаём решения, которые помогают быстрее обрабатывать заявки, снижать ручную работу, находить ошибки, анализировать данные и принимать решения. AI для нас — инструмент, а не самоцель."
            />
          </Reveal>

          <Reveal className="benefit-bot" delay={120}>
            <UMBotWorkspace />
          </Reveal>
        </div>

        <div className="feature-grid">
          {features.map((feature, index) => (
            <Reveal key={feature.title} delay={index * 70}>
              <FeatureCard feature={feature} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
