import Link from "next/link";
import { notFound } from "next/navigation";
import { posts } from "@/lib/content";
import { InnerMotion } from "@/components/inner/InnerMotion";
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
  return pageMeta(post.title, post.excerpt, `/blog/${slug}`);
}

function stamp(iso: string) {
  return new Date(`${iso}T00:00:00`).toLocaleDateString("en-AU", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) notFound();

  return (
    <InnerMotion>
      <article className="gx-blog gx-blog--article">
        <header className="gx-blog-head">
          <p className="gx-blog-crumbs">
            <Link href="/">Home</Link>
            {" / "}
            <Link href="/blog">Resources</Link>
            {" / "}
            <span>{post.category}</span>
          </p>
          <p className="gx-blog-kicker">{post.category}</p>
          <h1>{post.title}</h1>
          <p className="gx-blog-lede">{post.excerpt}</p>
          <time className="gx-blog-date" dateTime={post.date}>
            {stamp(post.date)}
          </time>
        </header>
        <div className="gx-blog-body" data-rise>
          {post.body.map((para) => (
            <p key={para.slice(0, 24)}>{para}</p>
          ))}
        </div>
      </article>
    </InnerMotion>
  );
}
