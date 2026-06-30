import type { Metric } from "./types";

export const interfaceMetrics: Metric[] = [
  { label: "Обработано заявок", value: "1 284", detail: "+22% за месяц" },
  { label: "Среднее время ответа", value: "43 сек", detail: "после внедрения AI" },
  { label: "Автоматизировано задач", value: "68%", detail: "типовых обращений" },
  { label: "Вероятность покупки", value: "82%", detail: "для горячих лидов" }
];

export const recentDialogs = [
  "UM AI ПРОДАЖНИК уточнил тариф и интеграцию с CRM",
  "UM AI ПОДДЕРЖКА передала заявку на повторное касание",
  "UM RAG АССИСТЕНТ нашёл документ по срокам запуска"
];

export const integrations = ["CRM", "Telegram", "Сайт", "База знаний", "API"];
