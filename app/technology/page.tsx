import Image from "next/image";
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

      <section className="gx-tech-arch" aria-label="Platform architecture">
        <div className="gx-tech-arch-board">
          <h2 className="gx-tech-arch-title" data-rise>
            Tracks, turret,
            <br />
            hoses — the real
            <br />
            architecture.
          </h2>
          <p className="gx-tech-arch-lede" data-rise>
            The third photograph is an exploded build of this platform. The 3D loop separates the
            same assemblies: track plates, rollers, front camera barrel and the dual-hose turret.
          </p>

          {specs.map((c, i) => (
            <article
              key={c.t}
              className={`gx-tech-arch-call gx-tech-arch-call--${i + 1}`}
              data-rise
            >
              <b>{String(i + 1).padStart(2, "0")}</b>
              <h3>{c.t}</h3>
              <p>{c.b}</p>
            </article>
          ))}

          <div className="gx-tech-arch-machine" data-rise>
            <div className="gx-tech-arch-shot">
              <Image
                src="/technology/arch-crawler.jpg"
                alt="Stainless tracked crawler with twin turret nozzles, dual hoses and forward inspection camera"
                width={400}
                height={428}
                className="gx-tech-arch-photo"
              />
              <i className="gx-tech-arch-wipe gx-tech-arch-wipe--tl" aria-hidden />
              <i className="gx-tech-arch-wipe gx-tech-arch-wipe--tr" aria-hidden />
            </div>
          </div>

          <svg className="gx-tech-arch-lines" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden>
            <g fill="none" stroke="#2c2414" strokeWidth="0.13">
              <path d="M22.8 44.6 H37.4" />
              <path d="M62.2 33.8 H75.6" />
              <path d="M22.8 72.2 H48.6" />
              <path d="M63.4 61.6 H75.6" />
            </g>
            <g fill="#2c2414">
              <circle cx="37.4" cy="44.6" r="0.45" />
              <circle cx="62.2" cy="33.8" r="0.45" />
              <circle cx="48.6" cy="72.2" r="0.45" />
              <circle cx="63.4" cy="61.6" r="0.45" />
            </g>
          </svg>
        </div>

        <div className="gx-tech-arch-cta" data-rise>
          <Button href="/digital-evidence">Digital evidence system</Button>
          <Button href="/methodology" variant="ghost">
            Eight-step methodology
          </Button>
        </div>
      </section>
    </InnerMotion>
  );
}
