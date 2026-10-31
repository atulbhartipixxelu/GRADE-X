import type { CSSProperties } from "react";
import { CtaBanner } from "@/components/home/CtaBanner";
import { InnerMotion } from "@/components/inner/InnerMotion";
import { ArchLine } from "@/components/technology/ArchLine";
import { TechBanner } from "@/components/technology/TechBanner";
import { TechBay } from "@/components/technology/TechBay";
import { Button } from "@/components/ui/Button";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(
  "Robotic exhaust cleaning technology",
  "Grade X operates a stainless tracked crawler for kitchen exhaust interiors — dual-hose high-pressure cleaning, twin turret nozzles, LED lighting and a forward inspection camera. Currently the only robotic platform of this kind in WA.",
  "/technology",
);

const passTicks = [
  "Forward camera",
  "Dual work lights",
  "Twin turret jets",
  "Duct floor drive",
  "Live interior feed",
  "Stainless tracks",
];

const facts = [
  { value: "Stainless", label: "Tracked crawler chassis" },
  { value: "Twin turret", label: "Dual-hose high-pressure jets" },
  { value: "Live camera", label: "LED interior confirmation" },
  { value: "Only in WA", label: "This class of robotic platform" },
];

const specs = [
  {
    t: "Stainless tracked crawler",
    b: "Chevron-plate tracks and a sealed stainless chassis so the unit can drive grease-slick duct floors instead of sending a person inside.",
  },
  {
    t: "Twin turret nozzles",
    b: "An articulating head with two forward jets, fed by dual high-pressure hoses and brass quick-connects — the same layout as the machine on this page.",
  },
  {
    t: "Inspection camera + LED",
    b: "Forward camera barrel and dual work lights. Clients can see the interior during the clean, not only a hatch photo after it closes.",
  },
  {
    t: "Exploded service architecture",
    b: "Drive motors, track assemblies, rollers and turret are built to be serviced. The explode animation on this page matches the real platform, not a generic robot.",
  },
];

export default function TechnologyPage() {
  return (
    <InnerMotion>
      <div className="gx-hero-stack">
        <TechBanner />
      </div>

      <section className="gx-about-facts" aria-label="Platform at a glance">
        <div className="gx-about-facts-wrap">
          {facts.map((item, i) => (
            <article key={item.value} data-aos="fade-up" data-aos-delay={String(i * 80)}>
              <span>{String(i + 1).padStart(2, "0")}</span>
              <strong>{item.value}</strong>
              <p>{item.label}</p>
            </article>
          ))}
        </div>
      </section>

      <TechBay />

      <section className="gx-tech-pass" id="live-pass" aria-label="Live interior pass">
        <div className="gx-tech-pass-wrap">
          <header className="gx-tech-pass-head" data-aos="fade-up">
            <div>
              <p className="gx-tech-pass-live">
                <i />
                Live interior pass
              </p>
              <h2>The clean is visible during the work.</h2>
            </div>
            <p>
              The crawler drives the duct floor. Turret jets fire. Camera and LEDs stay on so clients
              see the interior during the clean, not only a hatch photo after it closes.
            </p>
          </header>

          <div className="gx-tech-pass-board">
            <figure className="gx-tech-pass-port">
              <video
                src="/technology/crawler-scrub.mp4"
                muted
                playsInline
                autoPlay
                loop
                preload="metadata"
                disablePictureInPicture
                controls={false}
                aria-label="Forward camera · dual work lights"
              />
              <div className="gx-tech-pass-hud">
                <b>Live</b>
                <span>Forward camera · dual work lights</span>
              </div>
              <div className="gx-tech-pass-veil" aria-hidden />
              <div className="gx-tech-pass-scan" aria-hidden />
              <i className="gx-tech-pass-corner" aria-hidden />
              <i className="gx-tech-pass-corner is-rt" aria-hidden />
              <i className="gx-tech-pass-corner is-lb" aria-hidden />
              <i className="gx-tech-pass-corner is-rb" aria-hidden />
            </figure>

            <ol className="gx-tech-pass-channels">
              {passTicks.map((tick, i) => (
                <li key={tick} style={{ "--i": i } as CSSProperties}>
                  <b>{String(i + 1).padStart(2, "0")}</b>
                  <span>{tick}</span>
                  <i />
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="gx-tech-arch" aria-label="Platform architecture">
        <div className="gx-tech-arch-wrap">
          <header className="gx-tech-arch-head" data-aos="fade-up">
            <p className="gx-tech-arch-kicker">Platform</p>
            <h2>Tracks, turret, hoses — the real architecture.</h2>
            <p>
              The third photograph is an exploded build of this platform. The 3D loop separates the
              same assemblies: track plates, rollers, front camera barrel and the dual-hose turret.
            </p>
          </header>

          <ArchLine items={specs} />

          <div className="gx-tech-arch-cta">
            <Button href="/digital-evidence">Digital evidence system</Button>
            <Button href="/methodology" variant="ghost">
              Eight-step methodology
            </Button>
          </div>
        </div>
      </section>

      <CtaBanner />
    </InnerMotion>
  );
}
