import type { NextConfig } from "next";

// Applied to every response. The site is fully static with one POST route, so
// it can afford a strict policy without breaking anything.
const securityHeaders = [
  // Stop the browser from MIME-sniffing a response into something executable.
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  // No other origin has a reason to frame this page.
  { key: 'X-Frame-Options', value: 'DENY' },
  // Send the origin cross-site, the full path same-origin.
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  // Nothing here needs camera, microphone or geolocation.
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()' },
  // Only meaningful once the site is served over HTTPS on its own domain.
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
];

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
    ],
  },
  // Silences the workspace-root warning caused by stray lockfiles in the parent
  // directories (~/package-lock.json and ~/Desktop/package-lock.json), which made
  // Next infer the home directory as the project root.
  turbopack: {
    root: __dirname,
  },
  async headers() {
    return [{ source: '/:path*', headers: securityHeaders }];
  },
};

export default nextConfig;
