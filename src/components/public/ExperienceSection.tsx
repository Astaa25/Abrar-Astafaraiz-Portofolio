'use client';

import React, { useState, useMemo } from 'react';
import { Experience } from '@/types/database';
import {
  Briefcase,
  Calendar,
  CheckCircle2,
  Clock,
  ArrowUpDown,
  Building2,
  Sparkles,
  TrendingUp,
  Layers,
  ChevronRight,
  Filter,
} from 'lucide-react';
import { Badge } from '@/components/ui/Badge';

interface ExperienceSectionProps {
  experiences: Experience[];
  title?: string;
  subtitle?: string;
}

const MONTH_MAP: Record<string, number> = {
  januari: 1, jan: 1, january: 1,
  februari: 2, feb: 2, february: 2,
  maret: 3, mar: 3, march: 3,
  april: 4, apr: 4,
  mei: 5, may: 5,
  juni: 6, jun: 6, june: 6,
  juli: 7, jul: 7, july: 7,
  agustus: 8, agu: 8, aug: 8, august: 8,
  september: 9, sep: 9,
  oktober: 10, okt: 10, oct: 10, october: 10,
  november: 11, nov: 11,
  desember: 12, des: 12, dec: 12, december: 12,
};

const MONTH_NAMES = [
  'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
  'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
];

interface ParsedDate {
  month: number;
  year: number;
  sortVal: number;
  monthName: string;
  raw: string;
}

function parseExperienceDate(dateStr?: string | null): ParsedDate {
  if (!dateStr || dateStr.toLowerCase() === 'sekarang') {
    const curYear = new Date().getFullYear();
    const curMonth = new Date().getMonth() + 1;
    return {
      month: curMonth,
      year: curYear,
      sortVal: curYear * 12 + curMonth,
      monthName: MONTH_NAMES[curMonth - 1],
      raw: dateStr || 'Sekarang',
    };
  }

  const parts = dateStr.trim().split(/\s+/);
  let month = 1;
  let year = new Date().getFullYear();

  for (const part of parts) {
    const clean = part.toLowerCase().replace(/[^a-z0-9]/g, '');
    if (MONTH_MAP[clean]) {
      month = MONTH_MAP[clean];
    } else if (/^\d{4}$/.test(clean)) {
      year = parseInt(clean, 10);
    }
  }

  return {
    month,
    year,
    sortVal: year * 12 + month,
    monthName: MONTH_NAMES[month - 1] || 'Januari',
    raw: dateStr,
  };
}

function getDurationText(startDate?: string, endDate?: string | null, isCurrent?: boolean) {
  const start = parseExperienceDate(startDate);
  if (!start.sortVal) return null;

  if (isCurrent) {
    const now = new Date();
    const currentSort = now.getFullYear() * 12 + (now.getMonth() + 1);
    const months = Math.max(1, currentSort - start.sortVal + 1);
    if (months >= 12) {
      const yrs = Math.floor(months / 12);
      const rem = months % 12;
      return rem > 0 ? `${yrs} Thn ${rem} Bln (Aktif)` : `${yrs} Tahun (Aktif)`;
    }
    return `${months} Bulan (Aktif)`;
  }

  if (endDate) {
    const end = parseExperienceDate(endDate);
    if (end.sortVal && end.sortVal >= start.sortVal) {
      const months = Math.max(1, end.sortVal - start.sortVal + 1);
      if (months >= 12) {
        const yrs = Math.floor(months / 12);
        const rem = months % 12;
        return rem > 0 ? `${yrs} Thn ${rem} Bln` : `${yrs} Tahun`;
      }
      return `${months} Bulan`;
    }
  }

  return null;
}

function getRoleTag(position: string) {
  const posLower = position.toLowerCase();
  if (posLower.includes('sekretaris umum') || posLower.includes('ketua') || posLower.includes('wakil ketua')) {
    return { label: 'BPH Inti', variant: 'violet' as const };
  }
  if (posLower.includes('sekretaris') || posLower.includes('koordinator') || posLower.includes('kepala')) {
    return { label: 'Pengurus Divisi', variant: 'lavender' as const };
  }
  if (posLower.includes('internship') || posLower.includes('magang')) {
    return { label: 'Program Magang', variant: 'warning' as const };
  }
  return { label: 'Anggota Aktif', variant: 'mint' as const };
}

export function ExperienceSection({
  experiences,
  title = 'Pengalaman & Organisasi',
  subtitle = 'Riwayat Kerja & Organisasi',
}: ExperienceSectionProps) {
  const [filterType, setFilterType] = useState<'all' | 'current' | string>('all');
  const [sortDirection, setSortDirection] = useState<'desc' | 'asc'>('desc');

  // Compute enriched list with parsed dates
  const enrichedExperiences = useMemo(() => {
    return experiences.map((exp) => {
      const startParsed = parseExperienceDate(exp.start_date);
      const endParsed = exp.is_current ? null : parseExperienceDate(exp.end_date);
      const duration = getDurationText(exp.start_date, exp.end_date, exp.is_current);
      const roleTag = getRoleTag(exp.position);

      return {
        ...exp,
        startParsed,
        endParsed,
        duration,
        roleTag,
      };
    });
  }, [experiences]);

  // Extract unique available years for quick filter pills
  const availableYears = useMemo(() => {
    const years = new Set<string>();
    enrichedExperiences.forEach((e) => {
      if (e.startParsed.year) years.add(e.startParsed.year.toString());
      if (e.endParsed?.year) years.add(e.endParsed.year.toString());
    });
    return Array.from(years).sort((a, b) => Number(b) - Number(a));
  }, [enrichedExperiences]);

  // Filter and sort experiences per month
  const processedExperiences = useMemo(() => {
    let result = [...enrichedExperiences];

    if (filterType === 'current') {
      result = result.filter((e) => e.is_current);
    } else if (filterType !== 'all') {
      const yr = Number(filterType);
      result = result.filter(
        (e) => e.startParsed.year === yr || (e.endParsed && e.endParsed.year === yr)
      );
    }

    // Sort strictly by Month & Year
    result.sort((a, b) => {
      if (sortDirection === 'desc') {
        return b.startParsed.sortVal - a.startParsed.sortVal;
      }
      return a.startParsed.sortVal - b.startParsed.sortVal;
    });

    return result;
  }, [enrichedExperiences, filterType, sortDirection]);

  // Overview statistics
  const stats = useMemo(() => {
    const uniqueOrgs = new Set(experiences.map((e) => e.organization.trim())).size;
    const activeCount = experiences.filter((e) => e.is_current).length;
    return {
      totalExperiences: experiences.length,
      uniqueOrgs,
      activeCount,
    };
  }, [experiences]);

  if (experiences.length === 0) return null;

  return (
    <section
      id="experience"
      className="py-24 bg-[#FBFBFE] dark:bg-[#10111B] transition-colors border-t border-[#E6E7F0]/80 dark:border-[#353449]/70 relative overflow-hidden"
    >
      {/* Background Decorative Blur Orbs */}
      <div className="absolute top-1/4 -left-48 w-96 h-96 rounded-full bg-[#7966D9]/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-48 w-96 h-96 rounded-full bg-[#177A56]/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#EDE8FF] dark:bg-[#302B4D] text-[#6C5CE7] dark:text-[#B7A7FF] border border-[#C9C0FF]/50 dark:border-[#6C5CE7]/30 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{subtitle}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#181A2A] dark:text-[#F5F3FF] tracking-tight">
            {title}
          </h2>

          <div className="w-20 h-1.5 rounded-full gradient-aurora mx-auto mt-2" />

          <p className="text-sm sm:text-base text-[#4F526B] dark:text-[#A096B5] max-w-2xl mx-auto pt-1">
            Rekam jejak kontribusi, kepemimpinan, dan perjalanan organisasi yang disusun teratur
            secara kronologis per bulan.
          </p>
        </div>

        {/* Quick Stats Highlights */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 max-w-3xl mx-auto mb-10">
          <div className="p-4 rounded-2xl bg-white dark:bg-[#181928] border border-[#E6E7F0] dark:border-[#2C2B3F] shadow-xs flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#EAE7FF] dark:bg-[#302B4D] flex items-center justify-center text-[#5846DE] dark:text-[#A99BFF] shrink-0">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-[#706981] dark:text-[#A096B5] font-medium">Organisasi</p>
              <p className="text-lg font-black text-[#181A2A] dark:text-[#F5F3FF]">
                {stats.uniqueOrgs} <span className="text-xs font-semibold text-[#706981]">Lembaga</span>
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-[#181928] border border-[#E6E7F0] dark:border-[#2C2B3F] shadow-xs flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#DDF7F0] dark:bg-[#1F3D36] flex items-center justify-center text-[#177A56] dark:text-[#65D6A6] shrink-0">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-[#706981] dark:text-[#A096B5] font-medium">Posisi Aktif</p>
              <p className="text-lg font-black text-[#177A56] dark:text-[#65D6A6]">
                {stats.activeCount} <span className="text-xs font-semibold text-[#706981]">Berjalan</span>
              </p>
            </div>
          </div>

          <div className="col-span-2 sm:col-span-1 p-4 rounded-2xl bg-white dark:bg-[#181928] border border-[#E6E7F0] dark:border-[#2C2B3F] shadow-xs flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#FFF3E8] dark:bg-[#3E2B1F] flex items-center justify-center text-[#D97706] dark:text-[#FBBF24] shrink-0">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-[#706981] dark:text-[#A096B5] font-medium">Total Amanah</p>
              <p className="text-lg font-black text-[#181A2A] dark:text-[#F5F3FF]">
                {stats.totalExperiences} <span className="text-xs font-semibold text-[#706981]">Peran</span>
              </p>
            </div>
          </div>
        </div>

        {/* Filter Pills & Sort Direction Toggle */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 max-w-4xl mx-auto mb-12 p-3 sm:p-4 rounded-2xl bg-white dark:bg-[#181928] border border-[#E6E7F0] dark:border-[#2C2B3F] shadow-xs">
          {/* Period Filter Buttons */}
          <div className="flex items-center gap-1.5 flex-wrap justify-center sm:justify-start w-full sm:w-auto">
            <span className="text-xs font-bold text-[#706981] dark:text-[#A096B5] flex items-center gap-1 mr-1">
              <Filter className="w-3.5 h-3.5" />
              <span>Periode:</span>
            </span>

            <button
              type="button"
              onClick={() => setFilterType('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                filterType === 'all'
                  ? 'bg-[#5846DE] text-white shadow-xs'
                  : 'bg-[#F2EFFB] dark:bg-[#252236] text-[#4F526B] dark:text-[#C4C2D8] hover:bg-[#E6E0F1]'
              }`}
            >
              Semua ({experiences.length})
            </button>

            <button
              type="button"
              onClick={() => setFilterType('current')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                filterType === 'current'
                  ? 'bg-[#177A56] text-white shadow-xs'
                  : 'bg-[#E7F8F3] dark:bg-[#19332D] text-[#177A56] dark:text-[#65D6A6] hover:bg-[#D4F3EB]'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Posisi Aktif ({stats.activeCount})
            </button>

            {availableYears.map((yr) => (
              <button
                key={yr}
                type="button"
                onClick={() => setFilterType(yr)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  filterType === yr
                    ? 'bg-[#5846DE] text-white shadow-xs'
                    : 'bg-[#F2EFFB] dark:bg-[#252236] text-[#4F526B] dark:text-[#C4C2D8] hover:bg-[#E6E0F1]'
                }`}
              >
                {yr}
              </button>
            ))}
          </div>

          {/* Sort Direction Toggle */}
          <button
            type="button"
            onClick={() => setSortDirection((prev) => (prev === 'desc' ? 'asc' : 'desc'))}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold bg-[#EAE7FF] text-[#5846DE] dark:bg-[#302B4D] dark:text-[#B7A7FF] hover:bg-[#DCD5FF] transition-all shrink-0"
            title="Ubah urutan bulan kronologis"
          >
            <ArrowUpDown className="w-3.5 h-3.5" />
            <span>
              {sortDirection === 'desc' ? 'Bulan Terbaru (Desc)' : 'Perjalanan Awal (Asc)'}
            </span>
          </button>
        </div>

        {/* Chronological Monthly Timeline Stream */}
        <div className="relative max-w-4xl mx-auto">
          {/* Glowing Vertical Line Spine */}
          <div
            className="absolute left-4 sm:left-8 top-4 bottom-8 w-0.5 bg-gradient-to-b from-[#5846DE] via-[#7966D9] to-[#177A56] dark:from-[#A99BFF] dark:via-[#7966D9] dark:to-[#65D6A6] opacity-60"
            aria-hidden="true"
          />

          <div className="space-y-6 sm:space-y-8">
            {processedExperiences.map((exp, index) => {
              const isLatestMonth = index === 0;

              return (
                <div key={exp.id} className="relative flex items-start gap-4 sm:gap-8 group">
                  {/* Timeline Milestone Beacon (Month Node) */}
                  <div className="relative z-10 flex flex-col items-center shrink-0">
                    <div
                      className={`w-8 h-8 sm:w-10 sm:h-10 rounded-2xl flex items-center justify-center font-black text-xs transition-all duration-300 shadow-md ${
                        exp.is_current
                          ? 'bg-gradient-to-tr from-[#177A56] to-[#25B884] text-white ring-4 ring-[#177A56]/20 shadow-emerald-500/20'
                          : 'bg-white dark:bg-[#1F1E2E] border-2 border-[#5846DE] dark:border-[#A99BFF] text-[#5846DE] dark:text-[#A99BFF] group-hover:scale-110'
                      }`}
                    >
                      {exp.is_current ? (
                        <span className="w-2.5 h-2.5 rounded-full bg-white animate-pulse" />
                      ) : (
                        <Briefcase className="w-4 h-4" />
                      )}
                    </div>

                    {/* Month abbreviation below beacon node */}
                    <span className="text-[10px] font-extrabold text-[#706981] dark:text-[#A096B5] uppercase tracking-wider mt-1.5 hidden sm:block">
                      {exp.startParsed.monthName.slice(0, 3)}
                    </span>
                  </div>

                  {/* Main Experience Card */}
                  <div className="flex-1 min-w-0">
                    <div className="rounded-3xl bg-white dark:bg-[#181928] border border-[#E6E0F1] dark:border-[#2C2B3F] p-5 sm:p-7 shadow-xs hover:shadow-xl hover:border-[#7966D9]/50 dark:hover:border-[#A99BFF]/40 transition-all duration-300 group-hover:translate-x-1 relative overflow-hidden">
                      {/* Top Ribbon / Month Milestone Tag */}
                      <div className="flex flex-wrap items-center justify-between gap-2.5 mb-3">
                        {/* Month & Year Banner */}
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-xl bg-gradient-to-r from-[#EDE8FF] to-[#F5F2FF] dark:from-[#2B2544] dark:to-[#1D1B2C] border border-[#D8CFFF] dark:border-[#423863] text-[#5846DE] dark:text-[#B7A7FF] font-black text-xs shadow-2xs">
                          <Calendar className="w-3.5 h-3.5 text-[#5846DE] dark:text-[#B7A7FF]" />
                          <span>
                            {exp.start_date}
                            {' — '}
                            {exp.is_current ? 'Sekarang' : exp.end_date || 'Selesai'}
                          </span>
                        </div>

                        {/* Status & Duration Badges */}
                        <div className="flex items-center gap-1.5 flex-wrap">
                          {exp.duration && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg text-[11px] font-bold bg-[#F4F4F8] dark:bg-[#252438] text-[#4F526B] dark:text-[#C4C2D8]">
                              <Clock className="w-3 h-3 text-[#706981]" />
                              <span>{exp.duration}</span>
                            </span>
                          )}

                          {exp.is_current ? (
                            <Badge variant="mint" size="sm" className="font-bold">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                              Posisi Aktif
                            </Badge>
                          ) : (
                            <Badge variant="neutral" size="sm" className="font-medium text-[11px]">
                              Selesai
                            </Badge>
                          )}

                          <Badge variant={exp.roleTag.variant} size="sm" className="font-bold">
                            {exp.roleTag.label}
                          </Badge>
                        </div>
                      </div>

                      {/* Position Title & Organization */}
                      <div className="space-y-1 mb-3">
                        <h3 className="text-lg sm:text-xl font-extrabold text-[#181A2A] dark:text-[#F5F3FF] tracking-tight group-hover:text-[#5846DE] dark:group-hover:text-[#A99BFF] transition-colors">
                          {exp.position}
                        </h3>

                        <div className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#5846DE] dark:text-[#A99BFF]">
                          <Building2 className="w-3.5 h-3.5 shrink-0" />
                          <span>{exp.organization}</span>
                        </div>
                      </div>

                      {/* Description */}
                      {exp.description && (
                        <p className="text-xs sm:text-sm text-[#4F526B] dark:text-[#C4C2D8] leading-relaxed whitespace-pre-line mb-4 font-normal">
                          {exp.description}
                        </p>
                      )}

                      {/* Responsibilities / Key Contributions */}
                      {exp.responsibilities && exp.responsibilities.length > 0 && (
                        <div className="pt-3.5 border-t border-[#E6E0F1] dark:border-[#2C2B3F] space-y-2">
                          <span className="text-[11px] font-extrabold text-[#706981] dark:text-[#A096B5] uppercase tracking-wider flex items-center gap-1.5">
                            <ChevronRight className="w-3.5 h-3.5 text-[#5846DE] dark:text-[#A99BFF]" />
                            Fokus Kontribusi & Peran:
                          </span>
                          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#33364D] dark:text-[#C4C2D8]">
                            {exp.responsibilities.map((resp, i) => (
                              <li key={i} className="flex items-start gap-2 bg-[#F9F8FC] dark:bg-[#131422] p-2 rounded-xl border border-[#ECEAF4] dark:border-[#27263A]">
                                <CheckCircle2 className="w-3.5 h-3.5 text-[#177A56] dark:text-[#65D6A6] shrink-0 mt-0.5" />
                                <span className="leading-snug">{resp}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Subtle hover background sheen */}
                      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#7966D9]/10 to-transparent rounded-bl-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
