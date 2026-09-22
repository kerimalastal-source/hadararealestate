import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Site } from '@/components/Site';
import { copy, isLocale, locales } from '@/content/site';

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() { return locales.map(locale => ({ locale })); }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const d = copy[locale];
  return { title: `${d.heroTitle.replace('\n', ' ')} | HADARA Real Estate`, description: d.heroText, icons: { icon: '/favicon.svg' } };
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <Site locale={locale} />;
}
