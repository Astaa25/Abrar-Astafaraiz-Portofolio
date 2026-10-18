'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTheme } from '@/lib/theme/theme-context';
import { useAuth } from '@/lib/auth/auth-context';
import { Moon, Sun, Menu, X, Shield, ArrowRight } from 'lucide-react';
import { SectionSetting } from '@/types/database';

interface NavbarProps {
  sections: SectionSetting[];
  displayName?: string;
}

export function Navbar({ sections, displayName = 'Abrar Astafaraiz' }: NavbarProps) {
  const { publicTheme, togglePublicTheme } = useTheme();
  const { isAuthenticated } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  // Track scroll position for navbar style & active section
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Simple active section detection
      const scrollPos = window.scrollY + 150;
      const sectionElements = sections.map((s) => document.getElementById(s.section_key));

      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const el = sectionElements[i];
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sections[i].section_key);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);

  // Close mobile menu on ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const navItems = sections.filter((s) => s.is_visible && s.show_in_nav);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/85 dark:bg-[#10111B]/85 backdrop-blur-md shadow-xs border-b border-[#E6E7F0] dark:border-[#353449] py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo / Brand Name */}
          <Link
            href="#hero"
            className="flex items-center gap-2 group cursor-pointer focus:outline-hidden"
          >
            <div className="w-9 h-9 rounded-xl gradient-aurora flex items-center justify-center text-white font-bold text-base shadow-sm group-hover:scale-105 transition-transform">
              AA
            </div>
            <span className="font-bold text-lg tracking-tight text-[#20233A] dark:text-[#F5F3FF] group-hover:text-[#6C5CE7] dark:group-hover:text-[#A99BFF] transition-colors">
              {displayName}
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navItems.map((item) => {
              const isActive = activeSection === item.section_key;
              return (
                <a
                  key={item.id}
                  href={`#${item.section_key}`}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? 'text-[#6C5CE7] dark:text-[#A99BFF] bg-[#EAE7FF]/60 dark:bg-[#302B4D]/60'
                      : 'text-[#62647A] hover:text-[#20233A] dark:text-[#C4C2D8] dark:hover:text-[#F5F3FF] hover:bg-[#F0F0FA] dark:hover:bg-[#25243A]'
                  }`}
                >
                  {item.nav_label}
                </a>
              );
            })}
          </nav>

          {/* Right Action Icons: Theme Toggle & Admin Login */}
          <div className="flex items-center gap-2.5">
            {/* Theme Toggle */}
            <button
              type="button"
              onClick={togglePublicTheme}
              aria-label={publicTheme === 'light' ? 'Beralih ke mode gelap' : 'Beralih ke mode terang'}
              className="p-2 rounded-xl text-[#62647A] hover:text-[#20233A] bg-[#F0F0FA] hover:bg-[#EAE7FF] dark:text-[#C4C2D8] dark:hover:text-[#F5F3FF] dark:bg-[#25243A] dark:hover:bg-[#302B4D] transition-colors cursor-pointer"
            >
              {publicTheme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            </button>

            {/* Admin / Login Button */}
            {isAuthenticated ? (
              <Link
                href="/admin"
                className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-[#EDE8FF] text-[#7966D9] hover:bg-[#D8CFFF] dark:bg-[#352D4A] dark:text-[#B7A7FF] dark:hover:bg-[#453963] transition-colors"
              >
                <Shield className="w-3.5 h-3.5" />
                <span>Dashboard</span>
              </Link>
            ) : (
              <Link
                href="/admin-login"
                className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold text-[#62647A] hover:text-[#20233A] border border-[#E6E7F0] hover:bg-[#F0F0FA] dark:text-[#C4C2D8] dark:hover:text-[#F5F3FF] dark:border-[#353449] dark:hover:bg-[#25243A] transition-colors"
              >
                <span>Login</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            )}

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Tutup navigasi' : 'Buka navigasi'}
              className="md:hidden p-2 rounded-xl text-[#62647A] hover:text-[#20233A] bg-[#F0F0FA] hover:bg-[#EAE7FF] dark:text-[#C4C2D8] dark:hover:text-[#F5F3FF] dark:bg-[#25243A] dark:hover:bg-[#302B4D] transition-colors"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-3 rounded-2xl bg-white border border-[#E6E7F0] p-4 shadow-xl dark:bg-[#1B1C2A] dark:border-[#353449] animate-in slide-in-from-top-3 duration-200">
            <div className="flex flex-col space-y-1">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.section_key}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-3 py-2 rounded-xl text-sm font-medium transition-colors ${
                    activeSection === item.section_key
                      ? 'text-[#6C5CE7] dark:text-[#A99BFF] bg-[#EAE7FF]/60 dark:bg-[#302B4D]/60'
                      : 'text-[#62647A] hover:text-[#20233A] dark:text-[#C4C2D8] dark:hover:text-[#F5F3FF]'
                  }`}
                >
                  {item.nav_label}
                </a>
              ))}
              <div className="pt-3 border-t border-[#E6E7F0] dark:border-[#353449] flex items-center justify-between">
                {isAuthenticated ? (
                  <Link
                    href="/admin"
                    onClick={() => setMobileMenuOpen(false)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-[#EDE8FF] text-[#7966D9] w-full justify-center"
                  >
                    <Shield className="w-4 h-4" />
                    Buka Dashboard
                  </Link>
                ) : (
                  <Link
                    href="/admin-login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-[#62647A] hover:text-[#20233A] border border-[#E6E7F0] w-full justify-center dark:text-[#C4C2D8] dark:border-[#353449]"
                  >
                    Masuk ke Admin
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
