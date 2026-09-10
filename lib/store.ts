import { promises as fs } from "fs";
import path from "path";
import {
  caseStudies,
  faqs,
  posts,
  services,
  testimonials,
  type BlogPost,
  type CaseStudy,
  type Faq,
  type Service,
  type Testimonial,
} from "./content";

const dataDir = path.join(process.cwd(), "data");
const writableDir = process.env.VERCEL
  ? path.join("/tmp", "gradex-data")
  : dataDir;

const memory = new Map<string, unknown>();

export type QuoteRequest = {
  id: string;
  createdAt: string;
  status: "new" | "read" | "closed";
  name: string;
  email: string;
  phone: string;
  company: string;
  suburb: string;
  service: string;
  sites: string;
  urgency: string;
  message: string;
};

export type SiteSettings = {
  notifyEmail: string;
  emergencyNote: string;
  googleAnalyticsId: string;
};

const defaultSettings: SiteSettings = {
  notifyEmail: "gradex.perth@gmail.com",
  emergencyNote: "Emergency response available — call 0430 360 162",
  googleAnalyticsId: "",
};

async function readFrom(full: string) {
  const raw = await fs.readFile(full, "utf8");
  return JSON.parse(raw);
}

async function readJson<T>(file: string, fallback: T): Promise<T> {
  if (memory.has(file)) return memory.get(file) as T;

  const locations = [path.join(dataDir, file), path.join(writableDir, file)];
  for (const full of locations) {
    try {
      const parsed = (await readFrom(full)) as T;
      memory.set(file, parsed);
      return parsed;
    } catch {
      /* try next location */
    }
  }

  memory.set(file, fallback);
  return fallback;
}

async function writeJson<T>(file: string, value: T) {
  memory.set(file, value);
  try {
    await fs.mkdir(writableDir, { recursive: true });
    await fs.writeFile(
      path.join(writableDir, file),
      JSON.stringify(value, null, 2),
      "utf8",
    );
  } catch {
    // Vercel serverless filesystem is read-only except /tmp.
  }
}

export const store = {
  services: () => readJson<Service[]>("services.json", services),
  faqs: () => readJson<Faq[]>("faqs.json", faqs),
  testimonials: () => readJson<Testimonial[]>("testimonials.json", testimonials),
  caseStudies: () => readJson<CaseStudy[]>("case-studies.json", caseStudies),
  posts: () => readJson<BlogPost[]>("posts.json", posts),
  settings: () => readJson<SiteSettings>("settings.json", defaultSettings),
  quotes: () => readJson<QuoteRequest[]>("quotes.json", []),

  saveServices: (value: Service[]) => writeJson("services.json", value),
  saveFaqs: (value: Faq[]) => writeJson("faqs.json", value),
  saveTestimonials: (value: Testimonial[]) => writeJson("testimonials.json", value),
  saveCaseStudies: (value: CaseStudy[]) => writeJson("case-studies.json", value),
  savePosts: (value: BlogPost[]) => writeJson("posts.json", value),
  saveSettings: (value: SiteSettings) => writeJson("settings.json", value),
  saveQuotes: (value: QuoteRequest[]) => writeJson("quotes.json", value),
};
