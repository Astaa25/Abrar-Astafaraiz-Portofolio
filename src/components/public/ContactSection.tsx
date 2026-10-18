'use client';

import React from 'react';
import { SocialLink, ContactInfoSettings } from '@/types/database';
import { Mail, ArrowUpRight, MessageSquare, MapPin } from 'lucide-react';
import { GithubIcon, LinkedinIcon, InstagramIcon } from '@/components/ui/SocialIcons';

interface ContactSectionProps {
  socialLinks: SocialLink[];
  contactInfo: ContactInfoSettings;
  title?: string;
  subtitle?: string;
}

export function ContactSection({
  socialLinks,
  contactInfo,
  title = 'Hubungi Saya',
  subtitle = 'Mari Berkolaborasi Membangun Solusi Digital',
}: ContactSectionProps) {
  const getIcon = (name: string) => {
    switch (name.toLowerCase()) {
      case 'github':
        return <GithubIcon className="w-5 h-5" />;
      case 'linkedin':
        return <LinkedinIcon className="w-5 h-5" />;
      case 'instagram':
        return <InstagramIcon className="w-5 h-5" />;
      case 'mail':
      case 'email':
        return <Mail className="w-5 h-5" />;
      default:
        return <ArrowUpRight className="w-5 h-5" />;
    }
  };

  return (
    <section id="contact" className="py-24 bg-[#F7F8FC] dark:bg-[#1B1C2A] transition-colors relative overflow-hidden">
      {/* Decorative Aura */}
      <div
        className="absolute bottom-0 right-1/4 w-[450px] h-[450px] rounded-full bg-[#EAE7FF]/50 dark:bg-[#302B4D]/30 blur-[120px] pointer-events-none -z-10"
        aria-hidden="true"
      />

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

        <div className="max-w-4xl mx-auto">
          <div className="rounded-3xl bg-white dark:bg-[#10111B] border border-[#E6E7F0] dark:border-[#353449] p-8 sm:p-12 shadow-xl">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              {/* Left Column: Collaboration Invitation */}
              <div className="md:col-span-7 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EAE7FF] text-[#6C5CE7] dark:bg-[#302B4D] dark:text-[#A99BFF] text-xs font-semibold">
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Kemitraan & Peluang</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-extrabold text-[#20233A] dark:text-[#F5F3FF] leading-snug">
                  {contactInfo.cta_heading}
                </h3>

                <p className="text-sm sm:text-base text-[#62647A] dark:text-[#C4C2D8] leading-relaxed">
                  {contactInfo.cta_subtext}
                </p>

                <div className="pt-2 flex items-center gap-2 text-xs text-[#85869B] dark:text-[#9A99B5]">
                  <MapPin className="w-4 h-4 text-[#177A56] dark:text-[#65D6A6]" />
                  <span>{contactInfo.location} • Tersedia untuk proyek remote & onsite</span>
                </div>
              </div>

              {/* Right Column: Direct Email CTA & Social Cards */}
              <div className="md:col-span-5 flex flex-col space-y-3">
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="flex items-center justify-between p-4 rounded-2xl bg-[#6C5CE7] hover:bg-[#5948D6] text-white transition-all transform hover:-translate-y-0.5 shadow-md hover:shadow-lg dark:bg-[#A99BFF] dark:text-[#10111B] dark:hover:bg-[#C0B6FF]"
                >
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5" />
                    <div className="text-left">
                      <span className="block text-xs opacity-80">Kirim Email Langsung</span>
                      <span className="font-semibold text-sm">{contactInfo.email}</span>
                    </div>
                  </div>
                  <ArrowUpRight className="w-5 h-5" />
                </a>

                {/* Social Links Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                  {socialLinks.map((s) => (
                    <a
                      key={s.id}
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3.5 rounded-xl border border-[#E6E7F0] hover:border-[#6C5CE7] bg-[#F7F8FC] hover:bg-[#EAE7FF]/40 text-[#20233A] dark:border-[#353449] dark:bg-[#1B1C2A] dark:text-[#F5F3FF] dark:hover:border-[#A99BFF] transition-all text-sm font-medium"
                    >
                      <div className="text-[#6C5CE7] dark:text-[#A99BFF]">
                        {getIcon(s.icon_name || s.platform)}
                      </div>
                      <span className="truncate">{s.label}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
