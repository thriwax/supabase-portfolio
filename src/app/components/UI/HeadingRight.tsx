import type { JSX } from 'react';
import React from 'react';

type HeadingRight = {
    level?: 1 | 2 | 3 | 4 | 5 | 6;
    children: React.ReactNode;
    className?: string;
};

const HeadingRight = ({ level = 2, children, className, ...rest }: HeadingRight) => {

    const HeadingTag = `h${level}` as keyof JSX.IntrinsicElements;

    return (
        <div className='flex items-center gap-4 w-full'>
            <div className='flex-grow h-1 bg-gradient-to-r from-[#7e8b4a] to-[#D3E97A]' />
            {React.createElement(HeadingTag, { className, ...rest }, children)}
        </div>
    );
};

export default HeadingRight;
