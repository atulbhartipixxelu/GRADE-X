"use client";

import Image from "next/image";
import Link from "next/link";
import { useLayoutEffect, useMemo, useRef } from "react";
import type { LucideIcon } from "lucide-react";
import {
  AppWindow,
  Bot,
  Brush,
  Building2,
  ChefHat,
  CookingPot,
  DoorOpen,
  Droplets,
  Fan,
  Flame,
  Layers,
  Moon,
  Puzzle,
  ShieldCheck,
  ShowerHead,
  Snowflake,
  Sparkles,
  Spline,
  UtensilsCrossed,
  Warehouse,
  Wine,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { categoryImages } from "@/lib/categoryMedia";
import { categoryMeta, services, type ServiceCategory } from "@/lib/content";
import { Button } from "@/components/ui/Button";
import { Kicker } from "@/components/ui/SectionHeading";

const serviceIcons: Record<string, LucideIcon> = {
  "kitchen-exhaust-cleaning": Fan,
  "canopy-cleaning": ChefHat,
  "robotic-exhaust-cleaning": Bot,
  "steam-cleaning": Droplets,
  "kitchen-equipment-hygiene": UtensilsCrossed,
  "grill-recovery": Flame,
  "fryer-vat-boil-outs": CookingPot,
  "shake-machine-cleaning": Wine,
  "cool-room-cleaning": Snowflake,
  "nightly-kitchen-maintenance": Moon,
  "monthly-kitchen-deep-cleaning": Sparkles,
  "lobby-cleaning": DoorOpen,
  "monthly-lobby-deep-cleaning": Building2,
  "play-place": Puzzle,
  "floor-detailing-scrubbing": Layers,
  "exterior-high-pressure-washing": ShowerHead,
  "building-drive-thru-pressure-cleaning": Warehouse,
  "window-cleaning": AppWindow,
  "line-marking": Spline,
  "general-commercial-cleaning": Brush,
  "hygiene-sanitation-services": ShieldCheck,
};

gsap.registerPlugin(ScrollTrigger);

const order: ServiceCategory[] = [
  "kitchen-exhaust",
  "kitchen-equipment",
  "lobby",
  "exterior",
];

export function ServicesOverview() {
  const root = useRef<HTMLElement>(null);
  const pin = useRef<HTMLDivElement>(null);

  const groups = useMemo(
    () =>
      order.map((key) => ({
        key,
        ...categoryMeta[key],
        image: categoryImages[key],
        items: services.filter((s) => s.category === key),
      })),
    [],
  );

  useLayoutEffect(() => {
    const section = root.current;
    const stage = pin.current;
    if (!section || !stage) return;

    const slides = [...stage.querySelectorAll<HTMLElement>("[data-reel-slide]")];
    const dots = [...stage.querySelectorAll<HTMLElement>("[data-reel-dot]")];
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduce || slides.length < 2) return;

    const last = slides.length - 1;
    let liveIndex = -1;

    const setLive = (index: number) => {
      if (index === liveIndex) return;
      liveIndex = index;
      slides.forEach((slide, i) => {
        slide.classList.toggle("is-live", i === index);
      });
      dots.forEach((dot, i) => dot.classList.toggle("is-on", i === index));
    };

    const paint = (progress: number) => {
      slides.forEach((slide, i) => {
        if (i === 0) {
          slide.style.transform = "translate3d(0,0,0)";
          return;
        }
        const start = (i - 1) / last;
        const end = i / last;
        const t = gsap.utils.clamp(0, 1, (progress - start) / (end - start));
        slide.style.transform = `translate3d(0, ${(1 - t) * 100}%, 0)`;
      });
      setLive(Math.min(last, Math.round(progress * last)));
    };

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: `+=${last * 100}%`,
      pin: stage,
      pinSpacing: true,
      scrub: 0.2,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      onUpdate: (self) => paint(self.progress),
      onRefresh: (self) => paint(self.progress),
    });

    paint(trigger.progress);

    return () => {
      trigger.kill();
      slides.forEach((slide) => {
        slide.style.transform = "";
        slide.classList.remove("is-live");
      });
    };
  }, []);

  return (
    <section ref={root} className="gx-reel" aria-label="All Grade X services">
      <div ref={pin} className="gx-reel-pin">
        {groups.map((group, i) => (
          <article
            key={group.key}
            className={`gx-reel-slide ${i === 0 ? "is-base" : ""}`}
            style={{ zIndex: i + 1 }}
            data-reel-slide
            aria-label={`${group.title}, ${group.items.length} services`}
          >
            <div className="gx-reel-media">
              <Image
                src={group.image}
                alt=""
                fill
                priority={i === 0}
                className="gx-reel-photo"
                sizes="100vw"
              />
            </div>
            <div className="gx-reel-veil" aria-hidden />

            <div className="gx-reel-top">
              <div className="gx-reel-kicker">
                <Kicker>Services</Kicker>
                <Link href="/services" className="gx-reel-all">
                  All 21
                </Link>
              </div>
              <p className="gx-reel-index">
                <b>{String(i + 1).padStart(2, "0")}</b>
                <span>/ 04</span>
              </p>
            </div>

            <div className="gx-reel-body">
              <p className="gx-reel-count">
                {String(group.items.length).padStart(2, "0")} services in this category
              </p>
              <h2>{group.title}</h2>
              <p className="gx-reel-lead">{group.description}</p>

              <div className="gx-reel-marquee">
                <div className="gx-reel-track">
                  {[0, 1].map((copy) => (
                    <div key={copy} className="gx-reel-set" aria-hidden={copy > 0}>
                      {group.items.map((item) => {
                        const Icon = serviceIcons[item.slug] ?? Sparkles;
                        return (
                          <article key={`${copy}-${item.slug}`} className="gx-reel-chip">
                            <i className="gx-reel-ico" aria-hidden>
                              <Icon strokeWidth={1.75} />
                            </i>
                            <strong>{item.name}</strong>
                            <p>{item.excerpt}</p>
                            <Link href={`/services/${item.slug}`} tabIndex={copy === 0 ? 0 : -1}>
                              View
                            </Link>
                          </article>
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>

              <Button href={`/services#${group.key}`}>View this category</Button>
            </div>
          </article>
        ))}

        <div className="gx-reel-dots" aria-hidden>
          {groups.map((group, i) => (
            <span key={group.key} data-reel-dot className={i === 0 ? "is-on" : ""}>
              {String(i + 1).padStart(2, "0")}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
