import { categoryMeta, type ServiceCategory } from "@/lib/content";
import { store } from "@/lib/store";
import { InnerMotion } from "@/components/inner/InnerMotion";
import { ServicesBanner } from "@/components/services/ServicesBanner";
import { ServicesDeck } from "@/components/services/ServicesDeck";
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
  const groups = order.map((key) => ({
    key,
    title: categoryMeta[key].title,
    description: categoryMeta[key].description,
    items: services
      .filter((s) => s.category === key)
      .map((s) => ({ slug: s.slug, name: s.name, excerpt: s.excerpt })),
  }));

  return (
    <InnerMotion>
      <ServicesBanner
        groups={groups.map((g) => ({ key: g.key, title: g.title, count: g.items.length }))}
      />
      <ServicesDeck groups={groups} />
    </InnerMotion>
  );
}
