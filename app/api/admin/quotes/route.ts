import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { store, type QuoteRequest } from "@/lib/store";

export async function GET() {
  try {
    await requireAdmin();
    const quotes = await store.quotes();
    return NextResponse.json({ quotes });
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}

export async function PATCH(request: Request) {
  try {
    await requireAdmin();
    const { id, status } = await request.json();
    const quotes = await store.quotes();
    const next = quotes.map((q) =>
      q.id === id ? { ...q, status: status as QuoteRequest["status"] } : q,
    );
    await store.saveQuotes(next);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}
