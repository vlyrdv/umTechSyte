import type { Metric } from "../../data/types";

export function MetricCard({ metric }: { metric: Metric }) {
  return (
    <article className="metric-card">
      <span>{metric.label}</span>
      <strong>{metric.value}</strong>
      <p>{metric.detail}</p>
    </article>
  );
}
