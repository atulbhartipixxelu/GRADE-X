"use client";

import type { ReactNode } from "react";
import { useEffect, useRef } from "react";
import Link from "next/link";
import { InnerParticles } from "@/components/inner/InnerParticles";

export function PageHero({
  kicker,
  title,
  body,
  crumbs,
  index = "01",
  media,
  mediaAlt = "",
}: {
  kicker: string;
  title: ReactNode;
  body: string;
  crumbs?: { href: string; label: string }[];
  index?: string;
  media?: string;
  mediaAlt?: string;
}) {
  const stage = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = stage.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const plate = root.querySelector<HTMLElement>(".gx-inner-hero-plate");
    if (!plate) return;
    const mouse = { x: 0.5, y: 0.5 };
    const look = { x: 0.5, y: 0.5 };
    let raf = 0;
    let live = true;

    const tick = () => {
      if (!live) return;
      look.x += (mouse.x - look.x) * 0.08;
      look.y += (mouse.y - look.y) * 0.08;
      const rx = (0.5 - look.y) * 8;
      const ry = (look.x - 0.5) * 12;
      plate.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`;
      raf = requestAnimationFrame(tick);
    };

    const onMove = (event: PointerEvent) => {
      const box = root.getBoundingClientRect();
      mouse.x = (event.clientX - box.left) / Math.max(1, box.width);
      mouse.y = (event.clientY - box.top) / Math.max(1, box.height);
    };
    const onLeave = () => {
      mouse.x = 0.5;
      mouse.y = 0.5;
    };

    root.addEventListener("pointermove", onMove);
    root.addEventListener("pointerleave", onLeave);
    raf = requestAnimationFrame(tick);
    return () => {
      live = false;
      root.removeEventListener("pointermove", onMove);
      root.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section ref={stage} className="gx-inner-hero">
      <InnerParticles />
      <div className="gx-inner-hero-grid">
        <div className="gx-inner-hero-copy">
          {crumbs ? (
            <p className="gx-inner-crumbs">
              {crumbs.map((c, i) => (
                <span key={`${c.href}-${c.label}`}>
                  <Link href={c.href}>{c.label}</Link>
                  {i < crumbs.length - 1 ? " / " : null}
                </span>
              ))}
            </p>
          ) : null}
          <p className="gx-inner-kicker">
            <i />
            {kicker}
          </p>
          <div className="gx-inner-clip">
            <h1 data-clip className="gx-inner-title">
              {title}
            </h1>
          </div>
          <p className="gx-inner-lede">{body}</p>
        </div>

        <div className="gx-inner-hero-visual">
          <p className="gx-inner-index" aria-hidden>
            {index}
          </p>
          <div className="gx-inner-hero-plate">
            {media ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={media} alt={mediaAlt} />
            ) : (
              <div className="gx-inner-hero-void" />
            )}
            <span className="gx-inner-hero-shine" />
          </div>
        </div>
      </div>
    </section>
  );
}
