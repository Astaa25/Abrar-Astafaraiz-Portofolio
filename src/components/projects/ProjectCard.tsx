'use client';

import React, { useState } from 'react';
import { Project } from '@/types/database';
import { Badge } from '@/components/ui/Badge';
import { Calendar, ArrowUpRight, Image as ImageIcon } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
  onOpenDetails: (project: Project) => void;
}

export function ProjectCard({ project, onOpenDetails }: ProjectCardProps) {
  const [imgError, setImgError] = useState(false);

  return (
    <article
      onClick={() => onOpenDetails(project)}
      className="group relative flex flex-col rounded-2xl bg-white border border-[#D4D6E6] p-4 sm:p-5 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-[#6C5CE7] dark:bg-[#1B1C2A] dark:border-[#353449] dark:hover:border-[#A99BFF]/50 cursor-pointer overflow-hidden"
    >
      {/* Cover Image */}
      <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-[#F0F0FA] dark:bg-[#10111B] mb-4">
        {imgError ? (
          <div className="flex flex-col items-center justify-center w-full h-full text-[#85869B] dark:text-[#9A99B5]">
            <ImageIcon className="w-10 h-10 mb-1 opacity-60" />
            <span className="text-xs">{project.title}</span>
          </div>
        ) : (
          <img
            src={project.cover_image_path}
            alt={project.title}
            onError={() => setImgError(true)}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        )}

        {/* Featured Tag */}
        {project.is_featured && (
          <div className="absolute top-2.5 left-2.5">
            <span className="px-2.5 py-1 text-[11px] font-bold rounded-full bg-[#177A56] text-white shadow-xs">
              Featured
            </span>
          </div>
        )}

        {/* Year Pill */}
        <div className="absolute bottom-2.5 right-2.5">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold rounded-full bg-black/60 backdrop-blur-xs text-white">
            <Calendar className="w-3 h-3" />
            {project.year}
          </span>
        </div>
      </div>

      {/* Category */}
      <div className="mb-2">
        <span className="text-xs font-bold text-[#5846DE] dark:text-[#A99BFF] tracking-wide uppercase">
          {project.category}
        </span>
      </div>

      {/* Title */}
      <h3 className="text-lg font-extrabold text-[#181A2A] dark:text-[#F5F3FF] mb-2 line-clamp-1 group-hover:text-[#5846DE] dark:group-hover:text-[#A99BFF] transition-colors">
        {project.title}
      </h3>

      {/* Short Description */}
      <p className="text-sm text-[#33364D] dark:text-[#C4C2D8] line-clamp-2 leading-relaxed mb-4 flex-1">
        {project.short_description}
      </p>

      {/* Technologies Badges */}
      <div className="flex flex-wrap gap-1.5 mb-5">
        {project.technologies.slice(0, 4).map((tech, i) => (
          <Badge key={i} variant="neutral" size="sm">
            {tech}
          </Badge>
        ))}
        {project.technologies.length > 4 && (
          <Badge variant="neutral" size="sm">
            +{project.technologies.length - 4}
          </Badge>
        )}
      </div>

      {/* Footer / CTA Action */}
      <div className="pt-3 border-t border-[#E6E7F0] dark:border-[#353449] flex items-center justify-between">
        <span className="text-xs font-bold text-[#5846DE] dark:text-[#A99BFF] group-hover:underline">
          Lihat Detail Proyek
        </span>
        <div className="w-7 h-7 rounded-full bg-[#F0F0FA] group-hover:bg-[#EAE7FF] dark:bg-[#25243A] dark:group-hover:bg-[#302B4D] flex items-center justify-center transition-colors">
          <ArrowUpRight className="w-4 h-4 text-[#5846DE] dark:text-[#A99BFF] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </div>
      </div>
    </article>
  );
}
