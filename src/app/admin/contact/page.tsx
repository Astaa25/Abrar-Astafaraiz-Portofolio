'use client';

import React, { useState, useEffect } from 'react';
import { DataService } from '@/services/data-service';
import { SocialLink, ContactInfoSettings } from '@/types/database';
import { useToast } from '@/components/feedback/ToastContext';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Modal } from '@/components/ui/Modal';
import { Plus, Edit2, Trash2, Share2, Mail, Save } from 'lucide-react';

export default function AdminContactPage() {
  const [socials, setSocials] = useState<SocialLink[]>([]);
  const [contactInfo, setContactInfo] = useState<ContactInfoSettings | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSocial, setEditingSocial] = useState<Partial<SocialLink> | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const { success, error } = useToast();

  const loadData = () => {
    setSocials(DataService.getDraftSocials());
    const settings = DataService.getDraftSettings();
    setContactInfo(settings.contact_info);
  };

  useEffect(() => {
    async function init() {
      await DataService.syncWithServer();
      loadData();
    }
    init();
  }, []);

  const handleSaveContactInfo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactInfo) return;
    setIsSaving(true);
    try {
      DataService.updateDraftSettings('contact_info', contactInfo);
      await DataService.persistToServer();
      success('Pengaturan kontak & footer berhasil disimpan dan live di database!');
    } catch {
      error('Gagal menyimpan kontak.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleOpenAddSocial = () => {
    setEditingSocial({
      platform: 'github',
      label: 'GitHub',
      url: 'https://github.com/abrar-astafaraiz',
      icon_name: 'Github',
      sort_order: socials.length + 1,
      is_visible: true,
    });
    setIsModalOpen(true);
  };

  const handleOpenEditSocial = (item: SocialLink) => {
    setEditingSocial({ ...item });
    setIsModalOpen(true);
  };

  const handleDeleteSocial = async (id: string, label: string) => {
    if (confirm(`Hapus link sosial "${label}"?`)) {
      try {
        DataService.deleteDraftSocial(id);
        await DataService.persistToServer();
        success(`Tautan "${label}" berhasil dihapus dari database.`);
        loadData();
      } catch {
        error('Gagal menghapus tautan.');
      }
    }
  };

  const handleSaveSocialModal = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSocial?.platform || !editingSocial?.url) {
      error('Platform dan URL wajib diisi.');
      return;
    }

    try {
      DataService.saveDraftSocial({
        id: editingSocial.id,
        platform: editingSocial.platform,
        label: editingSocial.label || editingSocial.platform,
        url: editingSocial.url,
        icon_name: editingSocial.icon_name || editingSocial.platform,
        sort_order: Number(editingSocial.sort_order) || 0,
        is_visible: editingSocial.is_visible !== undefined ? editingSocial.is_visible : true,
      });

      await DataService.persistToServer();
      success('Tautan sosial berhasil disimpan dan langsung live di database!');
      setIsModalOpen(false);
      setEditingSocial(null);
      loadData();
    } catch {
      error('Gagal menyimpan tautan sosial.');
    }
  };

  if (!contactInfo) return null;

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h2 className="text-2xl font-extrabold text-[#39324E] dark:text-[#F7F3FF]">
          Kontak, Tautan Sosial & Footer
        </h2>
        <p className="text-xs text-[#706981] dark:text-[#A096B5] mt-1">
          Kelola pesan kolaborasi, kontak email publik, media sosial profesional, dan teks hak cipta footer.
        </p>
      </div>

      {/* Contact Section Form */}
      <form onSubmit={handleSaveContactInfo} className="space-y-6">
        <div className="rounded-3xl bg-white dark:bg-[#211D2D] border border-[#E6E0F1] dark:border-[#3B334D] p-6 sm:p-8 shadow-xs space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-[#E6E0F1] dark:border-[#3B334D]">
            <Mail className="w-5 h-5 text-[#7966D9] dark:text-[#B7A7FF]" />
            <h3 className="font-bold text-sm text-[#39324E] dark:text-[#F7F3FF]">
              Informasi Bagian Kontak
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Email Publik Utama"
              type="email"
              value={contactInfo.email}
              onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
              required
            />
            <Input
              label="Lokasi / Wilayah"
              value={contactInfo.location}
              onChange={(e) => setContactInfo({ ...contactInfo, location: e.target.value })}
              required
            />
          </div>

          <Input
            label="Heading Ajakan Berkolaborasi"
            value={contactInfo.cta_heading}
            onChange={(e) => setContactInfo({ ...contactInfo, cta_heading: e.target.value })}
            required
          />

          <Textarea
            label="Subteks Ajakan"
            value={contactInfo.cta_subtext}
            onChange={(e) => setContactInfo({ ...contactInfo, cta_subtext: e.target.value })}
            rows={2}
            required
          />

          <Input
            label="Teks Copyright Footer"
            value={contactInfo.footer_text}
            onChange={(e) => setContactInfo({ ...contactInfo, footer_text: e.target.value })}
            required
          />

          <div className="flex justify-end pt-2">
            <Button
              type="submit"
              variant="admin-primary"
              isLoading={isSaving}
              leftIcon={<Save className="w-4 h-4" />}
            >
              Simpan Pengaturan Kontak (Draft)
            </Button>
          </div>
        </div>
      </form>

      {/* Social Links CRUD Table */}
      <div className="rounded-3xl bg-white dark:bg-[#211D2D] border border-[#E6E0F1] dark:border-[#3B334D] p-6 sm:p-8 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[#E6E0F1] dark:border-[#3B334D]">
          <div className="flex items-center gap-2">
            <Share2 className="w-5 h-5 text-[#7966D9] dark:text-[#B7A7FF]" />
            <h3 className="font-bold text-sm text-[#39324E] dark:text-[#F7F3FF]">
              Tautan Sosial & Jejaring Profesional
            </h3>
          </div>
          <Button
            size="sm"
            variant="admin-primary"
            onClick={handleOpenAddSocial}
            leftIcon={<Plus className="w-3.5 h-3.5" />}
          >
            Tambah Tautan
          </Button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-[#E6E0F1] dark:border-[#3B334D] text-[#928AA5] dark:text-[#A096B5]">
                <th className="py-2.5 font-semibold">Platform</th>
                <th className="py-2.5 font-semibold">Label</th>
                <th className="py-2.5 font-semibold">URL Tujuan</th>
                <th className="py-2.5 font-semibold text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E6E0F1] dark:divide-[#3B334D]">
              {socials.map((s) => (
                <tr key={s.id}>
                  <td className="py-3 font-semibold text-[#39324E] dark:text-[#F7F3FF] capitalize">
                    {s.platform}
                  </td>
                  <td className="py-3 text-[#706981] dark:text-[#C0B8D2]">{s.label}</td>
                  <td className="py-3 text-[#7966D9] dark:text-[#B7A7FF] truncate max-w-xs">
                    {s.url}
                  </td>
                  <td className="py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleOpenEditSocial(s)}
                        className="p-1.5 text-[#706981] hover:text-[#7966D9]"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteSocial(s.id, s.label)}
                        className="p-1.5 text-[#A82F42]"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Social Modal */}
      {isModalOpen && editingSocial && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={editingSocial.id ? 'Edit Tautan Sosial' : 'Tambah Tautan Sosial'}
        >
          <form onSubmit={handleSaveSocialModal} className="space-y-4">
            <Input
              label="Platform / Saluran"
              value={editingSocial.platform || ''}
              onChange={(e) => setEditingSocial({ ...editingSocial, platform: e.target.value })}
              placeholder="github, linkedin, instagram, email"
              required
            />
            <Input
              label="Label Teks"
              value={editingSocial.label || ''}
              onChange={(e) => setEditingSocial({ ...editingSocial, label: e.target.value })}
              placeholder="GitHub, LinkedIn"
              required
            />
            <Input
              label="URL / Target Link"
              value={editingSocial.url || ''}
              onChange={(e) => setEditingSocial({ ...editingSocial, url: e.target.value })}
              placeholder="https://..."
              required
            />
            <div className="flex justify-end gap-3 pt-4 border-t border-[#E6E0F1] dark:border-[#3B334D]">
              <Button type="button" variant="secondary" onClick={() => setIsModalOpen(false)}>
                Batal
              </Button>
              <Button type="submit" variant="admin-primary">
                Simpan Tautan
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}
