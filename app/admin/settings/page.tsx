"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { SiteSettings } from "@/lib/store";

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [status, setStatus] = useState("");

  useEffect(() => {
    fetch("/api/admin/content")
      .then((r) => r.json())
      .then((d) => setSettings(d.settings));
  }, []);

  async function save(e: React.FormEvent) {
    e.preventDefault();
    if (!settings) return;
    const res = await fetch("/api/admin/content", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ settings }),
    });
    setStatus(res.ok ? "Saved." : "Failed.");
  }

  if (!settings) return null;

  const field = "mt-2 w-full border border-gold/20 bg-navy-2 px-3 py-2 text-ivory";

  return (
    <div className="min-h-screen bg-navy text-ivory">
      <div className="mx-auto max-w-xl px-6 py-10">
        <Link href="/admin" className="text-sm text-gold">
          ← CMS
        </Link>
        <h1 className="mt-4 font-display text-4xl">Settings</h1>
        <form onSubmit={save} className="mt-8 space-y-5">
          <label className="block text-xs tracking-widest text-mist uppercase">
            Notification email
            <input
              className={field}
              value={settings.notifyEmail}
              onChange={(e) => setSettings({ ...settings, notifyEmail: e.target.value })}
            />
          </label>
          <label className="block text-xs tracking-widest text-mist uppercase">
            Emergency note
            <input
              className={field}
              value={settings.emergencyNote}
              onChange={(e) => setSettings({ ...settings, emergencyNote: e.target.value })}
            />
          </label>
          <label className="block text-xs tracking-widest text-mist uppercase">
            Google Analytics ID
            <input
              className={field}
              placeholder="G-XXXXXXXX"
              value={settings.googleAnalyticsId}
              onChange={(e) =>
                setSettings({ ...settings, googleAnalyticsId: e.target.value })
              }
            />
          </label>
          <button className="rounded-full bg-gold px-6 py-3 text-xs font-semibold tracking-[0.18em] uppercase text-navy">
            Save
          </button>
          {status ? <p className="text-sm text-gold">{status}</p> : null}
        </form>
      </div>
    </div>
  );
}
