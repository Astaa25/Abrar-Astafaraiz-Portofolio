import React from 'react';
import { cn } from '@/lib/utils/cn';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'violet' | 'mint' | 'lavender' | 'neutral' | 'success' | 'warning' | 'danger';
  size?: 'sm' | 'md';
  className?: string;
}

export function Badge({ children, variant = 'violet', size = 'sm', className }: BadgeProps) {
  const sizeStyles = {
    sm: 'px-2.5 py-0.5 text-xs',
    md: 'px-3 py-1 text-xs',
  };

  const variantStyles = {
    violet:
      'bg-[#EAE7FF] text-[#6C5CE7] dark:bg-[#302B4D] dark:text-[#A99BFF] font-medium border border-[#C9C0FF]/50 dark:border-[#6C5CE7]/30',
    mint:
      'bg-[#DDF7F0] text-[#177A56] dark:bg-[#234A43] dark:text-[#65D6A6] font-medium border border-[#DDF7F0]/80',
    lavender:
      'bg-[#EDE8FF] text-[#7966D9] dark:bg-[#352D4A] dark:text-[#B7A7FF] font-medium border border-[#D8CFFF]/60',
    neutral:
      'bg-[#F0F0FA] text-[#62647A] dark:bg-[#25243A] dark:text-[#C4C2D8] font-medium border border-[#E6E7F0] dark:border-[#353449]',
    success:
      'bg-[#DDF7EC] text-[#176A4A] dark:bg-[#1D3B32] dark:text-[#8CE3BD] font-medium',
    warning:
      'bg-[#FFF0D7] text-[#875A00] dark:bg-[#46351F] dark:text-[#FFD58A] font-medium',
    danger:
      'bg-[#FFE5E8] text-[#A82F42] dark:bg-[#492831] dark:text-[#FFADB7] font-medium',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full font-medium transition-colors',
        sizeStyles[size],
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
