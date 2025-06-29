'use client'

import { useEffect, useState } from 'react'
import { supabase } from '../../../../lib/supabaseClient'
import ProjectCard from '../UI/ProjectCard'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function ProjectsGrid({ limit = 6 }: { limit?: number }) {
    const [projects, setProjects] = useState<any[]>([])
    const pathname = usePathname()

    useEffect(() => {
        const fetchProjects = async () => {
            const { data, error } = await supabase
                .from('projects')
                .select('*')
                .order('title')
                .limit(limit)

            if (error) {
                console.error('Ошибка при загрузке проектов:', error.message)
            }

            if (data) {
                setProjects(data)
            }
        }

        fetchProjects()
    }, [limit])

    return (
        <section className=''>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                {projects.length === 0 && <p className='text-gray-500'>Проектов пока нет.</p>}
                {projects.map((project) => (
                    <ProjectCard key={project.id} project={project} />
                ))}
            </div>

            {pathname === '/' && (
                <div className='mt-10 text-center'>
                    <Link href='/projects' className='transition font-bebas px-6 py-3 w-full font-light sm:w-fit rounded-md mr-4 bg-[#D3E97A] hover:bg-slate-200 text-[#0A0A0A] shadow-inner hover:animate-pulse max-sm:mr-0'>
                        All Projects
                    </Link>
                </div>
            )}
        </section>
    )
}
