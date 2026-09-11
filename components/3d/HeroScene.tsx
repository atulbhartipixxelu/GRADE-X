"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import type { SceneMode } from "./ExhaustCanvas";

const ExhaustCanvas = dynamic(
  () => import("./ExhaustCanvas").then((m) => m.ExhaustCanvas),
  { ssr: false },
);

export function HeroScene({ mode = "hero" }: { mode?: SceneMode }) {
  const wrap = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    if (motion.matches || conn?.saveData) return;

    const el = wrap.current;
    if (!el) return;
    let timer = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        io.disconnect();
        const mobile = window.matchMedia("(max-width: 720px)").matches;
        timer = window.setTimeout(() => setReady(true), mobile ? 250 : 80);
      },
      { rootMargin: "160px" },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      window.clearTimeout(timer);
    };
  }, []);

  return (
    <div ref={wrap} className="absolute inset-0">
      {ready ? <ExhaustCanvas mode={mode} /> : <HeroFallback />}
    </div>
  );
}

export function HeroFallback() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-brand">
      <div
        className="absolute inset-0 bg-contain bg-center bg-no-repeat opacity-80"
        style={{ backgroundImage: "url('/robot/front.jpg')" }}
      />
    </div>
  );
}
