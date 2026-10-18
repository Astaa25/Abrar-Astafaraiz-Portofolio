import { MetadataRoute } from 'next';
import { DataService } from '@/services/data-service';

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://abrar-astafaraiz.vercel.app';
  const content = DataService.getPublishedContent();

  const routes: MetadataRoute.Sitemap = [
    {
      url: `${siteUrl}`,
      lastModified: content.lastUpdated ? new Date(content.lastUpdated) : new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
  ];

  return routes;
}
