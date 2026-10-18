'use client';

import React, { useState, useEffect } from 'react';
import { DataService } from '@/services/data-service';
import { useToast } from '@/components/feedback/ToastContext';
import { Textarea } from '@/components/ui/Textarea';
import { Button } from '@/components/ui/Button';
import { Save, FileText } from 'lucide-react';

export default function AdminAboutPage() {
  const [aboutContent, setAboutContent] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const { success, error } = useToast();

  useEffect(() => {
    const draft = DataService.getDraftContent();
    setAboutContent(draft.profile.about_content || '');
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      DataService.updateDraftAbout(aboutContent);
      success('Konten Tentang Saya berhasil disimpan ke draft!');
    } catch {
      error('Gagal menyimpan konten.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h2 className="text-2xl font-extrabold text-[#39324E] dark:text-[#F7F3FF]">
          Manajemen Tentang Saya (About)
        </h2>
        <p className="text-xs text-[#706981] dark:text-[#A096B5] mt-1">
          Perbarui narasi perjalanan profesional, latar belakang teknik informatika, dan fokus minat software engineering.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        <div className="rounded-3xl bg-white dark:bg-[#211D2D] border border-[#E6E0F1] dark:border-[#3B334D] p-6 sm:p-8 shadow-xs space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-[#E6E0F1] dark:border-[#3B334D]">
            <FileText className="w-5 h-5 text-[#7966D9] dark:text-[#B7A7FF]" />
            <h3 className="font-bold text-sm text-[#39324E] dark:text-[#F7F3FF]">
              Paragraf Deskripsi Profil Lengkap
            </h3>
          </div>

          <Textarea
            label="Isi Narasi Profil"
            value={aboutContent}
            onChange={(e) => setAboutContent(e.target.value)}
            rows={8}
            helperText="Gunakan kalimat yang jelas, profesional, dan menggambarkan dedikasi teknik informatika."
            required
          />

          {/* Real-time Preview Box */}
          <div className="pt-4 border-t border-[#E6E0F1] dark:border-[#3B334D]">
            <h4 className="text-xs font-bold text-[#39324E] dark:text-[#F7F3FF] uppercase tracking-wider mb-2">
              Pratinjau Tampilan di Website Publik
            </h4>
            <div className="p-4 rounded-2xl bg-[#F7F5FF] dark:bg-[#171421] border border-[#E6E0F1] dark:border-[#3B334D] text-sm text-[#62647A] dark:text-[#C4C2D8] leading-relaxed whitespace-pre-line">
              {aboutContent || 'Belum ada konten.'}
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <Button
            type="submit"
            variant="admin-primary"
            size="lg"
            isLoading={isSaving}
            leftIcon={<Save className="w-4 h-4" />}
            className="font-bold px-6"
          >
            Simpan Konten About (Draft)
          </Button>
        </div>
      </form>
    </div>
  );
}
