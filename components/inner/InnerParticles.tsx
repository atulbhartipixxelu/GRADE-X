"use client";

import { useEffect, useRef } from "react";

type Node = {
  x: number;
  y: number;
  ox: number;
  oy: number;
  z: number;
  r: number;
  glow: boolean;
};

export function InnerParticles({ className = "gx-inner-particles" }: { className?: string }) {
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
    const nodes: Node[] = [];

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      w = el.clientWidth;
      h = el.clientHeight;
      el.width = Math.max(1, Math.floor(w * dpr));
      el.height = Math.max(1, Math.floor(h * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const seed = () => {
      nodes.length = 0;
      const cols = w < 720 ? 9 : 14;
      const rows = w < 720 ? 6 : 8;
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const ox = ((x + 0.5) / cols) * w + (Math.random() - 0.5) * 18;
          const oy = ((y + 0.5) / rows) * h + (Math.random() - 0.5) * 16;
          nodes.push({
            x: ox,
            y: oy,
            ox,
            oy,
            z: 0.4 + Math.random() * 0.8,
            r: 0.7 + Math.random() * 1.4,
            glow: (x + y) % 5 === 0,
          });
        }
      }
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

      const mx = mouse.x * w;
      const my = mouse.y * h;

      ctx.clearRect(0, 0, w, h);

      const haze = ctx.createRadialGradient(mx, my, 20, mx, my, Math.max(w, h) * 0.42);
      haze.addColorStop(0, "rgba(201, 164, 74, 0.09)");
      haze.addColorStop(1, "rgba(201, 164, 74, 0)");
      ctx.fillStyle = haze;
      ctx.fillRect(0, 0, w, h);

      for (const n of nodes) {
        const dx = n.ox - mx;
        const dy = n.oy - my;
        const dist = Math.hypot(dx, dy) || 1;
        const pull = Math.max(0, 1 - dist / 240) * 36 * n.z;
        const tx = n.ox - (dx / dist) * pull + Math.sin(t * 0.6 + n.ox * 0.01) * 6;
        const ty = n.oy - (dy / dist) * pull + Math.cos(t * 0.45 + n.oy * 0.01) * 5;
        n.x += (tx - n.x) * 0.08;
        n.y += (ty - n.y) * 0.08;
      }

      ctx.lineWidth = 1;
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        if (!a) continue;
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          if (!b) continue;
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d > 118) continue;
          ctx.strokeStyle = `rgba(201, 164, 74, ${(1 - d / 118) * 0.18})`;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }

      for (const n of nodes) {
        const near = Math.max(0, 1 - Math.hypot(n.x - mx, n.y - my) / 180);
        if (n.glow || near > 0.35) {
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.r * (3.6 + near * 3), 0, Math.PI * 2);
          ctx.fillStyle = `rgba(201, 164, 74, ${0.08 + near * 0.16})`;
          ctx.fill();
        }
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r + near * 1.2, 0, Math.PI * 2);
        ctx.fillStyle = n.glow
          ? `rgba(244, 226, 176, ${0.55 + near * 0.4})`
          : `rgba(228, 200, 120, ${0.28 + near * 0.45})`;
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
    const io = new IntersectionObserver(
      ([entry]) => {
        live = Boolean(entry?.isIntersecting);
        if (live && !raf) {
          last = performance.now();
          raf = requestAnimationFrame(draw);
        }
      },
      { threshold: 0.06 },
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
