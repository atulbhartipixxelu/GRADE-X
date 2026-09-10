"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import type { SceneMode } from "./ExhaustCanvas";

const ExhaustCanvas = dynamic(
  () => import("./ExhaustCanvas").then((m) => m.ExhaustCanvas),
  { ssr: false },
);

export function HeroScene({ mode = "hero" }: { mode?: SceneMode }) {
  const [ready, setReady] = useState(false);
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduce(motion.matches);
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    const saveData = Boolean(conn?.saveData);
    const mobile = window.matchMedia("(max-width: 720px)").matches;
    if (!motion.matches && !saveData) {
      const t = window.setTimeout(() => setReady(true), mobile ? 250 : 80);
      return () => window.clearTimeout(t);
    }
  }, []);

  if (reduce || !ready) {
    return <HeroFallback />;
  }

  return (
    <div className="absolute inset-0">
      <ExhaustCanvas mode={mode} />
    </div>
  );
}

export function HeroFallback() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[#f3eee4]">
      <div
        className="absolute inset-0 bg-contain bg-center bg-no-repeat opacity-80"
        style={{ backgroundImage: "url('/robot/front.jpg')" }}
      />
    </div>
  );
}
