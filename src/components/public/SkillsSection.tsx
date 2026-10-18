'use client';

import React, { useState } from 'react';
import { Skill } from '@/types/database';
import {
  Code2,
  FileCode2,
  Terminal,
  FileCode,
  Cpu,
  Layers,
  Atom,
  Server,
  Palette,
  Database,
  ShieldCheck,
  DatabaseZap,
  GitBranch,
  Box,
  TerminalSquare,
  Layout,
  Network,
  Wrench,
} from 'lucide-react';
import { Badge } from '@/components/ui/Badge';

interface SkillsSectionProps {
  skills: Skill[];
  title?: string;
  subtitle?: string;
}

export function SkillsSection({
  skills,
  title = 'Keahlian & Teknologi',
  subtitle = 'Kompetensi Teknis dan Alat Pengembangan',
}: SkillsSectionProps) {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    'all',
    'Programming Languages',
    'Web Development',
    'Database Management',
    'Tools & Platforms',
    'UI/UX Design',
  ];

  const filteredSkills =
    activeCategory === 'all'
      ? skills
      : skills.filter((s) => s.category.toLowerCase() === activeCategory.toLowerCase());

  const getIcon = (iconName?: string | null) => {
    switch (iconName?.toLowerCase()) {
      case 'code2':
        return <Code2 className="w-5 h-5 text-[#5846DE] dark:text-[#A99BFF]" />;
      case 'filecode2':
        return <FileCode2 className="w-5 h-5 text-[#5846DE] dark:text-[#A99BFF]" />;
      case 'terminal':
        return <Terminal className="w-5 h-5 text-[#177A56] dark:text-[#65D6A6]" />;
      case 'filecode':
        return <FileCode className="w-5 h-5 text-[#5846DE] dark:text-[#A99BFF]" />;
      case 'cpu':
        return <Cpu className="w-5 h-5 text-[#7966D9] dark:text-[#B7A7FF]" />;
      case 'layers':
        return <Layers className="w-5 h-5 text-[#5846DE] dark:text-[#A99BFF]" />;
      case 'atom':
        return <Atom className="w-5 h-5 text-[#5846DE] dark:text-[#A99BFF]" />;
      case 'server':
        return <Server className="w-5 h-5 text-[#177A56] dark:text-[#65D6A6]" />;
      case 'palette':
        return <Palette className="w-5 h-5 text-[#5846DE] dark:text-[#A99BFF]" />;
      case 'database':
        return <Database className="w-5 h-5 text-[#5846DE] dark:text-[#A99BFF]" />;
      case 'shieldcheck':
        return <ShieldCheck className="w-5 h-5 text-[#177A56] dark:text-[#65D6A6]" />;
      case 'databasezap':
        return <DatabaseZap className="w-5 h-5 text-[#7966D9] dark:text-[#B7A7FF]" />;
      case 'gitbranch':
        return <GitBranch className="w-5 h-5 text-[#5846DE] dark:text-[#A99BFF]" />;
      case 'box':
        return <Box className="w-5 h-5 text-[#5846DE] dark:text-[#A99BFF]" />;
      case 'terminalsquare':
        return <TerminalSquare className="w-5 h-5 text-[#177A56] dark:text-[#65D6A6]" />;
      case 'layout':
        return <Layout className="w-5 h-5 text-[#5846DE] dark:text-[#A99BFF]" />;
      case 'network':
        return <Network className="w-5 h-5 text-[#5846DE] dark:text-[#A99BFF]" />;
      default:
        return <Wrench className="w-5 h-5 text-[#5846DE] dark:text-[#A99BFF]" />;
    }
  };

  const getProficiencyBadgeVariant = (label?: string | null) => {
    switch (label?.toLowerCase()) {
      case 'advanced':
        return 'violet';
      case 'proficient':
        return 'mint';
      default:
        return 'neutral';
    }
  };

  return (
    <section id="skills" className="py-24 bg-[#F7F8FC] dark:bg-[#1B1C2A] transition-colors border-t border-[#E6E7F0]/60 dark:border-[#353449]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-[#5846DE] dark:text-[#A99BFF]">
            {subtitle}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#181A2A] dark:text-[#F5F3FF]">
            {title}
          </h2>
          <div className="w-16 h-1 rounded-full gradient-aurora mx-auto mt-2" />
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeCategory.toLowerCase() === cat.toLowerCase()
                  ? 'bg-[#6C5CE7] text-white shadow-sm dark:bg-[#A99BFF] dark:text-[#10111B]'
                  : 'bg-white dark:bg-[#10111B] text-[#4F526B] dark:text-[#C4C2D8] border border-[#D4D6E6] dark:border-[#353449] hover:border-[#6C5CE7]'
              }`}
            >
              {cat === 'all' ? 'Semua Keahlian' : cat}
            </button>
          ))}
        </div>

        {/* Skills Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredSkills.map((skill) => (
            <div
              key={skill.id}
              className="p-5 rounded-2xl bg-white dark:bg-[#10111B] border border-[#E6E7F0] dark:border-[#353449] hover:border-[#C9C0FF] dark:hover:border-[#6C5CE7]/50 shadow-xs hover:shadow-md transition-all hover:-translate-y-1 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="p-2.5 rounded-xl bg-[#EAE7FF] dark:bg-[#302B4D] shrink-0">
                    {getIcon(skill.icon_name)}
                  </div>
                  {skill.proficiency_label && (
                    <Badge variant={getProficiencyBadgeVariant(skill.proficiency_label)}>
                      {skill.proficiency_label}
                    </Badge>
                  )}
                </div>

                <h3 className="font-extrabold text-base text-[#181A2A] dark:text-[#F5F3FF]">
                  {skill.name}
                </h3>
                <span className="text-xs font-semibold text-[#5846DE] dark:text-[#A99BFF]">
                  {skill.category}
                </span>

                {skill.description && (
                  <p className="text-xs text-[#4F526B] dark:text-[#C4C2D8] mt-2 leading-relaxed">
                    {skill.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
