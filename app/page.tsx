import { EvidencePreview } from "@/components/home/EvidencePreview";
import { HomeMotion } from "@/components/home/HomeMotion";
import { InspectPlay } from "@/components/home/InspectPlay";
import { PhotoGrid } from "@/components/home/PhotoGrid";
import { ServicesOverview } from "@/components/home/ServicesOverview";
import { TrustStrip } from "@/components/home/TrustStrip";
import { CtaBanner } from "@/components/home/CtaBanner";
import { ScrollVideoBanner } from "@/components/home/ScrollVideoBanner";
import { Marquee } from "@/components/layout/Marquee";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { pageMeta } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = pageMeta(
  site.tagline,
  "Grade X is Western Australia’s robotic kitchen exhaust cleaning specialist. Stainless tracked crawler, digital grease measurement, interior steam washing, and audit-ready evidence for QSR, hotels and facility managers.",
  "/",
);

export default function HomePage() {
  return (
    <HomeMotion>
      <ScrollVideoBanner />
      <TrustStrip />
      <div className="overflow-hidden py-8">
        <Marquee className="font-display text-[12vw] tracking-tight text-ivory sm:text-8xl">
          <span className="px-8">KEEP CLEANING..</span>
          <span className="px-8">KEEP CLEANING..</span>
          <span className="px-8">KEEP CLEANING..</span>
        </Marquee>
      </div>
      <div className="mx-auto max-w-[1400px] px-5 py-16 sm:px-10 sm:py-20">
        <SectionHeading
          align="center"
          kicker="Why it is different"
          title="Measured from the duct, not the canopy face."
        />
      </div>
      <ServicesOverview />
      <PhotoGrid />
      <EvidencePreview />
      <CtaBanner />
      <InspectPlay />
    </HomeMotion>
  );
}
