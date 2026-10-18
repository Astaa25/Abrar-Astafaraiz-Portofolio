import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

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
    const cleanName = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${ext}`;

    // Target directory
    const targetDir = path.join(process.cwd(), 'public', 'uploads');
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }

    const filePath = path.join(targetDir, cleanName);
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    await fs.promises.writeFile(filePath, buffer);

    const storagePath = `/uploads/${cleanName}`;

    return NextResponse.json({
      success: true,
      storagePath,
      name: cleanName,
      size: file.size,
    });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Gagal memproses upload file.' },
      { status: 500 }
    );
  }
}
