import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const cookieName = "gx_session";

function secret() {
  return new TextEncoder().encode(
    process.env.AUTH_SECRET || "gradex-local-dev-secret-change-before-production",
  );
}

export function adminCredentials() {
  return {
    email: process.env.ADMIN_EMAIL || "admin@gradex.com.au",
    password: process.env.ADMIN_PASSWORD || "GradeX2026!",
  };
}

export async function createSession(email: string) {
  const token = await new SignJWT({ email })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secret());

  const jar = await cookies();
  jar.set(cookieName, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NEXT_PUBLIC_SITE_URL?.startsWith("https") ?? false,
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
}

export async function destroySession() {
  const jar = await cookies();
  jar.delete(cookieName);
}

export async function getSession() {
  const jar = await cookies();
  const token = jar.get(cookieName)?.value;
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, secret());
    return { email: String(payload.email || "") };
  } catch {
    return null;
  }
}

export async function requireAdmin() {
  const session = await getSession();
  if (!session?.email) {
    throw new Error("UNAUTHORIZED");
  }
  return session;
}
