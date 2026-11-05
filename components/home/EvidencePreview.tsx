"use client";

import { useLayoutEffect, useRef } from "react";
import {
  Camera,
  ClipboardList,
  FileText,
  Gauge,
  ShieldCheck,
  Video,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { reportContents } from "@/lib/content";
import { Kicker } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";

gsap.registerPlugin(ScrollTrigger);

const tiles = [
  {
    t: reportContents[0],
    n: "Supplied with every job",
    mark: "photo",
    tag: "Photographs",
    icon: Camera,
    image: "/slides/kitchen-hood.jpg",
  },
  {
    t: reportContents[1],
    n: "Before and after, objective micron readings",
    mark: "gauge",
    tag: "Measurement",
    icon: Gauge,
    image: "/slides/duct-interior.jpg",
  },
  {
    t: "Live video during the clean",
    n: "During the clean itself",
    mark: "live",
    tag: "Live video",
    icon: Video,
    image: "/slides/duct-live.jpg",
  },
  {
    t: reportContents[2],
    n: "Written service report for facility files",
    mark: "file",
    tag: "Report",
    icon: FileText,
    image: "/slides/exploded-bench.jpg",
  },
  {
    t: reportContents[4],
    n: "Held with the job record",
    mark: "shield",
    tag: "Compliance",
    icon: ShieldCheck,
    image: "/slides/plant-flange.jpg",
  },
  {
    t: reportContents[5],
    n: "Recommendations for future intervals",
    mark: "list",
    tag: "Recommendations",
    icon: ClipboardList,
    image: "/slides/cylinder-brush.jpg",
  },
] as const;

function pad(n: number) {
  return String(n).padStart(2, "0");
}

export function EvidencePreview() {
  const stage = useRef<HTMLElement>(null);
  const view = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const root = stage.current;
    const viewEl = view.current;
    const trackEl = track.current;
    if (!root || !viewEl || !trackEl) return;

    const cards = [...trackEl.querySelectorAll<HTMLElement>(".gx-evd-card")];
    const count = root.querySelector(".gx-evd-now");
    const fillBar = root.querySelector<HTMLElement>(".gx-evd-fill");
    const last = Math.max(tiles.length - 1, 1);
    let shown = 0;

    const travel = () => Math.max(0, trackEl.scrollWidth - viewEl.clientWidth);

    const paint = (progress: number) => {
      const x = -progress * travel();
      trackEl.style.transform = `translate3d(${x}px, 0, 0)`;
      if (fillBar) fillBar.style.width = `${progress * 100}%`;

      const active = Math.max(0, Math.min(last, Math.round(progress * last)));
      cards.forEach((card, i) => {
        const abs = Math.abs(i - progress * last);
        card.classList.toggle("is-on", i === active);
        card.style.setProperty("--near", String(Math.max(0, 1 - abs * 0.55)));
      });
      if (active !== shown) {
        shown = active;
        if (count) count.textContent = pad(active + 1);
      }
    };

    const mm = gsap.matchMedia();

    mm.add("(max-width: 980px), (prefers-reduced-motion: reduce)", () => {
      root.classList.add("is-static");
      paint(0);
      cards.forEach((card) => card.classList.add("is-on"));
      return () => root.classList.remove("is-static");
    });

    mm.add("(min-width: 981px) and (prefers-reduced-motion: no-preference)", () => {
      let trigger: ScrollTrigger | null = null;
      const ctx = gsap.context(() => {
        trigger = ScrollTrigger.create({
          trigger: root,
          start: "top top",
          end: () => `+=${travel() + window.innerHeight * 0.85}`,
          pin: true,
          pinSpacing: true,
          scrub: 0.55,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => paint(self.progress),
          onRefresh: (self) => paint(self.progress),
        });
        requestAnimationFrame(() => ScrollTrigger.refresh());
      }, root);

      const jump = (index: number) => {
        if (!trigger) return;
        const next = Math.max(0, Math.min(1, index / last));
        window.scrollTo({
          top: trigger.start + next * (trigger.end - trigger.start),
          behavior: "smooth",
        });
      };

      const listeners = cards.map((card, i) => {
        const onClick = () => jump(i);
        card.addEventListener("click", onClick);
        return () => card.removeEventListener("click", onClick);
      });

      return () => {
        listeners.forEach((off) => off());
        ctx.revert();
      };
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={stage}
      className="gx-evd"
      aria-labelledby="gx-evd-heading"
    >
      <div className="gx-evd-stage">
        <header className="gx-evd-head">
          <div className="gx-evd-copy" data-aos="fade-up" data-aos-duration="850">
            <Kicker className="justify-center">Digital evidence &amp; reporting</Kicker>
            <h2 id="gx-evd-heading" className="gx-evd-title">
              Every clean ends with <em>proof.</em>
            </h2>
            <p className="gx-evd-body">
              Grease thickness measured in microns before and after. Photos. A service report
              listing what was cleaned and inspected. All of it filed against your site and ready
              for your insurer or brand auditor. On robotic cleans you can watch the inside of the
              duct during the clean.
            </p>
          </div>
        </header>

        <div ref={view} className="gx-evd-view" data-aos="fade-up" data-aos-delay="210" data-aos-duration="850">
          <div ref={track} className="gx-evd-track">
            {tiles.map((tile, i) => (
              <article
                key={tile.t}
                className={`gx-evd-card gx-evd-card--${tile.mark}${i === 0 ? " is-on" : ""}`}
                style={{ ["--i" as string]: String(i) }}
              >
                <div className="gx-evd-media">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img className="gx-evd-bg" src={tile.image} alt="" decoding="async" />
                  <b className="gx-evd-ghost" aria-hidden>
                    {pad(i + 1)}
                  </b>
                  <i className="gx-evd-corner" aria-hidden />
                  <i className="gx-evd-corner is-rt" aria-hidden />
                  <i className="gx-evd-corner is-lb" aria-hidden />
                  <i className="gx-evd-corner is-rb" aria-hidden />
                  <span className="gx-evd-chip">
                    <tile.icon strokeWidth={1.7} />
                    {tile.tag}
                    {tile.mark === "live" ? (
                      <em className="gx-evd-rec" aria-hidden>
                        <i /> Rec
                      </em>
                    ) : null}
                  </span>
                  <div className="gx-evd-info">
                    <span className="gx-evd-idx">{pad(i + 1)}</span>
                    <div>
                      <h3 className="gx-evd-name">{tile.t}</h3>
                      <p className="gx-evd-note">{tile.n}</p>
                    </div>
                    <em className="gx-evd-go" aria-hidden>
                      <i />
                    </em>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="gx-evd-meta">
          <p className="gx-evd-count">
            <span className="gx-evd-now">01</span>
            <span>/ {pad(tiles.length)}</span>
          </p>
          <Button href="/digital-evidence">Digital evidence</Button>
        </div>

        <div className="gx-evd-progress" aria-hidden>
          <i className="gx-evd-fill" />
        </div>
      </div>
    </section>
  );
}
