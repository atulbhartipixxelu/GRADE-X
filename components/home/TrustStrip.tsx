"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { credentials } from "@/lib/content";

gsap.registerPlugin(ScrollTrigger);

const specs = [
  { n: "01", t: "Robotic exhaust cleaning platform" },
  { n: "02", t: "Digital grease thickness measurement" },
  { n: "03", t: "Interior steam washing and extraction" },
  { n: "04", t: "Live video during the clean" },
];

export function TrustStrip() {
  const stage = useRef<HTMLElement>(null);
  const copy = useRef<HTMLDivElement>(null);
  const frame = useRef<HTMLDivElement>(null);
  const tilt = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stageEl = stage.current;
    const copyEl = copy.current;
    const frameEl = frame.current;
    if (!stageEl || !copyEl || !frameEl) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const ctx = gsap.context(() => {
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
    <section ref={stage} className="relative overflow-hidden px-5 py-24 sm:px-10 lg:py-32">
      <div className="relative z-10 mx-auto grid max-w-[1500px] items-center gap-16 lg:grid-cols-12">
        <div ref={copy} className="lg:col-span-5 lg:pt-8">
          <div data-crawler-line>
            <SectionHeading
              kicker="Core differentiator"
              title="Robotic kitchen exhaust cleaning technology."
              body="Grade X is currently the only company in WA operating robotic kitchen exhaust cleaning technology. Reference photos of the platform are shown here; a dedicated Technology page covers the system in full."
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

          <div data-crawler-line className="mt-8">
            <Button href="/technology">Technology</Button>
          </div>
        </div>

        <div className="relative lg:col-span-7">
          <div
            className="relative mx-auto max-w-[640px] perspective-[1200px]"
            onMouseMove={onMove}
            onMouseLeave={onLeave}
          >
            <div
              ref={frame}
              className="relative overflow-hidden rounded-[28px] bg-navy-2"
            >
              <div
                ref={tilt}
                className="relative aspect-square transition-transform duration-300 ease-out will-change-transform"
                style={{ transformStyle: "preserve-3d" }}
              >
                <Image
                  src="/robot/side.jpg"
                  alt="Grade X robotic kitchen exhaust cleaning platform"
                  fill
                  className="object-contain p-8 lg:p-12"
                  sizes="(min-width: 1024px) 50vw, 100vw"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-20 grid max-w-[1500px] gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {credentials.slice(0, 6).map((c) => (
          <article key={c.title} className="border border-[var(--line)] bg-white p-6">
            <h3 className="font-display text-xl text-ivory">{c.title}</h3>
            <p className="mt-3 text-sm leading-7 text-mist">{c.body}</p>
          </article>
        ))}
      </div>
      <p className="mx-auto mt-6 max-w-[1500px] text-sm text-mist">
        Exact certificate wording is supplied by Grade X.{" "}
        <Link href="/compliance" className="text-gold hover:underline">
          Compliance &amp; WHS
        </Link>
      </p>
    </section>
  );
}
