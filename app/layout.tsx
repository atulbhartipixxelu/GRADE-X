import type { Metadata } from "next";
import { Figtree, Lexend, JetBrains_Mono } from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Loader } from "@/components/layout/Loader";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { localBusinessJsonLd, pageMeta } from "@/lib/seo";
import { site } from "@/lib/site";
import "./globals.css";

const sans = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const display = Lexend({
  variable: "--font-lexend",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const mono = JetBrains_Mono({
  variable: "--font-mono-jb",
  subsets: ["latin"],
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
      suppressHydrationWarning
      className={`${sans.variable} ${display.variable} ${mono.variable} h-full antialiased`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("gx-theme");if(t!=="light"&&t!=="dark")t="dark";document.documentElement.setAttribute("data-theme",t);document.documentElement.style.colorScheme=t;}catch(e){document.documentElement.setAttribute("data-theme","dark");document.documentElement.style.colorScheme="dark";}})();`,
          }}
        />
      </head>
      <body className="flex min-h-full flex-col bg-navy text-ivory">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessJsonLd()),
          }}
        />
        <ThemeProvider>
          <Loader />
          <SmoothScroll>
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}
