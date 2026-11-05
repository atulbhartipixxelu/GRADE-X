import { Hash, MapPin } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { site } from "@/lib/site";

const facts = [
  { value: "Robot", label: "Gets into places people can't" },
  { value: "Measured", label: "Grease thickness before and after" },
  { value: "Recorded", label: "Photos, readings and a report" },
  { value: "ISO", label: "9001, 14001 and 45001 on record" },
];

const slides = [
  {
    n: "01",
    label: "The robot",
    video: "/robot/orbit.mp4",
    alt: "Grade X crawler driving through an exhaust run",
    text: "The robot gets into places people can't. Our stainless tracked crawler drives the length of the duct with twin turret jets and a forward camera, so the inside is cleaned and checked without sending a person in.",
  },
  {
    n: "02",
    label: "Measured and recorded",
    video: "/robot/platform.mp4",
    alt: "Grade X robotic platform in operation",
    text: "We measure the result and leave a record. Digital grease readings, photos and a service report sit against the site so operators, franchisors and insurers can see the work.",
  },
  {
    n: "03",
    label: "Who we work for",
    video: "/about/who-serves.mp4",
    alt: "Grade X robotic exhaust cleaning in service",
    text: "Quick-service restaurant groups and franchisees, hotels and clubs, shopping centres, and the facility managers who look after them. General commercial cleaning is something we do for kitchen clients we already look after.",
  },
] as const;

function splitCopy(text: string) {
  const period = text.indexOf(". ");
  if (period >= 0) return { lead: text.slice(0, period + 1), rest: text.slice(period + 2) };
  const semi = text.indexOf("; ");
  if (semi >= 0) return { lead: text.slice(0, semi + 1), rest: text.slice(semi + 2) };
  return { lead: text, rest: "" };
}

export function AboutStory() {
  return (
    <>
      <section className="gx-about-facts" aria-label="Grade X at a glance">
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

      <section className="gx-about-story" aria-labelledby="gx-about-story-heading">
        <div className="gx-about-story-wrap">
          <header className="gx-about-story-head" data-aos="fade-up">
            <p className="gx-about-story-kicker">About Grade X</p>
            <h2 id="gx-about-story-heading">The robotic technology story</h2>
          </header>

          {slides.map((item, i) => {
            const copy = splitCopy(item.text);
            return (
              <article
                key={item.n}
                className={`gx-about-row${i % 2 ? " is-flip" : ""}`}
                data-aos={i % 2 ? "fade-left" : "fade-right"}
              >
                <figure className="gx-about-row-media">
                  <video
                    src={item.video}
                    muted
                    playsInline
                    autoPlay
                    loop
                    preload="metadata"
                    disablePictureInPicture
                    controls={false}
                    aria-label={item.alt}
                  />
                </figure>
                <div className="gx-about-row-copy">
                  <p className="gx-about-row-kicker">
                    {item.n} <span>{item.label}</span>
                  </p>
                  <h3>{copy.lead}</h3>
                  {copy.rest ? <p>{copy.rest}</p> : null}
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="gx-about-firm" aria-label="Company registration">
        <div className="gx-about-firm-wrap">
          <div className="gx-about-firm-panel">
            <header className="gx-about-firm-head" data-aos="fade-up">
              <p className="gx-about-firm-kicker">Company</p>
              <h2>
                <span>Grade X</span>
                <span>Commercial Solutions</span>
                <span>
                  <em>Pty Ltd</em>
                </span>
              </h2>
              <p className="gx-about-firm-tag">{site.tagline}</p>
              <p>
                Western Australia&apos;s robotic kitchen exhaust cleaning specialists. Year started:{" "}
                [year]. Team profiles and photos: [to be added].
              </p>
            </header>

            <div className="gx-about-firm-grid">
              <article data-aos="fade-right">
                <i aria-hidden>
                  <Hash strokeWidth={1.8} />
                </i>
                <span>ABN</span>
                <strong>{site.abn}</strong>
              </article>
              <article data-aos="fade-left">
                <i aria-hidden>
                  <MapPin strokeWidth={1.8} />
                </i>
                <span>Base</span>
                <strong>{site.address.full}</strong>
              </article>
            </div>

            <div className="gx-about-firm-action" data-aos="fade-up">
              <Button href="/contact">Request a quote</Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
