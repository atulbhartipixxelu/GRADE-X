import Image from "next/image";
import Link from "next/link";
import { services } from "@/lib/content";
import { Doubled } from "@/components/ui/StaggerLink";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

const featured = services.filter((s) => s.featured).slice(0, 3);

export function ServicesOverview() {
  return (
    <section className="px-5 py-24 sm:px-10">
      <div className="mx-auto max-w-[1400px]">
        <SectionHeading
          kicker="Work on the book"
          title="Exhaust and kitchen services in Perth."
        />
        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {featured.map((s, i) => (
            <Reveal key={s.slug} delay={i * 0.08}>
              <Link href={`/services/${s.slug}`} className="group block">
                <div className="relative aspect-[3/4] overflow-hidden bg-[#efe8da]">
                  <Image
                    src={i === 0 ? "/robot/front.jpg" : i === 1 ? "/robot/side.jpg" : "/robot/exploded.jpg"}
                    alt={s.name}
                    fill
                    className="object-contain p-6 transition duration-700 group-hover:scale-105"
                    sizes="(min-width: 768px) 30vw, 100vw"
                  />
                </div>
                <p className="mt-4 text-2xl text-ivory">
                  <Doubled text={s.name.split(" ")[0] ?? s.name} />
                </p>
                <p className="mt-2 text-sm text-mist">{s.excerpt}</p>
              </Link>
            </Reveal>
          ))}
        </div>
        <div className="mt-14 text-center">
          <Link href="/services" className="text-3xl text-ivory">
            <Doubled text="All services" />
          </Link>
        </div>
      </div>
    </section>
  );
}
