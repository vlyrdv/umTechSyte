import { portfolioProjects } from "../../data/portfolio";
import { PortfolioCard } from "../cards/PortfolioCard";
import { Button } from "../ui/Button";
import { Reveal } from "../ui/Reveal";
import { SectionTitle } from "../ui/SectionTitle";

export function PortfolioPreviewSection() {
  return (
    <section className="section section--muted">
      <div className="container">
        <Reveal>
          <SectionTitle
            eyebrow="Примеры проектов"
            title="Портфолио AI/ML-решений"
            description="Пока реальные кейсы можно заменить mock-карточками. Структура уже готова для будущего наполнения."
          />
        </Reveal>
        <div className="portfolio-grid portfolio-grid--preview">
          {portfolioProjects.slice(0, 4).map((project, index) => (
            <Reveal key={project.id} delay={index * 75}>
              <PortfolioCard project={project} compact />
            </Reveal>
          ))}
        </div>
        <Reveal className="section-action">
          <Button href="/portfolio" variant="secondary">
            Смотреть всё портфолио
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
