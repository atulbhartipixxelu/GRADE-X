"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MachinePassCard } from "@/components/home/MachinePassCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { site } from "@/lib/site";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { n: "1", l: "Robotic operator in WA", pad: "1", k: "01" },
  { n: "8", l: "Methodology steps", pad: "1", k: "02" },
  { n: "21", l: "Services listed", pad: "2", k: "03" },
];

export function ScrollVideoBanner() {
  const stage = useRef<HTMLElement>(null);
  const wrap = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const heroCopy = useRef<HTMLDivElement>(null);
  const heroWash = useRef<HTMLDivElement>(null);
  const secondCopy = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stageEl = stage.current;
    const wrapEl = wrap.current;
    const videoEl = video.current;
    const heroEl = heroCopy.current;
    const washEl = heroWash.current;
    const secondEl = secondCopy.current;
    if (!stageEl || !wrapEl || !videoEl || !heroEl || !washEl || !secondEl) return;

    videoEl.muted = true;
    videoEl.defaultMuted = true;
    videoEl.loop = true;
    videoEl.playsInline = true;
    videoEl.autoplay = true;

    let heroVisible = true;
    const keepPlaying = () => {
      if (!heroVisible) return;
      if (videoEl.paused) {
        void videoEl.play().catch(() => undefined);
      }
    };
    keepPlaying();
    videoEl.addEventListener("stalled", keepPlaying);

    const heroIo = new IntersectionObserver(
      ([entry]) => {
        heroVisible = Boolean(entry?.isIntersecting && (entry.intersectionRatio ?? 0) > 0.12);
        if (heroVisible) keepPlaying();
        else videoEl.pause();
      },
      { threshold: [0, 0.12, 0.4] },
    );
    heroIo.observe(wrapEl);

    const counters = secondEl.querySelectorAll<HTMLElement>("[data-pin-count]");
    let counted = false;
    const runCounts = () => {
      if (counted) return;
      counted = true;
      counters.forEach((el) => {
        const to = Number(el.dataset.pinCount || 0);
        const pad = el.dataset.pad ? Number(el.dataset.pad) : 1;
        const obj = { v: 0 };
        gsap.to(obj, {
          v: to,
          duration: 1.5,
          ease: "power2.out",
          onUpdate: () => {
            el.textContent = String(Math.round(obj.v)).padStart(pad, "0");
          },
        });
      });
    };

    const cardVid = heroEl.querySelector("video");

    const ctx = gsap.context(() => {
      function buildTl(endState: {
        top: string;
        left: string;
        width: string;
        height: string;
        borderRadius: number;
      }) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: stageEl,
            start: "top 84px",
            end: "bottom bottom",
            scrub: 0.45,
            invalidateOnRefresh: true,
            onToggle: (self) => {
              if (self.isActive && heroVisible) keepPlaying();
            },
            onUpdate: (self) => {
              if (self.progress > 0.48) runCounts();
              if (!cardVid) return;
              const hideCard = self.progress > 0.16;
              if (hideCard && !cardVid.paused) cardVid.pause();
              if (!hideCard && heroVisible && cardVid.paused) {
                void cardVid.play().catch(() => undefined);
              }
            },
          },
        });

        gsap.set(wrapEl, {
          xPercent: 0,
          yPercent: 0,
          scale: 1,
          clipPath: "none",
          clearProps: "clipPath,transform",
        });

        tl.fromTo(
          wrapEl,
          {
            top: "0%",
            left: "0%",
            width: "100%",
            height: "100%",
            borderRadius: 0,
          },
          {
            top: endState.top,
            left: endState.left,
            width: endState.width,
            height: endState.height,
            borderRadius: endState.borderRadius,
            boxShadow: "0 24px 60px rgba(10, 42, 94, 0.22)",
            ease: "none",
            duration: 0.62,
          },
          0.22,
        )
          .to(heroEl, { opacity: 0, y: -36, ease: "none", duration: 0.28 }, 0.16)
          .to(washEl, { opacity: 0, ease: "none", duration: 0.28 }, 0.16)
          .fromTo(
            secondEl,
            { opacity: 0, y: 28 },
            { opacity: 1, y: 0, ease: "none", duration: 0.3 },
            0.42,
          );
      }

      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px)", () => {
        buildTl({
          top: "12%",
          left: "52%",
          width: "44%",
          height: "76%",
          borderRadius: 22,
        });
      });
      mm.add("(max-width: 1023px)", () => {
        buildTl({
          top: "48%",
          left: "6%",
          width: "88%",
          height: "46%",
          borderRadius: 18,
        });
      });
    }, stageEl);

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("resize", refresh);
    const t = window.setTimeout(refresh, 400);

    return () => {
      window.removeEventListener("resize", refresh);
      videoEl.removeEventListener("stalled", keepPlaying);
      heroIo.disconnect();
      videoEl.pause();
      window.clearTimeout(t);
      ctx.revert();
    };
  }, []);

  return (
    <section ref={stage} className="relative h-[240vh] bg-navy">
      <div className="sticky top-[var(--header-h)] h-[calc(100vh-var(--header-h))] overflow-hidden">
        <div
          ref={wrap}
          className="scroll-video-wrap absolute top-0 left-0 z-[1] h-full w-full overflow-hidden bg-brand"
        >
          <video
            ref={video}
            src="/robot/crawler.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            disablePictureInPicture
            controls={false}
            className="scroll-video-el h-full w-full object-cover object-center"
          />
        </div>

        <div
          ref={heroWash}
          className="pointer-events-none absolute inset-0 z-[2] bg-[linear-gradient(to_top,rgba(7,22,50,0.88)_0%,rgba(7,22,50,0.55)_38%,rgba(7,22,50,0.12)_68%,transparent_100%)] lg:bg-[linear-gradient(90deg,rgba(7,22,50,0.82)_0%,rgba(7,22,50,0.55)_42%,rgba(7,22,50,0.12)_70%,transparent_100%)]"
        />

        <div ref={heroCopy} className="relative z-10 h-full">
          <div className="absolute inset-x-0 bottom-0 flex flex-col gap-8 p-5 sm:p-8 lg:flex-row lg:items-end lg:justify-between lg:p-10">
            <div className="max-w-xl lg:max-w-2xl">
              <SectionHeading
                as="h1"
                invert
                kicker="Western Australia · Kitchen exhaust specialists"
                title="Precision. Technology. Compliance."
                body="Advanced equipment and proven methodology for professional commercial kitchen exhaust cleaning."
              />
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href="/contact" className="gx-cta pointer-events-auto">
                  Request a quote
                  <span aria-hidden>→</span>
                </Link>
                <a
                  href={site.phoneHref}
                  className="pointer-events-auto text-sm font-medium text-white [text-shadow:0_1px_2px_rgba(0,0,0,0.45)]"
                >
                  Emergency: {site.phone}
                </a>
              </div>
            </div>

            <MachinePassCard />
          </div>
        </div>

        <div
          ref={secondCopy}
          className="absolute inset-x-0 top-0 z-10 flex h-[46%] items-end px-5 pb-4 opacity-0 sm:px-8 lg:inset-y-0 lg:left-0 lg:h-full lg:w-[50%] lg:items-center lg:pb-0 lg:pl-10 lg:pr-6"
        >
          <div className="w-full max-w-[36rem] pl-1 sm:pl-2">
            <SectionHeading
              kicker="WA-only robotic technology"
              title="Currently the only robotic kitchen exhaust cleaner in WA."
              body="Most competitors still service exhaust interiors manually. Grade X operates robotic kitchen exhaust cleaning technology — a genuine, verifiable point of differentiation."
            />
            <p className="gx-meta mt-4">
              Emergency response is a genuine Grade X service.{" "}
              <a href={site.phoneHref} className="pointer-events-auto text-ivory hover:text-gold">
                {site.phone}
              </a>
            </p>

            <div className="gx-stat-grid mt-8">
              {stats.map((s) => (
                <div key={s.k} className="gx-stat-cell">
                  <p className="font-mono text-[10px] tracking-[0.18em] text-gold">{s.k}</p>
                  <p
                    data-pin-count={s.n}
                    data-pad={s.pad}
                    className="font-display mt-1 text-[2.35rem] leading-none tracking-tight text-ivory sm:text-[2.75rem]"
                  >
                    {s.n}
                  </p>
                  <p className="gx-meta mt-2">{s.l}</p>
                </div>
              ))}
            </div>

            <Link href="/contact" className="gx-cta pointer-events-auto mt-8">
              Request a quote
              <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
