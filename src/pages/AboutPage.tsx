import { Button } from "../components/ui/Button";
import { Reveal } from "../components/ui/Reveal";
import { SectionTitle } from "../components/ui/SectionTitle";

const approachItems = [
  "Не начинаем с модели — сначала разбираем бизнес-задачу, данные и ограничения.",
  "Не продаём шаблонные решения, если процесс требует кастомной логики.",
  "Проектируем интерфейсы так, чтобы ими пользовались обычные сотрудники.",
  "Думаем про интеграции, сопровождение и развитие решения после запуска.",
  "Объясняем риски, варианты реализации и технические компромиссы понятным языком.",
  "Фокусируемся на практической пользе: скорости, качестве обработки, данных и управляемости."
];

export function AboutPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container page-hero__inner">
          <Reveal>
            <p className="page-hero__eyebrow">О компании</p>
            <h1>Мы помогаем бизнесу внедрять AI и создавать технологические решения</h1>
            <p>
              Наша команда проектирует и разрабатывает AI/ML-решения, которые решают
              конкретные бизнес-задачи: ускоряют работу сотрудников, автоматизируют рутину,
              помогают принимать решения на основе данных и запускать новые цифровые продукты.
            </p>
            <Button href="/contacts">Обсудить проект</Button>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container about-grid">
          <Reveal>
            <SectionTitle
              eyebrow="Подход"
              title="Технологии должны работать внутри вашей реальности"
              description="Мы соединяем AI, ML, данные, интерфейсы и интеграции, чтобы решение было не демо-эффектом, а рабочим инструментом."
            />
          </Reveal>
          <div className="about-list">
            {approachItems.map((item, index) => (
              <Reveal key={item} delay={index * 60}>
                <article>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <p>{item}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
