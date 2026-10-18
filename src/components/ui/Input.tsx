'use client';

import React from 'react';
import { cn } from '@/lib/utils/cn';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, helperText, leftIcon, id, ...props }, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="w-full space-y-1.5 text-left">
        {label && (
          <label htmlFor={inputId} className="block text-xs font-semibold text-[#39324E] dark:text-[#F7F3FF]">
            {label}
          </label>
        )}
        <div className="relative rounded-xl shadow-xs">
          {leftIcon && (
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-[#928AA5]">
              {leftIcon}
            </div>
          )}
          <input
            ref={ref}
            id={inputId}
            className={cn(
              'block w-full rounded-xl border border-[#E6E0F1] bg-white px-3.5 py-2.5 text-sm text-[#39324E] placeholder:text-[#928AA5] transition-colors focus:border-[#7966D9] focus:outline-none focus:ring-2 focus:ring-[#7966D9]/20 disabled:cursor-not-allowed disabled:bg-gray-50 dark:border-[#3B334D] dark:bg-[#211D2D] dark:text-[#F7F3FF] dark:placeholder:text-[#A096B5] dark:focus:border-[#B7A7FF] dark:focus:ring-[#B7A7FF]/20',
              Boolean(leftIcon) && 'pl-10',
              error && 'border-[#C43D4B] focus:border-[#C43D4B] focus:ring-[#C43D4B]/20',
              className
            )}
            {...props}
          />
        </div>
        {error && <p className="text-xs text-[#C43D4B]">{error}</p>}
        {helperText && !error && <p className="text-xs text-[#706981] dark:text-[#A096B5]">{helperText}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';
