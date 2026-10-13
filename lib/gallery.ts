export type GalleryImage = {
  src: string;
  alt: string;
  label?: "Before" | "After";
};

export type GalleryItem = {
  id: string;
  title: string;
  kicker: string;
  caption: string;
  serviceHref: string;
  serviceLabel: string;
  images: GalleryImage[];
};

export type GalleryShot = GalleryImage & {
  title: string;
  caption: string;
  serviceHref: string;
};

export const galleryItems: GalleryItem[] = [
  {
    id: "grill-recovery",
    title: "Grill recovery",
    kicker: "Kitchen equipment",
    caption:
      "Carbon and grease recovery on grill surfaces so heat transfer, appearance and food quality come back into spec.",
    serviceHref: "/services/grill-recovery",
    serviceLabel: "Grill Recovery",
    images: [
      {
        src: "/gallery/grill-recovery-1.jpg",
        alt: "Grill recovery before and after — carbon-caked fittings beside recovered stainless",
      },
      {
        src: "/gallery/grill-recovery-2.jpg",
        alt: "Grill recovery before and after — soiled burner pipes beside cleaned stainless",
      },
    ],
  },
  {
    id: "fryer-boil-out",
    title: "Fryer vat boil-outs",
    kicker: "Kitchen equipment",
    caption:
      "Controlled boil-out programmes that remove polymerised oil from vats without damaging equipment.",
    serviceHref: "/services/fryer-vat-boil-outs",
    serviceLabel: "Fryer Vat Boil-Outs",
    images: [
      {
        src: "/gallery/fryer-boil-out.jpg",
        alt: "Commercial fryer vats after a boil-out, with heating elements and stainless partitions visible",
      },
    ],
  },
  {
    id: "shake-machine",
    title: "Shake machine cleaning",
    kicker: "Kitchen equipment",
    caption:
      "Hygienic strip-and-clean for shake and frozen-beverage machines used in QSR environments.",
    serviceHref: "/services/shake-machine-cleaning",
    serviceLabel: "Shake Machine Cleaning",
    images: [
      {
        src: "/gallery/shake-machine.png",
        alt: "QSR shake and frozen-beverage machine on a commercial cookline",
      },
    ],
  },
  {
    id: "cool-room",
    title: "Cool room cleaning",
    kicker: "Kitchen equipment",
    caption:
      "Floors, walls, racking and seals cleaned to a food-storage standard, including condensate and soil traps.",
    serviceHref: "/services/cool-room-cleaning",
    serviceLabel: "Cool Room Cleaning",
    images: [
      {
        src: "/gallery/cool-room.png",
        alt: "Food-storage cool room with stainless racking, sealed floor and refrigeration coil",
      },
    ],
  },
  {
    id: "cookline-hygiene",
    title: "Kitchen equipment hygiene",
    kicker: "Cookline stainless",
    caption:
      "Grease-caked cookline fittings before the clean, and recovered stainless after. Before-and-after photography is supplied with every Grade X job.",
    serviceHref: "/services/kitchen-equipment-hygiene",
    serviceLabel: "Kitchen Equipment Hygiene",
    images: [
      {
        src: "/gallery/cookline-before.jpg",
        alt: "Grease-caked commercial cookline burners and pipes before cleaning",
        label: "Before",
      },
      {
        src: "/gallery/cookline-after.jpg",
        alt: "Polished stainless cookline pipes and flanges after hygiene cleaning",
        label: "After",
      },
    ],
  },
];

export const galleryShots: GalleryShot[] = galleryItems.flatMap((item) =>
  item.images.map((image) => ({
    ...image,
    title: image.label ? `${item.title} — ${image.label}` : item.title,
    caption: item.caption,
    serviceHref: item.serviceHref,
  })),
);
