'use client';

import React, { useState, useEffect } from 'react';
import { DataService } from '@/services/data-service';
import { SectionSetting } from '@/types/database';
import { useToast } from '@/components/feedback/ToastContext';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Modal } from '@/components/ui/Modal';
import { Switch } from '@/components/ui/Switch';
import { SlidersHorizontal, Edit2, CheckCircle2, EyeOff } from 'lucide-react';

export default function AdminSectionsPage() {
  const [sections, setSections] = useState<SectionSetting[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editing, setEditing] = useState<SectionSetting | null>(null);

  const { success, error } = useToast();

  const loadSections = () => {
    setSections(DataService.getDraftSections());
  };

  useEffect(() => {
    loadSections();
  }, []);

  const handleOpenEdit = (sec: SectionSetting) => {
    setEditing({ ...sec });
    setIsModalOpen(true);
  };

  const handleToggleVisible = (sec: SectionSetting) => {
    DataService.updateDraftSection(sec.id, { is_visible: !sec.is_visible });
    success(`Bagian "${sec.title}" sekarang ${!sec.is_visible ? 'ditampilkan' : 'disembunyikan'}.`);
    loadSections();
  };

  const handleToggleNav = (sec: SectionSetting) => {
    DataService.updateDraftSection(sec.id, { show_in_nav: !sec.show_in_nav });
    success(`Navigasi untuk "${sec.nav_label}" diperbarui.`);
    loadSections();
  };

  const handleSaveModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editing) return;
    try {
      DataService.updateDraftSection(editing.id, {
        title: editing.title,
        subtitle: editing.subtitle,
        nav_label: editing.nav_label,
        sort_order: Number(editing.sort_order) || 0,
        is_visible: editing.is_visible,
        show_in_nav: editing.show_in_nav,
      });

      success('Pengaturan bagian berhasil disimpan ke draft!');
      setIsModalOpen(false);
      setEditing(null);
      loadSections();
    } catch {
      error('Gagal memperbarui bagian.');
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h2 className="text-2xl font-extrabold text-[#39324E] dark:text-[#F7F3FF]">
          Manajemen Bagian Website (Sections)
        </h2>
        <p className="text-xs text-[#706981] dark:text-[#A096B5] mt-1">
          Atur visibilitas, judul seksi, label navigasi navbar, dan urutan tampil di halaman publik.
        </p>
      </div>

      <div className="rounded-3xl bg-white dark:bg-[#211D2D] border border-[#E6E0F1] dark:border-[#3B334D] overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-[#E6E0F1] dark:border-[#3B334D] bg-[#F7F5FF] dark:bg-[#171421] text-[#928AA5] dark:text-[#A096B5]">
                <th className="py-3.5 px-6 font-semibold">Kunci Bagian</th>
                <th className="py-3.5 px-6 font-semibold">Judul Halaman</th>
                <th className="py-3.5 px-6 font-semibold">Label Nav</th>
                <th className="py-3.5 px-6 font-semibold">Urutan</th>
                <th className="py-3.5 px-6 font-semibold">Tampil di Nav</th>
                <th className="py-3.5 px-6 font-semibold">Visibilitas</th>
                <th className="py-3.5 px-6 font-semibold text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E6E0F1] dark:divide-[#3B334D]">
              {sections.map((sec) => (
                <tr key={sec.id} className="hover:bg-[#F0EDFA]/40 dark:hover:bg-[#2D263D]/40 transition-colors">
                  <td className="py-4 px-6 font-bold text-[#7966D9] dark:text-[#B7A7FF]">
                    #{sec.section_key}
                  </td>
                  <td className="py-4 px-6 font-semibold text-[#39324E] dark:text-[#F7F3FF]">
                    {sec.title}
                  </td>
                  <td className="py-4 px-6 text-[#706981] dark:text-[#C0B8D2]">{sec.nav_label}</td>
                  <td className="py-4 px-6 text-[#706981] dark:text-[#C0B8D2]">{sec.sort_order}</td>
                  <td className="py-4 px-6">
                    <button
                      onClick={() => handleToggleNav(sec)}
                      className={`text-xs font-semibold px-2 py-0.5 rounded-full cursor-pointer ${
                        sec.show_in_nav
                          ? 'bg-[#DDF7EC] text-[#176A4A] dark:bg-[#1D3B32] dark:text-[#8CE3BD]'
                          : 'bg-[#F0EDFA] text-[#706981] dark:bg-[#2D263D] dark:text-[#C0B8D2]'
                      }`}
                    >
                      {sec.show_in_nav ? 'Aktif' : 'Sembunyi'}
                    </button>
                  </td>
                  <td className="py-4 px-6">
                    <button
                      onClick={() => handleToggleVisible(sec)}
                      className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full cursor-pointer ${
                        sec.is_visible
                          ? 'bg-[#DDF7EC] text-[#176A4A] dark:bg-[#1D3B32] dark:text-[#8CE3BD]'
                          : 'bg-[#FFE5E8] text-[#A82F42] dark:bg-[#492831] dark:text-[#FFADB7]'
                      }`}
                    >
                      {sec.is_visible ? (
                        <>
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Aktif</span>
                        </>
                      ) : (
                        <>
                          <EyeOff className="w-3 h-3" />
                          <span>Nonaktif</span>
                        </>
                      )}
                    </button>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <button
                      onClick={() => handleOpenEdit(sec)}
                      className="p-1.5 rounded-lg text-[#706981] hover:text-[#7966D9] hover:bg-[#F0EDFA] dark:text-[#C0B8D2] dark:hover:bg-[#2D263D] transition-colors"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Modal */}
      {isModalOpen && editing && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={`Edit Bagian: #${editing.section_key}`}
        >
          <form onSubmit={handleSaveModal} className="space-y-4">
            <Input
              label="Judul Bagian Utama"
              value={editing.title}
              onChange={(e) => setEditing({ ...editing, title: e.target.value })}
              required
            />
            <Input
              label="Subteks / Kategori Heading"
              value={editing.subtitle}
              onChange={(e) => setEditing({ ...editing, subtitle: e.target.value })}
              required
            />
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Label Navigasi Navbar"
                value={editing.nav_label}
                onChange={(e) => setEditing({ ...editing, nav_label: e.target.value })}
                required
              />
              <Input
                label="Nomor Urutan Tampil"
                type="number"
                value={editing.sort_order}
                onChange={(e) =>
                  setEditing({ ...editing, sort_order: parseInt(e.target.value, 10) })
                }
                required
              />
            </div>

            <div className="space-y-3 pt-2">
              <Switch
                checked={editing.is_visible}
                onChange={(c) => setEditing({ ...editing, is_visible: c })}
                label="Aktifkan Seluruh Bagian Ini di Halaman"
              />
              <Switch
                checked={editing.show_in_nav}
                onChange={(c) => setEditing({ ...editing, show_in_nav: c })}
                label="Tampilkan Tautan Bagian Ini di Navbar"
              />
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-[#E6E0F1] dark:border-[#3B334D]">
              <Button type="button" variant="secondary" onClick={() => setIsModalOpen(false)}>
                Batal
              </Button>
              <Button type="submit" variant="admin-primary">
                Simpan Perubahan
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}
