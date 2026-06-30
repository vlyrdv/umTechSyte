export type ActivityLogItem = {
  label: string;
  role: string;
  action: string;
  result: string;
  tone: "green" | "blue" | "violet" | "yellow";
};

export const activityLogItems: ActivityLogItem[] = [
  {
    label: "AI · ПРОДАЖИ",
    role: "UMO AI продажник",
    action: "готовит ответ клиенту и формирует КП...",
    result: "1127 диалогов",
    tone: "green"
  },
  {
    label: "ML · СКОРИНГ",
    role: "UMO ML скоринг",
    action: "Оценил заявку клиента. Вероятность одобрения — 78%.",
    result: "87% точность",
    tone: "yellow"
  },
  {
    label: "RAG · БАЗА ЗНАНИЙ",
    role: "UMO RAG ассистент",
    action: "ищет ответ в регламентах компании...",
    result: "docs match",
    tone: "violet"
  }
];
