"use client";

import { useEffect, useState } from "react";

function Column({ digit }: { digit: number }) {
  return (
    <span className="gx-loader-col">
      <span
        className="gx-loader-strip"
        style={{ transform: `translateY(-${digit}em)` }}
      >
        {Array.from({ length: 10 }, (_, n) => (
          <span key={n} className="gx-loader-digit">
            {n}
          </span>
        ))}
      </span>
    </span>
  );
}

export function Loader() {
  const [n, setN] = useState(0);
  const [hide, setHide] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      const skip = window.setTimeout(() => setGone(true), 0);
      return () => window.clearTimeout(skip);
    }
    let v = 0;
    const id = window.setInterval(() => {
      v += Math.random() * 8 + 3;
      if (v >= 100) {
        v = 100;
        window.clearInterval(id);
        setN(100);
        window.setTimeout(() => setHide(true), 350);
        window.setTimeout(() => setGone(true), 1200);
        return;
      }
      setN(Math.floor(v));
    }, 55);
    return () => window.clearInterval(id);
  }, []);

  if (gone) return null;
  const a = Math.floor(n / 100);
  const b = Math.floor((n % 100) / 10);
  const c = n % 10;

  return (
    <div
      className={`gx-loader fixed inset-0 z-[90] grid place-items-center bg-brand transition-transform duration-[900ms] ease-[cubic-bezier(0.76,0,0.24,1)] ${
        hide ? "-translate-y-full" : ""
      }`}
    >
      <p className="sr-only">{n} percent loaded</p>
      <p className="gx-loader-num" aria-hidden>
        <Column digit={a} />
        <Column digit={b} />
        <Column digit={c} />
        <span className="gx-loader-pct">%</span>
      </p>
    </div>
  );
}
