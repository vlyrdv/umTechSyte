import type { Industry } from "../../data/types";

export function IndustryCard({ industry }: { industry: Industry }) {
  return (
    <article className="industry-card">
      <h3>{industry.title}</h3>
      <p>{industry.description}</p>
    </article>
  );
}
