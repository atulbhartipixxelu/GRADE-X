"use client";

import { useEffect, useRef } from "react";
import { Play } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function TechBanner() {
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
    <section className="gx-hero" aria-label="Robotic exhaust cleaning technology">
      <div className="gx-hero-media">
        <video
          ref={video}
          src="/technology/crawler-scrub.mp4"
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
          <p className="gx-hero-kicker">Technology</p>
          <h1 className="gx-hero-title">
            <span>Robotic kitchen</span>
            <span>exhaust cleaning.</span>
          </h1>
          <p className="gx-hero-body">
            Grade X operates a stainless tracked crawler for kitchen exhaust interiors — dual-hose
            high-pressure cleaning, twin turret nozzles, LED lighting and a forward inspection
            camera. Currently the only robotic platform of this kind in WA.
          </p>
          <ul className="gx-hero-chips">
            {["Tracks", "Turret", "Hoses", "Camera", "LED"].map((mark) => (
              <li key={mark}>{mark}</li>
            ))}
          </ul>
          <div className="gx-hero-actions">
            <Button href="/contact">Request a quote</Button>
            <a className="gx-hero-play" href="#live-pass">
              <span className="gx-hero-play-icon">
                <Play strokeWidth={2} />
                <i />
                <i />
              </span>
              Live interior pass
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
