"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Spec = { t: string; b: string };

export function ArchLine({ items }: { items: Spec[] }) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const line = root.current;
    if (!line) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fill = line.querySelector<HTMLElement>("[data-arch-fill]");
    const bead = line.querySelector<HTMLElement>("[data-arch-bead]");
    const stops = [...line.querySelectorAll<HTMLElement>("[data-arch-stop]")];

    const ctx = gsap.context(() => {
      if (fill) gsap.set(fill, { scaleY: reduce ? 1 : 0, transformOrigin: "50% 0%" });
      if (bead) gsap.set(bead, { top: reduce ? "100%" : "0%" });

      if (reduce) {
        stops.forEach((stop) => stop.classList.add("is-on"));
        return;
      }

      const scrub = {
        trigger: line,
        start: "top 72%",
        end: "bottom 58%",
        scrub: 0.5,
      };

      if (fill) gsap.to(fill, { scaleY: 1, ease: "none", scrollTrigger: scrub });
      if (bead) gsap.to(bead, { top: "100%", ease: "none", scrollTrigger: scrub });

      stops.forEach((stop) => {
        const left = stop.classList.contains("is-left");
        const node = stop.querySelector<HTMLElement>("[data-arch-node]");
        const card = stop.querySelector<HTMLElement>("article");

        if (node) gsap.set(node, { scale: 0.35, opacity: 0 });
        if (card) gsap.set(card, { x: left ? -56 : 56, opacity: 0 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: stop,
            start: "top 84%",
            toggleActions: "play none none reverse",
            onEnter: () => stop.classList.add("is-on"),
            onEnterBack: () => stop.classList.add("is-on"),
            onLeaveBack: () => stop.classList.remove("is-on"),
          },
        });

        if (node) {
          tl.to(node, { scale: 1, opacity: 1, duration: 0.42, ease: "back.out(1.7)" });
        }
        if (card) {
          tl.to(card, { x: 0, opacity: 1, duration: 0.58, ease: "power3.out" }, "-=0.18");
        }
      });
    }, line);

    const refresh = () => ScrollTrigger.refresh();
    const timer = window.setTimeout(refresh, 400);

    return () => {
      window.clearTimeout(timer);
      ctx.revert();
    };
  }, []);

  return (
    <div className="gx-tech-arch-line" ref={root}>
      <div className="gx-tech-arch-rail" aria-hidden>
        <i className="gx-tech-arch-rail-base" />
        <i className="gx-tech-arch-rail-fill" data-arch-fill />
        <b className="gx-tech-arch-bead" data-arch-bead />
      </div>

      <ol className="gx-tech-arch-track">
        {items.map((item, i) => (
          <li
            key={item.t}
            className={i % 2 ? "is-right" : "is-left"}
            data-arch-stop
          >
            <i className="gx-tech-arch-node" data-arch-node>
              {String(i + 1).padStart(2, "0")}
            </i>
            <article>
              <h3>{item.t}</h3>
              <p>{item.b}</p>
            </article>
          </li>
        ))}
      </ol>
    </div>
  );
}
