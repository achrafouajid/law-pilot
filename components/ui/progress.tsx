import { HTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface ProgressProps extends HTMLAttributes<HTMLDivElement> {
    value: number;      /* 0–100 */
    label?: string;
    showValue?: boolean;
    size?: 'sm' | 'md' | 'lg';
    variant?: 'gold' | 'teal' | 'navy';
}

const Progress = forwardRef<HTMLDivElement, ProgressProps>(
    ({ className, value, label, showValue = true, size = 'md', variant = 'gold', ...props }, ref) => {
        const clampedValue = Math.min(100, Math.max(0, value));

        const trackH: Record<string, string> = {
            sm: 'h-1',
            md: 'h-1.5',
            lg: 'h-2.5',
        };

        const fillStyle: Record<string, string> = {
            gold: 'bg-gradient-to-r from-[#b6912c] via-[#d8b23d] to-[#dcc07f]',
            teal: 'bg-gradient-to-r from-[#54848c] to-[#c2ddd8]',
            navy: 'bg-gradient-to-r from-[#000042] to-[#54848c]',
        };

        return (
            <div ref={ref} className={cn('w-full', className)} {...props}>
                {(label || showValue) && (
                    <div className="flex items-center justify-between mb-2">
                        {label && (
                            <span className="font-sans text-[0.8125rem] font-medium text-[#3a3a4a]">
                                {label}
                            </span>
                        )}
                        {showValue && (
                            <span className="font-mono text-[0.75rem] text-[#d8b23d] tabular-nums">
                                {clampedValue}%
                            </span>
                        )}
                    </div>
                )}
                <div
                    className={cn(
                        'w-full rounded-full bg-[rgba(0,0,66,0.08)] overflow-hidden',
                        trackH[size]
                    )}
                    role="progressbar"
                    aria-valuenow={clampedValue}
                    aria-valuemin={0}
                    aria-valuemax={100}
                >
                    <div
                        className={cn(
                            'h-full rounded-full transition-all duration-700 ease-out',
                            fillStyle[variant]
                        )}
                        style={{ width: `${clampedValue}%` }}
                    />
                </div>
            </div>
        );
    }
);

Progress.displayName = 'Progress';

export { Progress };
