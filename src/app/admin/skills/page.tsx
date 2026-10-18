'use client';

import React, { useState, useEffect } from 'react';
import { DataService } from '@/services/data-service';
import { Skill } from '@/types/database';
import { useToast } from '@/components/feedback/ToastContext';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Modal } from '@/components/ui/Modal';
import { Switch } from '@/components/ui/Switch';
import { Badge } from '@/components/ui/Badge';
import { Plus, Edit2, Trash2, Wrench, Search } from 'lucide-react';

export default function AdminSkillsPage() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState<Partial<Skill> | null>(null);

  const { success, error } = useToast();

  const loadSkills = () => {
    setSkills(DataService.getDraftSkills());
  };

  useEffect(() => {
    loadSkills();
  }, []);

  const handleOpenAdd = () => {
    setEditingSkill({
      name: '',
      category: 'Web Development',
      proficiency_label: 'Proficient',
      description: '',
      icon_name: 'Code2',
      sort_order: skills.length + 1,
      is_visible: true,
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (skill: Skill) => {
    setEditingSkill({ ...skill });
    setIsModalOpen(true);
  };

  const handleDelete = (id: string, name: string) => {
    if (confirm(`Hapus keahlian "${name}" dari draft?`)) {
      DataService.deleteDraftSkill(id);
      success(`Skill "${name}" berhasil dihapus.`);
      loadSkills();
    }
  };

  const handleSaveModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSkill?.name || !editingSkill?.category) {
      error('Nama dan kategori skill wajib diisi.');
      return;
    }

    try {
      DataService.saveDraftSkill({
        id: editingSkill.id,
        name: editingSkill.name,
        category: editingSkill.category,
        proficiency_label: editingSkill.proficiency_label || 'Proficient',
        description: editingSkill.description || null,
        icon_name: editingSkill.icon_name || 'Code2',
        sort_order: Number(editingSkill.sort_order) || 0,
        is_visible: editingSkill.is_visible !== undefined ? editingSkill.is_visible : true,
      });

      success('Skill berhasil disimpan ke draft!');
      setIsModalOpen(false);
      setEditingSkill(null);
      loadSkills();
    } catch {
      error('Gagal menyimpan skill.');
    }
  };

  const filtered = skills.filter(
    (s) =>
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-[#39324E] dark:text-[#F7F3FF]">
            Manajemen Keahlian & Teknologi
          </h2>
          <p className="text-xs text-[#706981] dark:text-[#A096B5] mt-1">
            Kelola daftar keahlian, kategori teknis, dan tingkat penguasaan kontekstual.
          </p>
        </div>

        <Button
          variant="admin-primary"
          onClick={handleOpenAdd}
          leftIcon={<Plus className="w-4 h-4" />}
          className="font-bold self-start sm:self-auto"
        >
          Tambah Keahlian Baru
        </Button>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex items-center gap-4">
        <div className="max-w-md w-full">
          <Input
            placeholder="Cari keahlian atau kategori..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            leftIcon={<Search className="w-4 h-4" />}
          />
        </div>
      </div>

      {/* Skills Table */}
      <div className="rounded-3xl bg-white dark:bg-[#211D2D] border border-[#E6E0F1] dark:border-[#3B334D] overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-[#E6E0F1] dark:border-[#3B334D] bg-[#F7F5FF] dark:bg-[#171421] text-[#928AA5] dark:text-[#A096B5]">
                <th className="py-3.5 px-6 font-semibold">Nama Keahlian</th>
                <th className="py-3.5 px-6 font-semibold">Kategori</th>
                <th className="py-3.5 px-6 font-semibold">Penguasaan</th>
                <th className="py-3.5 px-6 font-semibold">Urutan</th>
                <th className="py-3.5 px-6 font-semibold">Visibilitas</th>
                <th className="py-3.5 px-6 font-semibold text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E6E0F1] dark:divide-[#3B334D]">
              {filtered.map((skill) => (
                <tr
                  key={skill.id}
                  className="hover:bg-[#F0EDFA]/40 dark:hover:bg-[#2D263D]/40 transition-colors"
                >
                  <td className="py-4 px-6 font-bold text-[#39324E] dark:text-[#F7F3FF]">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 rounded-lg bg-[#EDE8FF] dark:bg-[#352D4A] text-[#7966D9] dark:text-[#B7A7FF]">
                        <Wrench className="w-3.5 h-3.5" />
                      </div>
                      <span>{skill.name}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-[#706981] dark:text-[#C0B8D2]">
                    {skill.category}
                  </td>
                  <td className="py-4 px-6">
                    <Badge variant={skill.proficiency_label === 'Advanced' ? 'violet' : 'mint'}>
                      {skill.proficiency_label || 'Proficient'}
                    </Badge>
                  </td>
                  <td className="py-4 px-6 text-[#706981] dark:text-[#C0B8D2]">
                    {skill.sort_order}
                  </td>
                  <td className="py-4 px-6">
                    {skill.is_visible ? (
                      <span className="text-xs font-semibold text-[#176A4A] dark:text-[#8CE3BD]">
                        Aktif
                      </span>
                    ) : (
                      <span className="text-xs font-semibold text-[#85869B] dark:text-[#9A99B5]">
                        Nonaktif
                      </span>
                    )}
                  </td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleOpenEdit(skill)}
                        className="p-1.5 rounded-lg text-[#706981] hover:text-[#7966D9] hover:bg-[#F0EDFA] dark:text-[#C0B8D2] dark:hover:bg-[#2D263D] transition-colors"
                        aria-label="Edit keahlian"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(skill.id, skill.name)}
                        className="p-1.5 rounded-lg text-[#A82F42] hover:bg-[#FFE5E8] dark:hover:bg-[#492831] transition-colors"
                        aria-label="Hapus keahlian"
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

      {/* Add / Edit Skill Modal */}
      {isModalOpen && editingSkill && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={editingSkill.id ? 'Edit Keahlian' : 'Tambah Keahlian Baru'}
        >
          <form onSubmit={handleSaveModal} className="space-y-4">
            <Input
              label="Nama Keahlian / Teknologi"
              value={editingSkill.name || ''}
              onChange={(e) => setEditingSkill({ ...editingSkill, name: e.target.value })}
              placeholder="Contoh: Next.js, PostgreSQL, TypeScript"
              required
            />

            <div className="w-full space-y-1.5 text-left">
              <label className="block text-xs font-semibold text-[#39324E] dark:text-[#F7F3FF]">
                Kategori
              </label>
              <select
                value={editingSkill.category || 'Web Development'}
                onChange={(e) => setEditingSkill({ ...editingSkill, category: e.target.value })}
                className="block w-full rounded-xl border border-[#E6E0F1] bg-white px-3.5 py-2.5 text-sm text-[#39324E] focus:border-[#7966D9] focus:outline-none dark:border-[#3B334D] dark:bg-[#211D2D] dark:text-[#F7F3FF]"
              >
                <option value="Programming Languages">Programming Languages</option>
                <option value="Web Development">Web Development</option>
                <option value="Mobile Development">Mobile Development</option>
                <option value="Database Management">Database Management</option>
                <option value="Tools & Platforms">Tools & Platforms</option>
                <option value="UI/UX Design">UI/UX Design</option>
                <option value="Other Technical Skills">Other Technical Skills</option>
              </select>
            </div>

            <div className="w-full space-y-1.5 text-left">
              <label className="block text-xs font-semibold text-[#39324E] dark:text-[#F7F3FF]">
                Tingkat Penguasaan Kontekstual
              </label>
              <select
                value={editingSkill.proficiency_label || 'Proficient'}
                onChange={(e) =>
                  setEditingSkill({ ...editingSkill, proficiency_label: e.target.value })
                }
                className="block w-full rounded-xl border border-[#E6E0F1] bg-white px-3.5 py-2.5 text-sm text-[#39324E] focus:border-[#7966D9] focus:outline-none dark:border-[#3B334D] dark:bg-[#211D2D] dark:text-[#F7F3FF]"
              >
                <option value="Advanced">Advanced (Mahir)</option>
                <option value="Proficient">Proficient (Kompeten)</option>
                <option value="Familiar">Familiar (Dasar)</option>
              </select>
              <p className="text-[11px] text-[#706981] dark:text-[#A096B5]">
                Catatan PRD: Tidak menggunakan persentase angka fiktif.
              </p>
            </div>

            <Input
              label="Deskripsi Singkat (Opsional)"
              value={editingSkill.description || ''}
              onChange={(e) => setEditingSkill({ ...editingSkill, description: e.target.value })}
              placeholder="Peruntukan teknologi dalam arsitektur"
            />

            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Nomor Urutan"
                type="number"
                value={editingSkill.sort_order ?? 0}
                onChange={(e) =>
                  setEditingSkill({ ...editingSkill, sort_order: parseInt(e.target.value, 10) })
                }
              />
              <div className="flex items-center pt-6">
                <Switch
                  checked={editingSkill.is_visible !== false}
                  onChange={(checked) => setEditingSkill({ ...editingSkill, is_visible: checked })}
                  label="Tampilkan di Web"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-[#E6E0F1] dark:border-[#3B334D]">
              <Button
                type="button"
                variant="secondary"
                onClick={() => setIsModalOpen(false)}
              >
                Batal
              </Button>
              <Button type="submit" variant="admin-primary">
                Simpan Keahlian
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}
