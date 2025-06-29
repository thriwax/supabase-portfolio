import type { JSX } from 'react';
import React from 'react';

type HeadingCenter = {
    level?: 1 | 2 | 3 | 4 | 5 | 6;
    children: React.ReactNode;
    className?: string;
};

const HeadingCenter = ({ level = 2, children, className, ...rest }: HeadingCenter) => {

    const HeadingTag = `h${level}` as keyof JSX.IntrinsicElements;

    return (
        <div className='flex items-center gap-4 w-full'>
            <div className='flex-grow h-1 bg-gradient-to-r from-[#7e8b4a] to-[#D3E97A]' />
            {React.createElement(HeadingTag, { className, ...rest }, children)}
            <div className='flex-grow h-1 bg-gradient-to-r from-[#7e8b4a] to-[#D3E97A]' />
        </div>
    );
};

export default HeadingCenter;
