/*
  # Complete School Management Schema

  1. New Tables
    - `agenda` - Agenda kegiatan dan aktivitas sesuai kalender pendidikan
    - `news` - Berita, artikel & informasi sekolah
    - `staff_teachers` - Staf tenaga pengajar (berbeda dari teachers yang sudah ada)
    - `staff_education` - Staf tenaga kependidikan
    - `programs` - Program keahlian SMK
    - `extracurricular` - Ekstrakurikuler sekolah
    - `testimonials` - Testimoni dari alumni dan orang tua
    - `leadership` - Data kepemimpinan sekolah (kepala sekolah, wakasek)

  2. Storage Buckets
    - Create storage bucket for file uploads

  3. Security
    - Enable RLS on all tables
    - Add policies for authenticated users and public access
*/

-- Create agenda table
CREATE TABLE IF NOT EXISTS agenda (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  event_date date NOT NULL,
  event_time time,
  location text,
  category text DEFAULT 'Kegiatan' NOT NULL,
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
  category text DEFAULT 'Berita' NOT NULL,
  author text NOT NULL,
  is_published boolean DEFAULT true,
  published_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

-- Create staff_teachers table (different from existing teachers)
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
  code text NOT NULL UNIQUE,
  description text NOT NULL,
  duration text DEFAULT '3 tahun',
  competencies text[] DEFAULT '{}',
  career_prospects text[] DEFAULT '{}',
  image_url text NOT NULL,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- Create extracurricular table
CREATE TABLE IF NOT EXISTS extracurricular (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL,
  category text DEFAULT 'Olahraga' NOT NULL,
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
  role text NOT NULL, -- 'Alumni', 'Orang Tua', 'Siswa'
  graduation_year integer,
  current_job text,
  content text NOT NULL,
  rating integer DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
  image_url text,
  is_featured boolean DEFAULT false,
  is_approved boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Create leadership table
CREATE TABLE IF NOT EXISTS leadership (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  position text NOT NULL, -- 'Kepala Sekolah', 'Wakasek Kurikulum', etc.
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

-- Enable RLS
ALTER TABLE agenda ENABLE ROW LEVEL SECURITY;
ALTER TABLE news ENABLE ROW LEVEL SECURITY;
ALTER TABLE staff_teachers ENABLE ROW LEVEL SECURITY;
ALTER TABLE staff_education ENABLE ROW LEVEL SECURITY;
ALTER TABLE programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE extracurricular ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE leadership ENABLE ROW LEVEL SECURITY;

-- Create policies for agenda
CREATE POLICY "Public can read agenda"
  ON agenda
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Authenticated users can manage agenda"
  ON agenda
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create policies for news
CREATE POLICY "Public can read published news"
  ON news
  FOR SELECT
  TO anon, authenticated
  USING (is_published = true);

CREATE POLICY "Authenticated users can manage news"
  ON news
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create policies for staff_teachers
CREATE POLICY "Public can read staff_teachers"
  ON staff_teachers
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Authenticated users can manage staff_teachers"
  ON staff_teachers
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create policies for staff_education
CREATE POLICY "Public can read staff_education"
  ON staff_education
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Authenticated users can manage staff_education"
  ON staff_education
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create policies for programs
CREATE POLICY "Public can read active programs"
  ON programs
  FOR SELECT
  TO anon, authenticated
  USING (is_active = true);

CREATE POLICY "Authenticated users can manage programs"
  ON programs
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create policies for extracurricular
CREATE POLICY "Public can read active extracurricular"
  ON extracurricular
  FOR SELECT
  TO anon, authenticated
  USING (is_active = true);

CREATE POLICY "Authenticated users can manage extracurricular"
  ON extracurricular
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create policies for testimonials
CREATE POLICY "Public can read approved testimonials"
  ON testimonials
  FOR SELECT
  TO anon, authenticated
  USING (is_approved = true);

CREATE POLICY "Authenticated users can manage testimonials"
  ON testimonials
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create policies for leadership
CREATE POLICY "Public can read active leadership"
  ON leadership
  FOR SELECT
  TO anon, authenticated
  USING (is_active = true);

CREATE POLICY "Authenticated users can manage leadership"
  ON leadership
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Insert sample data for leadership
INSERT INTO leadership (name, position, education, experience, message, image_url, phone, email, order_position) VALUES
('Dr. H. Ahmad Fauzi, M.Pd', 'Kepala Sekolah', 'S3 Manajemen Pendidikan - Universitas Negeri Jakarta', 'Pengalaman 20 tahun di bidang pendidikan', 'Selamat datang di SMKS Muhammadiyah Satui. Kami berkomitmen untuk memberikan pendidikan terbaik yang mengintegrasikan ilmu pengetahuan, teknologi, dan nilai-nilai keislaman untuk membentuk generasi yang unggul dan berkarakter.', 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400', '(0518) 1234-5678', 'kepsek@smksmuhsatui.sch.id', 1),
('Drs. Muhammad Yusuf, M.Pd', 'Wakasek Kurikulum', 'S2 Teknologi Pendidikan - Universitas Negeri Malang', 'Pengalaman 15 tahun mengembangkan kurikulum SMK', 'Kurikulum kami dirancang untuk memenuhi kebutuhan industri modern dengan tetap mempertahankan nilai-nilai keislaman.', 'https://images.pexels.com/photos/2182969/pexels-photo-2182969.jpeg?auto=compress&cs=tinysrgb&w=400', '(0518) 1234-5679', 'wakasek.kurikulum@smksmuhsatui.sch.id', 2),
('Hj. Siti Aminah, S.Pd, M.M', 'Wakasek Kesiswaan', 'S2 Manajemen - Universitas Lambung Mangkurat', 'Pengalaman 12 tahun dalam pembinaan karakter siswa', 'Pembinaan karakter dan pengembangan potensi siswa adalah prioritas utama dalam menciptakan generasi yang berakhlak mulia.', 'https://images.pexels.com/photos/2182968/pexels-photo-2182968.jpeg?auto=compress&cs=tinysrgb&w=400', '(0518) 1234-5680', 'wakasek.kesiswaan@smksmuhsatui.sch.id', 3);

-- Insert sample data for programs
INSERT INTO programs (name, code, description, competencies, career_prospects, image_url) VALUES
('Rekayasa Perangkat Lunak', 'RPL', 'Program keahlian yang mempelajari pengembangan aplikasi dan sistem perangkat lunak dengan teknologi terkini', ARRAY['Pemrograman Web', 'Mobile Development', 'Database Management', 'UI/UX Design'], ARRAY['Software Developer', 'Web Developer', 'Mobile App Developer', 'System Analyst'], 'https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg?auto=compress&cs=tinysrgb&w=800'),
('Teknik Komputer dan Jaringan', 'TKJ', 'Program keahlian yang fokus pada instalasi, konfigurasi, dan pemeliharaan jaringan komputer', ARRAY['Network Administration', 'Hardware Maintenance', 'Cyber Security', 'Server Management'], ARRAY['Network Administrator', 'IT Support', 'System Administrator', 'Cyber Security Specialist'], 'https://images.pexels.com/photos/442150/pexels-photo-442150.jpeg?auto=compress&cs=tinysrgb&w=800'),
('Multimedia', 'MM', 'Program keahlian yang mengembangkan kreativitas dalam bidang desain grafis, video, dan animasi', ARRAY['Graphic Design', 'Video Editing', '3D Animation', 'Photography'], ARRAY['Graphic Designer', 'Video Editor', 'Animator', 'Content Creator'], 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800'),
('Akuntansi dan Keuangan Lembaga', 'AKL', 'Program keahlian yang mempelajari pengelolaan keuangan dan akuntansi dengan prinsip syariah', ARRAY['Akuntansi Syariah', 'Perpajakan', 'Audit', 'Manajemen Keuangan'], ARRAY['Akuntan', 'Staff Keuangan', 'Auditor', 'Konsultan Pajak'], 'https://images.pexels.com/photos/159888/pexels-photo-159888.jpeg?auto=compress&cs=tinysrgb&w=800'),
('Otomatisasi dan Tata Kelola Perkantoran', 'OTKP', 'Program keahlian yang mengembangkan kemampuan administrasi perkantoran modern', ARRAY['Office Administration', 'Document Management', 'Customer Service', 'Business Communication'], ARRAY['Admin Officer', 'Secretary', 'Customer Service', 'Office Manager'], 'https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=800');

-- Insert sample data for extracurricular
INSERT INTO extracurricular (name, description, category, schedule, coach, image_url, achievements) VALUES
('Pramuka', 'Kegiatan kepanduan yang mengembangkan karakter dan kepemimpinan siswa', 'Kepanduan', 'Jumat 14:00-16:00', 'Bapak Suryadi, S.Pd', 'https://images.pexels.com/photos/8923775/pexels-photo-8923775.jpeg?auto=compress&cs=tinysrgb&w=800', ARRAY['Juara 1 Lomba Pionering Tingkat Kabupaten 2024']),
('Rohis (Rohani Islam)', 'Kegiatan keagamaan untuk memperdalam pemahaman agama Islam', 'Keagamaan', 'Kamis 15:00-17:00', 'Ustadz Abdullah, S.Ag', 'https://images.pexels.com/photos/8923774/pexels-photo-8923774.jpeg?auto=compress&cs=tinysrgb&w=800', ARRAY['Juara 2 MTQ Pelajar Tingkat Kabupaten 2024']),
('Futsal', 'Olahraga futsal untuk mengembangkan kerjasama tim dan kebugaran', 'Olahraga', 'Selasa & Kamis 15:30-17:00', 'Bapak Rizki, S.Pd', 'https://images.pexels.com/photos/274422/pexels-photo-274422.jpeg?auto=compress&cs=tinysrgb&w=800', ARRAY['Juara 3 Turnamen Futsal Antar SMK 2024']),
('English Club', 'Klub bahasa Inggris untuk meningkatkan kemampuan berbahasa Inggris', 'Akademik', 'Rabu 14:00-15:30', 'Ibu Sarah, S.Pd', 'https://images.pexels.com/photos/8923773/pexels-photo-8923773.jpeg?auto=compress&cs=tinysrgb&w=800', ARRAY['Juara 1 English Speech Contest 2024']),
('Karate', 'Seni bela diri untuk melatih disiplin dan kepercayaan diri', 'Olahraga', 'Sabtu 08:00-10:00', 'Sensei Hendra, Dan 3', 'https://images.pexels.com/photos/8923772/pexels-photo-8923772.jpeg?auto=compress&cs=tinysrgb&w=800', ARRAY['Medali Emas Karate Tingkat Provinsi 2024']);

-- Insert sample testimonials
INSERT INTO testimonials (name, role, graduation_year, current_job, content, rating, image_url, is_approved) VALUES
('Ahmad Rizki Pratama', 'Alumni', 2022, 'Web Developer di PT. Teknologi Nusantara', 'SMKS Muhammadiyah Satui memberikan bekal yang sangat baik untuk karir saya. Pembelajaran yang praktis dan guru-guru yang kompeten membuat saya siap menghadapi dunia kerja.', 5, 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400', true),
('Siti Nurhaliza', 'Alumni', 2023, 'Graphic Designer Freelance', 'Program Multimedia di sekolah ini sangat lengkap. Saya belajar banyak tentang desain dan sekarang bisa bekerja sebagai freelancer dengan penghasilan yang baik.', 5, 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=400', true),
('Bapak Suryanto', 'Orang Tua', null, 'Wiraswasta', 'Saya sangat puas dengan pendidikan yang diberikan sekolah kepada anak saya. Tidak hanya skill teknis, tapi juga pembentukan karakter yang baik.', 5, 'https://images.pexels.com/photos/2379006/pexels-photo-2379006.jpeg?auto=compress&cs=tinysrgb&w=400', true);

-- Create storage bucket for uploads (this needs to be done via Supabase dashboard or API)
-- The bucket will be created in the application code