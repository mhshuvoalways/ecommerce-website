-- Remove unused text columns from hero_slides
ALTER TABLE public.hero_slides DROP COLUMN IF EXISTS title;
ALTER TABLE public.hero_slides DROP COLUMN IF EXISTS subtitle;
ALTER TABLE public.hero_slides DROP COLUMN IF EXISTS description;
ALTER TABLE public.hero_slides DROP COLUMN IF EXISTS button_text;
ALTER TABLE public.hero_slides DROP COLUMN IF EXISTS button_link;