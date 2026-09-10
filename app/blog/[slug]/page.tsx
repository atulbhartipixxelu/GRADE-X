import { notFound } from "next/navigation";
import { posts } from "@/lib/content";
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
    <>
      <PageHero
        kicker={post.category}
        title={post.title}
        body={post.excerpt}
        crumbs={[
          { href: "/", label: "Home" },
          { href: "/blog", label: "Resources" },
          { href: `/blog/${post.slug}`, label: post.title },
        ]}
      />
      <article className="mx-auto max-w-3xl px-5 py-16 sm:px-8">
        <p className="font-mono text-xs text-mist">{post.date}</p>
        <div className="mt-8 space-y-6 text-lg leading-9 text-mist">
          {post.body.map((para) => (
            <p key={para.slice(0, 24)}>{para}</p>
          ))}
        </div>
      </article>
    </>
  );
}
