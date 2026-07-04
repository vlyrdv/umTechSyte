import { processSteps } from "../../data/process";
import { ProcessStepCard } from "../cards/ProcessStepCard";
import { Reveal } from "../ui/Reveal";
import { SectionTitle } from "../ui/SectionTitle";

export function ProcessSection() {
  return (
    <section className="section">
      <div className="container">
        <Reveal>
          <SectionTitle
            eyebrow="Как мы работаем"
            title="Прозрачный процесс от задачи до запуска"
            description="Клиенту достаточно обозначить задачу или проблему. Мы изучаем её, разбираемся в работе компании, продумываем решение и помогаем запустить его в команде."
          />
        </Reveal>
        <div className="process-timeline">
          {processSteps.map((step, index) => (
            <Reveal key={step.title} delay={index * 100}>
              <ProcessStepCard step={step} index={index} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
