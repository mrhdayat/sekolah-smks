# Proyek Profil Sekolah

Website profil sekolah modern yang dibangun dengan React, TypeScript, dan Tailwind CSS. Proyek ini menyediakan platform komprehensif untuk menampilkan informasi sekolah, berita, galeri, dan banyak lagi.

## Fitur Utama

- **Desain Responsif:** Tampilan yang optimal di berbagai perangkat, dari desktop hingga mobile.
- **Manajemen Konten Dinamis:** Sebagian besar konten dapat dikelola melalui dashboard admin (memanfaatkan Supabase sebagai backend).
- **Navigasi Lengkap:** Mencakup halaman-halaman penting seperti Profil, Visi & Misi, Berita, Galeri, Kontak, dan lainnya.
- **Animasi Halus:** Menggunakan `framer-motion` untuk transisi halaman dan `react-scroll-reveal` untuk efek saat menggulir.
- **Toggle Mode Terang/Gelap:** Pengalaman pengguna yang dapat disesuaikan.

## Teknologi yang Digunakan

- **Frontend:**
  - [React](https://reactjs.org/)
  - [TypeScript](https://www.typescriptlang.org/)
  - [Vite](https://vitejs.dev/)
  - [Tailwind CSS](https://tailwindcss.com/)
  - [React Router](https://reactrouter.com/)
  - [Framer Motion](https://www.framer.com/motion/)
  - [React Icons](https://react-icons.github.io/react-icons/)
- **Backend & Database:**
  - [Supabase](https://supabase.io/)

## Instalasi dan Menjalankan Proyek

1.  **Clone repository ini:**
    ```bash
    git clone https://github.com/mrhdayat/sekolah-smks.git
    cd proyek-profil-sekolah
    ```

2.  **Install dependensi:**
    ```bash
    npm install
    ```

3.  **Konfigurasi Variabel Lingkungan:**
    Buat file `.env` di root direktori proyek dan tambahkan variabel berikut. Anda bisa mendapatkan nilai ini dari dashboard Supabase Anda.

    ```env
    VITE_SUPABASE_URL="https://your-project-id.supabase.co"
    VITE_SUPABASE_ANON_KEY="your-supabase-anon-key"
    ```

4.  **Jalankan proyek:**
    ```bash
    npm run dev
    ```
    Aplikasi akan berjalan di `http://localhost:5173`.

## Struktur Proyek

```
/
├── public/
├── src/
│   ├── assets/
│   ├── components/  # Komponen React yang dapat digunakan kembali
│   ├── hooks/       # Custom hooks
│   ├── lib/         # Konfigurasi Supabase & helper
│   ├── pages/       # Halaman-halaman aplikasi (termasuk folder admin)
│   ├── App.tsx      # Komponen utama & routing
│   ├── main.tsx     # Titik masuk aplikasi
│   └── index.css    # Gaya global
├── .gitignore
├── package.json
└── README.md
```

## Kontribusi

Kontribusi sangat diterima! Silakan buat *pull request* atau buka *issue* untuk berdiskusi.
