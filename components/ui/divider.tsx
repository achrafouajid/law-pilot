import { HTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface DividerProps extends HTMLAttributes<HTMLDivElement> {
    variant?: 'gold' | 'subtle' | 'navy' | 'teal';
    label?: string;
    orientation?: 'horizontal' | 'vertical';
}

const Divider = forwardRef<HTMLDivElement, DividerProps>(
    ({ className, variant = 'gold', label, orientation = 'horizontal', ...props }, ref) => {
        if (orientation === 'vertical') {
            return (
                <div
                    ref={ref}
                    className={cn(
                        'w-px self-stretch',
                        variant === 'gold' && 'bg-gradient-to-b from-transparent via-[#d8b23d] to-transparent',
                        variant === 'subtle' && 'bg-[rgba(0,0,66,0.1)]',
                        variant === 'navy' && 'bg-[rgba(0,0,66,0.2)]',
                        variant === 'teal' && 'bg-gradient-to-b from-transparent via-[#54848c] to-transparent',
                        className
                    )}
                    role="separator"
                    aria-orientation="vertical"
                    {...props}
                />
            );
        }

        if (label) {
            return (
                <div
                    ref={ref}
                    className={cn('flex items-center gap-4 w-full', className)}
                    role="separator"
                    {...props}
                >
                    <div className="flex-1 h-px bg-gradient-to-l from-[rgba(0,0,66,0.12)] to-transparent" />
                    <span className="shrink-0 font-sans text-[0.75rem] font-medium tracking-[0.05em] uppercase text-[#6b6b7e]">
                        {label}
                    </span>
                    <div className="flex-1 h-px bg-gradient-to-r from-[rgba(0,0,66,0.12)] to-transparent" />
                </div>
            );
        }

        return (
            <div
                ref={ref}
                className={cn(
                    'w-full border-none',
                    variant === 'gold' && [
                        'h-px',
                        'bg-gradient-to-r from-transparent via-[#d8b23d] to-transparent',
                    ].join(' '),
                    variant === 'subtle' && 'h-px bg-[rgba(0,0,66,0.1)]',
                    variant === 'navy' && 'h-px bg-[rgba(0,0,66,0.2)]',
                    variant === 'teal' && 'h-px bg-gradient-to-r from-transparent via-[#54848c] to-transparent',
                    className
                )}
                role="separator"
                aria-orientation="horizontal"
                {...props}
            />
        );
    }
);

Divider.displayName = 'Divider';

export { Divider };
