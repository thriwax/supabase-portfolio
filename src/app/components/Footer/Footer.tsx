'use client'

import Link from 'next/link'

export default function Footer() {
    return (
        <footer className="w-full dark:border-gray-700 bg-[#d3e97a] text-black ">
            <div className="max-w-7xl mx-auto px-6 py-20 flex flex-col md:flex-row items-center justify-between gap-6">
                {/* Имя / логотип */}
                <div className="text-3xl font-bold tracking-wide font-bebas text-black">
                    THRIWAX
                </div>

                {/* Меню */}
                <nav className="flex flex-col md:flex-row items-center gap-6 text-lg font-bebas">
                    <Link href="/" className="hover:text-gray-500 transition">MAIN</Link>
                    <Link href="/projects" className="hover:text-gray-500 transition">PROJECTS</Link>
                    <Link href="/contact" className="hover:text-gray-500 transition">CONTACT</Link>
                </nav>
            </div>
        </footer>
    )
}
