import { z } from 'zod';

export const httpsUrlSchema = z
  .string()
  .trim()
  .refine(
    (val) => {
      if (!val) return true;
      try {
        const parsed = new URL(val);
        return parsed.protocol === 'https:' || parsed.protocol === 'http:';
      } catch {
        return false;
      }
    },
    { message: 'URL harus berformat valid (contoh: https://example.com)' }
  );

export const projectSchema = z.object({
  title: z.string().min(2, 'Nama proyek minimal 2 karakter'),
  slug: z
    .string()
    .min(2, 'Slug minimal 2 karakter')
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug harus berupa huruf kecil, angka, dan tanda hubung'),
  short_description: z.string().min(10, 'Deskripsi singkat minimal 10 karakter'),
  full_description: z.string().min(20, 'Deskripsi lengkap minimal 20 karakter'),
  year: z.string().regex(/^\d{4}$/, 'Tahun harus berupa 4 digit angka (misal: 2026)'),
  category: z.string().min(2, 'Kategori proyek wajib dipilih'),
  technologies: z.array(z.string()).min(1, 'Minimal cantumkan satu teknologi'),
  cover_image_path: z.string().min(1, 'Cover image wajib disediakan'),
  project_url: httpsUrlSchema.optional().nullable(),
  project_url_enabled: z.boolean().default(false),
  is_featured: z.boolean().default(false),
  is_visible: z.boolean().default(true),
  sort_order: z.number().int().default(0),
  publication_status: z.enum(['draft', 'published', 'archived']).default('draft'),
});

export const skillSchema = z.object({
  name: z.string().min(1, 'Nama skill wajib diisi'),
  category: z.string().min(1, 'Kategori skill wajib dipilih'),
  description: z.string().optional().nullable(),
  icon_name: z.string().optional().nullable(),
  proficiency_label: z.string().min(1, 'Tingkat penguasaan wajib dipilih (misal: Advanced, Proficient, Familiar)'),
  sort_order: z.number().int().default(0),
  is_visible: z.boolean().default(true),
});

export const achievementSchema = z.object({
  title: z.string().min(3, 'Judul pencapaian minimal 3 karakter'),
  organizer: z.string().min(2, 'Penyelenggara / institusi wajib diisi'),
  achievement_date: z.string().min(4, 'Tahun / tanggal wajib diisi'),
  description: z.string().min(10, 'Deskripsi minimal 10 karakter'),
  image_path: z.string().optional().nullable(),
  verification_url: httpsUrlSchema.optional().nullable(),
  category: z.string().default('Certification'),
  sort_order: z.number().int().default(0),
  is_visible: z.boolean().default(true),
  publication_status: z.enum(['draft', 'published']).default('published'),
});

export const experienceSchema = z
  .object({
    position: z.string().min(2, 'Posisi / jabatan minimal 2 karakter'),
    organization: z.string().min(2, 'Nama organisasi / instansi wajib diisi'),
    start_date: z.string().min(2, 'Periode mulai wajib diisi'),
    end_date: z.string().optional().nullable(),
    is_current: z.boolean().default(false),
    description: z.string().min(10, 'Deskripsi pengalaman minimal 10 karakter'),
    responsibilities: z.array(z.string()).default([]),
    logo_path: z.string().optional().nullable(),
    sort_order: z.number().int().default(0),
    is_visible: z.boolean().default(true),
    publication_status: z.enum(['draft', 'published']).default('published'),
  })
  .refine(
    (data) => {
      if (data.is_current) return true;
      if (!data.end_date) return true;
      // If both are numbers/years
      const startNum = parseInt(data.start_date, 10);
      const endNum = parseInt(data.end_date, 10);
      if (!isNaN(startNum) && !isNaN(endNum)) {
        return endNum >= startNum;
      }
      return true;
    },
    {
      message: 'Tanggal akhir tidak boleh lebih awal dari tanggal mulai',
      path: ['end_date'],
    }
  );

export const profileSchema = z.object({
  display_name: z.string().min(2, 'Nama lengkap wajib diisi'),
  headline: z.string().min(5, 'Headline profesional minimal 5 karakter'),
  short_bio: z.string().min(10, 'Bio singkat minimal 10 karakter'),
  about_content: z.string().min(20, 'Konten tentang saya minimal 20 karakter'),
  profile_image_path: z.string().min(1, 'Foto profil wajib ada'),
  hero_image_path: z.string().optional().nullable(),
  tagline: z.string().min(5, 'Tagline wajib diisi'),
  primary_cta_label: z.string().min(2, 'Label CTA utama wajib diisi'),
  primary_cta_target: z.string().min(1, 'Target CTA utama wajib diisi'),
  secondary_cta_label: z.string().min(2, 'Label CTA sekunder wajib diisi'),
  secondary_cta_target: z.string().min(1, 'Target CTA sekunder wajib diisi'),
});

export const socialLinkSchema = z.object({
  platform: z.string().min(1, 'Platform wajib dipilih'),
  label: z.string().min(1, 'Label wajib diisi'),
  url: z.string().min(1, 'URL atau link mailto wajib diisi'),
  icon_name: z.string().min(1, 'Ikon wajib dipilih'),
  sort_order: z.number().int().default(0),
  is_visible: z.boolean().default(true),
});

export const appearanceSettingsSchema = z.object({
  default_public_theme: z.enum(['light', 'dark']),
  animations_enabled: z.boolean(),
  animation_intensity: z.enum(['subtle', 'standard', 'high']),
  hero_gradient: z.enum(['aurora', 'soft', 'subtle']),
  site_logo_url: z.string().optional().nullable(),
  site_logo_initials: z.string().max(6).optional(),
});

export const seoSettingsSchema = z.object({
  site_title: z.string().min(3, 'Judul situs wajib diisi'),
  meta_description: z.string().min(10, 'Meta description minimal 10 karakter'),
  canonical_url: httpsUrlSchema,
  og_title: z.string().min(3, 'OG Title wajib diisi'),
  og_description: z.string().min(10, 'OG Description wajib diisi'),
  og_image: z.string().min(1, 'OG Image path wajib diisi'),
  robots: z.string().min(1, 'Robots directive wajib diisi'),
});

export const loginSchema = z.object({
  email: z.string().email('Format email tidak valid'),
  password: z.string().min(6, 'Password minimal 6 karakter'),
});
