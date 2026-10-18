'use client';

import React, { useState, useEffect } from 'react';
import { DataService } from '@/services/data-service';
import { SeoSettings } from '@/types/database';
import { useToast } from '@/components/feedback/ToastContext';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Button } from '@/components/ui/Button';
import { Search, Save, Globe } from 'lucide-react';

export default function AdminSeoPage() {
  const [seo, setSeo] = useState<SeoSettings | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const { success, error } = useToast();

  useEffect(() => {
    const settings = DataService.getDraftSettings();
    setSeo(settings.seo);
  }, []);

  if (!seo) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      DataService.updateDraftSettings('seo', seo);
      success('Pengaturan SEO berhasil disimpan ke draft!');
    } catch {
      error('Gagal menyimpan pengaturan SEO.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h2 className="text-2xl font-extrabold text-[#39324E] dark:text-[#F7F3FF]">
          Pengaturan SEO & Meta Sharing
        </h2>
        <p className="text-xs text-[#706981] dark:text-[#A096B5] mt-1">
          Konfigurasi metadata mesin pencari (Google, Bing) dan pratinjau kartu media sosial (Open Graph, Twitter).
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        <div className="rounded-3xl bg-white dark:bg-[#211D2D] border border-[#E6E0F1] dark:border-[#3B334D] p-6 sm:p-8 shadow-xs space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-[#E6E0F1] dark:border-[#3B334D]">
            <Search className="w-5 h-5 text-[#7966D9] dark:text-[#B7A7FF]" />
            <h3 className="font-bold text-sm text-[#39324E] dark:text-[#F7F3FF]">
              Metadata Utama Halaman
            </h3>
          </div>

          <Input
            label="Judul Situs (Site Title)"
            value={seo.site_title}
            onChange={(e) => setSeo({ ...seo, site_title: e.target.value })}
            required
          />

          <Textarea
            label="Deskripsi Meta (Meta Description)"
            value={seo.meta_description}
            onChange={(e) => setSeo({ ...seo, meta_description: e.target.value })}
            rows={3}
            helperText="Deskripsi ringkas yang tampil di hasil pencarian Google (150-160 karakter disarankan)."
            required
          />

          <Input
            label="Canonical URL"
            value={seo.canonical_url}
            onChange={(e) => setSeo({ ...seo, canonical_url: e.target.value })}
            placeholder="https://abrar-astafaraiz.vercel.app"
            required
          />

          <Input
            label="Robots Directive"
            value={seo.robots}
            onChange={(e) => setSeo({ ...seo, robots: e.target.value })}
            placeholder="index, follow"
            required
          />
        </div>

        {/* Social Card Sharing (Open Graph) */}
        <div className="rounded-3xl bg-white dark:bg-[#211D2D] border border-[#E6E0F1] dark:border-[#3B334D] p-6 sm:p-8 shadow-xs space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-[#E6E0F1] dark:border-[#3B334D]">
            <Globe className="w-5 h-5 text-[#7966D9] dark:text-[#B7A7FF]" />
            <h3 className="font-bold text-sm text-[#39324E] dark:text-[#F7F3FF]">
              Open Graph (Kartu Berbagi Media Sosial)
            </h3>
          </div>

          <Input
            label="OG Title"
            value={seo.og_title}
            onChange={(e) => setSeo({ ...seo, og_title: e.target.value })}
            required
          />

          <Textarea
            label="OG Description"
            value={seo.og_description}
            onChange={(e) => setSeo({ ...seo, og_description: e.target.value })}
            rows={2}
            required
          />

          <Input
            label="OG Image Path"
            value={seo.og_image}
            onChange={(e) => setSeo({ ...seo, og_image: e.target.value })}
            placeholder="/images/og-image.webp"
            required
          />
        </div>

        <div className="flex justify-end pt-2">
          <Button
            type="submit"
            variant="admin-primary"
            size="lg"
            isLoading={isSaving}
            leftIcon={<Save className="w-4 h-4" />}
            className="font-bold px-6"
          >
            Simpan Pengaturan SEO (Draft)
          </Button>
        </div>
      </form>
    </div>
  );
}
