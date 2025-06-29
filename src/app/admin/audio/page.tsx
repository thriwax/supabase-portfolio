'use client'

import { useState } from 'react'
import { supabase } from '../../../../lib/supabaseClient'
import { uploadImage } from '../../../../lib/uploadImage'
import TrackList from '@/app/components/TrackList/TrackList'

export default function Page() {
    const [title, setTitle] = useState('')
    const [audioFile, setAudioFile] = useState<File | null>(null)
    const [coverFile, setCoverFile] = useState<File | null>(null)
    const [message, setMessage] = useState('')

    const handleUpload = async () => {
        if (!audioFile || !coverFile || !title) {
            setMessage('Заполни все поля')
            return
        }

        setMessage('Загрузка...')
        const audioUrl = await uploadImage(audioFile)
        const coverUrl = await uploadImage(coverFile)

        if (!audioUrl || !coverUrl) {
            setMessage('Ошибка загрузки файлов')
            return
        }

        const { error } = await supabase.from('audio_tracks').insert({
            title,
            audio_url: audioUrl,
            cover_url: coverUrl,
        })

        if (error) {
            console.error(error)
            setMessage('Ошибка при сохранении')
        } else {
            setMessage('✅ Трек загружен!')
            setTitle('')
            setAudioFile(null)
            setCoverFile(null)
        }
    }

    return (
        <div className="space-y-4 p-4 border rounded-md">
            <h3 className="text-lg font-semibold">Загрузка аудио</h3>
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Название трека"
                className="w-full p-2 border rounded"
            />
            <input type="file" accept="audio/*" onChange={(e) => setAudioFile(e.target.files?.[0] || null)} />
            <input type="file" accept="image/*" onChange={(e) => setCoverFile(e.target.files?.[0] || null)} />
            <button onClick={handleUpload} className="bg-black text-white px-4 py-2 rounded">Загрузить</button>
            <p className="text-sm text-gray-600">{message}</p>
            <TrackList />
        </div>
    )
}
