import { supabase } from '../../../../lib/supabaseClient'
import { notFound } from 'next/navigation'
import type { Metadata } from "next";

type Props = {
    params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = params

    const { data: article } = await supabase
        .from('articles')
        .select('*')
        .eq('slug', slug)
        .single()

    if (!article) return {}

    const image = article.image_url || 'https://zkfyodmlqstgnqvkemxo.supabase.co/storage/v1/object/public/project-images/fedor-tatarintsev-thriwax-main-image.jpg' // подставь свою дефолтную

    return {
        title: `${article.title} – Fedor Tatarintsev`,
        description: article.description,
        openGraph: {
            title: article.title,
            description: article.description,
            images: [{ url: image }],
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title: article.title,
            description: article.description,
            images: [image],
        },
    }
}

export default async function ArticlePage({ params }: Props) {
    const { slug } = params

    const { data: article, error } = await supabase
        .from('articles')
        .select('*')
        .eq('slug', slug)
        .single()

    if (error || !article) {
        console.error('[ Server ] Статья не найдена или ошибка:', error)
        notFound()
    }

    return (
        <main className="blog max-w-3xl mx-auto px-6 md:px-0 py-[150px] space-y-6">
            <h1 className="text-3xl font-bold">{article.title}</h1>
            {article.image_url && (
                <img src={article.image_url} alt={article.title} className="w-full rounded" />
            )}
            <div
                className="blog-content prose max-w-none"
                dangerouslySetInnerHTML={{ __html: article.content }}
            />
        </main>
    )
}
