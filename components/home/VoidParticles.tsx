"use client";

import { useEffect, useRef } from "react";

type Spark = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  a: number;
  glow: boolean;
};

export function VoidParticles({
  overlay = false,
  className = "gx-void-field",
}: {
  overlay?: boolean;
  className?: string;
}) {
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
    const mouse = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5 };
    const sparks: Spark[] = [];

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.6);
      w = el.clientWidth;
      h = el.clientHeight;
      el.width = Math.max(1, Math.floor(w * dpr));
      el.height = Math.max(1, Math.floor(h * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const seed = () => {
      sparks.length = 0;
      const count = w < 720 ? 90 : 150;
      for (let i = 0; i < count; i++) {
        sparks.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.28,
          vy: -0.12 - Math.random() * 0.32,
          r: Math.random() < 0.12 ? 1.8 + Math.random() * 1.6 : 0.6 + Math.random() * 1.1,
          a: 0.22 + Math.random() * 0.55,
          glow: i % 7 === 0,
        });
      }
    };

    const onMove = (event: PointerEvent) => {
      const box = el.getBoundingClientRect();
      mouse.tx = (event.clientX - box.left) / box.width;
      mouse.ty = (event.clientY - box.top) / box.height;
    };

    const draw = () => {
      mouse.x += (mouse.tx - mouse.x) * 0.06;
      mouse.y += (mouse.ty - mouse.y) * 0.06;

      ctx.clearRect(0, 0, w, h);
      if (!overlay) {
        ctx.fillStyle = "#050b14";
        ctx.fillRect(0, 0, w, h);

        const cx = w * (0.5 + (mouse.x - 0.5) * 0.08);
        const cy = h * (0.5 + (mouse.y - 0.5) * 0.06);
        const g = ctx.createRadialGradient(cx, cy, 20, cx, cy, Math.max(w, h) * 0.55);
        g.addColorStop(0, "rgba(201, 164, 74, 0.22)");
        g.addColorStop(0.42, "rgba(10, 22, 40, 0.18)");
        g.addColorStop(1, "rgba(5, 11, 20, 0)");
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, w, h);
      }

      const mx = mouse.x * w;
      const my = mouse.y * h;

      for (const p of sparks) {
        const dx = mx - p.x;
        const dy = my - p.y;
        const dist = Math.max(80, Math.hypot(dx, dy));
        p.vx += (dx / dist) * 0.012;
        p.vy += (dy / dist) * 0.008;
        p.vx *= 0.97;
        p.vy *= 0.97;
        p.x += p.vx;
        p.y += p.vy;

        if (p.y < -8) p.y = h + 8;
        if (p.y > h + 8) p.y = -8;
        if (p.x < -8) p.x = w + 8;
        if (p.x > w + 8) p.x = -8;
      }

      ctx.lineWidth = 1;
      for (let i = 0; i < sparks.length; i++) {
        const a = sparks[i];
        if (!a) continue;
        for (let j = i + 1; j < i + 8 && j < sparks.length; j++) {
          const b = sparks[j];
          if (!b) continue;
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 > 11000) continue;
          const alpha = 0.14 * (1 - d2 / 11000);
          ctx.strokeStyle = `rgba(228, 200, 120, ${alpha})`;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }

      for (const p of sparks) {
        if (p.glow) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r * 4.2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(201, 164, 74, ${p.a * 0.18})`;
          ctx.fill();
        }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.glow
          ? `rgba(244, 226, 176, ${p.a})`
          : `rgba(238, 243, 250, ${p.a})`;
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
    window.addEventListener("pointermove", onMove, { passive: true });
    raf = requestAnimationFrame(draw);

    return () => {
      ro.disconnect();
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [overlay]);

  return <canvas ref={canvas} className={className} aria-hidden />;
}
