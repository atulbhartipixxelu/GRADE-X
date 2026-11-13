export const noteMedia: Record<string, { src: string; alt: string }> = {
  "why-grease-thickness-beats-visual-inspection": {
    src: "/evidence/grease-measurement.jpg",
    alt: "Operator reviewing digital measurement records on a rugged tablet",
  },
  "robotic-exhaust-cleaning-wa": {
    src: "/technology/front-pass.jpg",
    alt: "Crawler front in a duct with dual work lights and a forward inspection camera",
  },
  "exhaust-cleaning-frequency-perth-kitchens": {
    src: "/gallery/cookline-after.jpg",
    alt: "Polished stainless cookline pipes and flanges after hygiene cleaning",
  },
};

export function stamp(iso: string) {
  return new Date(`${iso}T00:00:00`).toLocaleDateString("en-AU", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}
