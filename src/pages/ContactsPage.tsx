import { ContactForm } from "../components/ui/ContactForm";
import { Reveal } from "../components/ui/Reveal";

const requestTips = [
  "Какую работу хотите ускорить или передать системе.",
  "Какие системы уже используете: CRM, сайт, таблицы, мессенджеры, база знаний.",
  "Какие данные или документы есть сейчас.",
  "Что будет считаться хорошим результатом после запуска."
];

export function ContactsPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container page-hero__inner">
          <Reveal>
            <p className="page-hero__eyebrow">Контакты</p>
            <h1>Обсудим вашу задачу для AI/ML</h1>
            <p>
              Расскажите о задаче, процессе или идее продукта. Мы посмотрим, где AI, ML и
              данные могут дать практическую пользу, и предложим варианты решения.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section contacts-section">
        <div className="container contacts-grid">
          <Reveal>
            <ContactForm />
          </Reveal>

          <Reveal className="contact-aside" delay={120}>
            <div>
              <h2>Контакты</h2>
              <p>
                Telegram:{" "}
                <a href="https://t.me/umotech" target="_blank" rel="noreferrer">
                  @umotech
                </a>
              </p>
              <p>
                Email: <a href="mailto:ai@umo-tech.ru">ai@umo-tech.ru</a>
              </p>
            </div>

            <div>
              <h2>Что написать в заявке</h2>
              <ul>
                {requestTips.map((tip) => (
                  <li key={tip}>{tip}</li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
