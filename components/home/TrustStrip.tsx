"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Doubled } from "@/components/ui/StaggerLink";
import { SectionHeading } from "@/components/ui/SectionHeading";

gsap.registerPlugin(ScrollTrigger);

const specs = [
  { n: "01", t: "Dual hose" },
  { n: "02", t: "Twin turret" },
  { n: "03", t: "LED + camera" },
  { n: "04", t: "Tracked drive" },
];

export function TrustStrip() {
  const stage = useRef<HTMLElement>(null);
  const outline = useRef<HTMLParagraphElement>(null);
  const copy = useRef<HTMLDivElement>(null);
  const frame = useRef<HTMLDivElement>(null);
  const tilt = useRef<HTMLDivElement>(null);
  const [n, setN] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => setN((v) => (v + 1) % 1000), 80);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    const stageEl = stage.current;
    const outlineEl = outline.current;
    const copyEl = copy.current;
    const frameEl = frame.current;
    if (!stageEl || !outlineEl || !copyEl || !frameEl) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        outlineEl,
        { xPercent: 18, opacity: 0.2 },
        {
          xPercent: -8,
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: stageEl,
            start: "top 90%",
            end: "bottom top",
            scrub: 1.2,
          },
        },
      );

      gsap.fromTo(
        copyEl.querySelectorAll("[data-crawler-line]"),
        { y: 36, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: copyEl, start: "top 80%" },
        },
      );

      gsap.fromTo(
        frameEl,
        { clipPath: "inset(18% 18% 18% 18% round 28px)", rotate: 8, scale: 0.88 },
        {
          clipPath: "inset(0% 0% 0% 0% round 28px)",
          rotate: 0,
          scale: 1,
          duration: 1.35,
          ease: "power4.out",
          scrollTrigger: { trigger: frameEl, start: "top 82%" },
        },
      );

      gsap.fromTo(
        stageEl.querySelectorAll("[data-callout]"),
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.1,
          delay: 0.25,
          ease: "power3.out",
          scrollTrigger: { trigger: frameEl, start: "top 78%" },
        },
      );
    }, stageEl);

    return () => ctx.revert();
  }, []);

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = tilt.current;
    if (!el) return;
    const r = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `rotateX(${(-y * 9).toFixed(2)}deg) rotateY(${(x * 11).toFixed(2)}deg)`;
  }

  function onLeave() {
    const el = tilt.current;
    if (!el) return;
    el.style.transform = "rotateX(0deg) rotateY(0deg)";
  }

  return (
    <section
      ref={stage}
      className="relative overflow-hidden px-5 py-24 sm:px-10 lg:py-32"
    >
      <p
        ref={outline}
        className="crawler-outline pointer-events-none absolute top-8 left-[-4%] font-display whitespace-nowrap select-none"
        aria-hidden
      >
        CRAWLER
      </p>

      <div className="relative z-10 mx-auto grid max-w-[1500px] items-center gap-16 lg:grid-cols-12">
        <div ref={copy} className="lg:col-span-5 lg:pt-16">
          <div data-crawler-line>
            <SectionHeading
              kicker="The machine we send in"
              title="Stainless crawler for kitchen exhaust."
              body="One stainless unit, into the duct within a day of the brief. Dual hoses, twin turret jets, LED lights, forward camera."
            />
          </div>

          <ul className="mt-10 space-y-3">
            {specs.map((s) => (
              <li
                key={s.n}
                data-crawler-line
                className="flex items-baseline gap-4 border-b border-[var(--line)] pb-3"
              >
                <span className="font-mono text-[11px] text-gold">{s.n}</span>
                <span className="text-ivory">{s.t}</span>
              </li>
            ))}
          </ul>

          <p
            data-crawler-line
            className="mt-8 font-mono text-sm tracking-[0.18em] text-ivory"
          >
            Whole crawler {String(n).padStart(3, "0")}
          </p>
          <div data-crawler-line>
            <Link href="/technology" className="mt-8 inline-block text-3xl text-ivory">
              <Doubled text="Explore machine" />
            </Link>
          </div>
        </div>

        <div className="relative lg:col-span-7">
          <div
            className="relative mx-auto max-w-[640px] perspective-[1200px]"
            onMouseMove={onMove}
            onMouseLeave={onLeave}
          >
            <div
              className="crawler-ring pointer-events-none absolute -inset-6 rounded-full border border-dashed border-ivory/20 lg:-inset-10"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute -inset-2 rounded-full border border-ivory/8 lg:-inset-4"
              aria-hidden
            />

            <div className="crawler-float">
              <div
                ref={frame}
                className="relative overflow-hidden rounded-[28px] bg-[#efe8da]"
              >
                <div
                  ref={tilt}
                  className="relative aspect-square transition-transform duration-300 ease-out will-change-transform"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <Image
                    src="/robot/side.jpg"
                    alt="Grade X tracked crawler"
                    fill
                    className="object-contain p-8 lg:p-12"
                    sizes="(min-width: 1024px) 50vw, 100vw"
                  />
                  <div className="crawler-scan pointer-events-none absolute inset-x-8 top-0 h-1/3 bg-gradient-to-b from-transparent via-[#3d5c45]/25 to-transparent" />
                </div>
                <div className="crawler-chevrons h-2.5 w-full opacity-40" />
              </div>
            </div>

            <p
              data-callout
              className="absolute top-4 -left-2 rounded-full bg-white px-3 py-1.5 text-[11px] tracking-[0.14em] text-ivory uppercase shadow-sm sm:top-8 sm:-left-6"
            >
              Dual hose
            </p>
            <p
              data-callout
              className="absolute top-1/3 -right-2 rounded-full bg-[#1a1712] px-3 py-1.5 text-[11px] tracking-[0.14em] text-white uppercase sm:-right-4"
            >
              Turret
            </p>
            <p
              data-callout
              className="absolute right-8 bottom-10 rounded-full bg-white px-3 py-1.5 text-[11px] tracking-[0.14em] text-ivory uppercase shadow-sm"
            >
              Forward camera
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
