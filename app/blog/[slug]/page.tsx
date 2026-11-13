import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { BlogIntro } from "@/components/blog/BlogIntro";
import { CtaBanner } from "@/components/home/CtaBanner";
import { InnerMotion } from "@/components/inner/InnerMotion";
import { noteMedia } from "@/lib/blog";
import { posts } from "@/lib/content";
import { pageMeta } from "@/lib/seo";

export async function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) return {};
  return pageMeta(post.title, post.body[0] || post.excerpt, `/blog/${slug}`);
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) notFound();

  const media = noteMedia[post.slug];
  const others = posts.filter((item) => item.slug !== post.slug);

  return (
    <InnerMotion>
      <BlogIntro
        crumbs={[
          { href: "/", label: "Home" },
          { href: "/blog", label: "Resources" },
          { label: post.category },
        ]}
        kicker={post.category}
        title={post.title}
        lede={post.excerpt}
        date={post.date}
        image={media?.src}
        imageAlt={media?.alt}
      />

      <article className="gx-blog gx-blog--article" id="article">
        <div className="gx-blog-wrap">
          <div className="gx-blog-panel">
            <div className="gx-blog-body">
              {post.body.map((para) => (
                <p key={para.slice(0, 24)}>{para}</p>
              ))}
            </div>
          </div>
        </div>
      </article>

      {others.length ? (
        <section className="gx-blog-related" aria-labelledby="gx-blog-related-heading">
          <div className="gx-about-story-wrap">
            <header className="gx-about-story-head" data-aos="fade-up">
              <p className="gx-about-story-kicker">Resources</p>
              <h2 id="gx-blog-related-heading">More notes</h2>
            </header>
            <div className="gx-blog-related-grid">
              {others.map((item, i) => {
                const shot = noteMedia[item.slug];
                return (
                  <Link
                    key={item.slug}
                    href={`/blog/${item.slug}`}
                    className="gx-blog-related-card"
                    data-aos="fade-up"
                    data-aos-delay={String(i * 80)}
                  >
                    {shot ? (
                      <span className="gx-blog-related-media">
                        <Image
                          src={shot.src}
                          alt={shot.alt}
                          fill
                          sizes="(min-width: 860px) 28rem, 92vw"
                        />
                      </span>
                    ) : null}
                    <span className="gx-about-row-kicker">
                      {String(i + 1).padStart(2, "0")} <span>{item.category}</span>
                    </span>
                    <strong>{item.title}</strong>
                    <p>{item.excerpt}</p>
                    <span className="gx-blog-more">
                      Read note
                      <ArrowUpRight strokeWidth={1.8} />
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      ) : null}

      <CtaBanner />
    </InnerMotion>
  );
}
