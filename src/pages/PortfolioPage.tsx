import { useMemo, useState } from "react";
import { PortfolioCard } from "../components/cards/PortfolioCard";
import { Reveal } from "../components/ui/Reveal";
import { portfolioFilters, portfolioProjects } from "../data/portfolio";

export function PortfolioPage() {
  const [activeFilter, setActiveFilter] = useState("Все");

  const filteredProjects = useMemo(() => {
    if (activeFilter === "Все") {
      return portfolioProjects;
    }

    return portfolioProjects.filter((project) => project.filters.includes(activeFilter));
  }, [activeFilter]);

  return (
    <>
      <section className="page-hero page-hero--portfolio">
        <div className="container page-hero__inner">
          <Reveal>
            <p className="page-hero__eyebrow">UMO TECH · PORTFOLIO</p>
            <h1 className="portfolio-hero__title">
              <span>Проекты, в которых AI и ML </span>
              <em>решают реальные задачи</em>
            </h1>
            <p>
              В портфолио UMO Tech — проекты в Computer Vision, NLP, RAG, аналитике
              данных, генеративных моделях и ML-системах для бизнеса. Мы создаём решения
              не ради “AI”, а под конкретную задачу: распознать, предсказать, найти,
              классифицировать, сгенерировать или автоматизировать.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section portfolio-section">
        <div className="container">
          <Reveal className="filter-row">
            {portfolioFilters.map((filter) => (
              <button
                key={filter}
                className={`filter-chip ${activeFilter === filter ? "is-active" : ""}`}
                type="button"
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </button>
            ))}
          </Reveal>

          <div className="portfolio-grid">
            {filteredProjects.map((project, index) => (
              <Reveal key={project.id} delay={index * 70}>
                <PortfolioCard project={project} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
