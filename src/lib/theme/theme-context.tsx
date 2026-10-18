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
    // Read saved public theme
    const savedPublic = localStorage.getItem(PUBLIC_THEME_KEY) as ThemeMode | null;
    if (savedPublic === 'dark' || savedPublic === 'light') {
      setPublicTheme(savedPublic);
      document.documentElement.setAttribute('data-public-theme', savedPublic);
    } else {
      document.documentElement.setAttribute('data-public-theme', 'light');
    }

    // Read saved admin theme
    const savedAdmin = localStorage.getItem(ADMIN_THEME_KEY) as ThemeMode | null;
    if (savedAdmin === 'dark' || savedAdmin === 'light') {
      setAdminTheme(savedAdmin);
      document.documentElement.setAttribute('data-admin-theme', savedAdmin);
    } else {
      document.documentElement.setAttribute('data-admin-theme', 'light');
    }
  }, []);

  const togglePublicTheme = () => {
    const next = publicTheme === 'light' ? 'dark' : 'light';
    setPublicTheme(next);
    localStorage.setItem(PUBLIC_THEME_KEY, next);
    document.documentElement.setAttribute('data-public-theme', next);
  };

  const toggleAdminTheme = () => {
    const next = adminTheme === 'light' ? 'dark' : 'light';
    setAdminTheme(next);
    localStorage.setItem(ADMIN_THEME_KEY, next);
    document.documentElement.setAttribute('data-admin-theme', next);
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
