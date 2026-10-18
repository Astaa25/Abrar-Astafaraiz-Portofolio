import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/lib/theme/theme-context';
import { AuthProvider } from '@/lib/auth/auth-context';
import { ToastProvider } from '@/components/feedback/ToastContext';
import { ScrollRestoration } from '@/components/layout/ScrollRestoration';

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-jakarta',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Abrar Astafaraiz | Personal Website',
  description:
    'Personal website of Abrar Astafaraiz, showcasing software development projects, technical skills, experience, and professional achievements.',
  keywords: [
    'Abrar Astafaraiz',
    'Full-Stack Developer',
    'Software Engineer',
    'Web Developer',
    'Teknik Informatika',
    'Next.js',
    'Portfolio',
  ],
  authors: [{ name: 'Abrar Astafaraiz' }],
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  openGraph: {
    title: 'Abrar Astafaraiz | Personal Website',
    description:
      'Personal website of Abrar Astafaraiz, showcasing software development projects, technical skills, experience, and professional achievements.',
    type: 'website',
    locale: 'id_ID',
    siteName: 'Abrar Astafaraiz Portfolio',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="id"
      data-public-theme="light"
      data-admin-theme="light"
      data-scroll-behavior="smooth"
      className={`${plusJakartaSans.variable} antialiased`}
      suppressHydrationWarning
    >
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var isAdm = window.location.pathname.indexOf('/admin') === 0;
                  var pub = localStorage.getItem('abrar_public_theme_pref');
                  var adm = localStorage.getItem('abrar_admin_theme_pref');

                  if (pub === 'dark') {
                    document.documentElement.setAttribute('data-public-theme', 'dark');
                  } else {
                    document.documentElement.setAttribute('data-public-theme', 'light');
                  }

                  if (adm === 'dark') {
                    document.documentElement.setAttribute('data-admin-theme', 'dark');
                  } else {
                    document.documentElement.setAttribute('data-admin-theme', 'light');
                  }

                  var shouldDark = isAdm ? (adm === 'dark') : (pub === 'dark');
                  if (shouldDark) {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col selection:bg-[#EAE7FF] selection:text-[#6C5CE7]">
        <ScrollRestoration />
        <ThemeProvider>
          <AuthProvider>
            <ToastProvider>{children}</ToastProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
