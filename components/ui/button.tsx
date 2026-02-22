import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'outline' | 'teal';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading, children, ...props }, ref) => {
    const baseStyles = [
      'relative inline-flex items-center justify-center overflow-hidden',
      'rounded-[8px] font-sans font-semibold tracking-wide',
      'transition-all duration-300',
      'focus-visible:outline-none focus-visible:ring-2',
      'focus-visible:ring-offset-2 focus-visible:ring-offset-white',
      'disabled:opacity-50 disabled:pointer-events-none',
      'select-none',
    ].join(' ');

    const variants: Record<string, string> = {
      primary: [
        'bg-[#d8b23d] text-[#000042]',
        'hover:bg-[#dcc07f]',
        'active:bg-[#b6912c]',
        'focus-visible:ring-[rgba(216,178,61,0.38)]',
        'shadow-[0_2px_8px_rgba(216,178,61,0.25)]',
        'hover:shadow-[0_4px_16px_rgba(216,178,61,0.35)]',
      ].join(' '),

      secondary: [
        'bg-transparent text-[#d8b23d]',
        'border border-[#d8b23d]',
        'hover:bg-[#d8b23d] hover:text-[#000042]',
        'active:bg-[#b6912c] active:border-[#b6912c] active:text-[#000042]',
        'focus-visible:ring-[rgba(216,178,61,0.38)]',
      ].join(' '),

      outline: [
        'bg-transparent text-[#000042]',
        'border border-[rgba(0,0,66,0.25)]',
        'hover:border-[#d8b23d] hover:text-[#d8b23d]',
        'active:bg-[rgba(216,178,61,0.06)]',
        'focus-visible:ring-[rgba(216,178,61,0.38)]',
      ].join(' '),

      ghost: [
        'bg-transparent text-[#6b6b7e]',
        'hover:text-[#000042] hover:bg-[rgba(0,0,66,0.05)]',
        'active:bg-[rgba(0,0,66,0.08)]',
        'focus-visible:ring-[rgba(0,0,66,0.2)]',
      ].join(' '),

      teal: [
        'bg-[#54848c] text-white',
        'hover:bg-[#3d6970]',
        'active:bg-[#2e5059]',
        'focus-visible:ring-[rgba(84,132,140,0.4)]',
        'shadow-[0_2px_8px_rgba(84,132,140,0.2)]',
      ].join(' '),

      danger: [
        'bg-[hsl(4,70%,52%)] text-white',
        'hover:bg-[hsl(4,70%,45%)]',
        'active:bg-[hsl(4,70%,38%)]',
        'focus-visible:ring-[rgba(200,80,75,0.38)]',
      ].join(' '),
    };

    const sizes: Record<string, string> = {
      sm: 'h-9 px-4 text-[0.8125rem] gap-1.5',
      md: 'h-12 px-6 text-[0.875rem] gap-2',
      lg: 'h-14 px-8 text-[1rem] gap-2',
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        style={{ ['--interactive-focus-ring' as string]: 'rgba(216,178,61,0.38)' }}
        disabled={isLoading || props.disabled}
        {...props}
      >
        {isLoading && <Loader2 className="animate-spin shrink-0" size={15} />}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button };
export type { ButtonProps };
