"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Logo } from "@/components/brand/Logo";

export default function AdminLoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const form = new FormData(e.currentTarget);
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: form.get("email"),
        password: form.get("password"),
      }),
    });
    if (!res.ok) {
      setError("Invalid credentials");
      setLoading(false);
      return;
    }
    router.push("/admin");
    router.refresh();
  }

  return (
    <div className="grid min-h-screen place-items-center bg-navy px-5">
      <form onSubmit={onSubmit} className="w-full max-w-sm border border-gold/20 bg-navy-2 p-8">
        <Logo />
        <p className="mt-6 font-mono text-[11px] tracking-[0.28em] text-gold uppercase">
          CMS login
        </p>
        <label className="mt-6 block text-xs tracking-widest text-mist uppercase">
          Email
          <input
            name="email"
            type="email"
            required
            defaultValue="admin@gradex.com.au"
            className="mt-2 w-full border border-gold/20 bg-navy px-3 py-2 text-ivory"
          />
        </label>
        <label className="mt-4 block text-xs tracking-widest text-mist uppercase">
          Password
          <input
            name="password"
            type="password"
            required
            className="mt-2 w-full border border-gold/20 bg-navy px-3 py-2 text-ivory"
          />
        </label>
        {error ? <p className="mt-3 text-sm text-red-300">{error}</p> : null}
        <button
          type="submit"
          disabled={loading}
          className="mt-6 w-full rounded-full bg-gold py-3 text-xs font-semibold tracking-[0.18em] uppercase text-navy"
        >
          {loading ? "Signing in…" : "Enter"}
        </button>
      </form>
    </div>
  );
}
