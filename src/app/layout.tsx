import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
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

export const metadata: Metadata = {
  title: "Sohaib Zahid — Full Stack Web & Mobile Developer",
  description: "Portfolio of Sohaib Zahid, Full Stack Web & Mobile App Developer. Explore my projects, skills, achievements, and experience.",
  keywords: ["Sohaib Zahid", "iDevZone", "Full Stack Developer", "Mobile App Developer", "React Native", "Next.js", "AI", "Portfolio"],
  authors: [{ name: "Sohaib Zahid" }],
  creator: "Sohaib Zahid",
  publisher: "iDevZone",
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
  openGraph: {
    title: "Sohaib Zahid — Full Stack Web & Mobile Developer",
    description: "Portfolio of Sohaib Zahid, Full Stack Web & Mobile App Developer. Explore my projects, skills, achievements, and experience.",
    url: "https://idevzone.com",
    siteName: "iDevZone",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sohaib Zahid — Full Stack Web & Mobile Developer",
    description: "Portfolio of Sohaib Zahid, Full Stack Web & Mobile App Developer.",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${spaceGrotesk.variable} ${inter.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
