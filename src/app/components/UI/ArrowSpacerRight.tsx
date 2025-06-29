const ArrowSpacer = () => {
    return (
        <div className='flex items-center gap-4 w-full'>
            {/* biome-ignore lint/style/useSelfClosingElements: <explanation> */}
            <div className='flex-grow border-t-2 border-white'></div>
            {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
            <svg
                width='80'
                height='80'
                viewBox='0 0 43 42'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
                className='w-20 h-20 text-white rotate-x-180'
            >
                <path
                    d='M12.75 29.75L30.25 12.25'
                    stroke='currentColor'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                />
                <path
                    d='M12.75 12.25H30.25V29.75'
                    stroke='currentColor'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                />
            </svg>
        </div>
    );
};

export default ArrowSpacer;
