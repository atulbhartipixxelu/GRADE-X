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
  included?: string[];
  suits?: string;
  related?: string[];
  heroAlt?: string;
};

export type Faq = {
  id: string;
  question: string;
  answer: string;
};

export type MethodStep = {
  step: string;
  title: string;
  body: string;
  pass: string;
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
      "Grill Recovery, Fryer Vat Boil-Outs, Shake Machine Cleaning, Cool Room Cleaning, Nightly Kitchen Maintenance, Monthly Kitchen Deep Cleaning, and kitchen floor detailing and scrubbing.",
  },
  lobby: {
    title: "Lobby & Front-of-House",
    description: "Lobby Cleaning, Monthly Lobby Deep Cleaning, and Play Place.",
  },
  exterior: {
    title: "Exterior & General Commercial",
    description:
      "Exterior high-pressure washing, building and drive-thru pressure cleaning, window cleaning, car park line marking, general commercial cleaning, and hygiene and sanitation services.",
  },
};

export const services: Service[] = [
  {
    slug: "kitchen-exhaust-cleaning",
    name: "Kitchen Exhaust Cleaning",
    category: "kitchen-exhaust",
    featured: true,
    excerpt:
      "The whole exhaust system, from canopy to discharge, with the grease measured before and after.",
    description:
      "Kitchen exhaust cleaning covers the system as one path: canopy and filters, ductwork, fan and discharge point, interior steam washing, and robotic access where it is not safe to send a person in. Grease thickness is measured before and after. Photos, a list of what was cleaned and inspected, and a service report sit in the job file.",
    outcomes: [
      "Canopy, filters, ductwork, fan and discharge point",
      "Before and after micron readings",
      "Photos, a service report and recommendations",
    ],
    included: [
      "Canopy and filters",
      "Ductwork",
      "Fan and discharge point",
      "Interior steam washing",
      "Robotic access where it is not safe to send a person in",
    ],
    suits: "Restaurant groups, hotels, clubs and shopping centre food courts.",
    related: ["canopy-cleaning", "steam-cleaning", "kitchen-equipment-hygiene"],
    heroAlt: "Kitchen exhaust canopy and duct system prepared for a measured clean",
  },
  {
    slug: "canopy-cleaning",
    name: "Canopy Cleaning",
    category: "kitchen-exhaust",
    featured: true,
    excerpt:
      "Canopy interiors, filters and capture zones cleaned to food-safe standard with protected prep areas below.",
    description:
      "Grease that collects in canopy interiors and filter banks is a fire load and a hygiene failure waiting to happen. Grade X isolates and protects the work zone, then deep-cleans canopy surfaces, baffles and accessible plenums so extraction actually captures what the cookline produces. The work is sequenced with exhaust cleaning so the canopy, filters and duct are treated as one system.",
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
      "Stainless tracked crawler with dual-hose turret jets and a forward camera, for duct runs that are unsafe or impractical to occupy.",
    description:
      "Western Australia's robotic kitchen exhaust cleaning specialists. The platform is a stainless tracked crawler: chevron drive plates, dual high-pressure hoses, an articulating turret with twin nozzles, LED work lights and a forward inspection camera. It enters duct runs that are unsafe or impractical to occupy, cleans under live visual confirmation, and leaves the interior on record — not just the canopy face. On robotic cleans you can watch the inside of the duct during the clean.",
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
      "UHC (universal holding cabinet), grill, shake machine, steamer, oven and allied cookline assets returned to a food-safe operating condition.",
    description:
      "Exhaust hygiene fails if the cookline itself is carrying soil. Grade X programmes cover UHC (universal holding cabinet) cabinets, grills, shake machines, steamers, ovens and related production equipment so grease, carbon and food residue are removed from the assets that create the exhaust load. Each asset type is treated with the right recovery method rather than a generic degrease.",
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
    excerpt: "Hygienic cleaning of play environments as a defined service, not an add-on to a lobby run.",
    description:
      "Play places sit at the intersection of hygiene, parent confidence and site compliance. Grade X cleans these environments as a defined service. Staff licences and checks for this work: [to be confirmed]. Scope, frequency and evidence are agreed with the operator.",
    outcomes: [
      "Defined play-area hygiene scope",
      "Staff checks confirmed per site before attendance",
      "Documented attendance for brand and landlord files",
    ],
    heroAlt: "Indoor play environment in a QSR dining room, cleaned as a defined hygiene service",
  },
  {
    slug: "floor-detailing-scrubbing",
    name: "Kitchen floor detailing and scrubbing",
    category: "kitchen-equipment",
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
      "Car park and drive-thru line marking to keep traffic, compliance and brand presentation intact.",
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
      "Commercial cleaning for kitchen clients who already use Grade X on the cookline and need the rest of the property kept to the same standard.",
    description:
      "General commercial cleaning is offered for kitchen clients we already look after — offices, back-of-house corridors, amenities and shared property spaces alongside the cookline. Scoped, scheduled and reported. It is the same contractor already inside the kitchen, not a separate generalist pitch.",
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

export const methodology: MethodStep[] = [
  {
    step: "01",
    title: "Site inspection and assessment",
    body: "The system is walked, photographed and scoped before any cleaning starts. Access, isolation, trading constraints and residual fire load are recorded so the method matches the site.",
    pass: "Pass: access, isolation and scope are written down before work starts. Fail: cleaning begins without a recorded inspection.",
  },
  {
    step: "02",
    title: "Grease thickness measurement and documentation",
    body: "A digital grease thickness gauge with an external probe captures micron readings on nominated surfaces. This is the baseline the after-clean reading is compared against. Measuring device: [gauge to be confirmed].",
    pass: "Pass: a before reading is on file for the nominated surfaces. Fail: no number, only a visual note.",
  },
  {
    step: "03",
    title: "Preparation and protection of the work area",
    body: "Cookline, storage and customer-facing zones are isolated and protected. Live kitchens stay operational where agreed; otherwise a controlled window is locked with the operator.",
    pass: "Pass: adjacent areas are protected and the trading window is agreed. Fail: unprotected food or customer areas.",
  },
  {
    step: "04",
    title: "Interior steam washing and deep cleaning",
    body: "Steam and extraction are used inside the kitchen exhaust system to lift grease and contaminants, reducing reliance on harsh chemical flooding while reaching the interior of the duct run.",
    pass: "Pass: interior soil is lifted and extracted, not only washed onto the floor. Fail: standing grease left in the run.",
  },
  {
    step: "05",
    title: "Canopy, ductwork and accessible exhaust components",
    body: "Canopy interiors, filters, accessible ductwork and exhaust components are cleaned as one system. Robotic access is used where sending a person in is unsafe, impractical, or would extend downtime.",
    pass: "Pass: canopy, duct and accessible components in the agreed scope are cleaned. Fail: canopy face only.",
  },
  {
    step: "06",
    title: "Final inspection and quality control",
    body: "The completed system is inspected against the original scope. Missed soil, standing moisture and incomplete access are treated as defects.",
    pass: "Pass: the original scope is checked and defects are closed before handover. Fail: open items left off the report.",
  },
  {
    step: "07",
    title: "Post-cleaning grease measurement",
    body: "The same digital method is used after the clean. Before-and-after micron readings sit in the job file.",
    pass: "Pass: an after reading is recorded on the same surfaces as the before reading. Fail: photos only.",
  },
  {
    step: "08",
    title: "Detailed reporting and client documentation",
    body: "The client receives before/after photos, measurement records, areas cleaned and inspected, and recommendations for the next maintenance interval.",
    pass: "Pass: the report is filed against the site. Fail: attendance with no paperwork.",
  },
];

export const faqs: Faq[] = [
  {
    id: "frequency",
    question: "How often should a commercial kitchen exhaust system be cleaned?",
    answer:
      "Frequency depends on cooking volume, fuel type and insurer or brand requirements. High-volume QSR cooklines typically need a tighter cycle than a club kitchen with limited fryer use. Grade X sets the interval after the first inspection and grease-thickness baseline, then records the recommendation in the job report. [Usual ranges to be added.]",
  },
  {
    id: "robotic",
    question: "What does the robotic exhaust cleaning process actually involve?",
    answer:
      "The Grade X machine is a stainless tracked crawler: chevron drive plates, dual high-pressure hoses, an articulating turret with twin nozzles, LED lights and a forward inspection camera. It drives the duct floor, jets the interior, and keeps a live view running. You get that footage plus grease-thickness measurements and photographs.",
  },
  {
    id: "urgent",
    question: "How fast is urgent response?",
    answer:
      "Call 0430 360 162. We prioritise Perth metro sites for urgent grease, odour, discharge and after-hours failures, and we aim to be there within [X hours]. Outside the metro, we'll confirm timing when you call. Opening hours: [to be confirmed].",
  },
  {
    id: "evidence",
    question: "What evidence do we get?",
    answer:
      "Before and after photos, digital grease-thickness readings, a list of what was cleaned and inspected, a service report and recommendations for next time. On robotic cleans you also get live footage of the inside of the duct.",
  },
  {
    id: "wa-only",
    question: "Is Grade X the only robotic exhaust cleaner in WA?",
    answer:
      "Grade X runs robotic duct-cleaning equipment that, as far as we know, no other WA provider offers [keep this only once it is backed up]. Whoever you use, ask to see interior video and micron readings from the same visit.",
  },
  {
    id: "chemicals",
    question: "Do you rely on harsh chemicals inside the exhaust system?",
    answer:
      "Interior steam washing and extraction are central to the method, which reduces reliance on harsh chemical programmes. That matters for food-production sites.",
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
      "Yes. QSR franchises and multi-site restaurant groups are a primary audience. Programmes can combine exhaust, equipment hygiene, nightly maintenance and evidence packs so records look the same at every store.",
  },
];

export const serviceFaqs: Faq[] = [
  {
    id: "disruption",
    question: "Will this disrupt trading?",
    answer:
      "Cookline, storage and customer-facing zones are isolated and protected. Live kitchens stay operational where agreed; otherwise a window is locked with the operator so disruption is planned.",
  },
  {
    id: "access",
    question: "What access do you need?",
    answer:
      "Access, isolation and trading constraints are recorded at inspection. Hatches, power, water and a clear work area are agreed before the crew arrives.",
  },
  {
    id: "site-need",
    question: "What do you need from the site?",
    answer:
      "A site contact, the agreed access window, and any brand or insurer requirements that should sit in the report. Photos of the issue can be emailed to us after you send the form.",
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
      "Western Australia's robotic kitchen exhaust cleaning specialists. Here is what the crawler changes on a live site.",
    date: "2026-04-02",
    category: "Technology",
    body: [
      "Interior duct access is the expensive, slow, high-risk part of exhaust hygiene. Robotic platforms carry cameras into runs that are unsafe or impractical to occupy, and they let the client see the interior during the clean rather than after a hatch is closed.",
      "For Western Australian QSR and hospitality operators that means a shorter disruption argument, a safer method, and live video as part of the evidence pack on robotic cleans. It is not a replacement for steam, measurement or craft — it is how those things reach the parts of the system a person should not be inside.",
      "If you are comparing contractors, ask who can show interior video and micron readings from the same visit.",
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
      "The practical approach is a baseline inspection with grease-thickness measurement, a documented recommendation, and a programme that facility managers can show. Grade X writes that recommendation into the job report. [Usual frequency ranges to be added once confirmed.]",
      "If a site has had a fire-related scare, a failed inspection, or a change in menu volume, do not wait for the anniversary of the last clean. Call 0430 360 162 for urgent kitchen exhaust issues.",
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
    id: "iso",
    title: "ISO certificates",
    body: "ISO 9001, ISO 14001 and ISO 45001. Certified by [certification body]. Scope: [exact scope]. Certificate numbers and expiry dates: [to be published]. Download the pack, or ask us to send it to your procurement team.",
  },
  {
    id: "public-liability",
    title: "Public liability insurance",
    body: "Cover in place for commercial site work. Insurer: [insurer]. Policy and expiry: [to be published]. Certificate supplied to facility managers on request.",
  },
  {
    id: "workers-comp",
    title: "Workers compensation insurance",
    body: "Workers compensation insurance is maintained so host sites are not absorbing contractor injury risk. Insurer and expiry: [to be published].",
  },
  {
    id: "whs-swms",
    title: "WHS and SWMS",
    body: "Risk assessments, Safe Work Method Statements and site-specific procedures are produced where the job requires them. A sample SWMS: [to be published].",
  },
  {
    id: "chemicals",
    title: "Food-safe chemicals",
    body: "Methods are selected for commercial kitchen environments — steam-led interior work, controlled chemistry, and protection of food-production surfaces. Product list: [to be published].",
  },
  {
    id: "staff",
    title: "Staff licences and checks",
    body: "Staff licences and checks where they apply. Play Place and similar sites: [to be confirmed before we keep a specific check on the page].",
  },
];
