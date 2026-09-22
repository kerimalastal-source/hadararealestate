import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Site } from '@/components/Site';
import { copy, isLocale, locales } from '@/content/site';

type Props = { params: Promise<{ locale: string }> };

const siteUrl = 'https://www.hadararealestate.com';

const seo = {
  en: {
    title: 'Luxury Real Estate Developer in Istanbul | HADARA',
    description: 'Explore luxury villas and residential developments by HADARA in Istanbul, with considered design, premium amenities, and long-term investment value.',
    keywords: ['Istanbul real estate', 'luxury villas Istanbul', 'property investment Turkey', 'Istanbul residential projects', 'HADARA Real Estate'],
    ogLocale: 'en_US',
  },
  ar: {
    title: 'حضارة للتطوير العقاري في إسطنبول | مشاريع وفلل فاخرة',
    description: 'اكتشف مشاريع حضارة العقارية والفلل الفاخرة في إسطنبول، بتصميم راقٍ ومرافق متكاملة وفرص استثمار عقاري طويلة الأمد في تركيا.',
    keywords: ['عقارات إسطنبول', 'فلل فاخرة في إسطنبول', 'الاستثمار العقاري في تركيا', 'مشاريع سكنية في إسطنبول', 'حضارة العقارية'],
    ogLocale: 'ar_AR',
  },
  tr: {
    title: 'İstanbul Lüks Gayrimenkul Geliştiricisi | HADARA',
    description: 'HADARA’nın İstanbul’daki lüks villa ve konut projelerini keşfedin; seçkin tasarım, kapsamlı sosyal olanaklar ve uzun vadeli yatırım değeri.',
    keywords: ['İstanbul gayrimenkul', 'İstanbul lüks villa', 'Türkiye gayrimenkul yatırımı', 'İstanbul konut projeleri', 'HADARA Gayrimenkul'],
    ogLocale: 'tr_TR',
  },
} as const;

const languageUrls = {
  en: `${siteUrl}/en`,
  ar: `${siteUrl}/ar`,
  tr: `${siteUrl}/tr`,
  'x-default': `${siteUrl}/en`,
};

export function generateStaticParams() { return locales.map(locale => ({ locale })); }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const pageSeo = seo[locale];
  const alternateLocales = locales.filter((item) => item !== locale).map((item) => seo[item].ogLocale);

  return {
    title: pageSeo.title,
    description: pageSeo.description,
    keywords: [...pageSeo.keywords],
    applicationName: 'HADARA Real Estate',
    authors: [{ name: 'HADARA Real Estate', url: siteUrl }],
    creator: 'HADARA Real Estate',
    publisher: 'HADARA Real Estate',
    category: 'Real Estate',
    alternates: {
      canonical: `${siteUrl}/${locale}`,
      languages: languageUrls,
    },
    openGraph: {
      type: 'website',
      url: `${siteUrl}/${locale}`,
      siteName: 'HADARA Real Estate',
      title: pageSeo.title,
      description: pageSeo.description,
      locale: pageSeo.ogLocale,
      alternateLocale: alternateLocales,
    },
    twitter: {
      card: 'summary',
      title: pageSeo.title,
      description: pageSeo.description,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
        'max-video-preview': -1,
      },
    },
    icons: { icon: '/favicon.svg' },
  };
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const pageSeo = seo[locale];
  const canonical = `${siteUrl}/${locale}`;
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${siteUrl}/#organization`,
        name: 'HADARA Real Estate',
        url: siteUrl,
        logo: `${siteUrl}/favicon.svg`,
        foundingDate: '2014',
        description: pageSeo.description,
        areaServed: ['Istanbul', 'Türkiye'],
      },
      {
        '@type': 'WebSite',
        '@id': `${siteUrl}/#website`,
        url: siteUrl,
        name: 'HADARA Real Estate',
        publisher: { '@id': `${siteUrl}/#organization` },
        inLanguage: locales,
      },
      {
        '@type': 'WebPage',
        '@id': `${canonical}#webpage`,
        url: canonical,
        name: pageSeo.title,
        description: pageSeo.description,
        isPartOf: { '@id': `${siteUrl}/#website` },
        about: { '@id': `${siteUrl}/#organization` },
        inLanguage: locale,
      },
    ],
  };

  return <>
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, '\\u003c') }}
    />
    <Site locale={locale} />
  </>;
}
