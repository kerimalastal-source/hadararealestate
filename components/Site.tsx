import Image from 'next/image';
import Link from 'next/link';
import { copy, type Locale } from '@/content/site';
import { ContactForm } from '@/components/ContactForm';
import { Arrow } from '@/components/Arrow';

export function Site({ locale }: { locale: Locale }) {
  const d = copy[locale];
  return <>
    <section className="hero" id="home"><Image src="/images/istanbul.jpg" alt={d.heroImageAlt} fill priority sizes="100vw" /><div className="hero-overlay"/><div className="wrap hero-copy"><p className="kicker">{d.heroKicker}</p><h1>{d.heroTitle}</h1><p className="hero-text">{d.heroText}</p><a className="button light" href="#projects">{d.explore}<Arrow/></a></div><p className="since">{d.since}</p></section>
    <section className="stats wrap">{d.stats.map(([a,b]) => <div key={b}><strong>{a}</strong><span>{b}</span></div>)}</section>
    <section className="about section wrap" id="about"><div><p className="kicker dark">{d.aboutKicker}</p><h2>{d.aboutTitle}</h2></div><div><p className="lead">{d.aboutText}</p><div className="fields">{d.fields.map(([n,x]) => <div key={n}><span>{n}</span><p>{x}</p></div>)}</div></div></section>
    <section className="projects section" id="projects"><div className="wrap section-heading"><div><p className="kicker dark">{d.projectsKicker}</p><h2>{d.projectsTitle}</h2></div><span className="line"/></div><div className="wrap project-list">{d.projects.map((p,i) => <article className="project" key={p.name}><div className="project-image"><Image src={p.image} alt={p.name} fill sizes="(max-width:800px) 100vw, 50vw"/></div><div className="project-copy"><p className="project-tag">{p.tag}</p><h3>{p.name}</h3><p>{p.description}</p><ul>{p.facts.map(x => <li key={x}>{x}</li>)}</ul><a className="text-link" href="#contact">{d.viewProject}<Arrow/></a></div></article>)}</div></section>
    <section className="amenities section" id="amenities"><div className="wrap amenity-grid"><div><p className="kicker">{d.amenityKicker}</p><h2>{d.amenityTitle}</h2></div><ol>{d.amenities.map((x,i) => <li key={x}><span>{String(i+1).padStart(2,'0')}</span>{x}</li>)}</ol></div></section>
    <section className="invest section wrap" id="invest"><div className="invest-image"><Image src="/images/interior.jpg" alt={d.interiorImageAlt} fill sizes="(max-width:800px) 100vw, 50vw"/></div><div><p className="kicker dark">{d.investKicker}</p><h2>{d.investTitle}</h2><p>{d.investText}</p><ul>{d.investPoints.map(x => <li key={x}>✓ {x}</li>)}</ul></div></section>
    <section className="contact section" id="contact"><div className="wrap contact-grid"><div><p className="kicker">HADARA · ISTANBUL</p><h2>{d.ctaTitle}</h2><p>{d.ctaText}</p></div><ContactForm locale={locale} d={d} /></div></section>
  </>;
}

export function Footer({ locale }: { locale: Locale }) {
  const d = copy[locale];
  return <footer><div className="wrap footer-inner"><Link className="logo" href={`/${locale}`}><strong>HADARA</strong><span>REAL ESTATE</span></Link><p>{d.footer}</p><p>© {new Date().getFullYear()} HADARA Real Estate.</p></div></footer>;
}
