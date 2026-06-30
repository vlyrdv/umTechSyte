import { AnimatedChat } from "../chat/AnimatedChat";
import { Button } from "../ui/Button";
import { Reveal } from "../ui/Reveal";

export function HeroSection() {
  return (
    <section className="hero-section">
      <div className="container">
        <div className="hero-panel">
          <Reveal className="hero-section__content">
            <p className="hero-section__eyebrow">UM Tech / AI / ML SOLUTIONS</p>
            <h1 className="hero-title">
              <span>AI, который</span>
              <em>не обещает магию,</em>
              <span>а решает</span>
              <span className="hero-title__underlined">задачи бизнеса.</span>
            </h1>
            <p className="hero-section__lead">
              UM Tech разрабатывает AI-ассистентов, RAG-системы, ML-модели и
              аналитику данных под конкретные задачи бизнеса — от автоматизации рутины
              до принятия решений на основе данных.
            </p>
            <div className="hero-section__actions">
              <Button href="/contacts" size="lg">
                Обсудить проект
              </Button>
              <Button href="/#solutions" variant="secondary" size="lg">
                Направления
              </Button>
            </div>
          </Reveal>

          <Reveal className="hero-section__visual" delay={140}>
            <AnimatedChat />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
