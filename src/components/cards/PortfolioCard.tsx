import { useState } from "react";
import type { PortfolioProject } from "../../data/types";

type PortfolioCardProps = {
  project: PortfolioProject;
  compact?: boolean;
};

export function PortfolioCard({ project, compact = false }: PortfolioCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const visibleTechnologies = isExpanded ? project.technologies : project.technologies.slice(0, 4);

  return (
    <article
      className={`portfolio-card ${compact ? "portfolio-card--compact" : ""} ${
        isExpanded ? "is-expanded" : ""
      }`}
    >
      <div className="portfolio-card__header">
        <span>{project.label}</span>
        <span>{project.category}</span>
      </div>
      <h3>{project.title}</h3>
      <p>{project.description}</p>

      {!compact && isExpanded ? (
        <div className="portfolio-card__body">
          <div>
            <strong>Задача</strong>
            <span>{project.clientTask}</span>
          </div>
          <div>
            <strong>Что сделано</strong>
            <span>{project.workDone}</span>
          </div>
          <div>
            <strong>Результат</strong>
            <span>{project.result}</span>
          </div>
        </div>
      ) : null}

      <div className="tag-list">
        {visibleTechnologies.map((technology) => (
          <span key={technology}>{technology}</span>
        ))}
      </div>

      {!compact ? (
        <button
          className="button button--ghost button--sm"
          type="button"
          aria-expanded={isExpanded}
          onClick={() => setIsExpanded((value) => !value)}
        >
          <span>{isExpanded ? "Свернуть" : "Подробнее"}</span>
        </button>
      ) : null}
    </article>
  );
}
