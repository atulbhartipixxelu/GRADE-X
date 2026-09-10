"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { QuoteRequest } from "@/lib/store";

export default function AdminQuotesPage() {
  const [quotes, setQuotes] = useState<QuoteRequest[]>([]);

  useEffect(() => {
    let live = true;
    fetch("/api/admin/quotes")
      .then((r) => r.json())
      .then((data) => {
        if (live) setQuotes(data.quotes || []);
      });
    return () => {
      live = false;
    };
  }, []);

  async function setStatus(id: string, status: QuoteRequest["status"]) {
    await fetch("/api/admin/quotes", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    const res = await fetch("/api/admin/quotes");
    const data = await res.json();
    setQuotes(data.quotes || []);
  }

  return (
    <div className="min-h-screen bg-navy text-ivory">
      <div className="mx-auto max-w-5xl px-6 py-10">
        <Link href="/admin" className="text-sm text-gold">
          ← CMS
        </Link>
        <h1 className="mt-4 font-display text-4xl">Quote requests</h1>
        <div className="mt-8 space-y-4">
          {quotes.length === 0 ? (
            <p className="text-mist">No submissions yet.</p>
          ) : (
            quotes.map((q) => (
              <article key={q.id} className="border border-gold/15 p-5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className="font-display text-xl">{q.name}</p>
                  <span className="font-mono text-[11px] text-gold uppercase">{q.status}</span>
                </div>
                <p className="mt-2 text-sm text-mist">
                  {q.company} · {q.suburb} · {q.service} · {q.urgency}
                </p>
                <p className="mt-1 text-sm">
                  <a href={`mailto:${q.email}`} className="text-gold">
                    {q.email}
                  </a>{" "}
                  · {q.phone} · {q.sites} site(s)
                </p>
                {q.message ? <p className="mt-3 text-sm text-ivory/80">{q.message}</p> : null}
                <p className="mt-3 font-mono text-[10px] text-mist">{q.createdAt}</p>
                <div className="mt-4 flex gap-2">
                  {(["new", "read", "closed"] as const).map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setStatus(q.id, s)}
                      className="border border-gold/30 px-3 py-1 text-[11px] tracking-widest uppercase"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </article>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
