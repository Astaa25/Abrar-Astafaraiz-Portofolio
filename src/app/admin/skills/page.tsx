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
import {
  Plus,
  Edit2,
  Trash2,
  Wrench,
  Search,
  Code2,
  Terminal,
  Network,
  Layout,
  Video,
  Database,
  Cpu,
  Layers,
  Palette,
  Server,
  Zap,
} from 'lucide-react';

export default function AdminSkillsPage() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua');
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
      category: 'Teknik Informatika',
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
    if (confirm(`Hapus keahlian "${name}"?`)) {
      DataService.deleteDraftSkill(id);
      success(`Skill "${name}" berhasil dihapus.`);
      loadSkills();
    }
  };

  const handleToggleVisible = (skill: Skill, nextChecked: boolean) => {
    DataService.saveDraftSkill({
      ...skill,
      is_visible: nextChecked,
    });
    loadSkills();
    success(`Skill "${skill.name}" kini ${nextChecked ? 'Aktif (Tampil)' : 'Nonaktif (Tersembunyi)'}.`);
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

      success('Skill berhasil disimpan dan langsung aktif!');
      setIsModalOpen(false);
      setEditingSkill(null);
      loadSkills();
    } catch {
      error('Gagal menyimpan skill.');
    }
  };

  const categories = [
    'Semua',
    'Teknik Informatika',
    'Rekayasa Jaringan (TRKJ)',
    'Rekayasa Multimedia (TRM)',
    'Database & Cloud',
  ];

  const filtered = skills.filter((s) => {
    const matchSearch =
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.category.toLowerCase().includes(searchQuery.toLowerCase());

    const matchCategory =
      selectedCategory === 'Semua' ||
      s.category.toLowerCase() === selectedCategory.toLowerCase();

    return matchSearch && matchCategory;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-[#39324E] dark:text-[#F7F3FF]">
            Manajemen Keahlian & Teknologi
          </h2>
          <p className="text-xs text-[#706981] dark:text-[#A096B5] mt-1">
            Katalog lengkap keahlian Teknik Informatika, Rekayasa Jaringan (TRKJ), dan Multimedia (TRM). Aktifkan/nonaktifkan skill sesuai kebutuhan dengan sakelar di bawah.
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

      {/* Category Pills & Search */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#7966D9] text-white shadow-xs'
                  : 'bg-white dark:bg-[#211D2D] text-[#706981] dark:text-[#C0B8D2] border border-[#E6E0F1] dark:border-[#3B334D] hover:border-[#7966D9]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

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
                <th className="py-3.5 px-6 font-semibold">Status Aktif (Tampil di Web)</th>
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
                    <div className="flex items-center gap-2.5">
                      <div className="p-1.5 rounded-lg bg-[#EDE8FF] dark:bg-[#352D4A] text-[#7966D9] dark:text-[#B7A7FF] shrink-0">
                        <Wrench className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <span>{skill.name}</span>
                        {skill.description && (
                          <p className="text-[11px] font-normal text-[#706981] dark:text-[#A096B5] line-clamp-1 max-w-xs">
                            {skill.description}
                          </p>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-[#706981] dark:text-[#C0B8D2]">
                    <span className="inline-block px-2.5 py-1 rounded-lg bg-[#F7F5FF] dark:bg-[#171421] border border-[#E6E0F1] dark:border-[#3B334D] text-xs font-semibold">
                      {skill.category}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <Badge variant={skill.proficiency_label === 'Advanced' ? 'violet' : skill.proficiency_label === 'Proficient' ? 'mint' : 'neutral'}>
                      {skill.proficiency_label || 'Proficient'}
                    </Badge>
                  </td>
                  <td className="py-4 px-6 text-[#706981] dark:text-[#C0B8D2]">
                    {skill.sort_order}
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={skill.is_visible}
                        onChange={(checked) => handleToggleVisible(skill, checked)}
                      />
                      <span className={`text-xs font-semibold ${skill.is_visible ? 'text-[#176A4A] dark:text-[#8CE3BD]' : 'text-[#85869B] dark:text-[#9A99B5]'}`}>
                        {skill.is_visible ? 'Aktif' : 'Nonaktif'}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleOpenEdit(skill)}
                        className="p-1.5 rounded-lg text-[#706981] hover:text-[#7966D9] hover:bg-[#F0EDFA] dark:text-[#C0B8D2] dark:hover:bg-[#2D263D] transition-colors"
                        aria-label="Edit keahlian"
                        title="Edit keahlian"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(skill.id, skill.name)}
                        className="p-1.5 rounded-lg text-[#A82F42] hover:bg-[#FFE5E8] dark:hover:bg-[#492831] transition-colors"
                        aria-label="Hapus keahlian"
                        title="Hapus keahlian"
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
              placeholder="Contoh: Next.js, Cisco Packet Tracer, Blender 3D"
              required
            />

            <div className="w-full space-y-1.5 text-left">
              <label className="block text-xs font-semibold text-[#39324E] dark:text-[#F7F3FF]">
                Kategori Keahlian
              </label>
              <select
                value={editingSkill.category || 'Teknik Informatika'}
                onChange={(e) => setEditingSkill({ ...editingSkill, category: e.target.value })}
                className="block w-full rounded-xl border border-[#E6E0F1] bg-white px-3.5 py-2.5 text-sm text-[#39324E] focus:border-[#7966D9] focus:outline-none dark:border-[#3B334D] dark:bg-[#211D2D] dark:text-[#F7F3FF]"
              >
                <option value="Teknik Informatika">Teknik Informatika (Software & Web)</option>
                <option value="Rekayasa Jaringan (TRKJ)">Rekayasa Jaringan (TRKJ)</option>
                <option value="Rekayasa Multimedia (TRM)">Rekayasa Multimedia (TRM)</option>
                <option value="Database & Cloud">Database & Cloud</option>
                <option value="Tools & Platforms">Tools & Platforms</option>
              </select>
            </div>

            <div className="w-full space-y-1.5 text-left">
              <label className="block text-xs font-semibold text-[#39324E] dark:text-[#F7F3FF]">
                Pilih Ikon Representasi
              </label>
              <select
                value={editingSkill.icon_name || 'Code2'}
                onChange={(e) => setEditingSkill({ ...editingSkill, icon_name: e.target.value })}
                className="block w-full rounded-xl border border-[#E6E0F1] bg-white px-3.5 py-2.5 text-sm text-[#39324E] focus:border-[#7966D9] focus:outline-none dark:border-[#3B334D] dark:bg-[#211D2D] dark:text-[#F7F3FF]"
              >
                <option value="Code2">Coding / Kode (Code2)</option>
                <option value="Terminal">Terminal / Skrip (Terminal)</option>
                <option value="Layers">Fullstack / Layers (Layers)</option>
                <option value="Atom">React / Atom (Atom)</option>
                <option value="Server">Server / Backend (Server)</option>
                <option value="Network">Jaringan / Router / Network (Network)</option>
                <option value="Router">Mikrotik / Router (Router)</option>
                <option value="Activity">Wireshark / Traffic (Activity)</option>
                <option value="Layout">UI/UX / Figma / Layout (Layout)</option>
                <option value="Palette">Styling / Desain Grafis (Palette)</option>
                <option value="Video">Video Editing (Video)</option>
                <option value="Film">Motion Graphics / Film (Film)</option>
                <option value="Database">Database / Storage (Database)</option>
                <option value="ShieldCheck">Keamanan / Security (ShieldCheck)</option>
                <option value="Cpu">Hardware / IoT / Cpu (Cpu)</option>
                <option value="Box">3D / Docker / Box (Box)</option>
                <option value="GitBranch">Git / Version Control (GitBranch)</option>
                <option value="Zap">Zap / Performance (Zap)</option>
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
            </div>

            <Input
              label="Deskripsi Singkat Penggunaan"
              value={editingSkill.description || ''}
              onChange={(e) => setEditingSkill({ ...editingSkill, description: e.target.value })}
              placeholder="Contoh: Perancangan skema database relasional"
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
                  label="Aktifkan Sekarang"
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
