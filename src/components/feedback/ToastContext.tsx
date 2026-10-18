'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import { CheckCircle2, AlertCircle, Info, XCircle, X } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

type ToastType = 'success' | 'error' | 'warning' | 'info';

interface ToastItem {
  id: string;
  type: ToastType;
  message: string;
}

interface ToastContextType {
  toast: (message: string, type?: ToastType) => void;
  success: (message: string) => void;
  error: (message: string) => void;
  warning: (message: string) => void;
  info: (message: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toast = useCallback((message: string, type: ToastType = 'info') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, type, message }]);

    setTimeout(() => {
      removeToast(id);
    }, 4000);
  }, [removeToast]);

  const success = useCallback((message: string) => toast(message, 'success'), [toast]);
  const error = useCallback((message: string) => toast(message, 'error'), [toast]);
  const warning = useCallback((message: string) => toast(message, 'warning'), [toast]);
  const info = useCallback((message: string) => toast(message, 'info'), [toast]);

  return (
    <ToastContext.Provider value={{ toast, success, error, warning, info }}>
      {children}
      {/* Toast Render Container */}
      <div
        aria-live="polite"
        className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none"
      >
        {toasts.map((t) => (
          <div
            key={t.id}
            className={cn(
              'pointer-events-auto flex items-start gap-3 p-4 rounded-xl shadow-lg border text-sm animate-in slide-in-from-bottom-5 duration-200',
              t.type === 'success' && 'bg-[#DDF7EC] border-[#177A56]/30 text-[#176A4A] dark:bg-[#1D3B32] dark:text-[#8CE3BD]',
              t.type === 'error' && 'bg-[#FFE5E8] border-[#C43D4B]/30 text-[#A82F42] dark:bg-[#492831] dark:text-[#FFADB7]',
              t.type === 'warning' && 'bg-[#FFF0D7] border-[#9A6700]/30 text-[#875A00] dark:bg-[#46351F] dark:text-[#FFD58A]',
              t.type === 'info' && 'bg-[#EDE8FF] border-[#6C5CE7]/30 text-[#6C5CE7] dark:bg-[#352D4A] dark:text-[#B7A7FF]'
            )}
          >
            <div className="shrink-0 mt-0.5">
              {t.type === 'success' && <CheckCircle2 className="w-5 h-5 text-current" />}
              {t.type === 'error' && <XCircle className="w-5 h-5 text-current" />}
              {t.type === 'warning' && <AlertCircle className="w-5 h-5 text-current" />}
              {t.type === 'info' && <Info className="w-5 h-5 text-current" />}
            </div>
            <div className="flex-1 font-medium leading-relaxed">{t.message}</div>
            <button
              onClick={() => removeToast(t.id)}
              className="text-current opacity-70 hover:opacity-100 transition-opacity p-0.5"
              aria-label="Tutup notifikasi"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within ToastProvider');
  }
  return context;
}
