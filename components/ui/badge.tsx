import { HTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { CheckCircle2, Clock, XCircle, Info, FileText } from 'lucide-react';

type BadgeVariant = 'success' | 'warning' | 'danger' | 'info' | 'draft' | 'gold' | 'teal';

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
    variant?: BadgeVariant;
    showIcon?: boolean;
}

const iconMap: Record<BadgeVariant, typeof CheckCircle2> = {
    success: CheckCircle2,
    warning: Clock,
    danger: XCircle,
    info: Info,
    draft: FileText,
    gold: FileText,
    teal: Info,
};

const variantStyles: Record<BadgeVariant, string> = {
    success: 'bg-[hsla(152,55%,42%,0.1)] text-[hsl(152,55%,42%)] border-[hsl(152,55%,42%)]',
    warning: 'bg-[hsla(38,90%,55%,0.1)]  text-[hsl(38,90%,55%)]  border-[hsl(38,90%,55%)]',
    danger: 'bg-[hsla(4,70%,52%,0.1)]   text-[hsl(4,70%,52%)]   border-[hsl(4,70%,52%)]',
    info: 'bg-[rgba(84,132,140,0.1)]   text-[#54848c]           border-[#54848c]',
    draft: 'bg-[rgba(107,107,126,0.08)] text-[#6b6b7e]           border-[#9d9daa]',
    gold: 'bg-[rgba(216,178,61,0.1)]   text-[#b6912c]           border-[#d8b23d]',
    teal: 'bg-[rgba(194,221,216,0.3)]  text-[#54848c]           border-[#c2ddd8]',
};

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
    ({ className, variant = 'draft', showIcon = false, children, ...props }, ref) => {
        const Icon = iconMap[variant];
        return (
            <span
                ref={ref}
                className={cn(
                    'inline-flex items-center gap-1.5',
                    'rounded-[6px] px-2.5 py-1',
                    'font-sans text-[0.6875rem] font-semibold tracking-[0.04em] uppercase',
                    'border',
                    variantStyles[variant],
                    className
                )}
                {...props}
            >
                {showIcon && <Icon size={10} />}
                {children}
            </span>
        );
    }
);

Badge.displayName = 'Badge';

export { Badge };
export type { BadgeVariant, BadgeProps };
