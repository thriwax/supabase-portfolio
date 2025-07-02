'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { supabase } from '../../../../lib/supabaseClient'

type Project = {
    id: string
    title: string
    created_at: string
}

export default function ProjectListPage() {
    const [projects, setProjects] = useState<Project[]>([])

    useEffect(() => {
        const fetchProjects = async () => {
            const { data } = await supabase
                .from('projects')
                .select('id, title, created_at')
                .order('created_at', { ascending: false })
            if (data) setProjects(data)
        }

        fetchProjects()
    }, [])

    const deleteProject = async (id: string) => {
        const confirm = window.confirm('Удалить проект?')
        if (!confirm) return
        await supabase.from('projects').delete().eq('id', id)
        setProjects((prev) => prev.filter((p) => p.id !== id))
    }

    return (
        <div className='container-second max-w-3xl mx-auto p-6 space-y-6'>
            <h1 className='text-2xl font-bold'>Projects Page</h1>

            <div className='text-right'>
                <Link
                    href='/admin/projects/new'
                    className='inline-block bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition'
                >
                    ➕ New Project
                </Link>
            </div>

            {projects.length === 0 && <p className='text-gray-500'>There are no projects</p>}

            <ul className='space-y-2'>
                {projects.map((project) => (
                    <li
                        key={project.id}
                        className='flex justify-between items-center border p-2 rounded'
                    >
                        <div>
                            <p className='font-medium'>{project.title}</p>
                            <p className='text-sm text-gray-500'>
                                {new Date(project.created_at).toLocaleDateString()}
                            </p>
                        </div>
                        <div className='space-x-2'>
                            <Link
                                href={`/admin/projects/${project.id}`}
                                className='text-blue-600 hover:underline'
                            >
                                ✏️
                            </Link>
                            {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
                            <button
                                onClick={() => deleteProject(project.id)}
                                className='text-red-600'
                            >
                                🗑️
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}
