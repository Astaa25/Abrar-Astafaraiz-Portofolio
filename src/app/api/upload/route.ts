import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { createAdminClient } from '@/lib/supabase/admin';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;
    const folder = (formData.get('folder') as string) || 'uploads';

    if (!file) {
      return NextResponse.json({ error: 'Tidak ada file yang diunggah.' }, { status: 400 });
    }

    // Validate mime type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Format file tidak diizinkan. Hanya JPEG, PNG, WebP, GIF, dan SVG yang didukung.' },
        { status: 400 }
      );
    }

    // Validate size (max 8MB)
    const maxBytes = 8 * 1024 * 1024;
    if (file.size > maxBytes) {
      return NextResponse.json(
        { error: 'Ukuran file melebihi batas maksimum 8 MB.' },
        { status: 400 }
      );
    }

    // Clean filename
    const ext = file.name.split('.').pop() || 'webp';
    const cleanName = `${folder}/${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${ext}`;
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // 1. Try Supabase Storage (Persistent for Cloud & Vercel)
    const supabase = createAdminClient();
    if (supabase) {
      try {
        const { data, error: uploadErr } = await supabase.storage
          .from('portfolio-assets')
          .upload(cleanName, buffer, {
            contentType: file.type,
            upsert: true,
          });

        if (!uploadErr && data) {
          const { data: publicData } = supabase.storage
            .from('portfolio-assets')
            .getPublicUrl(cleanName);

          return NextResponse.json({
            success: true,
            storagePath: publicData.publicUrl,
            name: cleanName,
            size: file.size,
          });
        }
      } catch (sbErr) {
        console.warn('Supabase Storage upload warning, falling back to local filesystem:', sbErr);
      }
    }

    // 2. Fallback to local disk (if writable, e.g. local dev)
    try {
      const targetDir = path.join(process.cwd(), 'public', 'uploads');
      if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true });
      }
      const localCleanName = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${ext}`;
      const filePath = path.join(targetDir, localCleanName);
      await fs.promises.writeFile(filePath, buffer);

      return NextResponse.json({
        success: true,
        storagePath: `/uploads/${localCleanName}`,
        name: localCleanName,
        size: file.size,
      });
    } catch (fsErr) {
      // In serverless read-only filesystem without Supabase, return data URL
      const base64 = buffer.toString('base64');
      const dataUrl = `data:${file.type};base64,${base64}`;
      return NextResponse.json({
        success: true,
        storagePath: dataUrl,
        name: cleanName,
        size: file.size,
      });
    }
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Gagal memproses upload file.' },
      { status: 500 }
    );
  }
}
