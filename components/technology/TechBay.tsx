"use client";

import { useEffect, useRef } from "react";
import { InnerParticles } from "@/components/inner/InnerParticles";
import { Button } from "@/components/ui/Button";
import { techPlates } from "./techPlates";

function Corners() {
  return (
    <>
      <span className="gx-tech-sight-corner" />
      <span className="gx-tech-sight-corner is-rt" />
      <span className="gx-tech-sight-corner is-rb" />
      <span className="gx-tech-sight-corner is-lb" />
    </>
  );
}

export function TechBay() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = root.current;
    if (!section) return;

    const wrap = section.querySelector<HTMLElement>("[data-sight-wrap]");
    const row = section.querySelector<HTMLElement>("[data-sight-row]");
    const left = section.querySelector<HTMLElement>("[data-sight-left]");
    const right = section.querySelector<HTMLElement>("[data-sight-right]");
    const track = section.querySelector<HTMLElement>("[data-sight-track]");
    if (!wrap || !row || !left || !right || !track) return;

    const shots = [...left.querySelectorAll<HTMLElement>("[data-shot]")];
    const blocks = [...track.querySelectorAll<HTMLElement>("[data-block]")];
    const strips: HTMLDivElement[] = [];
    let raf = 0;
    let live = false;

    const rem = () => parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
    const gapPx = () => 1.5 * rem();
    const radiusPx = () => 0.5 * rem();

    const overlay = document.createElement("div");
    overlay.className = "gx-tech-sight-gaps";
    left.appendChild(overlay);
    for (let i = 0; i < shots.length - 1; i++) {
      const strip = document.createElement("div");
      overlay.appendChild(strip);
      strips.push(strip);
    }

    const desktop = window.matchMedia("(min-width: 980px)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");

    const clear = () => {
      wrap.style.height = "";
      track.style.transform = "";
      shots.forEach((el) => {
        el.style.clipPath = "";
      });
      strips.forEach((strip) => {
        strip.style.height = "0px";
        strip.style.transform = "";
      });
    };

    const paint = () => {
      if (!live) return;
      const viewH = right.clientHeight;
      const maxTranslate = Math.max(0, track.offsetHeight - viewH);
      const t = Math.max(0, Math.min(maxTranslate, row.getBoundingClientRect().top - wrap.getBoundingClientRect().top));
      track.style.transform = `translate3d(0, ${-t}px, 0)`;

      const gap = gapPx();
      const radius = radiusPx();
      const last = shots.length - 1;
      const done = maxTranslate > 0 && t >= maxTranslate - 2;

      shots.forEach((shot, i) => {
        const block = blocks[i];
        if (!block) return;

        if (done) {
          shot.style.clipPath = i === last ? "inset(0 round 8px)" : "inset(100% 0 0 0)";
          const strip = strips[i - 1];
          if (strip) strip.style.height = "0px";
          return;
        }

        const shotRect = shot.getBoundingClientRect();
        const maskH = shotRect.height;
        const bcr = block.getBoundingClientRect();
        const rawTop = bcr.top - shotRect.top;
        const rawBottom = bcr.bottom - shotRect.top;
        const rawH = Math.max(0, rawBottom - rawTop);
        const sepH = i > 0 ? Math.max(0, Math.min(gap, rawH)) : 0;
        const strip = strips[i - 1];
        if (strip) {
          strip.style.transform = `translate3d(0, ${Math.round(rawTop)}px, 0)`;
          strip.style.height = `${Math.round(sepH)}px`;
        }

        let topPx = Math.round(Math.max(0, Math.min(maskH, rawTop + sepH)));
        let bottomPx = Math.round(Math.max(0, Math.min(maskH, maskH - rawBottom)));
        if (topPx + bottomPx > maskH) bottomPx = Math.max(0, maskH - topPx);
        const visH = Math.max(0, maskH - topPx - bottomPx);
        const r = Math.round(Math.max(0, Math.min(radius, visH * 0.5)));
        shot.style.clipPath = `inset(${topPx}px 0 ${bottomPx}px 0 round ${r}px)`;
      });
    };

    const tick = () => {
      raf = requestAnimationFrame(tick);
      paint();
    };

    const layout = () => {
      if (!desktop.matches || reduce.matches) {
        live = false;
        cancelAnimationFrame(raf);
        clear();
        return;
      }
      wrap.style.height = `${track.offsetHeight - right.clientHeight + row.offsetHeight + window.innerHeight * 0.22}px`;
      live = true;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) layout();
        else {
          live = false;
          cancelAnimationFrame(raf);
        }
      },
      { rootMargin: "20% 0px" },
    );
    io.observe(section);
    layout();
    const later = window.setTimeout(layout, 500);
    desktop.addEventListener("change", layout);
    reduce.addEventListener("change", layout);
    window.addEventListener("resize", layout);
    return () => {
      live = false;
      cancelAnimationFrame(raf);
      window.clearTimeout(later);
      io.disconnect();
      desktop.removeEventListener("change", layout);
      reduce.removeEventListener("change", layout);
      window.removeEventListener("resize", layout);
      overlay.remove();
      clear();
    };
  }, []);

  return (
    <section ref={root} className="gx-tech-sight" aria-label="Crawler service views">
      <div className="gx-tech-sight-wrap" data-sight-wrap>
        <div className="gx-tech-sight-card" data-sight-row>
          <div className="gx-tech-sight-core">
            <InnerParticles className="gx-tech-sight-particles" />

            <div className="gx-tech-sight-left" data-sight-left>
              {techPlates.map((plate, i) => (
                <figure
                  key={plate.n}
                  className={`gx-tech-sight-shot${plate.fit === "map" ? " is-map" : ""}`}
                  data-shot
                  style={{ zIndex: techPlates.length - i }}
                >
                  <img src={plate.src} alt={plate.alt} />
                </figure>
              ))}
            </div>

            <div className="gx-tech-sight-right" data-sight-right>
              <div className="gx-tech-sight-track" data-sight-track>
                {techPlates.map((plate, i) => (
                  <article key={plate.n} className="gx-tech-sight-block" data-block>
                    <img
                      className={`gx-tech-sight-mobile${plate.fit === "map" ? " is-map" : ""}`}
                      src={plate.src}
                      alt=""
                    />
                    <div className="gx-tech-sight-copy">
                      <Corners />
                      <p className="gx-tech-sight-kicker">
                        <span>{plate.n}</span>
                        {plate.label}
                      </p>
                      <h2>{plate.title}</h2>
                      <p>{plate.text}</p>
                      {i === techPlates.length - 1 ? (
                        <Button href="/methodology">Eight-step methodology</Button>
                      ) : null}
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
