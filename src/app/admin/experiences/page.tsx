'use client';

import React, { useState, useEffect } from 'react';
import { DataService } from '@/services/data-service';
import { Experience } from '@/types/database';
import { useToast } from '@/components/feedback/ToastContext';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Modal } from '@/components/ui/Modal';
import { Switch } from '@/components/ui/Switch';
import { Badge } from '@/components/ui/Badge';
import { Plus, Edit2, Trash2, Briefcase, Calendar } from 'lucide-react';

export default function AdminExperiencesPage() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editing, setEditing] = useState<Partial<Experience> | null>(null);
  const [respInput, setRespInput] = useState('');

  const { success, error } = useToast();

  const loadExperiences = () => {
    setExperiences(DataService.getDraftExperiences());
  };

  useEffect(() => {
    loadExperiences();
  }, []);

  const handleOpenAdd = () => {
    setEditing({
      position: '',
      organization: '',
      start_date: new Date().getFullYear().toString(),
      end_date: '',
      is_current: false,
      description: '',
      responsibilities: [],
      sort_order: experiences.length + 1,
      is_visible: true,
      publication_status: 'published',
    });
    setRespInput('');
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: Experience) => {
    setEditing({ ...item });
    setRespInput((item.responsibilities || []).join('\n'));
    setIsModalOpen(true);
  };

  const handleDelete = (id: string, title: string) => {
    if (confirm(`Hapus pengalaman "${title}" dari draft?`)) {
      DataService.deleteDraftExperience(id);
      success(`Pengalaman "${title}" berhasil dihapus.`);
      loadExperiences();
    }
  };

  const handleSaveModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editing?.position || !editing?.organization) {
      error('Posisi dan nama organisasi wajib diisi.');
      return;
    }

    const respArray = respInput
      .split('\n')
      .map((r) => r.trim())
      .filter(Boolean);

    try {
      DataService.saveDraftExperience({
        id: editing.id,
        position: editing.position,
        organization: editing.organization,
        start_date: editing.start_date || new Date().getFullYear().toString(),
        end_date: editing.is_current ? null : editing.end_date || null,
        is_current: !!editing.is_current,
        description: editing.description || '',
        responsibilities: respArray,
        sort_order: Number(editing.sort_order) || 0,
        is_visible: editing.is_visible !== undefined ? editing.is_visible : true,
        publication_status: editing.publication_status || 'published',
      });

      success('Pengalaman berhasil disimpan ke draft!');
      setIsModalOpen(false);
      setEditing(null);
      loadExperiences();
    } catch {
      error('Gagal menyimpan pengalaman.');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-[#39324E] dark:text-[#F7F3FF]">
            Pengalaman & Organisasi
          </h2>
          <p className="text-xs text-[#706981] dark:text-[#A096B5] mt-1">
            Kelola rekam jejak kepengurusan organisasi, proyek kolaboratif, dan magang profesional.
          </p>
        </div>

        <Button
          variant="admin-primary"
          onClick={handleOpenAdd}
          leftIcon={<Plus className="w-4 h-4" />}
          className="font-bold self-start sm:self-auto"
        >
          Tambah Pengalaman Baru
        </Button>
      </div>

      {/* Experiences Table */}
      <div className="rounded-3xl bg-white dark:bg-[#211D2D] border border-[#E6E0F1] dark:border-[#3B334D] overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-[#E6E0F1] dark:border-[#3B334D] bg-[#F7F5FF] dark:bg-[#171421] text-[#928AA5] dark:text-[#A096B5]">
                <th className="py-3.5 px-6 font-semibold">Posisi / Peran</th>
                <th className="py-3.5 px-6 font-semibold">Organisasi / Lembaga</th>
                <th className="py-3.5 px-6 font-semibold">Periode</th>
                <th className="py-3.5 px-6 font-semibold">Status</th>
                <th className="py-3.5 px-6 font-semibold text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E6E0F1] dark:divide-[#3B334D]">
              {experiences.map((exp) => (
                <tr
                  key={exp.id}
                  className="hover:bg-[#F0EDFA]/40 dark:hover:bg-[#2D263D]/40 transition-colors"
                >
                  <td className="py-4 px-6 font-bold text-[#39324E] dark:text-[#F7F3FF]">
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 rounded-lg bg-[#EDE8FF] dark:bg-[#352D4A] text-[#7966D9] dark:text-[#B7A7FF]">
                        <Briefcase className="w-4 h-4" />
                      </div>
                      <span>{exp.position}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-[#706981] dark:text-[#C0B8D2] font-medium">
                    {exp.organization}
                  </td>
                  <td className="py-4 px-6 text-[#706981] dark:text-[#C0B8D2] flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>
                      {exp.start_date} - {exp.is_current ? 'Sekarang' : exp.end_date || '-'}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    {exp.is_current ? (
                      <Badge variant="mint">Aktif Berjalan</Badge>
                    ) : (
                      <Badge variant="neutral">Selesai</Badge>
                    )}
                  </td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleOpenEdit(exp)}
                        className="p-1.5 rounded-lg text-[#706981] hover:text-[#7966D9] hover:bg-[#F0EDFA] dark:text-[#C0B8D2] dark:hover:bg-[#2D263D] transition-colors"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(exp.id, exp.position)}
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
          title={editing.id ? 'Edit Pengalaman' : 'Tambah Pengalaman Baru'}
          maxWidth="2xl"
        >
          <form onSubmit={handleSaveModal} className="space-y-4">
            <Input
              label="Posisi / Jabatan"
              value={editing.position || ''}
              onChange={(e) => setEditing({ ...editing, position: e.target.value })}
              required
            />

            <Input
              label="Nama Organisasi / Lembaga / Perusahaan"
              value={editing.organization || ''}
              onChange={(e) => setEditing({ ...editing, organization: e.target.value })}
              required
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Periode Mulai (Tahun / Bulan)"
                value={editing.start_date || ''}
                onChange={(e) => setEditing({ ...editing, start_date: e.target.value })}
                placeholder="2024"
                required
              />
              <Input
                label="Periode Berakhir"
                value={editing.is_current ? 'Sekarang' : editing.end_date || ''}
                disabled={!!editing.is_current}
                onChange={(e) => setEditing({ ...editing, end_date: e.target.value })}
                placeholder="2025"
              />
            </div>

            <Switch
              checked={!!editing.is_current}
              onChange={(checked) =>
                setEditing({ ...editing, is_current: checked, end_date: checked ? '' : editing.end_date })
              }
              label="Masih aktif menjabat (Current Position)"
            />

            <Textarea
              label="Deskripsi Ringkas Peran & Tanggung Jawab"
              value={editing.description || ''}
              onChange={(e) => setEditing({ ...editing, description: e.target.value })}
              rows={3}
              required
            />

            <Textarea
              label="Daftar Kontribusi Utama (1 baris per poin kontribusi)"
              value={respInput}
              onChange={(e) => setRespInput(e.target.value)}
              rows={4}
              placeholder="Mengembangkan modul frontend berbasis Next.js&#10;Melakukan koordinasi arsitektur database"
            />

            <div className="flex justify-end gap-3 pt-4 border-t border-[#E6E0F1] dark:border-[#3B334D]">
              <Button type="button" variant="secondary" onClick={() => setIsModalOpen(false)}>
                Batal
              </Button>
              <Button type="submit" variant="admin-primary">
                Simpan Pengalaman
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}
