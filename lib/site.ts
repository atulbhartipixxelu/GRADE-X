function resolveSiteUrl() {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (raw) {
    try {
      return new URL(raw).origin;
    } catch {
      /* fall through */
    }
  }
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL;
  if (vercel) {
    return vercel.startsWith("http") ? vercel : `https://${vercel}`;
  }
  return "http://localhost:3000";
}

export const site = {
  name: "Grade X Commercial Solutions",
  legalName: "Grade X Commercial Solutions Pty Ltd",
  shortName: "Grade X",
  tagline: "Precision. Technology. Compliance.",
  description:
    "Western Australia's only robotic kitchen exhaust cleaning specialist. Commercial kitchen hygiene, digital grease measurement, and documented compliance for QSR, hospitality, and facility managers.",
  url: resolveSiteUrl(),
  abn: "45 684 073 345",
  address: {
    street: "5 Elward Way",
    suburb: "Balga",
    state: "WA",
    postcode: "6061",
    country: "Australia",
    full: "5 Elward Way, Balga WA 6061",
  },
  email: "gradex.perth@gmail.com",
  phone: "0430 360 162",
  phoneHref: "tel:+61430360162",
  emailHref: "mailto:gradex.perth@gmail.com",
  serviceArea: "Perth metropolitan and Western Australia",
  emergency: "Emergency response available across the Perth metro",
} as const;

export const nav = [
  { href: "/", label: "Home" },
  { href: "/technology", label: "Technology" },
  { href: "/services", label: "Services" },
  { href: "/methodology", label: "Methodology" },
  { href: "/digital-evidence", label: "Evidence" },
  { href: "/compliance", label: "Compliance" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

export const footerNav = {
  company: [
    { href: "/about", label: "About Grade X" },
    { href: "/case-studies", label: "Case studies" },
    { href: "/blog", label: "Resources" },
    { href: "/faq", label: "FAQ" },
  ],
  operations: [
    { href: "/technology", label: "Robotic cleaning" },
    { href: "/methodology", label: "Our methodology" },
    { href: "/digital-evidence", label: "Digital evidence" },
    { href: "/compliance", label: "Compliance & WHS" },
  ],
  services: [
    { href: "/services", label: "All services" },
    { href: "/service-area", label: "Service area" },
    { href: "/contact", label: "Request a quote" },
  ],
  legal: [
    { href: "/privacy", label: "Privacy policy" },
    { href: "/terms", label: "Terms of service" },
  ],
} as const;
