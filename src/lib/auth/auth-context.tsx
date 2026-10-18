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

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check initial auth state
    const checkAuth = async () => {
      try {
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
