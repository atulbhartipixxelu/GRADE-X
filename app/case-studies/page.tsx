import { InnerMotion } from "@/components/inner/InnerMotion";
import { PageHero } from "@/components/ui/PageHero";
import { pageMeta } from "@/lib/seo";

export const metadata = {
  ...pageMeta(
    "Case studies",
    "Grade X case studies will be published here once real site stories are ready.",
    "/case-studies",
  ),
  robots: { index: false, follow: false },
};

export default function CaseStudiesPage() {
  return (
    <InnerMotion>
      <PageHero
        index="10"
        kicker="Case studies"
        title="This page is being prepared."
        body="Real site stories, with names removed if needed, will be published here. The page is hidden from the menu and from search until that content exists."
        crumbs={[
          { href: "/", label: "Home" },
          { href: "/case-studies", label: "Case studies" },
        ]}
      />
    </InnerMotion>
  );
}
