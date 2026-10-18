import React from 'react';
import { Profile } from '@/types/database';
import { GraduationCap, Terminal, Database, Sparkles, CheckCircle2 } from 'lucide-react';

interface AboutSectionProps {
  profile: Profile;
  title?: string;
  subtitle?: string;
}

export function AboutSection({
  profile,
  title = 'Tentang Saya',
  subtitle = 'Mengenal Latar Belakang & Fokus Profesional',
}: AboutSectionProps) {
  const highlights = [
    {
      icon: <GraduationCap className="w-5 h-5 text-[#6C5CE7] dark:text-[#A99BFF]" />,
      title: 'Pendidikan Akademik',
      desc: 'Mahasiswa Teknik Informatika dengan pemahaman teori komputasi, algoritma, dan rekayasa perangkat lunak.',
    },
    {
      icon: <Terminal className="w-5 h-5 text-[#177A56] dark:text-[#65D6A6]" />,
      title: 'Software & Web Engineering',
      desc: 'Berpengalaman membangun aplikasi full-stack modern dengan TypeScript, React, Next.js, dan RESTful API.',
    },
    {
      icon: <Database className="w-5 h-5 text-[#6C5CE7] dark:text-[#A99BFF]" />,
      title: 'Manajemen Data & Keamanan',
      desc: 'Perancangan skema relasional, optimasi query PostgreSQL/MySQL, serta integrasi Supabase Auth & RLS.',
    },
    {
      icon: <Sparkles className="w-5 h-5 text-[#177A56] dark:text-[#65D6A6]" />,
      title: 'Desain & Pengalaman Pengguna',
      desc: 'Mengutamakan kejelasan hierarki visual, aksesibilitas, responsivitas, dan interaksi yang halus.',
    },
  ];

  return (
    <section id="about" className="py-24 bg-white dark:bg-[#10111B] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-[#6C5CE7] dark:text-[#A99BFF]">
            {subtitle}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#20233A] dark:text-[#F5F3FF]">
            {title}
          </h2>
          <div className="w-16 h-1 rounded-full gradient-aurora mx-auto mt-2" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Main Story Text */}
          <div className="lg:col-span-7 space-y-6 text-[#62647A] dark:text-[#C4C2D8] leading-relaxed text-base sm:text-lg">
            <p className="font-medium text-[#20233A] dark:text-[#F5F3FF]">
              {profile.about_content}
            </p>

            <p>
              Dalam setiap proyek yang saya kembangkan, saya berupaya memastikan kode tidak hanya
              berfungsi, tetapi juga teruji, mudah dirawat, dan memiliki arsitektur yang kokoh. Mulai
              dari perancangan basis data hingga polesan detail interaksi antarmuka pengguna.
            </p>

            <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm font-semibold text-[#20233A] dark:text-[#F5F3FF]">
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
            {highlights.map((item, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-[#F7F8FC] dark:bg-[#1B1C2A] border border-[#E6E7F0] dark:border-[#353449] hover:border-[#C9C0FF] dark:hover:border-[#6C5CE7]/40 transition-all hover:shadow-md"
              >
                <div className="flex items-start gap-4">
                  <div className="p-2.5 rounded-xl bg-[#EAE7FF] dark:bg-[#302B4D] shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-sm sm:text-base text-[#20233A] dark:text-[#F5F3FF]">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#62647A] dark:text-[#C4C2D8] mt-1 leading-normal">
                      {item.desc}
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
