"use client";

import { useState } from "react";
import { Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { services as fallbackServices } from "@/lib/content";
import { site } from "@/lib/site";

const MAP_SRC =
  "https://maps.google.com/maps?q=5%20Elward%20Way%2C%20Balga%20WA%206061&hl=en&z=16&output=embed";

const urgencies = ["Planned programme", "This month", "Urgent / emergency"];

export function ContactDesk() {
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

  return (
    <div className="gx-com">
      <section className="gx-com-desk" id="quote" aria-labelledby="gx-com-form-heading">
        <div className="gx-com-wrap">
          <header className="gx-com-head" data-aos="fade-up">
            <p className="gx-com-kicker">Contact</p>
            <h2 id="gx-com-form-heading">Quote details</h2>
            <p className="gx-com-lede">
              Service type, site details, and contact information. Service area: Perth metropolitan /
              WA. Emergency response is available — call for urgent issues.
            </p>
          </header>

          <div className="gx-com-layout">
            <form onSubmit={onSubmit} className="gx-com-form">
              <p className="gx-com-form-title">Quote details</p>
              <label className="gx-com-item">
                <span>Name</span>
                <input required name="name" autoComplete="name" />
              </label>
              <label className="gx-com-item">
                <span>Company / site</span>
                <input name="company" autoComplete="organization" />
              </label>
              <label className="gx-com-item">
                <span>Email</span>
                <input required name="email" type="email" autoComplete="email" />
              </label>
              <label className="gx-com-item">
                <span>Phone</span>
                <input required name="phone" type="tel" autoComplete="tel" />
              </label>
              <label className="gx-com-item">
                <span>Suburb / location</span>
                <input required name="suburb" placeholder="Perth metro" />
              </label>
              <label className="gx-com-item">
                <span>Number of sites</span>
                <input name="sites" placeholder="1" />
              </label>
              <label className="gx-com-item">
                <span>Service type</span>
                <select name="service" defaultValue="" required>
                  <option value="" disabled>
                    Select a service
                  </option>
                  {fallbackServices.map((s) => (
                    <option key={s.slug} value={s.name}>
                      {s.name}
                    </option>
                  ))}
                </select>
              </label>
              <label className="gx-com-item">
                <span>Timing</span>
                <select name="urgency" defaultValue="Planned programme">
                  {urgencies.map((u) => (
                    <option key={u}>{u}</option>
                  ))}
                </select>
              </label>
              <label className="gx-com-item gx-com-item--full">
                <span>Site notes</span>
                <textarea name="message" rows={4} />
              </label>

              <div className="gx-com-bottom">
                <p className="gx-com-check">
                  <a href={site.phoneHref}>{site.phone}</a>
                  {" — "}
                  {site.emergency}.
                </p>
                <Button type="submit" className="gx-com-send" disabled={status === "sending"}>
                  {status === "sending" ? "Sending…" : "Submit quote request"}
                </Button>
              </div>
              {status === "ok" ? (
                <p className="gx-com-note gx-com-note--ok">
                  Received. Grade X will respond to this enquiry. For emergencies call {site.phone}.
                </p>
              ) : null}
              {status === "err" ? <p className="gx-com-note gx-com-note--err">{error}</p> : null}
            </form>

            <aside className="gx-com-aside">
              <a className="gx-com-call" href={site.phoneHref}>
                <span className="gx-com-call-top">
                  <span className="gx-com-call-ico" aria-hidden>
                    <Phone strokeWidth={1.7} />
                  </span>
                  <span className="gx-cta-live">
                    <i /> Direct
                  </span>
                </span>
                <strong>{site.phone}</strong>
                <em>{site.emergency}.</em>
                <span className="gx-com-call-mail">
                  <Mail aria-hidden />
                  {site.email}
                </span>
              </a>

              <ul className="gx-com-facts">
                <li>
                  <b>01</b>
                  <span>Address</span>
                  <strong>{site.address.full}</strong>
                </li>
                <li>
                  <b>02</b>
                  <span>ABN</span>
                  <strong>{site.abn}</strong>
                </li>
                <li>
                  <b>03</b>
                  <span>Service area</span>
                  <strong>{site.serviceArea}</strong>
                </li>
                <li>
                  <b>04</b>
                  <span>Emergency</span>
                  <strong>{site.emergency}.</strong>
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
                  <span>Base</span>
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
