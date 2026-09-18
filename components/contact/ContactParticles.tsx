"use client";

import { useEffect, useRef } from "react";

type Dust = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  a: number;
  tw: number;
  glow: boolean;
};

type Comet = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  max: number;
  trail: { x: number; y: number }[];
};

type Ring = {
  x: number;
  y: number;
  r: number;
  a: number;
};

export function ContactParticles({ className = "gx-com-particles" }: { className?: string }) {
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
    let cometWait = 1.2;
    const mouse = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5 };
    const dust: Dust[] = [];
    const comets: Comet[] = [];
    const rings: Ring[] = [];

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      w = el.clientWidth;
      h = el.clientHeight;
      el.width = Math.max(1, Math.floor(w * dpr));
      el.height = Math.max(1, Math.floor(h * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const seed = () => {
      dust.length = 0;
      comets.length = 0;
      rings.length = 0;
      const count = w < 720 ? 70 : 120;
      for (let i = 0; i < count; i++) {
        dust.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.22,
          vy: -0.08 - Math.random() * 0.28,
          r: i % 9 === 0 ? 1.8 + Math.random() * 1.4 : 0.55 + Math.random() * 1.15,
          a: 0.18 + Math.random() * 0.5,
          tw: Math.random() * Math.PI * 2,
          glow: i % 6 === 0,
        });
      }
    };

    const spawnComet = () => {
      const fromLeft = Math.random() > 0.45;
      comets.push({
        x: fromLeft ? -20 : Math.random() * w * 0.7,
        y: fromLeft ? Math.random() * h * 0.7 : -20,
        vx: 1.6 + Math.random() * 1.8,
        vy: 0.55 + Math.random() * 1.1,
        life: 0,
        max: 1.8 + Math.random() * 1.4,
        trail: [],
      });
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
      mouse.x += (mouse.tx - mouse.x) * 0.08;
      mouse.y += (mouse.ty - mouse.y) * 0.08;

      const mx = mouse.x * w;
      const my = mouse.y * h;

      ctx.clearRect(0, 0, w, h);

      const haze = ctx.createRadialGradient(mx, my, 12, mx, my, Math.max(w, h) * 0.38);
      haze.addColorStop(0, "rgba(201, 164, 74, 0.14)");
      haze.addColorStop(0.45, "rgba(201, 164, 74, 0.04)");
      haze.addColorStop(1, "rgba(201, 164, 74, 0)");
      ctx.fillStyle = haze;
      ctx.fillRect(0, 0, w, h);

      cometWait -= dt;
      if (cometWait <= 0) {
        spawnComet();
        cometWait = 2.4 + Math.random() * 2.8;
      }

      for (let i = comets.length - 1; i >= 0; i--) {
        const c = comets[i];
        if (!c) continue;
        c.life += dt;
        c.x += c.vx;
        c.y += c.vy;
        c.trail.push({ x: c.x, y: c.y });
        if (c.trail.length > 18) c.trail.shift();
        const fade = Math.max(0, 1 - c.life / c.max);
        for (let k = 1; k < c.trail.length; k++) {
          const a = c.trail[k - 1];
          const b = c.trail[k];
          if (!a || !b) continue;
          ctx.strokeStyle = `rgba(244, 226, 176, ${fade * (k / c.trail.length) * 0.55})`;
          ctx.lineWidth = 1.4 * (k / c.trail.length);
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
        ctx.beginPath();
        ctx.arc(c.x, c.y, 2.2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 244, 210, ${fade})`;
        ctx.fill();
        if (c.life > c.max || c.x > w + 40 || c.y > h + 40) comets.splice(i, 1);
      }

      for (let i = rings.length - 1; i >= 0; i--) {
        const ring = rings[i];
        if (!ring) continue;
        ring.r += 42 * dt;
        ring.a -= 0.35 * dt;
        ctx.beginPath();
        ctx.arc(ring.x, ring.y, ring.r, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(201, 164, 74, ${Math.max(0, ring.a)})`;
        ctx.lineWidth = 1.1;
        ctx.stroke();
        if (ring.a <= 0) rings.splice(i, 1);
      }

      if (Math.sin(t * 1.4) > 0.97 && rings.length < 3) {
        rings.push({ x: mx, y: my, r: 8, a: 0.28 });
      }

      for (const p of dust) {
        const dx = mx - p.x;
        const dy = my - p.y;
        const dist = Math.max(70, Math.hypot(dx, dy));
        p.vx += (dx / dist) * 0.01;
        p.vy += (dy / dist) * 0.007;
        p.vx *= 0.978;
        p.vy *= 0.978;
        p.x += p.vx + Math.sin(t * 0.55 + p.tw) * 0.12;
        p.y += p.vy;
        p.tw += dt * 2.2;
        if (p.y < -10) p.y = h + 8;
        if (p.y > h + 10) p.y = -8;
        if (p.x < -10) p.x = w + 8;
        if (p.x > w + 10) p.x = -8;
      }

      ctx.lineWidth = 1;
      for (let i = 0; i < dust.length; i++) {
        const a = dust[i];
        if (!a) continue;
        for (let j = i + 1; j < i + 6 && j < dust.length; j++) {
          const b = dust[j];
          if (!b) continue;
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d > 108) continue;
          ctx.strokeStyle = `rgba(201, 164, 74, ${(1 - d / 108) * 0.16})`;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }

      for (const p of dust) {
        const twinkle = 0.55 + 0.45 * Math.sin(p.tw);
        if (p.glow) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r * 4.4, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(201, 164, 74, ${p.a * 0.16 * twinkle})`;
          ctx.fill();
        }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.glow
          ? `rgba(244, 226, 176, ${p.a * twinkle})`
          : `rgba(228, 200, 120, ${p.a * twinkle})`;
        ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    };

    resize();
    seed();
    spawnComet();
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
