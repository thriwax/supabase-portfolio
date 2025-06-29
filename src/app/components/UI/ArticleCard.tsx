import Link from 'next/link'
import Image from 'next/image'

type Article = {
    slug: string;
    title: string
    content: string
    created_at: string
    image_url: string
}

export default function ArticleCard({ article }: { article: Article }) {
    return (
        <Link href={`/blog/${article.slug}`}>
            <div className='rounded-lg bg-[#3f3f3f] p-4 shadow-sm hover:shadow-md transition'>
                <Image
                    src={article.image_url}
                    alt={article.title}
                    width={400}
                    height={200}
                    className='rounded mb-4 object-cover w-full h-48'
                />
                <h3 className='text-lg font-semibold font-bebas'>{article.title}</h3>
                {/* <p className='text-sm text-gray-600 line-clamp-3'>{article.content}</p> */}
                <p className='text-xs text-gray-400 mt-2'>{new Date(article.created_at).toLocaleDateString()}</p>
            </div>
        </Link>
    )
}
