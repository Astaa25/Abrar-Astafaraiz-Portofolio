'use client';

import React, { useState, useEffect } from 'react';
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
  Router,
  Activity,
  ShieldAlert,
  Image as ImageIcon,
  PenTool,
  Video,
  Film,
  Music,
  Coffee,
  Zap,
  HardDrive,
  Sparkles,
  ChevronUp,
  ArrowRight,
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
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  // Restore active category on client mount
  useEffect(() => {
    try {
      const savedCategory = sessionStorage.getItem('abrar_skills_active_category');
      if (savedCategory) {
        setActiveCategory(savedCategory);
      }
    } catch {}
  }, []);

  const handleSelectCategory = (cat: string) => {
    setActiveCategory(cat);
    setIsExpanded(false);
    try {
      sessionStorage.setItem('abrar_skills_active_category', cat);
    } catch {}
  };

  // Standard ordered technical categories per original PRD
  const preferredOrder = [
    'Programming Languages',
    'Web Development',
    'Database Management',
    'Network & Security',
    'UI/UX Design',
    'Tools & Platforms',
  ];

  const presentCategories = Array.from(new Set((skills || []).map((s) => s.category)));

  presentCategories.sort((a, b) => {
    const idxA = preferredOrder.indexOf(a);
    const idxB = preferredOrder.indexOf(b);
    if (idxA !== -1 && idxB !== -1) return idxA - idxB;
    if (idxA !== -1) return -1;
    if (idxB !== -1) return 1;
    return a.localeCompare(b);
  });

  const categories = ['all', ...presentCategories];

  const filteredSkills =
    activeCategory === 'all'
      ? (skills || [])
      : (skills || []).filter((s) => s.category.toLowerCase() === activeCategory.toLowerCase());

  // If not expanded and there are more than 8 skills:
  // Show 7 skills, and 1 "Lihat Selengkapnya / +X Lainnya" card (total 8 cards = 2 full rows in 4-col grid)
  const shouldLimit = !isExpanded && filteredSkills.length > 8;
  const visibleSkills = shouldLimit ? filteredSkills.slice(0, 7) : filteredSkills;
  const remainingCount = filteredSkills.length - 7;

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
      case 'router':
        return <Router className="w-5 h-5 text-[#5846DE] dark:text-[#A99BFF]" />;
      case 'activity':
        return <Activity className="w-5 h-5 text-[#177A56] dark:text-[#65D6A6]" />;
      case 'shieldalert':
        return <ShieldAlert className="w-5 h-5 text-[#5846DE] dark:text-[#A99BFF]" />;
      case 'image':
        return <ImageIcon className="w-5 h-5 text-[#7966D9] dark:text-[#B7A7FF]" />;
      case 'pentool':
        return <PenTool className="w-5 h-5 text-[#5846DE] dark:text-[#A99BFF]" />;
      case 'video':
        return <Video className="w-5 h-5 text-[#177A56] dark:text-[#65D6A6]" />;
      case 'film':
        return <Film className="w-5 h-5 text-[#5846DE] dark:text-[#A99BFF]" />;
      case 'music':
        return <Music className="w-5 h-5 text-[#7966D9] dark:text-[#B7A7FF]" />;
      case 'coffee':
        return <Coffee className="w-5 h-5 text-[#5846DE] dark:text-[#A99BFF]" />;
      case 'zap':
        return <Zap className="w-5 h-5 text-[#177A56] dark:text-[#65D6A6]" />;
      case 'harddrive':
        return <HardDrive className="w-5 h-5 text-[#5846DE] dark:text-[#A99BFF]" />;
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
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-[#5846DE] dark:text-[#A99BFF]">
            {subtitle}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#181A2A] dark:text-[#F5F3FF]">
            {title}
          </h2>
          <div className="w-16 h-1 rounded-full gradient-aurora mx-auto mt-2" />
        </div>

        {/* Category Filter Pills: 4 on top, 3 centered below */}
        <div className="flex flex-col items-center gap-2.5 mb-12 max-w-5xl mx-auto px-1">
          {/* Row 1 (4 kategori teratas, rata tengah) */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5">
            {categories.slice(0, 4).map((cat) => {
              const isActive = activeCategory.toLowerCase() === cat.toLowerCase();
              return (
                <button
                  key={cat}
                  suppressHydrationWarning
                  onClick={() => handleSelectCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap border ${
                    isActive
                      ? 'bg-[#5846DE] text-white border-[#5846DE] shadow-sm dark:bg-[#7966D9] dark:border-[#7966D9] dark:text-white'
                      : 'bg-white dark:bg-[#10111B] text-[#4F526B] dark:text-[#C4C2D8] border-[#D4D6E6] dark:border-[#353449] hover:border-[#5846DE] dark:hover:border-[#7966D9]'
                  }`}
                >
                  {cat === 'all' ? 'Semua Keahlian' : cat}
                </button>
              );
            })}
          </div>

          {/* Row 2 (3 sisa kategori di bawah, rata tengah) */}
          {categories.length > 4 && (
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5">
              {categories.slice(4).map((cat) => {
                const isActive = activeCategory.toLowerCase() === cat.toLowerCase();
                return (
                  <button
                    key={cat}
                    suppressHydrationWarning
                    onClick={() => handleSelectCategory(cat)}
                    className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap border ${
                      isActive
                        ? 'bg-[#5846DE] text-white border-[#5846DE] shadow-sm dark:bg-[#7966D9] dark:border-[#7966D9] dark:text-white'
                        : 'bg-white dark:bg-[#10111B] text-[#4F526B] dark:text-[#C4C2D8] border-[#D4D6E6] dark:border-[#353449] hover:border-[#5846DE] dark:hover:border-[#7966D9]'
                    }`}
                  >
                    {cat === 'all' ? 'Semua Keahlian' : cat}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Info Counter */}
        <div className="flex items-center justify-between mb-6 px-1 text-xs text-[#706981] dark:text-[#A096B5]">
          <span>
            Menampilkan{' '}
            <strong className="text-[#5846DE] dark:text-[#A99BFF]">
              {shouldLimit ? '8' : filteredSkills.length}
            </strong>{' '}
            dari {filteredSkills.length} keahlian
          </span>
          {shouldLimit && (
            <span className="hidden sm:inline text-[#706981] dark:text-[#A096B5]">
              Klik kartu ke-8 untuk membuka seluruh keahlian
            </span>
          )}
        </div>

        {/* Skills Cards Grid (Format Semula: Lega, Luas, Mewah) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {visibleSkills.map((skill) => (
            <div
              key={skill.id}
              className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#10111B] border border-[#E6E7F0] dark:border-[#353449] hover:border-[#C9C0FF] dark:hover:border-[#6C5CE7]/50 shadow-xs hover:shadow-lg transition-all hover:-translate-y-1.5 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="p-3 rounded-xl bg-[#EAE7FF] dark:bg-[#302B4D] shrink-0 text-[#5846DE] dark:text-[#A99BFF] group-hover:scale-105 transition-transform">
                    {getIcon(skill.icon_name)}
                  </div>
                  {skill.proficiency_label && (
                    <Badge variant={getProficiencyBadgeVariant(skill.proficiency_label)}>
                      {skill.proficiency_label}
                    </Badge>
                  )}
                </div>

                <h3 className="font-extrabold text-base sm:text-lg text-[#181A2A] dark:text-[#F5F3FF]">
                  {skill.name}
                </h3>
                <span className="text-xs font-semibold text-[#5846DE] dark:text-[#A99BFF] block mt-0.5">
                  {skill.category}
                </span>

                {skill.description && (
                  <p className="text-xs text-[#4F526B] dark:text-[#C4C2D8] mt-2.5 leading-relaxed">
                    {skill.description}
                  </p>
                )}
              </div>
            </div>
          ))}

          {/* Card ke-8: Kartu Interaktif "Lihat Selengkapnya / +X Lainnya" */}
          {shouldLimit && (
            <div
              onClick={() => setIsExpanded(true)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') setIsExpanded(true);
              }}
              className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-[#EDE8FF]/70 via-[#F7F5FF] to-[#DDF7F0]/40 dark:from-[#352D4A]/60 dark:via-[#1B1C2A] dark:to-[#234A43]/30 border-2 border-dashed border-[#7966D9]/50 hover:border-[#5846DE] dark:border-[#B7A7FF]/50 dark:hover:border-[#A99BFF] hover:shadow-xl hover:-translate-y-1.5 transition-all cursor-pointer flex flex-col justify-between group min-h-[190px]"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="p-3 rounded-xl bg-[#5846DE] text-white dark:bg-[#7966D9] shadow-sm group-hover:scale-110 transition-transform">
                    <Sparkles className="w-5 h-5 animate-pulse" />
                  </div>
                  <Badge variant="violet" className="font-extrabold text-xs">
                    +{remainingCount} Lainnya
                  </Badge>
                </div>

                <h3 className="font-extrabold text-base sm:text-lg text-[#181A2A] dark:text-[#F5F3FF] group-hover:text-[#5846DE] dark:group-hover:text-[#A99BFF] transition-colors">
                  Lihat Selengkapnya
                </h3>
                <span className="text-xs font-semibold text-[#5846DE] dark:text-[#A99BFF] block mt-0.5">
                  Katalog Lengkap Keahlian
                </span>

                <p className="text-xs text-[#4F526B] dark:text-[#C4C2D8] mt-2.5 leading-relaxed">
                  Buka dan jelajahi seluruh {filteredSkills.length} teknologi dan kompetensi teknis yang dikuasai.
                </p>
              </div>

              <div className="pt-4 flex items-center gap-2 text-xs font-bold text-[#5846DE] dark:text-[#A99BFF] group-hover:translate-x-1.5 transition-transform">
                <span>Buka +{remainingCount} Keahlian</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          )}
        </div>

        {/* Tombol Ciutkan saat Sedang Terbuka Penuh */}
        {isExpanded && filteredSkills.length > 8 && (
          <div className="mt-12 text-center">
            <button
              onClick={() => {
                setIsExpanded(false);
                const section = document.getElementById('skills');
                if (section) {
                  section.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-white dark:bg-[#1B1C2A] border border-[#D4D6E6] dark:border-[#353449] text-xs sm:text-sm font-bold text-[#5846DE] dark:text-[#A99BFF] hover:bg-[#F0EDFA] dark:hover:bg-[#2D263D] shadow-xs hover:shadow-md transition-all cursor-pointer"
            >
              <ChevronUp className="w-4 h-4" />
              <span>Tampilkan Lebih Sedikit (Ciutkan ke 8)</span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

