'use client'

import Image from 'next/image'
import { TypeAnimation } from 'react-type-animation';

const HeroSection = () => {
    return (
        <section className='lg:py-2 lg:mb-[100px]'>
            <div className='grid max-w-screen-xl mx-auto lg:gap-8 xl:gap-0 lg:pt-[-60px] lg:grid-cols-12'>
                <div className='mr-auto place-self-center lg:col-span-7 text-center sm:text-left order-1 lg:order-[-1] pt-10 max-sm:w-[100%]'>
                    <h1 className='font-bebas text-[#FFF] mb-4 text-3xl sm:text-6xl lg:text-8xl font-bold'>
                        <span className='text-transparent bg-clip-text bg-gradient-to-r from-[#D3E97A] to-[#7e8b4a]'>
                            Hello, I'm{' '}
                        </span>
                        <br />
                        <TypeAnimation
                            sequence={[
                                'Fedor Tatarintsev',
                                1000,
                                'Web Developer',
                                1000,
                                'UI/UX Designer',
                                1000,
                                'Thriwax',
                                1000,
                            ]}
                            wrapper='span'
                            // biome-ignore lint/suspicious/noExplicitAny: <explanation>
                            speed={150 as unknown as any}
                            // biome-ignore lint/style/useNumberNamespace: <explanation>
                            repeat={Infinity}
                        />

                    </h1>
                    <div className='flex gap-3 max-sm:pb-[80px]'>
                        <a href='https://www.linkedin.com/in/fedor-tatarintsev' className='font-bebas px-6 py-3 w-full font-light sm:w-fit rounded-md mr-4 bg-[#D3E97A] hover:bg-slate-200 text-[#0A0A0A] shadow-inner hover:animate-pulse max-sm:mr-0'>Hire Me</a>
                    </div>
                </div>
                <div className='flex justify-center lg:mt-0 lg:col-span-5 lg:flex lg:justify-end'>
                    <div className=''>
                        <picture>
                            {/* Для мобильных устройств */}
                            <source
                                media='(max-width: 768px)'
                                srcSet='https://zkfyodmlqstgnqvkemxo.supabase.co/storage/v1/object/public/project-images/fedor-tatarintsev-thriwax-main-image.jpg'
                                type='image/jpeg'
                            />
                            {/* Для десктопов */}
                            <Image
                                src='https://zkfyodmlqstgnqvkemxo.supabase.co/storage/v1/object/public/project-images/fedor-tatarintsev-thriwax-main-image.jpg'
                                alt='Fedor Tatarintsev Portrait'
                                className='object-cover mt-10 float-right md:w-[350px] md:h-[525px] md:rounded-none w-[300px] h-[380px] rounded-full max-sm:rounded-none shadow-[0px_0px_40px_5px_#D3E97A] animate-pulse-shadow'
                                width={350}
                                height={525}
                                loading='lazy'
                            />
                        </picture>
                    </div>

                </div>
            </div>
        </section>
    )
}

export default HeroSection;