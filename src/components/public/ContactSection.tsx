'use client';

import React, { useState } from 'react';
import { SocialLink, ContactInfoSettings } from '@/types/database';
import { Mail, ArrowUpRight, MapPin, Copy, Check, Send } from 'lucide-react';
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
  subtitle = 'Informasi Kontak & Media Sosial',
}: ContactSectionProps) {
  const [copied, setCopied] = useState(false);

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

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (contactInfo.email) {
      navigator.clipboard.writeText(contactInfo.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <section id="contact" className="py-24 bg-[#F7F8FC] dark:bg-[#1B1C2A] transition-colors relative overflow-hidden border-t border-[#E6E7F0]/60 dark:border-[#353449]/60">
      {/* Decorative Aura */}
      <div
        className="absolute bottom-0 right-1/4 w-[450px] h-[450px] rounded-full bg-[#EAE7FF]/50 dark:bg-[#302B4D]/30 blur-[120px] pointer-events-none -z-10"
        aria-hidden="true"
      />

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

        <div className="max-w-4xl mx-auto">
          <div className="rounded-3xl bg-white dark:bg-[#10111B] border border-[#D4D6E6] dark:border-[#353449] p-8 sm:p-12 shadow-xl">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              {/* Left Column: Direct Introduction & Details */}
              <div className="md:col-span-7 space-y-5">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EAE7FF] text-[#5846DE] dark:bg-[#302B4D] dark:text-[#A99BFF] text-xs font-bold">
                  <Send className="w-3.5 h-3.5" />
                  <span>Kontak & Diskusi</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-extrabold text-[#181A2A] dark:text-[#F5F3FF] leading-snug">
                  {contactInfo.cta_heading || 'Hubungi Saya Langsung'}
                </h3>

                <p className="text-sm sm:text-base text-[#33364D] dark:text-[#C4C2D8] leading-relaxed">
                  {contactInfo.cta_subtext ||
                    'Jika Anda ingin berdiskusi seputar rekayasa perangkat lunak, menanyakan proyek, atau sekadar ingin saling terhubung, silakan hubungi saya melalui saluran kontak di bawah:'}
                </p>

                <div className="pt-2 flex items-center gap-2 text-xs font-semibold text-[#4F526B] dark:text-[#9A99B5]">
                  <MapPin className="w-4 h-4 text-[#177A56] dark:text-[#65D6A6]" />
                  <span>{contactInfo.location || 'Indonesia'} • Mahasiswa Teknik Informatika</span>
                </div>
              </div>

              {/* Right Column: Direct Email Card & Social Profiles */}
              <div className="md:col-span-5 flex flex-col space-y-3">
                {/* Main Email Action Card */}
                <div className="p-4 rounded-2xl bg-gradient-to-br from-[#5846DE] to-[#7966D9] text-white shadow-md">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-semibold text-white/80 uppercase tracking-wider">
                      Alamat Email
                    </span>
                    <button
                      type="button"
                      onClick={handleCopyEmail}
                      title="Salin alamat email"
                      className="inline-flex items-center gap-1 text-[11px] font-bold bg-white/20 hover:bg-white/30 text-white px-2 py-0.5 rounded-md transition-colors cursor-pointer"
                    >
                      {copied ? (
                        <>
                          <Check className="w-3 h-3 text-[#65D6A6]" />
                          <span>Tersalin!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Salin</span>
                        </>
                      )}
                    </button>
                  </div>
                  <div className="font-extrabold text-sm sm:text-base break-all mb-3">
                    {contactInfo.email}
                  </div>
                  <a
                    href={`mailto:${contactInfo.email}`}
                    className="inline-flex items-center justify-center gap-2 w-full py-2 px-3 rounded-xl bg-white text-[#5846DE] hover:bg-[#F7F8FC] font-bold text-xs transition-colors shadow-2xs cursor-pointer"
                  >
                    <Mail className="w-4 h-4" />
                    <span>Kirim Email Sekarang</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>

                {/* Social Profiles Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                  {socialLinks.map((s) => (
                    <a
                      key={s.id}
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-3 rounded-xl border border-[#D4D6E6] hover:border-[#6C5CE7] bg-[#F7F8FC] hover:bg-[#EAE7FF]/40 text-[#181A2A] dark:border-[#353449] dark:bg-[#1B1C2A] dark:text-[#F5F3FF] dark:hover:border-[#A99BFF] transition-all text-xs font-semibold group"
                    >
                      <div className="flex items-center gap-2.5 truncate">
                        <div className="text-[#5846DE] dark:text-[#A99BFF]">
                          {getIcon(s.icon_name || s.platform)}
                        </div>
                        <span className="truncate">{s.label}</span>
                      </div>
                      <ArrowUpRight className="w-3.5 h-3.5 text-[#928AA5] group-hover:text-[#5846DE] dark:group-hover:text-[#A99BFF] transition-colors shrink-0" />
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
