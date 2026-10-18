'use client';

import React, { useState, useEffect } from 'react';
import { DataService } from '@/services/data-service';
import { Achievement } from '@/types/database';
import { useToast } from '@/components/feedback/ToastContext';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Modal } from '@/components/ui/Modal';
import { Badge } from '@/components/ui/Badge';
import { Plus, Edit2, Trash2, Award, ExternalLink, Calendar } from 'lucide-react';

export default function AdminAchievementsPage() {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editing, setEditing] = useState<Partial<Achievement> | null>(null);

  const { success, error } = useToast();

  const loadAchievements = () => {
    setAchievements(DataService.getDraftAchievements());
  };

  useEffect(() => {
    loadAchievements();
  }, []);

  const handleOpenAdd = () => {
    setEditing({
      title: '',
      organizer: '',
      achievement_date: new Date().getFullYear().toString(),
      description: '',
      category: 'Certification',
      verification_url: '',
      sort_order: achievements.length + 1,
      is_visible: true,
      publication_status: 'published',
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: Achievement) => {
    setEditing({ ...item });
    setIsModalOpen(true);
  };

  const handleDelete = (id: string, title: string) => {
    if (confirm(`Hapus sertifikat "${title}" dari draft?`)) {
      DataService.deleteDraftAchievement(id);
      success(`Sertifikat "${title}" berhasil dihapus.`);
      loadAchievements();
    }
  };

  const handleSaveModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editing?.title || !editing?.organizer) {
      error('Judul dan penyelenggara sertifikat wajib diisi.');
      return;
    }

    try {
      DataService.saveDraftAchievement({
        id: editing.id,
        title: editing.title,
        organizer: editing.organizer,
        achievement_date: editing.achievement_date || new Date().getFullYear().toString(),
        description: editing.description || '',
        category: editing.category || 'Certification',
        verification_url: editing.verification_url || null,
        sort_order: Number(editing.sort_order) || 0,
        is_visible: editing.is_visible !== undefined ? editing.is_visible : true,
        publication_status: editing.publication_status || 'published',
      });

      success('Sertifikat berhasil disimpan ke draft!');
      setIsModalOpen(false);
      setEditing(null);
      loadAchievements();
    } catch {
      error('Gagal menyimpan sertifikat.');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-[#39324E] dark:text-[#F7F3FF]">
            Sertifikat & Pencapaian
          </h2>
          <p className="text-xs text-[#706981] dark:text-[#A096B5] mt-1">
            Kelola lisensi keahlian, sertifikasi kompetensi, dan penghargaan kompetisi.
          </p>
        </div>

        <Button
          variant="admin-primary"
          onClick={handleOpenAdd}
          leftIcon={<Plus className="w-4 h-4" />}
          className="font-bold self-start sm:self-auto"
        >
          Tambah Sertifikat Baru
        </Button>
      </div>

      {/* Achievements Table */}
      <div className="rounded-3xl bg-white dark:bg-[#211D2D] border border-[#E6E0F1] dark:border-[#3B334D] overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-[#E6E0F1] dark:border-[#3B334D] bg-[#F7F5FF] dark:bg-[#171421] text-[#928AA5] dark:text-[#A096B5]">
                <th className="py-3.5 px-6 font-semibold">Judul Sertifikat</th>
                <th className="py-3.5 px-6 font-semibold">Penyelenggara</th>
                <th className="py-3.5 px-6 font-semibold">Tahun</th>
                <th className="py-3.5 px-6 font-semibold">Kategori</th>
                <th className="py-3.5 px-6 font-semibold">Verifikasi</th>
                <th className="py-3.5 px-6 font-semibold text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E6E0F1] dark:divide-[#3B334D]">
              {achievements.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-[#F0EDFA]/40 dark:hover:bg-[#2D263D]/40 transition-colors"
                >
                  <td className="py-4 px-6 font-bold text-[#39324E] dark:text-[#F7F3FF]">
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 rounded-lg bg-[#EDE8FF] dark:bg-[#352D4A] text-[#7966D9] dark:text-[#B7A7FF]">
                        <Award className="w-4 h-4" />
                      </div>
                      <span>{item.title}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-[#706981] dark:text-[#C0B8D2]">{item.organizer}</td>
                  <td className="py-4 px-6 text-[#706981] dark:text-[#C0B8D2] flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{item.achievement_date}</span>
                  </td>
                  <td className="py-4 px-6">
                    <Badge variant={item.category === 'Award' ? 'mint' : 'violet'}>
                      {item.category}
                    </Badge>
                  </td>
                  <td className="py-4 px-6">
                    {item.verification_url ? (
                      <a
                        href={item.verification_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs text-[#7966D9] hover:underline dark:text-[#B7A7FF]"
                      >
                        <span>Link</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    ) : (
                      <span className="text-xs text-[#928AA5] dark:text-[#A096B5]">-</span>
                    )}
                  </td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleOpenEdit(item)}
                        className="p-1.5 rounded-lg text-[#706981] hover:text-[#7966D9] hover:bg-[#F0EDFA] dark:text-[#C0B8D2] dark:hover:bg-[#2D263D] transition-colors"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id, item.title)}
                        className="p-1.5 rounded-lg text-[#A82F42] hover:bg-[#FFE5E8] dark:hover:bg-[#492831] transition-colors"
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

      {/* Modal */}
      {isModalOpen && editing && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={editing.id ? 'Edit Sertifikat' : 'Tambah Sertifikat'}
        >
          <form onSubmit={handleSaveModal} className="space-y-4">
            <Input
              label="Judul Sertifikat / Penghargaan"
              value={editing.title || ''}
              onChange={(e) => setEditing({ ...editing, title: e.target.value })}
              required
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Penyelenggara / Institusi"
                value={editing.organizer || ''}
                onChange={(e) => setEditing({ ...editing, organizer: e.target.value })}
                placeholder="Dicoding, Cisco, Kampus"
                required
              />
              <Input
                label="Tahun / Tanggal"
                value={editing.achievement_date || ''}
                onChange={(e) => setEditing({ ...editing, achievement_date: e.target.value })}
                required
              />
            </div>

            <div className="w-full space-y-1.5 text-left">
              <label className="block text-xs font-semibold text-[#39324E] dark:text-[#F7F3FF]">
                Kategori
              </label>
              <select
                value={editing.category || 'Certification'}
                onChange={(e) => setEditing({ ...editing, category: e.target.value })}
                className="block w-full rounded-xl border border-[#E6E0F1] bg-white px-3.5 py-2.5 text-sm text-[#39324E] focus:border-[#7966D9] focus:outline-none dark:border-[#3B334D] dark:bg-[#211D2D] dark:text-[#F7F3FF]"
              >
                <option value="Certification">Certification</option>
                <option value="Award">Award / Kejuaraan</option>
                <option value="Workshop">Workshop / Pelatihan</option>
              </select>
            </div>

            <Textarea
              label="Deskripsi Kompetensi"
              value={editing.description || ''}
              onChange={(e) => setEditing({ ...editing, description: e.target.value })}
              rows={3}
              required
            />

            <Input
              label="Link Verifikasi Kredensial (Opsional)"
              value={editing.verification_url || ''}
              onChange={(e) => setEditing({ ...editing, verification_url: e.target.value })}
              placeholder="https://credential.net/sample"
            />

            <div className="flex justify-end gap-3 pt-4 border-t border-[#E6E0F1] dark:border-[#3B334D]">
              <Button type="button" variant="secondary" onClick={() => setIsModalOpen(false)}>
                Batal
              </Button>
              <Button type="submit" variant="admin-primary">
                Simpan Sertifikat
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}
