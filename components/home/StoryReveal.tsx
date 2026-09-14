"use client";

import { useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";
import { HeroScene } from "@/components/3d/HeroScene";
import { RevealParticles } from "@/components/home/RevealParticles";
import { VoidParticles } from "@/components/home/VoidParticles";
import { revealDrive } from "@/lib/storyDrive";

const overlayTitle = "Precision.\nTechnology.\nCompliance.";

const steps = [
  {
    title: "The only robotic\nexhaust cleaner in WA.",
    body: "Grade X is currently the only company in Western Australia operating robotic kitchen exhaust cleaning technology.",
  },
  {
    title: "A stainless\ntracked crawler.",
    body: "Chevron drive plates, dual high-pressure hoses, an articulating turret with twin nozzles, LED work lights and a forward inspection camera.",
  },
  {
    title: "Evidence on record,\nnot just the canopy.",
    body: "Objective grease-thickness measurement before and after every clean, live video during the clean, and photographic before/after evidence.",
  },
] as const;

function EyesMark() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 280 124"
      fill="none"
      className="gx-eyes-svg"
      aria-hidden
    >
      <g fill="currentColor">
        <path d="M62 8c27.6 0 50.2 20.2 54.6 46.4.4 2.4-1.5 4.6-3.9 4.6H96.2c-1.9 0-3.6-1.4-3.9-3.3C89.2 36.2 76.6 24.8 62 24.8S34.8 36.2 31.7 55.7c-.3 1.9-2 3.3-3.9 3.3H9.3c-2.4 0-4.3-2.2-3.9-4.6C9.8 28.2 32.4 8 62 8Z" />
        <path d="M62 116c-29.6 0-52.2-20.2-56.6-46.4-.4-2.4 1.5-4.6 3.9-4.6h18.5c1.9 0 3.6 1.4 3.9 3.3C34.8 87.8 47.4 99.2 62 99.2s27.2-11.4 30.3-30.9c.3-1.9 2-3.3 3.9-3.3h16.5c2.4 0 4.3 2.2 3.9 4.6C112.2 95.8 89.6 116 62 116Z" />
        <path d="M218 8c27.6 0 50.2 20.2 54.6 46.4.4 2.4-1.5 4.6-3.9 4.6H252.2c-1.9 0-3.6-1.4-3.9-3.3C245.2 36.2 232.6 24.8 218 24.8s-27.2 11.4-30.3 30.9c-.3 1.9-2 3.3-3.9 3.3h-18.5c-2.4 0-4.3-2.2-3.9-4.6C165.8 28.2 188.4 8 218 8Z" />
        <path d="M218 116c-29.6 0-52.2-20.2-56.6-46.4-.4-2.4 1.5-4.6 3.9-4.6h18.5c1.9 0 3.6 1.4 3.9 3.3 3.1 19.5 15.7 30.9 30.3 30.9s27.2-11.4 30.3-30.9c.3-1.9 2-3.3 3.9-3.3h16.5c2.4 0 4.3 2.2 3.9 4.6C270.2 95.8 247.6 116 218 116Z" />
      </g>
    </svg>
  );
}

function SplitHeadline({
  text,
  active,
  align = "center",
  tone = "light",
}: {
  text: string;
  active: boolean;
  align?: "center" | "left";
  tone?: "light" | "dark";
}) {
  let i = 0;
  const lines = text.split("\n");

  return (
    <h2 className={`gx-reveal-title gx-reveal-title--${align}`}>
      <span className="sr-only">{text.replaceAll("\n", " ")}</span>
      <span aria-hidden>
        {lines.map((line, li) => (
          <span className="gx-reveal-line" key={`${line}-${li}`}>
            {Array.from(line.matchAll(/(\s+|\S+)/g)).map((part) => {
              const value = part[0];
              const start = part.index ?? 0;
              if (/^\s+$/.test(value)) {
                return (
                  <span className="gx-reveal-space" key={`sp-${li}-${start}`}>
                    {value}
                  </span>
                );
              }
              return (
                <span className="gx-reveal-word" key={`w-${li}-${start}-${value}`}>
                  {Array.from(value).map((ch, ci) => {
                    const delay = i++;
                    return (
                      <motion.span
                        key={`c-${li}-${start}-${ci}`}
                        className="gx-reveal-char"
                        initial={{ opacity: 0, color: "#7ec4ff" }}
                        animate={{
                          opacity: active ? 1 : 0,
                          color: active
                            ? ["#7ec4ff", "#7ec4ff", "#eef3fa"]
                            : "#eef3fa",
                        }}
                        transition={{
                          duration: 0.22,
                          delay: active ? delay * 0.012 : 0,
                          ease: "easeOut",
                          color: {
                            duration: 0.22,
                            delay: active ? delay * 0.012 : 0,
                            times: [0, 0.3, 1],
                            ease: "easeOut",
                          },
                        }}
                      >
                        {ch}
                      </motion.span>
                    );
                  })}
                </span>
              );
            })}
          </span>
        ))}
      </span>
    </h2>
  );
}

export function StoryReveal() {
  const pin = useRef<HTMLDivElement>(null);
  const [showOverlay, setShowOverlay] = useState(false);
  const [eyesGone, setEyesGone] = useState(false);
  const [sceneLive, setSceneLive] = useState(false);
  const [stepOn, setStepOn] = useState([false, false, false]);

  const { scrollYProgress: enterProgress } = useScroll({
    target: pin,
    offset: ["start end", "start start"],
  });
  const clipInset = useTransform(enterProgress, [0, 1], [50, 0]);
  const eyesClip = useTransform(clipInset, (v) => `inset(${v}% 0 ${v}% 0)`);

  const { scrollYProgress } = useScroll({
    target: pin,
    offset: ["start start", "end end"],
  });

  const eyesOpacity = useTransform(scrollYProgress, [0, 0.28, 0.38], [1, 0.18, 0]);
  const eyesScale = useTransform(scrollYProgress, [0, 0.36], [1, 2.05]);
  const eyesBlurPx = useTransform(scrollYProgress, [0, 0.36], [0, 14]);
  const eyesFilter = useTransform(eyesBlurPx, (v) => `blur(${v}px)`);
  const overlayFade = useTransform(scrollYProgress, [0.14, 0.22, 0.32, 0.4], [0, 1, 1, 0]);

  const voidFade = useTransform(scrollYProgress, [0.3, 0.42], [1, 0]);
  const sceneOpacity = useTransform(scrollYProgress, [0.36, 0.42], [0, 1]);
  const sceneClip = useTransform(scrollYProgress, [0.36, 0.44], [46, 0]);
  const sceneClipPath = useTransform(sceneClip, (v) => `inset(${v}% ${v}% ${v}% ${v}%)`);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setShowOverlay(v > 0.16 && v < 0.38);
    setEyesGone(v >= 0.4);
    setSceneLive((open) => (open ? v >= 0.32 : v >= 0.44));
    const story = v >= 0.4;
    revealDrive.active = story;
    if (v < 0.4) {
      revealDrive.progress = 0;
      revealDrive.step = 0;
      setStepOn([false, false, false]);
      return;
    }
    const t = Math.min(1, Math.max(0, (v - 0.4) / 0.6));
    revealDrive.progress = t;
    const step = t < 1 / 3 ? 0 : t < 2 / 3 ? 1 : 2;
    revealDrive.step = step;
    setStepOn((prev) => {
      const next = [step === 0, step === 1, step === 2];
      return prev[0] === next[0] && prev[1] === next[1] && prev[2] === next[2] ? prev : next;
    });
  });

  return (
    <section className="gx-reveal">
      <div ref={pin} className="gx-reveal-pin">
        <div className="gx-reveal-sticky">
          {!eyesGone ? (
            <motion.div className="gx-reveal-void" style={{ clipPath: eyesClip, opacity: voidFade }}>
              <VoidParticles />
            </motion.div>
          ) : null}
          <motion.div
            className={`gx-reveal-scene ${sceneLive ? "is-live" : ""}`}
            style={
              sceneLive
                ? undefined
                : { opacity: sceneOpacity, clipPath: sceneClipPath }
            }
          >
            <RevealParticles />
            <div className="gx-reveal-robot-frame" aria-hidden>
              <HeroScene mode="reveal" />
            </div>
            <div className="gx-reveal-steps">
              {steps.map((step, index) => (
                <div
                  key={step.title}
                  className={`gx-reveal-step ${index % 2 === 0 ? "is-end" : "is-start"} ${
                    stepOn[index] ? "is-on" : ""
                  }`}
                >
                  <div className="gx-reveal-step-copy">
                    <SplitHeadline text={step.title} active={stepOn[index]} align="left" />
                    <p className={`gx-reveal-body ${stepOn[index] ? "is-on" : ""}`}>{step.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {!eyesGone ? (
            <>
              <motion.div
                className="gx-reveal-eyes"
                style={{ opacity: eyesOpacity, scale: eyesScale, filter: eyesFilter, clipPath: eyesClip }}
              >
                <EyesMark />
              </motion.div>
              <motion.div className="gx-reveal-overlay" style={{ opacity: overlayFade }}>
                <SplitHeadline text={overlayTitle} active={showOverlay} tone="dark" />
              </motion.div>
            </>
          ) : null}
        </div>
      </div>
    </section>
  );
}
