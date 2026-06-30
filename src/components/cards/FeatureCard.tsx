import type { Feature } from "../../data/types";

export function FeatureCard({ feature }: { feature: Feature }) {
  return (
    <article className="feature-card">
      <div className="card-icon">{feature.icon}</div>
      <h3>{feature.title}</h3>
      <p>{feature.description}</p>
    </article>
  );
}
