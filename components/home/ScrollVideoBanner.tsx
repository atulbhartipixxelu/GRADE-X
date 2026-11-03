"use client";

import { useEffect, useRef } from "react";
import { Play } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function ScrollVideoBanner() {
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
    <section className="gx-hero" aria-label="Grade X robotic crawler">
      <div className="gx-hero-media">
        <video
          ref={video}
          src="/hero/banner.mp4"
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
          <p className="gx-hero-kicker">
            Commercial kitchen exhaust specialists | Perth and Western Australia
          </p>
          <h1 className="gx-hero-title gx-hero-title--split">
            <span>
              <em>Kitchen exhaust</em>
            </span>
            <span className="gx-hero-accent">
              <em>cleaning, measured</em>
            </span>
            <span>
              <em>and proven.</em>
            </span>
          </h1>
          <p className="gx-hero-body">
            Robotic cleaning, digital grease readings and photo evidence on every job, so your
            kitchen is safer and your records stand up to any audit.
          </p>
          <div className="gx-hero-actions">
            <Button href="/contact" variant="urgent">
              Request a quote
            </Button>
            <a className="gx-hero-play" href="/technology">
              <span className="gx-hero-play-icon">
                <Play strokeWidth={2} />
                <i />
                <i />
              </span>
              See the robot at work
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
