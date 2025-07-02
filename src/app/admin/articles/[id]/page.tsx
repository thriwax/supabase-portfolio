'use client'

import { useEffect, useRef, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { supabase } from '../../../../../lib/supabaseClient'
import dynamic from 'next/dynamic'
import MediaPicker from '../../../components/MediaPicker/MediaPicker'
import { uploadImage } from '../../../../../lib/uploadImage'

const Editor = dynamic(() => import('@tinymce/tinymce-react').then(mod => mod.Editor), { ssr: false })

export default function EditArticlePage() {
    const { id } = useParams()
    const router = useRouter()
    const editorRef = useRef(null)

    const [title, setTitle] = useState('')
    const [slug, setSlug] = useState('')
    const [content, setContent] = useState('')
    const [imageUrl, setImageUrl] = useState('')
    const [coverFile, setCoverFile] = useState<File | null>(null)
    const [showPicker, setShowPicker] = useState(false)

    // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
    useEffect(() => {
        const fetchArticle = async () => {
            const { data, error } = await supabase.from('articles').select('*').eq('id', id).single()
            if (data) {
                setTitle(data.title)
                setSlug(data.slug)
                setContent(data.content)
                setImageUrl(data.image_url)
            } else {
                alert('Статья не найдена')
                router.push('/admin/articles')
            }
        }
        fetchArticle()
    }, [id])

    const handleSave = async () => {
        if (!title.trim() || !slug.trim()) return alert('Введите заголовок и slug')

        let finalUrl = imageUrl
        if (coverFile) {
            const uploaded = await uploadImage(coverFile)
            if (uploaded) finalUrl = uploaded
        }

        const { error } = await supabase.from('articles').update({
            title,
            slug,
            content,
            image_url: finalUrl,
        }).eq('id', id)

        if (error) {
            console.error(error)
            alert('Ошибка при обновлении статьи')
        } else {
            router.push('/admin/articles')
        }
    }

    return (
        <div className='container-second max-w-3xl mx-auto p-6 space-y-6'>
            <h1 className='text-2xl font-bold'>Редактировать статью</h1>

            <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder='Заголовок' className='w-full p-2 border rounded' />

            <input value={slug} onChange={(e) => setSlug(e.target.value)} placeholder='Slug (URL-часть)' className='w-full p-2 border rounded' />

            <Editor
                apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY}
                // biome-ignore lint/suspicious/noAssignInExpressions: <explanation>
                onInit={(evt, editor) => (editorRef.current = editor)}
                value={content}
                onEditorChange={(newContent) => setContent(newContent)}
                init={{
                    height: 400,
                    menubar: false,
                    plugins: 'link image lists code',
                    toolbar: 'undo redo | formatselect | bold italic | alignleft aligncenter alignright | bullist numlist | link image | code',
                }}
            />

            <div>
                {/* biome-ignore lint/a11y/noLabelWithoutControl: <explanation> */}
                <label className='block mt-4 mb-1 font-medium'>Обложка</label>
                {imageUrl && <img src={imageUrl} alt='cover' className='max-h-48 rounded mb-2' />}
                <div className='flex gap-2 items-center'>
                    <input type='file' accept='image/*' onChange={(e) => e.target.files && setCoverFile(e.target.files[0])} />
                    {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
                    <button onClick={() => setShowPicker(true)} className='px-3 py-1 border rounded text-sm'>📁 Выбрать из библиотеки</button>
                </div>
                {showPicker && <MediaPicker onSelect={(url) => { setImageUrl(url); setCoverFile(null) }} onClose={() => setShowPicker(false)} />}
            </div>

            {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
            <button onClick={handleSave} className='bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition'>
                Сохранить изменения
            </button>
        </div>
    )
}
