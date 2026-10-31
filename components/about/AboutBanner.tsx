"use client";

import { useEffect, useRef } from "react";
import { Play } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function AboutBanner() {
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
    <section className="gx-hero" aria-label="About Grade X">
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
          <p className="gx-hero-kicker">About Grade X</p>
          <h1 className="gx-hero-title">
            <span>A specialist,</span>
            <span>not a generalist.</span>
          </h1>
          <p className="gx-hero-body">
            Grade X is currently the only company in WA operating robotic kitchen exhaust cleaning
            technology.
          </p>
          <div className="gx-hero-actions">
            <Button href="/contact">Request a quote</Button>
            <a className="gx-hero-play" href="/technology">
              <span className="gx-hero-play-icon">
                <Play strokeWidth={2} />
                <i />
                <i />
              </span>
              Inspect the crawler
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
