import { PageHero } from "@/components/ui/PageHero";
import { Button } from "@/components/ui/Button";
import { pageMeta } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = pageMeta(
  "About Grade X",
  "Grade X Commercial Solutions is a Western Australian specialist in robotic kitchen exhaust cleaning, digital grease measurement and commercial kitchen hygiene — not a general cleaning company.",
  "/about",
);

export default function AboutPage() {
  return (
    <>
      <PageHero
        kicker="About Grade X"
        title="A WA specialist in robotic exhaust cleaning."
        body="Grade X Commercial Solutions Pty Ltd is a Western Australian commercial cleaning company whose core is kitchen exhaust systems and kitchen hygiene — with a broader commercial offering around that specialty."
        crumbs={[
          { href: "/", label: "Home" },
          { href: "/about", label: "About" },
        ]}
      />
      <section className="mx-auto grid max-w-7xl gap-16 px-5 py-20 sm:px-8 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <h2 className="font-display text-3xl text-ivory">The robotic technology story</h2>
          <p className="mt-5 text-mist leading-8">
            Most competitors still service exhaust interiors manually. Grade X operates robotic kitchen exhaust cleaning technology — currently the only company in WA doing so. That is not a slogan. It is why facility managers get live interior video, safer access, and less disruption on live cooklines.
          </p>
          <p className="mt-4 text-mist leading-8">
            The same discipline runs through digital grease-thickness measurement, steam-led interior washing, and a reporting pack designed for QSR compliance teams and hotel facilities files. Precision, technology and compliance are the throughline of the brand, not a single page.
          </p>
          <p className="mt-4 text-mist leading-8">
            Who we speak to: QSR franchises and multi-site restaurant groups, commercial kitchens in hotels, clubs and hospitality venues, facility managers responsible for compliance across sites, and property and shopping-centre managers who need general commercial cleaning beside kitchen-specific work.
          </p>
        </div>
        <aside className="border border-gold/20 bg-navy-2 p-8 lg:col-span-5">
          <p className="font-mono text-[11px] tracking-[0.28em] text-gold uppercase">Company</p>
          <dl className="mt-6 space-y-4 text-sm">
            <div>
              <dt className="text-mist">Legal name</dt>
              <dd className="text-ivory">{site.legalName}</dd>
            </div>
            <div>
              <dt className="text-mist">ABN</dt>
              <dd className="font-mono text-ivory">{site.abn}</dd>
            </div>
            <div>
              <dt className="text-mist">Address</dt>
              <dd className="text-ivory">{site.address.full}</dd>
            </div>
            <div>
              <dt className="text-mist">Leadership</dt>
              <dd className="text-ivory">
                Team and leadership profiles will be published here once supplied by Grade X. The page structure is ready for CMS update without a developer.
              </dd>
            </div>
          </dl>
          <div className="mt-8">
            <Button href="/contact">Work with Grade X</Button>
          </div>
        </aside>
      </section>
    </>
  );
}
