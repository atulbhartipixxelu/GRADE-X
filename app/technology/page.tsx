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

      <section className="relative h-[70vh] min-h-[480px] overflow-hidden border-y border-gold/15">
        <HeroScene mode="tech" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy via-transparent to-navy/40" />
        <div className="absolute bottom-8 left-8 max-w-md" data-rise>
          <p className="font-mono text-[11px] tracking-[0.28em] text-gold-2 uppercase">Live interior pass</p>
          <p className="mt-2 text-sm text-white/80">
            The crawler drives the duct floor. Turret jets fire. Camera and LEDs stay on so the clean is
            visible during the work.
          </p>
        </div>
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
