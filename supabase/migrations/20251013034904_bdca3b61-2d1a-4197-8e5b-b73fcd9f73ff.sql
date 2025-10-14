-- Drop the user_roles table and related policies
DROP POLICY IF EXISTS "Users can view their own roles" ON public.user_roles;
DROP TABLE IF EXISTS public.user_roles;

-- Add role column to profiles table
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS role public.app_role DEFAULT 'user';

-- Update the has_role function to check profiles table
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.profiles
    WHERE id = _user_id AND role = _role
  )
$$;

-- Add index for better performance
CREATE INDEX IF NOT EXISTS idx_profiles_role ON public.profiles(role);