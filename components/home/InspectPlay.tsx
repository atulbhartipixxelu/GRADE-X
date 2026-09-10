"use client";

import { HeroScene } from "@/components/3d/HeroScene";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function InspectPlay() {
  return (
    <section className="relative h-[85vh] overflow-hidden">
      <HeroScene mode="hero" />
      <div className="pointer-events-none absolute inset-x-0 bottom-10 px-5">
        <SectionHeading
          align="center"
          invert
          kicker="Move the turret"
          title="Inspect the crawler in 3D."
          body="Pointer aims the jets. This is the machine — not a fruit game."
        />
      </div>
    </section>
  );
}
