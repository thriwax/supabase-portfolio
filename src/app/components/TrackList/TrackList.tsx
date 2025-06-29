'use client'

import { useEffect, useState } from 'react'
import { supabase } from '../../../../lib/supabaseClient'
import { useAudioPlayer } from '../../components/AudioPlayerContext/AudioPlayerContext'
import { Trash2 } from 'lucide-react'

interface Track {
    id: string
    title: string
    audio_url: string
    cover_url: string
}

export default function TrackList() {
    const [tracks, setTracks] = useState<Track[]>([])
    const { setTrack } = useAudioPlayer()

    useEffect(() => {
        fetchTracks()
    }, [])

    const fetchTracks = async () => {
        const { data, error } = await supabase
            .from('audio_tracks')
            .select('*')
            .order('created_at', { ascending: false })

        if (!error && data) setTracks(data)
    }

    const handleDelete = async (id: string) => {
        const { error } = await supabase.from('audio_tracks').delete().eq('id', id)
        if (!error) {
            setTracks(prev => prev.filter(track => track.id !== id))
        }
    }

    return (
        <div className="mt-8 space-y-4">
            <h3 className="text-lg font-semibold">Загруженные треки</h3>
            {tracks.length === 0 ? (
                <p className="text-sm text-gray-500">Треки отсутствуют</p>
            ) : (
                <ul className="space-y-2">
                    {tracks.map(track => (
                        <li
                            key={track.id}
                            className="flex items-center justify-between bg-gray-800 text-white p-3 rounded group"
                        >
                            <div
                                className="flex items-center gap-3 cursor-pointer hover:opacity-80"
                                onClick={() => setTrack(track.audio_url, track.title, track.cover_url)}
                            >
                                <img
                                    src={track.cover_url}
                                    alt="cover"
                                    className="w-10 h-10 rounded object-cover"
                                />
                                <span className="font-medium">{track.title}</span>
                            </div>
                            <button
                                onClick={() => handleDelete(track.id)}
                                className="text-red-400 hover:text-red-600 transition-opacity opacity-0 group-hover:opacity-100"
                            >
                                <Trash2 size={18} />
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}
