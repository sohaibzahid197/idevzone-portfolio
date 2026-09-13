/**
 * Serves /sitemap.xml. The portfolio is a single page, so there is one entry;
 * add a URL here for every route that ships later.
 */

import type { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/site-config';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteConfig.url,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
  ];
}
