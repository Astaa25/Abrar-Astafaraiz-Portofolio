'use client';

import React, { useState, useEffect } from 'react';
import { DataService } from '@/services/data-service';
import { AboutHighlight } from '@/types/database';
import { useToast } from '@/components/feedback/ToastContext';
import { Textarea } from '@/components/ui/Textarea';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import {
  Save,
  FileText,
  Sparkles,
  Plus,
  Edit2,
  Trash2,
  GraduationCap,
  Terminal,
  Database,
  Cpu,
  Network,
  Layout,
  Server,
  Code2,
} from 'lucide-react';

export default function AdminAboutPage() {
  const [aboutContent, setAboutContent] = useState('');
  const [highlights, setHighlights] = useState<AboutHighlight[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingHighlight, setEditingHighlight] = useState<Partial<AboutHighlight> | null>(null);

  const { success, error } = useToast();

  const loadData = () => {
    const draft = DataService.getDraftContent();
    setAboutContent(draft.profile.about_content || '');
    const settings = DataService.getDraftSettings();
    if (settings.about_highlights && settings.about_highlights.length > 0) {
      setHighlights(settings.about_highlights);
    } else {
      setHighlights([
        {
          id: 'ah-1',
          icon_name: 'GraduationCap',
          title: 'Pendidikan Akademik',
          description:
            'Mahasiswa Teknik Informatika dengan pemahaman teori komputasi, algoritma, dan rekayasa perangkat lunak.',
        },
        {
          id: 'ah-2',
          icon_name: 'Terminal',
          title: 'Software & Web Engineering',
          description:
            'Berpengalaman membangun aplikasi full-stack modern dengan TypeScript, React, Next.js, dan RESTful API.',
        },
        {
          id: 'ah-3',
          icon_name: 'Database',
          title: 'Manajemen Data & Keamanan',
          description:
            'Perancangan skema relasional, optimasi query PostgreSQL/MySQL, serta integrasi Supabase Auth & RLS.',
        },
        {
          id: 'ah-4',
          icon_name: 'Sparkles',
          title: 'Desain & Pengalaman Pengguna',
          description:
            'Mengutamakan kejelasan hierarki visual, aksesibilitas, responsivitas, dan interaksi yang halus.',
        },
      ]);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      DataService.updateDraftAbout(aboutContent);
      // Save highlights to settings
      DataService.updateDraftSettings('about_highlights' as any, highlights);
      success('Konten Tentang Saya & kartu highlight berhasil disimpan dan langsung aktif!');
    } catch {
      error('Gagal menyimpan konten.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleOpenAddHighlight = () => {
    setEditingHighlight({
      id: `ah-${Date.now()}`,
      title: '',
      description: '',
      icon_name: 'GraduationCap',
    });
    setIsModalOpen(true);
  };

  const handleOpenEditHighlight = (item: AboutHighlight) => {
    setEditingHighlight({ ...item });
    setIsModalOpen(true);
  };

  const handleDeleteHighlight = (id: string, title: string) => {
    if (confirm(`Hapus kartu highlight "${title}"?`)) {
      const updated = highlights.filter((h) => h.id !== id);
      setHighlights(updated);
      DataService.updateDraftSettings('about_highlights' as any, updated);
      success(`Kartu "${title}" berhasil dihapus.`);
    }
  };

  const handleSaveHighlightModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingHighlight?.title || !editingHighlight?.description) {
      error('Judul dan deskripsi kartu wajib diisi.');
      return;
    }

    let updated: AboutHighlight[];
    const exists = highlights.some((h) => h.id === editingHighlight.id);
    if (exists) {
      updated = highlights.map((h) =>
        h.id === editingHighlight.id ? (editingHighlight as AboutHighlight) : h
      );
    } else {
      updated = [...highlights, editingHighlight as AboutHighlight];
    }

    setHighlights(updated);
    DataService.updateDraftSettings('about_highlights' as any, updated);
    setIsModalOpen(false);
    setEditingHighlight(null);
    success('Kartu highlight berhasil disimpan!');
  };

  const getIcon = (iconName?: string) => {
    switch (iconName?.toLowerCase()) {
      case 'graduationcap':
        return <GraduationCap className="w-5 h-5 text-[#7966D9] dark:text-[#B7A7FF]" />;
      case 'terminal':
        return <Terminal className="w-5 h-5 text-[#177A56] dark:text-[#65D6A6]" />;
      case 'database':
        return <Database className="w-5 h-5 text-[#7966D9] dark:text-[#B7A7FF]" />;
      case 'sparkles':
        return <Sparkles className="w-5 h-5 text-[#177A56] dark:text-[#65D6A6]" />;
      case 'cpu':
        return <Cpu className="w-5 h-5 text-[#7966D9] dark:text-[#B7A7FF]" />;
      case 'network':
        return <Network className="w-5 h-5 text-[#177A56] dark:text-[#65D6A6]" />;
      case 'layout':
        return <Layout className="w-5 h-5 text-[#7966D9] dark:text-[#B7A7FF]" />;
      case 'server':
        return <Server className="w-5 h-5 text-[#177A56] dark:text-[#65D6A6]" />;
      default:
        return <Code2 className="w-5 h-5 text-[#7966D9] dark:text-[#B7A7FF]" />;
    }
  };

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h2 className="text-2xl font-extrabold text-[#39324E] dark:text-[#F7F3FF]">
          Manajemen Tentang Saya (About)
        </h2>
        <p className="text-xs text-[#706981] dark:text-[#A096B5] mt-1">
          Perbarui narasi cerita profil lengkap dan kartu highlight kompetensi di kolom sebelah kanan.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-8">
        {/* Story Paragraph Box */}
        <div className="rounded-3xl bg-white dark:bg-[#211D2D] border border-[#E6E0F1] dark:border-[#3B334D] p-6 sm:p-8 shadow-xs space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-[#E6E0F1] dark:border-[#3B334D]">
            <FileText className="w-5 h-5 text-[#7966D9] dark:text-[#B7A7FF]" />
            <h3 className="font-bold text-sm text-[#39324E] dark:text-[#F7F3FF]">
              Paragraf Narasi Profil Utama (Kolom Kiri)
            </h3>
          </div>

          <Textarea
            label="Isi Narasi Profil"
            value={aboutContent}
            onChange={(e) => setAboutContent(e.target.value)}
            rows={6}
            helperText="Gunakan kalimat yang jelas, profesional, dan menggambarkan dedikasi Anda."
            required
          />

          <div className="flex justify-end pt-2">
            <Button
              type="submit"
              variant="admin-primary"
              isLoading={isSaving}
              leftIcon={<Save className="w-4 h-4" />}
            >
              Simpan Narasi Profil
            </Button>
          </div>
        </div>

        {/* Right-Hand Feature Highlights Grid Management */}
        <div className="rounded-3xl bg-white dark:bg-[#211D2D] border border-[#E6E0F1] dark:border-[#3B334D] p-6 sm:p-8 shadow-xs space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-[#E6E0F1] dark:border-[#3B334D]">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#7966D9] dark:text-[#B7A7FF]" />
              <div>
                <h3 className="font-bold text-sm text-[#39324E] dark:text-[#F7F3FF]">
                  Kartu Highlight / Fokus Profesional (Kolom Kanan)
                </h3>
                <p className="text-[11px] text-[#706981] dark:text-[#A096B5]">
                  Kartu-kartu yang tampil di sisi kanan bagian Tentang Saya. Klik edit untuk mengubah teks atau ikonnya.
                </p>
              </div>
            </div>

            <Button
              type="button"
              size="sm"
              variant="admin-primary"
              onClick={handleOpenAddHighlight}
              leftIcon={<Plus className="w-3.5 h-3.5" />}
            >
              Tambah Kartu
            </Button>
          </div>

          {/* Highlights List */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {highlights.map((item) => (
              <div
                key={item.id}
                className="p-4 rounded-2xl bg-[#F7F5FF] dark:bg-[#171421] border border-[#E6E0F1] dark:border-[#3B334D] flex items-start justify-between gap-3 group hover:border-[#7966D9] transition-all"
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-white dark:bg-[#211D2D] shadow-xs shrink-0">
                    {getIcon(item.icon_name)}
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-[#39324E] dark:text-[#F7F3FF]">
                      {item.title}
                    </h4>
                    <p className="text-xs text-[#706981] dark:text-[#A096B5] mt-1 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  <button
                    type="button"
                    onClick={() => handleOpenEditHighlight(item)}
                    className="p-1.5 rounded-lg text-[#706981] hover:text-[#7966D9] hover:bg-white dark:hover:bg-[#211D2D] transition-colors"
                    title="Edit kartu"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeleteHighlight(item.id, item.title)}
                    className="p-1.5 rounded-lg text-[#C43D4B] hover:bg-white dark:hover:bg-[#211D2D] transition-colors"
                    title="Hapus kartu"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </form>

      {/* Highlight Edit / Add Modal */}
      {isModalOpen && editingHighlight && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={editingHighlight.title ? 'Edit Kartu Highlight' : 'Tambah Kartu Highlight Baru'}
        >
          <form onSubmit={handleSaveHighlightModal} className="space-y-4">
            <Input
              label="Judul Kartu (Contoh: Pendidikan Akademik, Software Engineering)"
              value={editingHighlight.title || ''}
              onChange={(e) =>
                setEditingHighlight({ ...editingHighlight, title: e.target.value })
              }
              required
            />

            <Textarea
              label="Deskripsi Ringkas"
              value={editingHighlight.description || ''}
              onChange={(e) =>
                setEditingHighlight({ ...editingHighlight, description: e.target.value })
              }
              rows={3}
              required
            />

            <div className="w-full space-y-1.5 text-left">
              <label className="block text-xs font-semibold text-[#39324E] dark:text-[#F7F3FF]">
                Pilih Ikon Kartu
              </label>
              <select
                value={editingHighlight.icon_name || 'GraduationCap'}
                onChange={(e) =>
                  setEditingHighlight({ ...editingHighlight, icon_name: e.target.value })
                }
                className="block w-full rounded-xl border border-[#E6E0F1] bg-white px-3.5 py-2.5 text-sm text-[#39324E] focus:border-[#7966D9] focus:outline-none dark:border-[#3B334D] dark:bg-[#211D2D] dark:text-[#F7F3FF]"
              >
                <option value="GraduationCap">Topi Wisuda / Pendidikan (GraduationCap)</option>
                <option value="Terminal">Terminal / Coding (Terminal)</option>
                <option value="Database">Database / Data Management (Database)</option>
                <option value="Sparkles">Bintang / Desain UI (Sparkles)</option>
                <option value="Cpu">Processor / Komputer (Cpu)</option>
                <option value="Network">Jaringan / Network (Network)</option>
                <option value="Layout">Tata Letak / UI Design (Layout)</option>
                <option value="Server">Server / Backend (Server)</option>
              </select>
            </div>

            <div className="flex justify-end gap-3 pt-3">
              <Button
                type="button"
                variant="secondary"
                onClick={() => setIsModalOpen(false)}
              >
                Batal
              </Button>
              <Button type="submit" variant="admin-primary">
                Simpan Kartu
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}
