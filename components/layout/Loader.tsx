"use client";

import { useEffect, useRef, useState } from "react";
import { BrandLockup } from "@/components/brand/Logo";

export function Loader() {
  const logo = useRef<HTMLDivElement>(null);
  const [n, setN] = useState(0);
  const [phase, setPhase] = useState<"load" | "fly" | "done">("load");

  useEffect(() => {
    const root = document.documentElement;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    root.dataset.gxLoading = "1";

    const finish = () => {
      root.dataset.gxReady = "1";
      delete root.dataset.gxLoading;
      setPhase("done");
    };

    if (reduce) {
      finish();
      return;
    }

    let v = 0;
    let flyTimer = 0;
    let doneTimer = 0;
    const id = window.setInterval(() => {
      v += Math.random() * 7 + 4;
      if (v < 100) {
        setN(Math.floor(v));
        return;
      }
      window.clearInterval(id);
      setN(100);
      flyTimer = window.setTimeout(() => {
        const from = logo.current;
        const to = document.querySelector<HTMLElement>("[data-gx-logo='header']");
        const wait = (el: Element | null) => {
          const img = el?.querySelector("img");
          if (!img || img.complete) return Promise.resolve();
          return new Promise<void>((res) => {
            img.addEventListener("load", () => res(), { once: true });
            img.addEventListener("error", () => res(), { once: true });
          });
        };
        void Promise.all([wait(from), wait(to)]).then(() => {
          if (from && to) {
            const a = from.getBoundingClientRect();
            const b = to.getBoundingClientRect();
            const dx = b.left + b.width / 2 - (a.left + a.width / 2);
            const dy = b.top + b.height / 2 - (a.top + a.height / 2);
            const s = Math.min(b.width / a.width, b.height / a.height);
            from.style.transform = `translate3d(${dx}px, ${dy}px, 0) scale(${s})`;
          }
          setPhase("fly");
          doneTimer = window.setTimeout(finish, from && to ? 1100 : 520);
        });
      }, 280);
    }, 48);

    return () => {
      window.clearInterval(id);
      window.clearTimeout(flyTimer);
      window.clearTimeout(doneTimer);
    };
  }, []);

  if (phase === "done") return null;

  return (
    <div className={`gx-loader ${phase === "fly" ? "is-fly" : ""}`} aria-hidden={phase === "fly"}>
      <div className="gx-loader-veil" />
      <p className="sr-only">{n} percent loaded</p>
      <div className="gx-loader-stage">
        <div ref={logo} className="gx-loader-logo">
          <BrandLockup className="gx-brand--boot" priority sizes="(max-width: 720px) 70vw, 360px" />
        </div>
        <div className="gx-loader-meter">
          <span className="gx-loader-bar" style={{ width: `${n}%` }} />
        </div>
        <p className="gx-loader-count">{String(n).padStart(3, "0")}</p>
      </div>
    </div>
  );
}
