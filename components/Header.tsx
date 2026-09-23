'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useMemo, useRef, useState } from 'react';
import { copy, locales, type Locale } from '@/content/site';
import { IconSearch } from '@/components/Icons';
import { Arrow } from '@/components/Arrow';

export function Header({ locale }: { locale: Locale }) {
  const d = copy[locale];
  const [menu, setMenu] = useState(false), [search, setSearch] = useState(false), [query, setQuery] = useState('');
  const input = useRef<HTMLInputElement>(null), dialog = useRef<HTMLDialogElement>(null);
  const searchTrigger = useRef<HTMLButtonElement | null>(null), shortcut = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!search) return;
    const modal = dialog.current;
    const overflow = document.body.style.overflow;
    modal?.showModal();
    document.body.style.overflow = 'hidden';
    input.current?.focus();
    return () => {
      modal?.close();
      document.body.style.overflow = overflow;
      // The menu trigger is hidden after opening search on mobile.
      const trigger = searchTrigger.current;
      (trigger?.getClientRects().length ? trigger : shortcut.current)?.focus();
    };
  }, [search]);
  useEffect(() => { const close = (e: KeyboardEvent) => e.key === 'Escape' && setMenu(false); document.addEventListener('keydown', close); return () => document.removeEventListener('keydown', close); }, []);
  const openSearch = (trigger: HTMLButtonElement) => { searchTrigger.current = trigger; setMenu(false); setQuery(''); setSearch(true); };
  const results = useMemo(() => [
    { label: d.nav[1], text: d.aboutText, href: `/${locale}#about` },
    { label: d.nav[2], text: d.projectsPageIntro, href: `/${locale}/projects` },
    ...d.projects.map(p => ({ label: p.name, text: `${p.tag} ${p.description}`, href: `/${locale}/projects/${p.slug}` })),
    { label: d.nav[3], text: `${d.investTitle} ${d.investText}`, href: `/${locale}#invest` },
    { label: d.amenityTitle, text: d.amenities.join(' '), href: `/${locale}#amenities` },
    { label: d.nav[4], text: d.contactPageIntro, href: `/${locale}/contact` },
  ].filter(x => !query.trim() || `${x.label} ${x.text}`.toLocaleLowerCase(locale).includes(query.trim().toLocaleLowerCase(locale))), [d, locale, query]);
  const targets = [`/${locale}#home`, `/${locale}#about`, `/${locale}/projects`, `/${locale}#invest`, `/${locale}/contact`];
  return <>
    <header className="header"><div className="header-inner"><Link className="logo" href={`/${locale}`}><Image src="/images/logo.png" alt="HADARA" width={730} height={894} className="logo-mark" priority /><span className="logo-text"><strong>HADARA</strong><span>REAL ESTATE</span></span></Link>
      <nav id="site-navigation" className={menu ? 'nav open' : 'nav'}>{d.nav.map((x, i) => <a key={x} href={targets[i]} onClick={() => setMenu(false)}>{x}</a>)}<button className="search-button nav-search" onClick={e => openSearch(e.currentTarget)} aria-haspopup="dialog" aria-controls="site-search"><IconSearch/><span>{d.search}</span></button></nav>
      <div className="header-actions"><button ref={shortcut} className="search-button search-shortcut" onClick={e => openSearch(e.currentTarget)} aria-label={d.search} aria-haspopup="dialog" aria-controls="site-search"><IconSearch/></button><div className="languages">{locales.map(l => <Link key={l} href={`/${l}`} aria-current={l === locale ? 'page' : undefined}>{l.toUpperCase()}</Link>)}</div><a className="header-cta" href={`/${locale}/contact`}>{d.contact}<b>↗</b></a><button className="menu" onClick={() => setMenu(!menu)} aria-expanded={menu} aria-controls="site-navigation" aria-label={menu ? d.closeMenu : d.openMenu}>{menu ? '×' : '☰'}</button></div>
    </div></header>
    <dialog ref={dialog} id="site-search" className="search-modal" aria-labelledby="site-search-title" onCancel={() => setSearch(false)} onClick={e => e.target === e.currentTarget && setSearch(false)}>
      <div className="search-panel">
        <div className="search-heading"><h2 id="site-search-title">{d.search}</h2><button className="search-close" onClick={() => setSearch(false)} aria-label={d.closeSearch}><span aria-hidden="true">×</span></button></div>
        <label className="search-field"><IconSearch/><input ref={input} type="search" aria-label={d.search} value={query} onChange={e => setQuery(e.target.value)} placeholder={d.searchPlaceholder} /></label>
        <div className="results" aria-live="polite" aria-atomic="true">{results.length ? results.map(r => <a key={r.label} href={r.href} onClick={() => setSearch(false)}><strong>{r.label}</strong><span>{r.text}</span><b aria-hidden="true"><Arrow/></b></a>) : <p className="search-empty">{d.noResults}</p>}</div>
      </div>
    </dialog>
  </>;
}
