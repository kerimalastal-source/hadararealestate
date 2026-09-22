import { notFound } from 'next/navigation';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Site';
import { FloatingContact } from '@/components/FloatingContact';
import { copy, isLocale } from '@/content/site';
import '@/styles/globals.css';

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'ar' }, { locale: 'tr' }];
}

export default async function LocaleLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const d = copy[locale];
  return <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'}><body><a className="skip" href="#main">{d.skip}</a><Header locale={locale} /><main id="main">{children}</main><Footer locale={locale} /><FloatingContact d={d} /></body></html>;
}
