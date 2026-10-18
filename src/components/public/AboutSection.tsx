import React from 'react';
import { Profile, AboutHighlight } from '@/types/database';
import {
  GraduationCap,
  Terminal,
  Database,
  Sparkles,
  CheckCircle2,
  Cpu,
  Network,
  Layout,
  Server,
  Code2,
  Wrench,
  BookOpen,
} from 'lucide-react';

interface AboutSectionProps {
  profile: Profile;
  title?: string;
  subtitle?: string;
  highlights?: AboutHighlight[];
}

export function AboutSection({
  profile,
  title = 'Tentang Saya',
  subtitle = 'Latar Belakang & Profil Singkat',
  highlights,
}: AboutSectionProps) {
  const getHighlightIcon = (iconName?: string) => {
    switch (iconName?.toLowerCase()) {
      case 'graduationcap':
        return <GraduationCap className="w-5 h-5 text-[#5846DE] dark:text-[#A99BFF]" />;
      case 'terminal':
        return <Terminal className="w-5 h-5 text-[#177A56] dark:text-[#65D6A6]" />;
      case 'database':
        return <Database className="w-5 h-5 text-[#5846DE] dark:text-[#A99BFF]" />;
      case 'sparkles':
        return <Sparkles className="w-5 h-5 text-[#177A56] dark:text-[#65D6A6]" />;
      case 'cpu':
        return <Cpu className="w-5 h-5 text-[#5846DE] dark:text-[#A99BFF]" />;
      case 'network':
        return <Network className="w-5 h-5 text-[#177A56] dark:text-[#65D6A6]" />;
      case 'layout':
        return <Layout className="w-5 h-5 text-[#5846DE] dark:text-[#A99BFF]" />;
      case 'server':
        return <Server className="w-5 h-5 text-[#177A56] dark:text-[#65D6A6]" />;
      case 'code2':
        return <Code2 className="w-5 h-5 text-[#5846DE] dark:text-[#A99BFF]" />;
      case 'bookopen':
        return <BookOpen className="w-5 h-5 text-[#5846DE] dark:text-[#A99BFF]" />;
      default:
        return <Wrench className="w-5 h-5 text-[#5846DE] dark:text-[#A99BFF]" />;
    }
  };

  const activeHighlights =
    highlights && highlights.length > 0
      ? highlights
      : [
          {
            id: 'ah-1',
            icon_name: 'GraduationCap',
            title: 'Pendidikan Akademik',
            description:
              'Mahasiswa Teknik Informatika dengan pemahaman teori komputasi, algoritma, dan rekayasa perangkat lunak.',
          },
          {
            id: 'ah-2',
            icon_name: 'Terminal',
            title: 'Software & Web Engineering',
            description:
              'Berpengalaman membangun aplikasi full-stack modern dengan TypeScript, React, Next.js, dan RESTful API.',
          },
          {
            id: 'ah-3',
            icon_name: 'Database',
            title: 'Manajemen Data & Keamanan',
            description:
              'Perancangan skema relasional, optimasi query PostgreSQL/MySQL, serta integrasi Supabase Auth & RLS.',
          },
          {
            id: 'ah-4',
            icon_name: 'Sparkles',
            title: 'Desain & Pengalaman Pengguna',
            description:
              'Mengutamakan kejelasan hierarki visual, aksesibilitas, responsivitas, dan interaksi yang halus.',
          },
        ];

  return (
    <section id="about" className="py-24 bg-white dark:bg-[#10111B] transition-colors border-t border-[#E6E7F0]/60 dark:border-[#353449]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-[#5846DE] dark:text-[#A99BFF]">
            {subtitle}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#181A2A] dark:text-[#F5F3FF]">
            {title}
          </h2>
          <div className="w-16 h-1 rounded-full gradient-aurora mx-auto mt-2" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Main Story Text */}
          <div className="lg:col-span-7 space-y-6 text-[#33364D] dark:text-[#C4C2D8] leading-relaxed text-base sm:text-lg">
            <p className="font-semibold text-[#181A2A] dark:text-[#F5F3FF]">
              {profile.about_content}
            </p>

            <p>
              Dalam setiap proyek yang saya kembangkan, saya berupaya memastikan kode tidak hanya
              berfungsi, tetapi juga teruji, mudah dirawat, dan memiliki arsitektur yang kokoh. Mulai
              dari perancangan basis data hingga polesan detail interaksi antarmuka pengguna.
            </p>

            <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm font-semibold text-[#181A2A] dark:text-[#F5F3FF]">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#177A56] dark:text-[#65D6A6]" />
                <span>Clean Code & Architecture</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#177A56] dark:text-[#65D6A6]" />
                <span>Responsive & Mobile First</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#177A56] dark:text-[#65D6A6]" />
                <span>Database Normalization</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#177A56] dark:text-[#65D6A6]" />
                <span>Security & Performance First</span>
              </div>
            </div>
          </div>

          {/* Feature Highlights Grid */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
            {activeHighlights.map((item) => (
              <div
                key={item.id}
                className="p-5 rounded-2xl bg-[#F7F8FC] dark:bg-[#1B1C2A] border border-[#E6E7F0] dark:border-[#353449] hover:border-[#C9C0FF] dark:hover:border-[#6C5CE7]/40 transition-all hover:shadow-md"
              >
                <div className="flex items-start gap-4">
                  <div className="p-2.5 rounded-xl bg-[#EAE7FF] dark:bg-[#302B4D] shrink-0">
                    {getHighlightIcon(item.icon_name)}
                  </div>
                  <div>
                    <h3 className="font-bold text-sm sm:text-base text-[#181A2A] dark:text-[#F5F3FF]">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#4F526B] dark:text-[#C4C2D8] mt-1 leading-normal">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
