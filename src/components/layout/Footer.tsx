'use client';

import React from 'react';
import { ArrowUp, Mail } from 'lucide-react';
import { GithubIcon, LinkedinIcon, InstagramIcon } from '@/components/ui/SocialIcons';
import { SocialLink } from '@/types/database';

interface FooterProps {
  socialLinks: SocialLink[];
  footerText?: string;
  displayName?: string;
}

export function Footer({
  socialLinks,
  footerText = '© 2026 Abrar Astafaraiz. All rights reserved. Crafted with Next.js & Supabase.',
  displayName = 'Abrar Astafaraiz',
}: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getIcon = (name: string) => {
    switch (name.toLowerCase()) {
      case 'github':
        return <GithubIcon className="w-4 h-4" />;
      case 'linkedin':
        return <LinkedinIcon className="w-4 h-4" />;
      case 'instagram':
        return <InstagramIcon className="w-4 h-4" />;
      case 'mail':
      case 'email':
        return <Mail className="w-4 h-4" />;
      default:
        return <Mail className="w-4 h-4" />;
    }
  };

  return (
    <footer className="border-t border-[#E6E7F0] dark:border-[#353449] bg-white dark:bg-[#10111B] py-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Brand & Copy */}
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
            <span className="text-base font-bold text-[#20233A] dark:text-[#F5F3FF]">
              {displayName}
            </span>
            <p className="text-xs text-[#85869B] dark:text-[#9A99B5] mt-1 max-w-md">
              {footerText}
            </p>
          </div>

          {/* Social Links & Back to Top */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              {socialLinks.map((s) => (
                <a
                  key={s.id}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="p-2 rounded-xl text-[#62647A] hover:text-[#6C5CE7] hover:bg-[#F0F0FA] dark:text-[#C4C2D8] dark:hover:text-[#A99BFF] dark:hover:bg-[#25243A] transition-colors"
                >
                  {getIcon(s.icon_name || s.platform)}
                </a>
              ))}
            </div>

            <button
              onClick={scrollToTop}
              aria-label="Kembali ke atas"
              className="p-2.5 rounded-xl border border-[#E6E7F0] hover:border-[#6C5CE7] text-[#62647A] hover:text-[#6C5CE7] bg-[#F0F0FA] hover:bg-[#EAE7FF] dark:border-[#353449] dark:bg-[#25243A] dark:text-[#C4C2D8] dark:hover:text-[#A99BFF] dark:hover:bg-[#302B4D] transition-all cursor-pointer"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
