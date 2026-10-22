import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { revalidatePath } from 'next/cache';
import { DataService, INITIAL_SETTINGS } from '@/services/data-service';
import { ServerDataService } from '@/services/server-data-service';
import { createAdminClient } from '@/lib/supabase/admin';

export async function GET() {
  try {
    const content = await ServerDataService.getPublishedContent();
    return NextResponse.json(content.settings || INITIAL_SETTINGS);
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Gagal memuat pengaturan' },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (!body) {
      return NextResponse.json({ error: 'Data pengaturan kosong' }, { status: 400 });
    }

    // 0. Load existing settings from disk first to ensure no fields are lost
    let currentSettings = DataService.getDraftSettings();
    try {
      const dataDir = path.join(process.cwd(), 'data');
      const filePath = path.join(dataDir, 'published-content.json');
      if (fs.existsSync(filePath)) {
        const raw = fs.readFileSync(filePath, 'utf-8');
        const parsed = JSON.parse(raw);
        if (parsed?.published?.settings) {
          currentSettings = {
            ...currentSettings,
            ...parsed.published.settings,
            appearance: {
              ...currentSettings.appearance,
              ...(parsed.published.settings.appearance || {}),
            },
            seo: {
              ...currentSettings.seo,
              ...(parsed.published.settings.seo || {}),
            },
            contact_info: {
              ...currentSettings.contact_info,
              ...(parsed.published.settings.contact_info || {}),
            },
          };
        }
      }
    } catch (readErr) {
      console.warn('Failed to read existing settings from disk:', readErr);
    }

    const updatedSettings = {
      ...currentSettings,
      ...(body.appearance ? { appearance: { ...currentSettings.appearance, ...body.appearance } } : {}),
      ...(body.seo ? { seo: { ...currentSettings.seo, ...body.seo } } : {}),
      ...(body.contact_info ? { contact_info: { ...currentSettings.contact_info, ...body.contact_info } } : {}),
    };

    // 1. Update in-memory draft settings
    if (body.appearance) {
      DataService.updateDraftSettings('appearance', updatedSettings.appearance);
    }
    if (body.seo) {
      DataService.updateDraftSettings('seo', updatedSettings.seo);
    }
    if (body.contact_info) {
      DataService.updateDraftSettings('contact_info', updatedSettings.contact_info);
    }

    // 2. Persist to data/published-content.json
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
          settings: updatedSettings,
          lastUpdated: new Date().toISOString(),
        },
        draft: {
          ...(currentFileContent.draft || {}),
          settings: updatedSettings,
        },
      };

      fs.writeFileSync(filePath, JSON.stringify(merged, null, 2), 'utf-8');
    } catch (fsErr) {
      console.warn('Local file write skipped:', fsErr);
    }

    // 2.5. Persist to Supabase site_settings if available
    try {
      const supabase = createAdminClient();
      if (supabase) {
        const upsertPromises = [];
        if (body.appearance) {
          upsertPromises.push(
            supabase.from('site_settings').upsert(
              { setting_key: 'appearance', setting_value: updatedSettings.appearance },
              { onConflict: 'setting_key' }
            )
          );
        }
        if (body.seo) {
          upsertPromises.push(
            supabase.from('site_settings').upsert(
              { setting_key: 'seo', setting_value: updatedSettings.seo },
              { onConflict: 'setting_key' }
            )
          );
        }
        if (body.contact_info) {
          upsertPromises.push(
            supabase.from('site_settings').upsert(
              { setting_key: 'contact_info', setting_value: updatedSettings.contact_info },
              { onConflict: 'setting_key' }
            )
          );
        }
        await Promise.allSettled(upsertPromises);
      }
    } catch (sbErr) {
      console.warn('Supabase site_settings write skipped:', sbErr);
    }

    // 3. Revalidate frontend pages
    try {
      revalidatePath('/', 'page');
      revalidatePath('/', 'layout');
      revalidatePath('/admin', 'layout');
      revalidatePath('/admin/appearance', 'page');
    } catch {}

    return NextResponse.json({
      success: true,
      settings: updatedSettings,
      message: 'Pengaturan berhasil disimpan!',
    });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Gagal menyimpan pengaturan' },
      { status: 500 }
    );
  }
}
