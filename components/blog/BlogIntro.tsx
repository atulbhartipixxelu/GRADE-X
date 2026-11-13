import Image from "next/image";
import Link from "next/link";
import { stamp } from "@/lib/blog";

export function BlogIntro({
  crumbs,
  kicker,
  title,
  lede,
  date,
  image,
  imageAlt,
}: {
  crumbs: { href?: string; label: string }[];
  kicker: string;
  title: string;
  lede?: string;
  date?: string;
  image?: string;
  imageAlt?: string;
}) {
  const media =
    image && imageAlt ? (
      <figure className="gx-blog-intro-media">
        <Image
          src={image}
          alt={imageAlt}
          fill
          priority
          sizes="(min-width: 860px) 36rem, 92vw"
        />
      </figure>
    ) : null;

  return (
    <header className="gx-blog-intro">
      <div className="gx-blog-intro-shell">
        <p className="gx-blog-crumbs">
          {crumbs.map((item, i) => (
            <span key={`${item.label}-${i}`}>
              {item.href ? <Link href={item.href}>{item.label}</Link> : <span>{item.label}</span>}
              {i < crumbs.length - 1 ? " / " : null}
            </span>
          ))}
        </p>

        <div className={`gx-blog-intro-card${media ? "" : " is-plain"}`}>
          <div className="gx-blog-intro-copy">
            <p className="gx-blog-intro-tag">{kicker}</p>
            <h1>{title}</h1>
            {lede ? <p className="gx-blog-lede">{lede}</p> : null}
            {date ? (
              <div className="gx-blog-intro-meta">
                <time className="gx-blog-date" dateTime={date}>
                  {stamp(date)}
                </time>
              </div>
            ) : null}
          </div>
          {media}
        </div>
      </div>
    </header>
  );
}
