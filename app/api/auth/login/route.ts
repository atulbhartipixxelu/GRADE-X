import { NextResponse } from "next/server";
import { adminCredentials, createSession } from "@/lib/auth";

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const email = String(body.email || "").trim().toLowerCase();
  const password = String(body.password || "");
  const creds = adminCredentials();

  if (email !== creds.email.toLowerCase() || password !== creds.password) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  await createSession(creds.email);
  return NextResponse.json({ ok: true });
}
