import { CtaBanner } from "@/components/home/CtaBanner";
import { InnerMotion } from "@/components/inner/InnerMotion";
import { PrivacyBanner } from "@/components/legal/PrivacyBanner";
import { pageMeta } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = pageMeta(
  "Privacy policy",
  "How Grade X Commercial Solutions Pty Ltd collects and uses personal information under the Privacy Act 1988 (Cth) and the Australian Privacy Principles.",
  "/privacy",
);

const sections = [
  {
    t: "What we collect",
    n: "Through the quote form: name, email, phone, company, suburb, service type, number of sites, timing, and any notes you include. You may also email photos of a site. Server logs may record IP address and basic device data for security.",
  },
  {
    t: "Why we collect it",
    n: "To respond to quote requests, schedule work, meet legal and insurance obligations, and keep the website secure. We only use your details to respond to your request. We do not sell personal information.",
  },
  {
    t: "Storage, retention and overseas disclosure",
    n: `Submissions are stored in the Grade X administration system and may be emailed to ${site.email}. Access is limited to staff who need it to perform the work. We keep enquiry records as long as needed for the job, insurance or law. Hosting may use overseas infrastructure. If we disclose information overseas we will take reasonable steps required under the APPs.`,
  },
  {
    t: "Cookies and analytics",
    n: "Essential cookies keep the site working. If we add analytics cookies that identify you, we will put a consent banner on the site before those cookies run.",
  },
  {
    t: "Your rights",
    n: `You may request access or correction by emailing ${site.email} or writing to the address above. You may complain to the Office of the Australian Information Commissioner if you are not satisfied with our response.`,
  },
] as const;

export default function PrivacyPage() {
  return (
    <InnerMotion>
      <div className="gx-hero-stack">
        <PrivacyBanner />
      </div>

      <section className="gx-legal-page" aria-labelledby="gx-legal-heading">
        <div className="gx-about-story-wrap">
          <header className="gx-about-story-head" data-aos="fade-up">
            <p className="gx-about-story-kicker">Policy</p>
            <h2 id="gx-legal-heading">How we handle information</h2>
          </header>

          <p className="gx-legal-lead" data-aos="fade-up">
            {site.legalName} (ABN {site.abn}) of {site.address.full} (“we”) collects personal
            information to respond to enquiries and provide commercial cleaning services. We handle
            that information in line with the Privacy Act 1988 (Cth) and the Australian Privacy
            Principles (APPs). This page is written in plain language; a qualified review is still
            recommended before it is treated as final legal advice.
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
