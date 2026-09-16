"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { techPlates } from "./techPlates";

const TechBayCanvas = dynamic(
  () => import("./TechBayCanvas").then((m) => m.TechBayCanvas),
  { ssr: false },
);

export function TechBay() {
  const [ready, setReady] = useState(false);
  const [active, setActive] = useState(0);
  const current = techPlates[active];

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    if (motion.matches || conn?.saveData) return;
    const timer = window.setTimeout(() => setReady(true), 80);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <section className="gx-tech-bay" aria-label="3D inspection of the Grade X crawler">
      {ready ? (
        <TechBayCanvas active={active} onPick={setActive} />
      ) : (
        <div className="gx-tech-bay-fallback" style={{ backgroundImage: `url('${current.src}')` }} />
      )}

      <div className="gx-tech-bay-hud">
        <p>
          <span>{current.n}</span>
          <b>{current.label}</b>
          {current.text}
        </p>
        <div className="gx-tech-bay-picks" role="tablist" aria-label="Crawler views">
          {techPlates.map((plate, i) => (
            <button
              key={plate.n}
              type="button"
              role="tab"
              aria-selected={i === active}
              className={i === active ? "is-on" : ""}
              onClick={() => setActive(i)}
            >
              {plate.n} {plate.label}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
