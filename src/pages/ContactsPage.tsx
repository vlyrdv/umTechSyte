import { ContactForm } from "../components/ui/ContactForm";
import { Reveal } from "../components/ui/Reveal";

const requestTips = [
  "Какой процесс хотите ускорить или автоматизировать.",
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
            <h1>Обсудим ваш AI/ML-проект</h1>
            <p>
              Расскажите о задаче, процессе или идее продукта. Мы посмотрим, где AI, ML и
              данные могут дать практический эффект, и предложим варианты реализации.
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
              <p>Telegram: @ai_partner</p>
              <p>Email: hello@ai-partner.ru</p>
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
