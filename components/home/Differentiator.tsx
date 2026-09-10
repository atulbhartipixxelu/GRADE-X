"use client";

import { Reveal } from "@/components/ui/Reveal";

const stats = [
  { n: "1", l: "Of a kind in WA", pad: "1" },
  { n: "100", l: "Percent interior view", pad: "3" },
  { n: "0", l: "Guessed microns", pad: "1" },
  { n: "21", l: "Services on file", pad: "2" },
];

export function Differentiator() {
  return (
    <section className="px-5 py-24 sm:px-10 sm:py-32">
      <div className="mx-auto max-w-[1400px]">
        <p className="text-[15px] text-ivory">The real</p>
        <h2 className="font-display mt-2 text-[12vw] leading-[0.86] tracking-tight text-ivory sm:text-7xl lg:text-8xl">
          <span className="block overflow-hidden">
            <span data-clip className="block">
              Source of
            </span>
          </span>
          <span className="block overflow-hidden">
            <span data-clip className="block">
              every pass.
            </span>
          </span>
        </h2>
        <p className="mt-6 max-w-xl text-lg leading-8 text-mist">
          For years, exhaust interiors carried their own perfectly hidden grease
          load. Grade X put a crawler, a camera and a gauge on the same visit.
        </p>
        <div className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.l} delay={i * 0.06}>
              <p
                data-count={s.n}
                data-pad={s.pad}
                className="font-display text-7xl tracking-tight text-ivory"
              >
                {s.n}
              </p>
              <p className="mt-2 text-sm text-mist">{s.l}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
