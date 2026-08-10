-- Revert the 45% promotion on the Moraine Lake & Lake Louise Exploration tour
-- and restore the original price across all supported locales.

UPDATE public.tours
SET price = CASE locale
  WHEN 'en' THEN 'From $130 CAD / person'
  WHEN 'zh' THEN '$130 CAD 起 / 每位'
  WHEN 'ko' THEN '$130 CAD부터 / 1인'
END,
discount_percent = NULL,
promotion_badge = NULL
WHERE slug = 'moraine-lake-lake-louise-half-day';
