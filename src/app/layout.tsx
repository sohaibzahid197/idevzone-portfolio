import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "iDevZone — Portfolio of Sohaib Zahid",
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
    title: "iDevZone — Portfolio of Sohaib Zahid",
    description: "Portfolio of Sohaib Zahid, Full Stack Web & Mobile App Developer. Explore my projects, skills, achievements, and experience.",
    url: "https://idevzone.com",
    siteName: "iDevZone",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "iDevZone — Portfolio of Sohaib Zahid",
    description: "Portfolio of Sohaib Zahid, Full Stack Web & Mobile App Developer. Explore my projects, skills, achievements, and experience.",
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
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const theme = localStorage.getItem('idevzone-theme') || 'dark';
                if (theme === 'dark') {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
              } catch (e) {
                // Fallback to dark theme if localStorage is not available
                document.documentElement.classList.add('dark');
              }
            `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased transition-colors duration-300`}
      >
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
