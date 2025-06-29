import type { JSX } from 'react';
import React from 'react';

type HeadingLeft = {
    level?: 1 | 2 | 3 | 4 | 5 | 6;
    children: React.ReactNode;
    className?: string;
};

const HeadingLeft = ({ level = 2, children, className, ...rest }: HeadingLeft) => {

    const HeadingTag = `h${level}` as keyof JSX.IntrinsicElements;

    return (
        <div className='flex items-center gap-4 w-full'>
            {React.createElement(HeadingTag, { className, ...rest }, children)}
            <div className='flex-grow h-1 bg-gradient-to-r from-[#7e8b4a] to-[#D3E97A]' />
        </div>
    );
};

export default HeadingLeft;
