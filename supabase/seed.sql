-- Supabase Seed Data: seed.sql
-- Initial data for Abrar Astafaraiz | Personal Website

-- 1. Profile
INSERT INTO public.profiles (
    id, display_name, headline, short_bio, about_content,
    profile_image_path, hero_image_path, tagline,
    primary_cta_label, primary_cta_target, secondary_cta_label, secondary_cta_target
) VALUES (
    'a0000000-0000-0000-0000-000000000001',
    'Abrar Astafaraiz',
    'Full-Stack Developer | Web & Software Development',
    'Mahasiswa Teknik Informatika dengan dedikasi tinggi dalam rekayasa perangkat lunak, pengembangan web modern, dan arsitektur database.',
    'Saya adalah mahasiswa Teknik Informatika yang berfokus pada software engineering dan web development. Saya memiliki minat mendalam dalam membangun sistem digital yang terstruktur, aman, responsif, dan memberikan nilai nyata bagi pengguna. Terbiasa bekerja dengan teknologi modern seperti Next.js, TypeScript, PostgreSQL, dan ekosistem cloud, saya selalu terbuka untuk kolaborasi inovatif dan tantangan teknis baru.',
    '/images/profile-avatar.webp',
    '/images/hero-visual.webp',
    'Building Digital Experiences Through Code.',
    'Lihat Proyek',
    '#projects',
    'Hubungi Saya',
    '#contact'
) ON CONFLICT (id) DO NOTHING;

-- 2. Section Settings
INSERT INTO public.section_settings (section_key, title, subtitle, nav_label, is_visible, show_in_nav, sort_order) VALUES
('hero', 'Beranda', 'Pengantar Profil Profesional', 'Home', true, true, 1),
('about', 'Tentang Saya', 'Mengenal Latar Belakang & Fokus Profesional', 'About', true, true, 2),
('skills', 'Keahlian & Teknologi', 'Kompetensi Teknis dan Alat Pengembangan', 'Skills', true, true, 3),
('projects', 'Proyek Pilihan', 'Koleksi Portofolio Rekayasa Perangkat Lunak', 'Projects', true, true, 4),
('achievements', 'Sertifikat & Pencapaian', 'Apresiasi Akademik dan Lisensi Profesional', 'Achievements', true, true, 5),
('experience', 'Pengalaman & Organisasi', 'Rekam Jejak Kolaborasi dan Kontribusi', 'Experience', true, true, 6),
('contact', 'Hubungi Saya', 'Mari Berkolaborasi Membangun Solusi Digital', 'Contact', true, true, 7)
ON CONFLICT (section_key) DO UPDATE SET
    title = EXCLUDED.title,
    subtitle = EXCLUDED.subtitle,
    nav_label = EXCLUDED.nav_label;

-- 3. Skills
INSERT INTO public.skills (name, category, description, icon_name, proficiency_label, sort_order, is_visible) VALUES
-- Programming Languages
('TypeScript', 'Programming Languages', 'Static typing for scalable modern web apps', 'Code2', 'Proficient', 1, true),
('JavaScript', 'Programming Languages', 'Core language for frontend and backend logic', 'FileCode2', 'Advanced', 2, true),
('Python', 'Programming Languages', 'Data processing, scripting, and backend tasks', 'Terminal', 'Proficient', 3, true),
('PHP', 'Programming Languages', 'Backend web scripting and server-side systems', 'FileCode', 'Proficient', 4, true),
('C++', 'Programming Languages', 'Algorithmic fundamentals and software foundations', 'Cpu', 'Familiar', 5, true),

-- Web Development
('Next.js', 'Web Development', 'Full-stack React framework with App Router & SSR', 'Layers', 'Advanced', 6, true),
('React', 'Web Development', 'Component-driven interactive UI engineering', 'Atom', 'Advanced', 7, true),
('Node.js', 'Web Development', 'High-performance runtime for scalable APIs', 'Server', 'Proficient', 8, true),
('Tailwind CSS', 'Web Development', 'Utility-first modern responsive styling', 'Palette', 'Advanced', 9, true),
('RESTful API', 'Web Development', 'Clean contract architecture and endpoints', 'Network', 'Proficient', 10, true),

-- Database Management
('PostgreSQL', 'Database Management', 'Relational database architecture & SQL', 'Database', 'Proficient', 11, true),
('Supabase', 'Database Management', 'BaaS: Auth, Realtime, Storage, and RLS', 'ShieldCheck', 'Proficient', 12, true),
('MySQL', 'Database Management', 'Relational data modeling and queries', 'DatabaseZap', 'Proficient', 13, true),

-- Tools & Platforms
('Git & GitHub', 'Tools & Platforms', 'Version control and collaboration workflows', 'GitBranch', 'Advanced', 14, true),
('Docker', 'Tools & Platforms', 'Containerization for consistent environments', 'Box', 'Familiar', 15, true),
('Linux', 'Tools & Platforms', 'CLI administration and server environment', 'TerminalSquare', 'Proficient', 16, true),
('Vercel', 'Tools & Platforms', 'CI/CD pipeline and automated edge deployment', 'Cloud', 'Proficient', 17, true),

-- UI/UX Design
('Figma', 'UI/UX Design', 'Wireframing, interactive prototyping, and design systems', 'Layout', 'Proficient', 18, true)
ON CONFLICT DO NOTHING;

-- 4. Projects (The initial projects defined in PRD Section 11.5)
INSERT INTO public.projects (
    id, title, slug, short_description, full_description,
    year, category, technologies, cover_image_path, project_url,
    project_url_enabled, is_featured, is_visible, sort_order, publication_status, published_at
) VALUES
(
    'b0000000-0000-0000-0000-000000000001',
    'Personal Portfolio & Content Management System',
    'personal-portfolio-cms',
    'Website portofolio dinamis dengan dashboard CMS terpadu berbasis Next.js App Router dan Supabase.',
    'Platform portofolio digital komprehensif yang dirancang untuk menampilkan profil, keterampilan, pengalaman, dan proyek secara elegan dengan visual Aurora Violet. Dilengkapi dengan dashboard admin Lavender Studio untuk mengelola seluruh konten secara dinamis tanpa perlu redeploy kode. Sistem mendukung workflow draft, preview privat, publikasi berversi, optimasi gambar, dan Row Level Security.',
    '2026',
    'Web Development',
    ARRAY['Next.js', 'TypeScript', 'Tailwind CSS', 'Supabase', 'Framer Motion'],
    '/images/projects/portfolio-cms-cover.webp',
    'https://abrar-astafaraiz.vercel.app',
    true,
    true,
    true,
    1,
    'published',
    NOW()
),
(
    'b0000000-0000-0000-0000-000000000002',
    'Sistem Kasir Restoran Berbasis Web',
    'sistem-kasir-restoran',
    'Aplikasi Point of Sale (POS) restoran dengan pencatatan transaksi real-time, manajemen meja, dan laporan keuangan.',
    'Sistem Point of Sale web modern yang mengotomatisasi proses pemesanan menu, pembagian nomor meja, kalkulasi pajak, diskon, cetak struk transaksi, dan pembuatan rekap laporan penjualan harian dan bulanan secara akurat.',
    '2025',
    'Web Development',
    ARRAY['React', 'Node.js', 'Express', 'PostgreSQL', 'Tailwind CSS'],
    '/images/projects/pos-restoran-cover.webp',
    'https://pos-restoran.demo.app',
    false,
    true,
    true,
    2,
    'published',
    NOW()
),
(
    'b0000000-0000-0000-0000-000000000003',
    'ASTRACK',
    'astrack-asset-tracking',
    'Sistem manajemen pelacakan aset dan inventaris perangkat laboratorium berbasis web.',
    'ASTRACK memfasilitasi pencatatan inventaris perangkat keras, pelacakan histori peminjaman, monitoring status kondisi perangkat, serta penjadwalan pemeliharaan berkala guna mencegah kehilangan aset laboratorium.',
    '2025',
    'Software Development',
    ARRAY['TypeScript', 'Next.js', 'Tailwind CSS', 'PostgreSQL', 'Prisma'],
    '/images/projects/astrack-cover.webp',
    'https://astrack.demo.app',
    false,
    true,
    true,
    3,
    'published',
    NOW()
),
(
    'b0000000-0000-0000-0000-000000000004',
    'BICHAMP',
    'bichamp-tournament-platform',
    'Platform manajemen kompetisi dan turnamen olahraga dengan bagan pertandingan interaktif.',
    'BICHAMP menyediakan pengelolaan turnamen mulai dari pendaftaran tim, pengundian bagan (bracket elimination & round-robin), pembaruan skor langsung, hingga pengumuman klasemen secara real-time.',
    '2024',
    'Web Development',
    ARRAY['Next.js', 'Tailwind CSS', 'Supabase', 'TypeScript'],
    '/images/projects/bichamp-cover.webp',
    'https://bichamp.demo.app',
    false,
    false,
    true,
    4,
    'published',
    NOW()
),
(
    'b0000000-0000-0000-0000-000000000005',
    'MOTOCARE',
    'motocare-service-booking',
    'Aplikasi web manajemen servis dan pemeliharaan kendaraan bermotor dengan sistem booking jadwal.',
    'MOTOCARE memudahkan pemilik kendaraan dalam mereservasi jadwal servis bengkel, memantau estimasi biaya perbaikan dan sparepart, serta menerima notifikasi pengingat servis rutin berkala.',
    '2024',
    'Web Development',
    ARRAY['React', 'PHP', 'MySQL', 'Bootstrap', 'JavaScript'],
    '/images/projects/motocare-cover.webp',
    'https://motocare.demo.app',
    false,
    false,
    true,
    5,
    'published',
    NOW()
),
(
    'b0000000-0000-0000-0000-000000000006',
    'Sistem Absensi Digital Expo Wisuda Jurusan TIK',
    'absensi-expo-wisuda-tik',
    'Sistem presensi cepat menggunakan QR Code dan verifikasi digital untuk pengunjung Expo Wisuda.',
    'Sistem presensi digital yang dirancang untuk menangani lonjakan ribuan pengunjung acara Expo Wisuda TIK secara cepat. Menggunakan pemindaian barcode/QR Code terenkripsi untuk meminimalkan antrean dan menyediakan rekapitulasi data demografi pengunjung secara instan.',
    '2024',
    'Web Development',
    ARRAY['JavaScript', 'HTML5', 'Node.js', 'MySQL', 'Tailwind CSS'],
    '/images/projects/absensi-expo-cover.webp',
    'https://expo-tik.demo.app',
    false,
    false,
    true,
    6,
    'published',
    NOW()
),
(
    'b0000000-0000-0000-0000-000000000007',
    'Sistem Absensi dan Monitoring Aktivitas Santri',
    'absensi-monitoring-santri',
    'Platform pencatatan kehadiran, kedisiplinan, dan laporan perkembangan santri berbasis web.',
    'Aplikasi pemantauan santri yang mengintegrasikan pencatatan kehadiran salat berjamaah, kegiatan halaqah tahfiz, serta catatan kepribadian dan perizinan pulang. Informasi dapat diakses pengurus dan wali santri secara transparan.',
    '2024',
    'Web Development',
    ARRAY['PHP', 'Laravel', 'MySQL', 'Bootstrap', 'JavaScript'],
    '/images/projects/absensi-santri-cover.webp',
    'https://santri-monitor.demo.app',
    false,
    false,
    true,
    7,
    'published',
    NOW()
)
ON CONFLICT (id) DO NOTHING;

-- 5. Project Images (For carousel in project modal)
INSERT INTO public.project_images (id, project_id, storage_path, alt_text, caption, sort_order) VALUES
('c0000000-0000-0000-0000-000000000001', 'b0000000-0000-0000-0000-000000000001', '/images/projects/portfolio-cms-cover.webp', 'Tampilan Halaman Utama Portofolio', 'Desain responsif website publik dengan palet Aurora Violet', 1),
('c0000000-0000-0000-0000-000000000002', 'b0000000-0000-0000-0000-000000000001', '/images/projects/portfolio-admin-preview.webp', 'Dashboard Manajemen Lavender Studio', 'Panel admin untuk manajemen profil, keterampilan, dan proyek', 2),
('c0000000-0000-0000-0000-000000000003', 'b0000000-0000-0000-0000-000000000001', '/images/projects/portfolio-modal-preview.webp', 'Detail Interaktif & Carousel', 'Modal proyek dengan navigasi keyboard, touch swipe, dan informasi komprehensif', 3),

('c0000000-0000-0000-0000-000000000004', 'b0000000-0000-0000-0000-000000000002', '/images/projects/pos-restoran-cover.webp', 'Antarmuka Kasir Restoran', 'Katalog menu interaktif dan panel pemesanan meja kasir', 1),
('c0000000-0000-0000-0000-000000000005', 'b0000000-0000-0000-0000-000000000002', '/images/projects/pos-report-preview.webp', 'Laporan Keuangan & Struk', 'Statistik omzet harian dan cetak struk otomatis', 2),

('c0000000-0000-0000-0000-000000000006', 'b0000000-0000-0000-0000-000000000003', '/images/projects/astrack-cover.webp', 'Dashboard Inventaris ASTRACK', 'Monitoring ketersediaan perangkat keras dan peralatan laboratorium', 1),
('c0000000-0000-0000-0000-000000000007', 'b0000000-0000-0000-0000-000000000003', '/images/projects/astrack-detail-preview.webp', 'Histori Peminjaman Aset', 'Detail log peminjaman dan kondisi pemeliharaan aset', 2)
ON CONFLICT (id) DO NOTHING;

-- 6. Achievements & Certifications
INSERT INTO public.achievements (
    id, title, organizer, achievement_date, description,
    image_path, verification_url, category, sort_order, is_visible, publication_status
) VALUES
(
    'd0000000-0000-0000-0000-000000000001',
    'Juara 1 Software Development Competition',
    'Himpunan Mahasiswa Teknik Informatika',
    '2025',
    'Meraih peringkat pertama dalam kompetisi perancangan dan implementasi solusi perangkat lunak inovatif tingkat mahasiswa.',
    '/images/achievements/cert-competition.webp',
    'https://certificate.verification.url/sample1',
    'Award',
    1,
    true,
    'published'
),
(
    'd0000000-0000-0000-0000-000000000002',
    'Certified Web Developer: Modern Frontend & Backend',
    'Dicoding Academy Indonesia',
    '2025',
    'Sertifikasi kompetensi pengembangan aplikasi web berskala enterprise menggunakan JavaScript, Next.js, dan RESTful architecture.',
    '/images/achievements/cert-dicoding.webp',
    'https://www.dicoding.com/certificates/sample',
    'Certification',
    2,
    true,
    'published'
),
(
    'd0000000-0000-0000-0000-000000000003',
    'Database Engineering & Cloud Foundations',
    'Cisco Networking Academy',
    '2024',
    'Kompetensi perancangan skema relasional, optimasi query SQL, serta konfigurasi keamanan data dan basis komputasi awan.',
    '/images/achievements/cert-cisco.webp',
    'https://cisco.credential.net/sample',
    'Certification',
    3,
    true,
    'published'
)
ON CONFLICT (id) DO NOTHING;

-- 7. Experiences
INSERT INTO public.experiences (
    id, position, organization, start_date, end_date,
    is_current, description, responsibilities, logo_path, sort_order, is_visible, publication_status
) VALUES
(
    'e0000000-0000-0000-0000-000000000001',
    'Koordinator Divisi Riset & Pengembangan Web',
    'Himpunan Mahasiswa Teknik Informatika',
    '2024',
    NULL,
    true,
    'Memimpin tim teknis dalam pengembangan website himpunan, platform informasi kegiatan akademik, dan workshop coding bagi mahasiswa baru.',
    ARRAY[
        'Mengkoordinasikan tim pengembangan web dan arsitektur database proyek mahasiswa',
        'Mengadakan pelatihan dasar pemrograman web dan Git collaboration untuk 50+ peserta',
        'Merancang standarisasi kode dan code review internal himpunan'
    ],
    '/images/experience/hmti-logo.webp',
    1,
    true,
    'published'
),
(
    'e0000000-0000-0000-0000-000000000002',
    'Full-Stack Developer (Proyek Kolaboratif)',
    'Lab Rekayasa Perangkat Lunak TIK',
    '2024',
    '2025',
    false,
    'Berkontribusi dalam riset dan implementasi sistem informasi absensi dan pelacakan aset laboratorium jurusan.',
    ARRAY[
        'Mengembangkan modul frontend interaktif berbasis React dan Tailwind CSS',
        'Mengintegrasikan API backend PostgreSQL dengan keamanan autentikasi berbasis token',
        'Melakukan uji fungsionalitas dan pemeliharaan performa sistem'
    ],
    '/images/experience/lab-logo.webp',
    2,
    true,
    'published'
)
ON CONFLICT (id) DO NOTHING;

-- 8. Social Links
INSERT INTO public.social_links (platform, label, url, icon_name, sort_order, is_visible) VALUES
('github', 'GitHub', 'https://github.com/abrar-astafaraiz', 'Github', 1, true),
('linkedin', 'LinkedIn', 'https://linkedin.com/in/abrar-astafaraiz', 'Linkedin', 2, true),
('instagram', 'Instagram', 'https://instagram.com/abrar_astafaraiz', 'Instagram', 3, true),
('email', 'Email', 'mailto:abrar.astafaraiz@gmail.com', 'Mail', 4, true)
ON CONFLICT DO NOTHING;

-- 9. Site Settings
INSERT INTO public.site_settings (setting_key, setting_value) VALUES
('appearance', '{
    "default_public_theme": "light",
    "animations_enabled": true,
    "animation_intensity": "standard",
    "hero_gradient": "aurora"
}'::jsonb),
('seo', '{
    "site_title": "Abrar Astafaraiz | Personal Website",
    "meta_description": "Personal website of Abrar Astafaraiz, showcasing software development projects, technical skills, experience, and professional achievements.",
    "canonical_url": "https://abrar-astafaraiz.vercel.app",
    "og_title": "Abrar Astafaraiz — Full-Stack Developer Portfolio",
    "og_description": "Building Digital Experiences Through Code. Explore web engineering projects, certifications, and technical proficiencies.",
    "og_image": "/images/og-image.webp",
    "robots": "index, follow"
}'::jsonb),
('contact_info', '{
    "email": "abrar.astafaraiz@gmail.com",
    "location": "Indonesia",
    "cta_heading": "Tertarik Membangun Sesuatu yang Hebat Bersama?",
    "cta_subtext": "Saya selalu terbuka untuk diskusi proyek baru, peluang magang, atau kolaborasi software engineering.",
    "footer_text": "© 2026 Abrar Astafaraiz. All rights reserved. Crafted with Next.js & Supabase."
}'::jsonb)
ON CONFLICT (setting_key) DO UPDATE SET
    setting_value = EXCLUDED.setting_value;
