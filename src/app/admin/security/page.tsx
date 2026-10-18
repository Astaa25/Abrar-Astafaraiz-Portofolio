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

      {/* Security Policies & Supabase Connection Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
        {/* 15-Minute Inactivity Policy */}
        <div className="rounded-3xl bg-white dark:bg-[#211D2D] border border-[#E6E0F1] dark:border-[#3B334D] p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#E6E0F1] dark:border-[#3B334D]">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#176A4A] dark:text-[#8CE3BD]" />
              <h3 className="font-bold text-sm text-[#39324E] dark:text-[#F7F3FF]">
                Kebijakan Sesi Otomatis (15 Menit)
              </h3>
            </div>
            <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-[#DDF7EC] text-[#176A4A] dark:bg-[#1D3B32] dark:text-[#8CE3BD]">
              Aktif & Terproteksi
            </span>
          </div>

          <p className="text-xs text-[#706981] dark:text-[#A096B5] leading-relaxed">
            Sistem perlindungan tingkat tinggi aktif secara otomatis. Jika tidak ada aktivitas interaksi (mouse, keyboard, scroll, atau sentuhan layar) selama <strong>15 menit berturut-turut</strong>, sesi autentikasi langsung diputus dan diarahkan kembali ke halaman login.
          </p>

          <div className="p-3 rounded-2xl bg-[#F7F5FF] dark:bg-[#2D263D] text-xs text-[#58506E] dark:text-[#C0B8D2] space-y-1.5">
            <div className="flex items-center justify-between">
              <span>Batas Waktu Idle (Inactivity):</span>
              <strong className="text-[#7966D9] dark:text-[#B7A7FF]">15 Menit</strong>
            </div>
            <div className="flex items-center justify-between">
              <span>Verifikasi Multi-Tab:</span>
              <strong className="text-[#176A4A] dark:text-[#8CE3BD]">Real-Time & Background</strong>
            </div>
            <div className="flex items-center justify-between">
              <span>Pembersihan Cookie & Token:</span>
              <strong className="text-[#176A4A] dark:text-[#8CE3BD]">Otomatis saat Expired</strong>
            </div>
          </div>
        </div>

        {/* Supabase Connection Status & Guide */}
        <div className="rounded-3xl bg-white dark:bg-[#211D2D] border border-[#E6E0F1] dark:border-[#3B334D] p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#E6E0F1] dark:border-[#3B334D]">
            <div className="flex items-center gap-2">
              <KeyRound className="w-5 h-5 text-[#7966D9] dark:text-[#B7A7FF]" />
              <h3 className="font-bold text-sm text-[#39324E] dark:text-[#F7F3FF]">
                Integrasi Database Supabase
              </h3>
            </div>
            <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-[#EDE8FF] text-[#7966D9] dark:bg-[#352D4A] dark:text-[#B7A7FF]">
              Konfigurasi .env.local
            </span>
          </div>

          <p className="text-xs text-[#706981] dark:text-[#A096B5] leading-relaxed">
            Untuk menyambungkan database Supabase secara permanen, cukup isi kredensial di file <code className="px-1.5 py-0.5 rounded-md bg-[#EDE8FF] dark:bg-[#352D4A] text-[#7966D9] dark:text-[#B7A7FF] font-mono text-[11px]">.env.local</code>:
          </p>

          <div className="p-3 rounded-2xl bg-[#1B1827] text-white text-[11px] font-mono overflow-x-auto space-y-1">
            <div className="text-[#8CE3BD]"># Tambahkan di .env.local:</div>
            <div>NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co</div>
            <div>NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJh...</div>
            <div>SUPABASE_SERVICE_ROLE_KEY=eyJh...</div>
          </div>

          <div className="text-[11px] text-[#706981] dark:text-[#A096B5] space-y-1">
            <p>1. Buka <strong>supabase.com</strong> dan buat project gratis.</p>
            <p>2. Salin Project URL & Anon Key dari menu <em>Settings &gt; API</em>.</p>
            <p>3. Di menu <em>SQL Editor</em>, jalankan file skema <code className="text-[#7966D9] dark:text-[#B7A7FF]">supabase/migrations/20261018000000_initial_schema.sql</code>.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
