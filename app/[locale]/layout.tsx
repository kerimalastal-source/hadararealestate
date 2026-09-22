import { notFound } from 'next/navigation';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Site';
import { copy, isLocale } from '@/content/site';
import '@/styles/globals.css';

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'ar' }, { locale: 'tr' }];
}

export default async function LocaleLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'}><body><a className="skip" href="#main">{copy[locale].skip}</a><Header locale={locale} /><main id="main">{children}</main><Footer locale={locale} /></body></html>;
}
