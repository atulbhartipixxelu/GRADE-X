import type { Metadata } from "next";
import { Figtree, Space_Grotesk, JetBrains_Mono, Syne, Outfit } from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Loader } from "@/components/layout/Loader";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { localBusinessJsonLd, pageMeta } from "@/lib/seo";
import { site } from "@/lib/site";
import "./globals.css";

const sans = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const display = Space_Grotesk({
  variable: "--font-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const mono = JetBrains_Mono({
  variable: "--font-mono-jb",
  subsets: ["latin"],
  display: "swap",
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  ...pageMeta(site.tagline, site.description, "/"),
  metadataBase: new URL(site.url),
  icons: { icon: "/favicon.png", apple: "/brand/logo-shield.png" },
  keywords: [
    "kitchen exhaust cleaning Perth",
    "robotic exhaust cleaning Western Australia",
    "commercial kitchen hygiene Perth",
    "canopy cleaning WA",
    "grease thickness measurement",
    "commercial cleaning Perth",
  ],
  authors: [{ name: site.legalName }],
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en-AU"
      data-theme="dark"
      className={`${sans.variable} ${display.variable} ${mono.variable} ${syne.variable} ${outfit.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-navy text-ivory">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessJsonLd()),
          }}
        />
        <Loader />
        <SmoothScroll>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
