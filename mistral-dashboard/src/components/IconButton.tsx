import React from 'react';
import { LucideIcon } from 'lucide-react';

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    icon: LucideIcon;
    label?: string;
    variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    iconPosition?: 'left' | 'right' | 'top';
    className?: string;
};

export default function IconButton({
    icon: Icon,
    label,
    variant = 'secondary',
    size = 'md',
    iconPosition = 'left',
    className = '',
    ...props
}: Props) {
    const baseClasses = "flex items-center justify-center transition-colors font-medium";

    const variantClasses = {
        primary: "bg-accent hover:bg-accent/80 text-white shadow-lg shadow-accent/20",
        secondary: "bg-card border border-border hover:bg-hover text-primary",
        danger: "bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 text-red-500",
        ghost: "bg-transparent hover:bg-hover text-secondary hover:text-primary",
    };

    const sizeClasses = {
        sm: "h-8 px-3 text-xs gap-1.5 rounded-[6px]",
        md: "h-10 px-4 text-sm gap-2 rounded-[8px]",
        lg: "h-14 px-6 text-base gap-3 rounded-[12px]",
    };

    const iconSizes = {
        sm: "h-3.5 w-3.5",
        md: "h-4 w-4",
        lg: "h-5 w-5",
    };

    // If label is missing, make it a square icon button
    const isIconOnly = !label;
    const layoutClasses = isIconOnly
        ? size === 'sm' ? 'w-8 !px-0' : size === 'md' ? 'w-10 !px-0' : 'w-14 !px-0'
        : iconPosition === 'top'
            ? 'flex-col !h-auto py-2'
            : iconPosition === 'right'
                ? 'flex-row-reverse'
                : 'flex-row';

    return (
        <button
            className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${layoutClasses} ${className}`}
            {...props}
        >
            <Icon className={iconSizes[size]} />
            {label && <span>{label}</span>}
        </button>
    );
}
