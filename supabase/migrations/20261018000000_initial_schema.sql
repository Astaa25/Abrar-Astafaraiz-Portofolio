-- Supabase Migration: 20261018000000_initial_schema.sql
-- Product: Abrar Astafaraiz | Personal Website

-- Enable pgcrypto for UUID generation if needed
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 1. Profiles Table
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    display_name TEXT NOT NULL DEFAULT 'Abrar Astafaraiz',
    headline TEXT NOT NULL DEFAULT 'Full-Stack Developer | Web & Software Development',
    short_bio TEXT NOT NULL DEFAULT 'Mahasiswa Teknik Informatika yang berfokus pada pengembangan aplikasi web, software engineering, arsitektur database, dan pengalaman digital yang modern.',
    about_content TEXT NOT NULL DEFAULT 'Halo! Saya Abrar Astafaraiz, mahasiswa Teknik Informatika dengan dedikasi tinggi dalam software engineering dan modern web development. Saya berfokus pada perancangan dan implementasi aplikasi yang aman, skalabel, serta berorientasi pada kepuasan pengguna. Melalui berbagai proyek akademik dan kolaboratif, saya terbiasa memecahkan masalah kompleks dengan pendekatan rekayasa perangkat lunak yang sistematis.',
    profile_image_path TEXT DEFAULT '/images/profile-avatar.webp',
    hero_image_path TEXT DEFAULT '/images/hero-visual.webp',
    tagline TEXT NOT NULL DEFAULT 'Building Digital Experiences Through Code.',
    primary_cta_label TEXT NOT NULL DEFAULT 'Lihat Proyek',
    primary_cta_target TEXT NOT NULL DEFAULT '#projects',
    secondary_cta_label TEXT NOT NULL DEFAULT 'Hubungi Saya',
    secondary_cta_target TEXT NOT NULL DEFAULT '#contact',
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Skills Table
CREATE TABLE IF NOT EXISTS public.skills (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    category TEXT NOT NULL, -- 'Programming Languages', 'Web Development', 'Mobile Development', 'Database Management', 'Tools & Platforms', 'UI/UX Design', 'Other Technical Skills'
    description TEXT,
    icon_name TEXT,
    proficiency_label TEXT, -- E.g. 'Advanced', 'Proficient', 'Familiar' (NO fake % numbers)
    sort_order INT NOT NULL DEFAULT 0,
    is_visible BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Projects Table
CREATE TABLE IF NOT EXISTS public.projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    short_description TEXT NOT NULL,
    full_description TEXT NOT NULL,
    year TEXT NOT NULL,
    category TEXT NOT NULL,
    technologies TEXT[] NOT NULL DEFAULT '{}',
    cover_image_path TEXT NOT NULL,
    project_url TEXT,
    project_url_enabled BOOLEAN NOT NULL DEFAULT false,
    is_featured BOOLEAN NOT NULL DEFAULT false,
    is_visible BOOLEAN NOT NULL DEFAULT true,
    sort_order INT NOT NULL DEFAULT 0,
    publication_status TEXT NOT NULL DEFAULT 'draft', -- 'draft', 'published', 'archived'
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    published_at TIMESTAMPTZ
);

-- 4. Project Images Table (Carousel)
CREATE TABLE IF NOT EXISTS public.project_images (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
    storage_path TEXT NOT NULL,
    alt_text TEXT NOT NULL,
    caption TEXT,
    sort_order INT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Achievements Table
CREATE TABLE IF NOT EXISTS public.achievements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    organizer TEXT NOT NULL,
    achievement_date TEXT NOT NULL,
    description TEXT NOT NULL,
    image_path TEXT,
    verification_url TEXT,
    category TEXT NOT NULL DEFAULT 'Certification',
    sort_order INT NOT NULL DEFAULT 0,
    is_visible BOOLEAN NOT NULL DEFAULT true,
    publication_status TEXT NOT NULL DEFAULT 'published',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Experiences Table
CREATE TABLE IF NOT EXISTS public.experiences (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    position TEXT NOT NULL,
    organization TEXT NOT NULL,
    start_date TEXT NOT NULL,
    end_date TEXT,
    is_current BOOLEAN NOT NULL DEFAULT false,
    description TEXT NOT NULL,
    responsibilities TEXT[] NOT NULL DEFAULT '{}',
    logo_path TEXT,
    sort_order INT NOT NULL DEFAULT 0,
    is_visible BOOLEAN NOT NULL DEFAULT true,
    publication_status TEXT NOT NULL DEFAULT 'published',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. Social Links Table
CREATE TABLE IF NOT EXISTS public.social_links (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    platform TEXT NOT NULL,
    label TEXT NOT NULL,
    url TEXT NOT NULL,
    icon_name TEXT NOT NULL,
    sort_order INT NOT NULL DEFAULT 0,
    is_visible BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. Site Settings Table
CREATE TABLE IF NOT EXISTS public.site_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    setting_key TEXT NOT NULL UNIQUE,
    setting_value JSONB NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. Section Settings Table
CREATE TABLE IF NOT EXISTS public.section_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    section_key TEXT NOT NULL UNIQUE,
    title TEXT NOT NULL,
    subtitle TEXT NOT NULL,
    nav_label TEXT NOT NULL,
    is_visible BOOLEAN NOT NULL DEFAULT true,
    show_in_nav BOOLEAN NOT NULL DEFAULT true,
    sort_order INT NOT NULL DEFAULT 0,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 10. Content Versions Table
CREATE TABLE IF NOT EXISTS public.content_versions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    version_number INT NOT NULL,
    content_snapshot JSONB NOT NULL,
    publication_status TEXT NOT NULL DEFAULT 'published',
    published_by TEXT,
    published_at TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 11. Activity Logs Table
CREATE TABLE IF NOT EXISTS public.activity_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    actor_id TEXT,
    action TEXT NOT NULL,
    entity_type TEXT NOT NULL,
    entity_id TEXT,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 12. Admin Roles Table
CREATE TABLE IF NOT EXISTS public.admin_roles (
    user_id UUID PRIMARY KEY,
    role TEXT NOT NULL DEFAULT 'admin',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_projects_slug ON public.projects(slug);
CREATE INDEX IF NOT EXISTS idx_projects_publication_status ON public.projects(publication_status);
CREATE INDEX IF NOT EXISTS idx_projects_sort_order ON public.projects(sort_order);
CREATE INDEX IF NOT EXISTS idx_project_images_project_id ON public.project_images(project_id);
CREATE INDEX IF NOT EXISTS idx_achievements_publication_status ON public.achievements(publication_status);
CREATE INDEX IF NOT EXISTS idx_experiences_publication_status ON public.experiences(publication_status);
CREATE INDEX IF NOT EXISTS idx_section_settings_key ON public.section_settings(section_key);
CREATE INDEX IF NOT EXISTS idx_activity_logs_created_at ON public.activity_logs(created_at DESC);

-- Row Level Security (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.social_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.section_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.content_versions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activity_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_roles ENABLE ROW LEVEL SECURITY;

-- Public Read Policies (Only published and visible content)
CREATE POLICY "Public profiles are viewable by everyone" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Public skills are viewable by everyone" ON public.skills FOR SELECT USING (is_visible = true);
CREATE POLICY "Public projects are viewable by everyone" ON public.projects FOR SELECT USING (publication_status = 'published' AND is_visible = true);
CREATE POLICY "Public project images are viewable by everyone" ON public.project_images FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.projects WHERE public.projects.id = public.project_images.project_id AND public.projects.publication_status = 'published')
);
CREATE POLICY "Public achievements are viewable by everyone" ON public.achievements FOR SELECT USING (publication_status = 'published' AND is_visible = true);
CREATE POLICY "Public experiences are viewable by everyone" ON public.experiences FOR SELECT USING (publication_status = 'published' AND is_visible = true);
CREATE POLICY "Public social links are viewable by everyone" ON public.social_links FOR SELECT USING (is_visible = true);
CREATE POLICY "Public section settings are viewable by everyone" ON public.section_settings FOR SELECT USING (true);
CREATE POLICY "Public site settings are viewable by everyone" ON public.site_settings FOR SELECT USING (true);

-- Admin Full Access Policies (Authenticated users with admin role)
CREATE POLICY "Admins have full access to profiles" ON public.profiles FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admins have full access to skills" ON public.skills FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admins have full access to projects" ON public.projects FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admins have full access to project_images" ON public.project_images FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admins have full access to achievements" ON public.achievements FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admins have full access to experiences" ON public.experiences FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admins have full access to social_links" ON public.social_links FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admins have full access to site_settings" ON public.site_settings FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admins have full access to section_settings" ON public.section_settings FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admins have full access to content_versions" ON public.content_versions FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admins have full access to activity_logs" ON public.activity_logs FOR ALL TO authenticated USING (true) WITH CHECK (true);
