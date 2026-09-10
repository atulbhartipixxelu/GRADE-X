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
        title="A specialist, not a generalist."
        body="Grade X Commercial Solutions Pty Ltd is a Western Australian commercial cleaning company specialising in kitchen exhaust systems and kitchen hygiene, with a broader commercial cleaning offering alongside this core specialty."
        crumbs={[
          { href: "/", label: "Home" },
          { href: "/about", label: "About" },
        ]}
      />
      <section className="mx-auto grid max-w-7xl gap-16 px-5 py-20 sm:px-8 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <h2 className="font-display text-[clamp(1.8rem,3vw,2.4rem)] text-ivory">The robotic technology story</h2>
          <p className="gx-body mt-5">
            Grade X is currently the only company in WA operating robotic kitchen exhaust cleaning technology, a genuine, verifiable point of differentiation in a category most competitors service manually. For clients that means safer access, verifiable results, and less disruption.
          </p>
          <p className="gx-body mt-4">
            This is a technology-forward, precision, and compliance-driven business, not a general cleaning company. Across the site, advanced equipment, robotic technology, digital measurement, and professional expertise are the throughline of the brand.
          </p>
          <p className="gx-body mt-4">
            Who Grade X serves: quick-service restaurant (QSR) franchises and multi-site restaurant groups; commercial kitchens in hotels, clubs, and hospitality venues; facility managers responsible for compliance across multiple sites; and property and shopping centre managers requiring general commercial cleaning alongside kitchen-specific services.
          </p>
        </div>
        <aside className="gx-panel lg:col-span-5">
          <p className="font-sans text-[11px] font-semibold tracking-[0.18em] text-gold uppercase">Company</p>
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
            <Button href="/contact">Request a quote</Button>
          </div>
        </aside>
      </section>
    </>
  );
}
