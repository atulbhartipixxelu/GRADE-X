import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { BlogBanner } from "@/components/blog/BlogBanner";
import { CtaBanner } from "@/components/home/CtaBanner";
import { InnerMotion } from "@/components/inner/InnerMotion";
import { noteMedia, stamp } from "@/lib/blog";
import { posts } from "@/lib/content";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(
  "Resources",
  "Kitchen exhaust compliance, fire-risk measurement and robotic cleaning notes for Perth commercial kitchens — Grade X resources.",
  "/blog",
);

export default function BlogPage() {
  return (
    <InnerMotion>
      <div className="gx-hero-stack">
        <BlogBanner />
      </div>

      <section className="gx-about-story gx-blog-notes" id="notes" aria-label="Resource notes">
        <div className="gx-about-story-wrap">
          {posts.map((post, i) => {
            const media = noteMedia[post.slug];
            return (
              <article
                key={post.slug}
                className={`gx-about-row${i % 2 ? " is-flip" : ""}`}
                data-aos={i % 2 ? "fade-left" : "fade-right"}
              >
                {media ? (
                  <figure className="gx-about-row-media">
                    <Image
                      src={media.src}
                      alt={media.alt}
                      width={960}
                      height={600}
                      sizes="(min-width: 860px) 34rem, 92vw"
                    />
                  </figure>
                ) : (
                  <div className="gx-about-row-media" aria-hidden />
                )}
                <div className="gx-about-row-copy">
                  <p className="gx-about-row-kicker">
                    {String(i + 1).padStart(2, "0")} <span>{post.category}</span>
                  </p>
                  <time dateTime={post.date}>{stamp(post.date)}</time>
                  <h3>
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </h3>
                  <p>{post.excerpt}</p>
                  <Link href={`/blog/${post.slug}`} className="gx-blog-more">
                    Read note
                    <ArrowUpRight strokeWidth={1.8} />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <CtaBanner />
    </InnerMotion>
  );
}
