import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.sourcetrace.com';

  const staticRoutes = [
    '',
    '/contact-sales',
    '/partner-with-us',
    '/careers',
    '/docs',
    '/docs/getting-started',
    '/about',
    '/contact',
    '/company/meet-the-team',
    '/legal/privacy-policy',
    '/legal/terms-of-service',
    '/legal/security',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // In production, these would be fetched dynamically from Payload CMS
  // For the generated sitemap, we output the most critical categories
  const dynamicRoutes = [
    '/platform/traceability',
    '/intelligence/ai-engine',
    '/solutions/eudr-compliance',
    '/CropInsights/coffee',
    '/compliance/csrd',
    '/customers/case-studies/cargill',
    '/resources/whitepapers',
    '/resources/blog',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 0.9,
  }));

  return [...staticRoutes, ...dynamicRoutes];
}
