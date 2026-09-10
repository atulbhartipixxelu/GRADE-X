import type { Metadata } from "next";
import { site } from "./site";

export function pageMeta(
  title: string,
  description: string,
  path = "/",
): Metadata {
  const url = `${site.url}${path}`;
  const fullTitle =
    title === site.tagline ? `${site.shortName} — ${title}` : `${title} | ${site.shortName}`;

  return {
    title: fullTitle,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: site.name,
      locale: "en_AU",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
    },
  };
}

export function localBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: site.legalName,
    image: `${site.url}/og.jpg`,
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
  };
}
