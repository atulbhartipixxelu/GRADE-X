export const isoStandards = [
  {
    id: "iso-9001",
    code: "ISO 9001",
    short: "Quality",
    line: "Quality management: consistent methods and records on every job.",
    number: "[certificate number]",
    certifier: "[certification body]",
    scope: "[exact scope from the certificate]",
    expiry: "[expiry date]",
    href: "/compliance#iso-9001",
    alt: "Grade X is certified to ISO 9001 quality management",
  },
  {
    id: "iso-14001",
    code: "ISO 14001",
    short: "Environment",
    line: "Environmental management: controlled chemicals, waste and water on site.",
    number: "[certificate number]",
    certifier: "[certification body]",
    scope: "[exact scope from the certificate]",
    expiry: "[expiry date]",
    href: "/compliance#iso-14001",
    relatedHref: "/services/steam-cleaning",
    relatedLabel: "Steam cleaning",
    alt: "Grade X is certified to ISO 14001 environmental management",
  },
  {
    id: "iso-45001",
    code: "ISO 45001",
    short: "WHS",
    line: "Health and safety management: safe systems of work for our crews and your site.",
    number: "[certificate number]",
    certifier: "[certification body]",
    scope: "[exact scope from the certificate]",
    expiry: "[expiry date]",
    href: "/compliance#iso-45001",
    relatedHref: "/compliance#whs-swms",
    relatedLabel: "WHS and SWMS",
    alt: "Grade X is certified to ISO 45001 health and safety management",
  },
] as const;

export const trustTicks = [
  "Certified to ISO 9001, ISO 14001 and ISO 45001",
  "Fully insured",
  "SWMS on every site",
  "Before and after evidence on every job",
  "Perth metro response",
] as const;

export const replyWindow = "[one business day]";
export const urgentWindow = "[X hours]";
export const openingHours = "[Opening hours to be confirmed]";
export const yearStarted = "[Year started]";

export const howOftenCopy =
  "Set after the first inspection and reading, depending on cooking volume, fuel type and what the insurer or brand requires. [Usual ranges to be added.]";

export const liveVideoScope =
  "On robotic cleans you can watch the inside of the duct during the clean. Live video is part of the robotic service, not a separate add-on.";
