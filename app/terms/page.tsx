import { InnerMotion } from "@/components/inner/InnerMotion";
import { PageHero } from "@/components/ui/PageHero";
import { pageMeta } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = pageMeta(
  "Terms of service",
  "Website terms for Grade X Commercial Solutions Pty Ltd, including governing law, quotes, payment and cancellation. Service contracts are issued separately for each site.",
  "/terms",
);

export default function TermsPage() {
  return (
    <InnerMotion>
      <PageHero
        index="12"
        kicker="Legal"
        title="Terms of service"
        body="Last updated 3 November 2026. These terms cover use of this website. Cleaning work is governed by the quotation and any site agreement issued by Grade X."
      />
      <article className="gx-inner-wrap max-w-3xl gx-inner-copy space-y-6 text-sm" data-rise>
        <p>
          By using this website you agree to these terms. The site is provided to describe services
          and collect enquiries for {site.legalName}. A qualified review is still recommended before
          this page is treated as final legal advice.
        </p>
        <h2>Governing law</h2>
        <p>
          These terms are governed by the laws of Western Australia. Courts of Western Australia
          have jurisdiction, subject to the Australian Consumer Law.
        </p>
        <h2>Quotes and contracts</h2>
        <p>
          A submitted form is an enquiry, not a contract. Prices, scope and attendance windows are
          confirmed in writing. Emergency attendance may be offered subject to crew availability. We
          prioritise Perth metro sites. Timing outside the metro is confirmed when you call.
        </p>
        <h2>Payment</h2>
        <p>
          Payment terms are as set out on the quotation or job agreement for that site. Unless the
          quote says otherwise, invoices are due [payment terms to be confirmed].
        </p>
        <h2>Cancellation</h2>
        <p>
          Planned work can be cancelled or moved by giving [cancellation notice to be confirmed].
          Urgent call-outs already mobilised may be charged for attendance time. Details sit on the
          job agreement.
        </p>
        <h2>Accuracy</h2>
        <p>
          We take care with service descriptions. Exact plant on a given day may vary. Measuring
          device: [gauge to be confirmed].
        </p>
        <h2>Intellectual property</h2>
        <p>
          Site design, copy and media are owned by Grade X or its licensors. You may not copy the
          site for a competing business.
        </p>
        <h2>Liability</h2>
        <p>
          To the extent permitted by the Australian Consumer Law, we are not liable for loss arising
          from reliance on website content alone. Service liability is as set out in the job
          agreement and our insurance.
        </p>
        <h2>Contact</h2>
        <p>
          {site.address.full} · {site.email} · {site.phone}
        </p>
      </article>
    </InnerMotion>
  );
}
