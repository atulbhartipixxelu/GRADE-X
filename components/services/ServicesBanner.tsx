"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { categoryImages } from "@/lib/categoryMedia";
import { ServicesParticles } from "@/components/services/ServicesParticles";
import type { ServiceCategory } from "@/lib/content";

export function ServicesBanner({
  groups,
}: {
  groups: { key: ServiceCategory; title: string; count: number }[];
}) {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = root.current;
    if (!section) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const lines = section.querySelectorAll<HTMLElement>("[data-hero-line] > span");
    const lede = section.querySelector<HTMLElement>("[data-hero-lede]");
    const bays = section.querySelectorAll<HTMLElement>("[data-hero-bay]");
    const mark = section.querySelector<HTMLElement>("[data-hero-21]");

    if (reduce) {
      lines.forEach((el) => {
        el.style.transform = "none";
      });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set(lines, { yPercent: 110 });
      gsap.set(lede, { opacity: 0, y: 16 });
      gsap.set(bays, { y: 56, opacity: 0 });
      gsap.set(mark, { opacity: 0, scale: 0.92 });

      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
      tl.to(mark, { opacity: 1, scale: 1, duration: 1.2 }, 0)
        .to(lines, { yPercent: 0, duration: 1.05, stagger: 0.12 }, 0.12)
        .to(lede, { opacity: 1, y: 0, duration: 0.8 }, 0.45)
        .to(bays, { y: 0, opacity: 1, duration: 0.9, stagger: 0.08 }, 0.28);
    }, section);

    const shots = [...section.querySelectorAll<HTMLElement>("[data-hero-shot]")];
    const look = { x: 0, y: 0, tx: 0, ty: 0 };
    let raf = 0;
    let live = true;
    const tick = () => {
      if (!live) return;
      look.x += (look.tx - look.x) * 0.08;
      look.y += (look.ty - look.y) * 0.08;
      shots.forEach((shot, i) => {
        const dir = i % 2 === 0 ? 1 : -1;
        shot.style.transform = `translate3d(${look.x * 10 * dir}px, ${look.y * 8}px, 0) scale(1.08)`;
      });
      raf = requestAnimationFrame(tick);
    };
    const onMove = (event: PointerEvent) => {
      const box = section.getBoundingClientRect();
      look.tx = (event.clientX - box.left) / box.width - 0.5;
      look.ty = (event.clientY - box.top) / box.height - 0.5;
    };
    section.addEventListener("pointermove", onMove, { passive: true });
    raf = requestAnimationFrame(tick);

    return () => {
      live = false;
      cancelAnimationFrame(raf);
      section.removeEventListener("pointermove", onMove);
      ctx.revert();
    };
  }, []);

  return (
    <section ref={root} className="gx-svc-hero" aria-label="Grade X services">
      <ServicesParticles />
      <p className="gx-svc-hero-21" data-hero-21 aria-hidden>
        21
      </p>

      <div className="gx-svc-hero-top">
        <p className="gx-svc-hero-crumbs">
          <Link href="/">Home</Link>
          {" / "}
          <span>Services</span>
        </p>
        <p className="gx-svc-hero-kicker">
          <i />
          Services
        </p>
        <h1 className="gx-svc-hero-title">
          <span data-hero-line>
            <span>All 21</span>
          </span>
          <span data-hero-line>
            <span>Grade X services.</span>
          </span>
        </h1>
        <p className="gx-svc-hero-lede" data-hero-lede>
          Organised into kitchen exhaust & hygiene specialty, kitchen equipment cleaning, lobby
          & front-of-house, and exterior & general commercial. Each service has its own short
          description.
        </p>
      </div>

      <div className="gx-svc-hero-bays">
        {groups.map((g, i) => (
          <a
            key={g.key}
            href={`#${g.key}`}
            className="gx-svc-hero-bay"
            data-hero-bay
          >
            <span className="gx-svc-hero-frame">
              <span className="gx-svc-hero-shot" data-hero-shot>
                <Image
                  src={categoryImages[g.key]}
                  alt={g.title}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 25vw, 50vw"
                  priority={i < 2}
                />
              </span>
              <span className="gx-svc-hero-bay-veil" />
              <span className="gx-svc-hero-cap">
                <em>
                  {String(i + 1).padStart(2, "0")}
                  <b>{String(g.count).padStart(2, "0")}</b>
                </em>
                <strong>{g.title}</strong>
              </span>
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}
