-- Create hero_slides table for admin-managed hero carousel
CREATE TABLE public.hero_slides (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  subtitle TEXT,
  description TEXT,
  image_url TEXT NOT NULL,
  button_text TEXT,
  button_link TEXT,
  display_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.hero_slides ENABLE ROW LEVEL SECURITY;

-- Public can view active slides
CREATE POLICY "Hero slides viewable by everyone"
ON public.hero_slides
FOR SELECT
USING (is_active = true);

-- Admins can manage all slides
CREATE POLICY "Admins can manage hero slides"
ON public.hero_slides
FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role));

-- Create storage bucket for hero images
INSERT INTO storage.buckets (id, name, public) VALUES ('hero-images', 'hero-images', true);

-- Storage policies for hero images
CREATE POLICY "Hero images are publicly accessible"
ON storage.objects FOR SELECT
USING (bucket_id = 'hero-images');

CREATE POLICY "Admins can upload hero images"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'hero-images' AND has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update hero images"
ON storage.objects FOR UPDATE
USING (bucket_id = 'hero-images' AND has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete hero images"
ON storage.objects FOR DELETE
USING (bucket_id = 'hero-images' AND has_role(auth.uid(), 'admin'::app_role));