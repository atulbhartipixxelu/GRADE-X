import { AreaBanner } from "@/components/area/AreaBanner";
import { CtaBanner } from "@/components/home/CtaBanner";
import { InnerMotion } from "@/components/inner/InnerMotion";
import { Button } from "@/components/ui/Button";
import { pageMeta } from "@/lib/seo";
import { site } from "@/lib/site";

const MAP_SRC =
  "https://maps.google.com/maps?q=5%20Elward%20Way%2C%20Balga%20WA%206061&hl=en&z=16&output=embed";

const coverage = [
  { tag: "CBD", places: "Perth CBD" },
  { tag: "North", places: "Joondalup, Stirling, Wanneroo, Balga" },
  { tag: "South", places: "Fremantle, Cockburn, Rockingham" },
  { tag: "East", places: "Midland, Belmont, Canning" },
  { tag: "West", places: "Scarborough, Cambridge, Nedlands" },
  { tag: "Wider WA", places: "By arrangement" },
] as const;

export const metadata = pageMeta(
  "Service area — Perth and Western Australia",
  "Grade X Commercial Solutions services the Perth metropolitan area and Western Australia from Balga. Confirm your site before requesting a quote.",
  "/service-area",
);

export default function ServiceAreaPage() {
  return (
    <InnerMotion>
      <div className="gx-hero-stack">
        <AreaBanner />
      </div>

      <section className="gx-area-page" aria-labelledby="gx-area-heading">
        <div className="gx-about-story-wrap">
          <header className="gx-about-story-head" data-aos="fade-up">
            <p className="gx-about-story-kicker">Coverage</p>
            <h2 id="gx-area-heading">Where we work</h2>
          </header>

          <ol className="gx-area-grid">
            {coverage.map((item, i) => (
              <li key={item.tag}>
                <article
                  className="gx-area-card"
                  data-aos="fade-up"
                  data-aos-delay={String((i % 3) * 70)}
                >
                  <p className="gx-area-kicker">
                    <b>{String(i + 1).padStart(2, "0")}</b>
                    <span>{item.tag}</span>
                  </p>
                  <h3>{item.places}</h3>
                </article>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="gx-area-base" aria-labelledby="gx-area-base-heading">
        <div className="gx-about-story-wrap">
          <header className="gx-about-story-head" data-aos="fade-up">
            <p className="gx-about-story-kicker">Base</p>
            <h2 id="gx-area-base-heading">The Balga base</h2>
          </header>

          <div className="gx-area-split">
            <div className="gx-area-facts" data-aos="fade-up">
              <dl>
                <div>
                  <dt>Address</dt>
                  <dd>{site.address.full}</dd>
                </div>
                <div>
                  <dt>Coverage</dt>
                  <dd>{site.serviceArea}</dd>
                </div>
                <div>
                  <dt>Urgent work</dt>
                  <dd>
                    We prioritise Perth metro sites. Outside the metro, we&apos;ll confirm timing
                    when you call.
                  </dd>
                </div>
              </dl>
              <p className="gx-area-note">
                Confirm your suburb and the number of kitchens when you request a quote.
              </p>
              <Button href="/contact">Confirm your site</Button>
            </div>

            <div className="gx-area-map" data-aos="fade-up">
              <iframe
                title="Grade X, Balga WA"
                src={MAP_SRC}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <a
                className="gx-area-pin"
                href="https://maps.google.com/?q=5+Elward+Way,+Balga+WA+6061"
                target="_blank"
                rel="noreferrer"
              >
                <span>Get directions</span>
                <strong>{site.address.full}</strong>
              </a>
            </div>
          </div>
        </div>
      </section>

      <CtaBanner />
    </InnerMotion>
  );
}
