import { useState, type FormEvent } from "react";
import { Button } from "./Button";

const initialForm = {
  name: "",
  company: "",
  contact: "",
  task: ""
};

export function ContactForm() {
  const [form, setForm] = useState(initialForm);
  const [isSent, setIsSent] = useState(false);

  const updateField = (field: keyof typeof form, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSent(true);
    setForm(initialForm);
    // Здесь позже можно подключить backend, Telegram-бота или email.
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <label>
        <span>Имя</span>
        <input
          value={form.name}
          onChange={(event) => updateField("name", event.target.value)}
          placeholder="Как к вам обращаться"
          required
        />
      </label>
      <label>
        <span>Компания</span>
        <input
          value={form.company}
          onChange={(event) => updateField("company", event.target.value)}
          placeholder="Название компании"
        />
      </label>
      <label>
        <span>Телефон или Telegram</span>
        <input
          value={form.contact}
          onChange={(event) => updateField("contact", event.target.value)}
          placeholder="+7 или @username"
          required
        />
      </label>
      <label>
        <span>Описание задачи</span>
        <textarea
          value={form.task}
          onChange={(event) => updateField("task", event.target.value)}
          placeholder="Опишите процесс, идею или проблему, где хотите применить AI/ML"
          rows={5}
          required
        />
      </label>
      <Button type="submit">Отправить заявку</Button>
      {isSent ? (
        <p className="contact-form__success">
          Заявка сохранена на сайте. Отправку в Telegram или email можно подключить
          следующим шагом.
        </p>
      ) : null}
    </form>
  );
}
