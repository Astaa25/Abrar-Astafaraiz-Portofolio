import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { revalidatePath } from 'next/cache';
import { createAdminClient } from '@/lib/supabase/admin';
import { DataService } from '@/services/data-service';

export async function GET() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const supabaseKey = (process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)?.trim();

  const envStatus = {
    hasUrl: Boolean(supabaseUrl && supabaseUrl.length > 5),
    hasAnonKey: Boolean(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim()),
    hasServiceRole: Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY?.trim()),
    url: supabaseUrl ? supabaseUrl.replace(/^(https?:\/\/)([^.]+)(.*)$/, '$1$2...') : '',
  };

  if (!envStatus.hasUrl || (!envStatus.hasAnonKey && !envStatus.hasServiceRole)) {
    return NextResponse.json({
      configured: false,
      connected: false,
      message: 'Supabase belum terkonfigurasi. Kunci API atau URL masih kosong.',
      env: envStatus,
    });
  }

  try {
    const supabase = createAdminClient();
    if (!supabase) {
      return NextResponse.json({
        configured: false,
        connected: false,
        message: 'Gagal membuat Supabase client.',
        env: envStatus,
      });
    }

    // Test query
    const { data: profileData, error: profileErr } = await supabase
      .from('profiles')
      .select('id, display_name')
      .limit(1)
      .maybeSingle();

    if (profileErr) {
      const isMissingTable =
        profileErr.code === '42P01' ||
        profileErr.message?.toLowerCase().includes('relation') ||
        profileErr.message?.toLowerCase().includes('not exist');

      return NextResponse.json({
        configured: true,
        connected: false,
        migrationNeeded: isMissingTable,
        error: isMissingTable
          ? 'Tabel database belum dibuat di Supabase. Silakan jalankan file SQL migrasi di SQL Editor Supabase.'
          : profileErr.message,
        env: envStatus,
      });
    }

    // Collect counts
    const [skillsCount, projectsCount, achievementsCount, experiencesCount] = await Promise.all([
      supabase.from('skills').select('id', { count: 'exact', head: true }),
      supabase.from('projects').select('id', { count: 'exact', head: true }),
      supabase.from('achievements').select('id', { count: 'exact', head: true }),
      supabase.from('experiences').select('id', { count: 'exact', head: true }),
    ]);

    return NextResponse.json({
      configured: true,
      connected: true,
      message: 'Berhasil terhubung ke Supabase.',
      counts: {
        profileExists: Boolean(profileData),
        skills: skillsCount.count || 0,
        projects: projectsCount.count || 0,
        achievements: achievementsCount.count || 0,
        experiences: experiencesCount.count || 0,
      },
      env: envStatus,
    });
  } catch (err) {
    return NextResponse.json({
      configured: true,
      connected: false,
      error: err instanceof Error ? err.message : String(err),
      env: envStatus,
    });
  }
}

export async function POST(req: Request) {
  try {
    const supabase = createAdminClient();
    if (!supabase) {
      return NextResponse.json(
        { error: 'Supabase belum dikonfigurasi. Lengkapi NEXT_PUBLIC_SUPABASE_URL dan API key.' },
        { status: 400 }
      );
    }

    // Read payload or fallback to published content
    let content = DataService.getPublishedContent();
    try {
      const body = await req.json();
      if (body && body.profile) {
        content = body;
      }
    } catch {
      // JSON body was empty or not provided, use default
    }

    const isUUID = (str?: string) =>
      Boolean(str && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(str));

    // 1. Upsert Profile
    const profilePayload = {
      id: isUUID(content.profile?.id) ? content.profile.id : 'a0000000-0000-0000-0000-000000000001',
      display_name: content.profile.display_name,
      headline: content.profile.headline,
      short_bio: content.profile.short_bio,
      about_content: content.profile.about_content,
      profile_image_path: content.profile.profile_image_path,
      hero_image_path: content.profile.hero_image_path,
      tagline: content.profile.tagline,
      primary_cta_label: content.profile.primary_cta_label,
      primary_cta_target: content.profile.primary_cta_target,
      secondary_cta_label: content.profile.secondary_cta_label,
      secondary_cta_target: content.profile.secondary_cta_target,
      updated_at: new Date().toISOString(),
    };
    await supabase.from('profiles').upsert(profilePayload, { onConflict: 'id' });

    // 2. Upsert Section Settings
    if (content.sections && content.sections.length > 0) {
      const sectionsPayload = content.sections.map((s) => ({
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

    // 3. Upsert Skills
    if (content.skills && content.skills.length > 0) {
      const skillsPayload = content.skills.map((sk) => ({
        name: sk.name,
        category: sk.category,
        description: sk.description || null,
        icon_name: sk.icon_name || null,
        proficiency_label: sk.proficiency_label || null,
        sort_order: sk.sort_order,
        is_visible: sk.is_visible,
        updated_at: new Date().toISOString(),
      }));
      await supabase.from('skills').upsert(skillsPayload, { onConflict: 'name' });
    }

    // 4. Upsert Social Links
    if (content.socialLinks && content.socialLinks.length > 0) {
      const socialsPayload = content.socialLinks.map((soc) => ({
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

    // 5. Upsert Projects
    if (content.projects && content.projects.length > 0) {
      const projectsPayload = content.projects.map((p) => ({
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

    // Revalidate public pages
    try {
      revalidatePath('/', 'page');
    } catch {
      // Revalidation warning can be safely caught
    }

    return NextResponse.json({
      success: true,
      message: 'Seluruh konten berhasil disinkronisasi ke database Supabase!',
      syncedAt: new Date().toISOString(),
    });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Gagal sinkronisasi data ke Supabase' },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    const { url, anonKey, serviceRoleKey } = await req.json();
    if (!url || !anonKey) {
      return NextResponse.json({ error: 'URL dan Anon Key wajib diisi' }, { status: 400 });
    }

    const envPath = path.join(process.cwd(), '.env.local');
    let envContent = '';
    if (fs.existsSync(envPath)) {
      envContent = fs.readFileSync(envPath, 'utf-8');
    }

    const updateOrAppend = (content: string, key: string, value: string) => {
      const regex = new RegExp(`^${key}=.*$`, 'm');
      if (regex.test(content)) {
        return content.replace(regex, `${key}=${value}`);
      }
      return `${content}\n${key}=${value}`;
    };

    let updated = updateOrAppend(envContent, 'NEXT_PUBLIC_SUPABASE_URL', url.trim());
    updated = updateOrAppend(updated, 'NEXT_PUBLIC_SUPABASE_ANON_KEY', anonKey.trim());
    if (serviceRoleKey) {
      updated = updateOrAppend(updated, 'SUPABASE_SERVICE_ROLE_KEY', serviceRoleKey.trim());
    }

    fs.writeFileSync(envPath, updated, 'utf-8');

    // Update process.env in-memory immediately
    process.env.NEXT_PUBLIC_SUPABASE_URL = url.trim();
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = anonKey.trim();
    if (serviceRoleKey) {
      process.env.SUPABASE_SERVICE_ROLE_KEY = serviceRoleKey.trim();
    }

    return NextResponse.json({
      success: true,
      message: 'Kredensial Supabase berhasil disimpan ke .env.local!',
    });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Gagal menyimpan kredensial' },
      { status: 500 }
    );
  }
}
