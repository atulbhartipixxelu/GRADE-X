"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

export function MachinePassCard() {
  const video = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = video.current;
    if (!el) return;
    el.muted = true;
    el.defaultMuted = true;
    el.loop = true;
    el.playsInline = true;
    const play = () => {
      void el.play().catch(() => undefined);
    };
    play();
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) el.pause();
      },
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <aside className="gx-pass">
      <p className="gx-pass-kicker">
        <i />
        Robotic platform
      </p>
      <div className="gx-pass-still">
        <video
          ref={video}
          src="/robot/platform.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          disablePictureInPicture
          controls={false}
          className="gx-pass-video"
          aria-label="Grade X robotic kitchen exhaust cleaning platform"
        />
      </div>
      <div className="gx-pass-copy">
        <h3 className="gx-pass-title">Kitchen exhaust robot</h3>
        <ul className="gx-pass-bits">
          <li>Dual hose</li>
          <li>Turret</li>
          <li>Camera</li>
        </ul>
        <Link href="/technology" className="gx-pass-link">
          View technology
        </Link>
      </div>
    </aside>
  );
}
