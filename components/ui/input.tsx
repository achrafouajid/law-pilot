import { InputHTMLAttributes, TextareaHTMLAttributes, SelectHTMLAttributes, forwardRef, ReactNode } from 'react';
import { cn } from '@/lib/utils';

/* ─── Text Input ─── */
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    hint?: string;
    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ className, label, error, hint, leftIcon, rightIcon, id, ...props }, ref) => {
        const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-');
        return (
            <div className="flex flex-col gap-1.5 w-full">
                {label && (
                    <label
                        htmlFor={inputId}
                        className="font-sans font-medium text-[0.8125rem] tracking-wide text-[#3a3a4a]"
                    >
                        {label}
                    </label>
                )}
                <div className="relative">
                    {leftIcon && (
                        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#6b6b7e] pointer-events-none">
                            {leftIcon}
                        </span>
                    )}
                    <input
                        ref={ref}
                        id={inputId}
                        className={cn(
                            'w-full h-12 px-4 rounded-[8px]',
                            'bg-white text-[#000042]',
                            'border border-[rgba(0,0,66,0.18)]',
                            'font-sans text-[0.9375rem] placeholder:text-[#9d9daa]',
                            'transition-all duration-200',
                            'focus:outline-none focus:border-[#d8b23d]',
                            'focus:shadow-[0_0_0_3px_rgba(216,178,61,0.18)]',
                            error && 'border-[hsl(4,70%,52%)] focus:border-[hsl(4,70%,52%)] focus:shadow-[0_0_0_3px_hsla(4,70%,52%,0.15)]',
                            leftIcon && 'pl-10',
                            rightIcon && 'pr-10',
                            'disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-[#f4f2ed]',
                            className
                        )}
                        {...props}
                    />
                    {rightIcon && (
                        <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#6b6b7e] pointer-events-none">
                            {rightIcon}
                        </span>
                    )}
                </div>
                {error && (
                    <p className="text-[0.8125rem] text-[hsl(4,70%,52%)] font-sans">{error}</p>
                )}
                {hint && !error && (
                    <p className="text-[0.8125rem] text-[#6b6b7e] font-sans">{hint}</p>
                )}
            </div>
        );
    }
);
Input.displayName = 'Input';

/* ─── Textarea ─── */
interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
    error?: string;
    hint?: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({ className, label, error, hint, id, ...props }, ref) => {
        const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-');
        return (
            <div className="flex flex-col gap-1.5 w-full">
                {label && (
                    <label
                        htmlFor={inputId}
                        className="font-sans font-medium text-[0.8125rem] tracking-wide text-[#3a3a4a]"
                    >
                        {label}
                    </label>
                )}
                <textarea
                    ref={ref}
                    id={inputId}
                    className={cn(
                        'w-full min-h-[120px] px-4 py-3 rounded-[8px]',
                        'bg-white text-[#000042]',
                        'border border-[rgba(0,0,66,0.18)]',
                        'font-sans text-[0.9375rem] placeholder:text-[#9d9daa]',
                        'resize-y transition-all duration-200',
                        'focus:outline-none focus:border-[#d8b23d]',
                        'focus:shadow-[0_0_0_3px_rgba(216,178,61,0.18)]',
                        error && 'border-[hsl(4,70%,52%)] focus:border-[hsl(4,70%,52%)]',
                        className
                    )}
                    {...props}
                />
                {error && <p className="text-[0.8125rem] text-[hsl(4,70%,52%)] font-sans">{error}</p>}
                {hint && !error && <p className="text-[0.8125rem] text-[#6b6b7e] font-sans">{hint}</p>}
            </div>
        );
    }
);
Textarea.displayName = 'Textarea';

/* ─── Select ─── */
interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    label?: string;
    error?: string;
    hint?: string;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
    ({ className, label, error, hint, id, children, ...props }, ref) => {
        const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-');
        return (
            <div className="flex flex-col gap-1.5 w-full">
                {label && (
                    <label
                        htmlFor={inputId}
                        className="font-sans font-medium text-[0.8125rem] tracking-wide text-[#3a3a4a]"
                    >
                        {label}
                    </label>
                )}
                <select
                    ref={ref}
                    id={inputId}
                    className={cn(
                        'w-full h-12 px-4 rounded-[8px]',
                        'bg-white text-[#000042]',
                        'border border-[rgba(0,0,66,0.18)]',
                        'font-sans text-[0.9375rem]',
                        'transition-all duration-200 appearance-none',
                        'focus:outline-none focus:border-[#d8b23d]',
                        'focus:shadow-[0_0_0_3px_rgba(216,178,61,0.18)]',
                        error && 'border-[hsl(4,70%,52%)]',
                        className
                    )}
                    {...props}
                >
                    {children}
                </select>
                {error && <p className="text-[0.8125rem] text-[hsl(4,70%,52%)] font-sans">{error}</p>}
                {hint && !error && <p className="text-[0.8125rem] text-[#6b6b7e] font-sans">{hint}</p>}
            </div>
        );
    }
);
Select.displayName = 'Select';

export { Input, Textarea, Select };
