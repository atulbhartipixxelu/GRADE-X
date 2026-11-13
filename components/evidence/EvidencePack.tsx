import Image from "next/image";
import { evidencePair, evidenceSlides } from "@/lib/evidence";

export function EvidencePack() {
  return (
    <>
      <div className="gx-evd-grid">
        {evidenceSlides.map((item, i) => (
          <article
            key={item.t}
            className="gx-evd-tile"
            data-aos="fade-up"
            data-aos-delay={String((i % 3) * 70)}
          >
            {item.pair.length ? (
              <div className="gx-evd-tile-shot gx-evd-tile-pair">
                {evidencePair.map((shot) => (
                  <figure key={shot.label}>
                    <Image
                      src={shot.src}
                      alt={shot.alt}
                      fill
                      sizes="(min-width: 980px) 16vw, 45vw"
                    />
                    <figcaption>{shot.label}</figcaption>
                  </figure>
                ))}
              </div>
            ) : (
              <figure className="gx-evd-tile-shot gx-evd-tile-media">
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  sizes="(min-width: 980px) 28vw, 92vw"
                />
              </figure>
            )}
            <div className="gx-evd-tile-copy">
              <p className="gx-evd-tile-kicker">
                <b>{String(i + 1).padStart(2, "0")}</b>
                <span>{item.tag}</span>
              </p>
              <h3>{item.t}</h3>
              <p>{item.n}</p>
            </div>
          </article>
        ))}
      </div>

      <aside className="gx-evd-aside" data-aos="fade-up">
        <p className="gx-evd-aside-kicker">Robotic cleans</p>
        <p>
          On robotic cleans you also get live footage of the inside of the duct. Live video is
          part of the robotic service, not a claim for every non-robotic visit.
        </p>
      </aside>
    </>
  );
}
