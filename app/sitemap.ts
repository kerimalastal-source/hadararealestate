import type { MetadataRoute } from 'next';
import { copy, locales } from '@/content/site';

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

  const projectsLanguages = {
    en: `${siteUrl}/en/projects`,
    ar: `${siteUrl}/ar/projects`,
    tr: `${siteUrl}/tr/projects`,
    'x-default': `${siteUrl}/en/projects`,
  };

  const projectSlugs = copy.en.projects.map((p) => p.slug);

  return locales.flatMap((locale) => [
    {
      url: `${siteUrl}/${locale}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: locale === 'en' ? 1 : 0.9,
      alternates: { languages },
    },
    {
      url: `${siteUrl}/${locale}/projects`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: locale === 'en' ? 0.9 : 0.8,
      alternates: { languages: projectsLanguages },
    },
    ...projectSlugs.map((slug) => ({
      url: `${siteUrl}/${locale}/projects/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: locale === 'en' ? 0.8 : 0.7,
      alternates: {
        languages: {
          en: `${siteUrl}/en/projects/${slug}`,
          ar: `${siteUrl}/ar/projects/${slug}`,
          tr: `${siteUrl}/tr/projects/${slug}`,
          'x-default': `${siteUrl}/en/projects/${slug}`,
        },
      },
    })),
    {
      url: `${siteUrl}/${locale}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: locale === 'en' ? 0.8 : 0.7,
      alternates: { languages: contactLanguages },
    },
  ]);
}
