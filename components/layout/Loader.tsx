"use client";

import { useEffect, useState } from "react";

function Column({ digit }: { digit: number }) {
  return (
    <span className="inline-block h-[0.85em] overflow-hidden">
      <span
        className="block transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
        style={{ transform: `translateY(-${digit * 0.85}em)` }}
      >
        {Array.from({ length: 10 }, (_, n) => (
          <span key={n} className="block h-[0.85em] leading-[0.85em]">
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
      setGone(true);
      return;
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
      className={`fixed inset-0 z-[90] grid place-items-center bg-[#f3eee4] transition-transform duration-[900ms] ease-[cubic-bezier(0.76,0,0.24,1)] ${
        hide ? "-translate-y-full" : ""
      }`}
    >
      <p className="sr-only">{n} percent loaded</p>
      <p className="font-display flex items-end text-[22vw] leading-none text-[#1a1712]">
        <Column digit={a} />
        <Column digit={b} />
        <Column digit={c} />
        <span className="mb-[0.08em] text-[8vw]">%</span>
      </p>
    </div>
  );
}
