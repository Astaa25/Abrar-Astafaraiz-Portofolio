'use client';

import { useEffect } from 'react';

export function ScrollRestoration() {
  useEffect(() => {
    // Set manual scroll restoration to prevent browser from snapping to (0,0) before hydration
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }

    const restore = () => {
      // 1. If hash exists in URL, scroll to target section
      if (window.location.hash) {
        const target = document.querySelector(window.location.hash);
        if (target) {
          target.scrollIntoView({ behavior: 'instant' });
          return;
        }
      }

      // 2. Otherwise restore last saved scroll Y position
      const savedY = sessionStorage.getItem('abrar_portfolio_scroll_y');
      if (savedY) {
        const y = parseInt(savedY, 10);
        if (!isNaN(y) && y > 0) {
          window.scrollTo({ top: y, behavior: 'instant' });
        }
      }
    };

    // Restore on load
    restore();
    const t1 = setTimeout(restore, 50);
    const t2 = setTimeout(restore, 150);
    const t3 = setTimeout(restore, 350);

    // Save scroll Y position on scroll
    let timeoutId: NodeJS.Timeout;
    const handleScroll = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        sessionStorage.setItem('abrar_portfolio_scroll_y', window.scrollY.toString());
      }, 50);
    };

    const handleBeforeUnload = () => {
      sessionStorage.setItem('abrar_portfolio_scroll_y', window.scrollY.toString());
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('beforeunload', handleBeforeUnload);
      clearTimeout(timeoutId);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  return null;
}
