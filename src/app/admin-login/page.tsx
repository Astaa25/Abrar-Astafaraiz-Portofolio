'use client';

import React, { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/lib/auth/auth-context';
import { useToast } from '@/components/feedback/ToastContext';
import { ShieldCheck, Mail, Lock, ArrowLeft, LogIn, Clock, ShieldAlert } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

function AdminLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get('redirect') || '/admin';
  const reasonParam = searchParams.get('reason');

  const { login } = useAuth();
  const { success, error: toastError } = useToast();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isIdleTimeout, setIsIdleTimeout] = useState(false);

  React.useEffect(() => {
    if (reasonParam === 'idle_timeout') {
      setIsIdleTimeout(true);
    } else {
      try {
        const storedReason = sessionStorage.getItem('abrar_auth_timeout_reason');
        if (storedReason === 'idle_timeout') {
          setIsIdleTimeout(true);
        }
      } catch {}
    }
  }, [reasonParam]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setIsIdleTimeout(false);

    if (!email || !password) {
      setErrorMessage('Mohon lengkapi email dan kata sandi.');
      return;
    }

    setIsLoading(true);
    const res = await login(email, password);
    setIsLoading(false);

    if (res.success) {
      success('Autentikasi berhasil! Mengarahkan ke dashboard...');
      router.push(redirectUrl);
    } else {
      const err = res.error || 'Autentikasi gagal. Silakan periksa kembali kredensial Anda.';
      setErrorMessage(err);
      toastError(err);
    }
  };


  return (
    <div className="w-full max-w-md">
      {/* Back Link */}
      <div className="mb-6">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#706981] hover:text-[#7966D9] dark:text-[#C0B8D2] dark:hover:text-[#B7A7FF] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Website Publik</span>
        </Link>
      </div>

      {/* Card Box */}
      <div className="rounded-3xl bg-white dark:bg-[#211D2D] border border-[#E6E0F1] dark:border-[#3B334D] p-8 shadow-xl space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-[#EDE8FF] dark:bg-[#352D4A] text-[#7966D9] dark:text-[#B7A7FF] flex items-center justify-center mx-auto shadow-inner">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-extrabold text-[#39324E] dark:text-[#F7F3FF]">
            Portfolio Admin
          </h1>
          <p className="text-xs text-[#706981] dark:text-[#A096B5]">
            Masuk untuk mengelola konten dan pengaturan website
          </p>
        </div>

        {/* 15-Minute Inactivity Cut Alert */}
        {isIdleTimeout && (
          <div className="p-3.5 rounded-2xl bg-[#FFF6E5] border border-[#F4C96B]/50 dark:bg-[#382C18] dark:border-[#9A6700]/50 text-[#855B00] dark:text-[#FFD782] text-xs space-y-1 animate-in fade-in duration-300">
            <div className="flex items-center gap-2 font-bold">
              <Clock className="w-4 h-4 text-[#D9822B] shrink-0" />
              <span>Sesi Berakhir Otomatis (15 Menit)</span>
            </div>
            <p className="text-[11px] leading-relaxed text-[#735002] dark:text-[#FFE3A8]">
              Demi keamanan tingkat tinggi, akses diputus karena tidak ada aktivitas selama 15 menit. Silakan login kembali.
            </p>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {errorMessage && (
            <div className="p-3.5 rounded-xl bg-[#FFE5E8] border border-[#C43D4B]/20 text-[#A82F42] dark:bg-[#492831] dark:text-[#FFADB7] text-xs font-medium">
              {errorMessage}
            </div>
          )}

          <Input
            label="Email Administrator"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="admin@abrar-astafaraiz.local"
            leftIcon={<Mail className="w-4 h-4" />}
            required
          />

          <Input
            label="Kata Sandi"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••••••"
            leftIcon={<Lock className="w-4 h-4" />}
            required
          />

          <div className="pt-2">
            <Button
              type="submit"
              variant="admin-primary"
              size="lg"
              isLoading={isLoading}
              className="w-full font-bold"
              leftIcon={<LogIn className="w-4 h-4" />}
            >
              Masuk ke Dashboard
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[#F7F5FF] dark:bg-[#171421] text-[#39324E] dark:text-[#F7F3FF] transition-colors relative overflow-hidden">
      {/* Decorative Background Glows */}
      <div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-[#D8CFFF]/40 dark:bg-[#352D4A]/30 blur-[100px] pointer-events-none -z-10"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-[#DDF7EC]/30 dark:bg-[#1D3B32]/20 blur-[100px] pointer-events-none -z-10"
        aria-hidden="true"
      />

      <Suspense fallback={<div className="text-sm font-medium">Memuat form login...</div>}>
        <AdminLoginForm />
      </Suspense>
    </div>
  );
}
