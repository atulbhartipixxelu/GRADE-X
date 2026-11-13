import { categoryAlts, categoryImages } from "@/lib/categoryMedia";
import type { Service } from "@/lib/content";

export const serviceMedia: Record<string, { src: string; alt: string }> = {
  "kitchen-exhaust-cleaning": {
    src: "/services/kitchen-exhaust-hood.jpg",
    alt: "Stainless commercial kitchen exhaust canopy with baffle filters, drop rods and work lights",
  },
  "canopy-cleaning": {
    src: "/services/kitchen-equipment.jpg",
    alt: "Technician scrubbing a stainless exhaust canopy above a commercial cookline with a rotary brush",
  },
  "robotic-exhaust-cleaning": {
    src: "/slides/duct-crawler.jpg",
    alt: "Tracked stainless crawler washing grease from the inside of a commercial exhaust duct",
  },
  "steam-cleaning": {
    src: "/services/steam-cleaning.jpg",
    alt: "Steam and extraction cleaning a stainless commercial kitchen canopy",
  },
  "kitchen-equipment-hygiene": {
    src: "/gallery/cookline-after.jpg",
    alt: "Polished stainless cookline pipes and flanges after hygiene cleaning",
  },
  "grill-recovery": {
    src: "/gallery/grill-recovery-1.jpg",
    alt: "Grill recovery before and after — carbon-caked fittings beside recovered stainless",
  },
  "fryer-vat-boil-outs": {
    src: "/gallery/fryer-boil-out.jpg",
    alt: "Commercial fryer vats after a boil-out, with heating elements and stainless partitions visible",
  },
  "shake-machine-cleaning": {
    src: "/gallery/shake-machine.png",
    alt: "QSR shake and frozen-beverage machine on a commercial cookline",
  },
  "cool-room-cleaning": {
    src: "/gallery/cool-room.png",
    alt: "Food-storage cool room with stainless racking, sealed floor and refrigeration coil",
  },
  "nightly-kitchen-maintenance": {
    src: "/stock/commercial-kitchen-stainless.jpg",
    alt: "Decorative stock photograph: stainless commercial kitchen with pots and hanging strainers. Not a Grade X job photo.",
  },
  "monthly-kitchen-deep-cleaning": {
    src: "/stock/commercial-kitchen-stainless.jpg",
    alt: "Decorative stock photograph: stainless commercial kitchen cookline. Not a Grade X job photo.",
  },
  "lobby-cleaning": {
    src: "/stock/restaurant-dining-floor.jpg",
    alt: "Decorative stock photograph: empty restaurant dining room with a polished floor. Not a Grade X job photo.",
  },
  "monthly-lobby-deep-cleaning": {
    src: "/stock/tiled-floor.jpg",
    alt: "Decorative stock photograph: empty room with a tiled floor. Not a Grade X job photo.",
  },
  "play-place": {
    src: "/services/play-place.jpg",
    alt: "Indoor plastic play structure in a dining room, cleaned as a defined hygiene service",
  },
  "floor-detailing-scrubbing": {
    src: "/stock/tiled-floor.jpg",
    alt: "Decorative stock photograph: empty tiled floor ready for scrubbing. Not a Grade X job photo.",
  },
  "exterior-high-pressure-washing": {
    src: "/stock/wet-pavement.jpg",
    alt: "Decorative stock photograph: wet concrete pavement beside grass. Not a Grade X job photo.",
  },
  "building-drive-thru-pressure-cleaning": {
    src: "/stock/glass-building-alt.jpg",
    alt: "Decorative stock photograph: glass commercial building exterior. Not a Grade X job photo.",
  },
  "window-cleaning": {
    src: "/stock/glass-building-windows.jpg",
    alt: "Decorative stock photograph: commercial glass facade. Not a Grade X job photo.",
  },
  "line-marking": {
    src: "/stock/parking-lines.jpg",
    alt: "Decorative stock photograph: white parking-bay lines on asphalt. Not a Grade X job photo.",
  },
  "general-commercial-cleaning": {
    src: "/stock/office-corridor.jpg",
    alt: "Decorative stock photograph: empty commercial corridor. Not a Grade X job photo.",
  },
  "hygiene-sanitation-services": {
    src: "/services/hygiene-sanitation-services.jpg",
    alt: "Technician sanitising a commercial washroom basin, tap and door handle",
  },
};

export function mediaForService(service: Service) {
  return (
    serviceMedia[service.slug] ?? {
      src: categoryImages[service.category],
      alt: service.heroAlt || categoryAlts[service.category],
    }
  );
}
