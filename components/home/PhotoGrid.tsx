import Image from "next/image";
import { SectionHeading } from "@/components/ui/SectionHeading";

const shots = [
  { src: "/robot/front.jpg", alt: "Grade X robot front with LED lights and turret" },
  { src: "/robot/side.jpg", alt: "Grade X crawler side with dual hoses" },
  { src: "/robot/exploded.jpg", alt: "Exploded architecture of the Grade X crawler" },
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
          <div key={s.src} className="relative aspect-[4/5] overflow-hidden bg-[#efe8da]">
            <Image src={s.src} alt={s.alt} fill className="object-contain p-4" sizes="33vw" />
          </div>
        ))}
      </div>
    </section>
  );
}
