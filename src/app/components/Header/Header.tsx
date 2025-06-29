'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { supabase } from '../../../../lib/supabaseClient'
import { FaGithub } from 'react-icons/fa'

export default function Header() {
    const [open, setOpen] = useState(false)
    const [siteTitle, setSiteTitle] = useState('Загрузка...')
    const [showSticky, setShowSticky] = useState(true)
    const lastScrollY = useRef(0)

    useEffect(() => {
        const fetchTitle = async () => {
            const { data } = await supabase.from('seo_settings').select('title').single()
            if (data?.title) setSiteTitle(data.title)
        }

        fetchTitle()
    }, [])

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY

            const delta = currentScrollY - lastScrollY.current

            // Если скролл вверх или у самого верха — показываем
            if (delta < 0 || currentScrollY < 10) {
                setShowSticky(true)
            }
            // Если скролл вниз и пользователь прокрутил реально вниз
            else if (delta > 5) {
                setShowSticky(false)
            }

            lastScrollY.current = currentScrollY
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <>
            <header
                className={`fixed top-0 left-0 z-50 w-full bg-[#d3e97a] text-black shadow-md transition-all duration-300 ease-in-out transform ${showSticky ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'
                    }`}
            >
                <div className="max-w-7xl mx-auto flex items-center justify-between py-7 px-4">
                    <Link href="/" className="text-3xl font-bold tracking-wide font-bebas">
                        {siteTitle.toUpperCase()}
                    </Link>

                    <div className="hidden lg:flex items-center gap-10 ml-auto mr-4">
                        <ul className="flex space-x-10 text-lg font-medium">
                            <li>
                                <Link href="/" className="hover:text-gray-300 transition-colors font-bebas text-black">
                                    MAIN
                                </Link>
                            </li>
                            <li>
                                <Link href="/projects" className="hover:text-gray-300 transition-colors font-bebas text-black">
                                    PROJECTS
                                </Link>
                            </li>
                        </ul>

                        <a
                            href="https://github.com/thriwax"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white text-black animate-pulse hover:bg-gray-300 transition"
                        >
                            <FaGithub size={20} />
                        </a>
                    </div>

                    <div className="lg:hidden">
                        <button onClick={() => setOpen(!open)} aria-label="Toggle Menu">
                            {open ? <X size={28} /> : <Menu size={28} />}
                        </button>
                    </div>
                </div>
            </header>

            {/* Fullscreen mobile menu with blur */}
            {open && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 text-white">
                    {/* Кнопка закрытия */}
                    <div className="flex justify-end p-6">
                        <button onClick={() => setOpen(false)} aria-label="Close Menu">
                            <X size={32} />
                        </button>
                    </div>

                    {/* Меню */}
                    <div className="flex flex-col items-center justify-center h-full -mt-20">
                        <ul className="flex flex-col items-center space-y-8 text-3xl font-semibold mb-12">
                            <li>
                                <Link href="/" onClick={() => setOpen(false)} className="hover:text-gray-300 font-bebas">
                                    MAIN
                                </Link>
                            </li>
                            <li>
                                <Link href="/projects" onClick={() => setOpen(false)} className="hover:text-gray-300 font-bebas">
                                    PROJECTS
                                </Link>
                            </li>
                        </ul>
                        <a
                            href="https://github.com/thriwax"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white text-black animate-pulse hover:bg-gray-200 transition"
                        >
                            <FaGithub size={24} />
                        </a>
                    </div>
                </div>
            )}
        </>
    )
}
