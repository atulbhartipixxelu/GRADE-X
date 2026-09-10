"use client";

import { HeroScene } from "@/components/3d/HeroScene";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function InspectPlay() {
  return (
    <section className="relative h-[85vh] overflow-hidden bg-brand">
      <HeroScene mode="hero" />
      <div className="pointer-events-none absolute inset-x-0 bottom-10 px-5">
        <SectionHeading
          align="center"
          invert
          kicker="3D visualisation"
          title="Robotic exhaust cleaning inside the duct."
          body="The 3D treatment visualises the robotic exhaust cleaning process — a duct with the platform moving through it — supporting the headline, not replacing it."
        />
      </div>
    </section>
  );
}
