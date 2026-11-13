import { CtaBanner } from "@/components/home/CtaBanner";
import { InnerMotion } from "@/components/inner/InnerMotion";
import { TermsBanner } from "@/components/legal/TermsBanner";
import { pageMeta } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = pageMeta(
  "Terms of service",
  "Website terms for Grade X Commercial Solutions Pty Ltd, covering governing law in Western Australia, quotes, payment, cancellation and use of this site.",
  "/terms",
);

const sections = [
  {
    t: "Governing law",
    n: "These terms are governed by the laws of Western Australia. Courts of Western Australia have jurisdiction, subject to the Australian Consumer Law.",
  },
  {
    t: "Quotes and contracts",
    n: "A submitted form is an enquiry, not a contract. Prices, scope and attendance windows are confirmed in writing. Emergency attendance may be offered subject to crew availability. We prioritise Perth metro sites. Timing outside the metro is confirmed when you call.",
  },
  {
    t: "Payment",
    n: "Payment terms are as set out on the quotation or job agreement for that site.",
  },
  {
    t: "Cancellation",
    n: "Planned work can be cancelled or moved as set out on the quotation or job agreement. Urgent call-outs already mobilised may be charged for attendance time.",
  },
  {
    t: "Accuracy",
    n: "We take care with service descriptions. Exact plant on a given day may vary.",
  },
  {
    t: "Intellectual property",
    n: "Site design, copy and media are owned by Grade X or its licensors. You may not copy the site for a competing business.",
  },
  {
    t: "Liability",
    n: "To the extent permitted by the Australian Consumer Law, we are not liable for loss arising from reliance on website content alone. Service liability is as set out in the job agreement and our insurance.",
  },
] as const;

export default function TermsPage() {
  return (
    <InnerMotion>
      <div className="gx-hero-stack">
        <TermsBanner />
      </div>

      <section className="gx-legal-page" aria-labelledby="gx-legal-heading">
        <div className="gx-about-story-wrap">
          <header className="gx-about-story-head" data-aos="fade-up">
            <p className="gx-about-story-kicker">Terms</p>
            <h2 id="gx-legal-heading">Using this website</h2>
          </header>

          <p className="gx-legal-lead" data-aos="fade-up">
            By using this website you agree to these terms. The site is provided to describe
            services and collect enquiries for {site.legalName}. A qualified review is still
            recommended before this page is treated as final legal advice.
          </p>

          <ol className="gx-legal-list">
            {sections.map((item, i) => (
              <li key={item.t}>
                <article className="gx-legal-block" data-aos="fade-up">
                  <p className="gx-legal-kicker">
                    <b>{String(i + 1).padStart(2, "0")}</b>
                    <span>Section</span>
                  </p>
                  <h3>{item.t}</h3>
                  <p>{item.n}</p>
                </article>
              </li>
            ))}
          </ol>

          <aside className="gx-legal-aside" data-aos="fade-up">
            <p className="gx-legal-aside-kicker">Contact</p>
            <p>
              {site.address.full}
              {" · "}
              <a href={site.emailHref}>{site.email}</a>
              {" · "}
              <a href={site.phoneHref}>{site.phone}</a>
            </p>
          </aside>
        </div>
      </section>

      <CtaBanner />
    </InnerMotion>
  );
}
