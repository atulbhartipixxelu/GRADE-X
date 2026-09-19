"use client";

import { useEffect, useRef } from "react";

type Orbiter = {
  ring: number;
  angle: number;
  speed: number;
  size: number;
  glow: boolean;
  phase: number;
};

type Ember = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  max: number;
  size: number;
};

type Comet = {
  ring: number;
  angle: number;
  speed: number;
  trail: { x: number; y: number }[];
};

export function CoreParticles({ className = "gx-core-particles" }: { className?: string }) {
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
    const orbiters: Orbiter[] = [];
    const embers: Ember[] = [];
    const comets: Comet[] = [];

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      w = el.clientWidth;
      h = el.clientHeight;
      el.width = Math.max(1, Math.floor(w * dpr));
      el.height = Math.max(1, Math.floor(h * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const seed = () => {
      orbiters.length = 0;
      embers.length = 0;
      comets.length = 0;
      const mobile = w < 720;
      const rings = [
        { n: mobile ? 14 : 20, speed: 0.18 },
        { n: mobile ? 18 : 28, speed: -0.12 },
        { n: mobile ? 16 : 24, speed: 0.08 },
        { n: mobile ? 10 : 16, speed: -0.05 },
      ];
      rings.forEach((ring, ri) => {
        for (let i = 0; i < ring.n; i++) {
          orbiters.push({
            ring: ri,
            angle: (i / ring.n) * Math.PI * 2 + ri * 0.35,
            speed: ring.speed,
            size: ri === 0 ? 1.5 + Math.random() : 0.7 + Math.random() * 1.15,
            glow: i % (ri === 0 ? 4 : 7) === 0,
            phase: Math.random() * Math.PI * 2,
          });
        }
      });
      const emberCount = mobile ? 28 : 48;
      for (let i = 0; i < emberCount; i++) spawnEmber(true);
      for (let i = 0; i < (mobile ? 2 : 3); i++) {
        comets.push({
          ring: i % 3,
          angle: Math.random() * Math.PI * 2,
          speed: 0.55 + i * 0.18,
          trail: [],
        });
      }
    };

    const spawnEmber = (anywhere = false) => {
      const left = w * 0.42;
      embers.push({
        x: anywhere ? Math.random() * left : Math.random() * left * 0.85,
        y: anywhere ? Math.random() * h : h + 8,
        vx: (Math.random() - 0.5) * 0.18,
        vy: -0.18 - Math.random() * 0.42,
        life: anywhere ? Math.random() : 0,
        max: 4.5 + Math.random() * 5,
        size: 0.5 + Math.random() * 1.15,
      });
    };

    let plat = { cx: 0, cy: 0, r: 80 };
    const measurePlinth = () => {
      const host = el.parentElement;
      const node = host?.querySelector(".gx-core-plinth");
      if (!node) {
        plat = { cx: w * 0.68, cy: h * 0.5, r: Math.min(w, h) * 0.22 };
        return;
      }
      const a = el.getBoundingClientRect();
      const b = node.getBoundingClientRect();
      plat = {
        cx: b.left - a.left + b.width / 2,
        cy: b.top - a.top + b.height / 2,
        r: b.width / 2,
      };
    };

    const onMove = (event: PointerEvent) => {
      const box = el.getBoundingClientRect();
      mouse.tx = (event.clientX - box.left) / Math.max(1, box.width);
      mouse.ty = (event.clientY - box.top) / Math.max(1, box.height);
    };

    const ringRadius = (ri: number, r: number) => r * (1.08 + ri * 0.16);

    const draw = (now: number) => {
      if (!live) {
        raf = 0;
        return;
      }
      const dt = Math.min(0.033, (now - last) / 1000);
      last = now;
      t += dt;
      mouse.x += (mouse.tx - mouse.x) * 0.05;
      mouse.y += (mouse.ty - mouse.y) * 0.05;

      const { cx, cy, r } = plat;
      const pullX = (mouse.x - 0.5) * 18;
      const pullY = (mouse.y - 0.5) * 12;
      const ox = cx + pullX;
      const oy = cy + pullY;

      ctx.clearRect(0, 0, w, h);

      const halo = ctx.createRadialGradient(ox, oy, r * 0.7, ox, oy, r * 2.15);
      halo.addColorStop(0, "rgba(201, 164, 74, 0)");
      halo.addColorStop(0.42, "rgba(201, 164, 74, 0.05)");
      halo.addColorStop(1, "rgba(201, 164, 74, 0)");
      ctx.fillStyle = halo;
      ctx.fillRect(0, 0, w, h);

      ctx.save();
      ctx.translate(ox, oy);
      ctx.rotate(t * 0.42);
      const beam = ctx.createRadialGradient(0, 0, r, 0, 0, r * 1.92);
      beam.addColorStop(0, "rgba(201, 164, 74, 0.16)");
      beam.addColorStop(0.7, "rgba(228, 200, 120, 0.05)");
      beam.addColorStop(1, "rgba(201, 164, 74, 0)");
      ctx.fillStyle = beam;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.arc(0, 0, r * 1.92, -0.22, 0.22);
      ctx.closePath();
      ctx.fill();
      ctx.restore();

      ctx.save();
      ctx.translate(ox, oy);
      ctx.rotate(-t * 0.08);
      ctx.strokeStyle = "rgba(228, 200, 120, 0.28)";
      ctx.lineWidth = 1;
      for (let i = 0; i < 56; i++) {
        const a = (i / 56) * Math.PI * 2;
        const inner = r * 1.105;
        const outer = i % 8 === 0 ? r * 1.165 : r * 1.132;
        ctx.globalAlpha = i % 8 === 0 ? 0.55 : 0.22;
        ctx.beginPath();
        ctx.moveTo(Math.cos(a) * inner, Math.sin(a) * inner);
        ctx.lineTo(Math.cos(a) * outer, Math.sin(a) * outer);
        ctx.stroke();
      }
      ctx.restore();
      ctx.globalAlpha = 1;

      const scan = (t * 0.42) % (Math.PI * 2);
      const byRing: { x: number; y: number; a: number; glow: boolean; size: number }[][] = [[], [], [], []];

      for (const p of orbiters) {
        p.angle += p.speed * dt;
        const rad = ringRadius(p.ring, r) + Math.sin(t * 0.7 + p.phase) * 4;
        const x = ox + Math.cos(p.angle) * rad;
        const y = oy + Math.sin(p.angle) * rad * 0.96;
        let ang = p.angle - scan;
        while (ang > Math.PI) ang -= Math.PI * 2;
        while (ang < -Math.PI) ang += Math.PI * 2;
        const hit = Math.max(0, 1 - Math.abs(ang) / 0.38);
        const a = 0.22 + p.phase * 0.04 + hit * 0.55;
        byRing[p.ring]?.push({ x, y, a, glow: p.glow || hit > 0.45, size: p.size + hit * 0.8 });
      }

      for (const ring of byRing) {
        if (ring.length < 2) continue;
        ring.sort((a, b) => Math.atan2(a.y - oy, a.x - ox) - Math.atan2(b.y - oy, b.x - ox));
        ctx.lineWidth = 1;
        for (let i = 0; i < ring.length; i++) {
          const a = ring[i];
          const b = ring[(i + 1) % ring.length];
          if (!a || !b) continue;
          const gap = Math.abs(
            Math.atan2(a.y - oy, a.x - ox) - Math.atan2(b.y - oy, b.x - ox),
          );
          const da = Math.min(gap, Math.PI * 2 - gap);
          if (da > 0.48) continue;
          ctx.strokeStyle = `rgba(201, 164, 74, ${0.16 * (1 - da / 0.48)})`;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }

      for (const p of byRing.flat()) {
        if (p.glow) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 4.4, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(201, 164, 74, ${p.a * 0.16})`;
          ctx.fill();
        }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.glow
          ? `rgba(244, 226, 176, ${Math.min(1, p.a)})`
          : `rgba(228, 200, 120, ${Math.min(0.85, p.a)})`;
        ctx.fill();
      }

      for (const c of comets) {
        c.angle += c.speed * dt;
        const rad = ringRadius(c.ring, r) + 10;
        const x = ox + Math.cos(c.angle) * rad;
        const y = oy + Math.sin(c.angle) * rad * 0.96;
        c.trail.unshift({ x, y });
        if (c.trail.length > 18) c.trail.pop();
        for (let i = 0; i < c.trail.length - 1; i++) {
          const a = c.trail[i];
          const b = c.trail[i + 1];
          if (!a || !b) continue;
          ctx.strokeStyle = `rgba(228, 200, 120, ${(1 - i / c.trail.length) * 0.45})`;
          ctx.lineWidth = 1.4 - i * 0.05;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
        ctx.beginPath();
        ctx.arc(x, y, 2.1, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(243, 238, 228, 0.95)";
        ctx.fill();
      }

      if (embers.length < (w < 720 ? 28 : 48) && Math.random() < 0.35) spawnEmber();
      for (let i = embers.length - 1; i >= 0; i--) {
        const e = embers[i];
        if (!e) continue;
        e.life += dt;
        e.x += e.vx + Math.sin(t * 0.8 + e.y * 0.01) * 0.12;
        e.y += e.vy;
        const k = 1 - e.life / e.max;
        if (k <= 0 || e.y < -10) {
          embers.splice(i, 1);
          continue;
        }
        ctx.beginPath();
        ctx.arc(e.x, e.y, e.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(201, 164, 74, ${0.18 + k * 0.28})`;
        ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    };

    resize();
    seed();
    measurePlinth();
    const ro = new ResizeObserver(() => {
      resize();
      seed();
      measurePlinth();
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
      { threshold: 0.08 },
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
