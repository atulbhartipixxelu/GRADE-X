"use client";

import { useEffect, useRef, useState } from "react";
import { ContactParticles } from "@/components/contact/ContactParticles";
import { services as fallbackServices } from "@/lib/content";
import { site } from "@/lib/site";

const MAP_SRC =
  "https://maps.google.com/maps?q=5%20Elward%20Way%2C%20Balga%20WA%206061&hl=en&z=16&output=embed";

const urgencies = ["Planned programme", "This month", "Urgent / emergency"];

export function ContactDesk() {
  const title = useRef<HTMLHeadingElement>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "err">("idle");
  const [error, setError] = useState("");

  useEffect(() => {
    const el = title.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const chars = [...el.querySelectorAll<HTMLElement>("[data-ch]")];
    chars.forEach((ch, i) => {
      ch.style.animationDelay = `${i * 38}ms`;
      ch.classList.add("is-in");
    });
  }, []);

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
      <section className="gx-com-top">
        <ContactParticles />
        <div className="gx-com-head">
          <h1 ref={title} className="gx-com-title">
            {"Request a quote".split(" ").map((word, wi) => (
              <span key={word} className="gx-com-word">
                {word.split("").map((ch, i) => (
                  <span key={`${word}-${i}`} data-ch>
                    {ch}
                  </span>
                ))}
                {wi === 0 ? "\u00A0" : null}
              </span>
            ))}
          </h1>
          <p className="gx-com-lede">
            Service type, site details, and contact information. Service area: Perth metropolitan /
            WA. Emergency response is available — call for urgent issues.
          </p>
        </div>

        <form onSubmit={onSubmit} className="gx-com-form">
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
            <textarea name="message" rows={3} />
          </label>

          <div className="gx-com-bottom">
            <p className="gx-com-check">
              <a href={site.phoneHref}>{site.phone}</a>
              {" — "}
              {site.emergency}.
            </p>
            <button type="submit" className="gx-com-send" disabled={status === "sending"}>
              <span>{status === "sending" ? "Sending…" : "Submit quote request"}</span>
            </button>
          </div>
          {status === "ok" ? (
            <p className="gx-com-note gx-com-note--ok">
              Received. Grade X will respond to this enquiry. For emergencies call {site.phone}.
            </p>
          ) : null}
          {status === "err" ? <p className="gx-com-note gx-com-note--err">{error}</p> : null}
        </form>
      </section>

      <section className="gx-com-info">
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
            {site.address.full}
          </a>
        </div>
        <div className="gx-com-address">
          <p className="gx-com-direct">Direct</p>
          <h2>
            <a href={site.phoneHref}>{site.phone}</a>
          </h2>
          <a className="gx-com-mail" href={site.emailHref}>
            {site.email}
          </a>
          <ul className="gx-com-facts">
            <li>
              <span>Address</span>
              {site.address.full}
            </li>
            <li>
              <span>ABN</span>
              {site.abn}
            </li>
            <li>
              <span>Service area</span>
              {site.serviceArea}
            </li>
            <li>
              <span>Emergency</span>
              {site.emergency}.
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}
