import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { posts } from "@/lib/content";
import { InnerMotion } from "@/components/inner/InnerMotion";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(
  "Resources",
  "Kitchen exhaust compliance, fire-risk measurement and robotic cleaning notes for Perth commercial kitchens — Grade X resources.",
  "/blog",
);

function stamp(iso: string) {
  return new Date(`${iso}T00:00:00`).toLocaleDateString("en-AU", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function BlogPage() {
  const [lead, ...rest] = posts;

  return (
    <InnerMotion>
      <section className="gx-blog" aria-label="Resources">
        <header className="gx-blog-head">
          <p className="gx-blog-crumbs">
            <Link href="/">Home</Link>
            {" / "}
            <span>Resources</span>
          </p>
          <p className="gx-blog-kicker">Blog / Resources</p>
          <h1>Kitchen exhaust compliance and technology notes.</h1>
          <p className="gx-blog-lede">
            Kitchen exhaust compliance, fire-risk measurement, and robotic cleaning for Western
            Australian sites.
          </p>
        </header>

        {lead ? (
          <Link href={`/blog/${lead.slug}`} className="gx-blog-lead" data-rise>
            <span className="gx-blog-meta">
              <em>{lead.category}</em>
              <time dateTime={lead.date}>{stamp(lead.date)}</time>
            </span>
            <h2>{lead.title}</h2>
            <p>{lead.excerpt}</p>
            <span className="gx-blog-more">
              Read note
              <ArrowUpRight strokeWidth={1.8} />
            </span>
          </Link>
        ) : null}

        {rest.length ? (
          <div className="gx-blog-grid">
            {rest.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="gx-blog-card" data-rise>
                <span className="gx-blog-meta">
                  <em>{post.category}</em>
                  <time dateTime={post.date}>{stamp(post.date)}</time>
                </span>
                <h2>{post.title}</h2>
                <p>{post.excerpt}</p>
                <span className="gx-blog-more">
                  Read note
                  <ArrowUpRight strokeWidth={1.8} />
                </span>
              </Link>
            ))}
          </div>
        ) : null}
      </section>
    </InnerMotion>
  );
}
