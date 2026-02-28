import React from "react";

type Props = {
    children: React.ReactNode;
    className?: string;
};

export default function Card({ children, className = "" }: Props) {
    return (
        <div className={`bg-card border border-border rounded-[12px] p-6 ${className}`}>
            {children}
        </div>
    );
}
