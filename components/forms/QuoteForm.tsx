"use client";

import { useState } from "react";
import { services as fallbackServices, type Service } from "@/lib/content";
import { replyWindow } from "@/lib/iso";
import { site } from "@/lib/site";
import { Button } from "@/components/ui/Button";
import { SelectMenu } from "@/components/ui/SelectMenu";

const urgencies = ["Planned programme", "This month", "Urgent / emergency"];

export function QuoteForm({
  preset,
  options,
}: {
  preset?: string;
  options?: Service[];
}) {
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "err">("idle");
  const [name, setName] = useState("");
  const [service, setService] = useState(preset || "");
  const [urgency, setUrgency] = useState("Planned programme");
  const [error, setError] = useState("");
  const serviceOptions = (options ?? fallbackServices).map((item) => ({
    value: item.name,
    label: item.name,
  }));

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setError("");
    const form = e.currentTarget;
    const payload = new FormData(form);
    payload.delete("photo");
    payload.delete("privacy");
    const data = Object.fromEntries(payload.entries());
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
    setName("");
    setService(preset || "");
    setUrgency("Planned programme");
    setStatus("ok");
  }

  if (status === "ok") {
    return (
      <p className="gx-quote-ok">
        Thanks{name ? `, ${name}` : ""}. We&apos;ve got your request and someone from Grade X will be
        in touch by {replyWindow}. If it&apos;s urgent, call {site.phone}. You can email photos to{" "}
        {site.email}.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="gx-quote">
      <div className="gx-quote-grid">
        <label>
          Name <abbr title="required">*</abbr>
          <input
            required
            name="name"
            autoComplete="name"
            onChange={(event) => setName(event.target.value)}
          />
        </label>
        <label>
          Company / site
          <input name="company" autoComplete="organization" />
        </label>
        <label>
          Email <abbr title="required">*</abbr>
          <input required type="email" name="email" autoComplete="email" />
        </label>
        <label>
          Phone <abbr title="required">*</abbr>
          <input required name="phone" type="tel" autoComplete="tel" />
        </label>
        <label>
          Suburb / location <abbr title="required">*</abbr>
          <input required name="suburb" placeholder="Perth metro" />
        </label>
        <label>
          Number of sites
          <input name="sites" placeholder="1" />
        </label>
        <label>
          Service type <abbr title="required">*</abbr>
          <SelectMenu
            name="service"
            value={service}
            required
            placeholder="Select a service"
            options={serviceOptions}
            onChange={setService}
          />
        </label>
        <label>
          Timing
          <SelectMenu
            name="urgency"
            value={urgency}
            options={urgencies.map((item) => ({ value: item, label: item }))}
            onChange={setUrgency}
          />
        </label>
      </div>
      <label>
        Site notes
        <textarea name="message" rows={3} />
      </label>
      <label>
        Optional photo
        <input name="photo" type="file" accept="image/*" />
        <span className="gx-quote-hint">
          Photos are not stored through this form yet. Email images to {site.email} after you send
          the request.
        </span>
      </label>
      <label className="gx-quote-consent">
        <input required type="checkbox" name="privacy" />
        <span>
          By sending this form you agree to our <a href="/privacy">Privacy Policy</a>. We only use
          your details to respond to your request. We reply within {replyWindow}.
        </span>
      </label>
      <Button type="submit" variant="urgent" disabled={status === "sending"}>
        {status === "sending" ? "Sending…" : "Submit quote request"}
      </Button>
      {status === "err" ? <p className="gx-quote-err">{error}</p> : null}
    </form>
  );
}
