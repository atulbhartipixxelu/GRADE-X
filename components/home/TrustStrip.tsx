"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CredentialsSlider } from "@/components/home/CredentialsSlider";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";

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
  const photo = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const stageEl = stage.current;
    const copyEl = copy.current;
    const photoEl = photo.current;
    const videoEl = video.current;
    if (!stageEl || !copyEl || !photoEl) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      stageEl.classList.add("is-in");
      return;
    }

    const rows = stageEl.querySelectorAll<HTMLElement>(".gx-depth-row");
    const cta = stageEl.querySelector<HTMLElement>(".gx-depth-cta");

    const ctx = gsap.context(() => {
      gsap.set(copyEl, {
        y: 160,
        rotateX: 26,
        z: -80,
        autoAlpha: 0,
        transformOrigin: "center bottom",
        transformPerspective: 1400,
      });
      gsap.set(photoEl, {
        y: 200,
        rotateX: 26,
        z: -80,
        autoAlpha: 0,
        transformOrigin: "center bottom",
        transformPerspective: 1400,
      });
      gsap.set(rows, { y: 36, autoAlpha: 0 });
      if (cta) gsap.set(cta, { y: 28, autoAlpha: 0 });

      const tl = gsap.timeline({ paused: true, defaults: { ease: "power3.out" } });

      tl.to(copyEl, { y: 0, rotateX: 0, z: 0, autoAlpha: 1, duration: 1.05 }, 0)
        .to(photoEl, { y: 0, rotateX: 0, z: 0, autoAlpha: 1, duration: 1.1 }, 0.1)
        .to(rows, { y: 0, autoAlpha: 1, duration: 0.5, stagger: 0.08 }, 0.38)
        .to(cta, { y: 0, autoAlpha: 1, duration: 0.4 }, 0.72);

      ScrollTrigger.create({
        trigger: stageEl,
        start: "top 78%",
        end: "bottom 16%",
        onEnter: () => tl.restart(),
        onEnterBack: () => tl.restart(),
        onLeave: () => tl.pause(0),
        onLeaveBack: () => tl.pause(0),
      });
    }, stageEl);

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("resize", refresh);
    const t = window.setTimeout(refresh, 400);

    let mediaIo: IntersectionObserver | undefined;
    if (videoEl) {
      videoEl.muted = true;
      videoEl.defaultMuted = true;
      videoEl.loop = true;
      videoEl.playsInline = true;
      const play = () => {
        void videoEl.play().catch(() => undefined);
      };
      mediaIo = new IntersectionObserver(
        ([entry]) => {
          if (entry?.isIntersecting) play();
          else videoEl.pause();
        },
        { threshold: 0.2 },
      );
      mediaIo.observe(videoEl);
    }

    return () => {
      window.removeEventListener("resize", refresh);
      window.clearTimeout(t);
      mediaIo?.disconnect();
      videoEl?.pause();
      ctx.revert();
    };
  }, []);

  return (
    <>
      <section
        ref={stage}
        className="gx-depth gx-depth-stage relative overflow-hidden px-5 py-24 sm:px-10 lg:py-32"
      >
        <div className="gx-depth-panel relative z-10 mx-auto max-w-[1500px]">
          <div className="gx-depth-grid grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
            <div ref={copy} className="gx-depth-copy lg:col-span-5">
              <SectionHeading
                kicker="Core differentiator"
                title="Robotic kitchen exhaust cleaning technology."
                body="Grade X is currently the only company in WA operating robotic kitchen exhaust cleaning technology. Reference photos of the platform are shown here; a dedicated Technology page covers the system in full."
              />
              <ul className="mt-8 space-y-3">
                {specs.map((s) => (
                  <li
                    key={s.n}
                    className="gx-depth-row flex items-baseline gap-4 border-b border-[var(--line)] pb-3"
                  >
                    <span className="font-mono text-[11px] text-gold">{s.n}</span>
                    <span className="text-ivory">{s.t}</span>
                  </li>
                ))}
              </ul>
              <div className="gx-depth-cta mt-8">
                <Button href="/technology">Technology</Button>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div
                ref={photo}
                className="gx-depth-photo relative mx-auto max-w-[640px] overflow-hidden rounded-[28px] bg-navy-2"
              >
                <div className="relative aspect-square bg-white">
                  <video
                    ref={video}
                    src="/robot/platform-spin.mp4"
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    disablePictureInPicture
                    controls={false}
                    className="absolute inset-0 h-full w-full object-cover"
                    aria-label="Grade X robotic kitchen exhaust cleaning platform"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CredentialsSlider />
    </>
  );
}
