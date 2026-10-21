'use client';

import React, { useState, useEffect } from 'react';
import { DataService } from '@/services/data-service';
import { AppearanceSettings } from '@/types/database';
import { useToast } from '@/components/feedback/ToastContext';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Switch } from '@/components/ui/Switch';
import { ImageUploadField } from '@/components/ui/ImageUploadField';
import {
  Palette,
  Save,
  Sparkles,
  Moon,
  Sun,
  Image as ImageIcon,
  Eye,
  CheckCircle2,
  Layers,
} from 'lucide-react';

export default function AdminAppearancePage() {
  const [appearance, setAppearance] = useState<AppearanceSettings | null>(null);
  const [previewTheme, setPreviewTheme] = useState<'light' | 'dark'>('light');
  const [isSaving, setIsSaving] = useState(false);
  const { success, error } = useToast();

  useEffect(() => {
    async function loadSettings() {
      try {
        const res = await fetch('/api/settings', { cache: 'no-store' });
        if (res.ok) {
          const data = await res.json();
          if (data && data.appearance) {
            setAppearance({
              site_logo_url: '',
              site_logo_initials: 'AA',
              ...data.appearance,
            });
            return;
          }
        }
      } catch (err) {
        console.warn('Failed to load from /api/settings:', err);
      }
      const settings = DataService.getDraftSettings();
      setAppearance({
        site_logo_url: '',
        site_logo_initials: 'AA',
        ...settings.appearance,
      });
    }
    loadSettings();
  }, []);

  if (!appearance) return null;

  const handleSave = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsSaving(true);
    try {
      // 1. Direct persistence to /api/settings endpoint
      const res = await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ appearance }),
      });

      if (!res.ok) {
        throw new Error('Gagal menyimpan ke server');
      }

      // 2. Keep client store synced
      DataService.updateDraftSettings('appearance', appearance);
      success('Pengaturan logo & tampilan berhasil disimpan dan langsung aktif!');
    } catch {
      error('Gagal menyimpan pengaturan tampilan.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleLogoChange = async (url: string) => {
    const updated: AppearanceSettings = { ...appearance, site_logo_url: url };
    setAppearance(updated);
    if (!url) return;

    // Instant auto-save for convenient logo update
    try {
      await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ appearance: updated }),
      });
      DataService.updateDraftSettings('appearance', updated);
      success('Logo website berhasil diperbarui dan disimpan!');
    } catch (err) {
      console.warn('Logo auto-save warning:', err);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Page Header */}
      <div>
        <h2 className="text-2xl font-extrabold text-[#39324E] dark:text-[#F7F3FF]">
          Pengaturan Logo & Tampilan (Appearance)
        </h2>
        <p className="text-xs text-[#706981] dark:text-[#A096B5] mt-1">
          Kelola logo brand website, monogram inisial, preferensi tema publik (Light/Dark), serta intensitas animasi visual.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* BRAND LOGO MANAGEMENT BOX */}
        <div className="rounded-3xl bg-white dark:bg-[#211D2D] border border-[#E6E0F1] dark:border-[#3B334D] p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-[#E6E0F1] dark:border-[#3B334D]">
            <div className="flex items-center gap-2">
              <ImageIcon className="w-5 h-5 text-[#7966D9] dark:text-[#B7A7FF]" />
              <div>
                <h3 className="font-bold text-sm text-[#39324E] dark:text-[#F7F3FF]">
                  Logo & Identitas Brand Website
                </h3>
                <p className="text-[11px] text-[#706981] dark:text-[#A096B5]">
                  Tampil di bagian kiri atas Navbar dan bagian Footer di seluruh halaman.
                </p>
              </div>
            </div>
            {appearance.site_logo_url && (
              <span className="text-[11px] font-semibold text-[#177A56] dark:text-[#65D6A6] bg-[#DDF7F0] dark:bg-[#1D3B32] px-2.5 py-0.5 rounded-full flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> Logo Aktif
              </span>
            )}
          </div>

          {/* Logo Image Upload Field */}
          <ImageUploadField
            label="File Gambar Logo Website"
            value={appearance.site_logo_url || ''}
            onChange={handleLogoChange}
            folder="branding"
            helperText="Unggah logo berformat PNG transparan, SVG, WebP, atau JPG. Disarankan logo berbentuk persegi atau ikon bersih beresolusi tinggi."
          />

          {/* Fallback Initials / Monogram Input */}
          <div className="pt-2 border-t border-[#E6E0F1] dark:border-[#3B334D] space-y-3">
            <div className="max-w-xs">
              <Input
                label="Inisial Alternatif / Monogram"
                value={appearance.site_logo_initials || 'AA'}
                onChange={(e) =>
                  setAppearance({
                    ...appearance,
                    site_logo_initials: e.target.value.toUpperCase().slice(0, 4),
                  })
                }
                placeholder="AA"
                maxLength={4}
                helperText="Ditampilkan dengan badge gradasi Aurora jika Anda tidak mengunggah logo gambar."
              />
            </div>
          </div>

          {/* Live Navbar Simulation Preview */}
          <div className="pt-3 border-t border-[#E6E0F1] dark:border-[#3B334D] space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#39324E] dark:text-[#F7F3FF]">
                <Eye className="w-4 h-4 text-[#7966D9] dark:text-[#B7A7FF]" />
                <span>Simulasi Tampilan di Navbar Website</span>
              </div>
              <div className="flex items-center gap-1 bg-[#F2EFFB] dark:bg-[#252236] p-1 rounded-xl">
                <button
                  type="button"
                  onClick={() => setPreviewTheme('light')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                    previewTheme === 'light'
                      ? 'bg-white text-[#5846DE] shadow-2xs'
                      : 'text-[#706981] hover:text-[#39324E]'
                  }`}
                >
                  Light
                </button>
                <button
                  type="button"
                  onClick={() => setPreviewTheme('dark')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                    previewTheme === 'dark'
                      ? 'bg-[#181928] text-[#A99BFF] shadow-2xs'
                      : 'text-[#706981] hover:text-[#F7F3FF]'
                  }`}
                >
                  Dark
                </button>
              </div>
            </div>

            {/* Simulated Navbar Header Card */}
            <div
              className={`p-4 rounded-2xl border transition-all ${
                previewTheme === 'dark'
                  ? 'bg-[#10111B] border-[#353449] text-[#F5F3FF]'
                  : 'bg-white border-[#E6E7F0] text-[#20233A]'
              }`}
            >
              <div className="flex items-center justify-between">
                {/* Brand Logo Simulation */}
                <div className="flex items-center gap-2.5">
                  {appearance.site_logo_url ? (
                    <div
                      className={`w-9 h-9 rounded-xl overflow-hidden flex items-center justify-center p-1 border ${
                        previewTheme === 'dark'
                          ? 'bg-[#1B1C2A] border-[#353449]'
                          : 'bg-white border-[#E6E7F0] shadow-2xs'
                      }`}
                    >
                      <img
                        src={appearance.site_logo_url}
                        alt="Logo Preview"
                        className="w-full h-full object-contain"
                        onError={(e) => {
                          (e.target as HTMLElement).style.display = 'none';
                        }}
                      />
                    </div>
                  ) : (
                    <div className="w-9 h-9 rounded-xl gradient-aurora flex items-center justify-center text-white font-bold text-base shadow-sm">
                      {appearance.site_logo_initials || 'AA'}
                    </div>
                  )}
                  <span className="font-bold text-base tracking-tight">
                    Abrar Astafaraiz
                  </span>
                </div>

                {/* Dummy Nav items simulation */}
                <div className="hidden sm:flex items-center gap-3 text-xs opacity-60">
                  <span>Home</span>
                  <span>About</span>
                  <span>Projects</span>
                  <span>Experience</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Save Logo Button */}
          <div className="flex justify-end pt-1">
            <Button
              type="button"
              onClick={() => handleSave()}
              variant="secondary"
              size="sm"
              isLoading={isSaving}
              leftIcon={<Save className="w-3.5 h-3.5" />}
              className="text-xs font-bold"
            >
              Simpan Logo Ini Langsung
            </Button>
          </div>
        </div>

        {/* DEFAULT THEME PREFERENCE BOX */}
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

        {/* INTERACTION & ANIMATION BOX */}
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

        {/* Global Save Button */}
        <div className="flex justify-end pt-2">
          <Button
            type="submit"
            variant="admin-primary"
            size="lg"
            isLoading={isSaving}
            leftIcon={<Save className="w-4 h-4" />}
            className="font-bold px-6"
          >
            Simpan Seluruh Pengaturan Tampilan
          </Button>
        </div>
      </form>
    </div>
  );
}
