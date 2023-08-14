import React from 'react'
import { twMerge } from 'tailwind-merge';

interface ContainerProps {
    [key: string]: any;
    children: React.ReactNode;
    className?: string;
}

const Container: React.FC<ContainerProps> = ({ children, className }) => {
    const classes = twMerge(`min-h-screen py-6 px-4 flex justify-center ${className ?? ""}`);

    return (
        <main className={classes}>
            <div className="max-w-5xl w-full">
                {children}
            </div>
        </main>
    );
}

export default Container;