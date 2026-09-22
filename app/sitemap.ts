import type { MetadataRoute } from 'next';
import { locales } from '@/content/site';

const siteUrl = 'https://www.hadararealestate.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const languages = {
    en: `${siteUrl}/en`,
    ar: `${siteUrl}/ar`,
    tr: `${siteUrl}/tr`,
    'x-default': `${siteUrl}/en`,
  };

  return locales.map((locale) => ({
    url: `${siteUrl}/${locale}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: locale === 'en' ? 1 : 0.9,
    alternates: { languages },
  }));
}
