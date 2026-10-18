# Abrar Astafaraiz | Personal Website & Portfolio CMS

> **Platform:** Responsive Web Application  
> **Repository:** `abrar-astafaraiz`  
> **Architecture:** Next.js 16 App Router + TypeScript + Tailwind CSS  
> **Design Systems:** Aurora Violet (Public) & Lavender Studio (Admin)  
> **Backend & DB:** Supabase PostgreSQL + Auth + Storage (dengan Local Resilient State Fallback)  
> **Deployment:** Vercel  

---

## 🚀 Fitur Utama

### 1. Website Publik (Aurora Violet Design System)
- **Desain Modern:** Memadukan palet warna Aurora Violet (`#F7F8FC` / `#10111B`, primary `#6C5CE7` / `#A99BFF`, aksen mint lembut `#DDF7F0`) dengan tipografi resmi **Plus Jakarta Sans**.
- **Navigasi Sticky & Smooth Scroll:** Mendukung navigasi responsif, mobile drawer, dan deep linking ke `#hero`, `#about`, `#skills`, `#projects`, `#achievements`, `#experience`, dan `#contact`.
- **Dual Mode Mandiri:** Light Mode & Dark Mode publik disimpan secara terpisah di browser tanpa mempengaruhi tema admin.
- **Projects Section & Modal Interaktif:**
  - Kartu proyek responsif dengan cover, tahun, kategori, tag teknologi, dan CTA detail.
  - Modal detail proyek dengan **Image Carousel** (swipe sentuh, navigasi keyboard panah kiri/kanan, tombol next/prev desktop, dan indikator gambar).
  - Tautan proyek web ditampilkan berupa link teks di bagian paling akhir deskripsi: `"Website project ini ↗"` (tanpa tombol Source Code / Live Demo sesuai spesifikasi PRD).
- **Keahlian Berbasis Konteks:** Kategori keahlian dengan indikator penguasaan kontekstual (*Advanced, Proficient, Familiar*) tanpa persentase angka palsu.
- **Linimasa Pengalaman & Sertifikat:** Timeline vertikal untuk organisasi dan pengalaman kerja, serta kartu pencapaian dengan tautan verifikasi kredensial.
- **SEO & Aksesibilitas:** Metadata Open Graph lengkap, Twitter cards, `robots.txt` dengan proteksi halaman privat, serta dukungan `prefers-reduced-motion` dan WCAG 2.2 AA.

---

### 2. Dashboard Administrasi (Lavender Studio Design System)
- **Lavender Studio Visuals:** Palet kerja terorganisir (`#F7F5FF` / `#171421`, primary `#7966D9` / `#B7A7FF`) dengan tema Light/Dark yang independen.
- **Rute Admin Terproteksi (`/admin`):**
  - **Overview:** Ringkasan statistik waktu nyata (proyek publik, draft, sertifikat, pengalaman, log terbaru, tombol quick publish).
  - **Profile & Hero:** Ubah nama, headline, bio singkat, tagline, dan CTA hero secara dinamis.
  - **About:** Editor narasi profil dan latar belakang teknik informatika dengan pratinjau langsung.
  - **Skills:** Manajemen CRUD keahlian, ikon Lucide, kategori, dan tingkat penguasaan.
  - **Projects:** Manajemen CRUD proyek, cover image, galeri carousel gambar multi-item, toggle website URL, status draft/published, dan duplikasi proyek.
  - **Achievements:** Manajemen sertifikat, tanggal, kategori penghargaan, dan URL verifikasi.
  - **Experiences:** Manajemen riwayat kepengurusan organisasi dan kontribusi teknis.
  - **Contact & Socials:** Pengaturan email kontak, pesan ajakan kolaborasi, teks copyright footer, dan link media sosial.
  - **Section Management:** Mengaktifkan/menonaktifkan seksi, mengubah urutan tampil, dan toggle visibilitas di navbar.
  - **Website Appearance:** Pengaturan default tema publik, intensitas animasi (*subtle, standard, high*), dan visual hero.
  - **SEO Settings:** Konfigurasi site title, meta description, OG tags, dan robots directive.
  - **Activity Logs:** Audit trail otomatis mencatat setiap tindakan create, update, delete, dan publikasi.
  - **Account & Security:** Pengelolaan kredensial akun administrator dan status sesi.

---

### 3. Workflow Draft, Preview, dan Publikasi
1. Perubahan konten disimpan terlebih dahulu sebagai **Draft** di database/state.
2. Pengunjung publik hanya dapat mengakses konten berstatus **Published**.
3. Administrator dapat membuka **`/preview`** untuk melihat tampilan website dalam konteks sebenarnya secara privat dengan banner kontrol publikasi.
4. Ketika memilih **Publish**, sistem menyinkronkan snapshot draft ke versi publik aktif, memperbarui penomoran versi, dan mencatat activity log audit.

---

## 🛠️ Menjalankan Proyek Secara Lokal

1. **Clone repository:**
   ```bash
   git clone https://github.com/abrar-astafaraiz/abrar-astafaraiz.git
   cd abrar-astafaraiz
   ```

2. **Instal dependensi:**
   ```bash
   npm install
   ```

3. **Konfigurasi Environment Variables:**
   Salin `.env.example` ke `.env.local`:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=
   NEXT_PUBLIC_SUPABASE_ANON_KEY=
   SUPABASE_SERVICE_ROLE_KEY=
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   ```
   *(Aplikasi memiliki data service fallback terintegrasi sehingga siap dijalankan dan diuji langsung bahkan sebelum menghubungkan instance Supabase).*

4. **Jalankan Development Server:**
   ```bash
   npm run dev
   ```
   Buka [http://localhost:3000](http://localhost:3000) di browser.

5. **Akses Dashboard Admin:**
   - URL Login: [http://localhost:3000/admin-login](http://localhost:3000/admin-login)
   - Email Demo: `admin@abrar-astafaraiz.local`
   - Password Demo: `admin-password-2026`
   *(Atau klik tombol "Klik untuk isi kredensial otomatis" pada form login)*.

---

## 🗄️ Database Supabase Migration

File skema dan seed SQL lengkap telah disiapkan di folder `supabase/`:
- `supabase/migrations/20261018000000_initial_schema.sql` (Skema tabel, relasi, indeks, dan RLS security policies).
- `supabase/seed.sql` (Data awal Abrar Astafaraiz, profil, seksi, keahlian, proyek, sertifikat, dan pengaturan).

Untuk menerapkan migrasi ke project Supabase:
```bash
npx supabase db push
# atau jalankan isi file migration dan seed di Supabase SQL Editor
```

---

## 📦 Build Produksi

Untuk memverifikasi build produksi Next.js 16:
```bash
npm run build
```
Semua 23 rute statis dan dinamis terkompilasi secara optimal tanpa warning atau error.
