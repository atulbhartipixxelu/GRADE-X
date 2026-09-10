import { PageHero } from "@/components/ui/PageHero";
import { pageMeta } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = pageMeta(
  "Terms of service",
  "Website terms for Grade X Commercial Solutions Pty Ltd. Service contracts are issued separately for each site.",
  "/terms",
);

export default function TermsPage() {
  return (
    <>
      <PageHero
        kicker="Legal"
        title="Terms of service"
        body="These terms cover use of this website. Cleaning work is governed by the quotation and any site agreement issued by Grade X."
      />
      <article className="mx-auto max-w-3xl space-y-6 px-5 py-16 text-sm leading-7 text-mist sm:px-8">
        <p>
          By using {site.url} you agree to these terms. The site is provided to describe services and collect enquiries for {site.legalName}.
        </p>
        <h2 className="font-display text-2xl text-ivory">Quotes and contracts</h2>
        <p>
          A submitted form is an enquiry, not a contract. Prices, scope and attendance windows are confirmed in writing. Emergency attendance may be offered subject to crew availability.
        </p>
        <h2 className="font-display text-2xl text-ivory">Accuracy</h2>
        <p>
          We take care with service descriptions. Equipment names (including third-party gauges such as the Teinnova Grasmeter) describe classes of technology Grade X uses; exact plant on a given day may vary.
        </p>
        <h2 className="font-display text-2xl text-ivory">Intellectual property</h2>
        <p>
          Site design, copy and 3D scenes are owned by Grade X or its licensors. You may not copy the site for a competing business.
        </p>
        <h2 className="font-display text-2xl text-ivory">Liability</h2>
        <p>
          To the extent permitted by the Australian Consumer Law, we are not liable for loss arising from reliance on website content alone. Service liability is as set out in the job agreement and our insurance.
        </p>
        <h2 className="font-display text-2xl text-ivory">Contact</h2>
        <p>
          {site.address.full} · {site.email} · {site.phone}
        </p>
      </article>
    </>
  );
}
