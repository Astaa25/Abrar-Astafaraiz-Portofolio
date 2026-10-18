'use client';

import React, { useState, useEffect } from 'react';
import { DataService } from '@/services/data-service';
import { ActivityLog } from '@/types/database';
import { formatDate } from '@/lib/utils/formatting';
import { History, Shield, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function AdminActivityLogsPage() {
  const [logs, setLogs] = useState<ActivityLog[]>([]);

  const loadLogs = () => {
    setLogs(DataService.getActivityLogs());
  };

  useEffect(() => {
    loadLogs();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-[#39324E] dark:text-[#F7F3FF]">
            Audit Activity Logs
          </h2>
          <p className="text-xs text-[#706981] dark:text-[#A096B5] mt-1">
            Riwayat lengkap seluruh aktivitas modifikasi konten, pembuatan data, dan publikasi website.
          </p>
        </div>

        <Button
          variant="secondary"
          size="sm"
          onClick={loadLogs}
          leftIcon={<RefreshCw className="w-3.5 h-3.5" />}
        >
          Muat Ulang Log
        </Button>
      </div>

      <div className="rounded-3xl bg-white dark:bg-[#211D2D] border border-[#E6E0F1] dark:border-[#3B334D] overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-[#E6E0F1] dark:border-[#3B334D] bg-[#F7F5FF] dark:bg-[#171421] text-[#928AA5] dark:text-[#A096B5]">
                <th className="py-3.5 px-6 font-semibold">Waktu Eksekusi</th>
                <th className="py-3.5 px-6 font-semibold">Tindakan (Action)</th>
                <th className="py-3.5 px-6 font-semibold">Tipe Entitas</th>
                <th className="py-3.5 px-6 font-semibold">ID Objek</th>
                <th className="py-3.5 px-6 font-semibold">Aktor</th>
                <th className="py-3.5 px-6 font-semibold">Metadata Tambahan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E6E0F1] dark:divide-[#3B334D]">
              {logs.map((log) => (
                <tr key={log.id} className="hover:bg-[#F0EDFA]/40 dark:hover:bg-[#2D263D]/40 transition-colors">
                  <td className="py-3.5 px-6 text-[#706981] dark:text-[#C0B8D2] whitespace-nowrap">
                    {formatDate(log.created_at)}
                  </td>
                  <td className="py-3.5 px-6 font-bold text-[#7966D9] dark:text-[#B7A7FF]">
                    <div className="flex items-center gap-2">
                      <Shield className="w-3.5 h-3.5 text-[#7966D9] dark:text-[#B7A7FF]" />
                      <span>{log.action}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-6 text-[#39324E] dark:text-[#F7F3FF] font-medium">
                    {log.entity_type}
                  </td>
                  <td className="py-3.5 px-6 text-[#706981] dark:text-[#A096B5] font-mono text-[11px]">
                    {log.entity_id || '-'}
                  </td>
                  <td className="py-3.5 px-6 text-[#706981] dark:text-[#C0B8D2]">
                    {log.actor_id || 'admin'}
                  </td>
                  <td className="py-3.5 px-6 text-[#706981] dark:text-[#C0B8D2] max-w-xs truncate font-mono text-[11px]">
                    {log.metadata ? JSON.stringify(log.metadata) : '-'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
