import { site } from "./site";
import type { QuoteRequest } from "./store";

function quoteText(quote: QuoteRequest) {
  return [
    "New quote request from the Grade X website.",
    "",
    `Name: ${quote.name}`,
    `Company / site: ${quote.company || "—"}`,
    `Email: ${quote.email}`,
    `Phone: ${quote.phone}`,
    `Suburb: ${quote.suburb}`,
    `Sites: ${quote.sites || "1"}`,
    `Service: ${quote.service}`,
    `Timing: ${quote.urgency}`,
    `Notes: ${quote.message || "—"}`,
    "",
    `Submitted: ${quote.createdAt}`,
    `Reply to this email to contact ${quote.name} directly.`,
  ].join("\n");
}

async function sendResend(to: string, quote: QuoteRequest) {
  const key = process.env.RESEND_API_KEY?.trim();
  if (!key) return false;

  const from =
    process.env.QUOTE_FROM_EMAIL?.trim() || "Grade X website <beth.t@example.com>";
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to,
      reply_to: quote.email,
      subject: `Quote request: ${quote.service} — ${quote.name}`,
      text: quoteText(quote),
    }),
  });
  if (!res.ok) {
    throw new Error(`Resend ${res.status}`);
  }
  return true;
}

async function sendWebhook(quote: QuoteRequest) {
  const url = process.env.QUOTE_NOTIFY_WEBHOOK?.trim();
  if (!url) return false;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(quote),
  });
  if (!res.ok) {
    throw new Error(`Webhook ${res.status}`);
  }
  return true;
}

export async function notifyQuote(quote: QuoteRequest, to: string) {
  const emailed = await sendResend(to || site.email, quote);
  const hooked = await sendWebhook(quote);
  return emailed || hooked;
}
