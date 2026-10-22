"use client";

import { useEffect, useRef } from "react";

const stats = [
  { value: "Stainless", label: "Tracked crawler chassis" },
  { value: "Twin turret", label: "Dual-hose high-pressure jets" },
  { value: "Live camera", label: "LED interior confirmation" },
  { value: "Only in WA", label: "This class of robotic platform" },
];

const marks = ["Tracks", "Turret", "Hoses", "Camera", "LED"];

export function TechBanner() {
  const video = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = video.current;
    if (!el) return;
    el.muted = true;
    el.defaultMuted = true;
    el.playsInline = true;
    const play = () => {
      void el.play().catch(() => undefined);
    };
    el.addEventListener("loadeddata", play);
    if (el.readyState >= 2) play();
    return () => {
      el.removeEventListener("loadeddata", play);
      el.pause();
    };
  }, []);

  return (
    <section className="gx-tech-hero" aria-label="Robotic exhaust cleaning technology">
      <div className="gx-tech-hero-stage">
        <video
          ref={video}
          className="gx-tech-hero-video"
          src="/hero/banner.mp4"
          muted
          playsInline
          loop
          preload="auto"
          disablePictureInPicture
          controls={false}
        />
        <div className="gx-tech-hero-veil" aria-hidden />
      </div>

      <div className="gx-tech-hero-wrap">
        <div className="gx-tech-hero-top">
          <div>
            <p className="gx-tech-hero-kicker">Technology</p>
            <h1>Robotic kitchen exhaust cleaning.</h1>
          </div>
          <p className="gx-tech-hero-lede">
            Grade X operates a stainless tracked crawler for kitchen exhaust interiors — dual-hose
            high-pressure cleaning, twin turret nozzles, LED lighting and a forward inspection
            camera. Currently the only robotic platform of this kind in WA.
          </p>
        </div>
        <ul className="gx-tech-hero-marks">
          {marks.map((mark) => (
            <li key={mark}>{mark}</li>
          ))}
        </ul>
        <ul className="gx-tech-hero-stats">
          {stats.map((item) => (
            <li key={item.value}>
              <strong>{item.value}</strong>
              <span>{item.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
