import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { revalidatePath } from 'next/cache';
import { DataService } from '@/services/data-service';
import { createAdminClient } from '@/lib/supabase/admin';

export async function GET() {
  try {
    const content = DataService.getPublishedContent();
    return NextResponse.json(content);
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
    if (!body || !body.published) {
      return NextResponse.json({ error: 'Data store tidak valid' }, { status: 400 });
    }

    const dataDir = path.join(process.cwd(), 'data');
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    const filePath = path.join(dataDir, 'published-content.json');
    fs.writeFileSync(filePath, JSON.stringify(body, null, 2), 'utf-8');

    // Update in-memory store on server
    DataService.syncFromServerStore(body);

    // If Supabase is connected, sync to Supabase in parallel
    const supabase = createAdminClient();
    if (supabase) {
      try {
        const pub = body.published;
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

        if (pub.sections && pub.sections.length > 0) {
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

        if (pub.skills && pub.skills.length > 0) {
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

        if (pub.socialLinks && pub.socialLinks.length > 0) {
          const socialsPayload = pub.socialLinks.map((soc: any) => ({
            platform: soc.platform,
            label: soc.label,
            url: soc.url,
            icon_name: soc.icon_name,
            sort_order: soc.sort_order,
            is_visible: soc.is_visible,
            updated_at: new Date().toISOString(),
          }));
          await supabase.from('social_links').upsert(socialsPayload, { onConflict: 'platform' });
        }

        if (pub.projects && pub.projects.length > 0) {
          const projectsPayload = pub.projects.map((p: any) => ({
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
            sort_order: p.sort_order,
            publication_status: p.publication_status || 'published',
            updated_at: new Date().toISOString(),
          }));
          await supabase.from('projects').upsert(projectsPayload, { onConflict: 'slug' });
        }
      } catch (sbErr) {
        console.warn('Silent sync to Supabase encountered an error:', sbErr);
      }
    }

    // Invalidate cached home page so fresh changes appear immediately on refresh
    try {
      revalidatePath('/', 'page');
    } catch {
      // safe fallback
    }

    return NextResponse.json({
      success: true,
      message: 'Konten berhasil disinkronisasi ke server & cache diperbarui.',
    });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Gagal menyimpan konten ke server' },
      { status: 500 }
    );
  }
}
