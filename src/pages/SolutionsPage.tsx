import { SolutionCard } from "../components/cards/SolutionCard";
import { Button } from "../components/ui/Button";
import { Reveal } from "../components/ui/Reveal";
import { SectionTitle } from "../components/ui/SectionTitle";
import { solutions } from "../data/solutions";

export function SolutionsPage() {
  return (
    <>
      <section className="page-hero page-hero--solutions">
        <div className="container page-hero__inner">
          <Reveal>
            <p className="page-hero__eyebrow">Решения</p>
            <h1>AI/ML-инструменты под реальные задачи бизнеса</h1>
            <p>
              Показываем, какие решения можно сделать: от AI-ассистентов и RAG
              до ML-моделей, Computer Vision, аналитики и продуктов под заказ.
            </p>
            <Button href="/contacts">Обсудить задачу</Button>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal>
            <SectionTitle
              title="Что можно внедрить"
              description="Каждое решение создаётся под вашу задачу, данные, команду и системы, к которым нужно подключиться."
            />
          </Reveal>
          <div className="solution-grid solution-grid--detailed">
            {solutions.map((solution, index) => (
              <Reveal key={solution.title} delay={index * 45} className="anchor-offset">
                <span
                  id={
                    solution.icon === "AI"
                      ? "ai-assistants"
                      : solution.icon === "ML"
                        ? "ml-models"
                        : undefined
                  }
                  className="anchor-target"
                />
                <SolutionCard solution={solution} detailed />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
