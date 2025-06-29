/*
  # Create school database tables

  1. New Tables
    - `teachers`
      - `id` (uuid, primary key)
      - `name` (text)
      - `subject` (text) 
      - `description` (text)
      - `image_url` (text)
      - `created_at` (timestamp)

    - `gallery`
      - `id` (uuid, primary key)
      - `title` (text)
      - `description` (text)
      - `image_url` (text)
      - `category` (text)
      - `created_at` (timestamp)

    - `school_profile`
      - `id` (uuid, primary key)
      - `section` (text)
      - `content` (jsonb)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to manage data
    - Public read access for gallery and teachers
*/

-- Create teachers table
CREATE TABLE IF NOT EXISTS teachers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  subject text NOT NULL,
  description text NOT NULL,
  image_url text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create gallery table
CREATE TABLE IF NOT EXISTS gallery (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  image_url text NOT NULL,
  category text NOT NULL DEFAULT 'Fasilitas',
  created_at timestamptz DEFAULT now()
);

-- Create school_profile table
CREATE TABLE IF NOT EXISTS school_profile (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  section text UNIQUE NOT NULL,
  content jsonb NOT NULL,
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE teachers ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE school_profile ENABLE ROW LEVEL SECURITY;

-- Teachers policies
CREATE POLICY "Public can read teachers"
  ON teachers
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Authenticated users can manage teachers"
  ON teachers
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Gallery policies
CREATE POLICY "Public can read gallery"
  ON gallery
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Authenticated users can manage gallery"
  ON gallery
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- School profile policies
CREATE POLICY "Public can read school profile"
  ON school_profile
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Authenticated users can manage school profile"
  ON school_profile
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Insert sample data
INSERT INTO teachers (name, subject, description, image_url) VALUES
('Dr. Ahmad Wijaya', 'Rekayasa Perangkat Lunak', 'Guru berpengalaman 15 tahun di bidang pemrograman dan pengembangan aplikasi. Menguasai berbagai bahasa pemrograman modern.', 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=400'),
('Siti Nurhaliza, S.Kom', 'Teknik Komputer Jaringan', 'Spesialis jaringan komputer dengan sertifikasi internasional. Berpengalaman dalam merancang infrastruktur IT perusahaan.', 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=400'),
('Budi Santoso, M.Pd', 'Multimedia', 'Ahli dalam desain grafis dan video editing. Karya-karyanya telah digunakan oleh berbagai perusahaan ternama.', 'https://images.pexels.com/photos/3184394/pexels-photo-3184394.jpeg?auto=compress&cs=tinysrgb&w=400'),
('Dewi Lestari, S.T', 'Teknik Elektro', 'Lulusan terbaik ITB dengan pengalaman kerja di industri otomotif. Ahli dalam sistem kelistrikan dan otomasi.', 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=400');

INSERT INTO gallery (title, description, image_url, category) VALUES
('Laboratorium Komputer Modern', 'Fasilitas laboratorium komputer dengan perangkat terbaru untuk mendukung pembelajaran siswa', 'https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg?auto=compress&cs=tinysrgb&w=800', 'Fasilitas'),
('Workshop Praktikum Teknik', 'Ruang workshop lengkap untuk praktikum teknik elektro dan mesin', 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=800', 'Fasilitas'),
('Kegiatan Lomba Skill Competition', 'Siswa mengikuti kompetisi keahlian tingkat provinsi dan meraih juara', 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800', 'Prestasi'),
('Perpustakaan Digital', 'Perpustakaan modern dengan koleksi buku digital dan ruang baca yang nyaman', 'https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&w=800', 'Fasilitas'),
('Kegiatan Ekstrakurikuler Robotika', 'Tim robotika sekolah sedang mempersiapkan robot untuk kompetisi nasional', 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=800', 'Kegiatan'),
('Upacara Wisuda Siswa', 'Momen kelulusan siswa-siswi SMK Harapan Bangsa angkatan terbaru', 'https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg?auto=compress&cs=tinysrgb&w=800', 'Kegiatan');

INSERT INTO school_profile (section, content) VALUES
('visi_misi', '{
  "visi": "Menjadi sekolah menengah kejuruan terdepan dalam menghasilkan lulusan yang kompeten, berkarakter, dan siap menghadapi tantangan global di era digital.",
  "misi": [
    "Menyelenggarakan pendidikan kejuruan berkualitas tinggi",
    "Mengembangkan kurikulum yang relevan dengan industri", 
    "Membentuk karakter siswa yang berakhlak mulia",
    "Memfasilitasi pengembangan keterampilan digital",
    "Membangun kemitraan dengan dunia industri"
  ]
}'),
('sejarah', '{
  "content": "SMK Harapan Bangsa didirikan pada tahun 1995 dengan visi menjadi lembaga pendidikan kejuruan terdepan yang menghasilkan lulusan berkualitas dan siap kerja. Berawal dari 3 program keahlian dengan 120 siswa, kini kami telah berkembang menjadi sekolah dengan 6 program keahlian dan lebih dari 1.200 siswa aktif.",
  "tahun_berdiri": "1995",
  "jumlah_siswa": "1200+",
  "program_keahlian": "6"
}');