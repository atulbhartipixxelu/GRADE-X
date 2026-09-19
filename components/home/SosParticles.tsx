"use client";

import { useEffect, useRef } from "react";

type Spark = {
  x: number;
  y: number;
  r: number;
  vx: number;
  vy: number;
  wave: number;
};

export function SosParticles() {
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const el = canvas.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = el.getContext("2d", { alpha: true });
    if (!ctx) return;

    let raf = 0;
    let live = false;
    let w = 0;
    let h = 0;
    const sparks: Spark[] = [];

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.25);
      w = el.clientWidth;
      h = el.clientHeight;
      el.width = Math.max(1, Math.floor(w * dpr));
      el.height = Math.max(1, Math.floor(h * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const seed = () => {
      sparks.length = 0;
      const count = w < 720 ? 22 : 36;
      for (let i = 0; i < count; i++) {
        sparks.push({
          x: Math.random() * w,
          y: Math.random() * h,
          r: 1 + Math.random() * 1.8,
          vx: -0.1 + Math.random() * 0.2,
          vy: -0.18 - Math.random() * 0.2,
          wave: Math.random() * Math.PI * 2,
        });
      }
    };

    const tick = () => {
      if (!live) {
        raf = 0;
        return;
      }
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = "rgba(255, 255, 255, 0.55)";
      for (const s of sparks) {
        s.wave += 0.01;
        s.x += s.vx + Math.sin(s.wave) * 0.12;
        s.y += s.vy;
        if (s.y < -10) {
          s.y = h + 8;
          s.x = Math.random() * w;
        }
        if (s.x < -10) s.x = w + 8;
        if (s.x > w + 8) s.x = -8;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
      }
      raf = window.requestAnimationFrame(tick);
    };

    const onResize = () => {
      resize();
      seed();
    };

    resize();
    seed();
    window.addEventListener("resize", onResize);

    const io = new IntersectionObserver(
      ([entry]) => {
        live = Boolean(entry?.isIntersecting);
        if (live && !raf) raf = window.requestAnimationFrame(tick);
      },
      { threshold: 0.08 },
    );
    io.observe(el);

    return () => {
      live = false;
      io.disconnect();
      window.cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return <canvas ref={canvas} className="gx-sos-particles" aria-hidden />;
}
