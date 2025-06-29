# Proyek Profil Sekolah

Proyek ini adalah aplikasi web untuk menampilkan profil sekolah, termasuk informasi seperti berita, agenda, galeri, struktur organisasi, pesan kepala sekolah, program, ekstrakurikuler, data staf pengajar, dan testimoni. Aplikasi ini juga dilengkapi dengan panel admin untuk pengelolaan konten.

## Fitur Utama

*   **Halaman Beranda**: Tampilan utama dengan informasi penting dan navigasi cepat.
*   **Berita & Agenda**: Bagian untuk menampilkan berita terbaru dan jadwal acara sekolah.
*   **Galeri**: Koleksi foto dan video kegiatan sekolah.
*   **Profil Sekolah**: Informasi detail tentang visi, misi, sejarah, dan struktur organisasi.
*   **Staf Pengajar**: Daftar guru dan staf sekolah.
*   **Program & Ekstrakurikuler**: Informasi tentang program akademik dan kegiatan ekstrakurikuler yang ditawarkan.
*   **Testimoni**: Ulasan dari siswa, orang tua, atau alumni.
*   **Panel Admin**: Halaman login dan dashboard untuk mengelola konten aplikasi (berita, agenda, galeri, dll.).
*   **Responsif**: Desain yang adaptif untuk berbagai ukuran layar (desktop, tablet, mobile).
*   **Theme Toggle**: Fitur untuk mengubah tema terang/gelap.

## Teknologi yang Digunakan

*   **Frontend**:
    *   React.js
    *   TypeScript
    *   Tailwind CSS
    *   Vite (sebagai build tool)
*   **Backend & Database**:
    *   Supabase (untuk otentikasi dan database)

## Instalasi dan Setup

Untuk menjalankan proyek ini secara lokal, ikuti langkah-langkah berikut:

1.  **Clone repositori:**
    ```bash
    git clone https://github.com/mrhdayat/sekolah-smks.git
    cd sekolah-smks
    ```

2.  **Instal dependensi:**
    ```bash
    npm install
    ```

3.  **Konfigurasi Variabel Lingkungan:**
    Buat file `.env` di root proyek dan tambahkan variabel lingkungan Supabase Anda:
    ```
    VITE_SUPABASE_URL=YOUR_SUPABASE_URL
    VITE_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
    ```
    Anda bisa mendapatkan nilai-nilai ini dari dashboard proyek Supabase Anda.

4.  **Jalankan aplikasi:**
    ```bash
    npm run dev
    ```
    Aplikasi akan berjalan di `http://localhost:5173` (atau port lain yang tersedia).

## Struktur Proyek

```
.
├── public/
├── src/
│   ├── assets/
│   ├── components/  # Komponen UI yang dapat digunakan kembali
│   ├── hooks/       # Custom React Hooks
│   ├── lib/         # Utilitas dan konfigurasi (misalnya, Supabase client)
│   ├── pages/       # Halaman-halaman aplikasi (termasuk admin)
│   ├── App.tsx      # Komponen utama aplikasi
│   ├── main.tsx     # Entry point aplikasi
│   └── index.css    # Styling global
├── supabase/        # Migrasi dan konfigurasi Supabase
├── .env             # Variabel lingkungan
├── package.json     # Dependensi proyek
├── tailwind.config.js # Konfigurasi Tailwind CSS
├── vite.config.ts   # Konfigurasi Vite
└── README.md        # Dokumentasi proyek
```

## Penggunaan

*   Akses halaman utama melalui `http://localhost:5173`.
*   Akses panel admin melalui `http://localhost:5173/admin/login`.

---