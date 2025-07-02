'use client'

import { useEffect, useState } from 'react'
import { supabase } from '../../../../lib/supabaseClient'
import { uploadImage } from '../../../../lib/uploadImage'

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

        const result = await uploadImage(file)

        if (!result) {
            alert('Ошибка загрузки файла')
        } else {
            console.log('Файл загружен:', result)
            setFiles((prev) => [...prev, { name: result.name, url: result.url }])
        }

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
        if (downloadError || !data) {
            console.error('Ошибка при загрузке файла:', downloadError)
            return alert('Ошибка загрузки файла')
        }

        try {
            const blob = await data.blob()
            const ext = renaming.split('.').pop()
            const newFileName = `${newName}.${ext}`

            const { error: uploadError } = await supabase.storage.from(BUCKET).upload(newFileName, blob)
            if (uploadError) {
                console.error('Ошибка при загрузке нового файла:', uploadError)
                alert('Ошибка при переименовании: ' + uploadError.message)
                return
            }

            await supabase.storage.from(BUCKET).remove([renaming])
            setRenaming(null)
            setNewName('')
            await fetchFiles()
        } catch (err) {
            console.error('Ошибка при переименовании:', err)
            alert('Ошибка при переименовании файла')
        }
    }

    return (
        <div className='container-second max-w-4xl mx-auto p-6 space-y-6'>
            <h1 className='text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#D3E97A] to-[#7e8b4a]'>Files</h1>

            <input
                type='file'
                accept='image/*'
                onChange={handleUpload}
                disabled={uploading}
                className='block mb-4'
            />

            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4'>
                {files.map((file) => (
                    <div key={file.name} className='p-2 rounded space-y-2 bg-[#3f3f3f] text-black overflow-hidden'>
                        <img
                            src={file.url}
                            alt={file.name}
                            className='w-full h-32 object-contain bg-gray-100 rounded'
                        />
                        <p className='text-sm truncate text-white'>{file.name}</p>
                        <div className='space-x-2 text-sm'>
                            <button
                                onClick={() => navigator.clipboard.writeText(file.url)}
                                className='text-xs p-1 bg-gray-200 text-gray-600 rounded-sm max-sm:text-[8px] hover:bg-[#d3e97a]'
                            >
                                Copy URL
                            </button>
                            <button
                                onClick={() => {
                                    setRenaming(file.name)
                                    setNewName(file.name.replace(/\.[^.]+$/, ''))
                                }}
                                className='text-xs p-1 bg-gray-200 text-gray-600 rounded-sm mr-2 max-sm:text-[8px] hover:bg-[#d3e97a]'
                            >
                                Rename
                            </button>
                            <button
                                onClick={() => handleDelete(file.name)}
                                className='text-xs p-1 bg-gray-200 text-gray-600 rounded-sm mr-2 max-sm:text-[8px] hover:bg-[#d3e97a]'
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {renaming && (
                <div className='fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50'>
                    <div className='bg-black text-white p-6 rounded space-y-4 w-96 max-w-full'>
                        <h2 className='text-5xl font-bold'>Rename File</h2>
                        <input
                            value={newName}
                            onChange={(e) => setNewName(e.target.value)}
                            className='w-full p-2 border'
                        />
                        <div className='flex justify-end space-x-2'>
                            <button onClick={() => setRenaming(null)} className='px-4 py-1 border rounded'>
                                Cancel
                            </button>
                            <button
                                onClick={handleRename}
                                className='px-4 py-1 bg-blue-600 text-white rounded'
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
