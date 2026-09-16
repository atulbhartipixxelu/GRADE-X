import { InnerMotion } from "@/components/inner/InnerMotion";
import { AboutBanner } from "@/components/about/AboutBanner";
import { AboutStory } from "@/components/about/AboutStory";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(
  "About Grade X",
  "Grade X Commercial Solutions is a Western Australian specialist in robotic kitchen exhaust cleaning, digital grease measurement and commercial kitchen hygiene — not a general cleaning company.",
  "/about",
);

export default function AboutPage() {
  return (
    <InnerMotion>
      <AboutBanner />
      <AboutStory />
    </InnerMotion>
  );
}
