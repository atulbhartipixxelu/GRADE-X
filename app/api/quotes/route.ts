import { NextResponse } from "next/server";
import { z } from "zod";
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

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const parsed = schema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json({ error: "Check the form fields." }, { status: 400 });
    }
    const data = parsed.data;
    const quotes = await store.quotes();
    quotes.unshift({
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      status: "new",
      ...data,
    });
    await store.saveQuotes(quotes);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Could not save." }, { status: 400 });
  }
}
