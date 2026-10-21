import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { revalidatePath } from 'next/cache';
import { createAdminClient } from '@/lib/supabase/admin';
import { DataService, INITIAL_PROFILE } from '@/services/data-service';
import { ServerDataService } from '@/services/server-data-service';

export async function GET() {
  try {
    const content = await ServerDataService.getPublishedContent();
    return NextResponse.json(content.profile || INITIAL_PROFILE);
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Gagal memuat profil' },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const profile = body.profile || body;

    if (!profile || !profile.display_name) {
      return NextResponse.json(
        { error: 'Data profil tidak lengkap atau tidak valid.' },
        { status: 400 }
      );
    }

    const isUUID = (str?: string) =>
      Boolean(str && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(str));

    const profilePayload = {
      id: isUUID(profile.id) ? profile.id : 'a0000000-0000-0000-0000-000000000001',
      display_name: profile.display_name,
      headline: profile.headline || '',
      short_bio: profile.short_bio || '',
      about_content: profile.about_content || '',
      profile_image_path: profile.profile_image_path || '/images/profile-avatar.webp',
      hero_image_path: profile.hero_image_path || '/images/hero-visual.webp',
      tagline: profile.tagline || '',
      primary_cta_label: profile.primary_cta_label || 'Lihat Proyek',
      primary_cta_target: profile.primary_cta_target || '#projects',
      secondary_cta_label: profile.secondary_cta_label || 'Hubungi Saya',
      secondary_cta_target: profile.secondary_cta_target || '#contact',
      updated_at: new Date().toISOString(),
    };

    // 1. Direct real-time upsert to Supabase
    let supabaseSaved = false;
    const supabase = createAdminClient();
    if (supabase) {
      try {
        const { error: sbError } = await supabase
          .from('profiles')
          .upsert(profilePayload, { onConflict: 'id' });

        if (sbError) {
          console.error('Supabase profile upsert error:', sbError);
        } else {
          supabaseSaved = true;
        }
      } catch (sbErr) {
        console.error('Supabase profile save exception:', sbErr);
      }
    }

    // 2. Persist to local JSON data file without overwriting other sections
    try {
      const dataDir = path.join(process.cwd(), 'data');
      if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
      }
      const filePath = path.join(dataDir, 'published-content.json');
      let currentFileContent: any = {};
      if (fs.existsSync(filePath)) {
        try {
          currentFileContent = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        } catch {}
      }

      const merged = {
        ...currentFileContent,
        published: {
          ...(currentFileContent.published || {}),
          profile: profilePayload,
          lastUpdated: new Date().toISOString(),
        },
        draft: {
          ...(currentFileContent.draft || {}),
          profile: profilePayload,
        },
      };

      fs.writeFileSync(filePath, JSON.stringify(merged, null, 2), 'utf-8');
    } catch (fsErr) {
      console.warn('Local file write skipped:', fsErr);
    }

    // 3. Update server in-memory store
    try {
      DataService.updateDraftProfile(profilePayload);
    } catch {}

    // 4. Invalidate Next.js caches
    try {
      revalidatePath('/', 'page');
      revalidatePath('/', 'layout');
      revalidatePath('/admin', 'layout');
      revalidatePath('/admin/profile', 'page');
    } catch {}

    return NextResponse.json({
      success: true,
      supabaseSaved,
      profile: profilePayload,
      message: 'Profil dan foto berhasil diperbarui!',
    });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Gagal memperbarui profil' },
      { status: 500 }
    );
  }
}
