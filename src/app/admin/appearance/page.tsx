'use client';

import React, { useState, useEffect } from 'react';
import { DataService } from '@/services/data-service';
import { AppearanceSettings } from '@/types/database';
import { useToast } from '@/components/feedback/ToastContext';
import { Button } from '@/components/ui/Button';
import { Switch } from '@/components/ui/Switch';
import { Palette, Save, Sparkles, Moon, Sun } from 'lucide-react';

export default function AdminAppearancePage() {
  const [appearance, setAppearance] = useState<AppearanceSettings | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const { success, error } = useToast();

  useEffect(() => {
    const settings = DataService.getDraftSettings();
    setAppearance(settings.appearance);
  }, []);

  if (!appearance) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      DataService.updateDraftSettings('appearance', appearance);
      success('Pengaturan tampilan berhasil disimpan ke draft!');
    } catch {
      error('Gagal menyimpan tampilan.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h2 className="text-2xl font-extrabold text-[#39324E] dark:text-[#F7F3FF]">
          Pengaturan Tampilan & Estetika (Appearance)
        </h2>
        <p className="text-xs text-[#706981] dark:text-[#A096B5] mt-1">
          Sesuaikan preferensi tema awal website publik Aurora Violet, intensitas animasi interaktif, dan efek visual hero.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        <div className="rounded-3xl bg-white dark:bg-[#211D2D] border border-[#E6E0F1] dark:border-[#3B334D] p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex items-center gap-2 pb-3 border-b border-[#E6E0F1] dark:border-[#3B334D]">
            <Palette className="w-5 h-5 text-[#7966D9] dark:text-[#B7A7FF]" />
            <h3 className="font-bold text-sm text-[#39324E] dark:text-[#F7F3FF]">
              Tema Awal Website Publik
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => setAppearance({ ...appearance, default_public_theme: 'light' })}
              className={`p-4 rounded-2xl border text-left flex items-start gap-3 transition-all cursor-pointer ${
                appearance.default_public_theme === 'light'
                  ? 'border-[#7966D9] bg-[#EDE8FF]/40 ring-2 ring-[#7966D9]/20'
                  : 'border-[#E6E0F1] hover:border-[#7966D9] dark:border-[#3B334D]'
              }`}
            >
              <div className="p-2 rounded-xl bg-white text-[#7966D9] shadow-xs">
                <Sun className="w-5 h-5" />
              </div>
              <div>
                <span className="font-bold text-sm text-[#39324E] dark:text-[#F7F3FF] block">
                  Light Mode (Aurora Violet)
                </span>
                <span className="text-xs text-[#706981] dark:text-[#A096B5]">
                  Latar terang bersih, aksen lavender lembut, dan kontras tajam.
                </span>
              </div>
            </button>

            <button
              type="button"
              onClick={() => setAppearance({ ...appearance, default_public_theme: 'dark' })}
              className={`p-4 rounded-2xl border text-left flex items-start gap-3 transition-all cursor-pointer ${
                appearance.default_public_theme === 'dark'
                  ? 'border-[#7966D9] bg-[#EDE8FF]/40 ring-2 ring-[#7966D9]/20'
                  : 'border-[#E6E0F1] hover:border-[#7966D9] dark:border-[#3B334D]'
              }`}
            >
              <div className="p-2 rounded-xl bg-[#211D2D] text-[#B7A7FF] shadow-xs">
                <Moon className="w-5 h-5" />
              </div>
              <div>
                <span className="font-bold text-sm text-[#39324E] dark:text-[#F7F3FF] block">
                  Dark Mode (Aurora Night)
                </span>
                <span className="text-xs text-[#706981] dark:text-[#A096B5]">
                  Latar gelap berteknologi tinggi dengan pencahayaan violet redup.
                </span>
              </div>
            </button>
          </div>
        </div>

        {/* Animation Preferences */}
        <div className="rounded-3xl bg-white dark:bg-[#211D2D] border border-[#E6E0F1] dark:border-[#3B334D] p-6 sm:p-8 shadow-xs space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-[#E6E0F1] dark:border-[#3B334D]">
            <Sparkles className="w-5 h-5 text-[#7966D9] dark:text-[#B7A7FF]" />
            <h3 className="font-bold text-sm text-[#39324E] dark:text-[#F7F3FF]">
              Interaksi & Animasi
            </h3>
          </div>

          <Switch
            checked={appearance.animations_enabled}
            onChange={(c) => setAppearance({ ...appearance, animations_enabled: c })}
            label="Aktifkan Transisi & Micro-animations"
            description="Mengaktifkan animasi halus saat hover, scroll reveal, dan transisi modal."
          />

          <div className="w-full space-y-1.5 text-left pt-2">
            <label className="block text-xs font-semibold text-[#39324E] dark:text-[#F7F3FF]">
              Intensitas Animasi
            </label>
            <select
              value={appearance.animation_intensity}
              onChange={(e) =>
                setAppearance({
                  ...appearance,
                  animation_intensity: e.target.value as 'subtle' | 'standard' | 'high',
                })
              }
              className="block w-full max-w-sm rounded-xl border border-[#E6E0F1] bg-white px-3.5 py-2.5 text-sm text-[#39324E] focus:border-[#7966D9] focus:outline-none dark:border-[#3B334D] dark:bg-[#211D2D] dark:text-[#F7F3FF]"
            >
              <option value="subtle">Subtle (Cepat & Minimal)</option>
              <option value="standard">Standard (Direkomendasikan)</option>
              <option value="high">High (Ekspresif)</option>
            </select>
          </div>
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
            Simpan Tampilan (Draft)
          </Button>
        </div>
      </form>
    </div>
  );
}
