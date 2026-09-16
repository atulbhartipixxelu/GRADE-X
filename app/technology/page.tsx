import { HeroScene } from "@/components/3d/HeroScene";
import { InnerMotion } from "@/components/inner/InnerMotion";
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

function PassTape() {
  return (
    <div className="gx-tech-pass-tick" aria-hidden>
      <p className="gx-tech-pass-tick-live">
        <i />
        Live
      </p>
      <div className="gx-tech-pass-tick-mask">
        <div className="gx-tech-pass-tick-track">
          {[0, 1].map((copy) =>
            [...passTicks, ...passTicks].map((tick, i) => (
              <span key={`${copy}-${i}-${tick}`}>{tick}</span>
            )),
          )}
        </div>
      </div>
    </div>
  );
}

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
        <HeroScene mode="tech" />
        <div className="gx-tech-pass-veil" aria-hidden />
        <div className="gx-tech-pass-scan" aria-hidden />
        <div className="gx-tech-pass-scope" aria-hidden>
          <div className="gx-tech-pass-scope-track">
            {Array.from({ length: 28 }, (_, i) => (
              <span key={i} className={i % 4 === 0 ? "is-major" : ""} />
            ))}
            {Array.from({ length: 28 }, (_, i) => (
              <span key={`b${i}`} className={i % 4 === 0 ? "is-major" : ""} />
            ))}
          </div>
        </div>
        <div className="gx-tech-pass-hud" data-rise>
          <p className="gx-tech-pass-live">
            <i />
            Live interior pass
          </p>
          <h2>The clean is visible during the work.</h2>
          <p>
            The crawler drives the duct floor. Turret jets fire. Camera and LEDs stay on so clients see
            the interior during the clean, not only a hatch photo after it closes.
          </p>
        </div>
        <PassTape />
      </section>

      <section className="gx-inner-wrap gx-inner-split">
        <div className="gx-inner-copy" data-rise>
          <h2>Tracks, turret, hoses — the real architecture.</h2>
          <p>
            The third photograph is an exploded build of this platform. The 3D loop separates the same
            assemblies: track plates, rollers, front camera barrel and the dual-hose turret.
          </p>
        </div>
        <div className="relative h-[420px] overflow-hidden rounded-[1.25rem] border border-gold/20" data-rise>
          <HeroScene mode="studio" />
        </div>
      </section>

      <section className="gx-inner-wrap pt-0">
        <div className="gx-inner-grid gx-inner-grid-2">
          {specs.map((c) => (
            <article key={c.t} className="gx-inner-card" data-rise data-tilt>
              <h2>{c.t}</h2>
              <p>{c.b}</p>
            </article>
          ))}
        </div>
        <div className="gx-inner-cta" data-rise>
          <Button href="/digital-evidence">Digital evidence system</Button>
          <Button href="/methodology" variant="ghost">
            Eight-step methodology
          </Button>
        </div>
      </section>
    </InnerMotion>
  );
}
