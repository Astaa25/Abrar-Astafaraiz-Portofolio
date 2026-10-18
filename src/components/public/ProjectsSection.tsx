'use client';

import React, { useState } from 'react';
import { Project } from '@/types/database';
import { ProjectCard } from '@/components/projects/ProjectCard';
import { ProjectModal } from '@/components/projects/ProjectModal';
import { Sparkles } from 'lucide-react';

interface ProjectsSectionProps {
  projects: Project[];
  title?: string;
  subtitle?: string;
}

export function ProjectsSection({
  projects,
  title = 'Proyek Pilihan',
  subtitle = 'Koleksi Portofolio Rekayasa Perangkat Lunak',
}: ProjectsSectionProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const categories = ['all', 'Web Development', 'Software Development'];

  const filteredProjects =
    filterCategory === 'all'
      ? projects
      : projects.filter((p) => p.category.toLowerCase() === filterCategory.toLowerCase());

  return (
    <section id="projects" className="py-24 bg-white dark:bg-[#10111B] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-[#6C5CE7] dark:text-[#A99BFF]">
            {subtitle}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#20233A] dark:text-[#F5F3FF]">
            {title}
          </h2>
          <div className="w-16 h-1 rounded-full gradient-aurora mx-auto mt-2" />
        </div>

        {/* Filter Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                filterCategory.toLowerCase() === cat.toLowerCase()
                  ? 'bg-[#6C5CE7] text-white shadow-sm dark:bg-[#A99BFF] dark:text-[#10111B]'
                  : 'bg-[#F7F8FC] dark:bg-[#1B1C2A] text-[#62647A] dark:text-[#C4C2D8] border border-[#E6E7F0] dark:border-[#353449] hover:border-[#6C5CE7]'
              }`}
            >
              {cat === 'all' ? 'Semua Proyek' : cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        {filteredProjects.length === 0 ? (
          <div className="text-center py-16 p-8 rounded-2xl bg-[#F7F8FC] dark:bg-[#1B1C2A] border border-[#E6E7F0] dark:border-[#353449]">
            <Sparkles className="w-8 h-8 text-[#85869B] mx-auto mb-3" />
            <p className="text-sm font-medium text-[#62647A] dark:text-[#C4C2D8]">
              Belum ada proyek yang dipublikasikan pada kategori ini.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onOpenDetails={(p) => setSelectedProject(p)}
              />
            ))}
          </div>
        )}

        {/* Detail Modal */}
        <ProjectModal
          project={selectedProject}
          isOpen={!!selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      </div>
    </section>
  );
}
