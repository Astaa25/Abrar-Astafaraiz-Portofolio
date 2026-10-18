'use client';

import React from 'react';
import { cn } from '@/lib/utils/cn';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger' | 'ghost' | 'admin-primary';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      children,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      leftIcon,
      rightIcon,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'inline-flex items-center justify-center font-medium rounded-xl transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98] cursor-pointer';

    const sizeStyles = {
      sm: 'px-3 py-1.5 text-xs gap-1.5',
      md: 'px-4 py-2 text-sm gap-2',
      lg: 'px-6 py-3 text-base gap-2.5',
    };

    const variantStyles = {
      primary:
        'bg-[#6C5CE7] hover:bg-[#5948D6] text-white shadow-sm hover:shadow focus:ring-[#6C5CE7] dark:bg-[#A99BFF] dark:text-[#10111B] dark:hover:bg-[#C0B6FF]',
      secondary:
        'bg-[#F0F0FA] hover:bg-[#EAE7FF] text-[#20233A] focus:ring-[#6C5CE7] dark:bg-[#25243A] dark:hover:bg-[#302B4D] dark:text-[#F5F3FF]',
      outline:
        'border border-[#E6E7F0] hover:border-[#6C5CE7] hover:bg-[#F0F0FA] text-[#20233A] focus:ring-[#6C5CE7] dark:border-[#353449] dark:hover:border-[#A99BFF] dark:hover:bg-[#25243A] dark:text-[#F5F3FF]',
      danger:
        'bg-[#C43D4B] hover:bg-[#A82F42] text-white shadow-sm focus:ring-[#C43D4B]',
      ghost:
        'hover:bg-[#F0F0FA] text-[#62647A] hover:text-[#20233A] dark:hover:bg-[#25243A] dark:text-[#C4C2D8] dark:hover:text-[#F5F3FF]',
      'admin-primary':
        'bg-[#7966D9] hover:bg-[#6652C5] text-white shadow-sm hover:shadow focus:ring-[#7966D9] dark:bg-[#B7A7FF] dark:text-[#171421] dark:hover:bg-[#CBBFFF]',
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(baseStyles, sizeStyles[size], variantStyles[variant], className)}
        {...props}
      >
        {isLoading ? (
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8H4z"
            ></path>
          </svg>
        ) : (
          leftIcon
        )}
        {children}
        {!isLoading && rightIcon}
      </button>
    );
  }
);

Button.displayName = 'Button';
