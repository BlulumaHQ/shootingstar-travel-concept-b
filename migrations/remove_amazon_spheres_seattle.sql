-- Migration: Remove the "Amazon Spheres" stop from the Seattle 1-day tour
-- on all language pages.
--
-- Run this in your Supabase SQL Editor (or apply via your migration workflow).
-- It only touches published tour rows with slug = 'seattle-1-day'.

BEGIN;

-- English description cleanup
UPDATE public.tours
SET desc = regexp_replace(
    desc,
    ',?\s*Amazon Spheres,?',
    '',
    'i'
)
WHERE slug = 'seattle-1-day'
  AND locale = 'en'
  AND desc ~* 'amazon sphere';

-- Remove the Amazon Spheres itinerary item from every locale of this tour.
-- The filter matches the English phrase inside the localized title.
UPDATE public.tours
SET itinerary = (
    SELECT jsonb_agg(elem)
    FROM jsonb_array_elements(itinerary) AS elem
    WHERE elem->>'title' !~* 'amazon sphere'
)
WHERE slug = 'seattle-1-day'
  AND itinerary IS NOT NULL;

COMMIT;
