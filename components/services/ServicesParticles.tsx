"use client";

import { useEffect, useRef } from "react";

type Spark = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  a: number;
  col: number;
  life: number;
  max: number;
  diamond: boolean;
};

export function ServicesParticles({ className = "gx-svc-hero-particles" }: { className?: string }) {
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const el = canvas.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = el.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let live = true;
    let w = 0;
    let h = 0;
    let t = 0;
    let last = performance.now();
    const mouse = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5 };
    const sparks: Spark[] = [];

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      w = el.clientWidth;
      h = el.clientHeight;
      el.width = Math.max(1, Math.floor(w * dpr));
      el.height = Math.max(1, Math.floor(h * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const spawn = (col: number, anywhere = false) => {
      const cx = ((col + 0.5) / 4) * w;
      sparks.push({
        x: cx + (Math.random() - 0.5) * (w * 0.16),
        y: anywhere ? Math.random() * h : h + 6,
        vx: (Math.random() - 0.5) * 0.22,
        vy: -0.35 - Math.random() * 0.7,
        r: Math.random() < 0.12 ? 1.7 : 0.5 + Math.random() * 1.05,
        a: 0.2 + Math.random() * 0.55,
        col,
        life: anywhere ? Math.random() : 0,
        max: 4.2 + Math.random() * 5.5,
        diamond: Math.random() < 0.08,
      });
    };

    const seed = () => {
      sparks.length = 0;
      const n = w < 720 ? 48 : 86;
      for (let i = 0; i < n; i++) spawn(i % 4, true);
    };

    const onMove = (event: PointerEvent) => {
      const box = el.getBoundingClientRect();
      mouse.tx = (event.clientX - box.left) / Math.max(1, box.width);
      mouse.ty = (event.clientY - box.top) / Math.max(1, box.height);
    };

    const draw = (now: number) => {
      if (!live) {
        raf = 0;
        return;
      }
      const dt = Math.min(0.033, (now - last) / 1000);
      last = now;
      t += dt;
      mouse.x += (mouse.tx - mouse.x) * 0.07;
      mouse.y += (mouse.ty - mouse.y) * 0.07;

      ctx.clearRect(0, 0, w, h);

      const sweep = ((t * 0.08) % 1) * w;
      const band = ctx.createLinearGradient(sweep - 80, 0, sweep + 80, 0);
      band.addColorStop(0, "rgba(201, 164, 74, 0)");
      band.addColorStop(0.5, "rgba(201, 164, 74, 0.07)");
      band.addColorStop(1, "rgba(201, 164, 74, 0)");
      ctx.fillStyle = band;
      ctx.fillRect(0, 0, w, h);

      const mx = mouse.x * w;
      const my = mouse.y * h;

      while (sparks.length < (w < 720 ? 48 : 86)) spawn(Math.floor(Math.random() * 4));

      for (let i = sparks.length - 1; i >= 0; i--) {
        const p = sparks[i];
        if (!p) continue;
        p.life += dt;
        const dx = mx - p.x;
        const dy = my - p.y;
        const dist = Math.max(60, Math.hypot(dx, dy));
        p.vx += (dx / dist) * 0.006;
        p.vy += (dy / dist) * 0.004;
        p.x += p.vx;
        p.y += p.vy;
        const fade = Math.max(0, 1 - p.life / p.max);
        const a = p.a * fade;

        if (p.diamond) {
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(t * 0.7 + p.col);
          ctx.strokeStyle = `rgba(244, 226, 176, ${a})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(0, -3.4);
          ctx.lineTo(3.4, 0);
          ctx.lineTo(0, 3.4);
          ctx.lineTo(-3.4, 0);
          ctx.closePath();
          ctx.stroke();
          ctx.restore();
        } else {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fillStyle = p.r > 1.3 ? `rgba(244, 226, 176, ${a})` : `rgba(201, 164, 74, ${a})`;
          ctx.fill();
        }

        if (p.life > p.max || p.y < -12) sparks.splice(i, 1);
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
    const io = new IntersectionObserver(
      ([entry]) => {
        live = Boolean(entry?.isIntersecting);
        if (live && !raf) {
          last = performance.now();
          raf = requestAnimationFrame(draw);
        }
      },
      { threshold: 0.05 },
    );
    io.observe(el);
    raf = requestAnimationFrame(draw);

    return () => {
      live = false;
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return <canvas ref={canvas} className={className} aria-hidden />;
}
