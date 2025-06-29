import { supabase } from '../../../lib/supabaseClient'
import ArticleCard from '../components/UI/ArticleCard'

export default async function BlogPage() {
    const { data: articles, error } = await supabase
        .from('articles')
        .select('*')
        .order('created_at', { ascending: false })

    if (error) {
        console.error('Ошибка загрузки статей:', error)
        return <p className="p-6">Ошибка загрузки</p>
    }

    return (
        <main className="container-second">
            <h1 className="text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-[#D3E97A] to-[#7e8b4a]">Blog</h1>
            <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {articles?.length === 0 && <p className="text-gray-500">Пока нет статей.</p>}
                {articles?.map((article) => (
                    <ArticleCard key={article.id} article={article} />
                ))}
            </section>
        </main>
    )
}