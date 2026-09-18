import { ContactDesk } from "@/components/contact/ContactDesk";
import { InnerMotion } from "@/components/inner/InnerMotion";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(
  "Request a quote",
  "Request a Grade X quote for robotic kitchen exhaust cleaning and commercial kitchen hygiene in Perth and Western Australia.",
  "/contact",
);

export default function ContactPage() {
  return (
    <InnerMotion>
      <ContactDesk />
    </InnerMotion>
  );
}
