import { notFound } from "next/navigation";
import { services } from "@/lib/content";
import { store } from "@/lib/store";
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
    <>
      <PageHero
        kicker="Service"
        title={service.name}
        body={service.excerpt}
        crumbs={[
          { href: "/", label: "Home" },
          { href: "/services", label: "Services" },
          { href: `/services/${service.slug}`, label: service.name },
        ]}
      />
      <section className="mx-auto grid max-w-7xl gap-16 px-5 py-20 sm:px-8 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <p className="text-lg leading-8 text-mist">{service.description}</p>
          <ul className="mt-8 space-y-3">
            {service.outcomes.map((o) => (
              <li key={o} className="flex gap-3 text-sm text-ivory">
                <span className="mt-2 h-px w-6 bg-gold" />
                {o}
              </li>
            ))}
          </ul>
        </div>
        <div className="border border-gold/20 bg-navy-2 p-8 lg:col-span-5">
          <h2 className="font-display text-2xl text-ivory">Request this service</h2>
          <p className="mt-2 mb-6 text-sm text-mist">
            Quote path is the same on every page: service, site, contact.
          </p>
          <QuoteForm preset={service.name} />
        </div>
      </section>
    </>
  );
}
