"use client";

import { useEffect, useRef } from "react";

export function BlogBanner() {
  const video = useRef<HTMLVideoElement>(null);

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
    <section className="gx-hero gx-blog-hero" aria-label="Resources">
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
          <p className="gx-hero-kicker">Resources</p>
          <h1 className="gx-hero-title">
            <span>Kitchen exhaust </span>
            <span>compliance notes.</span>
          </h1>
          <p className="gx-hero-body">
            Kitchen exhaust compliance, fire-risk measurement, and robotic cleaning for Western
            Australian sites.
          </p>
        </div>
      </div>
    </section>
  );
}
