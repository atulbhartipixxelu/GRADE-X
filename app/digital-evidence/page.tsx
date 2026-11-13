import { CtaBanner } from "@/components/home/CtaBanner";
import { EvidenceBanner } from "@/components/evidence/EvidenceBanner";
import { EvidencePack } from "@/components/evidence/EvidencePack";
import { InnerMotion } from "@/components/inner/InnerMotion";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(
  "Digital evidence and reporting",
  "Every Grade X job includes grease-thickness measurements, photos and a written service report. Live video is on robotic cleans.",
  "/digital-evidence",
);

export default function EvidencePage() {
  return (
    <InnerMotion>
      <div className="gx-hero-stack">
        <EvidenceBanner />
      </div>

      <section className="gx-evd-page" aria-labelledby="gx-evd-heading">
        <div className="gx-about-story-wrap">
          <header className="gx-about-story-head" data-aos="fade-up">
            <p className="gx-about-story-kicker">The pack</p>
            <h2 id="gx-evd-heading">What sits in the report</h2>
          </header>

          <EvidencePack />
        </div>
      </section>

      <CtaBanner />
    </InnerMotion>
  );
}
