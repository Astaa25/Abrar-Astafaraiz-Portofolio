'use client';

import React, { useState } from 'react';
import { useAuth } from '@/lib/auth/auth-context';
import { useToast } from '@/components/feedback/ToastContext';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { ShieldCheck, Lock, UserCheck, KeyRound, LogOut, CheckCircle2 } from 'lucide-react';

export default function AdminSecurityPage() {
  const { user, logout } = useAuth();
  const { success, error } = useToast();

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);

  const handlePasswordUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassword || newPassword.length < 6) {
      error('Kata sandi baru minimal 6 karakter.');
      return;
    }
    if (newPassword !== confirmPassword) {
      error('Konfirmasi kata sandi baru tidak cocok.');
      return;
    }

    setIsUpdating(true);
    setTimeout(() => {
      setIsUpdating(false);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      success('Kata sandi berhasil diperbarui.');
    }, 600);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h2 className="text-2xl font-extrabold text-[#39324E] dark:text-[#F7F3FF]">
          Akun & Keamanan (Security)
        </h2>
        <p className="text-xs text-[#706981] dark:text-[#A096B5] mt-1">
          Pengaturan autentikasi administrator, status sesi, dan kredensial akses dashboard.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Account Info Card */}
        <div className="md:col-span-5 rounded-3xl bg-white dark:bg-[#211D2D] border border-[#E6E0F1] dark:border-[#3B334D] p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-[#E6E0F1] dark:border-[#3B334D]">
            <UserCheck className="w-5 h-5 text-[#7966D9] dark:text-[#B7A7FF]" />
            <h3 className="font-bold text-sm text-[#39324E] dark:text-[#F7F3FF]">
              Status Akun Aktif
            </h3>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <span className="text-[#928AA5] dark:text-[#A096B5] block">Email Administrator</span>
              <span className="font-bold text-sm text-[#39324E] dark:text-[#F7F3FF]">
                {user?.email}
              </span>
            </div>

            <div>
              <span className="text-[#928AA5] dark:text-[#A096B5] block">Peran Sistem (Role)</span>
              <span className="font-semibold text-xs text-[#176A4A] dark:text-[#8CE3BD] bg-[#DDF7EC] dark:bg-[#1D3B32] px-2 py-0.5 rounded-full inline-block mt-0.5">
                Super Administrator
              </span>
            </div>

            <div>
              <span className="text-[#928AA5] dark:text-[#A096B5] block">Status Sesi Saat Ini</span>
              <div className="flex items-center gap-1.5 text-xs text-[#176A4A] dark:text-[#8CE3BD] mt-0.5 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Terautentikasi (Aman)</span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-[#E6E0F1] dark:border-[#3B334D]">
            <Button
              variant="danger"
              size="sm"
              onClick={() => logout()}
              className="w-full text-xs font-semibold"
              leftIcon={<LogOut className="w-3.5 h-3.5" />}
            >
              Keluar dari Sesi Dashboard
            </Button>
          </div>
        </div>

        {/* Change Password Form */}
        <div className="md:col-span-7 rounded-3xl bg-white dark:bg-[#211D2D] border border-[#E6E0F1] dark:border-[#3B334D] p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-[#E6E0F1] dark:border-[#3B334D]">
            <KeyRound className="w-5 h-5 text-[#7966D9] dark:text-[#B7A7FF]" />
            <h3 className="font-bold text-sm text-[#39324E] dark:text-[#F7F3FF]">
              Perbarui Kata Sandi
            </h3>
          </div>

          <form onSubmit={handlePasswordUpdate} className="space-y-4">
            <Input
              label="Kata Sandi Lama"
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="••••••••••••"
              leftIcon={<Lock className="w-4 h-4" />}
              required
            />

            <Input
              label="Kata Sandi Baru"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Minimal 6 karakter"
              leftIcon={<Lock className="w-4 h-4" />}
              required
            />

            <Input
              label="Konfirmasi Kata Sandi Baru"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Ulangi kata sandi baru"
              leftIcon={<Lock className="w-4 h-4" />}
              required
            />

            <div className="pt-2 flex justify-end">
              <Button
                type="submit"
                variant="admin-primary"
                isLoading={isUpdating}
                leftIcon={<ShieldCheck className="w-4 h-4" />}
              >
                Simpan Kata Sandi Baru
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
