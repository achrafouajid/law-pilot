import { HTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'bordered' | 'dark' | 'gold' | 'teal';
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'default', ...props }, ref) => {
    const baseStyles = 'rounded-[12px] transition-all duration-300';

    const variants: Record<string, string> = {
      default: [
        'bg-[#f4f2ed]',
        'border border-[rgba(0,0,66,0.08)]',
      ].join(' '),

      elevated: [
        'bg-[#f4f2ed]',
        'border border-[rgba(0,0,66,0.08)]',
        'shadow-[0_1px_2px_rgba(0,0,66,0.06),0_4px_8px_rgba(0,0,66,0.05),0_16px_32px_rgba(0,0,66,0.04)]',
        'hover:translate-y-[-3px]',
        'hover:border-[rgba(216,178,61,0.4)]',
        'hover:shadow-[0_2px_4px_rgba(0,0,66,0.08),0_8px_16px_rgba(0,0,66,0.07),0_24px_48px_rgba(0,0,66,0.06),0_0_0_1px_rgba(216,178,61,0.15)]',
      ].join(' '),

      bordered: [
        'bg-[#f4f2ed]',
        'border-2 border-[rgba(0,0,66,0.18)]',
      ].join(' '),

      dark: [
        'bg-[rgba(255,255,255,0.04)]',
        'border border-[rgba(255,255,255,0.1)]',
        'shadow-[0_1px_2px_rgba(0,0,0,0.3),0_4px_8px_rgba(0,0,0,0.2)]',
        'hover:translate-y-[-3px]',
        'hover:border-[rgba(216,178,61,0.35)]',
      ].join(' '),

      gold: [
        'bg-[#f4f2ed]',
        'border border-[rgba(216,178,61,0.3)]',
        'shadow-[0_0_0_1px_rgba(216,178,61,0.1),0_4px_16px_rgba(216,178,61,0.08)]',
        'hover:border-[rgba(216,178,61,0.6)]',
        'hover:shadow-[0_0_0_1px_rgba(216,178,61,0.25),0_8px_32px_rgba(216,178,61,0.12)]',
        'hover:translate-y-[-3px]',
      ].join(' '),

      teal: [
        'bg-[#f4f2ed]',
        'border border-[rgba(84,132,140,0.25)]',
        'shadow-[0_4px_16px_rgba(84,132,140,0.08)]',
        'hover:border-[rgba(84,132,140,0.5)]',
        'hover:translate-y-[-3px]',
      ].join(' '),
    };

    return (
      <div
        ref={ref}
        className={cn(baseStyles, variants[variant], className)}
        {...props}
      />
    );
  }
);

Card.displayName = 'Card';

export { Card };
export type { CardProps };
