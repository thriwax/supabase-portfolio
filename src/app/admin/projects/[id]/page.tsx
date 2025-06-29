'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { supabase } from '../../../../../lib/supabaseClient'
import { uploadImage } from '../../../../../lib/uploadImage'
import MediaPicker from '../../../components/MediaPicker/MediaPicker'

export default function EditProjectPage() {
    const { id } = useParams<{ id: string }>()
    const router = useRouter()

    const [title, setTitle] = useState('')
    const [slug, setSlug] = useState('')
    const [description, setDescription] = useState('')
    const [url, setUrl] = useState('')
    const [imageUrl, setImageUrl] = useState('')
    const [coverFile, setCoverFile] = useState<File | null>(null)
    const [showPicker, setShowPicker] = useState(false)
    const [tags, setTags] = useState('')

    // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
    useEffect(() => {
        const fetchProject = async () => {
            const { data, error } = await supabase.from('projects').select('*').eq('id', id).single()
            if (data) {
                setTitle(data.title)
                setSlug(data.slug || '')
                setDescription(data.description)
                setUrl(data.url)
                setImageUrl(data.image_url)
            } else {
                alert('Проект не найден')
                router.push('/admin/projects')
            }
        }

        fetchProject()
    }, [id])

    const generateSlug = (str: string) =>
        str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')

    const handleSave = async () => {
        if (!title.trim() || !description.trim()) {
            alert('Заполните все поля')
            return
        }

        let finalUrl = imageUrl
        if (coverFile) {
            const uploaded = await uploadImage(coverFile)
            if (uploaded) finalUrl = uploaded
        }

        const finalSlug = slug.trim() || generateSlug(title)

        const tagArray = tags
            .split(',')
            .map(tag => tag.trim())
            .filter(tag => tag.length > 0)

        const { error } = await supabase.from('projects').update({
            title,
            slug: finalSlug,
            description,
            url,
            image_url: finalUrl,
            tags: tagArray
        }).eq('id', id)

        if (error) {
            alert('Ошибка при обновлении проекта')
        } else {
            router.push('/admin/projects')
        }
    }

    return (
        <div className='max-w-3xl mx-auto p-6 space-y-6'>
            <h1 className='text-2xl font-bold'>Редактировать проект</h1>

            <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder='Название проекта'
                className='w-full p-2 border rounded'
            />

            <input
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder='Слаг (example-project)'
                className='w-full p-2 border rounded'
            />

            <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder='Описание'
                className='w-full p-2 border rounded'
            />

            <input
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder='URL проекта'
                className='w-full p-2 border rounded'
            />

            <input
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder='Теги (через запятую)'
                className='w-full p-2 border rounded'
            />

            <div>
                {/* biome-ignore lint/a11y/noLabelWithoutControl: <explanation> */}
                <label className='block mt-4 mb-1 font-medium'>Обложка</label>

                {imageUrl && <img src={imageUrl} alt='cover' className='max-h-48 rounded mb-2' />}

                <div className='flex gap-2 items-center'>
                    <input
                        type='file'
                        accept='image/*'
                        onChange={(e) => e.target.files && setCoverFile(e.target.files[0])}
                        className='text-sm'
                    />
                    <button
                        type='button'
                        onClick={() => setShowPicker(true)}
                        className='px-3 py-1 border rounded text-sm'
                    >
                        📁 Выбрать из библиотеки
                    </button>
                </div>

                {showPicker && (
                    <MediaPicker
                        onSelect={(url) => {
                            setImageUrl(url)
                            setCoverFile(null)
                        }}
                        onClose={() => setShowPicker(false)}
                    />
                )}
            </div>

            {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
            <button
                onClick={handleSave}
                className='bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition'
            >
                Сохранить
            </button>
        </div>
    )
}
