"use client";

import { useEffect, useRef } from "react";
import { Phone } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { site } from "@/lib/site";

export function ContactBanner() {
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
    <section className="gx-hero" aria-label="Request a quote">
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
        />
        <div className="gx-hero-wash" aria-hidden />
      </div>

      <div className="gx-hero-inner">
        <div className="gx-hero-copy">
          <p className="gx-hero-kicker">Contact</p>
          <h1 className="gx-hero-title">
            <span>Request a</span>
            <span>quote.</span>
          </h1>
          <p className="gx-hero-body">
            Service type, site details, and contact information. Service area: Perth metropolitan /
            WA. Emergency response is available — call for urgent issues.
          </p>
          <div className="gx-hero-actions">
            <Button href="#quote">Quote details</Button>
            <a className="gx-hero-play" href={site.phoneHref}>
              <span className="gx-hero-play-icon">
                <Phone strokeWidth={2} />
                <i />
                <i />
              </span>
              {site.phone}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
