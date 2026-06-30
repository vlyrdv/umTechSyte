export type NavItem = {
  label: string;
  href: string;
};

export type ChatScenario = {
  employee: string;
  ai: string;
  label: string;
};

export type Feature = {
  title: string;
  description: string;
  icon: string;
};

export type Solution = {
  title: string;
  shortDescription: string;
  audience: string;
  problem: string;
  example: string;
  icon: string;
};

export type PortfolioProject = {
  id: number;
  title: string;
  category: string;
  type: string;
  description: string;
  clientTask: string;
  workDone: string;
  result: string;
  technologies: string[];
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type Industry = {
  title: string;
  description: string;
};

export type ProcessStep = {
  title: string;
  description: string;
};

export type Metric = {
  label: string;
  value: string;
  detail: string;
};
