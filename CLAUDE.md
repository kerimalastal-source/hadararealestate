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
- `content/countryCodes.ts` — full world list of `{name, iso2, dial}` for
  the contact form's phone country-code `<select>`, plus a `flagEmoji()`
  helper (built from ISO2 via Unicode regional indicators, not hand-typed)
  and `priorityIso2` (Turkey + Gulf countries, shown first in their own
  optgroup since that's HADARA's actual audience).
- `components/Site.tsx` — homepage sections (hero, about, projects teaser,
  amenities, invest, contact CTA) + `Footer`. The homepage's own `#projects`
  section still exists as a teaser (same 3 cards, big alternating layout),
  but its "View project" links and the hero's "Explore our projects" button
  now go to the dedicated `/projects` pages below, not to that anchor.
- `components/Header.tsx` — sticky nav, language switcher, search modal.
  Client component. All internal links are locale-prefixed absolute paths
  (`/${locale}#about`, `/${locale}/projects`, `/${locale}/contact`, etc.),
  not bare `#anchor`s — the header renders on every route, so a bare
  `#about` would silently 404-scroll on any page that isn't the homepage.
  The nav's "Projects" item and the search modal's per-project results both
  point at the dedicated project pages (see below), not a homepage anchor.
- `app/[locale]/projects/page.tsx` — projects listing page: intro (reusing
  the `.page-intro` pattern from the contact page) + a 3-column card grid
  (`.projects-grid`/`.project-card`), one card per `copy[locale].projects`
  entry, each linking to its detail page.
- `app/[locale]/projects/[slug]/page.tsx` — one page per project (slug is
  locale-invariant, e.g. `lotus-koru`), statically generated for every
  locale × project via `generateStaticParams`. Layout, top to bottom: back
  link, tag + name, then one `.project-media` block holding the hero image
  and (directly under it, no separate section) the `gallery` as an
  always-3-across row — keep hero + gallery together like this rather than
  splitting them into separate sections; a 2-column gallery grid stranded
  the 3rd photo alone in its own row, which read as broken/unfinished.
  Below that: description + a `facts` panel (`.project-facts-panel`), then
  a bottom CTA band (`.project-cta`) with three buttons — Contact page,
  phone (`tel:`), and WhatsApp (`wa.me`, prefilled with the project's name
  appended to the generic `whatsappMessage`). An unknown `slug` calls
  Next's `notFound()`.
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
  `--deep`, `--gold`, `--cream`, `--ivory`, `--line`, `--wrap`). The ivory
  canvas (`#F7F5F0`) is balanced with `.surface-white` bands around the
  homepage stats/about, contact location, and project detail intro. Project
  cards and facts panels stay white; dark sections retain their colors.
  Dense, minified-ish
  formatting is the established convention here — match it rather than
  reformatting into one-rule-per-line.
- `public/images/logo.png` / `logo-gold.png` — the real HADARA "HE" mark,
  sourced from the client's Google Drive (Hadara Real Estate folder) and
  processed locally (trimmed, JPEG white knocked out to alpha with a
  thresholded — not linear — luma cutoff, see git history for the script)
  into two transparent PNGs: plain ink for the header (white bg), gold
  (`#c6a764`, matches `--gold`) for the footer (dark bg). Used via
  `.logo-mark` / `.footer-logo-mark` in `Header.tsx` and `Site.tsx`'s
  `Footer`. `app/icon.png` and `app/apple-icon.png` (Next's file-based
  favicon convention — no manual `<link>` or metadata needed) are the same
  mark, composited onto transparent/white canvases respectively. Sizing
  mirrors the sibling `hadarahospitality` site's logo exactly (76px header
  / 42px footer) at the client's request — check that repo again before
  changing these if it's redesigned.

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
- A native `<select>` with long option text (e.g. full country names) sizes
  its closed-state width to the *widest* option in Chromium — it silently
  squeezed a sibling flex item (`.phone-field input`) to zero width once
  the country list grew past a handful of entries. Fixed with an explicit
  `width` on the select instead of `auto`, plus `min-width:0` on the input
  (the standard flex-shrink fix). Worth remembering before adding another
  `<select>` next to a flex sibling.

## Deployment

- GitHub: `kerimalastal-source/hadararealestate`, default branch `main`.
- Vercel project: `hadararealestate` (team `hadara1`). Auto-deploys on push
  to `main`. Custom domain `www.hadararealestate.com` (verified).
- Env vars (Production/Preview/Development): `RESEND_API_KEY`,
  `CONTACT_TO_EMAIL=info@byhadara.com`,
  `CONTACT_FROM_EMAIL=HADARA Real Estate <no-reply@hadararealestate.com>`.
- `hadararealestate.com` uses Vercel nameservers (`ns1`/`ns2.vercel-dns.com`)
  — DNS for it is managed in the Vercel dashboard even though the domain
  isn't a Vercel-registered domain (so `list_domains` won't show it, only
  `list_project_domains` will). `byhadara.com` (the client's separate email
  domain, used for `info@byhadara.com`) is on Wix nameservers instead —
  different provider, not reachable through Vercel's DNS tools.

## Business info (verify with the client before changing)

- Phone / WhatsApp: +90 531 930 9214 (same number for both).
- Email: info@byhadara.com — no mailbox exists yet at hadararealestate.com,
  and the client wants leads to keep landing at info@byhadara.com even
  after domain verification (that's just about unlocking sending, not
  where mail is received).
- Location shown on site: Beylikdüzü, Istanbul, Türkiye (no street-level
  address given).
- Working hours: Monday–Saturday, 9:00 AM–6:00 PM. Closed Sundays.
- Social accounts exist (found on the client's Wix site, `byhadara.com`,
  Sept 2026 — not previously listed here): LinkedIn
  `tr.linkedin.com/company/hadaraps`, Instagram `@byhadara`, Facebook
  `byhadara`. Not yet linked from this Next.js site.
- `hadararealestate.com` is verified in Resend as of 2026-09-23 (client did
  this themselves in the Resend dashboard, using its "Auto configure"
  integration with Vercel to add the DNS records). Sending is no longer
  sandboxed — Resend can now deliver to any recipient, and outgoing mail
  uses the branded `CONTACT_FROM_EMAIL` above instead of
  `onboarding@resend.dev`.

## Projects data sourced from the client's Wix site

The `projects` array in `content/site.ts` (3 entries, all locales; each
with `slug`, `name`, `tag`, `description`, `facts`, a cover `image`, and a
`gallery` of 3 extra photo URLs) was populated from the client's live Wix
site (`byhadara.com`), read via the Wix MCP connector in Sept 2026. It now
also backs the dedicated `/projects` + `/projects/[slug]` pages (see Stack
& structure above) — the homepage's `#projects` teaser reuses the same
array.

- **Marmara Haven Villa** — kept its existing (previously client-supplied)
  name/specs; only the photo was swapped for a real one.
- **Lotus Yaşam** — renamed from the old placeholder "Beylikdüzü Living";
  same specs (21,000 m², 2028 delivery) since those already came from the
  client and are corroborated by a real Dec 2025 drone photo of active
  construction in the site's own Media Manager folder "Lotus Yaşam".
- **Lotus Koru** — newly added third project, named after the Wix Media
  Manager folders "Lotus Koru 1" / "Koru 2", which hold real (non-render)
  photos of an apparently completed development. Its description is
  intentionally generic (no unit counts, sizes, or delivery date) because
  those specifics weren't available through the API — **verify with the
  client before adding numeric facts for it**, same as the Business info
  section above.

All three project images are hotlinked directly to the Wix Media
Manager's public CDN (`static.wixstatic.com` — allow-listed in
`next.config.ts` under `images.remotePatterns`) rather than copied into
`public/images/`, since the sandbox this migration ran in couldn't
download the files (network egress to that domain was blocked). This
means these three project photos depend on the client not deleting the
originals from their Wix media library; downloading and re-hosting them
locally under `public/images/projects/` would be more robust and matches
this repo's usual convention — worth doing next time someone has normal
network access to `static.wixstatic.com`.

## Known gaps / ideas raised but not yet acted on

- No pricing/payment-plan info on the project detail pages.
- Each project's `gallery` only has 3 extra photos (picked from what was
  available in the Wix Media Manager) — more could be added per project.
- No press mentions, licenses, or testimonials for trust-building.
- Social links (see Business info above) aren't surfaced anywhere on this
  site yet (e.g. footer icons).
