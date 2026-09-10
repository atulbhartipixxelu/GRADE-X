import Link from "next/link";
import { posts } from "@/lib/content";
import { PageHero } from "@/components/ui/PageHero";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(
  "Resources",
  "Kitchen exhaust compliance, fire-risk measurement and robotic cleaning notes for Perth commercial kitchens — Grade X resources.",
  "/blog",
);

export default function BlogPage() {
  return (
    <>
      <PageHero
        kicker="Blog / Resources"
        title="Kitchen exhaust compliance and technology notes."
        body="Recommended in the brief for long-term SEO: kitchen exhaust compliance, fire-risk measurement, and robotic cleaning for Western Australian sites."
        crumbs={[
          { href: "/", label: "Home" },
          { href: "/blog", label: "Resources" },
        ]}
      />
      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
        <div className="grid gap-6 md:grid-cols-3">
          {posts.map((p) => (
            <Link
              key={p.slug}
              href={`/blog/${p.slug}`}
              className="border border-gold/15 p-6 hover:border-gold/50"
            >
              <p className="font-mono text-[11px] tracking-[0.2em] text-gold uppercase">
                {p.category} · {p.date}
              </p>
              <h2 className="mt-3 font-display text-xl text-ivory">{p.title}</h2>
              <p className="mt-3 text-sm leading-7 text-mist">{p.excerpt}</p>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
