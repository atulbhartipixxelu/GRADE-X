import { EvidencePreview } from "@/components/home/EvidencePreview";
import { HomeMotion } from "@/components/home/HomeMotion";
import { InspectPlay } from "@/components/home/InspectPlay";
import { ServicesOverview } from "@/components/home/ServicesOverview";
import { TrustStrip } from "@/components/home/TrustStrip";
import { CtaBanner } from "@/components/home/CtaBanner";
import { ScrollVideoBanner } from "@/components/home/ScrollVideoBanner";
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
      <ScrollVideoBanner />
      <TrustStrip />
      <ServicesOverview />
      <EvidencePreview />
      <CtaBanner />
      <InspectPlay />
    </HomeMotion>
  );
}
