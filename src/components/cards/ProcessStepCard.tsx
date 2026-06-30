import type { ProcessStep } from "../../data/types";

type ProcessStepCardProps = {
  step: ProcessStep;
  index: number;
};

export function ProcessStepCard({ step, index }: ProcessStepCardProps) {
  return (
    <article className="process-step">
      <span className="process-step__number">{String(index + 1).padStart(2, "0")}</span>
      <h3>{step.title}</h3>
      <p>{step.description}</p>
    </article>
  );
}
