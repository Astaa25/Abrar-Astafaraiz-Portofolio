'use client';

import React from 'react';
import { Profile } from '@/types/database';
import { ArrowDown, Code2, Sparkles, FolderGit2, Mail } from 'lucide-react';

interface HeroSectionProps {
  profile: Profile;
}

export function HeroSection({ profile }: HeroSectionProps) {
  return (
    <section
      id="hero"
      className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-16 overflow-hidden gradient-soft-aurora"
    >
      {/* Decorative Aurora Violet Ambient Glows */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] rounded-full bg-[#A99BFF]/25 blur-[120px] pointer-events-none -z-10"
        aria-hidden="true"
      />
      <div
        className="absolute top-1/3 right-10 w-[350px] h-[350px] rounded-full bg-[#DDF7F0]/40 dark:bg-[#234A43]/20 blur-[100px] pointer-events-none -z-10"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Headline, Bio, CTAs */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6">
            {/* Status / Tagline Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/95 dark:bg-[#1B1C2A] border border-[#D4D6E6] dark:border-[#353449] shadow-sm backdrop-blur-xs">
              <span className="flex h-2 w-2 rounded-full bg-[#177A56] dark:bg-[#65D6A6] animate-pulse" />
              <span className="text-xs font-bold text-[#5846DE] dark:text-[#A99BFF]">
                {profile.tagline}
              </span>
            </div>

            {/* Display Name & Headline */}
            <div className="space-y-3">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#181A2A] dark:text-[#F5F3FF] leading-[1.15]">
                Halo, saya <span className="gradient-text">{profile.display_name}</span>
              </h1>
              <p className="text-lg sm:text-xl font-bold text-[#5846DE] dark:text-[#A99BFF]">
                {profile.headline}
              </p>
            </div>

            {/* Short Bio */}
            <p className="text-base sm:text-lg text-[#33364D] dark:text-[#C4C2D8] max-w-xl leading-relaxed font-normal">
              {profile.short_bio}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <a
                href={profile.primary_cta_target || '#projects'}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm bg-[#6C5CE7] hover:bg-[#5948D6] text-white shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 dark:bg-[#A99BFF] dark:text-[#10111B] dark:hover:bg-[#C0B6FF] cursor-pointer"
              >
                <FolderGit2 className="w-4 h-4" />
                <span>{profile.primary_cta_label || 'Lihat Proyek'}</span>
              </a>

              <a
                href={profile.secondary_cta_target || '#contact'}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm bg-white hover:bg-[#F0F0FA] text-[#181A2A] border border-[#D4D6E6] hover:border-[#6C5CE7] shadow-xs hover:shadow transition-all dark:bg-[#1B1C2A] dark:text-[#F5F3FF] dark:border-[#353449] dark:hover:border-[#A99BFF] cursor-pointer"
              >
                <Mail className="w-4 h-4" />
                <span>{profile.secondary_cta_label || 'Hubungi Saya'}</span>
              </a>
            </div>

            {/* Highlights Bar */}
            <div className="pt-6 border-t border-[#D4D6E6] dark:border-[#353449] flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs font-semibold text-[#4F526B] dark:text-[#9A99B5]">
              <div className="flex items-center gap-2">
                <Code2 className="w-4 h-4 text-[#5846DE] dark:text-[#A99BFF]" />
                <span>Web & Software Engineering</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#177A56] dark:text-[#65D6A6]" />
                <span>Modern Interactive UI</span>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Avatar & Aurora Card */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-[320px] sm:max-w-[380px] lg:max-w-[400px]">
              {/* Outer Glow Ring */}
              <div className="absolute inset-0 rounded-3xl gradient-aurora opacity-35 blur-2xl transform rotate-3 animate-pulse" />

              {/* Main Card Frame */}
              <div className="relative w-full rounded-3xl bg-white dark:bg-[#1B1C2A] border-2 border-white/80 dark:border-[#353449] shadow-2xl overflow-hidden p-4 sm:p-5 flex flex-col items-center">
                <div className="w-full rounded-2xl bg-gradient-to-b from-[#F0EDFA] to-[#EAE7FF] dark:from-[#252038] dark:to-[#1B1C2A] p-4 sm:p-6 flex flex-col items-center text-center relative overflow-hidden group">
                  {/* Large Profile Photo */}
                  {profile.profile_image_path ? (
                    <div className="relative w-48 h-48 sm:w-56 sm:h-56 lg:w-64 lg:h-64 rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl border-3 border-white dark:border-[#7966D9]/50 bg-white group-hover:scale-102 transition-transform duration-300">
                      <img
                        src={profile.profile_image_path}
                        alt={profile.display_name}
                        className="w-full h-full object-cover object-center"
                      />
                    </div>
                  ) : (
                    <div className="w-48 h-48 sm:w-56 sm:h-56 lg:w-64 lg:h-64 rounded-2xl sm:rounded-3xl gradient-aurora flex items-center justify-center text-white font-extrabold text-5xl shadow-xl">
                      AA
                    </div>
                  )}

                  {/* Profile Details Below Photo */}
                  <div className="mt-4 sm:mt-5 space-y-1">
                    <h3 className="font-extrabold text-xl sm:text-2xl text-[#181A2A] dark:text-[#F5F3FF]">
                      {profile.display_name}
                    </h3>
                    <p className="text-xs sm:text-sm font-semibold text-[#5846DE] dark:text-[#A99BFF]">
                      Teknik Informatika
                    </p>
                  </div>

                  {/* Status Badge */}
                  <div className="mt-3">
                    <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-[#DDF7F0] text-[#177A56] dark:bg-[#234A43] dark:text-[#65D6A6] shadow-2xs">
                      <span className="w-2 h-2 rounded-full bg-[#177A56] dark:bg-[#65D6A6] animate-pulse" />
                      Active Developer
                    </span>
                  </div>

                  {/* Hover visual subtle sheen */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#6C5CE7]/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <a
        href="#about"
        aria-label="Gulir ke bagian tentang saya"
        className="absolute bottom-4 left-1/2 -translate-x-1/2 p-2 rounded-full text-[#4F526B] hover:text-[#5846DE] dark:text-[#C4C2D8] dark:hover:text-[#A99BFF] animate-bounce transition-colors"
      >
        <ArrowDown className="w-5 h-5" />
      </a>
    </section>
  );
}
