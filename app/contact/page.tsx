import { QuoteForm } from "@/components/forms/QuoteForm";
import { InnerMotion } from "@/components/inner/InnerMotion";
import { PageHero } from "@/components/ui/PageHero";
import { pageMeta } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = pageMeta(
  "Request a quote",
  "Request a Grade X quote for robotic kitchen exhaust cleaning and commercial kitchen hygiene in Perth and Western Australia.",
  "/contact",
);

export default function ContactPage() {
  return (
    <InnerMotion>
      <PageHero
        index="08"
        kicker="Request a quote"
        title="Request a quote"
        body="Service type, site details, and contact information. Service area: Perth metropolitan / WA. Emergency response is available — call for urgent issues."
        media="/robot/front.jpg"
        mediaAlt="Grade X robotic platform"
        crumbs={[
          { href: "/", label: "Home" },
          { href: "/contact", label: "Contact" },
        ]}
      />
      <section className="gx-inner-wrap gx-inner-split">
        <div data-rise>
          <QuoteForm />
        </div>
        <aside className="gx-inner-card" data-rise data-tilt>
          <b>Direct</b>
          <h2>
            <a href={site.phoneHref}>{site.phone}</a>
          </h2>
          <p>
            <a href={site.emailHref} className="hover:text-gold">
              {site.email}
            </a>
          </p>
          <p>
            {site.address.full}
            <br />
            ABN {site.abn}
            <br />
            Service area: {site.serviceArea}
          </p>
          <p>{site.emergency}.</p>
        </aside>
      </section>
    </InnerMotion>
  );
}
