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

  const contactLanguages = {
    en: `${siteUrl}/en/contact`,
    ar: `${siteUrl}/ar/contact`,
    tr: `${siteUrl}/tr/contact`,
    'x-default': `${siteUrl}/en/contact`,
  };

  return locales.flatMap((locale) => [
    {
      url: `${siteUrl}/${locale}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: locale === 'en' ? 1 : 0.9,
      alternates: { languages },
    },
    {
      url: `${siteUrl}/${locale}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: locale === 'en' ? 0.8 : 0.7,
      alternates: { languages: contactLanguages },
    },
  ]);
}
