import Link from "next/link";
import { categoryMeta, type ServiceCategory } from "@/lib/content";
import { store } from "@/lib/store";
import { InnerMotion } from "@/components/inner/InnerMotion";
import { PageHero } from "@/components/ui/PageHero";
import { pageMeta } from "@/lib/seo";

export const dynamic = "force-dynamic";

export const metadata = pageMeta(
  "Commercial kitchen and property services",
  "21 Grade X services grouped for facility managers: kitchen exhaust, equipment hygiene, lobby, and exterior commercial cleaning across Perth and WA.",
  "/services",
);

const order: ServiceCategory[] = [
  "kitchen-exhaust",
  "kitchen-equipment",
  "lobby",
  "exterior",
];

export default async function ServicesPage() {
  const services = await store.services();
  return (
    <InnerMotion>
      <PageHero
        index="03"
        kicker="Services"
        title="All 21 Grade X services."
        body="Organised into kitchen exhaust & hygiene specialty, kitchen equipment cleaning, lobby & front-of-house, and exterior & general commercial. Each service has its own short description."
        media="/slides/kitchen-hood.jpg"
        mediaAlt="Commercial kitchen canopy"
        crumbs={[
          { href: "/", label: "Home" },
          { href: "/services", label: "Services" },
        ]}
      />
      <div className="gx-inner-wrap space-y-16">
        {order.map((key) => {
          const meta = categoryMeta[key];
          const items = services.filter((s) => s.category === key);
          return (
            <section key={key} id={key}>
              <div className="gx-inner-copy mb-8" data-rise>
                <b className="mb-3 block font-mono text-[11px] tracking-[0.22em] text-gold-2 uppercase">
                  {meta.title}
                </b>
                <p>{meta.description}</p>
              </div>
              <div className="gx-inner-grid gx-inner-grid-2">
                {items.map((s) => (
                  <Link
                    key={s.slug}
                    href={`/services/${s.slug}`}
                    className="gx-inner-card"
                    data-rise
                    data-tilt
                  >
                    <h2>{s.name}</h2>
                    <p>{s.excerpt}</p>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </InnerMotion>
  );
}
