'use client'

import { useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '../../../../../lib/supabaseClient'
import { uploadImage } from '../../../../../lib/uploadImage'
import MediaPicker from '../../../components/MediaPicker/MediaPicker'
import dynamic from 'next/dynamic'

const Editor = dynamic(() => import('@tinymce/tinymce-react').then(mod => mod.Editor), { ssr: false })

export default function NewArticlePage() {
    const router = useRouter()
    const editorRef = useRef(null)
    const [title, setTitle] = useState('')
    const [slug, setSlug] = useState('')
    const [content, setContent] = useState('')
    const [imageUrl, setImageUrl] = useState('')
    const [coverFile, setCoverFile] = useState<File | null>(null)
    const [showPicker, setShowPicker] = useState(false)

    const handleSave = async () => {
        if (!title.trim() || !slug.trim()) return alert('Введите заголовок и slug')

        let finalUrl = imageUrl
        if (coverFile) {
            const uploaded = await uploadImage(coverFile)
            if (uploaded) finalUrl = uploaded
        }

        const { error } = await supabase.from('articles').insert({
            title,
            slug,
            content,
            image_url: finalUrl,
        })

        if (error) {
            console.error(error)
            alert('Ошибка при сохранении статьи')
        } else {
            router.push('/admin/articles')
        }
    }

    return (
        <div className='container-second max-w-3xl mx-auto p-6 space-y-6'>
            <h1 className='text-2xl font-bold'>New Article</h1>

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
                <h2 className="block mt-4 mb-1 font-medium text-gray-700">Cover</h2>

                {imageUrl ? (
                    <img src={imageUrl} alt="cover" className="max-h-48 rounded-lg shadow-lg mb-4" />
                ) : (
                    <p className="text-gray-500 text-sm mb-4">No image selected</p>
                )}

                <div className="flex gap-4 items-center">
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => e.target.files && setCoverFile(e.target.files[0])}
                        className="file:mr-4 file:px-6 file:py-2 file:rounded-lg file:border file:border-gray-300 file:bg-blue-600 file:text-white file:hover:bg-blue-500 transition-all cursor-pointer"
                    />

                    {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
                    <button
                        onClick={() => setShowPicker(true)}
                        className="px-6 py-3 border border-blue-600 rounded-lg text-blue-600 font-semibold hover:bg-blue-600 hover:text-white transition-all shadow-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
                    >
                        📁 Choose from Media Library
                    </button>
                </div>

                {showPicker && (
                    <MediaPicker onSelect={(url) => { setImageUrl(url); setCoverFile(null); }} onClose={() => setShowPicker(false)} />
                )}
            </div>


            {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
            <button onClick={handleSave} className='bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition'>
                Save
            </button>
        </div>
    )
}
