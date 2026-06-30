import type { ReactNode } from "react";

type SectionTitleProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  children?: ReactNode;
};

export function SectionTitle({
  eyebrow,
  title,
  description,
  align = "left",
  children
}: SectionTitleProps) {
  return (
    <div className={`section-title section-title--${align}`}>
      {eyebrow ? <p className="section-title__eyebrow">{eyebrow}</p> : null}
      <h2>{title}</h2>
      {description ? <p className="section-title__description">{description}</p> : null}
      {children}
    </div>
  );
}
