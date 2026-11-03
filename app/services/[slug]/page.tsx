import Link from "next/link";
import { notFound } from "next/navigation";
import { categoryImages } from "@/lib/categoryMedia";
import {
  categoryMeta,
  methodology,
  reportContents,
  serviceFaqs,
  services,
} from "@/lib/content";
import { howOftenCopy, replyWindow } from "@/lib/iso";
import { store } from "@/lib/store";
import { InnerMotion } from "@/components/inner/InnerMotion";
import { QuoteForm } from "@/components/forms/QuoteForm";
import { CertifiedStrip } from "@/components/trust/CertifiedStrip";
import { CtaBanner } from "@/components/home/CtaBanner";
import { ServiceBanner } from "@/components/services/ServiceBanner";
import { pageMeta } from "@/lib/seo";

export const dynamic = "force-dynamic";
export const dynamicParams = true;

const suitsByCategory = {
  "kitchen-exhaust": "Restaurant groups, hotels, clubs and shopping centre food courts.",
  "kitchen-equipment": "Cooklines in QSR, hotels and clubs already on a Grade X kitchen programme.",
  lobby: "QSR dining rooms, hotel entries and shopping-centre food courts.",
  exterior:
    "Kitchen clients who also need the building, car park and approach path kept to the same standard.",
} as const;

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
  const service = all.find((s) => s.slug === slug) ?? services.find((s) => s.slug === slug);
  if (!service) notFound();

  const included = service.included?.length ? service.included : service.outcomes;
  const related = (service.related?.length
    ? services.filter((item) => service.related?.includes(item.slug))
    : services.filter((item) => item.category === service.category && item.slug !== service.slug)
  ).slice(0, 3);
  const image = categoryImages[service.category];
  const alt = service.heroAlt || `${service.name} — ${categoryMeta[service.category].title}`;

  return (
    <InnerMotion>
      <div className="gx-hero-stack">
        <ServiceBanner service={service} image={image} alt={alt} />
      </div>

      <CertifiedStrip />

      <section className="gx-svc-detail">
        <div className="gx-svc-detail-wrap">
          <article className="gx-svc-block" id="included">
            <header className="gx-svc-block-head">
              <p className="gx-svc-kicker">Included</p>
              <h2>What&apos;s included</h2>
            </header>
            <p className="gx-svc-lede">{service.description}</p>
            <ul className="gx-svc-inc">
              {included.map((item, index) => (
                <li key={item}>
                  <b>{String(index + 1).padStart(2, "0")}</b>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>

          <article className="gx-svc-block">
            <header className="gx-svc-block-head">
              <p className="gx-svc-kicker">Methodology</p>
              <h2>How we do it</h2>
            </header>
            <p className="gx-svc-lede">
              Kitchen exhaust and cookline work follows the same eight steps. Other services use the
              inspection, protection, clean and report pattern that fits the asset.
            </p>
            <ol className="gx-svc-steps">
              {methodology.map((step) => (
                <li key={step.step}>
                  <b>{step.step}</b>
                  <span>{step.title}</span>
                </li>
              ))}
            </ol>
            <p className="gx-svc-more">
              <Link href="/methodology">Read the eight-step methodology</Link>
            </p>
          </article>

          <article className="gx-svc-block">
            <header className="gx-svc-block-head">
              <p className="gx-svc-kicker">Proof</p>
              <h2>Evidence you get</h2>
            </header>
            <ul className="gx-svc-inc">
              {reportContents.map((item, index) => (
                <li key={item}>
                  <b>{String(index + 1).padStart(2, "0")}</b>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="gx-svc-more">
              On robotic cleans you also get live footage of the inside of the duct.{" "}
              <Link href="/digital-evidence">See the sample report layout</Link>.
            </p>
          </article>

          <div className="gx-svc-pair">
            <article className="gx-svc-block">
              <header className="gx-svc-block-head">
                <p className="gx-svc-kicker">Fit</p>
                <h2>Who it suits</h2>
              </header>
              <p className="gx-svc-lede">{service.suits || suitsByCategory[service.category]}</p>
            </article>
            <article className="gx-svc-block">
              <header className="gx-svc-block-head">
                <p className="gx-svc-kicker">Programme</p>
                <h2>How often</h2>
              </header>
              <p className="gx-svc-lede">{howOftenCopy}</p>
            </article>
          </div>

          <article className="gx-svc-block">
            <header className="gx-svc-block-head">
              <p className="gx-svc-kicker">FAQ</p>
              <h2>Questions</h2>
            </header>
            <ul className="gx-svc-faq">
              {serviceFaqs.map((item) => (
                <li key={item.id}>
                  <h3>{item.question}</h3>
                  <p>{item.answer}</p>
                </li>
              ))}
            </ul>
          </article>

          {related.length ? (
            <article className="gx-svc-block">
              <header className="gx-svc-block-head">
                <p className="gx-svc-kicker">Next</p>
                <h2>Related services</h2>
              </header>
              <ul className="gx-svc-related">
                {related.map((item) => (
                  <li key={item.slug}>
                    <Link href={`/services/${item.slug}`}>
                      <span>{categoryMeta[item.category].title}</span>
                      <strong>{item.name}</strong>
                    </Link>
                  </li>
                ))}
              </ul>
            </article>
          ) : null}

          <div className="gx-home-quote-panel" id="quote">
            <div className="gx-home-quote-copy">
              <div>
                <p className="gx-home-quote-kicker">Quote</p>
                <h2>
                  Request this <em>service.</em>
                </h2>
                <p>
                  The form below is already set to {service.name}. We reply within {replyWindow}.
                </p>
              </div>
            </div>
            <div className="gx-home-quote-card">
              <QuoteForm preset={service.name} />
            </div>
          </div>
        </div>
      </section>

      <CtaBanner />
    </InnerMotion>
  );
}
