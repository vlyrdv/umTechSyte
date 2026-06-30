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

    return portfolioProjects.filter((project) => project.type === activeFilter);
  }, [activeFilter]);

  return (
    <>
      <section className="page-hero">
        <div className="container page-hero__inner">
          <Reveal>
            <p className="page-hero__eyebrow">Портфолио</p>
            <h1>Портфолио AI/ML-проектов</h1>
            <p>
              Здесь будут собраны проекты по внедрению искусственного интеллекта, машинного
              обучения, компьютерного зрения, NLP, RAG-систем, аналитики данных и кастомной
              разработки для бизнеса.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section">
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
