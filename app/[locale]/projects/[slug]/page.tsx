import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { copy, isLocale, locales } from '@/content/site';
import { business } from '@/content/business';
import { IconPhone, IconWhatsapp } from '@/components/Icons';
import { Arrow } from '@/components/Arrow';

type Props = { params: Promise<{ locale: string; slug: string }> };

const siteUrl = 'https://www.hadararealestate.com';

export function generateStaticParams() {
  return locales.flatMap(locale => copy[locale].projects.map(p => ({ locale, slug: p.slug })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const p = copy[locale].projects.find(x => x.slug === slug);
  if (!p) notFound();
  const title = `${p.name} | HADARA Real Estate`;
  const canonical = `${siteUrl}/${locale}/projects/${slug}`;
  const languageUrls = { en: `${siteUrl}/en/projects/${slug}`, ar: `${siteUrl}/ar/projects/${slug}`, tr: `${siteUrl}/tr/projects/${slug}`, 'x-default': `${siteUrl}/en/projects/${slug}` };

  return {
    title,
    description: p.description,
    alternates: { canonical, languages: languageUrls },
    openGraph: { type: 'website', url: canonical, siteName: 'HADARA Real Estate', title, description: p.description, images: [p.image] },
    twitter: { card: 'summary_large_image', title, description: p.description, images: [p.image] },
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const d = copy[locale];
  const p = d.projects.find(x => x.slug === slug);
  if (!p) notFound();
  const whatsappHref = `https://wa.me/${business.whatsappNumber}?text=${encodeURIComponent(`${d.whatsappMessage} — ${p.name}`)}`;

  return <>
    <div className="surface-white">
    <section className="page-intro wrap">
      <Link className="back-link" href={`/${locale}/projects`}>← {d.backToProjects}</Link>
      <p className="kicker dark">{p.tag}</p>
      <h1>{p.name}</h1>
    </section>
    </div>
    <section className="project-media wrap">
      <div className="project-hero"><Image src={p.image} alt={p.name} fill priority sizes="100vw"/></div>
      {p.gallery.length > 0 && <div className="gallery-grid" role="group" aria-label={d.projectGalleryLabel}>{p.gallery.map((src, i) => <div className="gallery-item" key={src}><Image src={src} alt={`${p.name} ${i + 2}`} fill sizes="(max-width:720px) 100vw, (max-width:1080px) 50vw, 33vw"/></div>)}</div>}
    </section>
    <section className="project-body wrap">
      <div className="project-body-copy">
        <p className="lead">{p.description}</p>
      </div>
      <div className="project-facts-panel">
        <p className="project-facts-label">{d.projectFactsLabel}</p>
        <ul className="project-facts">{p.facts.map(f => <li key={f}>{f}</li>)}</ul>
      </div>
    </section>
    <section className="project-cta section">
      <div className="wrap project-cta-inner">
        <div><p className="kicker">HADARA · ISTANBUL</p><h2>{d.projectCtaTitle}</h2><p className="lead">{d.projectCtaText}</p></div>
        <div className="project-cta-actions">
          <Link className="button" href={`/${locale}/contact`}>{d.contact}<Arrow/></Link>
          <a className="button light" href={business.phoneHref} dir="ltr">{d.contactPhoneLabel}<IconPhone/></a>
          <a className="button whatsapp-btn" href={whatsappHref} target="_blank" rel="noopener noreferrer">{d.contactWhatsappLabel}<IconWhatsapp/></a>
        </div>
      </div>
    </section>
  </>;
}
