export type ServiceCategory =
  | "kitchen-exhaust"
  | "kitchen-equipment"
  | "lobby"
  | "exterior";

export type Service = {
  slug: string;
  name: string;
  category: ServiceCategory;
  excerpt: string;
  description: string;
  outcomes: string[];
  featured?: boolean;
};

export type Faq = {
  id: string;
  question: string;
  answer: string;
};

export type Testimonial = {
  id: string;
  quote: string;
  name: string;
  role: string;
  organisation: string;
};

export type CaseStudy = {
  slug: string;
  title: string;
  sector: string;
  location: string;
  summary: string;
  challenge: string;
  approach: string;
  result: string;
};

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  body: string[];
};

export const categoryMeta: Record<
  ServiceCategory,
  { title: string; description: string }
> = {
  "kitchen-exhaust": {
    title: "Kitchen Exhaust & Hygiene Specialty",
    description:
      "Kitchen Exhaust Cleaning, Canopy Cleaning, Robotic Exhaust Cleaning Technology, Steam Cleaning, and Kitchen Equipment Hygiene (UHC, Grill, Shake Machine, Steamer, Oven etc.).",
  },
  "kitchen-equipment": {
    title: "Kitchen Equipment Cleaning",
    description:
      "Grill Recovery, Fryer Vat Boil-Outs, Shake Machine Cleaning, Cool Room Cleaning, Nightly Kitchen Maintenance, and Monthly Kitchen Deep Cleaning.",
  },
  lobby: {
    title: "Lobby & Front-of-House",
    description: "Lobby Cleaning, Monthly Lobby Deep Cleaning, and Play Place.",
  },
  exterior: {
    title: "Exterior & General Commercial",
    description:
      "Floor Detailing & Floor Scrubbing, Exterior High-Pressure Washing, Building & Drive-Thru Pressure Cleaning, Window Cleaning, Line Marking, General Commercial Cleaning, and Hygiene & Sanitation Services.",
  },
};

export const services: Service[] = [
  {
    slug: "kitchen-exhaust-cleaning",
    name: "Kitchen Exhaust Cleaning",
    category: "kitchen-exhaust",
    featured: true,
    excerpt:
      "Full-system exhaust hygiene with measured grease thickness, interior steam washing and documented after-clean evidence.",
    description:
      "Grade X treats kitchen exhaust as a compliance asset, not a cosmetic wipe-down. Interior ductwork, canopy plenums and accessible exhaust components are cleaned using professional steam extraction, then verified with digital grease-thickness readings before and after the job. Facility managers receive photographic evidence and a written service record with every clean — so fire-risk and food-safety files stay audit-ready.",
    outcomes: [
      "Interior steam washing of ducts and canopy systems",
      "Before/after micron readings, not visual guesswork",
      "Photographic evidence and a job report on every visit",
    ],
  },
  {
    slug: "canopy-cleaning",
    name: "Canopy Cleaning",
    category: "kitchen-exhaust",
    featured: true,
    excerpt:
      "Canopy interiors, filters and capture zones cleaned to food-safe standard with protected prep areas below.",
    description:
      "Grease that collects in canopy interiors and filter banks is a fire load and a hygiene failure waiting to happen. Grade X isolates and protects the work zone, then deep-cleans canopy surfaces, baffles and accessible plenums so extraction actually captures what the cookline produces. The work is sequenced with exhaust cleaning so the whole capture-and-extract path is treated as one system.",
    outcomes: [
      "Canopy, filter and plenum hygiene in one visit",
      "Work-area protection for live commercial kitchens",
      "Aligned with full exhaust-system methodology",
    ],
  },
  {
    slug: "robotic-exhaust-cleaning",
    name: "Robotic Exhaust Cleaning Technology",
    category: "kitchen-exhaust",
    featured: true,
    excerpt:
      "Stainless tracked crawler with dual-hose turret jets and a forward camera — currently the only robotic kitchen exhaust platform of this kind in WA.",
    description:
      "Grade X is currently the only company in Western Australia operating robotic kitchen exhaust cleaning technology. The platform is a stainless tracked crawler: chevron drive plates, dual high-pressure hoses, an articulating turret with twin nozzles, LED work lights and a forward inspection camera. It enters duct runs that are unsafe or impractical to occupy, cleans under live visual confirmation, and leaves the interior on record — not just the canopy face.",
    outcomes: [
      "Tracked crawler access without manned duct entry",
      "Twin turret jets fed by a dual-hose high-pressure circuit",
      "Live camera + LED interior view during the clean",
    ],
  },
  {
    slug: "steam-cleaning",
    name: "Steam Cleaning",
    category: "kitchen-exhaust",
    featured: true,
    excerpt:
      "Professional-grade steam and extraction that lifts grease with reduced reliance on harsh chemicals.",
    description:
      "Interior steam washing is how Grade X gets inside exhaust systems without flooding a kitchen in aggressive chemistry. High-temperature steam and extraction lift accumulated grease and contaminants from duct interiors and equipment surfaces while supporting sites that are moving toward less chemically-intensive commercial cleaning. It is a process step in the methodology, not a marketing add-on.",
    outcomes: [
      "Deep interior clean with steam and extraction",
      "Reduced reliance on harsh chemical programmes",
      "Suitable for food-production environments",
    ],
  },
  {
    slug: "kitchen-equipment-hygiene",
    name: "Kitchen Equipment Hygiene",
    category: "kitchen-exhaust",
    excerpt:
      "UHC, grill, shake machine, steamer, oven and allied cookline assets returned to a food-safe operating condition.",
    description:
      "Exhaust hygiene fails if the cookline itself is carrying soil. Grade X programmes cover UHC cabinets, grills, shake machines, steamers, ovens and related production equipment so grease, carbon and food residue are removed from the assets that create the exhaust load. Each asset type is treated with the right recovery method rather than a generic degrease.",
    outcomes: [
      "Asset-specific hygiene for cookline equipment",
      "Supports both nightly maintenance and deep-clean cycles",
      "Documented as part of the site service record",
    ],
  },
  {
    slug: "grill-recovery",
    name: "Grill Recovery",
    category: "kitchen-equipment",
    excerpt:
      "Carbon and grease recovery on grill surfaces so heat transfer, appearance and food quality come back into spec.",
    description:
      "Grill recovery is a production issue as much as a cleaning issue. Built-up carbon changes cook times and product quality. Grade X restores grill surfaces through controlled recovery methods suited to commercial cooklines, then leaves the asset ready for service without overnight chemical soaks that the kitchen cannot afford.",
    outcomes: [
      "Carbon and grease recovery on working grill surfaces",
      "Minimal disruption to service windows",
      "Fits scheduled deep-clean or recovery call-outs",
    ],
  },
  {
    slug: "fryer-vat-boil-outs",
    name: "Fryer Vat Boil-Outs",
    category: "kitchen-equipment",
    excerpt:
      "Controlled boil-out programmes that remove polymerised oil from vats without damaging equipment.",
    description:
      "Polymerised oil in fryer vats is a quality, safety and equipment-life problem. Grade X performs professional boil-outs as a controlled process: isolation, boil-out, extraction and rinse, then return-to-service. Sites get a cleaner vat and a record of the work — useful for brand standards and for the technicians who inherit the asset next.",
    outcomes: [
      "Professional boil-out and extraction sequence",
      "Protects vat integrity while removing baked-on soil",
      "Service record supplied with the job",
    ],
  },
  {
    slug: "shake-machine-cleaning",
    name: "Shake Machine Cleaning",
    category: "kitchen-equipment",
    excerpt:
      "Hygienic strip-and-clean for shake and frozen-beverage machines used in QSR environments.",
    description:
      "Shake machines are a food-safety hotspot. Grade X follows a disciplined disassembly, clean and reassembly process so dairy and sugar soils are removed from parts that daily wipe-downs never reach. The work is documented and scheduled so franchise operators can show a hygiene programme rather than an ad-hoc clean.",
    outcomes: [
      "Full hygienic clean of production parts",
      "Aligned to QSR operating windows",
      "Supports audit-ready kitchen hygiene files",
    ],
  },
  {
    slug: "cool-room-cleaning",
    name: "Cool Room Cleaning",
    category: "kitchen-equipment",
    excerpt:
      "Floors, walls, racking and seals cleaned to a food-storage standard, including condensate and soil traps.",
    description:
      "Cool rooms accumulate soil at floor junctions, racking feet and door seals — the places auditors look first. Grade X deep-cleans storage environments with food-safe methods, paying attention to drainage, seals and high-touch hardware so the room returns to a condition a facility manager can stand behind.",
    outcomes: [
      "Food-storage hygiene, not a floor mop only",
      "Seals, racking and junctions included",
      "Fits monthly deep-clean cycles",
    ],
  },
  {
    slug: "nightly-kitchen-maintenance",
    name: "Nightly Kitchen Maintenance",
    category: "kitchen-equipment",
    excerpt:
      "After-close programmes that reset cooklines, floors and hygiene points before the next service.",
    description:
      "Nightly maintenance is how high-volume kitchens stay inside brand and food-safety spec between deep cleans. Grade X can run a structured after-close programme covering cookline reset, floor hygiene and nominated equipment — with the same reporting discipline as project work, so multi-site managers can see what was done last night, not just that someone attended.",
    outcomes: [
      "Structured after-close scope, not ad-hoc wiping",
      "Designed for QSR and hospitality close windows",
      "Attendance and scope recorded",
    ],
  },
  {
    slug: "monthly-kitchen-deep-cleaning",
    name: "Monthly Kitchen Deep Cleaning",
    category: "kitchen-equipment",
    excerpt:
      "Periodic deep cleans that reach behind, under and into assets daily teams cannot take offline.",
    description:
      "Monthly deep cleaning is the layer that nightly maintenance cannot reach: behind equipment, into junctions, high-level surfaces and accumulated grease that only comes off with time and the right plant. Grade X schedules these around trading, documents the scope, and ties them to exhaust and equipment programmes so the kitchen is treated as one hygiene system.",
    outcomes: [
      "Scheduled deep-clean scope with access planning",
      "Complements exhaust and equipment recovery",
      "Evidence pack for compliance files",
    ],
  },
  {
    slug: "lobby-cleaning",
    name: "Lobby Cleaning",
    category: "lobby",
    excerpt:
      "Daily-standard lobby hygiene for QSR and hospitality entries that take the same traffic as the kitchen.",
    description:
      "Lobbies are the brand surface customers actually touch. Grade X delivers lobby programmes that match the operational tempo of QSR and clubs: floors, touchpoints, glazing at entry, and the hygiene details that make a site look controlled rather than merely mopped.",
    outcomes: [
      "Entry, floor and touchpoint programmes",
      "Timed around trading, not against it",
      "Can be packaged with kitchen contracts",
    ],
  },
  {
    slug: "monthly-lobby-deep-cleaning",
    name: "Monthly Lobby Deep Cleaning",
    category: "lobby",
    excerpt:
      "Periodic restoration of lobby finishes, edges and high-level surfaces that daily cleans leave behind.",
    description:
      "A monthly lobby deep clean restores edges, high-level dusting, furniture bases and finish recovery that daily attendance never has time for. For shopping-centre food courts and QSR dining rooms it is the difference between a site that looks maintained and one that looks tired under fluorescent light.",
    outcomes: [
      "High-level, edge and finish recovery",
      "Scheduled with kitchen deep-clean windows where useful",
      "Clear scope for facility managers",
    ],
  },
  {
    slug: "play-place",
    name: "Play Place",
    category: "lobby",
    excerpt:
      "Hygienic cleaning of play environments, including attention to staff certification where the site requires it.",
    description:
      "Play places sit at the intersection of hygiene, parent confidence and site compliance. Grade X cleans these environments as a defined service — not an afterthought on a lobby run — and can support sites that require Working With Children Check credentials for nominated staff. Scope, frequency and evidence are agreed with the operator so the area stays both presentable and defensible.",
    outcomes: [
      "Defined play-area hygiene scope",
      "WWCC-ready staffing where the site requires it",
      "Documented attendance for brand and landlord files",
    ],
  },
  {
    slug: "floor-detailing-scrubbing",
    name: "Floor Detailing & Floor Scrubbing",
    category: "exterior",
    excerpt:
      "Mechanical scrubbing and edge detailing for kitchen, back-of-house and front-of-house floor systems.",
    description:
      "Commercial kitchen floors fail at the edges, grout and under-equipment lines. Grade X uses mechanical scrubbing and detailing to recover slip resistance and appearance, including the transitions between cookline, wash-up and customer floor that a mop never resets.",
    outcomes: [
      "Mechanical scrub plus edge and grout attention",
      "Kitchen and FOH floor systems",
      "Improves both presentation and cleanability",
    ],
  },
  {
    slug: "exterior-high-pressure-washing",
    name: "Exterior High-Pressure Washing",
    category: "exterior",
    excerpt:
      "Controlled high-pressure washing for building aprons, docks and grease-affected exterior fabric.",
    description:
      "Exhaust discharge, dock traffic and kitchen waste paths stain the building envelope. Grade X pressure-washes exteriors with control over run-off and adjacent finishes so the site presents cleanly to landlords, brand auditors and the public — without treating the building like a driveway.",
    outcomes: [
      "Grease-affected exterior fabric recovered",
      "Controlled method around glazing and joints",
      "Pairs with exhaust discharge-point hygiene",
    ],
  },
  {
    slug: "building-drive-thru-pressure-cleaning",
    name: "Building & Drive-Thru Pressure Cleaning",
    category: "exterior",
    excerpt:
      "Drive-thru lanes, building skirts and customer approach paths cleaned to a brand-presentation standard.",
    description:
      "Drive-thru is a brand stage. Oil, rubber and food soil collect in lanes and on building skirts where every customer looks. Grade X pressure-cleans these zones as a scheduled presentation service for QSR groups that need the approach path to match the kitchen standard inside.",
    outcomes: [
      "Lanes, skirts and customer approach",
      "Scheduled around trading peaks",
      "Multi-site programmes available",
    ],
  },
  {
    slug: "window-cleaning",
    name: "Window Cleaning",
    category: "exterior",
    excerpt:
      "Interior and exterior glazing programmes for dining rooms, entries and kitchen-adjacent glass.",
    description:
      "Grease film on kitchen-adjacent glass is visible from the dining room. Grade X includes window cleaning as a defined commercial service so glazing is not left as a casual add-on. Interior and exterior programmes can be aligned with lobby and exterior cycles.",
    outcomes: [
      "Interior and exterior glazing",
      "Kitchen-adjacent film addressed, not ignored",
      "Can sit inside a site-wide hygiene contract",
    ],
  },
  {
    slug: "line-marking",
    name: "Line Marking",
    category: "exterior",
    excerpt:
      "Carpark and drive-thru line marking to keep traffic, compliance and brand presentation intact.",
    description:
      "Faded line marking is a safety and presentation defect on QSR and shopping-centre sites. Grade X delivers line marking as part of the exterior commercial offering so facility managers can keep pavement marks, bays and drive-thru guidance readable without briefing a second contractor.",
    outcomes: [
      "Bays, guidance and drive-thru marks",
      "Coordinated with pressure-cleaning programmes",
      "One accountable commercial contractor",
    ],
  },
  {
    slug: "general-commercial-cleaning",
    name: "General Commercial Cleaning",
    category: "exterior",
    excerpt:
      "Broader commercial cleaning for sites that want kitchen-grade accountability across the property.",
    description:
      "Many Grade X clients need more than the kitchen. General commercial cleaning is offered as a disciplined programme — scoped, scheduled and reported — for offices, back-of-house corridors, amenities and shared property spaces that sit alongside the cookline. It is not a generic office-cleaning pitch; it is the same contractor already inside the kitchen.",
    outcomes: [
      "Scoped programmes with the kitchen contractor",
      "Amenities, BOH and property spaces",
      "Single point of accountability for facility managers",
    ],
  },
  {
    slug: "hygiene-sanitation-services",
    name: "Hygiene & Sanitation Services",
    category: "exterior",
    excerpt:
      "Targeted hygiene and sanitation for high-touch and food-adjacent zones that sit outside the cookline.",
    description:
      "Hygiene and sanitation services cover the high-touch, waste and food-adjacent zones that sit around a commercial kitchen: amenities, waste paths, sanitisation of nominated surfaces, and the supporting work that keeps a site inside its food-safety plan. Grade X treats this as specified work with records, not a perfume-and-mop round.",
    outcomes: [
      "Specified high-touch and food-adjacent zones",
      "Food-safe methods in production environments",
      "Records suitable for compliance files",
    ],
  },
];

export const methodology = [
  {
    step: "01",
    title: "Site inspection and assessment",
    body: "The system is walked, photographed and scoped before any cleaning starts. Access, isolation, trading constraints and residual fire load are recorded so the method matches the site, not a generic checklist.",
  },
  {
    step: "02",
    title: "Grease thickness measurement and documentation",
    body: "A digital grease thickness gauge with an external probe — including technology such as the Teinnova Grasmeter — captures real-time micron readings on nominated surfaces. This is the baseline the after-clean reading will be compared against.",
  },
  {
    step: "03",
    title: "Preparation and protection of the work area",
    body: "Cookline, storage and guest-adjacent zones are isolated and protected. Live kitchens stay operational where agreed; otherwise a controlled window is locked with the operator so disruption is planned, not accidental.",
  },
  {
    step: "04",
    title: "Interior steam washing and deep cleaning",
    body: "Professional-grade steam and extraction are used inside the kitchen exhaust system to lift grease and contaminants, reducing reliance on harsh chemical flooding while reaching the interior of the duct run.",
  },
  {
    step: "05",
    title: "Canopy, ductwork and accessible exhaust components",
    body: "Canopy interiors, filters, accessible ductwork and exhaust components are cleaned as one capture-and-extract path. Robotic platform access is used where manned entry is unsafe, impractical, or would extend downtime.",
  },
  {
    step: "06",
    title: "Final inspection and quality control",
    body: "The completed system is inspected against the original scope. Missed soil, standing moisture and incomplete access are treated as defects, not footnotes.",
  },
  {
    step: "07",
    title: "Post-cleaning grease measurement",
    body: "The same digital method is used after the clean. Before-and-after micron readings sit in the job file so effectiveness is objective, not a matter of opinion on the day.",
  },
  {
    step: "08",
    title: "Detailed reporting and client documentation",
    body: "The client receives before/after photos, measurement records, areas cleaned and inspected, compliance documentation and recommendations for the next maintenance interval.",
  },
];

export const faqs: Faq[] = [
  {
    id: "frequency",
    question: "How often should a commercial kitchen exhaust system be cleaned?",
    answer:
      "Frequency depends on cooking volume, fuel type and insurer or brand requirements. High-volume QSR cooklines typically need a tighter cycle than a club kitchen with limited fryer use. Grade X sets the interval after the initial inspection and grease-thickness baseline, then records the recommendation in the job report so facility managers can defend the programme.",
  },
  {
    id: "robotic",
    question: "What does the robotic exhaust cleaning process actually involve?",
    answer:
      "The Grade X machine is a stainless tracked crawler: chevron drive plates, dual high-pressure hoses, an articulating turret with twin nozzles, LED lights and a forward inspection camera. It drives the duct floor, jets the interior, and keeps a live view running. You get that footage plus grease-thickness measurements and photographs — a controlled interior process, not a gadget on a canopy wipe.",
  },
  {
    id: "urgent",
    question: "How quickly can you respond to an urgent or emergency issue?",
    answer:
      "Emergency response is a genuine Grade X service, not a banner. Call 0430 360 162. Perth metropolitan sites are prioritised for urgent grease, odour, discharge or after-hours failures that would otherwise stop a kitchen or fail an inspection.",
  },
  {
    id: "evidence",
    question: "What compliance evidence do we receive after a clean?",
    answer:
      "Every job includes before-and-after photos, digital grease measurement records, a description of areas cleaned and inspected, service reporting, and recommendations for future maintenance. Live video is available during robotic cleans. This pack is designed for facility managers and QSR compliance teams, not as a courtesy PDF.",
  },
  {
    id: "wa-only",
    question: "Are you the only robotic exhaust cleaner in Western Australia?",
    answer:
      "Grade X is currently the only company in WA operating robotic kitchen exhaust cleaning technology. That is a verifiable operational fact and the reason the Technology page exists as its own destination on this site.",
  },
  {
    id: "chemicals",
    question: "Do you rely on harsh chemicals inside the exhaust system?",
    answer:
      "Interior steam washing and extraction are central to the method, which reduces reliance on harsh chemical programmes. That matters for food-production sites and for operators who are actively moving toward less chemically-intensive commercial cleaning.",
  },
  {
    id: "area",
    question: "Do you service our location?",
    answer:
      "Grade X is based in Balga and services the Perth metropolitan area and Western Australia. Confirm your site on the Service area page or request a quote with the suburb and number of kitchens.",
  },
  {
    id: "multi-site",
    question: "Can you programme cleaning across a franchise or multi-site group?",
    answer:
      "Yes. QSR franchises and multi-site restaurant groups are a primary audience. Programmes can combine exhaust, equipment hygiene, nightly maintenance and evidence packs so compliance looks the same at every store.",
  },
];

export const testimonials: Testimonial[] = [];

export const caseStudies: CaseStudy[] = [];

export const posts: BlogPost[] = [
  {
    slug: "why-grease-thickness-beats-visual-inspection",
    title: "Why grease thickness measurement beats a visual exhaust inspection",
    excerpt:
      "Visual ‘looks clean’ is not a fire-risk metric. Micron readings give facility managers something an insurer or brand auditor can actually use.",
    date: "2026-03-12",
    category: "Compliance",
    body: [
      "Most kitchen exhaust reports still lean on photographs and a sentence that the system was cleaned. Photographs matter — Grade X supplies them on every job — but they do not quantify soil. A digital grease thickness gauge with an external probe produces an instant micron reading on the surface you actually care about.",
      "That reading, taken before and after the clean, is the difference between a contractor’s opinion and a compliance artefact. QSR and hotel facility managers are increasingly asked to prove that interior soil was reduced, not that the canopy face was shined.",
      "Grade X uses this method as a standard step, not an optional extra, including technology such as the Teinnova Grasmeter. If your current contractor cannot show you numbers, you do not have a verification system. You have a clean that looks convincing in a gallery.",
    ],
  },
  {
    slug: "robotic-exhaust-cleaning-wa",
    title: "What robotic kitchen exhaust cleaning changes for WA operators",
    excerpt:
      "Grade X is currently the only WA operator with robotic kitchen exhaust cleaning technology. Here is what that actually changes on a live site.",
    date: "2026-04-02",
    category: "Technology",
    body: [
      "Interior duct access is the expensive, slow, high-risk part of exhaust hygiene. Robotic platforms carry cameras into runs that are unsafe or impractical to occupy, and they let the client see the interior during the clean rather than after a hatch is closed.",
      "For Western Australian QSR and hospitality operators that means a shorter disruption argument, a safer method, and live video as part of the evidence pack. It is not a replacement for steam, measurement or craft — it is how those things reach the parts of the system a person should not be inside.",
      "If you are comparing contractors, ask who can show interior video and micron readings from the same visit. That combination is the Grade X position, and it is why technology sits at the centre of this site rather than in a footnote.",
    ],
  },
  {
    slug: "exhaust-cleaning-frequency-perth-kitchens",
    title: "How often Perth commercial kitchens should clean exhaust systems",
    excerpt:
      "Interval is a risk decision. Cooking volume, fryer load and insurer expectations should set the cycle — not the cheapest annual visit.",
    date: "2026-05-18",
    category: "Operations",
    body: [
      "There is no single calendar that fits every Perth kitchen. A high-volume fryer line in a QSR will load an exhaust system faster than a hotel pastry kitchen. Insurers, brand standards and local fire-risk practice all pull the interval in different directions.",
      "The practical approach is a baseline inspection with grease-thickness measurement, a documented recommendation, and a programme that facility managers can show. Grade X builds that recommendation into the job report rather than leaving frequency as a sales conversation.",
      "If a site has had a fire-related scare, a failed inspection, or a change in menu volume, do not wait for the anniversary of the last clean. Emergency response exists for a reason — call 0430 360 162.",
    ],
  },
];

export const reportContents = [
  "Before-and-after photographs",
  "Digital grease measurement records",
  "Service reports for the visit",
  "Areas cleaned and inspected",
  "Compliance documentation",
  "Recommendations for future maintenance",
];

export const credentials = [
  {
    title: "Public liability insurance",
    body: "Cover in place for commercial site work. Current certificate details are held on file and supplied to facility managers on request.",
  },
  {
    title: "Workers compensation insurance",
    body: "Workers compensation insurance is maintained so host sites are not absorbing contractor injury risk.",
  },
  {
    title: "Food-safe cleaning practices",
    body: "Methods are selected for commercial kitchen environments — steam-led interior work, controlled chemistry, and protection of food-production surfaces.",
  },
  {
    title: "WHS and safe work practices",
    body: "Risk assessments, Safe Work Method Statements and site-specific procedures are produced where the job requires them.",
  },
  {
    title: "Staff certifications",
    body: "Relevant certifications — including Working With Children Check where play-place or nominated services require it — are maintained for the staff who attend.",
  },
  {
    title: "ISO-focused quality control",
    body: "Procedures are designed around recognised industry standards: documentation, inspection, and continuous improvement rather than a one-off blast clean.",
  },
];
