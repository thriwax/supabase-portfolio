import { supabase } from '../../../../lib/supabaseClient'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

type Params = {
    slug: string
}

// Мета-данные для SEO и соцсетей
export async function generateMetadata({
    params,
}: {
    params: Params
}): Promise<Metadata> {
    const { slug } = params

    const { data: project, error } = await supabase
        .from('projects')
        .select('title, description, image_url')
        .eq('slug', slug)
        .single()

    if (error || !project) {
        console.error('[Metadata] Проект не найден или ошибка:', error)
        return {}
    }

    const image = project.image_url || 'https://placehold.co/600x400'

    return {
        title: `${project.title} – Fedor Tatarintsev`,
        description: project.description,
        openGraph: {
            title: project.title,
            description: project.description,
            images: [{ url: image }],
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title: project.title,
            description: project.description,
            images: [image],
        },
    }
}

// Основная страница проекта
export default async function ProjectPage({
    params,
}: {
    params: Params
}) {
    const { slug } = params
    console.log('[Server] slug:', slug)

    const { data: project, error } = await supabase
        .from('projects')
        .select('slug, title, description, url, image_url, tags')
        .eq('slug', slug)
        .maybeSingle()

    if (error || !project) {
        console.error('[Server] Проект не найден или ошибка:', error)
        notFound()
    }

    return (
        <main className="max-w-3xl mx-auto px-6 md:px-0 py-[150px] space-y-6">
            <h1 className="text-3xl font-bold">{project.title}</h1>

            {project.image_url && (
                <img
                    src={project.image_url}
                    alt={project.title}
                    className="w-full rounded"
                />
            )}

            <p className="text-gray-600">{project.description}</p>

            {/* 🔽 Теги проекта */}
            {Array.isArray(project.tags) && project.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag: string) => (
                        <span
                            key={tag}
                            className="text-xs p-1 bg-gray-200 text-gray-600 rounded-sm hover:bg-[#d3e97a]"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            )}

            {project.url && (
                <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block text-center font-bebas px-6 py-3 w-full font-light mt-4 text-[#0A0A0A] rounded-md hover:animate-pulse bg-[#D3E97A] hover:bg-slate-200"
                >
                    OPEN SITE
                </a>
            )}
        </main>
    )
}
