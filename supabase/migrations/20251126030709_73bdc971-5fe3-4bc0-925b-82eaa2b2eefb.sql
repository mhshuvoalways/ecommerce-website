-- Remove City, State, and Zip Code fields from profiles table
ALTER TABLE public.profiles
DROP COLUMN IF EXISTS shipping_city,
DROP COLUMN IF EXISTS shipping_state,
DROP COLUMN IF EXISTS shipping_zip;

-- Remove City, State, and Zip Code fields from orders table
ALTER TABLE public.orders
DROP COLUMN IF EXISTS shipping_city,
DROP COLUMN IF EXISTS shipping_state,
DROP COLUMN IF EXISTS shipping_zip;