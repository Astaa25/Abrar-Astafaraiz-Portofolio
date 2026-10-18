'use client';

import React from 'react';
import { Project } from '@/types/database';
import { Modal } from '@/components/ui/Modal';
import { Badge } from '@/components/ui/Badge';
import { ImageCarousel } from './ImageCarousel';
import { Calendar, Tag, ExternalLink } from 'lucide-react';

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  if (!project) return null;

  // Determine if website project link should be shown:
  // Must be enabled, URL must exist, and category should be web or software development
  const showProjectUrl =
    project.project_url_enabled &&
    project.project_url &&
    project.project_url.trim().length > 0;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={project.title} maxWidth="4xl">
      <div className="space-y-6">
        {/* Carousel */}
        <ImageCarousel
          images={project.images && project.images.length > 0 ? project.images : [
            {
              id: 'cover',
              project_id: project.id,
              storage_path: project.cover_image_path,
              alt_text: project.title,
              sort_order: 1,
              created_at: new Date().toISOString(),
            }
          ]}
          title={project.title}
        />

        {/* Metadata Badges */}
        <div className="flex flex-wrap items-center gap-2.5 pt-1">
          <Badge variant="violet" size="md">
            <Tag className="w-3.5 h-3.5 mr-1" />
            {project.category}
          </Badge>
          <Badge variant="neutral" size="md">
            <Calendar className="w-3.5 h-3.5 mr-1" />
            Tahun {project.year}
          </Badge>
          {project.is_featured && (
            <Badge variant="mint" size="md">
              Featured Project
            </Badge>
          )}
        </div>

        {/* Technologies List */}
        <div>
          <h4 className="text-xs font-semibold text-[#85869B] dark:text-[#9A99B5] uppercase tracking-wider mb-2">
            Teknologi & Alat
          </h4>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech, i) => (
              <span
                key={i}
                className="inline-flex items-center px-3 py-1 rounded-lg text-xs font-medium bg-[#F0F0FA] text-[#20233A] border border-[#E6E7F0] dark:bg-[#25243A] dark:text-[#F5F3FF] dark:border-[#353449]"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Full Description */}
        <div className="space-y-3 pt-2 border-t border-[#E6E7F0] dark:border-[#353449]">
          <h4 className="text-sm font-bold text-[#20233A] dark:text-[#F5F3FF]">
            Tentang Proyek
          </h4>
          <div className="text-sm leading-relaxed text-[#62647A] dark:text-[#C4C2D8] whitespace-pre-line">
            {project.full_description}
          </div>

          {/* Strict requirement: Optional text link at the very end of description only */}
          {showProjectUrl && (
            <div className="pt-3">
              <a
                href={project.project_url || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#6C5CE7] hover:text-[#5948D6] dark:text-[#A99BFF] dark:hover:text-[#C0B6FF] transition-colors underline underline-offset-4"
              >
                <span>Website project ini</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
}
