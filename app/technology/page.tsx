import Image from "next/image";
import { HeroScene } from "@/components/3d/HeroScene";
import { PageHero } from "@/components/ui/PageHero";
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

const photos = [
  {
    src: "/robot/front.jpg",
    alt: "Grade X kitchen exhaust cleaning robot, front view with LED lights and turret nozzles",
    caption: "Front — dual LEDs, inspection face, turret jets",
  },
  {
    src: "/robot/side.jpg",
    alt: "Grade X tracked crawler robot side view showing dual hoses and camera barrel",
    caption: "Side — dual hose circuit and forward camera barrel",
  },
  {
    src: "/robot/exploded.jpg",
    alt: "Exploded view of the Grade X robotic exhaust cleaning crawler",
    caption: "Service view — tracks, motors, turret, fittings",
  },
];

export default function TechnologyPage() {
  return (
    <>
      <PageHero
        kicker="The Grade X crawler"
        title="The stainless machine we send into the duct."
        body="A stainless tracked robot built for kitchen exhaust interiors: dual high-pressure hoses, twin turret nozzles, LED lighting and a forward camera. The 3D on this site is that platform, crawling a duct cutaway and opening into a service explode."
        crumbs={[
          { href: "/", label: "Home" },
          { href: "/technology", label: "Technology" },
        ]}
      />

      <section className="mx-auto grid max-w-7xl gap-4 px-5 py-12 sm:px-8 md:grid-cols-3">
        {photos.map((p) => (
          <figure key={p.src} className="border border-gold/20 bg-navy-2">
            <div className="relative aspect-[4/3] bg-[#efe8da]">
              <Image src={p.src} alt={p.alt} fill className="object-contain p-3" sizes="(min-width: 768px) 33vw, 100vw" />
            </div>
            <figcaption className="border-t border-gold/15 px-4 py-3 font-mono text-[11px] tracking-[0.14em] text-gold uppercase">
              {p.caption}
            </figcaption>
          </figure>
        ))}
      </section>

      <section className="relative h-[70vh] min-h-[480px] border-y border-gold/15">
        <HeroScene mode="tech" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy via-transparent to-navy/40" />
        <div className="absolute bottom-8 left-8 max-w-md">
          <p className="font-mono text-[11px] tracking-[0.28em] text-gold uppercase">
            Live interior pass
          </p>
          <p className="mt-2 text-sm text-mist">
            The crawler drives the duct floor. Turret jets fire. Camera and LEDs stay on so the clean is visible, not assumed.
          </p>
        </div>
      </section>

      <section className="border-b border-gold/15">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-16 sm:px-8 lg:grid-cols-2">
          <div>
            <p className="font-mono text-[11px] tracking-[0.28em] text-gold uppercase">
              Service explode
            </p>
            <h2 className="mt-3 font-display text-4xl text-ivory">
              Tracks, turret, hoses — the real architecture.
            </h2>
            <p className="mt-4 leading-8 text-mist">
              The third photograph is an exploded build of this crawler. The 3D loop separates the same assemblies: chevron track plates, rollers, front camera barrel and the dual-hose turret. Facility managers can see this is plant, not a render of a toy.
            </p>
          </div>
          <div className="relative h-[420px] overflow-hidden border border-gold/20">
            <HeroScene mode="studio" />
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-5 py-20 sm:px-8 lg:grid-cols-2">
        {specs.map((c) => (
          <article key={c.t} className="border border-gold/15 p-8">
            <h2 className="font-display text-2xl text-ivory">{c.t}</h2>
            <p className="mt-4 text-sm leading-7 text-mist">{c.b}</p>
          </article>
        ))}
      </section>
      <section className="mx-auto max-w-7xl px-5 pb-24 sm:px-8">
        <div className="flex flex-wrap gap-4">
          <Button href="/digital-evidence">Digital evidence system</Button>
          <Button href="/methodology" variant="ghost">
            Eight-step methodology
          </Button>
        </div>
      </section>
    </>
  );
}
