import React from 'react';
import type { Metadata } from 'next';
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

export const instant = false;

export async function generateMetadata(): Promise<Metadata> {
  await connection();
  const content = await ServerDataService.getPublishedContent();
  const faviconUrl = content?.settings?.appearance?.favicon_url || '/favicon.svg';
  const siteTitle = content?.settings?.seo?.site_title || 'Abrar Astafaraiz | Personal Website';
  const metaDescription =
    content?.settings?.seo?.meta_description ||
    'Personal website of Abrar Astafaraiz, showcasing software development projects, technical skills, experience, and professional achievements.';
  const ogImage = content?.settings?.seo?.og_image || '/images/og-image.webp';

  const iconUrlWithVersion = faviconUrl
    ? `${faviconUrl}${faviconUrl.includes('?') ? '&' : '?'}v=4`
    : '/favicon.svg?v=4';

  return {
    title: siteTitle,
    description: metaDescription,
    icons: {
      icon: [{ url: iconUrlWithVersion, sizes: 'any' }],
      shortcut: iconUrlWithVersion,
      apple: iconUrlWithVersion,
    },
    openGraph: {
      title: siteTitle,
      description: metaDescription,
      images: [{ url: ogImage }],
    },
  };
}

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
        siteLogoUrl={content.settings?.appearance?.site_logo_url}
        siteLogoInitials={content.settings?.appearance?.site_logo_initials}
        siteLogoShape={content.settings?.appearance?.site_logo_shape}
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
        siteLogoUrl={content.settings?.appearance?.site_logo_url}
        siteLogoInitials={content.settings?.appearance?.site_logo_initials}
        siteLogoShape={content.settings?.appearance?.site_logo_shape}
      />
    </div>
  );
}
