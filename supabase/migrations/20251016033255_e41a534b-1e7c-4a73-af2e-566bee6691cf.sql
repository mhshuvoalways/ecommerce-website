-- Add shipping address fields to profiles table
ALTER TABLE public.profiles
ADD COLUMN shipping_name text,
ADD COLUMN shipping_address text,
ADD COLUMN shipping_city text,
ADD COLUMN shipping_state text,
ADD COLUMN shipping_zip text,
ADD COLUMN shipping_phone text;