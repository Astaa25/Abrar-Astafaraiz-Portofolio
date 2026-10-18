'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { DataService } from '@/services/data-service';
import { StatsOverview } from '@/types/content';
import { formatDate } from '@/lib/utils/formatting';
import {
  FolderKanban,
  FileCode,
  Award,
  Briefcase,
  Wrench,
  Eye,
  Send,
  Plus,
  Clock,
  ArrowUpRight,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useToast } from '@/components/feedback/ToastContext';

export default function AdminOverviewPage() {
  const [stats, setStats] = useState<StatsOverview | null>(null);
  const [isPublishing, setIsPublishing] = useState(false);
  const { success, error } = useToast();

  const loadStats = () => {
    setStats(DataService.getStatsOverview());
  };

  useEffect(() => {
    loadStats();
  }, []);

  const handlePublish = () => {
    setIsPublishing(true);
    const res = DataService.publishChanges();
    setIsPublishing(false);
    if (res.success) {
      success(`Perubahan dipublikasikan! Versi v${res.versionNumber} aktif.`);
      loadStats();
    } else {
      error(res.error || 'Gagal mempublikasikan');
    }
  };

  if (!stats) return null;

  const statCards = [
    {
      label: 'Proyek Dipublikasikan',
      value: stats.publishedProjects,
      icon: <FolderKanban className="w-5 h-5 text-[#7966D9] dark:text-[#B7A7FF]" />,
      badge: 'Aktif di Web',
      badgeColor: 'bg-[#DDF7EC] text-[#176A4A] dark:bg-[#1D3B32] dark:text-[#8CE3BD]',
      href: '/admin/projects',
    },
    {
      label: 'Proyek Draft',
      value: stats.draftProjects,
      icon: <FileCode className="w-5 h-5 text-[#9A6700] dark:text-[#F4C96B]" />,
      badge: stats.draftProjects > 0 ? 'Perlu Publish' : 'Sinkron',
      badgeColor:
        stats.draftProjects > 0
          ? 'bg-[#FFF0D7] text-[#875A00] dark:bg-[#46351F] dark:text-[#FFD58A]'
          : 'bg-[#F0EDFA] text-[#706981] dark:bg-[#2D263D] dark:text-[#C0B8D2]',
      href: '/admin/projects',
    },
    {
      label: 'Sertifikat & Pencapaian',
      value: stats.activeAchievements,
      icon: <Award className="w-5 h-5 text-[#176A4A] dark:text-[#8CE3BD]" />,
      badge: 'Kredensial',
      badgeColor: 'bg-[#DDF7EC] text-[#176A4A] dark:bg-[#1D3B32] dark:text-[#8CE3BD]',
      href: '/admin/achievements',
    },
    {
      label: 'Pengalaman & Organisasi',
      value: stats.experiencesCount,
      icon: <Briefcase className="w-5 h-5 text-[#7966D9] dark:text-[#B7A7FF]" />,
      badge: 'Timeline',
      badgeColor: 'bg-[#EDE8FF] text-[#7966D9] dark:bg-[#352D4A] dark:text-[#B7A7FF]',
      href: '/admin/experiences',
    },
    {
      label: 'Keahlian & Teknologi',
      value: stats.skillsCount,
      icon: <Wrench className="w-5 h-5 text-[#7966D9] dark:text-[#B7A7FF]" />,
      badge: 'Kompetensi',
      badgeColor: 'bg-[#EDE8FF] text-[#7966D9] dark:bg-[#352D4A] dark:text-[#B7A7FF]',
      href: '/admin/skills',
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Top Banner / Welcome Banner */}
      <div className="rounded-3xl bg-white dark:bg-[#211D2D] border border-[#E6E0F1] dark:border-[#3B334D] p-6 sm:p-8 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EDE8FF] text-[#7966D9] dark:bg-[#352D4A] dark:text-[#B7A7FF] text-xs font-semibold">
            <span>Lavender Studio • Portfolio Admin</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#39324E] dark:text-[#F7F3FF]">
            Selamat Datang, Administrator
          </h2>
          <div className="flex items-center gap-2 text-xs text-[#706981] dark:text-[#A096B5]">
            <Clock className="w-4 h-4 text-[#7966D9] dark:text-[#B7A7FF]" />
            <span>Terakhir dipublikasikan: {formatDate(stats.lastPublishedAt)}</span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/preview"
            target="_blank"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-[#706981] hover:text-[#39324E] border border-[#E6E0F1] hover:bg-[#F0EDFA] dark:text-[#C0B8D2] dark:hover:text-[#F7F3FF] dark:border-[#3B334D] dark:hover:bg-[#2D263D] transition-all"
          >
            <Eye className="w-4 h-4" />
            <span>Pratinjau Draft</span>
          </Link>

          <Button
            variant="admin-primary"
            onClick={handlePublish}
            isLoading={isPublishing}
            leftIcon={<Send className="w-4 h-4" />}
            className="font-bold"
          >
            Publikasikan Perubahan
          </Button>
        </div>
      </div>

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {statCards.map((card, i) => (
          <Link
            key={i}
            href={card.href}
            className="p-5 rounded-2xl bg-white dark:bg-[#211D2D] border border-[#E6E0F1] dark:border-[#3B334D] hover:border-[#D8CFFF] dark:hover:border-[#7966D9]/50 shadow-xs hover:shadow-md transition-all hover:-translate-y-1 flex flex-col justify-between group"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-2.5 rounded-xl bg-[#F0EDFA] dark:bg-[#2D263D]">
                {card.icon}
              </div>
              <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${card.badgeColor}`}>
                {card.badge}
              </span>
            </div>

            <div>
              <span className="text-3xl font-extrabold text-[#39324E] dark:text-[#F7F3FF]">
                {card.value}
              </span>
              <p className="text-xs font-medium text-[#706981] dark:text-[#A096B5] mt-1">
                {card.label}
              </p>
            </div>

            <div className="pt-3 mt-3 border-t border-[#E6E0F1] dark:border-[#3B334D] flex items-center justify-between text-[11px] text-[#7966D9] dark:text-[#B7A7FF] font-semibold">
              <span>Kelola</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </Link>
        ))}
      </div>

      {/* Quick Actions & Recent Activity Log */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Quick Actions Panel */}
        <div className="lg:col-span-4 rounded-3xl bg-white dark:bg-[#211D2D] border border-[#E6E0F1] dark:border-[#3B334D] p-6 shadow-xs space-y-4">
          <h3 className="font-bold text-base text-[#39324E] dark:text-[#F7F3FF]">
            Aksi Cepat
          </h3>
          <p className="text-xs text-[#706981] dark:text-[#A096B5]">
            Jalan pintas untuk menambah dan memperbarui konten portofolio
          </p>

          <div className="space-y-2 pt-2">
            <Link
              href="/admin/projects?action=new"
              className="flex items-center justify-between p-3.5 rounded-xl border border-[#E6E0F1] hover:border-[#7966D9] bg-[#F7F5FF] dark:bg-[#171421] dark:border-[#3B334D] transition-colors group"
            >
              <div className="flex items-center gap-3">
                <Plus className="w-4 h-4 text-[#7966D9] dark:text-[#B7A7FF]" />
                <span className="text-xs font-semibold text-[#39324E] dark:text-[#F7F3FF]">
                  Tambah Proyek Baru
                </span>
              </div>
              <ArrowUpRight className="w-4 h-4 text-[#706981] group-hover:text-[#7966D9]" />
            </Link>

            <Link
              href="/admin/skills?action=new"
              className="flex items-center justify-between p-3.5 rounded-xl border border-[#E6E0F1] hover:border-[#7966D9] bg-[#F7F5FF] dark:bg-[#171421] dark:border-[#3B334D] transition-colors group"
            >
              <div className="flex items-center gap-3">
                <Plus className="w-4 h-4 text-[#7966D9] dark:text-[#B7A7FF]" />
                <span className="text-xs font-semibold text-[#39324E] dark:text-[#F7F3FF]">
                  Tambah Keahlian / Skill
                </span>
              </div>
              <ArrowUpRight className="w-4 h-4 text-[#706981] group-hover:text-[#7966D9]" />
            </Link>

            <Link
              href="/admin/profile"
              className="flex items-center justify-between p-3.5 rounded-xl border border-[#E6E0F1] hover:border-[#7966D9] bg-[#F7F5FF] dark:bg-[#171421] dark:border-[#3B334D] transition-colors group"
            >
              <div className="flex items-center gap-3">
                <Plus className="w-4 h-4 text-[#7966D9] dark:text-[#B7A7FF]" />
                <span className="text-xs font-semibold text-[#39324E] dark:text-[#F7F3FF]">
                  Edit Profil & Hero
                </span>
              </div>
              <ArrowUpRight className="w-4 h-4 text-[#706981] group-hover:text-[#7966D9]" />
            </Link>
          </div>
        </div>

        {/* Activity Logs Panel */}
        <div className="lg:col-span-8 rounded-3xl bg-white dark:bg-[#211D2D] border border-[#E6E0F1] dark:border-[#3B334D] p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-bold text-base text-[#39324E] dark:text-[#F7F3FF]">
                  Aktivitas Administrasi Terbaru
                </h3>
                <p className="text-xs text-[#706981] dark:text-[#A096B5]">
                  Log riwayat perubahan konten dan publikasi
                </p>
              </div>
              <Link
                href="/admin/activity-logs"
                className="text-xs font-semibold text-[#7966D9] hover:underline dark:text-[#B7A7FF]"
              >
                Lihat Semua
              </Link>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-[#E6E0F1] dark:border-[#3B334D] text-[#928AA5] dark:text-[#A096B5]">
                    <th className="pb-3 font-semibold">Tindakan</th>
                    <th className="pb-3 font-semibold">Objek</th>
                    <th className="pb-3 font-semibold">Aktor</th>
                    <th className="pb-3 font-semibold text-right">Waktu</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E6E0F1] dark:divide-[#3B334D]">
                  {stats.recentLogs.slice(0, 5).map((log) => (
                    <tr key={log.id} className="hover:bg-[#F0EDFA]/50 dark:hover:bg-[#2D263D]/50 transition-colors">
                      <td className="py-3 font-semibold text-[#39324E] dark:text-[#F7F3FF]">
                        {log.action}
                      </td>
                      <td className="py-3 text-[#706981] dark:text-[#C0B8D2]">
                        {log.entity_type} {log.entity_id ? `(${log.entity_id})` : ''}
                      </td>
                      <td className="py-3 text-[#706981] dark:text-[#C0B8D2]">
                        {log.actor_id || 'admin'}
                      </td>
                      <td className="py-3 text-right text-[#928AA5] dark:text-[#A096B5]">
                        {formatDate(log.created_at)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
