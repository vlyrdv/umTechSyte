import { Button } from "../ui/Button";
import { Reveal } from "../ui/Reveal";

export function FinalCTASection() {
  return (
    <section className="section final-cta-section">
      <div className="container">
        <Reveal className="final-cta">
          <p>Первичная консультация — бесплатно</p>
          <h2>Хотите понять, где AI и данные могут усилить ваш бизнес?</h2>
          <span>
            Оставьте заявку в UM Tech — мы разберём вашу задачу, процессы или идею продукта и
            предложим варианты реализации.
          </span>
          <Button href="/contacts" size="lg">
            Обсудить проект
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
