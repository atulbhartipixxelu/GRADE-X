import Link from "next/link";
import { categoryMeta, type ServiceCategory } from "@/lib/content";
import { store } from "@/lib/store";
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
    <>
      <PageHero
        kicker="Services"
        title="All 21 Grade X services."
        body="Organised into kitchen exhaust & hygiene specialty, kitchen equipment cleaning, lobby & front-of-house, and exterior & general commercial. Each service has its own short description."
        crumbs={[
          { href: "/", label: "Home" },
          { href: "/services", label: "Services" },
        ]}
      />
      <div className="mx-auto max-w-7xl space-y-20 px-5 py-20 sm:px-8">
        {order.map((key) => {
          const meta = categoryMeta[key];
          const items = services.filter((s) => s.category === key);
          return (
            <section key={key} id={key}>
              <p className="font-mono text-[11px] tracking-[0.28em] text-gold uppercase">
                {meta.title}
              </p>
              <p className="mt-3 max-w-2xl text-mist">{meta.description}</p>
              <div className="mt-8 grid gap-4 md:grid-cols-2">
                {items.map((s) => (
                  <Link
                    key={s.slug}
                    href={`/services/${s.slug}`}
                    className="group border border-gold/15 p-6 transition hover:border-gold/50"
                  >
                    <h2 className="font-display text-xl text-ivory group-hover:text-gold">
                      {s.name}
                    </h2>
                    <p className="mt-3 text-sm leading-7 text-mist">{s.excerpt}</p>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </>
  );
}
