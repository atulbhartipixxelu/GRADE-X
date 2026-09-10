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

async function ensureDir() {
  await fs.mkdir(dataDir, { recursive: true });
}

async function readJson<T>(file: string, fallback: T): Promise<T> {
  await ensureDir();
  const full = path.join(dataDir, file);
  try {
    const raw = await fs.readFile(full, "utf8");
    return JSON.parse(raw) as T;
  } catch {
    await fs.writeFile(full, JSON.stringify(fallback, null, 2), "utf8");
    return fallback;
  }
}

async function writeJson<T>(file: string, value: T) {
  await ensureDir();
  await fs.writeFile(path.join(dataDir, file), JSON.stringify(value, null, 2), "utf8");
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
