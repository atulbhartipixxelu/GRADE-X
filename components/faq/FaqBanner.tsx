"use client";

import { useEffect, useRef } from "react";

export function FaqBanner({ count }: { count: number }) {
  const video = useRef<HTMLVideoElement>(null);
  const label = String(count).padStart(2, "0");

  useEffect(() => {
    const el = video.current;
    if (!el) return;
    el.muted = true;
    el.defaultMuted = true;
    el.playsInline = true;
    const start = () => {
      void el.play().catch(() => undefined);
    };
    if (el.readyState >= 2) start();
    else el.addEventListener("canplay", start, { once: true });
    return () => el.removeEventListener("canplay", start);
  }, []);

  return (
    <section className="gx-hero gx-faq-hero" aria-label="FAQ">
      <div className="gx-hero-media">
        <video
          ref={video}
          src="/about/exhaust-pass.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          disablePictureInPicture
          controls={false}
          className="gx-hero-video"
          aria-label="Robotic crawler passing through a commercial kitchen exhaust duct"
        />
        <div className="gx-hero-wash" aria-hidden />
      </div>

      <div className="gx-hero-inner">
        <div className="gx-hero-copy">
          <p className="gx-hero-kicker">FAQ</p>
          <h1 className="gx-hero-title">
            <span>Questions before </span>
            <span>requesting a quote.</span>
          </h1>
          <p className="gx-hero-body">
            Service frequency, the robotic process, urgent response, and compliance evidence —
            written for facility managers and QSR operators.
          </p>
          <p className="gx-faq-hero-meta">
            {label} answers on this page
          </p>
        </div>
      </div>
    </section>
  );
}
