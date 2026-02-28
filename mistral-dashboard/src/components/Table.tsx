import React from 'react';

export default function Table({ children }: { children: React.ReactNode }) {
    return (
        <div className="w-full relative overflow-x-auto rounded-[12px] border border-border">
            <table className="w-full text-sm text-left text-primary">
                {children}
            </table>
        </div>
    );
}

export function TableHead({ children }: { children: React.ReactNode }) {
    return (
        <thead className="text-xs text-secondary uppercase bg-card/50 border-b border-border">
            {children}
        </thead>
    );
}

export function TableRow({ children, className = '' }: { children: React.ReactNode; className?: string }) {
    return (
        <tr className={`border-b border-border bg-card last:border-0 hover:bg-hover transition-colors ${className}`}>
            {children}
        </tr>
    );
}

export function TableHeader({ children, className = '' }: { children: React.ReactNode; className?: string }) {
    return <th className={`px-4 py-3 font-medium ${className}`}>{children}</th>;
}

export function TableCell({ children, className = '' }: { children: React.ReactNode; className?: string }) {
    return <td className={`px-4 py-3 ${className}`}>{children}</td>;
}
