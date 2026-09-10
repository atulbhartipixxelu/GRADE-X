"use client";

import { useState } from "react";
import { services as fallbackServices, type Service } from "@/lib/content";
import { site } from "@/lib/site";

const urgencies = ["Planned programme", "This month", "Urgent / emergency"];

export function QuoteForm({
  preset,
  options,
}: {
  preset?: string;
  options?: Service[];
}) {
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "err">("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setError("");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    const res = await fetch("/api/quotes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      setError(body.error || "Could not send. Call us directly.");
      setStatus("err");
      return;
    }
    form.reset();
    setStatus("ok");
  }

  const field =
    "w-full border border-gold/20 bg-white px-4 py-3 text-sm text-ivory outline-none placeholder:text-mist/50 focus:border-gold";

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-xs tracking-[0.16em] text-mist uppercase">
          Name
          <input required name="name" className={`${field} mt-2`} />
        </label>
        <label className="block text-xs tracking-[0.16em] text-mist uppercase">
          Company / site
          <input name="company" className={`${field} mt-2`} />
        </label>
        <label className="block text-xs tracking-[0.16em] text-mist uppercase">
          Email
          <input required type="email" name="email" className={`${field} mt-2`} />
        </label>
        <label className="block text-xs tracking-[0.16em] text-mist uppercase">
          Phone
          <input required name="phone" className={`${field} mt-2`} />
        </label>
        <label className="block text-xs tracking-[0.16em] text-mist uppercase">
          Suburb / location
          <input required name="suburb" placeholder="Perth metro" className={`${field} mt-2`} />
        </label>
        <label className="block text-xs tracking-[0.16em] text-mist uppercase">
          Number of sites
          <input name="sites" placeholder="1" className={`${field} mt-2`} />
        </label>
      </div>
      <label className="block text-xs tracking-[0.16em] text-mist uppercase">
        Service type
        <select name="service" defaultValue={preset || ""} className={`${field} mt-2`} required>
          <option value="" disabled>
            Select a service
          </option>
          {(options ?? fallbackServices).map((s) => (
            <option key={s.slug} value={s.name}>
              {s.name}
            </option>
          ))}
        </select>
      </label>
      <label className="block text-xs tracking-[0.16em] text-mist uppercase">
        Timing
        <select name="urgency" className={`${field} mt-2`} defaultValue="Planned programme">
          {urgencies.map((u) => (
            <option key={u}>{u}</option>
          ))}
        </select>
      </label>
      <label className="block text-xs tracking-[0.16em] text-mist uppercase">
        Site notes
        <textarea name="message" rows={5} className={`${field} mt-2`} />
      </label>
      <button
        type="submit"
        disabled={status === "sending"}
        className="rounded-full bg-gold px-8 py-3 text-[12px] font-semibold tracking-[0.18em] uppercase text-white disabled:opacity-60"
      >
        {status === "sending" ? "Sending…" : "Submit quote request"}
      </button>
      {status === "ok" ? (
        <p className="text-sm text-gold">
          Received. Grade X will respond to this enquiry. For emergencies call {site.phone}.
        </p>
      ) : null}
      {status === "err" ? <p className="text-sm text-red-300">{error}</p> : null}
    </form>
  );
}
