import { CtaBanner } from "@/components/home/CtaBanner";
import { EvidencePreview } from "@/components/home/EvidencePreview";
import { HomeClients } from "@/components/home/HomeClients";
import { HomeMethod } from "@/components/home/HomeMethod";
import { HomeMotion } from "@/components/home/HomeMotion";
import { HomeQuote } from "@/components/home/HomeQuote";
import { ScrollVideoBanner } from "@/components/home/ScrollVideoBanner";
import { ServicesOverview } from "@/components/home/ServicesOverview";
import { TrustStrip } from "@/components/home/TrustStrip";
import { ComplianceBand } from "@/components/trust/ComplianceBand";
import { TrustBar } from "@/components/trust/TrustBar";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(
  "Commercial Kitchen Exhaust Cleaning Perth",
  "Robotic kitchen exhaust cleaning in Perth with digital grease readings, photo evidence and ISO-certified systems. Request a quote.",
  "/",
);

export default function HomePage() {
  return (
    <HomeMotion>
      <div className="gx-hero-stack">
        <ScrollVideoBanner />
      </div>
      <TrustBar />
      <TrustStrip />
      <EvidencePreview />
      <ServicesOverview />
      <HomeClients />
      <HomeMethod />
      <ComplianceBand />
      <CtaBanner />
      <HomeQuote />
    </HomeMotion>
  );
}
