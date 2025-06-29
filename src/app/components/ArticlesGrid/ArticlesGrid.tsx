'use client'

import { useEffect, useState } from 'react'
import { supabase } from '../../../../lib/supabaseClient'
import ArticleCard from '../UI/ArticleCard'

export default function ArticlesGrid({ limit = 9 }: { limit?: number }) {
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    const [articles, setArticles] = useState<any[]>([])
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(false)

    const loadArticles = async () => {
        setLoading(true)
        const from = (page - 1) * limit
        const to = from + limit - 1
        const { data } = await supabase
            .from('articles')
            .select('*')
            .order('created_at', { ascending: false })
            .range(from, to)
        setArticles((prev) => [...prev, ...(data || [])])
        setLoading(false)
    }

    // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
    useEffect(() => {
        loadArticles()
    }, [page])

    return (
        <section className=''>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                {Array.from(new Map(articles.map((a) => [a.id, a])).values()).map((article) => (
                    <ArticleCard key={article.id} article={article} />
                ))}
            </div>
            {articles.length >= limit && (
                <div className='mt-6 text-center'>
                    {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
                    <button
                        onClick={() => setPage((p) => p + 1)}
                        disabled={loading}
                        className='px-4 py-2 text-sm rounded bg-gray-200 hover:bg-gray-300 transition'
                    >
                        {loading ? 'Загрузка...' : 'Показать ещё'}
                    </button>
                </div>
            )}
        </section>
    )
}
