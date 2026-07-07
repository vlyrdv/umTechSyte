export type ContactRequestPayload = {
  name: string;
  company: string;
  contact: string;
  task: string;
};

type ContactApiResponse = {
  ok?: boolean;
  message?: string;
};

const contactApiUrl = import.meta.env.VITE_CONTACT_API_URL || "/api/contact";

export async function sendContactRequest(payload: ContactRequestPayload) {
  const response = await fetch(contactApiUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...payload,
      page: window.location.href
    })
  });

  let data: ContactApiResponse = {};

  try {
    data = (await response.json()) as ContactApiResponse;
  } catch {
    data = {};
  }

  if (!response.ok || data.ok === false) {
    throw new Error(data.message || "Не получилось отправить заявку");
  }
}
