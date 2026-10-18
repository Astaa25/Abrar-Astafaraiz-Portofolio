'use client';

import React, { useState, useEffect } from 'react';
import { DataService } from '@/services/data-service';
import { Project, ProjectImage } from '@/types/database';
import { useToast } from '@/components/feedback/ToastContext';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Modal } from '@/components/ui/Modal';
import { Switch } from '@/components/ui/Switch';
import { Badge } from '@/components/ui/Badge';
import {
  Plus,
  Edit2,
  Trash2,
  Copy,
  ExternalLink,
  Search,
  FolderKanban,
  Image as ImageIcon,
} from 'lucide-react';
import { slugify } from '@/lib/utils/formatting';

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Partial<Project> | null>(null);
  const [techInput, setTechInput] = useState('');
  const [newImageUrl, setNewImageUrl] = useState('');
  const [newImageCaption, setNewImageCaption] = useState('');

  const { success, error } = useToast();

  const loadProjects = () => {
    setProjects(DataService.getDraftProjects());
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const handleOpenAdd = () => {
    setEditingProject({
      title: '',
      slug: '',
      short_description: '',
      full_description: '',
      year: new Date().getFullYear().toString(),
      category: 'Web Development',
      technologies: ['Next.js', 'TypeScript', 'Tailwind CSS'],
      cover_image_path: '/images/projects/portfolio-cms-cover.webp',
      project_url: '',
      project_url_enabled: false,
      is_featured: false,
      is_visible: true,
      sort_order: projects.length + 1,
      publication_status: 'draft',
      images: [],
    });
    setTechInput('Next.js, TypeScript, Tailwind CSS');
    setIsModalOpen(true);
  };

  const handleOpenEdit = (project: Project) => {
    setEditingProject({ ...project, images: project.images ? [...project.images] : [] });
    setTechInput((project.technologies || []).join(', '));
    setIsModalOpen(true);
  };

  const handleDuplicate = (id: string) => {
    const dup = DataService.duplicateDraftProject(id);
    if (dup) {
      success(`Proyek "${dup.title}" berhasil diduplikasi sebagai draft.`);
      loadProjects();
    }
  };

  const handleDelete = (id: string, title: string) => {
    if (confirm(`Hapus proyek "${title}" dari draft?`)) {
      DataService.deleteDraftProject(id);
      success(`Proyek "${title}" berhasil dihapus.`);
      loadProjects();
    }
  };

  const handleAddCarouselImage = () => {
    if (!newImageUrl.trim()) return;
    const newImg: ProjectImage = {
      id: `img-${Date.now()}`,
      project_id: editingProject?.id || 'new',
      storage_path: newImageUrl.trim(),
      alt_text: editingProject?.title || 'Gambar Proyek',
      caption: newImageCaption.trim() || null,
      sort_order: (editingProject?.images?.length || 0) + 1,
      created_at: new Date().toISOString(),
    };

    setEditingProject((prev) => ({
      ...prev!,
      images: [...(prev?.images || []), newImg],
    }));
    setNewImageUrl('');
    setNewImageCaption('');
  };

  const handleRemoveCarouselImage = (imgId: string) => {
    setEditingProject((prev) => ({
      ...prev!,
      images: (prev?.images || []).filter((img) => img.id !== imgId),
    }));
  };

  const handleSaveModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject?.title || !editingProject?.short_description) {
      error('Judul dan deskripsi singkat proyek wajib diisi.');
      return;
    }

    const techArray = techInput
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    try {
      DataService.saveDraftProject({
        id: editingProject.id,
        title: editingProject.title,
        slug: editingProject.slug || slugify(editingProject.title),
        short_description: editingProject.short_description,
        full_description: editingProject.full_description || editingProject.short_description,
        year: editingProject.year || new Date().getFullYear().toString(),
        category: editingProject.category || 'Web Development',
        technologies: techArray.length > 0 ? techArray : ['Web'],
        cover_image_path:
          editingProject.cover_image_path || '/images/projects/portfolio-cms-cover.webp',
        project_url: editingProject.project_url || null,
        project_url_enabled: !!editingProject.project_url_enabled,
        is_featured: !!editingProject.is_featured,
        is_visible: editingProject.is_visible !== undefined ? editingProject.is_visible : true,
        sort_order: Number(editingProject.sort_order) || 0,
        publication_status: editingProject.publication_status || 'draft',
        images: editingProject.images || [],
      });

      success('Proyek berhasil disimpan ke draft!');
      setIsModalOpen(false);
      setEditingProject(null);
      loadProjects();
    } catch {
      error('Gagal menyimpan proyek.');
    }
  };

  const filtered = projects.filter(
    (p) =>
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-[#39324E] dark:text-[#F7F3FF]">
            Manajemen Proyek Portofolio
          </h2>
          <p className="text-xs text-[#706981] dark:text-[#A096B5] mt-1">
            Kelola detail proyek, galeri carousel gambar, link eksternal, dan status publikasi.
          </p>
        </div>

        <Button
          variant="admin-primary"
          onClick={handleOpenAdd}
          leftIcon={<Plus className="w-4 h-4" />}
          className="font-bold self-start sm:self-auto"
        >
          Tambah Proyek Baru
        </Button>
      </div>

      {/* Search Bar */}
      <div className="flex items-center gap-4">
        <div className="max-w-md w-full">
          <Input
            placeholder="Cari nama proyek atau kategori..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            leftIcon={<Search className="w-4 h-4" />}
          />
        </div>
      </div>

      {/* Projects Table */}
      <div className="rounded-3xl bg-white dark:bg-[#211D2D] border border-[#E6E0F1] dark:border-[#3B334D] overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-[#E6E0F1] dark:border-[#3B334D] bg-[#F7F5FF] dark:bg-[#171421] text-[#928AA5] dark:text-[#A096B5]">
                <th className="py-3.5 px-6 font-semibold">Proyek</th>
                <th className="py-3.5 px-6 font-semibold">Tahun</th>
                <th className="py-3.5 px-6 font-semibold">Kategori</th>
                <th className="py-3.5 px-6 font-semibold">Status Publikasi</th>
                <th className="py-3.5 px-6 font-semibold">Website Link</th>
                <th className="py-3.5 px-6 font-semibold text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E6E0F1] dark:divide-[#3B334D]">
              {filtered.map((proj) => (
                <tr
                  key={proj.id}
                  className="hover:bg-[#F0EDFA]/40 dark:hover:bg-[#2D263D]/40 transition-colors"
                >
                  <td className="py-4 px-6 font-bold text-[#39324E] dark:text-[#F7F3FF]">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#EDE8FF] dark:bg-[#352D4A] flex items-center justify-center text-[#7966D9] dark:text-[#B7A7FF] shrink-0">
                        <FolderKanban className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span>{proj.title}</span>
                          {proj.is_featured && (
                            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-sm bg-[#176A4A] text-white">
                              Featured
                            </span>
                          )}
                        </div>
                        <span className="text-xs font-normal text-[#706981] dark:text-[#A096B5] block line-clamp-1">
                          {proj.short_description}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-[#706981] dark:text-[#C0B8D2]">{proj.year}</td>
                  <td className="py-4 px-6 text-[#706981] dark:text-[#C0B8D2]">{proj.category}</td>
                  <td className="py-4 px-6">
                    <Badge variant={proj.publication_status === 'published' ? 'success' : 'warning'}>
                      {proj.publication_status === 'published' ? 'Published' : 'Draft'}
                    </Badge>
                  </td>
                  <td className="py-4 px-6">
                    {proj.project_url_enabled && proj.project_url ? (
                      <span className="inline-flex items-center gap-1 text-xs text-[#7966D9] dark:text-[#B7A7FF] font-medium">
                        <span>Aktif</span>
                        <ExternalLink className="w-3 h-3" />
                      </span>
                    ) : (
                      <span className="text-xs text-[#928AA5] dark:text-[#A096B5]">Nonaktif</span>
                    )}
                  </td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => handleDuplicate(proj.id)}
                        className="p-1.5 rounded-lg text-[#706981] hover:text-[#7966D9] hover:bg-[#F0EDFA] dark:text-[#C0B8D2] dark:hover:bg-[#2D263D] transition-colors"
                        title="Duplikasi sebagai draft"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleOpenEdit(proj)}
                        className="p-1.5 rounded-lg text-[#706981] hover:text-[#7966D9] hover:bg-[#F0EDFA] dark:text-[#C0B8D2] dark:hover:bg-[#2D263D] transition-colors"
                        title="Edit proyek"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(proj.id, proj.title)}
                        className="p-1.5 rounded-lg text-[#A82F42] hover:bg-[#FFE5E8] dark:hover:bg-[#492831] transition-colors"
                        title="Hapus proyek"
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

      {/* Add / Edit Project Modal */}
      {isModalOpen && editingProject && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={editingProject.id ? `Edit: ${editingProject.title}` : 'Tambah Proyek Baru'}
          maxWidth="4xl"
        >
          <form onSubmit={handleSaveModal} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Judul Proyek"
                value={editingProject.title || ''}
                onChange={(e) => {
                  const val = e.target.value;
                  setEditingProject({
                    ...editingProject,
                    title: val,
                    slug: editingProject.id ? editingProject.slug : slugify(val),
                  });
                }}
                required
              />
              <Input
                label="Slug URL"
                value={editingProject.slug || ''}
                onChange={(e) => setEditingProject({ ...editingProject, slug: e.target.value })}
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Input
                label="Tahun Proyek"
                value={editingProject.year || ''}
                onChange={(e) => setEditingProject({ ...editingProject, year: e.target.value })}
                placeholder="2026"
                required
              />
              <div className="w-full space-y-1.5 text-left">
                <label className="block text-xs font-semibold text-[#39324E] dark:text-[#F7F3FF]">
                  Kategori
                </label>
                <select
                  value={editingProject.category || 'Web Development'}
                  onChange={(e) => setEditingProject({ ...editingProject, category: e.target.value })}
                  className="block w-full rounded-xl border border-[#E6E0F1] bg-white px-3.5 py-2.5 text-sm text-[#39324E] focus:border-[#7966D9] focus:outline-none dark:border-[#3B334D] dark:bg-[#211D2D] dark:text-[#F7F3FF]"
                >
                  <option value="Web Development">Web Development</option>
                  <option value="Software Development">Software Development</option>
                  <option value="Mobile Development">Mobile Development</option>
                  <option value="UI/UX Design">UI/UX Design</option>
                </select>
              </div>
              <div className="w-full space-y-1.5 text-left">
                <label className="block text-xs font-semibold text-[#39324E] dark:text-[#F7F3FF]">
                  Status Publikasi
                </label>
                <select
                  value={editingProject.publication_status || 'draft'}
                  onChange={(e) =>
                    setEditingProject({
                      ...editingProject,
                      publication_status: e.target.value as 'draft' | 'published',
                    })
                  }
                  className="block w-full rounded-xl border border-[#E6E0F1] bg-white px-3.5 py-2.5 text-sm text-[#39324E] focus:border-[#7966D9] focus:outline-none dark:border-[#3B334D] dark:bg-[#211D2D] dark:text-[#F7F3FF]"
                >
                  <option value="draft">Draft (Hanya di Dashboard/Preview)</option>
                  <option value="published">Published (Tampil di Publik)</option>
                </select>
              </div>
            </div>

            <Textarea
              label="Deskripsi Singkat (Tampil pada Card)"
              value={editingProject.short_description || ''}
              onChange={(e) =>
                setEditingProject({ ...editingProject, short_description: e.target.value })
              }
              rows={2}
              required
            />

            <Textarea
              label="Deskripsi Lengkap (Tampil pada Modal)"
              value={editingProject.full_description || ''}
              onChange={(e) =>
                setEditingProject({ ...editingProject, full_description: e.target.value })
              }
              rows={4}
              required
            />

            <Input
              label="Teknologi & Stack (Pisahkan dengan koma)"
              value={techInput}
              onChange={(e) => setTechInput(e.target.value)}
              placeholder="Next.js, TypeScript, Tailwind CSS, PostgreSQL"
              required
            />

            <Input
              label="Cover Image Path / URL"
              value={editingProject.cover_image_path || ''}
              onChange={(e) =>
                setEditingProject({ ...editingProject, cover_image_path: e.target.value })
              }
              helperText="Gambar utama yang ditampilkan pada kartu proyek dan cover"
              required
            />

            {/* Carousel Images Section */}
            <div className="p-4 rounded-2xl bg-[#F7F5FF] dark:bg-[#171421] border border-[#E6E0F1] dark:border-[#3B334D] space-y-3">
              <div className="flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-[#7966D9] dark:text-[#B7A7FF]" />
                <h4 className="text-xs font-bold text-[#39324E] dark:text-[#F7F3FF] uppercase tracking-wider">
                  Galeri Carousel Proyek ({editingProject.images?.length || 0} Gambar)
                </h4>
              </div>

              {/* Add carousel image form */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-2">
                <div className="sm:col-span-6">
                  <Input
                    placeholder="URL / Path gambar carousel..."
                    value={newImageUrl}
                    onChange={(e) => setNewImageUrl(e.target.value)}
                  />
                </div>
                <div className="sm:col-span-4">
                  <Input
                    placeholder="Keterangan / Caption..."
                    value={newImageCaption}
                    onChange={(e) => setNewImageCaption(e.target.value)}
                  />
                </div>
                <div className="sm:col-span-2">
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={handleAddCarouselImage}
                    className="w-full text-xs h-10"
                  >
                    Tambah
                  </Button>
                </div>
              </div>

              {/* Carousel Image Items */}
              <div className="space-y-2 pt-2">
                {(editingProject.images || []).map((img, idx) => (
                  <div
                    key={img.id}
                    className="flex items-center justify-between p-2.5 rounded-xl bg-white dark:bg-[#211D2D] border border-[#E6E0F1] dark:border-[#3B334D] text-xs"
                  >
                    <div className="flex items-center gap-2 truncate">
                      <span className="font-bold text-[#7966D9] dark:text-[#B7A7FF]">
                        #{idx + 1}
                      </span>
                      <span className="truncate max-w-xs">{img.storage_path}</span>
                      {img.caption && (
                        <span className="text-[#706981] dark:text-[#A096B5] truncate">
                          ({img.caption})
                        </span>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveCarouselImage(img.id)}
                      className="text-[#A82F42] hover:underline p-1"
                    >
                      Hapus
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Project URL & Toggle */}
            <div className="p-4 rounded-2xl bg-[#F7F5FF] dark:bg-[#171421] border border-[#E6E0F1] dark:border-[#3B334D] space-y-3">
              <Switch
                checked={!!editingProject.project_url_enabled}
                onChange={(checked) =>
                  setEditingProject({ ...editingProject, project_url_enabled: checked })
                }
                label="Aktifkan Link Website Proyek"
                description="Tampilkan link teks 'Website project ini ↗' di bagian paling akhir deskripsi modal."
              />

              {editingProject.project_url_enabled && (
                <Input
                  label="URL Website Proyek (HTTPS)"
                  value={editingProject.project_url || ''}
                  onChange={(e) =>
                    setEditingProject({ ...editingProject, project_url: e.target.value })
                  }
                  placeholder="https://example.com"
                />
              )}
            </div>

            <div className="flex items-center gap-6">
              <Switch
                checked={!!editingProject.is_featured}
                onChange={(checked) =>
                  setEditingProject({ ...editingProject, is_featured: checked })
                }
                label="Featured Project"
              />

              <Switch
                checked={editingProject.is_visible !== false}
                onChange={(checked) =>
                  setEditingProject({ ...editingProject, is_visible: checked })
                }
                label="Visibilitas Aktif"
              />
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-[#E6E0F1] dark:border-[#3B334D]">
              <Button type="button" variant="secondary" onClick={() => setIsModalOpen(false)}>
                Batal
              </Button>
              <Button type="submit" variant="admin-primary">
                Simpan Proyek (Draft)
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}
