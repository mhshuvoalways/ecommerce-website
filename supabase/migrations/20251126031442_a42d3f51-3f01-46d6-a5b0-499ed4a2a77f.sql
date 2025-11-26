-- Drop shipping columns from profiles table
ALTER TABLE public.profiles 
DROP COLUMN IF EXISTS shipping_name,
DROP COLUMN IF EXISTS shipping_address,
DROP COLUMN IF EXISTS shipping_phone;