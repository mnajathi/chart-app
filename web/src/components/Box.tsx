import React from 'react'

interface BoxProps {
    [key: string]: any;
    children: React.ReactNode;
}

const Box: React.FC<BoxProps> = ({ children }) => {
    return (
        <div className="flex items-center justify-between">{children}</div>
    );
}

export default Box;