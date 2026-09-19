import { CtaBanner } from "@/components/home/CtaBanner";
import { EvidencePreview } from "@/components/home/EvidencePreview";
import { HomeMethod } from "@/components/home/HomeMethod";
import { HomeMotion } from "@/components/home/HomeMotion";
import { HomeTrust } from "@/components/home/HomeTrust";
import { ScrollVideoBanner } from "@/components/home/ScrollVideoBanner";
import { ServicesOverview } from "@/components/home/ServicesOverview";
import { TrustStrip } from "@/components/home/TrustStrip";
import { pageMeta } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = pageMeta(
  site.tagline,
  "Grade X is currently the only company in WA operating robotic kitchen exhaust cleaning technology. Commercial kitchen hygiene, digital grease measurement, and documented compliance for QSR, hotels and facility managers.",
  "/",
);

export default function HomePage() {
  return (
    <HomeMotion>
      <div className="gx-hero-stack">
        <ScrollVideoBanner />
      </div>
      <TrustStrip />
      <HomeTrust />
      <ServicesOverview />
      <HomeMethod />
      <EvidencePreview />
      <CtaBanner />
    </HomeMotion>
  );
}
