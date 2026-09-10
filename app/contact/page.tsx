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
        title="Book a clean for your Perth kitchen."
        body="Service type, site details, contact information. Perth metropolitan / WA. Emergency response is real — use the phone for urgent grease, odour or after-hours failures."
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
          <div className="border border-gold/20 bg-navy-2 p-8">
            <p className="font-mono text-[11px] tracking-[0.24em] text-gold uppercase">
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
