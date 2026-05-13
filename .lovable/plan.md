## Goal

- `/` (root) = English (currently mixes Chinese in `index.tsx` and several headings)
- `/zh/*` = Traditional Chinese (currently mirror-imports root and so will lose its Chinese content as soon as root is fully Englished)
- `/ko/*` = Korean (currently a single placeholder + splat redirect)
- Language switcher swaps between equivalent pages (already wired in `Header.tsx`)
- Hreflang + canonical tags consistent across all three locales

## Strategy

Single source of truth per page: each page component reads `useLocale()` and selects content from an inline `pack: Record<Locale, {...}>` object. Mirror routes under `/zh/*` and `/ko/*` import the same component, only providing locale-specific `head()` metadata. This avoids duplicating JSX three times and keeps layout/visual changes in one place.

For data:
- Keep `src/data/tours.ts` (en) and `src/data/tours.zh.ts` (zh).
- Add `src/data/tours.ko.ts` (machine-translated Korean).
- Add `src/data/useTours.ts` + `useReviews.ts` hooks that return the right dataset by `useLocale()`.

## Files to change

### 1. Data (Korean datasets + hooks)
- Create `src/data/tours.ko.ts` — Korean port of tour data (titles, descriptions, itineraries, inclusions). Machine-translated.
- Create `src/data/reviews.ko.ts` — Korean port of reviews.
- Create `src/data/useTours.ts` and `src/data/useReviews.ts` — hooks returning dataset by locale.

### 2. Page components → locale-aware
Refactor each to use a `pack[locale]` content object plus `useTours()` / `useReviews()` where applicable:
- `src/routes/index.tsx` (largest — hero, features, destinations, FAQ, CTA all currently hardcoded Chinese)
- `src/routes/about.tsx`
- `src/routes/contact.tsx`
- `src/routes/faq.tsx`
- `src/routes/blog.tsx`
- `src/routes/reviews.tsx` (incl. ShareModal)
- `src/routes/destinations.tsx`
- `src/routes/tours.index.tsx`
- `src/routes/tours.$slug.tsx` (BookingWidget labels too)
- `src/routes/privacy.tsx`
- `src/routes/terms.tsx`

Each pack contains `{ en, zh, ko }` text. zh content sourced from current Chinese in repo; en already mostly written; ko is machine-translated placeholder copy.

### 3. Korean mirror routes (replace placeholder + splat)
- Delete: `src/routes/ko/$.tsx` (splat that redirects to `/ko`)
- Replace: `src/routes/ko/index.tsx` (currently "to be continued") with real mirror that imports `HomePage` from `../index` with Korean `head()`.
- Create the full `/ko/*` mirror set matching `/zh/*`:
  - `ko/about.tsx`, `ko/contact.tsx`, `ko/faq.tsx`, `ko/blog.tsx`, `ko/reviews.tsx`, `ko/destinations.tsx`, `ko/tours.index.tsx`, `ko/tours.$slug.tsx`, `ko/privacy.tsx`, `ko/terms.tsx`.
- Each mirror sets canonical to `/ko/<path>` and emits hreflang alternates for en, zh-Hant, ko, x-default.

### 4. SEO consistency
- Make sure every leaf route in en/zh/ko has identical hreflang block referencing the three URLs + x-default → en.
- Update `src/routes/zh/*` head() blocks where missing alternates.

### 5. Verify
- `useLocale()` correctly drives Header, Footer, page packs, tour data hook.
- Language switcher: confirm `/zh/about` ↔ `/about` ↔ `/ko/about` etc. (already implemented via `withLocale(pathname, l)`).
- Build passes.

## Notes for the user

- Korean content will be **machine-translated placeholder copy** until you provide final Korean copy; clearly marked TODO comments will sit at the top of `tours.ko.ts` / `reviews.ko.ts` and each page's ko pack.
- The same single-component-three-packs pattern means future copy edits live in one file per page instead of three.

## Out of scope

- No business logic changes, no styling changes, no layout changes — text/content only plus route scaffolding.
- No UI for "more languages" / no translation backend.
