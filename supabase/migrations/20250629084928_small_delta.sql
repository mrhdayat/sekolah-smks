/*
  # Complete School Management Schema

  1. New Tables
    - `agenda` - School events and activities
    - `news` - News, articles and announcements  
    - `staff_teachers` - Teaching staff information
    - `staff_education` - Educational support staff
    - `programs` - Academic programs/majors
    - `extracurricular` - Extracurricular activities
    - `testimonials` - Student/parent testimonials
    - `leadership` - School leadership structure

  2. Security
    - Enable RLS on all tables
    - Public read access for published content
    - Authenticated user management access
    - Storage bucket for file uploads
*/

-- Create agenda table
CREATE TABLE IF NOT EXISTS agenda (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  event_date date NOT NULL,
  event_time time,
  location text,
  category text NOT NULL DEFAULT 'Kegiatan',
  image_url text,
  is_featured boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Create news table
CREATE TABLE IF NOT EXISTS news (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  content text NOT NULL,
  excerpt text NOT NULL,
  image_url text NOT NULL,
  category text NOT NULL DEFAULT 'Berita',
  author text NOT NULL,
  is_published boolean DEFAULT true,
  published_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

-- Create staff_teachers table
CREATE TABLE IF NOT EXISTS staff_teachers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  position text NOT NULL,
  education text NOT NULL,
  subjects text[] DEFAULT '{}',
  phone text,
  email text,
  image_url text NOT NULL,
  bio text,
  experience_years integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Create staff_education table
CREATE TABLE IF NOT EXISTS staff_education (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  position text NOT NULL,
  department text NOT NULL,
  education text NOT NULL,
  phone text,
  email text,
  image_url text NOT NULL,
  bio text,
  created_at timestamptz DEFAULT now()
);

-- Create programs table
CREATE TABLE IF NOT EXISTS programs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  code text NOT NULL,
  description text NOT NULL,
  duration text DEFAULT '3 tahun',
  competencies text[] DEFAULT '{}',
  career_prospects text[] DEFAULT '{}',
  image_url text NOT NULL,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- Add unique constraint for programs code if not exists
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints 
    WHERE constraint_name = 'programs_code_key' 
    AND table_name = 'programs'
  ) THEN
    ALTER TABLE programs ADD CONSTRAINT programs_code_key UNIQUE (code);
  END IF;
END $$;

-- Create extracurricular table
CREATE TABLE IF NOT EXISTS extracurricular (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL,
  category text NOT NULL DEFAULT 'Olahraga',
  schedule text,
  coach text,
  image_url text NOT NULL,
  achievements text[] DEFAULT '{}',
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- Create testimonials table
CREATE TABLE IF NOT EXISTS testimonials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  role text NOT NULL,
  graduation_year integer,
  current_job text,
  content text NOT NULL,
  rating integer DEFAULT 5,
  image_url text,
  is_featured boolean DEFAULT false,
  is_approved boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Add rating constraint if not exists
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints 
    WHERE constraint_name = 'testimonials_rating_check' 
    AND table_name = 'testimonials'
  ) THEN
    ALTER TABLE testimonials ADD CONSTRAINT testimonials_rating_check CHECK (rating >= 1 AND rating <= 5);
  END IF;
END $$;

-- Create leadership table
CREATE TABLE IF NOT EXISTS leadership (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  position text NOT NULL,
  education text NOT NULL,
  experience text,
  message text,
  image_url text NOT NULL,
  phone text,
  email text,
  order_position integer DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE agenda ENABLE ROW LEVEL SECURITY;
ALTER TABLE news ENABLE ROW LEVEL SECURITY;
ALTER TABLE staff_teachers ENABLE ROW LEVEL SECURITY;
ALTER TABLE staff_education ENABLE ROW LEVEL SECURITY;
ALTER TABLE programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE extracurricular ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE leadership ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist and recreate them
DO $$
BEGIN
  -- Agenda policies
  DROP POLICY IF EXISTS "Public can read agenda" ON agenda;
  DROP POLICY IF EXISTS "Authenticated users can manage agenda" ON agenda;
  
  CREATE POLICY "Public can read agenda" ON agenda FOR SELECT TO anon, authenticated USING (true);
  CREATE POLICY "Authenticated users can manage agenda" ON agenda FOR ALL TO authenticated USING (true) WITH CHECK (true);

  -- News policies
  DROP POLICY IF EXISTS "Public can read published news" ON news;
  DROP POLICY IF EXISTS "Authenticated users can manage news" ON news;
  
  CREATE POLICY "Public can read published news" ON news FOR SELECT TO anon, authenticated USING (is_published = true);
  CREATE POLICY "Authenticated users can manage news" ON news FOR ALL TO authenticated USING (true) WITH CHECK (true);

  -- Staff teachers policies
  DROP POLICY IF EXISTS "Public can read staff_teachers" ON staff_teachers;
  DROP POLICY IF EXISTS "Authenticated users can manage staff_teachers" ON staff_teachers;
  
  CREATE POLICY "Public can read staff_teachers" ON staff_teachers FOR SELECT TO anon, authenticated USING (true);
  CREATE POLICY "Authenticated users can manage staff_teachers" ON staff_teachers FOR ALL TO authenticated USING (true) WITH CHECK (true);

  -- Staff education policies
  DROP POLICY IF EXISTS "Public can read staff_education" ON staff_education;
  DROP POLICY IF EXISTS "Authenticated users can manage staff_education" ON staff_education;
  
  CREATE POLICY "Public can read staff_education" ON staff_education FOR SELECT TO anon, authenticated USING (true);
  CREATE POLICY "Authenticated users can manage staff_education" ON staff_education FOR ALL TO authenticated USING (true) WITH CHECK (true);

  -- Programs policies
  DROP POLICY IF EXISTS "Public can read active programs" ON programs;
  DROP POLICY IF EXISTS "Authenticated users can manage programs" ON programs;
  
  CREATE POLICY "Public can read active programs" ON programs FOR SELECT TO anon, authenticated USING (is_active = true);
  CREATE POLICY "Authenticated users can manage programs" ON programs FOR ALL TO authenticated USING (true) WITH CHECK (true);

  -- Extracurricular policies
  DROP POLICY IF EXISTS "Public can read active extracurricular" ON extracurricular;
  DROP POLICY IF EXISTS "Authenticated users can manage extracurricular" ON extracurricular;
  
  CREATE POLICY "Public can read active extracurricular" ON extracurricular FOR SELECT TO anon, authenticated USING (is_active = true);
  CREATE POLICY "Authenticated users can manage extracurricular" ON extracurricular FOR ALL TO authenticated USING (true) WITH CHECK (true);

  -- Testimonials policies
  DROP POLICY IF EXISTS "Public can read approved testimonials" ON testimonials;
  DROP POLICY IF EXISTS "Authenticated users can manage testimonials" ON testimonials;
  
  CREATE POLICY "Public can read approved testimonials" ON testimonials FOR SELECT TO anon, authenticated USING (is_approved = true);
  CREATE POLICY "Authenticated users can manage testimonials" ON testimonials FOR ALL TO authenticated USING (true) WITH CHECK (true);

  -- Leadership policies
  DROP POLICY IF EXISTS "Public can read active leadership" ON leadership;
  DROP POLICY IF EXISTS "Authenticated users can manage leadership" ON leadership;
  
  CREATE POLICY "Public can read active leadership" ON leadership FOR SELECT TO anon, authenticated USING (is_active = true);
  CREATE POLICY "Authenticated users can manage leadership" ON leadership FOR ALL TO authenticated USING (true) WITH CHECK (true);
END $$;

-- Create storage bucket for uploads
INSERT INTO storage.buckets (id, name, public) 
VALUES ('uploads', 'uploads', true)
ON CONFLICT (id) DO NOTHING;

-- Drop existing storage policies if they exist and recreate them
DO $$
BEGIN
  DROP POLICY IF EXISTS "Public can view uploads" ON storage.objects;
  DROP POLICY IF EXISTS "Authenticated users can upload files" ON storage.objects;
  DROP POLICY IF EXISTS "Authenticated users can update files" ON storage.objects;
  DROP POLICY IF EXISTS "Authenticated users can delete files" ON storage.objects;
  
  CREATE POLICY "Public can view uploads" ON storage.objects FOR SELECT USING (bucket_id = 'uploads');
  CREATE POLICY "Authenticated users can upload files" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'uploads');
  CREATE POLICY "Authenticated users can update files" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'uploads');
  CREATE POLICY "Authenticated users can delete files" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'uploads');
END $$;