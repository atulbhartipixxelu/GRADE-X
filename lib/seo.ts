import type { Metadata } from "next";
import { site } from "./site";

const shareImage = {
  url: "/og/default.jpg",
  width: 1200,
  height: 630,
  alt: "Grade X robotic kitchen exhaust cleaning",
} as const;

export function clipMeta(text: string, max = 160) {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  const sentences = clean.match(/[^.!?]+[.!?]+(?:\s+|$)|[^.!?]+$/g) ?? [clean];
  let out = "";
  for (const sentence of sentences) {
    const next = `${out}${sentence}`.trim();
    if (next.length > max) break;
    out = next;
  }
  if (out.length >= 120) return out;
  const cut = clean.slice(0, max);
  const at = cut.lastIndexOf(" ");
  return `${cut.slice(0, at > 100 ? at : max).replace(/[,:;]+$/, "")}.`;
}

function brandedTitle(title: string) {
  if (title === site.tagline) return `${site.shortName} — ${title}`;
  if (/\bGrade X\b/i.test(title)) return title;
  return `${title} | ${site.shortName}`;
}

export function pageMeta(
  title: string,
  description: string,
  path = "/",
): Metadata {
  const url = `${site.url}${path}`;
  const fullTitle = brandedTitle(title);
  const metaDescription = clipMeta(description);

  return {
    title: fullTitle,
    description: metaDescription,
    alternates: { canonical: url },
    openGraph: {
      title: fullTitle,
      description: metaDescription,
      url,
      siteName: site.name,
      locale: "en_AU",
      type: "website",
      images: [shareImage],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: metaDescription,
      images: [shareImage.url],
    },
  };
}

export function localBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: site.legalName,
    image: `${site.url}/og/default.jpg`,
    url: site.url,
    telephone: site.phone,
    email: site.email,
    identifier: site.abn,
    taxID: site.abn,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.suburb,
      addressRegion: site.address.state,
      postalCode: site.address.postcode,
      addressCountry: "AU",
    },
    areaServed: ["Perth", "Western Australia"],
    description: site.description,
    priceRange: "$$",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Commercial kitchen services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Kitchen exhaust cleaning",
            areaServed: "Perth",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Robotic exhaust cleaning",
            areaServed: "Western Australia",
          },
        },
      ],
    },
  };
}
