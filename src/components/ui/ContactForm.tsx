import { useState, type FormEvent } from "react";
import { sendContactRequest } from "../../services/contactRequest";
import { Button } from "./Button";

const initialForm = {
  name: "",
  company: "",
  contact: "",
  task: ""
};

export function ContactForm() {
  const [form, setForm] = useState(initialForm);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const updateField = (field: keyof typeof form, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitStatus("sending");

    try {
      await sendContactRequest(form);
      setSubmitStatus("success");
      setForm(initialForm);
    } catch {
      setSubmitStatus("error");
    }
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
      <Button type="submit" disabled={submitStatus === "sending"}>
        {submitStatus === "sending" ? "Отправляем..." : "Отправить заявку"}
      </Button>
      {submitStatus === "success" ? (
        <p className="contact-form__success">
          Заявка отправлена. Мы получили уведомление в Telegram-группу и свяжемся с вами.
        </p>
      ) : null}
      {submitStatus === "error" ? (
        <p className="contact-form__error">
          Не получилось отправить заявку. Попробуйте ещё раз или напишите нам в Telegram.
        </p>
      ) : null}
    </form>
  );
}
