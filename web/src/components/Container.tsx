import React from 'react'

interface ContainerProps {
    [key: string]: any;
    children: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({ children }) => {
    return (
        <main className="min-h-screen py-6 px-4 flex justify-center">
            <div className="max-w-5xl w-full">
                {children}
            </div>
        </main>
    );
}

export default Container;