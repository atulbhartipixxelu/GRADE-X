export const evidencePair = [
  {
    src: "/gallery/cookline-before.jpg",
    alt: "Grease-caked commercial cookline burners and pipes before a Grade X clean",
    label: "Before",
  },
  {
    src: "/gallery/cookline-after.jpg",
    alt: "The same cookline after hygiene cleaning, stainless recovered and ready for service",
    label: "After",
  },
] as const;

export const evidenceSlides = [
  {
    t: "Before-and-after photographs",
    n: "Same cookline, same camera angle, supplied with every job",
    mark: "photo" as const,
    tag: "Photographs",
    pair: evidencePair,
    image: "",
    alt: "",
  },
  {
    t: "Digital grease measurement records",
    n: "Before and after micron readings on the job file",
    mark: "gauge" as const,
    tag: "Measurement",
    pair: [],
    image: "/evidence/grease-measurement.jpg",
    alt: "Operator reviewing digital measurement records on a rugged tablet",
  },
  {
    t: "Live video during the clean",
    n: "On robotic cleans you can watch the inside of the duct",
    mark: "live" as const,
    tag: "Live video",
    pair: [],
    image: "/evidence/live-video.jpg",
    alt: "Technician watching a live interior camera feed of a duct on a field monitor",
  },
  {
    t: "Service reports for the visit",
    n: "Written report of what was cleaned and inspected",
    mark: "file" as const,
    tag: "Report",
    pair: [],
    image: "/evidence/service-report.jpg",
    alt: "Hood cleaning service inspection report on a clipboard, with date, technician and status fields",
  },
  {
    t: "Compliance documentation",
    n: "Held with the job record",
    mark: "shield" as const,
    tag: "Compliance",
    pair: [],
    image: "/evidence/compliance.jpg",
    alt: "Grade X ISO 9001:2015 certificate of registration from Globus Certifications",
  },
  {
    t: "Recommendations for future maintenance",
    n: "Next interval, written on the job record",
    mark: "list" as const,
    tag: "Recommendations",
    pair: [],
    image: "/evidence/recommendations.jpg",
    alt: "Grade X ISO 9001:2015 certificate of registration on file for the site",
  },
];
