'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth/auth-context';
import { useToast } from '@/components/feedback/ToastContext';
import { DataService } from '@/services/data-service';
import { WebsiteContent } from '@/types/content';
import { Navbar } from '@/components/layout/Navbar';
import { HeroSection } from '@/components/public/HeroSection';
import { AboutSection } from '@/components/public/AboutSection';
import { SkillsSection } from '@/components/public/SkillsSection';
import { ProjectsSection } from '@/components/public/ProjectsSection';
import { AchievementsSection } from '@/components/public/AchievementsSection';
import { ExperienceSection } from '@/components/public/ExperienceSection';
import { ContactSection } from '@/components/public/ContactSection';
import { Footer } from '@/components/layout/Footer';
import { Eye, Send, ArrowLeft, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function PreviewPage() {
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const router = useRouter();
  const { success, error } = useToast();

  const [content, setContent] = useState<WebsiteContent | null>(null);
  const [isPublishing, setIsPublishing] = useState(false);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/admin-login?redirect=/preview');
      return;
    }

    if (isAuthenticated) {
      const draft = DataService.getDraftContent();
      setContent(draft);
    }
  }, [isAuthenticated, authLoading, router]);

  const handlePublish = () => {
    setIsPublishing(true);
    const res = DataService.publishChanges();
    if (res.success) {
      success(`Berhasil dipublikasikan! Versi v${res.versionNumber} kini aktif di website publik.`);
      setTimeout(() => {
        router.push('/');
      }, 1200);
    } else {
      error(res.error || 'Gagal mempublikasikan draft.');
      setIsPublishing(false);
    }
  };

  const handleDiscard = () => {
    if (confirm('Apakah Anda yakin ingin membuang semua perubahan draft dan mengembalikan ke versi publik aktif?')) {
      DataService.discardDraftChanges();
      setContent(DataService.getDraftContent());
      success('Perubahan draft telah dibatalkan.');
    }
  };

  if (authLoading || !content) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F7F5FF] dark:bg-[#171421]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-3 border-[#7966D9] border-t-transparent rounded-full animate-spin" />
          <p className="text-sm font-semibold text-[#706981] dark:text-[#C0B8D2]">
            Memuat pratinjau draft...
          </p>
        </div>
      </div>
    );
  }

  const getSectionMeta = (key: string) => {
    return content.sections.find((s) => s.section_key === key);
  };

  return (
    <div className="min-h-screen bg-[#F7F8FC] dark:bg-[#10111B] text-[#20233A] dark:text-[#F5F3FF] transition-colors relative">
      {/* Top Floating Preview Control Bar */}
      <div className="sticky top-0 inset-x-0 z-50 bg-[#7966D9] text-white px-4 py-2.5 shadow-md flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm">
        <div className="flex items-center gap-2 font-semibold">
          <Eye className="w-4 h-4 animate-pulse text-[#DDF7EC]" />
          <span>Mode Pratinjau Draft — Menampilkan data draft yang belum dipublikasikan</span>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/admin"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/15 hover:bg-white/25 text-white transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Kembali ke Admin</span>
          </Link>

          <button
            type="button"
            onClick={handleDiscard}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/15 hover:bg-[#C43D4B] text-white transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Buang Draft</span>
          </button>

          <Button
            size="sm"
            onClick={handlePublish}
            isLoading={isPublishing}
            className="bg-white text-[#7966D9] hover:bg-white/90 font-bold px-3.5 py-1.5 text-xs shadow-sm cursor-pointer"
            leftIcon={<Send className="w-3.5 h-3.5" />}
          >
            Publikasikan Sekarang
          </Button>
        </div>
      </div>

      {/* Main Content with Draft Values */}
      <Navbar
        sections={content.sections}
        displayName={content.profile.display_name}
      />

      <main>
        {getSectionMeta('hero')?.is_visible !== false && (
          <HeroSection profile={content.profile} />
        )}

        {getSectionMeta('about')?.is_visible !== false && (
          <AboutSection
            profile={content.profile}
            title={getSectionMeta('about')?.title}
            subtitle={getSectionMeta('about')?.subtitle}
          />
        )}

        {getSectionMeta('skills')?.is_visible !== false && (
          <SkillsSection
            skills={content.skills}
            title={getSectionMeta('skills')?.title}
            subtitle={getSectionMeta('skills')?.subtitle}
          />
        )}

        {getSectionMeta('projects')?.is_visible !== false && (
          <ProjectsSection
            projects={content.projects}
            title={getSectionMeta('projects')?.title}
            subtitle={getSectionMeta('projects')?.subtitle}
          />
        )}

        {getSectionMeta('achievements')?.is_visible !== false && (
          <AchievementsSection
            achievements={content.achievements}
            title={getSectionMeta('achievements')?.title}
            subtitle={getSectionMeta('achievements')?.subtitle}
          />
        )}

        {getSectionMeta('experience')?.is_visible !== false && (
          <ExperienceSection
            experiences={content.experiences}
            title={getSectionMeta('experience')?.title}
            subtitle={getSectionMeta('experience')?.subtitle}
          />
        )}

        {getSectionMeta('contact')?.is_visible !== false && (
          <ContactSection
            socialLinks={content.socialLinks}
            contactInfo={content.settings.contact_info}
            title={getSectionMeta('contact')?.title}
            subtitle={getSectionMeta('contact')?.subtitle}
          />
        )}
      </main>

      <Footer
        socialLinks={content.socialLinks}
        footerText={content.settings.contact_info.footer_text}
        displayName={content.profile.display_name}
      />
    </div>
  );
}
