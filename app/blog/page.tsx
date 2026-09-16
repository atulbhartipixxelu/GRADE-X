import Link from "next/link";
import { posts } from "@/lib/content";
import { InnerMotion } from "@/components/inner/InnerMotion";
import { PageHero } from "@/components/ui/PageHero";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(
  "Resources",
  "Kitchen exhaust compliance, fire-risk measurement and robotic cleaning notes for Perth commercial kitchens — Grade X resources.",
  "/blog",
);

export default function BlogPage() {
  return (
    <InnerMotion>
      <PageHero
        index="11"
        kicker="Blog / Resources"
        title="Kitchen exhaust compliance and technology notes."
        body="Recommended in the brief for long-term SEO: kitchen exhaust compliance, fire-risk measurement, and robotic cleaning for Western Australian sites."
        media="/slides/tunnel-spray.jpg"
        mediaAlt="Interior exhaust cleaning in progress"
        crumbs={[
          { href: "/", label: "Home" },
          { href: "/blog", label: "Resources" },
        ]}
      />
      <section className="gx-inner-wrap">
        <div className="gx-inner-grid gx-inner-grid-3">
          {posts.map((p) => (
            <Link key={p.slug} href={`/blog/${p.slug}`} className="gx-inner-card" data-rise data-tilt>
              <b>
                {p.category} · {p.date}
              </b>
              <h2>{p.title}</h2>
              <p>{p.excerpt}</p>
            </Link>
          ))}
        </div>
      </section>
    </InnerMotion>
  );
}
