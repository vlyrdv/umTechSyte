import type { PortfolioProject } from "../../data/types";
import { Button } from "../ui/Button";

type PortfolioCardProps = {
  project: PortfolioProject;
  compact?: boolean;
};

export function PortfolioCard({ project, compact = false }: PortfolioCardProps) {
  return (
    <article className={`portfolio-card ${compact ? "portfolio-card--compact" : ""}`}>
      <div className="portfolio-card__header">
        <span>{project.category}</span>
        <span>{project.type}</span>
      </div>
      <h3>{project.title}</h3>
      <p>{project.description}</p>

      {!compact ? (
        <div className="portfolio-card__body">
          <div>
            <strong>Задача</strong>
            <span>{project.clientTask}</span>
          </div>
          <div>
            <strong>Что сделано</strong>
            <span>{project.workDone}</span>
          </div>
        </div>
      ) : null}

      <div className="portfolio-card__result">
        <strong>Результат</strong>
        <span>{project.result}</span>
      </div>

      <div className="tag-list">
        {project.technologies.map((technology) => (
          <span key={technology}>{technology}</span>
        ))}
      </div>

      <Button href="/contacts" variant="ghost" size="sm">
        Подробнее
      </Button>
    </article>
  );
}
