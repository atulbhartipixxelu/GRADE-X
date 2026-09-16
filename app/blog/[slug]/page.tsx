import { notFound } from "next/navigation";
import { posts } from "@/lib/content";
import { InnerMotion } from "@/components/inner/InnerMotion";
import { PageHero } from "@/components/ui/PageHero";
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
      <PageHero
        index="11"
        kicker={post.category}
        title={post.title}
        body={post.excerpt}
        crumbs={[
          { href: "/", label: "Home" },
          { href: "/blog", label: "Resources" },
          { href: `/blog/${post.slug}`, label: post.title },
        ]}
      />
      <article className="gx-inner-wrap max-w-3xl">
        <p className="font-mono text-xs text-mist" data-rise>
          {post.date}
        </p>
        <div className="gx-inner-copy mt-8 space-y-6" data-rise>
          {post.body.map((para) => (
            <p key={para.slice(0, 24)}>{para}</p>
          ))}
        </div>
      </article>
    </InnerMotion>
  );
}
