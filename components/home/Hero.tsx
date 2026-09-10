"use client";

import Link from "next/link";
import { HeroScene } from "@/components/3d/HeroScene";
import { Doubled } from "@/components/ui/StaggerLink";
import { site } from "@/lib/site";

export function Hero() {
  return (
    <section className="hero-pin relative min-h-[100svh] overflow-hidden pt-24">
      <div className="mx-auto grid min-h-[calc(100svh-6rem)] max-w-[1500px] items-center gap-8 px-5 sm:px-10 lg:grid-cols-12">
        <div className="relative z-10 lg:col-span-5">
          <ul className="mb-7 space-y-1 text-[15px] text-ivory">
            <li className="overflow-hidden">
              <span data-clip className="block">
                · Tracked stainless crawler
              </span>
            </li>
            <li className="overflow-hidden">
              <span data-clip className="block">
                · Dual-hose turret jets
              </span>
            </li>
            <li className="overflow-hidden">
              <span data-clip className="block">
                · Zero added guesswork
              </span>
            </li>
          </ul>
          <h1 className="font-display text-[14vw] leading-[0.86] tracking-tight text-ivory sm:text-7xl lg:text-[5.8rem]">
            <span className="block overflow-hidden">
              <span data-clip className="block">
                Precision in
              </span>
            </span>
            <span className="block overflow-hidden">
              <span data-clip className="block">
                every pass.
              </span>
            </span>
          </h1>
          <p className="mt-8 max-w-md text-[15px] leading-7 text-mist">
            Drive a live kitchen exhaust with the Grade X crawler. Packed with
            camera, LED inspection and micron readings — for a clean file every
            time.
          </p>
          <div className="mt-10">
            <Link href="/technology" className="text-[28px] leading-none text-ivory sm:text-[34px]">
              <Doubled text="Discover machine" />
            </Link>
          </div>
          <p className="mt-8 text-sm text-mist">{site.phone} · Perth metro</p>
        </div>
        <div className="hero-robot relative h-[52vh] lg:col-span-7 lg:h-[78vh]">
          <HeroScene mode="hero" />
        </div>
      </div>
    </section>
  );
}
