import type { ServiceCategory } from "@/lib/content";

export const categoryImages: Record<ServiceCategory, string> = {
  "kitchen-exhaust": "/services/kitchen-exhaust-hood.jpg",
  "kitchen-equipment": "/services/kitchen-equipment.jpg",
  lobby: "/stock/restaurant-dining-floor.jpg",
  exterior: "/stock/wet-pavement.jpg",
};

export const categoryAlts: Record<ServiceCategory, string> = {
  "kitchen-exhaust":
    "Stainless commercial kitchen exhaust canopy with baffle filters, drop rods and work lights",
  "kitchen-equipment":
    "Technician scrubbing a stainless exhaust hood above a commercial cookline with a rotary brush",
  lobby:
    "Decorative stock photograph: empty restaurant dining room with a polished floor. Not a Grade X job photo.",
  exterior:
    "Decorative stock photograph: wet concrete pavement beside grass. Not a Grade X job photo.",
};
