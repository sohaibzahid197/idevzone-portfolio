/**
 * Serves /robots.txt. Everything is crawlable — the site is a single public
 * page — and the sitemap is pointed at from the one origin in siteConfig.
 */

import type { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/site-config';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
