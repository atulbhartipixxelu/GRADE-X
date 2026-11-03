import { InnerMotion } from "@/components/inner/InnerMotion";
import { PageHero } from "@/components/ui/PageHero";
import { pageMeta } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = pageMeta(
  "Privacy policy",
  "How Grade X Commercial Solutions Pty Ltd collects and uses personal information under the Privacy Act 1988 (Cth) and the Australian Privacy Principles.",
  "/privacy",
);

export default function PrivacyPage() {
  return (
    <InnerMotion>
      <PageHero
        index="12"
        kicker="Legal"
        title="Privacy policy"
        body={`Last updated 3 November 2026. ${site.legalName} explains how we handle personal information submitted through this website.`}
      />
      <article className="gx-inner-wrap max-w-3xl gx-inner-copy space-y-6 text-sm" data-rise>
        <p>
          {site.legalName} (ABN {site.abn}) of {site.address.full} (“we”) collects personal
          information to respond to enquiries and provide commercial cleaning services. We handle
          that information in line with the Privacy Act 1988 (Cth) and the Australian Privacy
          Principles (APPs). This page is written in plain language; a qualified review is still
          recommended before it is treated as final legal advice.
        </p>
        <h2>What we collect</h2>
        <p>
          Through the quote form: name, email, phone, company, suburb, service type, number of
          sites, timing, and any notes you include. You may also email photos of a site. Server logs
          may record IP address and basic device data for security.
        </p>
        <h2>Why we collect it</h2>
        <p>
          To respond to quote requests, schedule work, meet legal and insurance obligations, and
          keep the website secure. We only use your details to respond to your request. We do not
          sell personal information.
        </p>
        <h2>Storage, retention and overseas disclosure</h2>
        <p>
          Submissions are stored in the Grade X administration system and may be emailed to{" "}
          {site.email}. Access is limited to staff who need it to perform the work. We keep enquiry
          records for [retention period] or as long as needed for the job, insurance or law.
          Hosting may use overseas infrastructure. If we disclose information overseas we will take
          reasonable steps required under the APPs.
        </p>
        <h2>Cookies and analytics</h2>
        <p>
          Essential cookies keep the site working. If we add analytics cookies that identify you, we
          will put a consent banner on the site before those cookies run.
        </p>
        <h2>Your rights</h2>
        <p>
          You may request access or correction by emailing {site.email} or writing to the address
          above. You may complain to the Office of the Australian Information Commissioner if you
          are not satisfied with our response.
        </p>
        <h2>Contact</h2>
        <p>
          {site.email} · {site.phone}
        </p>
      </article>
    </InnerMotion>
  );
}
