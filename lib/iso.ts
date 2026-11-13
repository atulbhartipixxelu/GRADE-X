const isoScope =
  "Commercial cleaning, industrial cleaning, kitchen and commercial kitchen hygiene services, kitchen exhaust and canopy cleaning including robotic cleaning, high-pressure washing and exterior cleaning, steam cleaning and specialised cleaning services, floor cleaning and maintenance, window cleaning, hygiene and sanitation services, and associated property and facility maintenance services.";

export const isoStandards = [
  {
    id: "iso-9001",
    code: "ISO 9001",
    edition: "2015",
    short: "Quality",
    line: "Quality management: consistent methods and records on every job.",
    number: "CB-MS-1713",
    registration: "AB100XXIV62027760",
    certifier: "Globus Certifications Private Limited",
    scope: isoScope,
    issued: "24 October 2026",
    surveillance: "23 October 2027",
    expiry: "23 October 2029",
    pdf: "/compliance/iso-9001.pdf",
    pdfMeta: "PDF, 3.4 MB",
    href: "/compliance#iso-9001",
    alt: "ISO 9001:2015 quality management certificate",
  },
  {
    id: "iso-14001",
    code: "ISO 14001",
    edition: "2015",
    short: "Environment",
    line: "Environmental management: controlled chemicals, waste and water on site.",
    number: "CB-MS-1712",
    registration: "CD100XXIV62027761",
    certifier: "Globus Certifications Private Limited",
    scope: isoScope,
    issued: "24 October 2026",
    surveillance: "23 October 2027",
    expiry: "23 October 2029",
    pdf: "/compliance/iso-14001.pdf",
    pdfMeta: "PDF, 3.4 MB",
    href: "/compliance#iso-14001",
    relatedHref: "/services/steam-cleaning",
    relatedLabel: "Steam cleaning",
    alt: "ISO 14001:2015 environmental management certificate",
  },
  {
    id: "iso-45001",
    code: "ISO 45001",
    edition: "",
    short: "WHS",
    line: "Health and safety management: safe systems of work for our crews and your site.",
    number: "",
    registration: "",
    certifier: "",
    scope: "",
    issued: "",
    surveillance: "",
    expiry: "",
    pdf: "",
    pdfMeta: "",
    href: "/compliance#iso-45001",
    relatedHref: "/compliance#whs-swms",
    relatedLabel: "WHS and SWMS",
    alt: "ISO 45001 health and safety management",
  },
] as const;

export const publishedIso = isoStandards.filter((item) =>
  Boolean(item.number && item.certifier && item.pdf),
);

export const isoReady = publishedIso.length > 0;

function joinEnglish(items: readonly string[]) {
  if (items.length === 0) return "";
  if (items.length === 1) return items[0];
  if (items.length === 2) return `${items[0]} and ${items[1]}`;
  return `${items.slice(0, -1).join(", ")} and ${items[items.length - 1]}`;
}

export const isoClaim = joinEnglish(publishedIso.map((item) => item.code));

export const trustTicks = [
  "Fully insured",
  "SWMS on every site",
  "Before and after evidence on every job",
  "Perth metro response",
] as const;

export const replyWindow = "after we review your request";
export const openingHours = "";

export const howOftenCopy =
  "Set after the first inspection and reading, depending on cooking volume, fuel type and what the insurer or brand requires.";

export const liveVideoScope =
  "On robotic cleans you can watch the inside of the duct during the clean. Live video is part of the robotic service, not a separate add-on.";

export const capabilityPdf = {
  href: "/capability-statement.pdf",
  label: "Download capability statement",
  meta: "PDF, 0.6 MB",
  size: "0.6 MB",
  ready: true,
} as const;
