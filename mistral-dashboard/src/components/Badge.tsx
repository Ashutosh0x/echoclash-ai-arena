import React from 'react';

type Props = {
    children: React.ReactNode;
    className?: string;
};

export default function Badge({ children, className = '' }: Props) {
    return (
        <span className={`bg-accent/10 text-accent text-xs font-medium px-3 py-1 rounded-[8px] ${className}`}>
            {children}
        </span>
    );
}
