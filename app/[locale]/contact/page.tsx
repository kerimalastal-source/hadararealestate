import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { copy, isLocale, locales } from '@/content/site';
import { business } from '@/content/business';
import { ContactForm } from '@/components/ContactForm';
import { IconClock, IconMail, IconPhone, IconPin, IconWhatsapp } from '@/components/Icons';

type Props = { params: Promise<{ locale: string }> };

const siteUrl = 'https://www.hadararealestate.com';

export function generateStaticParams() { return locales.map(locale => ({ locale })); }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const d = copy[locale];
  const canonical = `${siteUrl}/${locale}/contact`;
  const languageUrls = { en: `${siteUrl}/en/contact`, ar: `${siteUrl}/ar/contact`, tr: `${siteUrl}/tr/contact`, 'x-default': `${siteUrl}/en/contact` };

  return {
    title: d.contactPageMetaTitle,
    description: d.contactPageMetaDescription,
    alternates: { canonical, languages: languageUrls },
    openGraph: { type: 'website', url: canonical, siteName: 'HADARA Real Estate', title: d.contactPageMetaTitle, description: d.contactPageMetaDescription },
    twitter: { card: 'summary', title: d.contactPageMetaTitle, description: d.contactPageMetaDescription },
  };
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const d = copy[locale];
  const whatsappHref = `https://wa.me/${business.whatsappNumber}?text=${encodeURIComponent(d.whatsappMessage)}`;
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(d.contactLocationValue)}&output=embed`;

  return <>
    <section className="page-intro wrap">
      <p className="kicker dark">{d.contactPageKicker}</p>
      <h1>{d.contactPageTitle}</h1>
      <p className="lead">{d.contactPageIntro}</p>
    </section>
    <div className="surface-white">
    <section className="location section wrap">
      <div className="location-map"><iframe src={mapSrc} title={d.contactMapTitle} loading="lazy" referrerPolicy="no-referrer-when-downgrade" /></div>
      <ul className="contact-info">
        <li><IconPin/><div><strong>{d.contactLocationLabel}</strong><p>{d.contactLocationValue}</p></div></li>
        <li><IconPhone/><div><strong>{d.contactPhoneLabel}</strong><a href={business.phoneHref} dir="ltr">{business.phoneDisplay}</a></div></li>
        <li><IconWhatsapp/><div><strong>{d.contactWhatsappLabel}</strong><a href={whatsappHref} target="_blank" rel="noopener noreferrer" dir="ltr">{business.phoneDisplay}</a></div></li>
        <li><IconMail/><div><strong>{d.contactEmailLabel}</strong><a href={`mailto:${business.email}`}>{business.email}</a></div></li>
        <li><IconClock/><div><strong>{d.contactHoursLabel}</strong><p>{d.contactHoursValue}</p></div></li>
      </ul>
    </section>
    </div>
    <section className="contact section" id="contact"><div className="wrap contact-grid"><div><p className="kicker">HADARA · ISTANBUL</p><h2>{d.ctaTitle}</h2><p>{d.ctaText}</p></div><ContactForm locale={locale} d={d} /></div></section>
  </>;
}
