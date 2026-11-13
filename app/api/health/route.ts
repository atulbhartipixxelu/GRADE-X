import { NextResponse } from "next/server";
import { store } from "@/lib/store";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const quotes = await store.quotes();
    return NextResponse.json({
      ok: true,
      checks: {
        homepage: "/",
        quotes: {
          path: "/api/quotes",
          method: "POST",
          readable: Array.isArray(quotes),
        },
      },
    });
  } catch {
    return NextResponse.json({ ok: false }, { status: 503 });
  }
}
