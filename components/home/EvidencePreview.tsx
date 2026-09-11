"use client";

import { useEffect, useRef } from "react";
import {
  Camera,
  ClipboardList,
  FileText,
  Gauge,
  ShieldCheck,
  Video,
} from "lucide-react";
import { reportContents } from "@/lib/content";
import { Kicker } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";

const tiles = [
  { t: reportContents[0], n: "Supplied with every job", mark: "photo", icon: Camera },
  { t: reportContents[1], n: "Before and after, objective micron readings", mark: "gauge", icon: Gauge },
  { t: "Live video during the clean", n: "During the clean itself", mark: "live", icon: Video },
  { t: reportContents[2], n: "Written service report for facility files", mark: "file", icon: FileText },
  { t: reportContents[4], n: "Held with the job record", mark: "shield", icon: ShieldCheck },
  { t: reportContents[5], n: "Recommendations for future intervals", mark: "list", icon: ClipboardList },
] as const;

export function EvidencePreview() {
  const stage = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = stage.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.classList.add("is-in");
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        el.classList.add("is-in");
        io.disconnect();
      },
      { threshold: 0.16 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={stage} className="gx-evd px-5 py-24 sm:px-10 lg:py-32">
      <div className="gx-evd-copy mx-auto max-w-[1500px] lg:flex lg:items-end lg:justify-between lg:gap-16">
        <div className="max-w-[40rem]">
          <Kicker>Digital evidence &amp; reporting</Kicker>
          <h2 className="font-display mt-5 text-[clamp(1.85rem,3.3vw,3.2rem)] font-semibold leading-[1.12] text-ivory">
            <span className="block">What a client receives</span>
            <span className="block">after every job.</span>
          </h2>
        </div>
        <p className="gx-body mt-5 max-w-[32rem] text-[1.0625rem] leading-[1.7] lg:mt-0 lg:pb-1">
          Objective grease-thickness measurement before and after every clean, live video
          during the clean, and photographic before/after evidence. This is a genuine
          service feature, not a generic quality claim.
        </p>
      </div>

      <div className="gx-evd-mosaic mx-auto mt-12 max-w-[1500px] lg:mt-16">
        {tiles.map((tile, i) => (
          <article
            key={tile.t}
            className={`gx-evd-card gx-evd-card--${tile.mark}`}
            style={{ ["--i" as string]: String(i) }}
          >
            <span className="gx-evd-idx">{String(i + 1).padStart(2, "0")}</span>
            <span className="gx-evd-icon" aria-hidden>
              <tile.icon strokeWidth={1.7} />
            </span>
            <h3 className="gx-evd-title">{tile.t}</h3>
            <p className="gx-evd-note">{tile.n}</p>
            {tile.mark === "gauge" ? (
              <div className="gx-evd-gauge" aria-hidden>
                <span>Before</span>
                <span className="gx-evd-gauge-track">
                  <i />
                </span>
                <span>After</span>
              </div>
            ) : null}
            {tile.mark === "photo" ? (
              <span className="gx-evd-frames" aria-hidden>
                <i />
                <i />
              </span>
            ) : null}
          </article>
        ))}
      </div>

      <div className="gx-evd-cta mx-auto mt-10 max-w-[1500px]">
        <Button href="/digital-evidence">Digital evidence</Button>
      </div>
    </section>
  );
}
