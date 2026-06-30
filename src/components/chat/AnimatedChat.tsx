import { useEffect, useState } from "react";
import { activityLogItems } from "../../data/activityLog";
import { useIsMobileViewport } from "../../hooks/useIsMobileViewport";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";
import { useTypewriter } from "../../hooks/useTypewriter";

export function AnimatedChat() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const isMobileViewport = useIsMobileViewport();
  const shouldReduceMotion = prefersReducedMotion || isMobileViewport;
  const [activeIndex, setActiveIndex] = useState(0);
  const activeItem = activityLogItems[activeIndex];
  const typedAction = useTypewriter(activeItem.action, {
    enabled: !shouldReduceMotion,
    speed: 28,
    startDelay: 180
  });

  useEffect(() => {
    if (shouldReduceMotion) {
      return;
    }

    const timer = window.setInterval(() => {
      setActiveIndex((index) => (index + 1) % activityLogItems.length);
    }, 3600);

    return () => window.clearInterval(timer);
  }, [shouldReduceMotion]);

  return (
    <div className="activity-log" aria-label="AI-модули UMO Tech">
      <div className="activity-log__topbar">
        <span>UMO Tech / AI modules</span>
        <span className="activity-log__status">
          <span className="status-dot" />
          working
        </span>
      </div>

      <div className="activity-card-stack">
        {activityLogItems.map((item, index) => {
          const isActive = index === activeIndex || shouldReduceMotion;
          const actionText = isActive && !shouldReduceMotion ? typedAction.displayedText : item.action;

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
