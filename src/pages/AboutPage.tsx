import { Button } from "../components/ui/Button";
import { Reveal } from "../components/ui/Reveal";
import { SectionTitle } from "../components/ui/SectionTitle";

const approachItems = [
  "Не начинаем с модели — сначала разбираем бизнес-задачу, данные и ограничения.",
  "Не продаём шаблонные решения, если задаче нужен особый подход.",
  "Проектируем экраны так, чтобы ими пользовались обычные сотрудники.",
  "Сразу думаем, как подключить решение к вашим рабочим системам.",
  "Объясняем риски, варианты и ограничения простым языком.",
  "Фокусируемся на пользе: скорости, качестве работы, данных и понятном контроле."
];

export function AboutPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container page-hero__inner">
          <Reveal>
            <p className="page-hero__eyebrow">О компании</p>
            <h1>Мы помогаем бизнесу запускать AI и полезные цифровые решения</h1>
            <p>
              Наша команда создаёт AI/ML-решения под конкретные задачи бизнеса:
              ускоряет работу сотрудников, уменьшает ручную работу, помогает принимать
              решения на основе данных и запускать новые цифровые продукты.
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
              title="Технологии должны работать в ваших реальных процессах"
              description="Мы соединяем AI, ML, данные, удобный экран для сотрудников и подключение к вашим системам, чтобы решение было рабочим инструментом, а не красивой демонстрацией."
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
