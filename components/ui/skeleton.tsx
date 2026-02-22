import { HTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
    width?: string;
    height?: string;
    rounded?: 'sm' | 'md' | 'lg' | 'full';
    variant?: 'light' | 'dark';
}

const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(
    ({ className, width, height, rounded = 'md', variant = 'light', style, ...props }, ref) => {
        const roundedStyles = {
            sm: 'rounded-[6px]',
            md: 'rounded-[8px]',
            lg: 'rounded-[12px]',
            full: 'rounded-full',
        };

        return (
            <div
                ref={ref}
                className={cn(
                    'animate-pulse',
                    variant === 'light' && 'bg-[rgba(0,0,66,0.07)]',
                    variant === 'dark' && 'bg-[rgba(255,255,255,0.08)]',
                    roundedStyles[rounded],
                    className
                )}
                style={{ width, height, ...style }}
                aria-hidden="true"
                {...props}
            />
        );
    }
);
Skeleton.displayName = 'Skeleton';

/* ── Card skeleton preset ── */
function CardSkeleton({ className }: { className?: string }) {
    return (
        <div className={cn('rounded-[12px] bg-[#f4f2ed] border border-[rgba(0,0,66,0.08)] p-6', className)}>
            <div className="flex items-start gap-3 mb-4">
                <Skeleton width="64px" height="20px" />
            </div>
            <Skeleton width="80%" height="28px" className="mb-2" />
            <Skeleton width="60%" height="20px" className="mb-6" />
            <Skeleton width="100%" height="6px" rounded="full" className="mb-4" />
            <div className="flex items-center justify-between">
                <Skeleton width="120px" height="16px" />
                <Skeleton width="80px" height="30px" />
            </div>
        </div>
    );
}

export { Skeleton, CardSkeleton };
