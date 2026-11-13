import Image from "next/image";
import { SectionHeading } from "@/components/ui/SectionHeading";

const shots = [
  { src: "/robot/front.jpg", alt: "Crawler robot head-on with LED work lights and turret jets" },
  { src: "/robot/side.jpg", alt: "Crawler robot from the side, showing dual high-pressure hoses" },
  { src: "/robot/exploded.jpg", alt: "Exploded view of the crawler tracks, chassis, motors and turret" },
];

export function PhotoGrid() {
  return (
    <section className="px-5 py-20 sm:px-10">
      <div className="mx-auto mb-10 max-w-[1400px]">
        <SectionHeading
          kicker="From the visit"
          title="Three views of the crawler."
        />
      </div>
      <div className="mx-auto grid max-w-[1400px] gap-4 md:grid-cols-3">
        {shots.map((s) => (
          <div key={s.src} className="relative aspect-[4/5] overflow-hidden bg-navy-2">
            <Image src={s.src} alt={s.alt} fill className="object-contain p-4" sizes="33vw" />
          </div>
        ))}
      </div>
    </section>
  );
}
