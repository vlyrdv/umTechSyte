import { useState } from "react";
import type { FaqItem as FaqItemType } from "../../data/types";

export function FAQItem({ item }: { item: FaqItemType }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <article className={`faq-item ${isOpen ? "is-open" : ""}`}>
      <button type="button" onClick={() => setIsOpen((value) => !value)}>
        <span>{item.question}</span>
        <span className="faq-item__icon" aria-hidden="true">
          +
        </span>
      </button>
      <div className="faq-item__answer">
        <p>{item.answer}</p>
      </div>
    </article>
  );
}
