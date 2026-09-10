import { QuoteForm } from "@/components/forms/QuoteForm";
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
    <>
      <PageHero
        kicker="Request a quote"
        title="Request a quote"
        body="Service type, site details, and contact information. Service area: Perth metropolitan / WA. Emergency response is available — call for urgent issues."
        crumbs={[
          { href: "/", label: "Home" },
          { href: "/contact", label: "Contact" },
        ]}
      />
      <section className="mx-auto grid max-w-7xl gap-16 px-5 py-20 sm:px-8 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <QuoteForm />
        </div>
        <aside className="lg:col-span-5">
          <div className="gx-panel">
            <p className="font-sans text-[11px] font-semibold tracking-[0.18em] text-gold uppercase">
              Direct
            </p>
            <p className="mt-4 font-display text-3xl text-ivory">
              <a href={site.phoneHref}>{site.phone}</a>
            </p>
            <p className="mt-2">
              <a href={site.emailHref} className="text-mist hover:text-gold">
                {site.email}
              </a>
            </p>
            <p className="mt-6 text-sm leading-7 text-mist">
              {site.address.full}
              <br />
              ABN {site.abn}
              <br />
              Service area: {site.serviceArea}
            </p>
          </div>
        </aside>
      </section>
    </>
  );
}
