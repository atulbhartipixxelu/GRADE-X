import Image from "next/image";
import Link from "next/link";
import { categoryMeta, type ServiceCategory } from "@/lib/content";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";

const order: ServiceCategory[] = [
  "kitchen-exhaust",
  "kitchen-equipment",
  "lobby",
  "exterior",
];

const images: Record<ServiceCategory, string> = {
  "kitchen-exhaust": "/robot/front.jpg",
  "kitchen-equipment": "/robot/side.jpg",
  lobby: "/robot/exploded.jpg",
  exterior: "/robot/front.jpg",
};

export function ServicesOverview() {
  return (
    <section className="px-5 py-24 sm:px-10">
      <div className="mx-auto max-w-[1400px]">
        <SectionHeading
          kicker="Services"
          title="Kitchen exhaust, equipment, lobby and commercial cleaning."
          body="All 21 services are listed on the Services page, grouped into the categories below."
        />
        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {order.map((key, i) => {
            const meta = categoryMeta[key];
            return (
              <Reveal key={key} delay={i * 0.08}>
                <Link href="/services" className="group block">
                  <div className="relative aspect-[4/5] overflow-hidden bg-navy-2">
                    <Image
                      src={images[key]}
                      alt={meta.title}
                      fill
                      className="object-contain p-6 transition duration-700 group-hover:scale-105"
                      sizes="(min-width: 1024px) 22vw, 50vw"
                    />
                  </div>
                  <p className="mt-4 text-xl text-ivory">{meta.title}</p>
                  <p className="mt-2 text-sm text-mist">{meta.description}</p>
                </Link>
              </Reveal>
            );
          })}
        </div>
        <div className="mt-14">
          <Button href="/services">All services</Button>
        </div>
      </div>
    </section>
  );
}
