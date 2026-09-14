"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CredentialsSlider } from "@/components/home/CredentialsSlider";
import { Kicker } from "@/components/ui/SectionHeading";
import { VoidParticles } from "@/components/home/VoidParticles";

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
      stageEl.style.setProperty("--gx-wash", "1");
      return;
    }

    const rows = stageEl.querySelectorAll<HTMLElement>(".gx-core-spec");
    const cta = stageEl.querySelector<HTMLElement>(".gx-core-link");

    const ctx = gsap.context(() => {
      gsap.set(stageEl, { "--gx-wash": 0 });
      gsap.to(stageEl, {
        "--gx-wash": 1,
        ease: "none",
        scrollTrigger: {
          trigger: stageEl,
          start: "top 82%",
          end: "top 28%",
          scrub: 1.2,
        },
      });
      gsap.set(copyEl, {
        y: 80,
        autoAlpha: 0,
      });
      gsap.set(photoEl, {
        y: 90,
        scale: 0.92,
        autoAlpha: 0,
        transformOrigin: "center center",
      });
      gsap.set(rows, { y: 24, autoAlpha: 0 });
      if (cta) gsap.set(cta, { y: 16, autoAlpha: 0 });

      const tl = gsap.timeline({ paused: true, defaults: { ease: "power3.out" } });

      tl.to(copyEl, { y: 0, autoAlpha: 1, duration: 0.9 }, 0)
        .to(photoEl, { y: 0, scale: 1, autoAlpha: 1, duration: 1 }, 0.08)
        .to(rows, { y: 0, autoAlpha: 1, duration: 0.45, stagger: 0.07 }, 0.32)
        .to(cta, { y: 0, autoAlpha: 1, duration: 0.35 }, 0.55);

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
        className="gx-depth gx-depth-stage gx-core"
        aria-labelledby="gx-core-heading"
      >
        <div className="gx-depth-wash" aria-hidden />
        <div className="gx-depth-glow gx-depth-glow--top" aria-hidden />
        <div className="gx-depth-glow gx-depth-glow--bottom" aria-hidden />
        <VoidParticles overlay className="gx-core-particles" />

        <div className="gx-core-inner">
          <div ref={copy} className="gx-core-copy">
            <Kicker>Core differentiator</Kicker>
            <h2 id="gx-core-heading" className="gx-core-title">
              <span>Robotic kitchen</span>
              <span>exhaust cleaning</span>
              <span>technology.</span>
            </h2>
            <p className="gx-core-body">
              Grade X is currently the only company in WA operating robotic kitchen
              exhaust cleaning technology. Reference photos of the platform are shown
              here; a dedicated Technology page covers the system in full.
            </p>
            <Link href="/technology" className="gx-core-link">
              View technology
            </Link>
          </div>

          <div ref={photo} className="gx-core-bay">
            <div className="gx-core-orbit" aria-hidden />
            <div className="gx-core-orbit gx-core-orbit--slow" aria-hidden />
            <div className="gx-core-plinth">
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
                className="gx-core-video"
                aria-label="Grade X robotic kitchen exhaust cleaning platform"
              />
              <p className="gx-core-stamp">Only in WA</p>
            </div>
            <ol className="gx-core-specs">
              {specs.map((s) => (
                <li key={s.n} className="gx-core-spec">
                  <span>{s.n}</span>
                  <strong>{s.t}</strong>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <CredentialsSlider />
    </>
  );
}
