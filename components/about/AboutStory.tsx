import { Button } from "@/components/ui/Button";
import { site } from "@/lib/site";

const facts = [
  { value: "Only in WA", label: "Robotic kitchen exhaust technology" },
  { value: "Digital", label: "Grease thickness evidence on every job" },
  { value: "Live video", label: "Camera confirmation during the clean" },
  { value: "Compliance", label: "Documented records for facility files" },
];

const slides = [
  {
    n: "01",
    label: "Only in WA",
    video: "/robot/orbit.mp4",
    alt: "Grade X crawler driving through an exhaust run",
    text: "Grade X is currently the only company in WA operating robotic kitchen exhaust cleaning technology, a genuine, verifiable point of differentiation in a category most competitors service manually. For clients that means safer access, verifiable results, and less disruption.",
  },
  {
    n: "02",
    label: "Not a generalist",
    video: "/robot/platform.mp4",
    alt: "Grade X robotic platform in operation",
    text: "This is a technology-forward, precision, and compliance-driven business, not a general cleaning company. Across the site, advanced equipment, robotic technology, digital measurement, and professional expertise are the throughline of the brand.",
  },
  {
    n: "03",
    label: "Who Grade X serves",
    video: "/about/who-serves.mp4",
    alt: "Grade X robotic exhaust cleaning in service",
    text: "Who Grade X serves: quick-service restaurant (QSR) franchises and multi-site restaurant groups; commercial kitchens in hotels, clubs, and hospitality venues; facility managers responsible for compliance across multiple sites; and property and shopping centre managers requiring general commercial cleaning alongside kitchen-specific services.",
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
          <header className="gx-about-firm-head" data-aos="fade-up">
            <p className="gx-about-story-kicker">Company</p>
            <h2>{site.legalName}</h2>
            <p>{site.tagline}</p>
            <p>
              Team and leadership profiles will be published here once supplied by Grade X.
            </p>
          </header>

          <div className="gx-about-firm-grid">
            <article data-aos="fade-up">
              <span>ABN</span>
              <strong>{site.abn}</strong>
            </article>
            <article data-aos="fade-up" data-aos-delay="80">
              <span>Base</span>
              <strong>{site.address.full}</strong>
            </article>
          </div>

          <div className="gx-about-firm-action" data-aos="fade-up">
            <Button href="/contact">Request a quote</Button>
          </div>
        </div>
      </section>
    </>
  );
}
