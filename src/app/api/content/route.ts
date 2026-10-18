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
