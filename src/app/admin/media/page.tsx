'use client'

import { useEffect, useState } from 'react'
import { supabase } from '../../../../lib/supabaseClient'

const BUCKET = 'project-images'

type FileItem = {
    name: string
    url: string
}

export default function MediaPage() {
    const [files, setFiles] = useState<FileItem[]>([])
    const [uploading, setUploading] = useState(false)
    const [renaming, setRenaming] = useState<string | null>(null)
    const [newName, setNewName] = useState('')

    useEffect(() => {
        fetchFiles()
    }, [])

    const fetchFiles = async () => {
        const { data, error } = await supabase.storage.from(BUCKET).list('', { limit: 100 })
        if (error) return alert('Ошибка при получении файлов')

        const items = data
            .filter((f) => f.name.match(/\.(png|jpe?g|webp|gif|svg|bmp|avif)$/i))
            .map((f) => ({
                name: f.name,
                url: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${BUCKET}/${f.name}`,
            }))

        setFiles(items)
    }

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return
        setUploading(true)
        // biome-ignore lint/style/useTemplate: <explanation>
        const fileName = Date.now() + '-' + file.name

        const { error } = await supabase.storage.from(BUCKET).upload(fileName, file)
        if (error) alert('Ошибка загрузки файла')
        await fetchFiles()
        setUploading(false)
    }

    const handleDelete = async (name: string) => {
        const confirm = window.confirm(`Удалить ${name}?`)
        if (!confirm) return
        await supabase.storage.from(BUCKET).remove([name])
        await fetchFiles()
    }

    const handleRename = async () => {
        if (!renaming || !newName.trim()) return

        const { data, error: downloadError } = await supabase.storage.from(BUCKET).download(renaming)
        if (downloadError || !data) return alert('Ошибка загрузки файла')

        const ext = renaming.split('.').pop()
        // biome-ignore lint/style/useTemplate: <explanation>
        const newFileName = newName + '.' + ext

        const { error: uploadError } = await supabase.storage.from(BUCKET).upload(newFileName, data)
        if (uploadError) {
            alert('Ошибка при переименовании')
            return
        }

        await supabase.storage.from(BUCKET).remove([renaming])
        setRenaming(null)
        setNewName('')
        await fetchFiles()
    }

    return (
        <div className='max-w-4xl mx-auto p-6 space-y-6'>
            <h1 className='text-2xl font-bold'>Файлы</h1>

            <input
                type='file'
                accept='image/*'
                onChange={handleUpload}
                disabled={uploading}
                className='block mb-4'
            />

            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4'>
                {files.map((file) => (
                    <div key={file.name} className='border p-2 rounded text-center space-y-2 bg-white text-black'>
                        <img
                            src={file.url}
                            alt={file.name}
                            className='w-full h-32 object-contain bg-gray-100 rounded'
                        />
                        <p className='text-sm truncate'>{file.name}</p>
                        <div className='space-x-2 text-sm'>
                            {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
                            <button
                                onClick={() => navigator.clipboard.writeText(file.url)}
                                className='text-blue-600'
                            >
                                📋
                            </button>
                            {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
                            <button
                                onClick={() => {
                                    setRenaming(file.name)
                                    setNewName(file.name.replace(/\.[^.]+$/, ''))
                                }}
                                className='text-yellow-600'
                            >
                                ✏️
                            </button>
                            {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
                            <button
                                onClick={() => handleDelete(file.name)}
                                className='text-red-600'
                            >
                                🗑️
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {renaming && (
                <div className='fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50'>
                    <div className='bg-white text-black p-6 rounded space-y-4 w-96 max-w-full'>
                        <h2 className='text-lg font-bold'>Переименовать файл</h2>
                        <input
                            value={newName}
                            onChange={(e) => setNewName(e.target.value)}
                            className='w-full p-2 border'
                        />
                        <div className='flex justify-end space-x-2'>
                            {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
                            <button onClick={() => setRenaming(null)} className='px-4 py-1 border rounded'>
                                Отмена
                            </button>
                            {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
                            <button
                                onClick={handleRename}
                                className='px-4 py-1 bg-blue-600 text-white rounded'
                            >
                                Сохранить
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
