import { PageHero } from "@/components/ui/PageHero";
import { pageMeta } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = pageMeta(
  "Privacy policy",
  "How Grade X Commercial Solutions Pty Ltd collects and uses personal information submitted through this website, including quote requests.",
  "/privacy",
);

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        kicker="Legal"
        title="Privacy policy"
        body="Template for an Australian small business collecting contact details via a quote form. Grade X should review and adopt before launch."
      />
      <article className="mx-auto max-w-3xl space-y-6 px-5 py-16 text-sm leading-7 text-mist sm:px-8">
        <p>
          {site.legalName} (ABN {site.abn}) of {site.address.full} (“we”) collects personal information to respond to enquiries and provide commercial cleaning services.
        </p>
        <h2 className="font-display text-2xl text-ivory">What we collect</h2>
        <p>
          Through the quote form: name, email, phone, company, suburb, service type, number of sites, timing, and any notes you include. Server logs may record IP address and basic device data for security.
        </p>
        <h2 className="font-display text-2xl text-ivory">Why we collect it</h2>
        <p>
          To respond to quote requests, schedule work, meet legal and insurance obligations, and improve the website. We do not sell personal information.
        </p>
        <h2 className="font-display text-2xl text-ivory">Storage and access</h2>
        <p>
          Submissions are stored in the Grade X administration system and may be emailed to {site.email}. Access is limited to staff who need it to perform the work.
        </p>
        <h2 className="font-display text-2xl text-ivory">Your rights</h2>
        <p>
          You may request access or correction by emailing {site.email} or writing to the address above. You may complain to the Office of the Australian Information Commissioner if you are not satisfied with our response.
        </p>
        <h2 className="font-display text-2xl text-ivory">Contact</h2>
        <p>
          {site.email} · {site.phone}
        </p>
      </article>
    </>
  );
}
