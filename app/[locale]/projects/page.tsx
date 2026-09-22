import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { copy, isLocale, locales } from '@/content/site';
import { Arrow } from '@/components/Arrow';

type Props = { params: Promise<{ locale: string }> };

const siteUrl = 'https://www.hadararealestate.com';

export function generateStaticParams() { return locales.map(locale => ({ locale })); }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const d = copy[locale];
  const canonical = `${siteUrl}/${locale}/projects`;
  const languageUrls = { en: `${siteUrl}/en/projects`, ar: `${siteUrl}/ar/projects`, tr: `${siteUrl}/tr/projects`, 'x-default': `${siteUrl}/en/projects` };

  return {
    title: d.projectsPageMetaTitle,
    description: d.projectsPageMetaDescription,
    alternates: { canonical, languages: languageUrls },
    openGraph: { type: 'website', url: canonical, siteName: 'HADARA Real Estate', title: d.projectsPageMetaTitle, description: d.projectsPageMetaDescription },
    twitter: { card: 'summary', title: d.projectsPageMetaTitle, description: d.projectsPageMetaDescription },
  };
}

export default async function ProjectsPage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const d = copy[locale];

  return <>
    <section className="page-intro wrap">
      <p className="kicker dark">{d.projectsPageKicker}</p>
      <h1>{d.projectsPageTitle}</h1>
      <p className="lead">{d.projectsPageIntro}</p>
    </section>
    <section className="projects-grid-section section wrap">
      <div className="projects-grid">{d.projects.map(p => <article className="project-card" key={p.slug}>
        <Link className="project-card-image" href={`/${locale}/projects/${p.slug}`}><Image src={p.image} alt={p.name} fill sizes="(max-width:720px) 100vw, (max-width:1080px) 50vw, 33vw"/></Link>
        <div className="project-card-copy">
          <p className="project-tag">{p.tag}</p>
          <h3>{p.name}</h3>
          <p>{p.description}</p>
          <Link className="text-link" href={`/${locale}/projects/${p.slug}`}>{d.viewProject}<Arrow/></Link>
        </div>
      </article>)}</div>
    </section>
  </>;
}
