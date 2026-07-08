const MAX_FIELD_LENGTH = 1400;
const PHONE_CONTACT_PATTERN = /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/;
const TELEGRAM_CONTACT_PATTERN = /^@[A-Za-z0-9_]{5,32}$/;

function sanitizeField(value, maxLength = MAX_FIELD_LENGTH) {
  return String(value ?? "").trim().slice(0, maxLength);
}

function parseBody(request) {
  if (!request.body) {
    return {};
  }

  if (typeof request.body === "string") {
    try {
      return JSON.parse(request.body);
    } catch {
      return {};
    }
  }

  return request.body;
}

function buildTelegramMessage(payload) {
  const company = payload.company || "Не указана";
  const page = payload.page || "Не указана";

  return [
    "Новая заявка с сайта UMO Tech",
    "",
    `Имя: ${payload.name}`,
    `Компания: ${company}`,
    `Контакт: ${payload.contact}`,
    "",
    "Задача:",
    payload.task,
    "",
    `Страница: ${page}`
  ].join("\n");
}

function isValidContact(contact) {
  return PHONE_CONTACT_PATTERN.test(contact) || TELEGRAM_CONTACT_PATTERN.test(contact);
}

export default async function handler(request, response) {
  if (request.method !== "POST") {
    response.setHeader("Allow", "POST");
    return response.status(405).json({ ok: false, message: "Method not allowed" });
  }

  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!botToken || !chatId) {
    return response.status(500).json({
      ok: false,
      message: "Telegram env variables are not configured"
    });
  }

  const body = parseBody(request);
  const payload = {
    name: sanitizeField(body.name, 160),
    company: sanitizeField(body.company, 200),
    contact: sanitizeField(body.contact, 200),
    task: sanitizeField(body.task),
    page: sanitizeField(body.page, 500)
  };

  if (!payload.name || !payload.contact || !payload.task) {
    return response.status(400).json({
      ok: false,
      message: "Name, contact and task are required"
    });
  }

  if (!isValidContact(payload.contact)) {
    return response.status(400).json({
      ok: false,
      message: "Contact must be a Telegram username or a Russian phone number"
    });
  }

  try {
    const telegramResponse = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: buildTelegramMessage(payload),
        disable_web_page_preview: true
      })
    });

    if (!telegramResponse.ok) {
      const telegramError = await telegramResponse.text();
      console.error("Telegram sendMessage failed:", telegramError);

      return response.status(502).json({
        ok: false,
        message: "Telegram notification was not sent"
      });
    }

    return response.status(200).json({ ok: true });
  } catch (error) {
    console.error("Contact request failed:", error);

    return response.status(500).json({
      ok: false,
      message: "Contact request failed"
    });
  }
}
