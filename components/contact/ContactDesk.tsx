"use client";

import { useState } from "react";
import Link from "next/link";
import { Clock, Hash, Map, MapPin } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { SelectMenu } from "@/components/ui/SelectMenu";
import { services as fallbackServices } from "@/lib/content";
import { isoStandards, openingHours, replyWindow } from "@/lib/iso";
import { site } from "@/lib/site";

const MAP_SRC =
  "https://maps.google.com/maps?q=5%20Elward%20Way%2C%20Balga%20WA%206061&hl=en&z=16&output=embed";

const urgencies = ["Planned programme", "This month", "Urgent / emergency"];

export function ContactDesk() {
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "err">("idle");
  const [error, setError] = useState("");
  const [service, setService] = useState("");
  const [urgency, setUrgency] = useState("Planned programme");
  const [photoName, setPhotoName] = useState("");

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
    setService("");
    setUrgency("Planned programme");
    setPhotoName("");
    setStatus("ok");
  }

  return (
    <div className="gx-com">
      <section className="gx-com-desk" id="quote" aria-labelledby="gx-com-form-heading">
        <div className="gx-com-wrap">
          <header className="gx-com-head" data-aos="fade-up">
            <p className="gx-com-kicker">Contact</p>
            <h2 id="gx-com-form-heading">
              Tell us about <em>your site.</em>
            </h2>
            <p className="gx-com-lede">
              Let us know what you need, how many sites and your timing. We&apos;ll reply within{" "}
              {replyWindow}. If it&apos;s urgent, call {site.phone}.
            </p>
          </header>

          <div className="gx-com-layout">
            <form onSubmit={onSubmit} className="gx-com-form" data-aos="fade-right">
              <p className="gx-com-form-title">Quote details</p>
              <label className="gx-com-item">
                <span>Name *</span>
                <input required name="name" autoComplete="name" />
              </label>
              <label className="gx-com-item">
                <span>Company / site</span>
                <input name="company" autoComplete="organization" />
              </label>
              <label className="gx-com-item">
                <span>Email *</span>
                <input required name="email" type="email" autoComplete="email" />
              </label>
              <label className="gx-com-item">
                <span>Phone *</span>
                <input required name="phone" type="tel" autoComplete="tel" />
              </label>
              <label className="gx-com-item">
                <span>Suburb / location *</span>
                <input required name="suburb" placeholder="Perth metro" />
              </label>
              <label className="gx-com-item">
                <span>Number of sites</span>
                <input name="sites" placeholder="1" />
              </label>
              <label className="gx-com-item">
                <span>Service type *</span>
                <SelectMenu
                  name="service"
                  value={service}
                  required
                  placeholder="Select a service"
                  options={fallbackServices.map((item) => ({
                    value: item.name,
                    label: item.name,
                  }))}
                  onChange={setService}
                />
              </label>
              <label className="gx-com-item">
                <span>Timing</span>
                <SelectMenu
                  name="urgency"
                  value={urgency}
                  options={urgencies.map((item) => ({ value: item, label: item }))}
                  onChange={setUrgency}
                />
              </label>
              <label className="gx-com-item gx-com-item--full">
                <span>Site notes</span>
                <textarea name="message" rows={4} />
              </label>
              <label className="gx-com-item gx-com-item--full gx-com-file">
                <span>Optional photo</span>
                <span className="gx-com-file-row">
                  <input
                    name="photo"
                    type="file"
                    accept="image/*"
                    onChange={(event) => setPhotoName(event.target.files?.[0]?.name ?? "")}
                  />
                  <em>Choose image</em>
                  <b>{photoName || "No file chosen"}</b>
                </span>
                <i>Email images to {site.email} after you send this form.</i>
              </label>
              <label className="gx-com-consent">
                <input required type="checkbox" name="privacy" />
                <span>
                  By sending this form you agree to our <a href="/privacy">Privacy Policy</a>. We
                  only use your details to respond to your request.
                </span>
              </label>

              <div className="gx-com-bottom">
                <p className="gx-com-check">
                  We reply within {replyWindow}. If it&apos;s urgent, call{" "}
                  <a href={site.phoneHref}>{site.phone}</a>.
                </p>
                <Button type="submit" variant="urgent" className="gx-com-send" disabled={status === "sending"}>
                  {status === "sending" ? "Sending…" : "Submit quote request"}
                </Button>
              </div>
              {status === "ok" ? (
                <p className="gx-com-note gx-com-note--ok">
                  Thanks. We&apos;ve got your request and someone from Grade X will be in touch by{" "}
                  {replyWindow}. If it&apos;s urgent, call {site.phone}.
                </p>
              ) : null}
              {status === "err" ? <p className="gx-com-note gx-com-note--err">{error}</p> : null}
            </form>

            <aside className="gx-com-aside" data-aos="fade-left">
              <div className="gx-com-call">
                <p className="gx-com-call-label">Phone</p>
                <a className="gx-com-phone" href={site.phoneHref}>
                  {site.phone}
                </a>
                <p className="gx-com-call-note">{site.emergency}</p>
                <a className="gx-com-call-mail" href={site.emailHref}>
                  {site.email}
                </a>
              </div>

              <ul className="gx-com-iso">
                {isoStandards.map((item) => (
                  <li key={item.id}>
                    <Link href={item.href} className="gx-iso-stamp" aria-label={item.alt}>
                      <small>ISO</small>
                      <strong>{item.code.replace("ISO ", "")}</strong>
                      <span>{item.short}</span>
                    </Link>
                  </li>
                ))}
              </ul>

              <ul className="gx-com-ledger">
                <li>
                  <i aria-hidden>
                    <MapPin strokeWidth={1.8} />
                  </i>
                  <p>
                    <b>Address</b>
                    <strong>{site.address.full}</strong>
                  </p>
                </li>
                <li>
                  <i aria-hidden>
                    <Clock strokeWidth={1.8} />
                  </i>
                  <p>
                    <b>Opening hours</b>
                    <strong>{openingHours}</strong>
                  </p>
                </li>
                <li>
                  <i aria-hidden>
                    <Map strokeWidth={1.8} />
                  </i>
                  <p>
                    <b>Service area</b>
                    <strong>{site.serviceArea}</strong>
                  </p>
                </li>
                <li>
                  <i aria-hidden>
                    <Hash strokeWidth={1.8} />
                  </i>
                  <p>
                    <b>ABN</b>
                    <strong>{site.abn}</strong>
                  </p>
                </li>
              </ul>

              <div className="gx-com-map">
                <iframe
                  title="Grade X, Balga WA"
                  src={MAP_SRC}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
                <a
                  className="gx-com-pin"
                  href="https://maps.google.com/?q=5+Elward+Way,+Balga+WA+6061"
                  target="_blank"
                  rel="noreferrer"
                >
                  <span>Get directions</span>
                  <strong>{site.address.full}</strong>
                </a>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}
