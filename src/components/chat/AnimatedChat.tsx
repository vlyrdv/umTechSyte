import { useEffect, useState } from "react";
import { activityLogItems } from "../../data/activityLog";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";
import { useTypewriter } from "../../hooks/useTypewriter";

export function AnimatedChat() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const activeItem = activityLogItems[activeIndex];
  const typedAction = useTypewriter(activeItem.action, {
    speed: 28,
    startDelay: 180
  });

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    const timer = window.setInterval(() => {
      setActiveIndex((index) => (index + 1) % activityLogItems.length);
    }, 3600);

    return () => window.clearInterval(timer);
  }, [prefersReducedMotion]);

  return (
    <div className="activity-log" aria-label="AI-модули UM Tech">
      <div className="activity-log__topbar">
        <span>UM Tech / AI modules</span>
        <span className="activity-log__status">
          <span className="status-dot" />
          working
        </span>
      </div>

      <div className="activity-card-stack">
        {activityLogItems.map((item, index) => {
          const isActive = index === activeIndex || prefersReducedMotion;
          const actionText = isActive && !prefersReducedMotion ? typedAction.displayedText : item.action;

          return (
            <article
              className={`activity-row activity-row--${item.tone} ${isActive ? "is-active" : ""}`}
              key={`${item.label}-${item.role}`}
            >
              <span className="activity-row__dot" aria-hidden="true" />
              <div>
                <time>{item.label}</time>
                <strong>{item.role}</strong>
                <p>{actionText}</p>
                <small>{item.result}</small>
              </div>
            </article>
          );
        })}
      </div>

      <div className="activity-log__footer">
        <span>CRM</span>
        <span>RAG</span>
        <span>NLP</span>
        <span>CV</span>
        <span>ML</span>
      </div>
    </div>
  );
}
