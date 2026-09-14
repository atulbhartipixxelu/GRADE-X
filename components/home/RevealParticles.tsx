"use client";

import { useEffect, useRef } from "react";

type Speck = {
  ox: number;
  oy: number;
  r: number;
  a: number;
  s: number;
  kind: 0 | 1 | 2;
  phase: number;
};

export function RevealParticles() {
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const el = canvas.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = el.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let w = 0;
    let h = 0;
    let t = 0;
    const specks: Speck[] = [];

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      w = el.clientWidth;
      h = el.clientHeight;
      el.width = Math.max(1, Math.floor(w * dpr));
      el.height = Math.max(1, Math.floor(h * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const seed = () => {
      specks.length = 0;
      const count = w < 720 ? 70 : 110;
      for (let i = 0; i < count; i++) {
        specks.push({
          ox: Math.random() * w,
          oy: Math.random() * h,
          r: i % 8 === 0 ? 3.2 : 1.1 + Math.random() * 2.2,
          a: 0.22 + Math.random() * 0.28,
          s: 0.16 + Math.random() * 0.5,
          kind: i % 10 === 0 ? 2 : i % 4 === 0 ? 1 : 0,
          phase: Math.random() * Math.PI * 2,
        });
      }
    };

    const draw = () => {
      t += 0.01;
      ctx.clearRect(0, 0, w, h);

      const cx = w * 0.5;
      const cy = h * 0.58;
      const pulse = (t * 0.18) % 1;
      ctx.beginPath();
      ctx.arc(cx, cy, 28 + pulse * Math.min(w, h) * 0.48, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(30, 111, 212, ${0.22 * (1 - pulse)})`;
      ctx.lineWidth = 1.2;
      ctx.setLineDash([4, 12]);
      ctx.stroke();
      ctx.setLineDash([]);

      const sweep = t * 0.42;
      ctx.beginPath();
      ctx.arc(cx, cy, Math.min(w, h) * 0.3, sweep, sweep + 0.7);
      ctx.strokeStyle = "rgba(74, 154, 232, 0.28)";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      for (const p of specks) {
        const x = p.ox + Math.sin(t * p.s + p.phase) * 36;
        const y = p.oy + Math.cos(t * p.s * 1.35 + p.phase) * 22;
        const twinkle = 0.6 + 0.4 * Math.sin(t * 2.4 + p.phase);

        if (p.kind === 2) {
          ctx.save();
          ctx.translate(x, y);
          ctx.rotate(t * 0.18 + p.phase);
          ctx.strokeStyle = `rgba(190, 224, 255, ${p.a * twinkle})`;
          ctx.lineWidth = 1.15;
          ctx.beginPath();
          ctx.moveTo(-5.5, 0);
          ctx.lineTo(5.5, 0);
          ctx.moveTo(0, -5.5);
          ctx.lineTo(0, 5.5);
          ctx.stroke();
          ctx.restore();
          continue;
        }

        if (p.kind === 1) {
          ctx.beginPath();
          ctx.arc(x, y, p.r + 1.4, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(30, 111, 212, ${p.a * twinkle})`;
          ctx.lineWidth = 1;
          ctx.stroke();
          continue;
        }

        ctx.beginPath();
        ctx.arc(x, y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(190, 224, 255, ${p.a * twinkle})`;
        ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    };

    resize();
    seed();
    const ro = new ResizeObserver(() => {
      resize();
      seed();
    });
    ro.observe(el);
    raf = requestAnimationFrame(draw);

    return () => {
      ro.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

  return <canvas ref={canvas} className="gx-reveal-particles" aria-hidden />;
}
