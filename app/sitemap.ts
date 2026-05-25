import type { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  const now = new Date();

  const routes = [
    { path: '', priority: 1.0, changeFrequency: 'monthly' as const },
    { path: '/productos', priority: 0.9, changeFrequency: 'monthly' as const },
    {
      path: '/productos/aerocoolers',
      priority: 0.8,
      changeFrequency: 'monthly' as const,
    },
    {
      path: '/productos/calentones',
      priority: 0.8,
      changeFrequency: 'monthly' as const,
    },
  ];

  return routes.map((route) => ({
    url: `${base}${route.path}`,
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
