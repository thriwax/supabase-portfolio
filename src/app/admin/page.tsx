'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '../../../lib/supabaseClient'
import { uploadImage } from '../../../lib/uploadImage'

export default function AdminPage() {
    const router = useRouter()
    const [seo, setSeo] = useState({ id: '', title: '', description: '', keywords: '' })
    const [avatarUrl, setAvatarUrl] = useState('')
    const [showPicker, setShowPicker] = useState(false)
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState('')
    const [selectedFile, setSelectedFile] = useState<File | null>(null)

    // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
    useEffect(() => {
        const checkSession = async () => {
            const { data } = await supabase.auth.getSession()
            if (!data.session) router.push('/login')
        }
        checkSession()
        fetchSeo()
        fetchAvatar()
    }, [])

    const fetchSeo = async () => {
        const { data } = await supabase.from('seo_settings').select('*').single()
        if (data) setSeo(data)
    }

    const fetchAvatar = async () => {
        const { data } = await supabase.from('avatar_settings').select('*').single()
        if (data?.avatar_url) setAvatarUrl(data.avatar_url)
    }

    const saveAvatar = async () => {
        setLoading(true)
        setMessage('')

        let finalUrl = avatarUrl

        if (selectedFile) {
            const uploadedUrl = await uploadImage(selectedFile)
            if (!uploadedUrl) {
                setMessage('❌ Ошибка загрузки файла')
                setLoading(false)
                return
            }
            finalUrl = uploadedUrl
        }

        const { error } = await supabase.from('avatar_settings').upsert({ id: 1, avatar_url: finalUrl })

        setLoading(false)

        if (error) {
            console.error(error)
            setMessage('❌ Ошибка при сохранении')
        } else {
            setAvatarUrl(finalUrl)
            setSelectedFile(null)
            setMessage('✅ Аватар сохранен!')
        }

        setTimeout(() => setMessage(''), 3000)
    }

    const saveSeo = async () => {
        await supabase.from('seo_settings').upsert(seo)
        alert('SEO сохранено')
    }

    return (
        <>
            <div className='space-y-10 p-6 max-w-4xl mx-auto'>
                <h1 className='text-2xl font-bold'>Admin Page</h1>

                <section className='space-y-4'>
                    <h2 className='text-xl font-semibold'>Sections</h2>
                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                        <Link href='/admin/articles' className='block border p-4 rounded hover:bg-gray-100'>
                            ✍️ Manage Articles
                        </Link>
                        <Link href='/admin/projects' className='block border p-4 rounded hover:bg-gray-100'>
                            🛠 Manage Projects
                        </Link>
                        <Link href='/admin/media' className='block border p-4 rounded hover:bg-gray-100'>
                            🖼 Media Library
                        </Link>
                    </div>
                </section>

                <section className='space-y-4'>
                    <h2 className='text-xl font-semibold'>SEO</h2>
                    <input value={seo.title} onChange={(e) => setSeo({ ...seo, title: e.target.value })} placeholder='Title' className='w-full p-2 border rounded' />
                    <input value={seo.description} onChange={(e) => setSeo({ ...seo, description: e.target.value })} placeholder='Description' className='w-full p-2 border rounded' />
                    <input value={seo.keywords} onChange={(e) => setSeo({ ...seo, keywords: e.target.value })} placeholder='Keywords' className='w-full p-2 border rounded' />
                    {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
                    <button onClick={saveSeo} className='bg-green-600 text-white px-4 py-2 rounded'>Save</button>
                </section>
            </div>
        </>
    )
}
