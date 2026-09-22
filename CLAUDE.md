# HADARA Real Estate — project context

Marketing site for حضارة للتطوير العقاري (HADARA Real Estate), a luxury real
estate developer based in Istanbul. Next.js 16 (App Router) + TypeScript,
no CSS framework, deployed on Vercel. Multilingual: English, Arabic (RTL),
Turkish.

Keep this file up to date as the project evolves — add new sections when a
decision, convention, or piece of business info would otherwise only live
in chat history. Don't let it go stale.

## Stack & structure

- `content/site.ts` — all translatable UI copy, keyed by locale (`en`/`ar`/`tr`)
  under the `SiteCopy` type. Every string on the site lives here, not inline
  in components. When adding a field, add it to the type first, then all
  three locale blocks (search for the previous key to keep them aligned).
- `content/business.ts` — non-translatable business constants (phone,
  WhatsApp, email). Doesn't belong in `site.ts` because it's the same value
  across languages, just displayed with translated labels.
- `components/Site.tsx` — homepage sections (hero, about, projects,
  amenities, invest, contact CTA) + `Footer`.
- `components/Header.tsx` — sticky nav, language switcher, search modal.
  Client component. All internal links are locale-prefixed absolute paths
  (`/${locale}#about`, `/${locale}/contact`, etc.), not bare `#anchor`s —
  the header renders on every route (home, `/contact`), so a bare `#about`
  would silently 404-scroll on any page that isn't the homepage.
- `components/ContactForm.tsx` — client component, used on both the
  homepage contact section and the dedicated `/contact` page. Validates
  client-side, posts JSON to `/api/contact`.
- `app/api/contact/route.ts` — server-side validation + sends the lead by
  email via Resend. Required env vars: `RESEND_API_KEY` (sensitive),
  `CONTACT_TO_EMAIL` (plain). Already set in Vercel project settings for
  all environments. Returns a generic error to the client on any failure
  (misconfiguration, Resend rejection) and logs the real reason via
  `console.error` for the Vercel function logs — never expose internals to
  the visitor.
- `app/[locale]/page.tsx` — homepage, SEO metadata + JSON-LD.
- `app/[locale]/contact/page.tsx` — dedicated contact page: map embed
  (Beylikdüzü, Istanbul, no API key needed — plain
  `google.com/maps?q=...&output=embed`), icon list of contact details, then
  the same `ContactForm`.
- `components/FloatingContact.tsx` — fixed WhatsApp + call buttons,
  bottom-right on every page (rendered from `app/[locale]/layout.tsx`).
- `styles/globals.css` — single hand-written stylesheet, no framework.
  Design tokens as CSS custom properties on `:root` (`--ink`, `--forest`,
  `--deep`, `--gold`, `--cream`, `--line`, `--wrap`). Dense, minified-ish
  formatting is the established convention here — match it rather than
  reformatting into one-rule-per-line.

## Conventions worth knowing before editing

- JSX is written dense/compact (little whitespace, chained ternaries,
  inline maps) — this is the codebase's existing style, not a mistake to
  "clean up." Match it in new components.
- RTL: `<html dir="rtl">` is set for `ar`. Any Latin-script content shown
  inline in Arabic copy (phone numbers, emails) needs `dir="ltr"` on that
  specific element or the digit groups render reversed (bidi reordering
  bug — hit this once on the contact page's phone number).
- No component library, no icon library — `components/Icons.tsx` has small
  hand-authored inline SVGs matching the site's thin-line aesthetic. Keep
  new icons consistent with that (stroke, not filled; `currentColor`).
- Comments are rare on purpose; only added for non-obvious constraints.

## Deployment

- GitHub: `kerimalastal-source/hadararealestate`, default branch `main`.
- Vercel project: `hadararealestate` (team `hadara1`). Auto-deploys on push
  to `main`. Custom domain `www.hadararealestate.com` (verified).
- Env vars (Production/Preview/Development): `RESEND_API_KEY`,
  `CONTACT_TO_EMAIL=info@byhadara.com`.

## Business info (verify with the client before changing)

- Phone / WhatsApp: +90 531 930 9214 (same number for both).
- Email: info@byhadara.com
- Location shown on site: Beylikdüzü, Istanbul, Türkiye (no street-level
  address given).
- Working hours: Monday–Saturday, 9:00 AM–6:00 PM. Closed Sundays.
- No social media accounts yet.
- Resend account is in sandbox mode (domain `hadararealestate.com` not yet
  verified in Resend) — emails can only be delivered to the address the
  Resend account was signed up with (`info@byhadara.com`). Verifying the
  domain (adding DNS records) would unlock sending to any recipient and a
  branded from-address instead of `onboarding@resend.dev`.

## Known gaps / ideas raised but not yet acted on

- Project photos are generic stock images that don't match what's
  described (a villa project shows a glass tower, the "invest" section
  shows a hotel room, one project reuses the hero's own photo). Needs real
  photos or renders per project.
- Only 2 projects listed — thin for a developer's credibility.
- No pricing/payment-plan info, no per-project detail pages, no project
  photo galleries.
- No press mentions, licenses, or testimonials for trust-building.
