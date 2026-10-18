'use client';

import React, { useState, useEffect } from 'react';
import { Database, CheckCircle2, AlertCircle, RefreshCw, Key, ExternalLink, X, ArrowRight, ShieldCheck } from 'lucide-react';
import { useToast } from '@/components/feedback/ToastContext';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

interface SupabaseStatus {
  configured: boolean;
  connected: boolean;
  migrationNeeded?: boolean;
  message?: string;
  error?: string;
  counts?: {
    profileExists: boolean;
    skills: number;
    projects: number;
    achievements: number;
    experiences: number;
  };
  env?: {
    hasUrl: boolean;
    hasAnonKey: boolean;
    hasServiceRole: boolean;
    url: string;
  };
}

export function SupabaseSyncModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState<SupabaseStatus | null>(null);
  const [loading, setLoading] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [savingConfig, setSavingConfig] = useState(false);
  const [activeTab, setActiveTab] = useState<'status' | 'config'>('status');

  // Form states
  const [url, setUrl] = useState('');
  const [anonKey, setAnonKey] = useState('');
  const [serviceRoleKey, setServiceRoleKey] = useState('');

  const { success, error, info } = useToast();

  const fetchStatus = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/supabase');
      const data = await res.json();
      setStatus(data);
      if (!data.configured) {
        setActiveTab('config');
      }
    } catch (err) {
      console.error('Failed to fetch Supabase status', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStatus();
  }, []);

  const handleSyncData = async () => {
    setSyncing(true);
    try {
      const res = await fetch('/api/admin/supabase', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await res.json();
      if (res.ok && data.success) {
        success(data.message || 'Sinkronisasi ke Supabase berhasil!');
        fetchStatus();
      } else {
        error(data.error || 'Gagal sinkronisasi data.');
      }
    } catch (err) {
      error('Gagal menghubungi server untuk sinkronisasi.');
    } finally {
      setSyncing(false);
    }
  };

  const handleSaveConfig = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim() || !anonKey.trim()) {
      error('Project URL dan Anon Key wajib diisi!');
      return;
    }

    setSavingConfig(true);
    try {
      const res = await fetch('/api/admin/supabase', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          url: url.trim(),
          anonKey: anonKey.trim(),
          serviceRoleKey: serviceRoleKey.trim() || undefined,
        }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        success('Kredensial Supabase berhasil disimpan!');
        setActiveTab('status');
        fetchStatus();
      } else {
        error(data.error || 'Gagal menyimpan kredensial.');
      }
    } catch {
      error('Terjadi kesalahan saat menyimpan kredensial.');
    } finally {
      setSavingConfig(false);
    }
  };

  return (
    <>
      {/* Topbar Trigger Badge */}
      <button
        type="button"
        onClick={() => {
          setIsOpen(true);
          fetchStatus();
        }}
        className={`hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
          status?.connected
            ? 'bg-[#EBFDF3] text-[#1E7E45] border-[#B9E9C9] dark:bg-[#133221] dark:text-[#75D89A] dark:border-[#1E5434]'
            : status?.configured
            ? 'bg-[#FFF9E6] text-[#A66C00] border-[#FCE299] dark:bg-[#34270C] dark:text-[#FDD663] dark:border-[#523F16]'
            : 'bg-[#EDE8FF] text-[#7966D9] border-[#DDD5FA] dark:bg-[#2A2140] dark:text-[#B7A7FF] dark:border-[#403561]'
        }`}
        title="Status Koneksi Database Supabase"
      >
        <Database className="w-3.5 h-3.5" />
        <span>
          {status?.connected
            ? 'Supabase: Terhubung'
            : status?.configured
            ? 'Supabase: Perlu Migrasi'
            : 'Sambungkan Supabase'}
        </span>
        <span
          className={`w-2 h-2 rounded-full ${
            status?.connected
              ? 'bg-[#1E7E45] animate-pulse'
              : status?.configured
              ? 'bg-[#F2994A]'
              : 'bg-[#7966D9]'
          }`}
        />
      </button>

      {/* Modal Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="relative w-full max-w-lg rounded-3xl bg-white dark:bg-[#211D2D] border border-[#E6E0F1] dark:border-[#3B334D] shadow-2xl p-6 sm:p-7 space-y-5">
            {/* Modal Header */}
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#EDE8FF] dark:bg-[#352D4A] text-[#7966D9] dark:text-[#B7A7FF] flex items-center justify-center">
                  <Database className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#39324E] dark:text-[#F7F3FF]">
                    Koneksi Database Supabase
                  </h3>
                  <p className="text-xs text-[#706981] dark:text-[#A096B5]">
                    Sinkronisasi data portofolio langsung ke PostgreSQL Cloud
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-xl text-[#706981] hover:bg-[#F0EDFA] dark:text-[#A096B5] dark:hover:bg-[#2D263D] transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Tab Switcher */}
            <div className="flex rounded-2xl bg-[#F4F1FA] dark:bg-[#1A1624] p-1 gap-1 text-xs font-semibold">
              <button
                type="button"
                onClick={() => setActiveTab('status')}
                className={`flex-1 py-1.5 rounded-xl transition-all ${
                  activeTab === 'status'
                    ? 'bg-white dark:bg-[#2B243B] text-[#7966D9] dark:text-[#B7A7FF] shadow-xs'
                    : 'text-[#706981] dark:text-[#A096B5]'
                }`}
              >
                Status & Sinkronisasi
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('config')}
                className={`flex-1 py-1.5 rounded-xl transition-all ${
                  activeTab === 'config'
                    ? 'bg-white dark:bg-[#2B243B] text-[#7966D9] dark:text-[#B7A7FF] shadow-xs'
                    : 'text-[#706981] dark:text-[#A096B5]'
                }`}
              >
                Pengaturan Kunci API
              </button>
            </div>

            {/* Tab 1: Status & Sync */}
            {activeTab === 'status' && (
              <div className="space-y-4">
                {/* Status Card */}
                <div
                  className={`p-4 rounded-2xl border text-xs space-y-2 ${
                    status?.connected
                      ? 'bg-[#EBFDF3] border-[#B9E9C9] text-[#1E7E45] dark:bg-[#133221] dark:border-[#1E5434] dark:text-[#B3E8C8]'
                      : status?.configured
                      ? 'bg-[#FFF9E6] border-[#FCE299] text-[#A66C00] dark:bg-[#34270C] dark:border-[#523F16] dark:text-[#FDD663]'
                      : 'bg-[#F7F5FF] border-[#E6E0F1] text-[#706981] dark:bg-[#1A1624] dark:border-[#3B334D] dark:text-[#C0B8D2]'
                  }`}
                >
                  <div className="flex items-center gap-2 font-bold text-sm">
                    {status?.connected ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-[#1E7E45] dark:text-[#75D89A]" />
                        <span>Supabase Siap & Terhubung</span>
                      </>
                    ) : status?.configured ? (
                      <>
                        <AlertCircle className="w-4 h-4 text-[#A66C00] dark:text-[#FDD663]" />
                        <span>Kredensial Ada, Tabel Perlu Migrasi</span>
                      </>
                    ) : (
                      <>
                        <Key className="w-4 h-4 text-[#7966D9] dark:text-[#B7A7FF]" />
                        <span>Kredensial Belum Dikonfigurasi</span>
                      </>
                    )}
                  </div>
                  <p className="leading-relaxed">
                    {status?.connected
                      ? 'Data portofolio Anda saat ini tersinkronisasi dengan database Supabase PostgreSQL.'
                      : status?.error ||
                        'Masukkan Project URL dan API Key Supabase Anda di tab "Pengaturan Kunci API" untuk menghubungkan.'}
                  </p>

                  {status?.counts && (
                    <div className="pt-2 grid grid-cols-2 sm:grid-cols-4 gap-2 border-t border-black/5 dark:border-white/10 text-center font-bold">
                      <div className="p-2 rounded-xl bg-white/60 dark:bg-black/20">
                        <div className="text-base text-[#39324E] dark:text-[#F7F3FF]">
                          {status.counts.skills}
                        </div>
                        <div className="text-[10px] text-[#706981] dark:text-[#A096B5]">Keahlian</div>
                      </div>
                      <div className="p-2 rounded-xl bg-white/60 dark:bg-black/20">
                        <div className="text-base text-[#39324E] dark:text-[#F7F3FF]">
                          {status.counts.projects}
                        </div>
                        <div className="text-[10px] text-[#706981] dark:text-[#A096B5]">Proyek</div>
                      </div>
                      <div className="p-2 rounded-xl bg-white/60 dark:bg-black/20">
                        <div className="text-base text-[#39324E] dark:text-[#F7F3FF]">
                          {status.counts.achievements}
                        </div>
                        <div className="text-[10px] text-[#706981] dark:text-[#A096B5]">Sertifikat</div>
                      </div>
                      <div className="p-2 rounded-xl bg-white/60 dark:bg-black/20">
                        <div className="text-base text-[#39324E] dark:text-[#F7F3FF]">
                          {status.counts.experiences}
                        </div>
                        <div className="text-[10px] text-[#706981] dark:text-[#A096B5]">Pengalaman</div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Instructions if Migration Needed */}
                {status?.migrationNeeded && (
                  <div className="p-3.5 rounded-2xl bg-[#EDE8FF] dark:bg-[#2A2140] border border-[#DDD5FA] dark:border-[#403561] text-xs text-[#39324E] dark:text-[#F7F3FF] space-y-2">
                    <p className="font-bold flex items-center gap-1.5 text-[#7966D9] dark:text-[#B7A7FF]">
                      <ShieldCheck className="w-4 h-4" />
                      Langkah Membuat Tabel di Supabase:
                    </p>
                    <ol className="list-decimal list-inside space-y-1 text-[#706981] dark:text-[#C0B8D2] pl-1">
                      <li>Buka dashboard Supabase project Anda di browser</li>
                      <li>Masuk ke menu <strong>SQL Editor</strong></li>
                      <li>
                        Salin isi file <code>supabase/migrations/20261018000000_initial_schema.sql</code>
                      </li>
                      <li>Tempel dan klik <strong>Run</strong></li>
                    </ol>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-2 pt-1">
                  <Button
                    type="button"
                    variant="admin-primary"
                    size="md"
                    isLoading={syncing}
                    disabled={!status?.configured}
                    leftIcon={<RefreshCw className="w-3.5 h-3.5" />}
                    onClick={handleSyncData}
                    className="flex-1 font-bold text-xs"
                  >
                    Sinkronkan Seluruh Data ke Supabase
                  </Button>
                  <Button
                    type="button"
                    variant="secondary"
                    size="md"
                    isLoading={loading}
                    leftIcon={<RefreshCw className="w-3.5 h-3.5" />}
                    onClick={fetchStatus}
                    className="font-semibold text-xs"
                  >
                    Uji Ulang
                  </Button>
                </div>
              </div>
            )}

            {/* Tab 2: Config Keys */}
            {activeTab === 'config' && (
              <form onSubmit={handleSaveConfig} className="space-y-3.5">
                <div className="p-3 rounded-2xl bg-[#F7F5FF] dark:bg-[#1A1624] border border-[#E6E0F1] dark:border-[#3B334D] text-xs text-[#706981] dark:text-[#A096B5] flex items-center justify-between">
                  <span>Dapatkan URL & API Key dari Supabase Project:</span>
                  <a
                    href="https://supabase.com/dashboard"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-[#7966D9] dark:text-[#B7A7FF] font-bold hover:underline"
                  >
                    <span>Supabase Dashboard</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                <Input
                  label="Project URL (NEXT_PUBLIC_SUPABASE_URL)"
                  placeholder="https://xyzabcdefghijklm.supabase.co"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  required
                />

                <Input
                  label="Anon / Public API Key (NEXT_PUBLIC_SUPABASE_ANON_KEY)"
                  placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                  type="password"
                  value={anonKey}
                  onChange={(e) => setAnonKey(e.target.value)}
                  required
                />

                <Input
                  label="Service Role Key (Opsional - SUPABASE_SERVICE_ROLE_KEY)"
                  placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                  type="password"
                  value={serviceRoleKey}
                  onChange={(e) => setServiceRoleKey(e.target.value)}
                  helperText="Direkomendasikan agar sinkronisasi admin ke database PostgreSQL dapat berjalan tanpa hambatan RLS."
                />

                <div className="flex justify-end gap-2 pt-2">
                  <Button
                    type="submit"
                    variant="admin-primary"
                    size="md"
                    isLoading={savingConfig}
                    leftIcon={<CheckCircle2 className="w-4 h-4" />}
                    className="font-bold text-xs px-5"
                  >
                    Simpan Kredensial & Hubungkan
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
