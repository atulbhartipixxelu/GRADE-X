import { notFound } from "next/navigation";
import { services } from "@/lib/content";
import { store } from "@/lib/store";
import { InnerMotion } from "@/components/inner/InnerMotion";
import { PageHero } from "@/components/ui/PageHero";
import { QuoteForm } from "@/components/forms/QuoteForm";
import { pageMeta } from "@/lib/seo";

export const dynamic = "force-dynamic";
export const dynamicParams = true;

export async function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) return {};
  return pageMeta(service.name, service.excerpt, `/services/${slug}`);
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const all = await store.services();
  const service = all.find((s) => s.slug === slug);
  if (!service) notFound();

  return (
    <InnerMotion>
      <PageHero
        index="03"
        kicker="Service"
        title={service.name}
        body={service.excerpt}
        media="/slides/kitchen-canopy.jpg"
        mediaAlt={service.name}
        crumbs={[
          { href: "/", label: "Home" },
          { href: "/services", label: "Services" },
          { href: `/services/${service.slug}`, label: service.name },
        ]}
      />
      <section className="gx-inner-wrap gx-inner-split">
        <div className="gx-inner-copy" data-rise>
          <p className="text-lg">{service.description}</p>
          <ul className="mt-8 space-y-3">
            {service.outcomes.map((o) => (
              <li key={o} className="flex gap-3 text-sm text-ivory">
                <span className="mt-2 h-px w-6 bg-gold" />
                {o}
              </li>
            ))}
          </ul>
        </div>
        <div className="gx-inner-card" data-rise>
          <h2>Request this service</h2>
          <p>Quote path is the same on every page: service, site, contact.</p>
          <div className="mt-6">
            <QuoteForm preset={service.name} />
          </div>
        </div>
      </section>
    </InnerMotion>
  );
}
