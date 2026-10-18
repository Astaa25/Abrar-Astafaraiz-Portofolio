'use client';

import React, { useState, useEffect } from 'react';
import { DataService } from '@/services/data-service';
import { Profile } from '@/types/database';
import { useToast } from '@/components/feedback/ToastContext';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Button } from '@/components/ui/Button';
import { Save, User, Sparkles, Image as ImageIcon } from 'lucide-react';

export default function AdminProfilePage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const { success, error } = useToast();

  useEffect(() => {
    const draft = DataService.getDraftContent();
    setProfile(draft.profile);
  }, []);

  if (!profile) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      DataService.updateDraftProfile(profile);
      success('Perubahan profil berhasil disimpan ke draft!');
    } catch {
      error('Gagal menyimpan profil.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-extrabold text-[#39324E] dark:text-[#F7F3FF]">
          Profil & Tampilan Hero
        </h2>
        <p className="text-xs text-[#706981] dark:text-[#A096B5] mt-1">
          Kelola informasi identitas utama, foto profil, dan teks pengantar yang tampil di website publik.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Identity Information Box */}
        <div className="rounded-3xl bg-white dark:bg-[#211D2D] border border-[#E6E0F1] dark:border-[#3B334D] p-6 sm:p-8 shadow-xs space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-[#E6E0F1] dark:border-[#3B334D]">
            <User className="w-5 h-5 text-[#7966D9] dark:text-[#B7A7FF]" />
            <h3 className="font-bold text-sm text-[#39324E] dark:text-[#F7F3FF]">
              Informasi Identitas & Headline
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Nama Lengkap yang Ditampilkan"
              value={profile.display_name}
              onChange={(e) => setProfile({ ...profile, display_name: e.target.value })}
              required
            />
            <Input
              label="Tagline Berjalan / Status"
              value={profile.tagline}
              onChange={(e) => setProfile({ ...profile, tagline: e.target.value })}
              required
            />
          </div>

          <Input
            label="Headline Profesional"
            value={profile.headline}
            onChange={(e) => setProfile({ ...profile, headline: e.target.value })}
            placeholder="Full-Stack Developer | Web & Software Development"
            required
          />

          <Textarea
            label="Bio Singkat (Hero Section)"
            value={profile.short_bio}
            onChange={(e) => setProfile({ ...profile, short_bio: e.target.value })}
            rows={3}
            required
          />
        </div>

        {/* Visual Images Box */}
        <div className="rounded-3xl bg-white dark:bg-[#211D2D] border border-[#E6E0F1] dark:border-[#3B334D] p-6 sm:p-8 shadow-xs space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-[#E6E0F1] dark:border-[#3B334D]">
            <ImageIcon className="w-5 h-5 text-[#7966D9] dark:text-[#B7A7FF]" />
            <h3 className="font-bold text-sm text-[#39324E] dark:text-[#F7F3FF]">
              Foto Profil & Visual
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
            <Input
              label="Path / URL Foto Profil"
              value={profile.profile_image_path}
              onChange={(e) => setProfile({ ...profile, profile_image_path: e.target.value })}
              helperText="Dapat berupa URL Supabase Storage atau path aset publik"
              required
            />

            <div className="flex items-center gap-4 p-4 rounded-2xl bg-[#F7F5FF] dark:bg-[#171421] border border-[#E6E0F1] dark:border-[#3B334D]">
              <div className="w-16 h-16 rounded-2xl bg-[#EDE8FF] dark:bg-[#352D4A] flex items-center justify-center font-bold text-lg text-[#7966D9] dark:text-[#B7A7FF] shrink-0 overflow-hidden">
                AA
              </div>
              <div>
                <span className="text-xs font-semibold text-[#39324E] dark:text-[#F7F3FF] block">
                  Pratinjau Avatar
                </span>
                <span className="text-[11px] text-[#706981] dark:text-[#A096B5]">
                  {profile.display_name}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* CTAs Configuration */}
        <div className="rounded-3xl bg-white dark:bg-[#211D2D] border border-[#E6E0F1] dark:border-[#3B334D] p-6 sm:p-8 shadow-xs space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-[#E6E0F1] dark:border-[#3B334D]">
            <Sparkles className="w-5 h-5 text-[#7966D9] dark:text-[#B7A7FF]" />
            <h3 className="font-bold text-sm text-[#39324E] dark:text-[#F7F3FF]">
              Tombol Call to Action (CTA) Hero
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Label Tombol Utama"
              value={profile.primary_cta_label}
              onChange={(e) => setProfile({ ...profile, primary_cta_label: e.target.value })}
              required
            />
            <Input
              label="Target Anchor Tombol Utama"
              value={profile.primary_cta_target}
              onChange={(e) => setProfile({ ...profile, primary_cta_target: e.target.value })}
              placeholder="#projects"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Label Tombol Sekunder"
              value={profile.secondary_cta_label}
              onChange={(e) => setProfile({ ...profile, secondary_cta_label: e.target.value })}
              required
            />
            <Input
              label="Target Anchor Tombol Sekunder"
              value={profile.secondary_cta_target}
              onChange={(e) => setProfile({ ...profile, secondary_cta_target: e.target.value })}
              placeholder="#contact"
              required
            />
          </div>
        </div>

        {/* Save CTA */}
        <div className="flex justify-end pt-2">
          <Button
            type="submit"
            variant="admin-primary"
            size="lg"
            isLoading={isSaving}
            leftIcon={<Save className="w-4 h-4" />}
            className="font-bold px-6"
          >
            Simpan Perubahan Profil (Draft)
          </Button>
        </div>
      </form>
    </div>
  );
}
