import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import { siteConfig } from "@/lib/site-config";
import { skills } from "@/lib/data";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const title = `${siteConfig.name} — ${siteConfig.role}`;
const description = `Portfolio of ${siteConfig.name}, ${siteConfig.role}. Explore my projects, skills, achievements, and experience.`;

/**
 * Person + WebSite structured data, built from siteConfig so the machine
 * readable identity can never drift from what the page renders. Serialised
 * with JSON.stringify — never hand-written — and "<" is escaped so a future
 * data edit can not break out of the script tag.
 */
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${siteConfig.url}/#person`,
      name: siteConfig.name,
      alternateName: siteConfig.brand,
      url: siteConfig.url,
      jobTitle: siteConfig.role,
      email: `mailto:${siteConfig.email}`,
      image: `${siteConfig.url}/profile-photo.jpeg`,
      address: {
        "@type": "PostalAddress",
        // siteConfig.location holds the display form, "Faisalabad, Pakistan".
        addressLocality: "Faisalabad",
        addressCountry: "PK",
      },
      sameAs: [siteConfig.social.github, siteConfig.social.linkedin],
      // Technologies only. The 'tools' bucket also carries editors and design
      // apps (VS Code, Postman, Figma), which read as keyword stuffing here.
      knowsAbout: skills
        .filter((skill) => skill.category !== "tools")
        .map((skill) => skill.label),
    },
    {
      "@type": "WebSite",
      "@id": `${siteConfig.url}/#website`,
      url: siteConfig.url,
      name: siteConfig.brand,
      inLanguage: "en",
      author: { "@id": `${siteConfig.url}/#person` },
    },
  ],
};

const structuredDataJson = JSON.stringify(structuredData).replace(/</g, "\\u003c");

export const metadata: Metadata = {
  // Absolute base for every relative URL below (canonical, OG and Twitter
  // images). Without it Next silently falls back to localhost off Vercel.
  metadataBase: new URL(siteConfig.url),
  title,
  description,
  keywords: [siteConfig.name, siteConfig.brand, "Full Stack Developer", "Mobile App Developer", "React Native", "Next.js", "AI", "Portfolio"],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  publisher: siteConfig.brand,
  // Self-referencing canonical, so preview deploys and www/non-www variants
  // are not indexed as duplicates of production.
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
  openGraph: {
    title,
    description,
    url: "/",
    siteName: siteConfig.brand,
    locale: "en_US",
    type: "website",
    // Rendered by src/app/opengraph-image.tsx. Declared explicitly rather than
    // left to the file convention so the card is visible in this file.
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: title,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${spaceGrotesk.variable} ${inter.variable} antialiased`}
        suppressHydrationWarning
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:rounded-lg focus:bg-blue-500 focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-white"
        >
          Skip to main content
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: structuredDataJson }}
        />
        {children}
      </body>
    </html>
  );
}
