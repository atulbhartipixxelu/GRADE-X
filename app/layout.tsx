import type { Metadata, Viewport } from "next";
import { Figtree, Space_Grotesk, JetBrains_Mono, Syne } from "next/font/google";
import { AosInit } from "@/components/layout/AosInit";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Loader } from "@/components/layout/Loader";
import { SkipLink } from "@/components/layout/SkipLink";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { StickyCtas } from "@/components/layout/StickyCtas";
import { localBusinessJsonLd, pageMeta } from "@/lib/seo";
import { site } from "@/lib/site";
import "./globals.css";

const sans = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  adjustFontFallback: true,
  fallback: ["system-ui", "Segoe UI", "sans-serif"],
});

const display = Space_Grotesk({
  variable: "--font-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  adjustFontFallback: true,
  fallback: ["system-ui", "Segoe UI", "sans-serif"],
});

const mono = JetBrains_Mono({
  variable: "--font-mono-jb",
  subsets: ["latin"],
  display: "swap",
  adjustFontFallback: true,
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  display: "swap",
  adjustFontFallback: true,
  fallback: ["system-ui", "Segoe UI", "sans-serif"],
});

export const viewport: Viewport = {
  themeColor: "#192B4C",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  ...pageMeta(site.tagline, site.description, "/"),
  metadataBase: new URL(site.url),
  manifest: "/manifest.webmanifest",
  icons: {
    icon: [{ url: "/favicon.png", type: "image/png" }],
    apple: "/favicon.png",
    shortcut: "/favicon.png",
  },
  authors: [{ name: site.legalName }],
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en-AU"
      data-theme="light"
      className={`${sans.variable} ${display.variable} ${mono.variable} ${syne.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-white text-[#192B4C]">
        <SkipLink />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessJsonLd()),
          }}
        />
        <Loader />
        <SmoothScroll>
          <Header />
          <main id="main" tabIndex={-1} className="flex-1">
            {children}
          </main>
          <Footer />
          <StickyCtas />
          <AosInit />
        </SmoothScroll>
      </body>
    </html>
  );
}
