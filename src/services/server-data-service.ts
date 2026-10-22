import fs from 'fs';
import path from 'path';
import { DataService } from '@/services/data-service';
import { WebsiteContent } from '@/types/content';
import { createAdminClient } from '@/lib/supabase/admin';
import { createServerSupabaseClient } from '@/lib/supabase/server';

export class ServerDataService {
  /**
   * Retrieves the published content on the server.
   * Priority:
   * 1. Supabase (if connected & configured)
   * 2. Local persisted JSON file (data/published-content.json)
   * 3. In-memory / Default DataService fallback
   */
  static async getPublishedContent(): Promise<WebsiteContent> {
    const fallback = DataService.getPublishedContent();

    // 0. Load persisted settings from disk if available
    let mergedSettings = fallback.settings;
    try {
      const filePath = path.join(process.cwd(), 'data', 'published-content.json');
      if (fs.existsSync(filePath)) {
        const raw = fs.readFileSync(filePath, 'utf-8');
        const parsed = JSON.parse(raw);
        if (parsed?.published?.settings) {
          mergedSettings = {
            ...fallback.settings,
            ...parsed.published.settings,
            appearance: {
              ...fallback.settings.appearance,
              ...(parsed.published.settings.appearance || {}),
            },
            seo: {
              ...fallback.settings.seo,
              ...(parsed.published.settings.seo || {}),
            },
            contact_info: {
              ...fallback.settings.contact_info,
              ...(parsed.published.settings.contact_info || {}),
            },
          };
        }
      }
    } catch (err) {
      console.warn('Could not read disk settings, using fallback settings', err);
    }

    // 1. Try Supabase if configured
    if (process.env.NEXT_PUBLIC_SUPABASE_URL?.trim()) {
      try {
        const supabase = createAdminClient();
      if (supabase) {
        const { data: profile, error: profileErr } = await supabase
          .from('profiles')
          .select('*')
          .limit(1)
          .maybeSingle();

        if (profile && !profileErr) {
          const [skillsRes, projectsRes, achievementsRes, experiencesRes, socialsRes, sectionsRes, settingsRes] =
            await Promise.allSettled([
              supabase.from('skills').select('*').eq('is_visible', true).order('sort_order', { ascending: true }),
              supabase.from('projects').select('*').eq('is_visible', true).eq('publication_status', 'published').order('sort_order', { ascending: true }),
              supabase.from('achievements').select('*').eq('is_visible', true).order('sort_order', { ascending: true }),
              supabase.from('experiences').select('*').eq('is_visible', true).order('sort_order', { ascending: true }),
              supabase.from('social_links').select('*').eq('is_visible', true).order('sort_order', { ascending: true }),
              supabase.from('section_settings').select('*').order('sort_order', { ascending: true }),
              supabase.from('site_settings').select('*'),
            ]);

          const skills = (skillsRes.status === 'fulfilled' && skillsRes.value.data)
            ? skillsRes.value.data
            : fallback.skills;

          const projects = (projectsRes.status === 'fulfilled' && projectsRes.value.data)
            ? projectsRes.value.data
            : fallback.projects;

          const achievements = (achievementsRes.status === 'fulfilled' && achievementsRes.value.data)
            ? achievementsRes.value.data
            : fallback.achievements;

          const experiences = (experiencesRes.status === 'fulfilled' && experiencesRes.value.data)
            ? experiencesRes.value.data
            : fallback.experiences;

          const socialLinks = (socialsRes.status === 'fulfilled' && socialsRes.value.data)
            ? socialsRes.value.data
            : fallback.socialLinks;

          const sections = (sectionsRes.status === 'fulfilled' && sectionsRes.value.data)
            ? sectionsRes.value.data
            : fallback.sections;

          if (settingsRes.status === 'fulfilled' && settingsRes.value.data) {
            settingsRes.value.data.forEach((row: any) => {
              if (row.setting_key && row.setting_value) {
                (mergedSettings as any)[row.setting_key] = {
                  ...((mergedSettings as any)[row.setting_key] || {}),
                  ...row.setting_value,
                };
              }
            });
          }

          return {
            profile: { ...fallback.profile, ...profile },
            skills,
            projects,
            achievements,
            experiences,
            socialLinks,
            sections,
            settings: mergedSettings,
            lastUpdated: new Date().toISOString(),
          };
        }
      }
      } catch (err) {
        console.warn('Supabase server fetch error, falling back to local file/memory store:', err);
      }
    }

    // 2. Try Local File Storage (data/published-content.json)
    try {
      const filePath = path.join(process.cwd(), 'data', 'published-content.json');
      if (fs.existsSync(filePath)) {
        const raw = fs.readFileSync(filePath, 'utf-8');
        const parsed = JSON.parse(raw);
        if (parsed && parsed.published && parsed.published.profile) {
          return {
            ...fallback,
            ...parsed.published,
            settings: mergedSettings,
          };
        }
      }
    } catch (err) {
      console.warn('Local file fetch error:', err);
    }

    // 3. Fallback to default in-memory content
    return {
      ...fallback,
      settings: mergedSettings,
    };
  }
}
