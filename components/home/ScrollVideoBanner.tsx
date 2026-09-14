"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { MachinePassCard } from "@/components/home/MachinePassCard";
import { Button } from "@/components/ui/Button";
import { site } from "@/lib/site";

function bindVideo(el: HTMLVideoElement) {
  el.muted = true;
  el.defaultMuted = true;
  el.loop = true;
  el.playsInline = true;
  el.autoplay = true;
  const play = () => {
    if (el.paused) void el.play().catch(() => undefined);
  };
  play();
  el.addEventListener("stalled", play);
  return () => {
    el.removeEventListener("stalled", play);
    el.pause();
  };
}

export function ScrollVideoBanner() {
  const hero = useRef<HTMLElement>(null);
  const media = useRef<HTMLDivElement>(null);
  const heroVideo = useRef<HTMLVideoElement>(null);

  const { scrollYProgress } = useScroll({
    target: hero,
    offset: ["start start", "end start"],
  });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);
  const rotate = useTransform(scrollYProgress, [0, 1], ["0deg", "-15deg"]);

  useEffect(() => {
    if (!heroVideo.current) return;
    return bindVideo(heroVideo.current);
  }, []);

  useEffect(() => {
    const mediaEl = media.current;
    if (!mediaEl) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const onMove = (event: MouseEvent) => {
      const box = mediaEl.getBoundingClientRect();
      const px = (event.clientX - box.left) / box.width - 0.5;
      const py = (event.clientY - box.top) / box.height - 0.5;
      mediaEl.style.setProperty("--mx", `${18 * px}px`);
      mediaEl.style.setProperty("--my", `${12 * py}px`);
    };
    mediaEl.addEventListener("mousemove", onMove);
    return () => mediaEl.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <>
      <div className="gx-hero-pin" aria-hidden>
        <div className="gx-hero-pin-media">
          <Image
            src="/robot/exploded-bench.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="gx-hero-pin-image"
          />
        </div>
        <div className="gx-hero-pin-veil" />
      </div>

      <div className="gx-hero-flow">
        <section ref={hero} className="gx-hero">
          <motion.div className="gx-hero-scaler" style={{ x, rotate }}>
            <div className="gx-hero-frame">
              <div className="gx-hero-clip">
                <div ref={media} className="gx-hero-media">
                  <video
                    ref={heroVideo}
                    src="/robot/crawler.mp4"
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                    disablePictureInPicture
                    controls={false}
                    className="gx-hero-video"
                  />
                </div>
                <div className="gx-hero-wash" aria-hidden />
              </div>

              <div className="gx-hero-copy">
                <div className="gx-hero-text">
                  <p className="gx-hero-kicker">Western Australia · Kitchen exhaust specialists</p>
                  <h1 className="gx-hero-title">
                    <span>Precision. Technology.</span>
                    <span>Compliance.</span>
                  </h1>
                  <p className="gx-hero-body">
                    Advanced equipment and proven methodology for professional commercial kitchen
                    exhaust cleaning.
                  </p>
                  <div className="gx-hero-actions">
                    <Button href="/contact">Request a quote</Button>
                    <a href={site.phoneHref} className="gx-hero-phone">
                      Emergency: {site.phone}
                    </a>
                  </div>
                </div>

                <div className="gx-hero-aside">
                  <MachinePassCard />
                </div>
              </div>
            </div>
          </motion.div>
        </section>
      </div>
    </>
  );
}
