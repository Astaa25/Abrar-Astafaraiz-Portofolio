import React from 'react';
import { Experience } from '@/types/database';
import { Briefcase, Calendar, CheckCircle2 } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';

interface ExperienceSectionProps {
  experiences: Experience[];
  title?: string;
  subtitle?: string;
}

export function ExperienceSection({
  experiences,
  title = 'Pengalaman & Organisasi',
  subtitle = 'Rekam Jejak Kolaborasi dan Kontribusi',
}: ExperienceSectionProps) {
  if (experiences.length === 0) return null;

  return (
    <section id="experience" className="py-24 bg-white dark:bg-[#10111B] transition-colors border-t border-[#E6E7F0]/60 dark:border-[#353449]/60">
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

        {/* Timeline List */}
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical Timeline Bar */}
          <div
            className="absolute left-4 sm:left-1/2 top-4 bottom-4 w-0.5 bg-[#D4D6E6] dark:bg-[#353449] -translate-x-1/2 hidden sm:block"
            aria-hidden="true"
          />

          <div className="space-y-8 sm:space-y-12">
            {experiences.map((exp, index) => {
              const isEven = index % 2 === 0;

              return (
                <div
                  key={exp.id}
                  className={`relative flex flex-col sm:flex-row items-center ${
                    isEven ? 'sm:flex-row-reverse' : ''
                  }`}
                >
                  {/* Central Node Badge */}
                  <div className="hidden sm:flex absolute left-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-white dark:bg-[#1B1C2A] border-2 border-[#5846DE] dark:border-[#A99BFF] items-center justify-center text-[#5846DE] dark:text-[#A99BFF] shadow-sm z-10">
                    <Briefcase className="w-4 h-4" />
                  </div>

                  {/* Card Content Container */}
                  <div className={`w-full sm:w-1/2 ${isEven ? 'sm:pl-10' : 'sm:pr-10'}`}>
                    <div className="p-6 rounded-2xl bg-[#F7F8FC] dark:bg-[#1B1C2A] border border-[#D4D6E6] dark:border-[#353449] hover:border-[#6C5CE7] dark:hover:border-[#A99BFF]/50 shadow-xs hover:shadow-md transition-all">
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                        <span className="text-xs font-bold text-[#5846DE] dark:text-[#A99BFF]">
                          {exp.organization}
                        </span>
                        <div className="flex items-center gap-1.5 text-xs font-semibold text-[#4F526B] dark:text-[#9A99B5]">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>
                            {exp.start_date} - {exp.is_current ? 'Sekarang' : exp.end_date || '-'}
                          </span>
                        </div>
                      </div>

                      <h3 className="text-lg font-extrabold text-[#181A2A] dark:text-[#F5F3FF] mb-2">
                        {exp.position}
                      </h3>

                      {exp.is_current && (
                        <Badge variant="mint" size="sm" className="mb-3">
                          Posisi Aktif
                        </Badge>
                      )}

                      <p className="text-sm text-[#33364D] dark:text-[#C4C2D8] leading-relaxed mb-4">
                        {exp.description}
                      </p>

                      {exp.responsibilities && exp.responsibilities.length > 0 && (
                        <div className="space-y-1.5 pt-3 border-t border-[#E6E7F0] dark:border-[#353449]">
                          <span className="text-xs font-bold text-[#4F526B] dark:text-[#9A99B5] uppercase">
                            Kontribusi Utama:
                          </span>
                          <ul className="space-y-1 text-xs text-[#33364D] dark:text-[#C4C2D8]">
                            {exp.responsibilities.map((resp, i) => (
                              <li key={i} className="flex items-start gap-2">
                                <CheckCircle2 className="w-3.5 h-3.5 text-[#177A56] dark:text-[#65D6A6] shrink-0 mt-0.5" />
                                <span>{resp}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
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
