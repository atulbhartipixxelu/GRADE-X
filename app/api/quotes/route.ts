import { NextResponse } from "next/server";
import { z } from "zod";
import { notifyQuote } from "@/lib/notifyQuote";
import { site } from "@/lib/site";
import { store } from "@/lib/store";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(6),
  company: z.string().optional().default(""),
  suburb: z.string().min(2),
  service: z.string().min(2),
  sites: z.string().optional().default("1"),
  urgency: z.string().optional().default("Planned programme"),
  message: z.string().optional().default(""),
});

async function readPayload(request: Request) {
  const type = request.headers.get("content-type") || "";
  if (type.includes("application/json")) {
    return request.json();
  }
  const form = await request.formData();
  return Object.fromEntries(form.entries());
}

export async function POST(request: Request) {
  try {
    const json = await readPayload(request);
    const parsed = schema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json({ error: "Check the form fields." }, { status: 400 });
    }
    const data = parsed.data;
    const quote = {
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      status: "new" as const,
      emailed: false,
      ...data,
    };
    const settings = await store.settings();
    try {
      quote.emailed = Boolean(await notifyQuote(quote, settings.notifyEmail || site.email));
    } catch {
      quote.emailed = false;
      console.error("Quote saved, but the inbox notification failed.");
    }

    const quotes = await store.quotes();
    quotes.unshift(quote);
    await store.saveQuotes(quotes);

    const type = request.headers.get("content-type") || "";
    if (!type.includes("application/json")) {
      const html = `<!doctype html>
<html lang="en-AU">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Request received | Grade X</title>
  </head>
  <body>
    <p>Thanks. We've got your request and someone from Grade X will be in touch. If it's urgent, call ${site.phone}.</p>
    <p><a href="/contact">Back to contact</a></p>
  </body>
</html>`;
      return new NextResponse(html, {
        status: 200,
        headers: { "Content-Type": "text/html; charset=utf-8" },
      });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Could not save." }, { status: 400 });
  }
}
