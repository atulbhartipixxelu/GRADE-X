import { InnerMotion } from "@/components/inner/InnerMotion";
import { MethodBanner } from "@/components/methodology/MethodBanner";
import { MethodSteps } from "@/components/methodology/MethodSteps";
import { CtaBanner } from "@/components/home/CtaBanner";
import { CertifiedStrip } from "@/components/trust/CertifiedStrip";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(
  "Our methodology",
  "Grade X's eight-step kitchen exhaust methodology: inspect, measure, protect, steam-wash, clean, inspect, re-measure, report. Each step has a pass or fail rule.",
  "/methodology",
);

export default function MethodologyPage() {
  return (
    <InnerMotion>
      <div className="gx-hero-stack">
        <MethodBanner />
      </div>
      <CertifiedStrip />
      <MethodSteps />
      <CtaBanner />
    </InnerMotion>
  );
}
