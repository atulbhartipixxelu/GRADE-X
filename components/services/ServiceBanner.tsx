import Image from "next/image";
import { Play } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { categoryMeta, type Service } from "@/lib/content";

function titleLines(name: string) {
  const words = name.trim().split(/\s+/);
  if (words.length === 1) return [name];
  return [words.slice(0, -1).join(" "), words[words.length - 1]];
}

export function ServiceBanner({
  service,
  image,
  alt,
}: {
  service: Service;
  image: string;
  alt: string;
}) {
  const lines = titleLines(service.name);

  return (
    <section className="gx-hero gx-svc-one" aria-label={service.name}>
      <div className="gx-hero-media">
        <Image
          src={image}
          alt={alt}
          fill
          priority
          className="gx-hero-video gx-svc-hero-still"
          sizes="100vw"
        />
        <div className="gx-hero-wash" aria-hidden />
      </div>

      <div className="gx-hero-inner">
        <div className="gx-hero-copy">
          <p className="gx-hero-kicker">{categoryMeta[service.category].title}</p>
          <h1 className="gx-hero-title gx-hero-title--split">
            {lines.map((line, index) => (
              <span
                key={line}
                className={index === lines.length - 1 ? "gx-hero-accent" : undefined}
              >
                <em>{line}</em>
              </span>
            ))}
          </h1>
          <p className="gx-hero-body">{service.excerpt}</p>
          <div className="gx-hero-actions">
            <Button href="#quote">Request a quote</Button>
            <a className="gx-hero-play" href="#included">
              <span className="gx-hero-play-icon">
                <Play strokeWidth={2} />
                <i />
                <i />
              </span>
              What&apos;s included
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
