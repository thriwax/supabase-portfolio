'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { supabase } from '../../../../lib/supabaseClient'

type Article = {
    id: string
    title: string
    created_at: string
}

export default function ArticleListPage() {
    const [articles, setArticles] = useState<Article[]>([])

    useEffect(() => {
        const fetchArticles = async () => {
            const { data } = await supabase
                .from('articles')
                .select('id, title, created_at')
                .order('created_at', { ascending: false })
            if (data) setArticles(data)
        }

        fetchArticles()
    }, [])

    const deleteArticle = async (id: string) => {
        const confirm = window.confirm('Удалить статью?')
        if (!confirm) return
        await supabase.from('articles').delete().eq('id', id)
        setArticles((prev) => prev.filter((a) => a.id !== id))
    }

    return (
        <div className='container-second max-w-3xl mx-auto p-6 space-y-6'>
            <h1 className='text-2xl font-bold'>Blog Page</h1>

            <div className='text-right'>
                <Link
                    href='/admin/articles/new'
                    className='inline-block bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition'
                >
                    ➕ New Article
                </Link>
            </div>

            {articles.length === 0 && <p className='text-gray-500 min-h-[350px]'>There are no articles</p>}

            <ul className='space-y-2'>
                {articles.map((article) => (
                    <li
                        key={article.id}
                        className='flex justify-between items-center border p-2 rounded'
                    >
                        <div>
                            <p className='font-medium'>{article.title}</p>
                            <p className='text-sm text-gray-500'>
                                {new Date(article.created_at).toLocaleDateString()}
                            </p>
                        </div>
                        <div className='space-x-2'>
                            <Link
                                href={`/admin/articles/${article.id}`}
                                className='text-blue-600 hover:underline'
                            >
                                ✏️
                            </Link>
                            {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
                            <button
                                onClick={() => deleteArticle(article.id)}
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
