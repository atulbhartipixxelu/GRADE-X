"use client";

import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/Button";
import { InnerParticles } from "@/components/inner/InnerParticles";
import { site } from "@/lib/site";

const slides = [
  {
    n: "01",
    label: "Only in WA",
    video: "/robot/crawler.mp4",
    alt: "Grade X crawler driving through an exhaust run",
    text: "Grade X is currently the only company in WA operating robotic kitchen exhaust cleaning technology, a genuine, verifiable point of differentiation in a category most competitors service manually. For clients that means safer access, verifiable results, and less disruption.",
  },
  {
    n: "02",
    label: "Not a generalist",
    video: "/robot/platform.mp4",
    alt: "Grade X robotic platform in operation",
    text: "This is a technology-forward, precision, and compliance-driven business, not a general cleaning company. Across the site, advanced equipment, robotic technology, digital measurement, and professional expertise are the throughline of the brand.",
  },
  {
    n: "03",
    label: "Who Grade X serves",
    video: "/about/who-serves.mp4",
    alt: "Grade X robotic exhaust cleaning in service",
    text: "Who Grade X serves: quick-service restaurant (QSR) franchises and multi-site restaurant groups; commercial kitchens in hotels, clubs, and hospitality venues; facility managers responsible for compliance across multiple sites; and property and shopping centre managers requiring general commercial cleaning alongside kitchen-specific services.",
  },
] as const;

function splitCopy(text: string) {
  const period = text.indexOf(". ");
  if (period >= 0) return { lead: text.slice(0, period + 1), rest: text.slice(period + 2) };
  const semi = text.indexOf("; ");
  if (semi >= 0) return { lead: text.slice(0, semi + 1), rest: text.slice(semi + 2) };
  return { lead: text, rest: "" };
}

export function AboutStory() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = root.current;
    if (!section) return;
    const scroller = section.querySelector<HTMLElement>("[data-scroller]");
    const stage = section.querySelector<HTMLElement>("[data-stage]");
    if (!scroller || !stage) return;

    const cards = [...stage.querySelectorAll<HTMLElement>("[data-slide]")];
    const ticks = [...stage.querySelectorAll<HTMLElement>("[data-tick]")];
    const videos = cards.map((card) => card.querySelector("video"));
    let current = -1;
    let shown = 0;
    let target = 0;
    let raf = 0;

    const playSlide = (index: number) => {
      videos.forEach((el, i) => {
        if (!el) return;
        el.muted = true;
        el.playsInline = true;
        if (i === index) {
          el.loop = true;
          void el.play().catch(() => undefined);
        } else {
          el.pause();
        }
      });
    };

    const mark = (index: number) => {
      if (index === current) return;
      current = index;
      cards.forEach((card, i) => card.classList.toggle("is-on", i === index));
      ticks.forEach((tick, i) => tick.classList.toggle("is-on", i === index));
      playSlide(index);
    };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      videos.forEach((el) => {
        if (!el) return;
        el.muted = true;
        el.loop = true;
        void el.play().catch(() => undefined);
      });
      return;
    }

    const readTarget = () => {
      const max = Math.max(1, scroller.offsetHeight - stage.offsetHeight);
      const p = Math.min(1, Math.max(0, -scroller.getBoundingClientRect().top / max));
      target = p * (cards.length - 1);
    };

    const tick = () => {
      raf = requestAnimationFrame(tick);
      readTarget();
      shown += (target - shown) * 0.16;
      if (Math.abs(target - shown) < 0.0008) shown = target;
      stage.style.setProperty("--slide", shown.toFixed(4));
      mark(Math.min(cards.length - 1, Math.round(shown)));
    };

    mark(0);
    readTarget();
    shown = target;
    stage.style.setProperty("--slide", String(shown));
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      videos.forEach((el) => el?.pause());
    };
  }, []);

  return (
    <section ref={root} className="gx-about-deck" aria-label="The robotic technology story">
      <div className="gx-about-deck-scroll" data-scroller>
        <div className="gx-about-deck-stage" data-stage>
          <InnerParticles className="gx-about-deck-particles" />

          <header className="gx-about-deck-head">
            <p>About Grade X</p>
            <h2>
              <span>
                <b>The robotic</b>
              </span>
              <span>
                <b>technology story</b>
              </span>
            </h2>
          </header>

          <div className="gx-about-deck-viewport">
            <div className="gx-about-deck-track">
              {slides.map((item, i) => {
                const copy = splitCopy(item.text);
                return (
                  <article
                    key={item.n}
                    className={`gx-about-deck-slide${i === 0 ? " is-on" : ""}`}
                    data-slide
                  >
                    <div className="gx-about-deck-box">
                      <figure>
                        <video
                          src={item.video}
                          muted
                          playsInline
                          loop
                          preload="auto"
                          disablePictureInPicture
                          controls={false}
                          aria-label={item.alt}
                        />
                      </figure>
                      <div className="gx-about-deck-copy">
                        <p className="gx-about-deck-kicker">
                          {item.n} <span>{item.label}</span>
                        </p>
                        <h3>{copy.lead}</h3>
                        {copy.rest ? <p className="gx-about-deck-body">{copy.rest}</p> : null}
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>

          <div className="gx-about-deck-ticks" aria-hidden>
            {slides.map((item, i) => (
              <span key={item.n} data-tick className={i === 0 ? "is-on" : ""}>
                {item.n}
              </span>
            ))}
          </div>
        </div>
      </div>

      <aside className="gx-about-deck-firm" aria-label="Company registration">
        <div className="gx-about-deck-firm-glow" aria-hidden />

        <div className="gx-about-deck-firm-row">
          <div>
            <b>Company</b>
            <h3>{site.legalName}</h3>
            <p>{site.tagline}</p>
          </div>

          <p className="gx-about-deck-firm-note">
            Team and leadership profiles will be published here once supplied by Grade X.
          </p>

          <Button href="/contact">Request a quote</Button>
        </div>

        <ul className="gx-about-deck-firm-rail">
          <li>
            <span>ABN</span>
            {site.abn}
          </li>
          <li>
            <span>Base</span>
            {site.address.full}
          </li>
        </ul>
      </aside>
    </section>
  );
}
