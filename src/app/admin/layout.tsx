'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth/auth-context';
import { useTheme } from '@/lib/theme/theme-context';
import { useToast } from '@/components/feedback/ToastContext';
import { DataService } from '@/services/data-service';
import {
  LayoutDashboard,
  User,
  FileText,
  Wrench,
  FolderKanban,
  Award,
  Briefcase,
  Share2,
  SlidersHorizontal,
  Palette,
  Search,
  History,
  ShieldCheck,
  LogOut,
  Eye,
  ExternalLink,
  Send,
  Menu,
  X,
  Sun,
  Moon,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, isAuthenticated, isLoading, logout } = useAuth();
  const { adminTheme, toggleAdminTheme } = useTheme();
  const { success, error } = useToast();
  const pathname = usePathname();
  const router = useRouter();

  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push(`/admin-login?redirect=${encodeURIComponent(pathname)}`);
    }
  }, [isAuthenticated, isLoading, router, pathname]);

  if (isLoading || !isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F7F5FF] dark:bg-[#171421]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-3 border-[#7966D9] border-t-transparent rounded-full animate-spin" />
          <p className="text-sm font-semibold text-[#706981] dark:text-[#C0B8D2]">
            Memeriksa autentikasi administrator...
          </p>
        </div>
      </div>
    );
  }

  const navItems: NavItem[] = [
    { label: 'Overview', href: '/admin', icon: <LayoutDashboard className="w-4 h-4" /> },
    { label: 'Profile & Hero', href: '/admin/profile', icon: <User className="w-4 h-4" /> },
    { label: 'About', href: '/admin/about', icon: <FileText className="w-4 h-4" /> },
    { label: 'Skills', href: '/admin/skills', icon: <Wrench className="w-4 h-4" /> },
    { label: 'Projects', href: '/admin/projects', icon: <FolderKanban className="w-4 h-4" /> },
    { label: 'Achievements', href: '/admin/achievements', icon: <Award className="w-4 h-4" /> },
    { label: 'Experience', href: '/admin/experiences', icon: <Briefcase className="w-4 h-4" /> },
    { label: 'Contact & Socials', href: '/admin/contact', icon: <Share2 className="w-4 h-4" /> },
    { label: 'Section Management', href: '/admin/sections', icon: <SlidersHorizontal className="w-4 h-4" /> },
    { label: 'Website Appearance', href: '/admin/appearance', icon: <Palette className="w-4 h-4" /> },
    { label: 'SEO Settings', href: '/admin/seo', icon: <Search className="w-4 h-4" /> },
    { label: 'Activity Logs', href: '/admin/activity-logs', icon: <History className="w-4 h-4" /> },
    { label: 'Account & Security', href: '/admin/security', icon: <ShieldCheck className="w-4 h-4" /> },
  ];

  const handleQuickPublish = () => {
    if (confirm('Apakah Anda ingin mempublikasikan seluruh perubahan draft ke website publik sekarang?')) {
      setIsPublishing(true);
      const res = DataService.publishChanges();
      setIsPublishing(false);
      if (res.success) {
        success(`Perubahan berhasil dipublikasikan! Versi publik aktif v${res.versionNumber}.`);
      } else {
        error(res.error || 'Gagal mempublikasikan perubahan.');
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F5FF] dark:bg-[#171421] text-[#39324E] dark:text-[#F7F3FF] flex">
      {/* Desktop Sidebar (Lavender Studio styling) */}
      <aside className="hidden lg:flex w-64 flex-col fixed inset-y-0 left-0 bg-white dark:bg-[#211D2D] border-r border-[#E6E0F1] dark:border-[#3B334D] z-30">
        {/* Brand Header */}
        <div className="h-16 flex items-center gap-3 px-6 border-b border-[#E6E0F1] dark:border-[#3B334D]">
          <div className="w-8 h-8 rounded-xl bg-[#EDE8FF] dark:bg-[#352D4A] text-[#7966D9] dark:text-[#B7A7FF] flex items-center justify-center font-bold text-sm">
            PA
          </div>
          <div>
            <h1 className="font-bold text-sm text-[#39324E] dark:text-[#F7F3FF]">
              Portfolio Admin
            </h1>
            <p className="text-[11px] text-[#706981] dark:text-[#A096B5]">Lavender Studio</p>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-[#EDE8FF] text-[#7966D9] dark:bg-[#352D4A] dark:text-[#B7A7FF]'
                    : 'text-[#706981] hover:text-[#39324E] hover:bg-[#F0EDFA] dark:text-[#C0B8D2] dark:hover:text-[#F7F3FF] dark:hover:bg-[#2D263D]'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* User & Logout Footer */}
        <div className="p-4 border-t border-[#E6E0F1] dark:border-[#3B334D] space-y-2">
          <div className="px-3 py-1.5 flex items-center justify-between text-xs">
            <span className="font-medium text-[#706981] dark:text-[#A096B5] truncate">
              {user?.email}
            </span>
          </div>
          <button
            onClick={() => logout()}
            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-[#A82F42] hover:bg-[#FFE5E8] dark:hover:bg-[#492831] transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Keluar (Logout)</span>
          </button>
        </div>
      </aside>

      {/* Mobile Drawer Overlay */}
      {mobileSidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-xs"
            onClick={() => setMobileSidebarOpen(false)}
          />
          <div className="relative w-72 bg-white dark:bg-[#211D2D] border-r border-[#E6E0F1] dark:border-[#3B334D] flex flex-col z-10 animate-in slide-in-from-left duration-200">
            <div className="h-16 flex items-center justify-between px-6 border-b border-[#E6E0F1] dark:border-[#3B334D]">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-[#EDE8FF] dark:bg-[#352D4A] text-[#7966D9] dark:text-[#B7A7FF] flex items-center justify-center font-bold text-xs">
                  PA
                </div>
                <span className="font-bold text-sm">Portfolio Admin</span>
              </div>
              <button
                onClick={() => setMobileSidebarOpen(false)}
                className="p-1.5 rounded-lg text-[#706981] hover:bg-[#F0EDFA] dark:text-[#A096B5] dark:hover:bg-[#2D263D]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto p-4 space-y-1">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileSidebarOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                      isActive
                        ? 'bg-[#EDE8FF] text-[#7966D9] dark:bg-[#352D4A] dark:text-[#B7A7FF]'
                        : 'text-[#706981] hover:text-[#39324E] hover:bg-[#F0EDFA] dark:text-[#C0B8D2] dark:hover:text-[#F7F3FF] dark:hover:bg-[#2D263D]'
                    }`}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>

            <div className="p-4 border-t border-[#E6E0F1] dark:border-[#3B334D]">
              <button
                onClick={() => logout()}
                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-[#A82F42] hover:bg-[#FFE5E8] dark:hover:bg-[#492831] transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>Keluar (Logout)</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 lg:pl-64 flex flex-col min-h-screen">
        {/* Topbar */}
        <header className="h-16 bg-white dark:bg-[#211D2D] border-b border-[#E6E0F1] dark:border-[#3B334D] px-4 sm:px-6 flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="lg:hidden p-2 rounded-xl text-[#706981] hover:bg-[#F0EDFA] dark:text-[#C0B8D2] dark:hover:bg-[#2D263D]"
              aria-label="Buka menu navigasi"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2 text-xs font-medium text-[#706981] dark:text-[#A096B5]">
              <span>Admin</span>
              <span>/</span>
              <span className="font-semibold text-[#39324E] dark:text-[#F7F3FF] capitalize">
                {pathname.replace('/admin/', '').replace('/admin', 'Overview')}
              </span>
            </div>
          </div>

          {/* Topbar Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Admin Theme Toggle */}
            <button
              type="button"
              onClick={toggleAdminTheme}
              aria-label="Ganti tema admin"
              className="p-2 rounded-xl text-[#706981] hover:text-[#39324E] hover:bg-[#F0EDFA] dark:text-[#C0B8D2] dark:hover:text-[#F7F3FF] dark:hover:bg-[#2D263D] transition-colors cursor-pointer"
            >
              {adminTheme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            </button>

            {/* Preview Button */}
            <Link
              href="/preview"
              target="_blank"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-[#706981] hover:text-[#7966D9] border border-[#E6E0F1] hover:bg-[#F0EDFA] dark:text-[#C0B8D2] dark:border-[#3B334D] dark:hover:bg-[#2D263D] transition-colors"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Preview</span>
            </Link>

            {/* Visit Public Site */}
            <Link
              href="/"
              target="_blank"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-[#706981] hover:text-[#7966D9] border border-[#E6E0F1] hover:bg-[#F0EDFA] dark:text-[#C0B8D2] dark:border-[#3B334D] dark:hover:bg-[#2D263D] transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Website</span>
            </Link>

            {/* Publish CTA */}
            <Button
              variant="admin-primary"
              size="sm"
              onClick={handleQuickPublish}
              isLoading={isPublishing}
              leftIcon={<Send className="w-3.5 h-3.5" />}
              className="text-xs font-bold"
            >
              Publish
            </Button>
          </div>
        </header>

        {/* Page Content Body */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">{children}</main>
      </div>
    </div>
  );
}
