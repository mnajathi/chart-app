import React from 'react'
import { twMerge } from 'tailwind-merge';

interface BoxProps {
    [key: string]: any;
    children: React.ReactNode;
    className?: string;
}

const Box: React.FC<BoxProps> = ({ children, className }) => {
    const classes = twMerge(`flex items-center justify-between ${className ?? ""}`);

    return (
        <div className="flex items-center justify-between">{children}</div>
    );
}

export default Box;