import type { CSSProperties } from "react";
import { HeroScene } from "@/components/3d/HeroScene";
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
      <TechBanner />

      <TechBay />

      <section className="gx-tech-pass" aria-label="Live interior pass">
        <div className="gx-tech-pass-shell">
          <aside className="gx-tech-pass-rail">
            <p className="gx-tech-pass-live">
              <i />
              Live interior pass
            </p>
            <h2>The clean is visible during the work.</h2>
            <p>
              The crawler drives the duct floor. Turret jets fire. Camera and LEDs stay on so clients
              see the interior during the clean, not only a hatch photo after it closes.
            </p>
            <ol className="gx-tech-pass-channels">
              {passTicks.map((tick, i) => (
                <li key={tick} style={{ "--i": i } as CSSProperties}>
                  <b>{String(i + 1).padStart(2, "0")}</b>
                  <span>{tick}</span>
                  <i />
                </li>
              ))}
            </ol>
          </aside>

          <figure className="gx-tech-pass-port">
            <div className="gx-tech-pass-hud">
              <b>Live</b>
              <span>Forward camera · dual work lights</span>
            </div>
            <HeroScene mode="tech" />
            <div className="gx-tech-pass-veil" aria-hidden />
            <div className="gx-tech-pass-grid" aria-hidden />
            <div className="gx-tech-pass-cross" aria-hidden />
            <div className="gx-tech-pass-scan" aria-hidden />
            <i className="gx-tech-pass-corner" aria-hidden />
            <i className="gx-tech-pass-corner is-rt" aria-hidden />
            <i className="gx-tech-pass-corner is-lb" aria-hidden />
            <i className="gx-tech-pass-corner is-rb" aria-hidden />
          </figure>
        </div>
      </section>

      <section className="gx-tech-arch" aria-label="Platform architecture">
        <div className="gx-tech-arch-wrap">
          <header className="gx-tech-arch-head">
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
    </InnerMotion>
  );
}
