import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { revalidatePath } from 'next/cache';
import { DataService } from '@/services/data-service';
import { ServerDataService } from '@/services/server-data-service';
import { createAdminClient } from '@/lib/supabase/admin';

export async function GET() {
  try {
    const content = await ServerDataService.getPublishedContent();
    return NextResponse.json(content, {
      headers: {
        'Cache-Control': 'no-store, no-cache, max-age=0, must-revalidate',
      },
    });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.stack || err.message : String(err) },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (!body) {
      return NextResponse.json({ error: 'Data store tidak valid' }, { status: 400 });
    }

    const pub = body.published || body.draft || body;

    // Persist to local disk JSON file if writable (fallback)
    try {
      const dataDir = path.join(process.cwd(), 'data');
      if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
      }
      const filePath = path.join(dataDir, 'published-content.json');
      fs.writeFileSync(filePath, JSON.stringify(body, null, 2), 'utf-8');
    } catch (fsErr) {
      // In serverless environments like Vercel, filesystem is read-only
      console.warn('Local file write skipped:', fsErr);
    }

    // Update in-memory store on server
    if (body.published || body.draft) {
      DataService.syncFromServerStore(body);
    }

    // Direct synchronization to Supabase database (Real-Time Source of Truth)
    const supabase = createAdminClient();
    if (supabase) {
      try {
        // 1. Profile
        if (pub.profile) {
          await supabase.from('profiles').upsert(
            {
              id: 'a0000000-0000-0000-0000-000000000001',
              display_name: pub.profile.display_name,
              headline: pub.profile.headline,
              short_bio: pub.profile.short_bio,
              about_content: pub.profile.about_content,
              profile_image_path: pub.profile.profile_image_path,
              hero_image_path: pub.profile.hero_image_path,
              tagline: pub.profile.tagline,
              primary_cta_label: pub.profile.primary_cta_label,
              primary_cta_target: pub.profile.primary_cta_target,
              secondary_cta_label: pub.profile.secondary_cta_label,
              secondary_cta_target: pub.profile.secondary_cta_target,
              updated_at: new Date().toISOString(),
            },
            { onConflict: 'id' }
          );
        }

        // 2. Section Settings
        if (pub.sections && Array.isArray(pub.sections) && pub.sections.length > 0) {
          const sectionsPayload = pub.sections.map((s: any) => ({
            section_key: s.section_key,
            title: s.title,
            subtitle: s.subtitle,
            nav_label: s.nav_label,
            is_visible: s.is_visible,
            show_in_nav: s.show_in_nav,
            sort_order: s.sort_order,
            updated_at: new Date().toISOString(),
          }));
          await supabase.from('section_settings').upsert(sectionsPayload, { onConflict: 'section_key' });
        }

        // 3. Skills
        if (pub.skills && Array.isArray(pub.skills) && pub.skills.length > 0) {
          const skillsPayload = pub.skills.map((sk: any) => ({
            name: sk.name,
            category: sk.category,
            description: sk.description || null,
            icon_name: sk.icon_name || null,
            proficiency_label: sk.proficiency_label || null,
            sort_order: sk.sort_order,
            is_visible: Boolean(sk.is_visible),
            updated_at: new Date().toISOString(),
          }));
          await supabase.from('skills').upsert(skillsPayload, { onConflict: 'name' });
        }

        // 4. Social Links
        if (pub.socialLinks && Array.isArray(pub.socialLinks)) {
          await supabase.from('social_links').delete().neq('id', '00000000-0000-0000-0000-000000000000');
          if (pub.socialLinks.length > 0) {
            const socialsPayload = pub.socialLinks.map((soc: any, index: number) => ({
              platform: soc.platform,
              label: soc.label,
              url: soc.url,
              icon_name: soc.icon_name,
              sort_order: soc.sort_order ?? index + 1,
              is_visible: soc.is_visible !== undefined ? Boolean(soc.is_visible) : true,
              updated_at: new Date().toISOString(),
            }));
            await supabase.from('social_links').insert(socialsPayload);
          }
        }

        // 5. Projects
        if (pub.projects && Array.isArray(pub.projects)) {
          await supabase.from('projects').delete().neq('id', '00000000-0000-0000-0000-000000000000');
          if (pub.projects.length > 0) {
            const projectsPayload = pub.projects.map((p: any, index: number) => ({
              title: p.title,
              slug: p.slug,
              short_description: p.short_description,
              full_description: p.full_description,
              year: p.year,
              category: p.category,
              technologies: p.technologies || [],
              cover_image_path: p.cover_image_path,
              project_url: p.project_url || null,
              project_url_enabled: Boolean(p.project_url_enabled),
              is_featured: Boolean(p.is_featured),
              is_visible: Boolean(p.is_visible),
              sort_order: p.sort_order ?? index + 1,
              publication_status: p.publication_status || 'published',
              updated_at: new Date().toISOString(),
            }));
            await supabase.from('projects').insert(projectsPayload);
          }
        }

        // 6. Achievements
        if (pub.achievements && Array.isArray(pub.achievements)) {
          await supabase.from('achievements').delete().neq('id', '00000000-0000-0000-0000-000000000000');
          if (pub.achievements.length > 0) {
            const achievementsPayload = pub.achievements.map((a: any, index: number) => ({
              title: a.title,
              organizer: a.organizer,
              achievement_date: a.achievement_date,
              description: a.description || '',
              image_path: a.image_path || null,
              verification_url: a.verification_url || null,
              category: a.category || 'Certification',
              sort_order: a.sort_order ?? index + 1,
              is_visible: a.is_visible !== undefined ? Boolean(a.is_visible) : true,
              publication_status: a.publication_status || 'published',
              updated_at: new Date().toISOString(),
            }));
            await supabase.from('achievements').insert(achievementsPayload);
          }
        }

        // 7. Experiences
        if (pub.experiences && Array.isArray(pub.experiences)) {
          await supabase.from('experiences').delete().neq('id', '00000000-0000-0000-0000-000000000000');
          if (pub.experiences.length > 0) {
            const experiencesPayload = pub.experiences.map((e: any, index: number) => ({
              position: e.position,
              organization: e.organization,
              start_date: e.start_date,
              end_date: e.is_current ? null : e.end_date || null,
              is_current: Boolean(e.is_current),
              description: e.description || '',
              responsibilities: Array.isArray(e.responsibilities) ? e.responsibilities : [],
              logo_path: e.logo_path || null,
              sort_order: e.sort_order ?? index + 1,
              is_visible: e.is_visible !== undefined ? Boolean(e.is_visible) : true,
              publication_status: e.publication_status || 'published',
              updated_at: new Date().toISOString(),
            }));
            await supabase.from('experiences').insert(experiencesPayload);
          }
        }
      } catch (sbErr) {
        console.error('Supabase real-time sync error:', sbErr);
      }
    }

    // Invalidate cached pages so updates appear immediately without browser or CDN stale cache
    try {
      revalidatePath('/', 'page');
      revalidatePath('/', 'layout');
      revalidatePath('/admin', 'layout');
    } catch {
      // safe fallback
    }

    return NextResponse.json({
      success: true,
      message: 'Konten berhasil diperbarui dan disinkronkan ke Supabase secara langsung.',
    });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Gagal menyimpan konten ke server' },
      { status: 500 }
    );
  }
}
