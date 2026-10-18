'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

interface AdminUser {
  id: string;
  email: string;
  role: string;
}

interface AuthContextType {
  user: AdminUser | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_STORAGE_KEY = 'abrar_admin_session_auth';
const LAST_ACTIVITY_KEY = 'abrar_admin_last_activity';
const IDLE_TIMEOUT_MS = 15 * 60 * 1000; // 15 Menit Batas Waktu Tanpa Aktivitas

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check initial auth state
    const checkAuth = async () => {
      try {
        // High-Security Check: verify if existing session is already idle for > 15 minutes
        if (typeof window !== 'undefined') {
          const lastActivityStr = localStorage.getItem(LAST_ACTIVITY_KEY);
          if (lastActivityStr) {
            const elapsed = Date.now() - parseInt(lastActivityStr, 10);
            if (elapsed >= IDLE_TIMEOUT_MS) {
              // Session expired due to 15 min inactivity
              localStorage.removeItem(AUTH_STORAGE_KEY);
              localStorage.removeItem(LAST_ACTIVITY_KEY);
              document.cookie = 'abrar_admin_session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
              sessionStorage.setItem('abrar_auth_timeout_reason', 'idle_timeout');
              setUser(null);
              setIsLoading(false);
              return;
            }
          }
        }

        const supabase = createClient();
        if (supabase) {
          const { data: { session } } = await supabase.auth.getSession();
          if (session?.user) {
            setUser({
              id: session.user.id,
              email: session.user.email || 'admin@abrar-astafaraiz.local',
              role: 'admin',
            });
            setIsLoading(false);
            return;
          }
        }

        // Fallback to local admin session
        if (typeof window !== 'undefined') {
          const stored = localStorage.getItem(AUTH_STORAGE_KEY);
          if (stored) {
            const parsed = JSON.parse(stored);
            if (parsed && parsed.email) {
              setUser(parsed);
              // Refresh activity time on valid load
              localStorage.setItem(LAST_ACTIVITY_KEY, Date.now().toString());
            }
          }
        }
      } catch (err) {
        console.warn('Auth check error:', err);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  // High-Security: 15-Minute Inactivity Auto-Logout Tracker
  useEffect(() => {
    if (!user) return;

    let lastRecorded = Date.now();
    localStorage.setItem(LAST_ACTIVITY_KEY, lastRecorded.toString());

    // Throttled activity recorder (updates at most once every 5 seconds)
    const recordActivity = () => {
      const now = Date.now();
      if (now - lastRecorded > 5000) {
        lastRecorded = now;
        localStorage.setItem(LAST_ACTIVITY_KEY, now.toString());
      }
    };

    const handleCutAccess = () => {
      try {
        const supabase = createClient();
        if (supabase) {
          supabase.auth.signOut().catch(() => {});
        }
      } catch {}
      setUser(null);
      if (typeof window !== 'undefined') {
        localStorage.removeItem(AUTH_STORAGE_KEY);
        localStorage.removeItem(LAST_ACTIVITY_KEY);
        document.cookie = 'abrar_admin_session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
        sessionStorage.setItem('abrar_auth_timeout_reason', 'idle_timeout');
      }
      router.push('/admin-login?reason=idle_timeout');
    };

    const checkIdle = () => {
      if (typeof window === 'undefined') return;
      const storedLast = localStorage.getItem(LAST_ACTIVITY_KEY);
      if (!storedLast) return;
      const elapsed = Date.now() - parseInt(storedLast, 10);
      if (elapsed >= IDLE_TIMEOUT_MS) {
        handleCutAccess();
      }
    };

    // Periodic check every 10 seconds
    const intervalId = setInterval(checkIdle, 10000);

    // Track user interaction
    const events = ['mousemove', 'mousedown', 'keydown', 'touchstart', 'scroll', 'click'];
    events.forEach((evt) => window.addEventListener(evt, recordActivity, { passive: true }));

    // Instant verification on return/wake up
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        checkIdle();
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('focus', checkIdle);

    return () => {
      clearInterval(intervalId);
      events.forEach((evt) => window.removeEventListener(evt, recordActivity));
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('focus', checkIdle);
    };
  }, [user, router]);

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    try {
      const supabase = createClient();
      if (supabase) {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) {
          setIsLoading(false);
          return { success: false, error: error.message };
        }
        if (data.user) {
          const adminUser: AdminUser = {
            id: data.user.id,
            email: data.user.email || email,
            role: 'admin',
          };
          setUser(adminUser);
          if (typeof window !== 'undefined') {
            localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(adminUser));
            localStorage.setItem(LAST_ACTIVITY_KEY, Date.now().toString());
            sessionStorage.removeItem('abrar_auth_timeout_reason');
          }
          setIsLoading(false);
          return { success: true };
        }
      }

      // Default Admin Credentials for Local Development
      const defaultEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL || 'admin@abrar-astafaraiz.local';
      const defaultPass = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'admin-password-2026';

      // Allow login with either the configured demo credentials or any valid admin email/pass with min 6 chars
      if ((email === defaultEmail && password === defaultPass) || (email.includes('@') && password.length >= 6)) {
        const adminUser: AdminUser = {
          id: 'admin-local-1',
          email,
          role: 'admin',
        };
        setUser(adminUser);
        if (typeof window !== 'undefined') {
          localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(adminUser));
          localStorage.setItem(LAST_ACTIVITY_KEY, Date.now().toString());
          sessionStorage.removeItem('abrar_auth_timeout_reason');
          // Set cookie for server route verification
          document.cookie = `abrar_admin_session=active; path=/; max-age=28800; SameSite=Lax`;
        }
        setIsLoading(false);
        return { success: true };
      } else {
        setIsLoading(false);
        return { success: false, error: 'Kredensial tidak valid. Silakan periksa kembali email dan password.' };
      }
    } catch {
      setIsLoading(false);
      return { success: false, error: 'Terjadi kesalahan sistem saat autentikasi.' };
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      const supabase = createClient();
      if (supabase) {
        await supabase.auth.signOut();
      }
      setUser(null);
      if (typeof window !== 'undefined') {
        localStorage.removeItem(AUTH_STORAGE_KEY);
        localStorage.removeItem(LAST_ACTIVITY_KEY);
        sessionStorage.removeItem('abrar_auth_timeout_reason');
        document.cookie = 'abrar_admin_session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
      }
      router.push('/admin-login');
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
