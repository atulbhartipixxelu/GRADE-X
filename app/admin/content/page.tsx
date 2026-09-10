"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function AdminContentPage() {
  const [json, setJson] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    fetch("/api/admin/content")
      .then((r) => r.json())
      .then((data) => {
        const { settings, ...rest } = data;
        void settings;
        setJson(JSON.stringify(rest, null, 2));
      });
  }, []);

  async function save() {
    setStatus("");
    try {
      const parsed = JSON.parse(json);
      const res = await fetch("/api/admin/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed),
      });
      setStatus(res.ok ? "Saved. Refresh the public site to see changes." : "Save failed.");
    } catch {
      setStatus("JSON is invalid.");
    }
  }

  return (
    <div className="min-h-screen bg-navy text-ivory">
      <div className="mx-auto max-w-5xl px-6 py-10">
        <Link href="/admin" className="text-sm text-gold">
          ← CMS
        </Link>
        <h1 className="mt-4 font-display text-4xl">Content</h1>
        <p className="mt-3 max-w-2xl text-sm text-mist">
          Edit services, FAQs, testimonials, case studies and blog posts as JSON. Keep slugs unique. This is the handover CMS — Grade X can update copy without a developer.
        </p>
        <textarea
          value={json}
          onChange={(e) => setJson(e.target.value)}
          className="mt-6 h-[560px] w-full border border-gold/20 bg-navy-2 p-4 font-mono text-xs text-ivory"
        />
        <button
          type="button"
          onClick={save}
          className="mt-4 rounded-full bg-gold px-6 py-3 text-xs font-semibold tracking-[0.18em] uppercase text-navy"
        >
          Save content
        </button>
        {status ? <p className="mt-3 text-sm text-gold">{status}</p> : null}
      </div>
    </div>
  );
}
