import { Button } from "@/components/ui/Button";
import { caseStudies, testimonials } from "@/lib/content";
import { InnerMotion } from "@/components/inner/InnerMotion";
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
    <InnerMotion>
      <PageHero
        index="10"
        kicker="Case Studies & Client Feedback"
        title="Real client work, added over time."
        body="Even if limited content is available at launch, this page exists and is easy for Grade X to populate later via the CMS. Testimonials display here once supplied."
        media="/robot/exploded.jpg"
        mediaAlt="Grade X platform service architecture"
        crumbs={[
          { href: "/", label: "Home" },
          { href: "/case-studies", label: "Case studies" },
        ]}
      />
      <section className="gx-inner-wrap">
        {hasStudies ? (
          <div className="gx-inner-grid gx-inner-grid-2">
            {caseStudies.map((c) => (
              <article key={c.slug} className="gx-inner-card" data-rise data-tilt>
                <b>
                  {c.sector} · {c.location}
                </b>
                <h2>{c.title}</h2>
                <p>{c.summary}</p>
                <p>
                  <span className="text-gold">Challenge. </span>
                  {c.challenge}
                </p>
                <p>
                  <span className="text-gold">Approach. </span>
                  {c.approach}
                </p>
                <p>
                  <span className="text-gold">Result. </span>
                  {c.result}
                </p>
              </article>
            ))}
          </div>
        ) : (
          <p className="max-w-2xl text-mist" data-rise>
            Case studies will be published here once supplied by Grade X. No client work has been
            added yet so that this site does not invent examples.
          </p>
        )}
        <h2 className="mt-16 text-3xl text-ivory" data-rise>
          Client feedback
        </h2>
        {hasQuotes ? (
          <div className="mt-8 gx-inner-grid gx-inner-grid-2">
            {testimonials.map((t) => (
              <blockquote key={t.id} className="gx-inner-card" data-rise data-tilt>
                <p className="text-lg leading-8 text-ivory">“{t.quote}”</p>
                <footer className="mt-6 text-sm text-mist">
                  {t.name}, {t.role} · {t.organisation}
                </footer>
              </blockquote>
            ))}
          </div>
        ) : (
          <p className="mt-6 max-w-2xl text-mist" data-rise>
            Testimonials will display here as soon as Grade X supplies them.
          </p>
        )}
        <div className="gx-inner-cta" data-rise>
          <Button href="/contact">Request a quote</Button>
        </div>
      </section>
    </InnerMotion>
  );
}
