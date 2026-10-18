import React from 'react';
import { Achievement } from '@/types/database';
import { Award, Calendar, ExternalLink, ShieldCheck } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';

interface AchievementsSectionProps {
  achievements: Achievement[];
  title?: string;
  subtitle?: string;
}

export function AchievementsSection({
  achievements,
  title = 'Sertifikat & Pencapaian',
  subtitle = 'Sertifikasi & Lisensi',
}: AchievementsSectionProps) {
  if (achievements.length === 0) return null;

  return (
    <section id="achievements" className="py-24 bg-[#F7F8FC] dark:bg-[#1B1C2A] transition-colors border-t border-[#E6E7F0]/60 dark:border-[#353449]/60">
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

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {achievements.map((item) => (
            <div
              key={item.id}
              className="group p-6 rounded-2xl bg-white dark:bg-[#10111B] border border-[#D4D6E6] dark:border-[#353449] hover:border-[#6C5CE7] dark:hover:border-[#A99BFF]/50 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div className="p-2.5 rounded-xl bg-[#EAE7FF] dark:bg-[#302B4D] text-[#5846DE] dark:text-[#A99BFF]">
                    {item.category.toLowerCase() === 'award' ? (
                      <Award className="w-5 h-5" />
                    ) : (
                      <ShieldCheck className="w-5 h-5" />
                    )}
                  </div>
                  <Badge variant="neutral" size="sm">
                    <Calendar className="w-3 h-3 mr-1" />
                    {item.achievement_date}
                  </Badge>
                </div>

                <Badge variant={item.category.toLowerCase() === 'award' ? 'mint' : 'violet'} size="sm" className="mb-2">
                  {item.category}
                </Badge>

                <h3 className="font-extrabold text-lg text-[#181A2A] dark:text-[#F5F3FF] mb-1">
                  {item.title}
                </h3>
                <p className="text-xs font-bold text-[#5846DE] dark:text-[#A99BFF] mb-3">
                  {item.organizer}
                </p>
                <p className="text-sm text-[#33364D] dark:text-[#C4C2D8] leading-relaxed line-clamp-3">
                  {item.description}
                </p>
              </div>

              {item.verification_url && (
                <div className="pt-4 mt-4 border-t border-[#E6E7F0] dark:border-[#353449]">
                  <a
                    href={item.verification_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#5846DE] hover:text-[#4734C7] dark:text-[#A99BFF] dark:hover:text-[#C0B6FF] transition-colors"
                  >
                    <span>Verifikasi Kredensial</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
