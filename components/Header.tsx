'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useMemo, useRef, useState } from 'react';
import { copy, locales, type Locale } from '@/content/site';

export function Header({ locale }: { locale: Locale }) {
  const d = copy[locale];
  const [menu, setMenu] = useState(false), [search, setSearch] = useState(false), [query, setQuery] = useState('');
  const input = useRef<HTMLInputElement>(null);
  useEffect(() => { if (search) input.current?.focus(); }, [search]);
  useEffect(() => { const close = (e: KeyboardEvent) => e.key === 'Escape' && (setSearch(false), setMenu(false)); document.addEventListener('keydown', close); return () => document.removeEventListener('keydown', close); }, []);
  const results = useMemo(() => [
    { label: d.nav[1], text: d.aboutText, href: `/${locale}#about` },
    ...d.projects.map(p => ({ label: p.name, text: `${p.tag} ${p.description}`, href: `/${locale}#projects` })),
    { label: d.nav[3], text: `${d.investTitle} ${d.investText}`, href: `/${locale}#invest` },
    { label: d.amenityTitle, text: d.amenities.join(' '), href: `/${locale}#amenities` },
  ].filter(x => !query.trim() || `${x.label} ${x.text}`.toLocaleLowerCase(locale).includes(query.toLocaleLowerCase(locale))), [d, locale, query]);
  const targets = [`/${locale}#home`, `/${locale}#about`, `/${locale}#projects`, `/${locale}#invest`, `/${locale}/contact`];
  return <>
    <header className="header"><div className="header-inner"><Link className="logo" href={`/${locale}`}><Image src="/images/logo.png" alt="HADARA" width={730} height={894} className="logo-mark" priority /><span className="logo-text"><strong>HADARA</strong><span>REAL ESTATE</span></span></Link>
      <nav className={menu ? 'nav open' : 'nav'}>{d.nav.map((x, i) => <a key={x} href={targets[i]} onClick={() => setMenu(false)}>{x}</a>)}</nav>
      <div className="header-actions"><button className="search-button" onClick={() => setSearch(true)} aria-label={d.search}><span>⌕</span>{d.search}</button><div className="languages">{locales.map(l => <Link key={l} href={`/${l}`} aria-current={l === locale ? 'page' : undefined}>{l.toUpperCase()}</Link>)}</div><a className="header-cta" href={`/${locale}/contact`}>{d.contact}<b>↗</b></a><button className="menu" onClick={() => setMenu(!menu)} aria-expanded={menu}>{menu ? '×' : '☰'}</button></div>
    </div></header>
    {search && <div className="search-modal" role="dialog" aria-modal="true" onMouseDown={e => e.target === e.currentTarget && setSearch(false)}><div className="search-panel"><button className="search-close" onClick={() => setSearch(false)}>×</button><label>{d.search}<input ref={input} type="search" value={query} onChange={e => setQuery(e.target.value)} placeholder={d.searchPlaceholder} /></label><div className="results">{results.length ? results.map(r => <a key={r.label} href={r.href} onClick={() => setSearch(false)}><strong>{r.label}</strong><span>{r.text}</span><b>→</b></a>) : <p>{d.noResults}</p>}</div></div></div>}
  </>;
}
