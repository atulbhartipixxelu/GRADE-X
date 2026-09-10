import Link from "next/link";
import { caseStudies, testimonials } from "@/lib/content";
import { PageHero } from "@/components/ui/PageHero";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(
  "Case studies and client feedback",
  "Space for real Grade X client work and testimonials. Structure is ready for Grade X to populate via the CMS.",
  "/case-studies",
);

export default function CaseStudiesPage() {
  const hasStudies = caseStudies.length > 0;
  const hasQuotes = testimonials.length > 0;

  return (
    <>
      <PageHero
        kicker="Case Studies & Client Feedback"
        title="Real client work, added over time."
        body="Even if limited content is available at launch, this page exists and is easy for Grade X to populate later via the CMS. Testimonials display here once supplied."
        crumbs={[
          { href: "/", label: "Home" },
          { href: "/case-studies", label: "Case studies" },
        ]}
      />
      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
        {hasStudies ? (
          <div className="grid gap-8 lg:grid-cols-2">
            {caseStudies.map((c) => (
              <article key={c.slug} className="border border-gold/15 p-8">
                <p className="font-mono text-[11px] tracking-[0.22em] text-gold uppercase">
                  {c.sector} · {c.location}
                </p>
                <h2 className="mt-3 font-display text-2xl text-ivory">{c.title}</h2>
                <p className="mt-4 text-sm leading-7 text-mist">{c.summary}</p>
                <p className="mt-4 text-sm leading-7 text-ivory/80">
                  <span className="text-gold">Challenge. </span>
                  {c.challenge}
                </p>
                <p className="mt-3 text-sm leading-7 text-ivory/80">
                  <span className="text-gold">Approach. </span>
                  {c.approach}
                </p>
                <p className="mt-3 text-sm leading-7 text-ivory/80">
                  <span className="text-gold">Result. </span>
                  {c.result}
                </p>
              </article>
            ))}
          </div>
        ) : (
          <p className="max-w-2xl text-mist">
            Case studies will be published here once supplied by Grade X. No client work has been added yet so that this site does not invent examples.
          </p>
        )}
        <h2 className="mt-20 font-display text-3xl text-ivory">Client feedback</h2>
        {hasQuotes ? (
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {testimonials.map((t) => (
              <blockquote key={t.id} className="border border-gold/15 bg-navy-2 p-8">
                <p className="text-lg leading-8 text-ivory">“{t.quote}”</p>
                <footer className="mt-6 text-sm text-mist">
                  {t.name}, {t.role} · {t.organisation}
                </footer>
              </blockquote>
            ))}
          </div>
        ) : (
          <p className="mt-6 max-w-2xl text-mist">
            Testimonials will display here as soon as Grade X supplies them.
          </p>
        )}
        <p className="mt-10 text-sm text-mist">
          <Link href="/contact" className="text-gold">
            Request a quote
          </Link>
        </p>
      </section>
    </>
  );
}
