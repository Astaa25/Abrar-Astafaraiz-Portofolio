'use client';

import React, { useState, useRef } from 'react';
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
  ChevronLeft,
  ChevronRight,
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
  const cardsScrollRef = useRef<HTMLDivElement>(null);

  const handleScrollCards = (direction: 'left' | 'right') => {
    if (cardsScrollRef.current) {
      const scrollAmount = direction === 'left' ? -360 : 360;
      cardsScrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
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

        {/* Category Filter Pills (2 Rows Layout with Horizontal Scrolling) */}
        <div className="relative mb-10 max-w-5xl mx-auto px-1">
          <div className="overflow-x-auto no-scrollbar scroll-smooth py-1">
            <div className="grid grid-rows-2 grid-flow-col gap-2.5 auto-cols-max justify-start sm:justify-center mx-auto w-max max-w-full">
              {categories.map((cat) => {
                const isActive = activeCategory.toLowerCase() === cat.toLowerCase();
                return (
                  <button
                    key={cat}
                    suppressHydrationWarning
                    onClick={() => setActiveCategory(cat)}
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
          </div>
        </div>

        {/* Skills Cards (2 Rows Horizontal Scroll with Left/Right Navigation) */}
        <div className="relative group/carousel">
          {/* Controls Bar */}
          <div className="flex items-center justify-between mb-4 px-1">
            <div className="text-xs font-semibold text-[#706981] dark:text-[#A096B5]">
              Menampilkan <span className="text-[#5846DE] dark:text-[#A99BFF] font-bold">{filteredSkills.length}</span> keahlian
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleScrollCards('left')}
                className="p-2 rounded-xl bg-white dark:bg-[#10111B] border border-[#D4D6E6] dark:border-[#353449] text-[#4F526B] dark:text-[#C4C2D8] hover:text-[#5846DE] dark:hover:text-[#A99BFF] hover:border-[#5846DE] transition-all cursor-pointer shadow-xs hover:shadow-md"
                aria-label="Geser ke kiri"
                title="Geser ke kiri"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleScrollCards('right')}
                className="p-2 rounded-xl bg-white dark:bg-[#10111B] border border-[#D4D6E6] dark:border-[#353449] text-[#4F526B] dark:text-[#C4C2D8] hover:text-[#5846DE] dark:hover:text-[#A99BFF] hover:border-[#5846DE] transition-all cursor-pointer shadow-xs hover:shadow-md"
                aria-label="Geser ke kanan"
                title="Geser ke kanan"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Cards Container: 2 Rows, Horizontal Scroll */}
          <div
            ref={cardsScrollRef}
            className="grid grid-rows-2 grid-flow-col auto-cols-[280px] sm:auto-cols-[310px] gap-4 sm:gap-5 overflow-x-auto pb-4 pt-1 px-1 scroll-smooth scrollbar-thin"
          >
            {filteredSkills.map((skill) => (
              <div
                key={skill.id}
                className="h-[145px] p-4.5 rounded-2xl bg-white dark:bg-[#10111B] border border-[#E6E7F0] dark:border-[#353449] hover:border-[#C9C0FF] dark:hover:border-[#6C5CE7]/50 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group select-none"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div className="p-2 rounded-xl bg-[#EAE7FF] dark:bg-[#302B4D] shrink-0 group-hover:scale-105 transition-transform">
                      {getIcon(skill.icon_name)}
                    </div>
                    {skill.proficiency_label && (
                      <Badge variant={getProficiencyBadgeVariant(skill.proficiency_label)}>
                        {skill.proficiency_label}
                      </Badge>
                    )}
                  </div>

                  <h3 className="font-extrabold text-sm sm:text-base text-[#181A2A] dark:text-[#F5F3FF] truncate">
                    {skill.name}
                  </h3>
                  <span className="text-[11px] font-semibold text-[#5846DE] dark:text-[#A99BFF] block truncate">
                    {skill.category}
                  </span>
                </div>

                {skill.description && (
                  <p className="text-xs text-[#4F526B] dark:text-[#C4C2D8] line-clamp-1 leading-relaxed mt-1">
                    {skill.description}
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* Swipe / Scroll Hint */}
          <div className="mt-3 flex items-center justify-end text-[11px] text-[#706981] dark:text-[#A096B5] px-1">
            <span className="flex items-center gap-1.5">
              <span>Geser ke samping untuk melihat keahlian lainnya</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#5846DE] dark:text-[#A99BFF]" />
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

