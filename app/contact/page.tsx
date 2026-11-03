import { ContactBanner } from "@/components/contact/ContactBanner";
import { ContactDesk } from "@/components/contact/ContactDesk";
import { CtaBanner } from "@/components/home/CtaBanner";
import { InnerMotion } from "@/components/inner/InnerMotion";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(
  "Request a Quote",
  "Tell us about your site. We reply within [one business day]. Urgent kitchen exhaust help: 0430 360 162.",
  "/contact",
);

export default function ContactPage() {
  return (
    <InnerMotion>
      <div className="gx-hero-stack">
        <ContactBanner />
      </div>
      <ContactDesk />
      <CtaBanner />
    </InnerMotion>
  );
}
