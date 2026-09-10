"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { site } from "@/lib/site";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { n: "1", l: "Of a kind in WA", pad: "1", k: "01" },
  { n: "100", l: "Percent interior view", pad: "3", k: "02" },
  { n: "0", l: "Guessed microns", pad: "1", k: "03" },
  { n: "21", l: "Services on file", pad: "2", k: "04" },
];

export function ScrollVideoBanner() {
  const stage = useRef<HTMLElement>(null);
  const wrap = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const heroCopy = useRef<HTMLDivElement>(null);
  const heroWash = useRef<HTMLDivElement>(null);
  const secondCopy = useRef<HTMLDivElement>(null);
  const hud = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stageEl = stage.current;
    const wrapEl = wrap.current;
    const videoEl = video.current;
    const heroEl = heroCopy.current;
    const washEl = heroWash.current;
    const secondEl = secondCopy.current;
    const hudEl = hud.current;
    if (!stageEl || !wrapEl || !videoEl || !heroEl || !washEl || !secondEl || !hudEl) return;

    videoEl.muted = true;
    videoEl.loop = true;
    videoEl.playsInline = true;
    const tryPlay = () => {
      void videoEl.play().catch(() => undefined);
    };
    tryPlay();
    const playRetry = window.setTimeout(tryPlay, 1200);

    let takeover = false;
    const startScrub = () => {
      if (takeover) return;
      takeover = true;
      videoEl.loop = false;
      videoEl.pause();
    };
    window.addEventListener("wheel", startScrub, { passive: true });
    window.addEventListener("touchmove", startScrub, { passive: true });

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

    const ctx = gsap.context(() => {
      const desktop = {
        top: "10%",
        left: "54%",
        width: "42%",
        height: "80%",
        borderRadius: 22,
      };
      const mobile = {
        top: "48%",
        left: "6%",
        width: "88%",
        height: "46%",
        borderRadius: 18,
      };

      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px)", () => {
        buildTl(desktop);
      });
      mm.add("(max-width: 1023px)", () => {
        buildTl(mobile);
      });

      function buildTl(endState: typeof desktop) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: stageEl,
            start: "top 76px",
            end: "bottom bottom",
            scrub: 1.15,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const media = video.current;
              const d = media?.duration;
              if (!media || !d || Number.isNaN(d)) return;
              if (!takeover) return;
              const t = self.progress * d * 0.999;
              if (Math.abs(media.currentTime - t) > 0.03) {
                media.currentTime = t;
              }
              if (self.progress > 0.48) runCounts();
            },
          },
        });

        tl.to(
          wrapEl,
          { ...endState, boxShadow: "0 24px 60px rgba(26,23,18,0.16)", ease: "none", duration: 0.62 },
          0.22,
        )
          .to(heroEl, { opacity: 0, y: -36, ease: "none", duration: 0.28 }, 0.16)
          .to(washEl, { opacity: 0, ease: "none", duration: 0.28 }, 0.16)
          .fromTo(
            secondEl,
            { opacity: 0, y: 28 },
            { opacity: 1, y: 0, ease: "none", duration: 0.3 },
            0.42,
          )
          .fromTo(
            hudEl,
            { opacity: 0 },
            { opacity: 1, ease: "none", duration: 0.22 },
            0.48,
          );
      }
    }, stageEl);

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("resize", refresh);
    const t = window.setTimeout(refresh, 400);

    return () => {
      window.removeEventListener("resize", refresh);
      window.removeEventListener("wheel", startScrub);
      window.removeEventListener("touchmove", startScrub);
      window.clearTimeout(t);
      window.clearTimeout(playRetry);
      ctx.revert();
    };
  }, []);

  return (
    <section ref={stage} className="relative h-[240vh] bg-[#f3eee4]">
      <div className="sticky top-[var(--header-h)] h-[calc(100vh-var(--header-h))] overflow-hidden">
        <div
          ref={wrap}
          className="scroll-video-wrap absolute top-0 left-0 z-[1] h-full w-full overflow-hidden will-change-[top,left,width,height,border-radius]"
        >
          <video
            ref={video}
            src="/robot/crawler.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="h-full w-full object-cover"
          />
          <div
            ref={hud}
            className="pointer-events-none absolute inset-0 opacity-0"
          >
            <span className="absolute top-4 left-4 size-3.5 border-t border-l border-white/80" />
            <span className="absolute top-4 right-4 size-3.5 border-t border-r border-white/80" />
            <span className="absolute bottom-4 left-4 size-3.5 border-b border-l border-white/80" />
            <span className="absolute right-4 bottom-4 size-3.5 border-b border-r border-white/80" />
            <p className="absolute top-4 left-10 flex items-center gap-2 text-[10px] tracking-[0.22em] text-white uppercase">
              <span className="live-dot size-1.5 rounded-full bg-[#9dce8a]" />
              Live interior
            </p>
            <p className="absolute right-10 bottom-4 text-[10px] tracking-[0.22em] text-white/80 uppercase">
              Pass 01 · WA
            </p>
          </div>
        </div>

        <div
          ref={heroWash}
          className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-[55%] bg-gradient-to-t from-black/70 via-black/25 to-transparent"
        />

        <div ref={heroCopy} className="relative z-10 h-full">
          <p className="pointer-events-none absolute top-1/2 right-3 hidden origin-center -translate-y-1/2 rotate-90 text-[11px] tracking-[0.45em] text-white/80 uppercase lg:block">
            Perth
          </p>

          <div className="absolute inset-x-0 bottom-0 flex flex-col gap-8 p-5 sm:p-8 lg:flex-row lg:items-end lg:justify-between lg:p-10">
            <div className="max-w-xl lg:max-w-2xl">
              <SectionHeading
                as="h1"
                invert
                kicker="Robotic exhaust cleaning"
                title="Kitchen exhaust, cleaned from inside the duct."
                body="Grade X is Western Australia’s robotic kitchen exhaust specialist. Crawler, camera and micron gauge on the same visit — a clean file every time."
              />
            </div>

            <div className="w-full max-w-[320px] shrink-0 overflow-hidden bg-white shadow-[0_18px_50px_rgba(0,0,0,0.28)]">
              <div className="relative aspect-[16/10] bg-[#efe8da]">
                <Image
                  src="/robot/front.jpg"
                  alt="Grade X tracked crawler"
                  fill
                  className="object-cover object-center"
                  sizes="320px"
                  priority
                />
              </div>
              <div className="grid grid-cols-2">
                <Link
                  href="/contact"
                  className="bg-[#1a1712] px-3 py-3.5 text-center text-[12px] tracking-[0.08em] text-white sm:text-[13px]"
                >
                  Get a Quote
                </Link>
                <Link
                  href="/technology"
                  className="bg-[#3d5c45] px-3 py-3.5 text-center text-[12px] tracking-[0.08em] text-white sm:text-[13px]"
                >
                  View the crawler
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div
          ref={secondCopy}
          className="absolute inset-x-0 top-0 z-10 flex h-[46%] items-end px-5 pb-4 opacity-0 sm:px-8 lg:inset-y-0 lg:left-0 lg:h-full lg:w-[50%] lg:items-center lg:pb-0 lg:pl-10 lg:pr-6"
        >
          <div className="w-full max-w-[34rem] border-l border-[var(--line)] pl-5 sm:pl-7">
            <SectionHeading
              kicker="What the camera records"
              title="The file is taken from inside the duct."
              body="Grease used to hide in the run. Grade X puts a crawler, a camera and a gauge on the same visit — so the proof is interior, not a canopy wipe."
            />
            <a
              href={site.phoneHref}
              className="pointer-events-auto mt-3 inline-block text-[12px] text-mist hover:text-ivory"
            >
              {site.phone} · Perth metro
            </a>

            <div className="mt-8 grid grid-cols-2 border-t border-[var(--line)]">
              {stats.map((s) => (
                <div
                  key={s.k}
                  className="border-[var(--line)] py-4 pr-4 even:pl-4 odd:border-r [&:nth-child(n+3)]:border-t"
                >
                  <p className="font-mono text-[10px] tracking-[0.18em] text-gold">
                    {s.k}
                  </p>
                  <p
                    data-pin-count={s.n}
                    data-pad={s.pad}
                    className="font-display mt-1 text-4xl leading-none tracking-tight text-ivory sm:text-5xl"
                  >
                    {s.n}
                  </p>
                  <p className="mt-2 text-[12px] leading-snug text-mist">{s.l}</p>
                </div>
              ))}
            </div>

            <Link
              href="/digital-evidence"
              className="pointer-events-auto mt-7 inline-flex text-sm tracking-[0.16em] text-ivory uppercase"
            >
              See the file →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
