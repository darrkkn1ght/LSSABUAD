
-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Executives table
CREATE TABLE public.executives (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  position TEXT NOT NULL,
  photo_url TEXT,
  bio TEXT,
  email TEXT,
  social_link TEXT,
  display_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);
ALTER TABLE public.executives ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read executives" ON public.executives FOR SELECT USING (true);
CREATE POLICY "Auth insert executives" ON public.executives FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Auth update executives" ON public.executives FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Auth delete executives" ON public.executives FOR DELETE TO authenticated USING (true);
CREATE TRIGGER update_executives_updated_at BEFORE UPDATE ON public.executives FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Lecturers table
CREATE TABLE public.lecturers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  title TEXT NOT NULL,
  specialization TEXT,
  photo_url TEXT,
  bio TEXT,
  email TEXT,
  display_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);
ALTER TABLE public.lecturers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read lecturers" ON public.lecturers FOR SELECT USING (true);
CREATE POLICY "Auth insert lecturers" ON public.lecturers FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Auth update lecturers" ON public.lecturers FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Auth delete lecturers" ON public.lecturers FOR DELETE TO authenticated USING (true);
CREATE TRIGGER update_lecturers_updated_at BEFORE UPDATE ON public.lecturers FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Announcements table
CREATE TABLE public.announcements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,
  author TEXT NOT NULL,
  featured_image_url TEXT,
  is_featured BOOLEAN NOT NULL DEFAULT false,
  is_published BOOLEAN NOT NULL DEFAULT true,
  published_at TIMESTAMPTZ DEFAULT now(),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);
ALTER TABLE public.announcements ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read announcements" ON public.announcements FOR SELECT USING (true);
CREATE POLICY "Auth insert announcements" ON public.announcements FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Auth update announcements" ON public.announcements FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Auth delete announcements" ON public.announcements FOR DELETE TO authenticated USING (true);
CREATE TRIGGER update_announcements_updated_at BEFORE UPDATE ON public.announcements FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Gallery images table
CREATE TABLE public.gallery_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  image_url TEXT NOT NULL,
  caption TEXT,
  alt_text TEXT,
  display_order INTEGER NOT NULL DEFAULT 0,
  uploaded_at TIMESTAMPTZ DEFAULT now()
);
ALTER TABLE public.gallery_images ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read gallery" ON public.gallery_images FOR SELECT USING (true);
CREATE POLICY "Auth insert gallery" ON public.gallery_images FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Auth update gallery" ON public.gallery_images FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Auth delete gallery" ON public.gallery_images FOR DELETE TO authenticated USING (true);

-- Timetable entries table
CREATE TABLE public.timetable_entries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  course TEXT NOT NULL,
  course_code TEXT NOT NULL,
  lecturer TEXT NOT NULL,
  day TEXT NOT NULL CHECK (day IN ('Monday','Tuesday','Wednesday','Thursday','Friday','Saturday')),
  start_time TEXT NOT NULL,
  end_time TEXT NOT NULL,
  location TEXT NOT NULL,
  level TEXT NOT NULL CHECK (level IN ('100L','200L','300L','400L','500L')),
  semester TEXT NOT NULL CHECK (semester IN ('First Semester','Second Semester')),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);
ALTER TABLE public.timetable_entries ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read timetable" ON public.timetable_entries FOR SELECT USING (true);
CREATE POLICY "Auth insert timetable" ON public.timetable_entries FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Auth update timetable" ON public.timetable_entries FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Auth delete timetable" ON public.timetable_entries FOR DELETE TO authenticated USING (true);
CREATE TRIGGER update_timetable_updated_at BEFORE UPDATE ON public.timetable_entries FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Site settings table
CREATE TABLE public.site_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT UNIQUE NOT NULL,
  value TEXT,
  updated_at TIMESTAMPTZ DEFAULT now()
);
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read settings" ON public.site_settings FOR SELECT USING (true);
CREATE POLICY "Auth insert settings" ON public.site_settings FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Auth update settings" ON public.site_settings FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Auth delete settings" ON public.site_settings FOR DELETE TO authenticated USING (true);
CREATE TRIGGER update_settings_updated_at BEFORE UPDATE ON public.site_settings FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Storage buckets
INSERT INTO storage.buckets (id, name, public) VALUES ('executive-photos', 'executive-photos', true);
INSERT INTO storage.buckets (id, name, public) VALUES ('lecturer-photos', 'lecturer-photos', true);
INSERT INTO storage.buckets (id, name, public) VALUES ('gallery-images', 'gallery-images', true);
INSERT INTO storage.buckets (id, name, public) VALUES ('announcement-images', 'announcement-images', true);

-- Storage policies for public read
CREATE POLICY "Public read executive-photos" ON storage.objects FOR SELECT USING (bucket_id = 'executive-photos');
CREATE POLICY "Public read lecturer-photos" ON storage.objects FOR SELECT USING (bucket_id = 'lecturer-photos');
CREATE POLICY "Public read gallery-images" ON storage.objects FOR SELECT USING (bucket_id = 'gallery-images');
CREATE POLICY "Public read announcement-images" ON storage.objects FOR SELECT USING (bucket_id = 'announcement-images');

-- Auth upload policies
CREATE POLICY "Auth upload executive-photos" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'executive-photos');
CREATE POLICY "Auth upload lecturer-photos" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'lecturer-photos');
CREATE POLICY "Auth upload gallery-images" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'gallery-images');
CREATE POLICY "Auth upload announcement-images" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'announcement-images');

-- Auth update/delete storage policies
CREATE POLICY "Auth update storage" ON storage.objects FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Auth delete storage" ON storage.objects FOR DELETE TO authenticated USING (true);
