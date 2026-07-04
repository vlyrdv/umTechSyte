import { solutions } from "../../data/solutions";
import { SolutionCard } from "../cards/SolutionCard";
import { Button } from "../ui/Button";
import { Reveal } from "../ui/Reveal";
import { SectionTitle } from "../ui/SectionTitle";

const homeSolutionTitles = new Set([
  "AI-ассистенты для сотрудников",
  "RAG-системы и базы знаний",
  "Аналитика, отчёты и работа с данными",
  "Подключение к CRM и мессенджерам"
]);

export function SolutionsPreviewSection() {
  const homeSolutions = solutions.filter((solution) => homeSolutionTitles.has(solution.title));

  return (
    <section className="section section--muted" id="solutions">
      <div className="container">
        <Reveal>
          <SectionTitle
            eyebrow="Что мы разрабатываем"
            title="Ключевые направления UMO Tech"
            description="На главной оставляем главное: ассистенты, базы знаний, аналитику и подключение к рабочим системам. Остальные направления собраны на странице решений."
          />
        </Reveal>
        <div className="solution-grid">
          {homeSolutions.map((solution, index) => (
            <Reveal key={solution.title} delay={index * 55}>
              <SolutionCard solution={solution} />
            </Reveal>
          ))}
        </div>
        <Reveal className="section-action">
          <Button href="/solutions" variant="secondary">
            Все решения
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
