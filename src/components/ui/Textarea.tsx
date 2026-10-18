'use client';

import React from 'react';
import { cn } from '@/lib/utils/cn';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, helperText, id, rows = 3, ...props }, ref) => {
    const textareaId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="w-full space-y-1.5 text-left">
        {label && (
          <label htmlFor={textareaId} className="block text-xs font-semibold text-[#39324E] dark:text-[#F7F3FF]">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          rows={rows}
          className={cn(
            'block w-full rounded-xl border border-[#E6E0F1] bg-white px-3.5 py-2.5 text-sm text-[#39324E] placeholder:text-[#928AA5] transition-colors focus:border-[#7966D9] focus:outline-none focus:ring-2 focus:ring-[#7966D9]/20 disabled:cursor-not-allowed disabled:bg-gray-50 dark:border-[#3B334D] dark:bg-[#211D2D] dark:text-[#F7F3FF] dark:placeholder:text-[#A096B5] dark:focus:border-[#B7A7FF] dark:focus:ring-[#B7A7FF]/20',
            error && 'border-[#C43D4B] focus:border-[#C43D4B] focus:ring-[#C43D4B]/20',
            className
          )}
          {...props}
        />
        {error && <p className="text-xs text-[#C43D4B]">{error}</p>}
        {helperText && !error && <p className="text-xs text-[#706981] dark:text-[#A096B5]">{helperText}</p>}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';
