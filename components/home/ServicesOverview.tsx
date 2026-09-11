"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { categoryMeta, services, type ServiceCategory } from "@/lib/content";
import { Button } from "@/components/ui/Button";
import { Kicker } from "@/components/ui/SectionHeading";

const order: ServiceCategory[] = [
  "kitchen-exhaust",
  "kitchen-equipment",
  "lobby",
  "exterior",
];

const images: Record<ServiceCategory, string> = {
  "kitchen-exhaust": "/slides/kitchen-canopy.jpg",
  "kitchen-equipment": "/slides/duct-spray.jpg",
  lobby: "/slides/exploded-studio.jpg",
  exterior: "/slides/duct-crawler.jpg",
};

export function ServicesOverview() {
  const [active, setActive] = useState(0);
  const current = order[active] ?? order[0];
  const currentMeta = current ? categoryMeta[current] : null;

  return (
    <section className="gx-svc relative overflow-hidden px-5 py-24 sm:px-10 lg:py-32">
      <div className="gx-svc-grid pointer-events-none absolute inset-0" aria-hidden />
      <div className="relative mx-auto max-w-[1500px]">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
          <div className="min-w-0 flex-1">
            <Kicker>Services</Kicker>
            <h2 className="font-display mt-5 text-[clamp(1.7rem,3.15vw,3.05rem)] font-semibold leading-[1.12] text-ivory">
              <span className="block lg:whitespace-nowrap">Kitchen exhaust, equipment,</span>
              <span className="block lg:whitespace-nowrap">lobby and commercial cleaning.</span>
            </h2>
            <p className="gx-body mt-5 max-w-[32rem] text-[1.0625rem] leading-[1.7]">
              All 21 services are listed on the Services page, grouped into the categories below.
            </p>
          </div>
          <Button href="/services" className="shrink-0 self-start lg:mb-1 lg:self-end">
            All services
          </Button>
        </div>

        <div className="mt-14 grid items-stretch gap-8 lg:mt-16 lg:grid-cols-12 lg:gap-10">
          <div className="gx-svc-preview relative min-h-[380px] overflow-hidden rounded-[1.6rem] bg-navy-2 lg:col-span-7 lg:min-h-[620px]">
            {order.map((key, i) => (
              <div
                key={key}
                className={`gx-svc-shot ${i === active ? "is-on" : ""}`}
                aria-hidden={i !== active}
              >
                <Image
                  src={images[key]}
                  alt=""
                  fill
                  priority={i === 0}
                  className="object-cover"
                  sizes="(min-width: 1024px) 58vw, 100vw"
                />
              </div>
            ))}
            <div className="gx-svc-preview-hud pointer-events-none absolute inset-0">
              <span className="gx-svc-tick gx-svc-tick-tl" />
              <span className="gx-svc-tick gx-svc-tick-tr" />
              <span className="gx-svc-tick gx-svc-tick-bl" />
              <span className="gx-svc-tick gx-svc-tick-br" />
              <span className="gx-svc-scan" />
            </div>
            <p className="pointer-events-none absolute top-6 left-6 font-mono text-[11px] tracking-[0.22em] text-white/80 uppercase">
              {String(active + 1).padStart(2, "0")} / 04
            </p>
            {currentMeta ? (
              <p className="pointer-events-none absolute right-6 bottom-6 max-w-[16rem] text-right font-display text-2xl leading-tight text-white sm:text-3xl">
                {currentMeta.title}
              </p>
            ) : null}
          </div>

          <ol className="flex flex-col lg:col-span-5">
            {order.map((key, i) => {
              const meta = categoryMeta[key];
              const count = services.filter((s) => s.category === key).length;
              const on = i === active;
              return (
                <li key={key} className="flex-1">
                  <Link
                    href={`/services#${key}`}
                    className={`gx-svc-row group flex h-full gap-5 border-t border-[var(--line)] pt-8 pb-7 pl-6 transition lg:pt-10 lg:pb-8 lg:pl-7 ${
                      on ? "is-on" : ""
                    }`}
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                  >
                    <span className="font-mono w-8 shrink-0 pt-1 text-[12px] tracking-[0.14em] text-gold">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="flex items-baseline justify-between gap-3">
                        <span className="font-display text-[1.35rem] leading-tight text-ivory sm:text-[1.55rem]">
                          {meta.title}
                        </span>
                        <span className="font-mono shrink-0 text-[11px] tracking-[0.14em] text-mist">
                          {String(count).padStart(2, "0")}
                        </span>
                      </span>
                      <span
                        className={`grid transition-[grid-template-rows,opacity] duration-500 ease-out ${
                          on ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                        }`}
                      >
                        <span className="overflow-hidden">
                          <span className="mt-3 block text-sm leading-6 text-mist">
                            {meta.description}
                          </span>
                        </span>
                      </span>
                    </span>
                  </Link>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
