import type { Solution } from "../../data/types";
import { Button } from "../ui/Button";

type SolutionCardProps = {
  solution: Solution;
  detailed?: boolean;
};

export function SolutionCard({ solution, detailed = false }: SolutionCardProps) {
  return (
    <article className={`solution-card ${detailed ? "solution-card--detailed" : ""}`}>
      <div className="solution-card__top">
        <span className="solution-card__number">{solution.icon}</span>
        <span className="solution-card__category">UMO Tech / {solution.icon}</span>
      </div>
      <h3>{solution.title}</h3>
      <p>{solution.shortDescription}</p>

      {detailed ? (
        <dl className="solution-card__details">
          <div>
            <dt>Для кого</dt>
            <dd>{solution.audience}</dd>
          </div>
          <div>
            <dt>Что решает</dt>
            <dd>{solution.problem}</dd>
          </div>
          <div>
            <dt>Пример</dt>
            <dd>{solution.example}</dd>
          </div>
        </dl>
      ) : null}

      {detailed ? (
        <Button href="/contacts" variant="ghost" size="sm">
          Обсудить
        </Button>
      ) : null}
    </article>
  );
}
