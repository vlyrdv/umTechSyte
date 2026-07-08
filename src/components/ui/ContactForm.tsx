import { useState, type FormEvent } from "react";
import { sendContactRequest } from "../../services/contactRequest";
import { Button } from "./Button";

const initialForm = {
  name: "",
  company: "",
  contact: "",
  task: ""
};

const phoneContactPattern = /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/;
const telegramContactPattern = /^@[A-Za-z0-9_]{5,32}$/;

function formatRussianPhone(nationalDigits: string) {
  const digits = nationalDigits.slice(0, 10);

  if (!digits) {
    return "+7";
  }

  let result = `+7 (${digits.slice(0, 3)}`;

  if (digits.length >= 3) {
    result += ")";
  }

  if (digits.length > 3) {
    result += ` ${digits.slice(3, 6)}`;
  }

  if (digits.length > 6) {
    result += `-${digits.slice(6, 8)}`;
  }

  if (digits.length > 8) {
    result += `-${digits.slice(8, 10)}`;
  }

  return result;
}

function normalizeContactInput(value: string) {
  const trimmedStart = value.trimStart();

  if (!trimmedStart) {
    return "";
  }

  if (trimmedStart.startsWith("@")) {
    const username = trimmedStart.replace(/^@+/, "").replace(/[^A-Za-z0-9_]/g, "").slice(0, 32);
    return `@${username}`;
  }

  const digits = value.replace(/\D/g, "");

  if (!digits) {
    return value.trim().startsWith("+") ? "+7" : "";
  }

  const nationalDigits = digits.startsWith("8")
    ? digits.slice(1)
    : digits.startsWith("7")
      ? digits.slice(1)
      : digits;

  return formatRussianPhone(nationalDigits);
}

function isValidContact(value: string) {
  return phoneContactPattern.test(value) || telegramContactPattern.test(value);
}

export function ContactForm() {
  const [form, setForm] = useState(initialForm);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [submitError, setSubmitError] = useState("");

  const updateField = (field: keyof typeof form, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
    setSubmitError("");

    if (submitStatus !== "sending") {
      setSubmitStatus("idle");
    }
  };

  const updateContactField = (value: string) => {
    updateField("contact", normalizeContactInput(value));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isValidContact(form.contact)) {
      setSubmitStatus("error");
      setSubmitError("Укажите Telegram в формате @username или телефон в формате +7 (999) 999-99-99.");
      return;
    }

    setSubmitStatus("sending");
    setSubmitError("");

    try {
      await sendContactRequest(form);
      setSubmitStatus("success");
      setForm(initialForm);
    } catch {
      setSubmitStatus("error");
      setSubmitError("Не получилось отправить заявку. Попробуйте ещё раз или напишите нам в Telegram.");
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
          onChange={(event) => updateContactField(event.target.value)}
          placeholder="+7 (999) 999-99-99 или @username"
          maxLength={33}
          spellCheck={false}
          aria-invalid={submitStatus === "error" && !isValidContact(form.contact)}
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
        <p className="contact-form__error">{submitError}</p>
      ) : null}
    </form>
  );
}
