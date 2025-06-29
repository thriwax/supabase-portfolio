import { supabase } from '../../../../lib/supabaseClient'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

// ✅ УБИРАЕМ отдельный type Props

export async function generateMetadata(
    context: { params: { slug: string } }
): Promise<Metadata> {
    const { slug } = context.params

    const { data: project } = await supabase
        .from('projects')
        .select('title, description, image_url')
        .eq('slug', slug)
        .single()

    if (!project) return {}

    const image = project.image_url || 'https://placehold.co/600x400'

    return {
        title: `${project.title} – Fedor Tatarintsev`,
        description: project.description,
        openGraph: {
            title: project.title,
            description: project.description,
            images: [{ url: image }],
        },
        twitter: {
            card: 'summary_large_image',
            title: project.title,
            description: project.description,
            images: [image],
        },
    }
}

export default async function ProjectPage({
    params,
}: {
    params: { slug: string }
}) {
    const { slug } = params

    const { data: project, error } = await supabase
        .from('projects')
        .select('*')
        .eq('slug', slug)
        .maybeSingle()

    if (error || !project) {
        console.error('[ Server ] Проект не найден или ошибка:', error)
        notFound()
    }

    return (
        <main className="max-w-3xl mx-auto px-6 md:px-0 py-[150px] space-y-6">
            <h1 className="text-3xl font-bold">{project.title}</h1>
            <p className="text-gray-600">{project.description}</p>
            {project.image_url && (
                <img
                    src={project.image_url}
                    alt={project.title}
                    className="w-full rounded"
                />
            )}
            {project.url && (
                <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-4 text-blue-600 hover:underline"
                >
                    🔗 Перейти к проекту
                </a>
            )}
        </main>
    )
}
