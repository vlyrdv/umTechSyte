import { useEffect, useId, useState } from "react";
import type { PortfolioProject } from "../../data/types";
import { useIsMobileViewport } from "../../hooks/useIsMobileViewport";

type PortfolioCardProps = {
  project: PortfolioProject;
  compact?: boolean;
};

function PortfolioDetails({ project }: { project: PortfolioProject }) {
  return (
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
  );
}

export function PortfolioCard({ project, compact = false }: PortfolioCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const isMobileViewport = useIsMobileViewport();
  const titleId = useId();
  const shouldShowInlineDetails = !compact && isExpanded && !isMobileViewport;
  const shouldShowModalDetails = !compact && isExpanded && isMobileViewport;
  const visibleTechnologies = shouldShowInlineDetails
    ? project.technologies
    : project.technologies.slice(0, 4);

  useEffect(() => {
    if (!shouldShowModalDetails) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsExpanded(false);
      }
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [shouldShowModalDetails]);

  return (
    <>
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

        {shouldShowInlineDetails ? <PortfolioDetails project={project} /> : null}

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

      {shouldShowModalDetails ? (
        <div
          className="portfolio-modal"
          role="presentation"
          onClick={() => setIsExpanded(false)}
        >
          <div
            className="portfolio-modal__dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              className="portfolio-modal__close"
              type="button"
              aria-label="Закрыть подробности проекта"
              onClick={() => setIsExpanded(false)}
            >
              ×
            </button>
            <div className="portfolio-card__header">
              <span>{project.label}</span>
              <span>{project.category}</span>
            </div>
            <h3 id={titleId}>{project.title}</h3>
            <p>{project.description}</p>
            <PortfolioDetails project={project} />
            <div className="tag-list">
              {project.technologies.map((technology) => (
                <span key={technology}>{technology}</span>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
