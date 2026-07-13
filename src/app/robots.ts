import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/', '/api/', '/search'],
    },
    sitemap: 'https://www.sourcetrace.com/sitemap.xml',
    host: 'https://www.sourcetrace.com',
  };
}
