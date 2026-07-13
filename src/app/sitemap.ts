import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.sourcetrace.com';

  const staticRoutes = [
    '',
    '/about',
    '/careers',
    '/case-studies',
    '/contact',
    '/contact-sales',
    '/docs',
    '/search',
    '/company/meet-the-team',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  // Crop Insights routes
  const cropRoutes = [
    '/CropInsights/cocoa',
    '/CropInsights/coffee',
    '/CropInsights/cotton',
    '/CropInsights/rice',
    '/CropInsights/tea',
    '/CropInsights/fruits-vegetables',
    '/CropInsights/grains',
    '/CropInsights/palm-oil',
    '/CropInsights/rubber',
    '/CropInsights/seed-production',
    '/CropInsights/spices',
    '/CropInsights/sugarcane',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.85,
  }));

  // Solution routes
  const solutionRoutes = [
    '/solutions',
    '/solutions/certification-management',
    '/solutions/esg-reporting',
    '/solutions/eudr-compliance',
    '/solutions/farmer-livelihoods',
    '/solutions/impact-measurement',
    '/solutions/responsible-sourcing',
    '/solutions/smallholder-management',
    '/solutions/supply-chain-traceability',
    '/solutions/sustainable-sourcing',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '/solutions' ? 0.9 : 0.85,
  }));

  // Intelligence routes
  const intelligenceRoutes = [
    '/intelligence/ai-engine',
    '/intelligence/carbon-monitoring',
    '/intelligence/climate-risk',
    '/intelligence/deforestation-monitoring',
    '/intelligence/geospatial-intelligence',
    '/intelligence/predictive-insights',
    '/intelligence/regenerative-agriculture',
    '/intelligence/traceability-graph',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.85,
  }));

  // Compliance routes
  const complianceRoutes = [
    '/compliance',
    '/compliance/cbam',
    '/compliance/csrd',
    '/compliance/esrs',
    '/compliance/eudr',
    '/compliance/forest-risk',
    '/compliance/scope-3-emissions',
    '/compliance/sustainability-reporting',
    '/compliance/cbam/solutions',
    '/compliance/csrd/solutions',
    '/compliance/esrs/solutions',
    '/compliance/eudr/solutions',
    '/compliance/forest-risk/solutions',
    '/compliance/scope-3-emissions/solutions',
    '/compliance/sustainability-reporting/solutions',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '/compliance' ? 0.9 : 0.8,
  }));

  return [
    ...staticRoutes,
    ...cropRoutes,
    ...solutionRoutes,
    ...intelligenceRoutes,
    ...complianceRoutes,
  ];
}
