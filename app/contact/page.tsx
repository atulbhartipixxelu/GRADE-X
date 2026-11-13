import { ContactBanner } from "@/components/contact/ContactBanner";
import { ContactDesk } from "@/components/contact/ContactDesk";
import { CtaBanner } from "@/components/home/CtaBanner";
import { InnerMotion } from "@/components/inner/InnerMotion";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(
  "Request a Quote",
  "Tell us about your kitchen site, how many locations and your timing. We'll reply after we review the request. Urgent exhaust help: 0430 360 162.",
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
