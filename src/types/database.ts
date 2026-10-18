export type PublicationStatus = 'draft' | 'published' | 'archived';

export interface Profile {
  id: string;
  display_name: string;
  headline: string;
  short_bio: string;
  about_content: string;
  profile_image_path: string;
  hero_image_path: string;
  tagline: string;
  primary_cta_label: string;
  primary_cta_target: string;
  secondary_cta_label: string;
  secondary_cta_target: string;
  updated_at: string;
}

export interface Skill {
  id: string;
  name: string;
  category: string;
  description?: string | null;
  icon_name?: string | null;
  proficiency_label?: string | null;
  sort_order: number;
  is_visible: boolean;
  created_at: string;
  updated_at: string;
}

export interface ProjectImage {
  id: string;
  project_id: string;
  storage_path: string;
  alt_text: string;
  caption?: string | null;
  sort_order: number;
  created_at: string;
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  short_description: string;
  full_description: string;
  year: string;
  category: string;
  technologies: string[];
  cover_image_path: string;
  project_url?: string | null;
  project_url_enabled: boolean;
  is_featured: boolean;
  is_visible: boolean;
  sort_order: number;
  publication_status: PublicationStatus;
  created_at: string;
  updated_at: string;
  published_at?: string | null;
  images?: ProjectImage[];
}

export interface Achievement {
  id: string;
  title: string;
  organizer: string;
  achievement_date: string;
  description: string;
  image_path?: string | null;
  verification_url?: string | null;
  category: string;
  sort_order: number;
  is_visible: boolean;
  publication_status: PublicationStatus;
  created_at: string;
  updated_at: string;
}

export interface Experience {
  id: string;
  position: string;
  organization: string;
  start_date: string;
  end_date?: string | null;
  is_current: boolean;
  description: string;
  responsibilities: string[];
  logo_path?: string | null;
  sort_order: number;
  is_visible: boolean;
  publication_status: PublicationStatus;
  created_at: string;
  updated_at: string;
}

export interface SocialLink {
  id: string;
  platform: string;
  label: string;
  url: string;
  icon_name: string;
  sort_order: number;
  is_visible: boolean;
  created_at: string;
  updated_at: string;
}

export interface SectionSetting {
  id: string;
  section_key: string;
  title: string;
  subtitle: string;
  nav_label: string;
  is_visible: boolean;
  show_in_nav: boolean;
  sort_order: number;
  updated_at: string;
}

export interface AppearanceSettings {
  default_public_theme: 'light' | 'dark';
  animations_enabled: boolean;
  animation_intensity: 'subtle' | 'standard' | 'high';
  hero_gradient: 'aurora' | 'soft' | 'subtle';
}

export interface SeoSettings {
  site_title: string;
  meta_description: string;
  canonical_url: string;
  og_title: string;
  og_description: string;
  og_image: string;
  robots: string;
}

export interface ContactInfoSettings {
  email: string;
  location: string;
  cta_heading: string;
  cta_subtext: string;
  footer_text: string;
}

export interface AboutHighlight {
  id: string;
  icon_name: string;
  title: string;
  description: string;
}

export interface SiteSettingsMap {
  appearance: AppearanceSettings;
  seo: SeoSettings;
  contact_info: ContactInfoSettings;
  about_highlights?: AboutHighlight[];
}

export interface ContentVersion {
  id: string;
  version_number: number;
  content_snapshot: Record<string, unknown>;
  publication_status: string;
  published_by: string;
  published_at: string;
  created_at: string;
}

export interface ActivityLog {
  id: string;
  actor_id?: string | null;
  action: string;
  entity_type: string;
  entity_id?: string | null;
  metadata?: Record<string, unknown> | null;
  created_at: string;
}
