'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

type ThemeMode = 'light' | 'dark';

interface ThemeContextType {
  publicTheme: ThemeMode;
  togglePublicTheme: () => void;
  adminTheme: ThemeMode;
  toggleAdminTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const PUBLIC_THEME_KEY = 'abrar_public_theme_pref';
const ADMIN_THEME_KEY = 'abrar_admin_theme_pref';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [publicTheme, setPublicTheme] = useState<ThemeMode>('light');
  const [adminTheme, setAdminTheme] = useState<ThemeMode>('light');

  useEffect(() => {
    const isAdmin = typeof window !== 'undefined' && window.location.pathname.startsWith('/admin');

    // Read saved public theme
    const savedPublic = localStorage.getItem(PUBLIC_THEME_KEY) as ThemeMode | null;
    const initialPublic = (savedPublic === 'dark' || savedPublic === 'light') ? savedPublic : 'light';
    setPublicTheme(initialPublic);
    document.documentElement.setAttribute('data-public-theme', initialPublic);

    // Read saved admin theme
    const savedAdmin = localStorage.getItem(ADMIN_THEME_KEY) as ThemeMode | null;
    const initialAdmin = (savedAdmin === 'dark' || savedAdmin === 'light') ? savedAdmin : 'light';
    setAdminTheme(initialAdmin);
    document.documentElement.setAttribute('data-admin-theme', initialAdmin);

    // Apply dark class based on current active view
    const shouldBeDark = isAdmin ? initialAdmin === 'dark' : initialPublic === 'dark';
    if (shouldBeDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const togglePublicTheme = () => {
    const next = publicTheme === 'light' ? 'dark' : 'light';
    setPublicTheme(next);
    localStorage.setItem(PUBLIC_THEME_KEY, next);
    document.documentElement.setAttribute('data-public-theme', next);
    const isAdmin = typeof window !== 'undefined' && window.location.pathname.startsWith('/admin');
    if (!isAdmin) {
      if (next === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  };

  const toggleAdminTheme = () => {
    const next = adminTheme === 'light' ? 'dark' : 'light';
    setAdminTheme(next);
    localStorage.setItem(ADMIN_THEME_KEY, next);
    document.documentElement.setAttribute('data-admin-theme', next);
    const isAdmin = typeof window !== 'undefined' && window.location.pathname.startsWith('/admin');
    if (isAdmin) {
      if (next === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  };

  return (
    <ThemeContext.Provider
      value={{
        publicTheme,
        togglePublicTheme,
        adminTheme,
        toggleAdminTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
