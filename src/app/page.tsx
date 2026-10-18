import React from 'react';
import { connection } from 'next/server';
import { ServerDataService } from '@/services/server-data-service';
import { Navbar } from '@/components/layout/Navbar';
import { HeroSection } from '@/components/public/HeroSection';
import { AboutSection } from '@/components/public/AboutSection';
import { SkillsSection } from '@/components/public/SkillsSection';
import { ProjectsSection } from '@/components/public/ProjectsSection';
import { AchievementsSection } from '@/components/public/AchievementsSection';
import { ExperienceSection } from '@/components/public/ExperienceSection';
import { ContactSection } from '@/components/public/ContactSection';
import { Footer } from '@/components/layout/Footer';

export default async function HomePage() {
  await connection();
  const content = await ServerDataService.getPublishedContent();

  const getSectionMeta = (key: string) => {
    return content.sections.find((s) => s.section_key === key);
  };

  return (
    <div className="min-h-screen bg-[#F7F8FC] dark:bg-[#10111B] text-[#20233A] dark:text-[#F5F3FF] transition-colors selection:bg-[#EAE7FF] selection:text-[#6C5CE7]">
      {/* Sticky Navbar */}
      <Navbar
        sections={content.sections}
        displayName={content.profile.display_name}
      />

      <main>
        {/* Hero Section */}
        {getSectionMeta('hero')?.is_visible !== false && (
          <HeroSection profile={content.profile} />
        )}

        {/* About Section */}
        {getSectionMeta('about')?.is_visible !== false && (
          <AboutSection
            profile={content.profile}
            title={getSectionMeta('about')?.title}
            subtitle={getSectionMeta('about')?.subtitle}
            highlights={content.settings?.about_highlights}
          />
        )}

        {/* Skills Section */}
        {getSectionMeta('skills')?.is_visible !== false && (
          <SkillsSection
            skills={content.skills}
            title={getSectionMeta('skills')?.title}
            subtitle={getSectionMeta('skills')?.subtitle}
          />
        )}

        {/* Projects Section */}
        {getSectionMeta('projects')?.is_visible !== false && (
          <ProjectsSection
            projects={content.projects}
            title={getSectionMeta('projects')?.title}
            subtitle={getSectionMeta('projects')?.subtitle}
          />
        )}

        {/* Achievements Section */}
        {getSectionMeta('achievements')?.is_visible !== false && (
          <AchievementsSection
            achievements={content.achievements}
            title={getSectionMeta('achievements')?.title}
            subtitle={getSectionMeta('achievements')?.subtitle}
          />
        )}

        {/* Experience Section */}
        {getSectionMeta('experience')?.is_visible !== false && (
          <ExperienceSection
            experiences={content.experiences}
            title={getSectionMeta('experience')?.title}
            subtitle={getSectionMeta('experience')?.subtitle}
          />
        )}

        {/* Contact Section */}
        {getSectionMeta('contact')?.is_visible !== false && (
          <ContactSection
            socialLinks={content.socialLinks}
            contactInfo={content.settings.contact_info}
            title={getSectionMeta('contact')?.title}
            subtitle={getSectionMeta('contact')?.subtitle}
          />
        )}
      </main>

      {/* Footer */}
      <Footer
        socialLinks={content.socialLinks}
        footerText={content.settings.contact_info.footer_text}
        displayName={content.profile.display_name}
      />
    </div>
  );
}
